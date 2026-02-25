#!/bin/sh
if [ ! -d "node_modules/.bin" ]; then
  echo "Node_modules missing or empty, installing..."
  pnpm install
fi
exec pnpm run dev