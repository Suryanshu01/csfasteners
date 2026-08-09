#!/usr/bin/env bash
# Submit every sitemap URL to IndexNow on deploy.
#
# IndexNow is honoured by Bing (and therefore Copilot), Yandex, Seznam and
# Naver. Google does NOT participate: it still discovers changes via
# sitemap.xml and Search Console, both of which remain in place.
#
# This script must never fail a deploy, so netlify.toml calls it with `|| true`
# and every failure path here exits 0.

set -u

HOST="csfasteners.com"
KEY="e4da84a48952bd93011bfeb7c971f676"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="sitemap.xml"

if [ ! -f "$SITEMAP" ]; then
  echo "indexnow: $SITEMAP not found, skipping"
  exit 0
fi

# Pull <loc> values out of the sitemap and JSON-encode them as an array.
URLS=$(grep -o '<loc>[^<]*</loc>' "$SITEMAP" \
       | sed -e 's|<loc>||' -e 's|</loc>||' \
       | awk 'NF' \
       | awk '{printf "%s\"%s\"", (NR>1 ? "," : ""), $0}')

if [ -z "$URLS" ]; then
  echo "indexnow: no URLs parsed from $SITEMAP, skipping"
  exit 0
fi

COUNT=$(printf '%s' "$URLS" | tr ',' '\n' | wc -l | tr -d ' ')
echo "indexnow: submitting ${COUNT} URLs for ${HOST}"

PAYLOAD=$(printf '{"host":"%s","key":"%s","keyLocation":"%s","urlList":[%s]}' \
  "$HOST" "$KEY" "$KEY_LOCATION" "$URLS")

STATUS=$(curl -s -o /dev/null -w '%{http_code}' \
  --max-time 20 \
  -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD" || echo "000")

# 200 = accepted, 202 = accepted, key validation pending.
case "$STATUS" in
  200|202) echo "indexnow: accepted (HTTP $STATUS)" ;;
  000)     echo "indexnow: request failed or timed out, continuing anyway" ;;
  *)       echo "indexnow: endpoint returned HTTP $STATUS, continuing anyway" ;;
esac

exit 0
