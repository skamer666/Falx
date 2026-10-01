#!/bin/bash
# Vérifie et installe ce qu'il faut pour produire une vidéo. À lancer une fois par session.
set -u
ok=1
command -v ffmpeg >/dev/null || { echo "ffmpeg manquant : installation"; (apt-get update -qq && apt-get install -y -qq ffmpeg) >/dev/null 2>&1 || ok=0; }
python3 -c "import numpy, scipy, soundfile, pyloudnorm" 2>/dev/null || pip install -q numpy scipy soundfile pyloudnorm 2>/dev/null || pip install -q --break-system-packages numpy scipy soundfile pyloudnorm || ok=0
python3 -c "import numpy, scipy, soundfile, pyloudnorm" || ok=0
[ -x /opt/pw-browsers/chromium ] || [ -d /opt/pw-browsers ] || { echo "Chromium introuvable dans /opt/pw-browsers"; ok=0; }
[ -d /opt/node22/lib/node_modules/playwright ] || { echo "playwright global introuvable"; ok=0; }
npx --yes hyperframes@0.8.103 --version >/dev/null 2>&1 || { echo "hyperframes injoignable (npm)"; ok=0; }
command -v ffmpeg >/dev/null || ok=0
[ $ok = 1 ] && echo "SETUP OK" || { echo "SETUP FAILED"; exit 1; }
