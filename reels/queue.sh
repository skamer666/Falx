#!/bin/bash
# Render specs one after another: bash queue.sh id1 id2 ...
cd "$(dirname "$0")"
for id in "$@"; do bash produce.sh specs/$id.py 2>&1 | tail -1; done
