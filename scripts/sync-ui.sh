#!/bin/bash
# Synchronise le build de @psychomantic/ui-react vers vendor/ui-react.
#
# Deux cas :
# - Dev local : le package source (../packages/psychomantic-ui) existe,
#   on le rebuild et on met à jour vendor/.
# - CI (Cloudflare Pages) : le repo platform est cloné seul, le package
#   source est absent — on utilise le vendor déjà commité, sans rien faire.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UI_SRC="$ROOT/../packages/psychomantic-ui"
VENDOR="$ROOT/vendor/ui-react"

if [ ! -d "$UI_SRC" ]; then
  if [ -f "$VENDOR/index.js" ]; then
    echo "✓ Package source absent (CI) : utilisation du vendor commité"
    exit 0
  fi
  echo "✗ Erreur : ni le package source ($UI_SRC) ni le vendor ($VENDOR) n'existent" >&2
  exit 1
fi

echo "→ Build du package UI…"
(cd "$UI_SRC" && npm run build --silent)

echo "→ Copie vers vendor/…"
mkdir -p "$VENDOR/components"
cp "$UI_SRC/dist/index.js" "$UI_SRC/dist/index.d.ts" "$UI_SRC/dist/ui-react.css" "$VENDOR/"
cp -r "$UI_SRC/dist/components/"* "$VENDOR/components/" 2>/dev/null || true
cp "$UI_SRC/dist/types.d.ts" "$VENDOR/" 2>/dev/null || true

echo "✓ vendor/ui-react synchronisé"
