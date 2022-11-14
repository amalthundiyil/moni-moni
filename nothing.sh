#!/usr/bin/env bash
for file in $(find "./moni-moni/server" -name '*.py' -not -path "./moni-moni/server/venv/*
");
do
  echo $file
  black $file
  reorder-python-imports $file
done
