#!/usr/bin/env bash

set -euo pipefail

OUTPUT="project-extract.txt"

{
  echo "=================================================="
  echo "PROJECT TREE"
  echo "=================================================="
  echo

  tree -a \
    -I 'node_modules|.next|.git|dist|build|coverage' \
    2>/dev/null || true

  echo
  echo
  echo "=================================================="
  echo "SELECTED SOURCE FILES"
  echo "=================================================="
  echo

  find . \
    -type f \
    \( \
      -name '*.ts' \
      -o -name '*.tsx' \
      -o -name '*.js' \
      -o -name '*.jsx' \
      -o -name '*.css' \
      -o -name '*.json' \
      -o -name '*.mjs' \
      -o -name '*.cjs' \
    \) \
    ! -path './node_modules/*' \
    ! -path './.next/*' \
    ! -path './.git/*' \
    ! -path './dist/*' \
    ! -path './build/*' \
    ! -path './coverage/*' \
    ! -name 'project-extract.txt' \
    | sort |
  while IFS= read -r file; do
    echo
    echo "=================================================="
    echo "FILE: ${file#./}"
    echo "=================================================="
    echo
    cat "$file"
    echo
    echo "=================================================="
    echo "END FILE: ${file#./}"
    echo "=================================================="
  done

} > "$OUTPUT"

echo "Created: $OUTPUT"
echo "Lines: $(wc -l < "$OUTPUT")"
echo "Size:  $(du -h "$OUTPUT" | cut -f1)"
