#!/usr/bin/env bash

FILEPATH=$(realpath "${BASH_SOURCE:-$0}")
DIRPATH=$(dirname $(dirname $FILEPATH))

python $DIRPATH/manage.py makemigrations
python $DIRPATH/manage.py migrate
