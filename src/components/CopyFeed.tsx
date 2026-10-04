'use client';

import { useState } from 'react';

export function CopyFeed({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex max-w-xl items-stretch overflow-hidden rounded border border-line bg-panel">
      <input
        readOnly
        value={url}
        aria-label="Feed address"
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate outline-none"
      />
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked: the field is selectable */
          }
        }}
        className="shrink-0 border-l border-line px-4 text-sm font-semibold hover:bg-room"
      >
        {copied ? 'Copied' : 'Copy feed'}
      </button>
    </div>
  );
}
