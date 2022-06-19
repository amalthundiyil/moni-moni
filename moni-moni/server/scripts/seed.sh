#!/bin/sh

$PWD/../venv/bin/python ../manage.py seed users --number=11
$PWD/../venv/bin/python ../manage.py seed catalogue --number=11
# TODO @amal-thundiyil: fix orders seed with customs
$PWD/../venv/bin/python ../manage.py seed orders --number=11
$PWD/../venv/bin/python ../manage.py seed checkout --number=11