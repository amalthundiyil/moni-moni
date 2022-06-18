#!/bin/sh

$PWD/../venv/bin/python ../manage.py seed users --number=15 
$PWD/../venv/bin/python ../manage.py seed catalogue --number=15 
# TODO @amal-thundiyil: fix orders seed with customs
$PWD/../venv/bin/python ../manage.py seed orders --number=15 
$PWD/../venv/bin/python ../manage.py seed checkout --number=15 