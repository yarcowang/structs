#!/usr/bin/env bash

EXT=.ini
IDX=./_structs/index.json

echo "Creating index file..."
echo -n "[" > $IDX

for file in $(ls ./_structs/*.ini)
do
  echo -n "\"$(basename $file $EXT)\"," >> $IDX
done

echo "]" >> $IDX
echo "Done."
