#!/usr/bin/env bash

EXT=.ini
DIRS=(_types _components _structs)

for dir in ${DIRS[@]}; do
  echo "Creating index file in $dir..."

  idx="$dir/index.json"
  content="["

  for file in $(ls $dir/*.ini); do
    content+="\""$(basename $file $EXT)"\", "
  done

  content="${content%, }]"
  echo $content > $idx
done

echo "Done."
