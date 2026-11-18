#!/usr/bin/env bash
# Construit le site et pousse le dossier dist/ sur la branche `hostinger`,
# que Hostinger (Avancé → GIT) déploie automatiquement.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
REMOTE="$(git remote get-url origin)"
TMP="$(mktemp -d)"
git -C "$TMP" init -q -b hostinger
cp -R dist/. "$TMP"/
git -C "$TMP" add -A
git -C "$TMP" -c user.name="COMENGA" -c user.email="comenga@localhost" commit -q -m "Site construit le $(date '+%Y-%m-%d %H:%M')"
git -C "$TMP" push -f "$REMOTE" hostinger:hostinger
rm -rf "$TMP"
echo "Branche hostinger mise à jour : Hostinger redéploie dans quelques secondes."
