#!/usr/bin/env bash

DIRPATH="moni-moni/server"


python $DIRPATH/manage.py seed users --number=11
python $DIRPATH/manage.py seed catalogue --number=11
# TODO @amal-thundiyil: fix orders seed with customs
python $DIRPATH/manage.py seed orders --number=11
python $DIRPATH/manage.py seed checkout --number=11