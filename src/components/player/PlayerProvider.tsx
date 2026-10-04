'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Track = {
  id: string; // "<series>/<slug>"
  title: string;
  seriesTitle: string;
  number: number;
  href: string;
  url: string;
  duration: number;
  chapters: { start: number; title: string }[];
};

type PlayerState = {
  track: Track | null;
  playing: boolean;
  time: number;
  duration: number;
  rate: number;
  play: (track: Track, at?: number) => void;
  toggle: () => void;
  pause: () => void;
  seek: (t: number) => void;
  skip: (d: number) => void;
  cycleRate: () => void;
};

const Ctx = createContext<PlayerState | null>(null);
const RATES = [1, 1.25, 1.5, 1.75, 2, 0.8];
const posKey = (id: string) => `tlr:pos:${id}`;

function readPos(id: string) {
  try {
    return Number(localStorage.getItem(posKey(id)) ?? 0) || 0;
  } catch {
    return 0;
  }
}
function writePos(id: string, t: number) {
  try {
    localStorage.setItem(posKey(id), String(Math.floor(t)));
  } catch {
    /* storage unavailable */
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const lastSaved = useRef(0);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'metadata';
    audio.current = a;
    const onTime = () => {
      setTime(a.currentTime);
      if (Math.abs(a.currentTime - lastSaved.current) > 5 && a.dataset.id) {
        lastSaved.current = a.currentTime;
        writePos(a.dataset.id, a.currentTime);
      }
    };
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      if (a.dataset.id) writePos(a.dataset.id, a.currentTime);
    };
    const onEnd = () => {
      setPlaying(false);
      if (a.dataset.id) writePos(a.dataset.id, 0);
    };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnd);
    return () => {
      a.pause();
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnd);
    };
  }, []);

  const play = useCallback(
    (t: Track, at?: number) => {
      const a = audio.current;
      if (!a) return;
      if (a.dataset.id !== t.id) {
        if (a.dataset.id) writePos(a.dataset.id, a.currentTime);
        a.src = t.url;
        a.dataset.id = t.id;
        a.playbackRate = rate;
        setTrack(t);
        setDuration(t.duration);
        const start = at ?? readPos(t.id);
        setTime(start);
        a.currentTime = start;
      } else if (at !== undefined) {
        a.currentTime = at;
        setTime(at);
      }
      void a.play().catch(() => setPlaying(false));
    },
    [rate],
  );

  const toggle = useCallback(() => {
    const a = audio.current;
    if (!a || !a.src) return;
    if (a.paused) void a.play().catch(() => setPlaying(false));
    else a.pause();
  }, []);

  const pause = useCallback(() => audio.current?.pause(), []);

  const seek = useCallback((t: number) => {
    const a = audio.current;
    if (!a) return;
    const d = a.duration || duration;
    a.currentTime = Math.max(0, Math.min(t, d || t));
    setTime(a.currentTime);
  }, [duration]);

  const skip = useCallback((d: number) => seek((audio.current?.currentTime ?? 0) + d), [seek]);

  const cycleRate = useCallback(() => {
    setRate((r) => {
      const next = RATES[(RATES.indexOf(r) + 1) % RATES.length];
      if (audio.current) audio.current.playbackRate = next;
      return next;
    });
  }, []);

  // Lock-screen and hardware media keys
  useEffect(() => {
    if (!track || !('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.seriesTitle,
      album: 'The Listening Room',
      artwork: [{ src: `/covers/${track.id.split('/')[0]}.png`, sizes: '3000x3000', type: 'image/png' }],
    });
    navigator.mediaSession.setActionHandler('play', () => toggle());
    navigator.mediaSession.setActionHandler('pause', () => pause());
    navigator.mediaSession.setActionHandler('seekbackward', () => skip(-15));
    navigator.mediaSession.setActionHandler('seekforward', () => skip(30));
    navigator.mediaSession.setActionHandler('seekto', (d) => d.seekTime !== undefined && seek(d.seekTime));
  }, [track, toggle, pause, skip, seek]);

  const value = useMemo(
    () => ({ track, playing, time, duration, rate, play, toggle, pause, seek, skip, cycleRate }),
    [track, playing, time, duration, rate, play, toggle, pause, seek, skip, cycleRate],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePlayer must be used inside PlayerProvider');
  return v;
}
