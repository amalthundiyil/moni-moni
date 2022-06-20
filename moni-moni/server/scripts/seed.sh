#!/usr/bin/env bash

FILEPATH=$(realpath "${BASH_SOURCE:-$0}")
DIRPATH=$(dirname $(dirname $FILEPATH))

source "$DIRPATH/venv/bin/activate"

python $DIRPATH/manage.py seed users --number=11
python $DIRPATH/manage.py seed catalogue --number=11
# TODO @amal-thundiyil: fix orders seed with customs
python $DIRPATH/manage.py seed orders --number=11
python $DIRPATH/manage.py seed checkout --number=11