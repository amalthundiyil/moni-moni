#!/bin/sh

$PWD/venv/bin/python manage.py seed users --number=15 
$PWD/venv/bin/python manage.py seed catalogue --number=15 
$PWD/venv/bin/python manage.py seed orders --number=15 
$PWD/venv/bin/python manage.py seed checkout --number=15 