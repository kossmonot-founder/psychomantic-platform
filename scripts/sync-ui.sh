#!/bin/bash
# Synchronise le build de @psychomantic/ui-react vers vendor/ui-react.
# Permet le déploiement Cloudflare Pages sans publication npm.
# À relancer après chaque modification du package UI.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UI_SRC="$ROOT/../packages/psychomantic-ui"
VENDOR="$ROOT/vendor/ui-react"

echo "→ Build du package UI…"
(cd "$UI_SRC" && npm run build --silent)

echo "→ Copie vers vendor/…"
mkdir -p "$VENDOR/components"
cp "$UI_SRC/dist/index.js" "$UI_SRC/dist/index.d.ts" "$UI_SRC/dist/ui-react.css" "$VENDOR/"
cp -r "$UI_SRC/dist/components/"* "$VENDOR/components/" 2>/dev/null || true
cp "$UI_SRC/dist/types.d.ts" "$VENDOR/" 2>/dev/null || true

echo "✓ vendor/ui-react synchronisé"
