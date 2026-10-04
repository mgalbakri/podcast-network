#!/usr/bin/env bash
# One-time setup for voicing episodes: Python packages + the Kokoro voice model (~350 MB, kept out of git).
set -euo pipefail
cd "$(dirname "$0")"
pip install -r requirements.txt
mkdir -p models
base=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -f models/kokoro-v1.0.onnx ] || curl -L -o models/kokoro-v1.0.onnx "$base/kokoro-v1.0.onnx"
[ -f models/voices-v1.0.bin ] || curl -L -o models/voices-v1.0.bin "$base/voices-v1.0.bin"
echo "Ready. Voice an episode with: python3 production/render.py content/series/<series>/episodes/NN-<slug>.md"
