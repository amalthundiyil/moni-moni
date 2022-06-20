#!/usr/bin/env bash

FILEPATH=$(realpath "${BASH_SOURCE:-$0}")
DIRPATH=$(dirname $(dirname $FILEPATH))
 
find "$DIRPATH/server" -path "*/migrations/*.py" -not -path "$DIRPATH/venv/*" -not -name "__init__.py" -delete
find "$DIRPATH/server" -path "*/migrations/*.pyc" -not -path "$DIRPATH/venv/*" -delete