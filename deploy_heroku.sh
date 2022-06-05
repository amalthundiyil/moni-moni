#!/bin/bash

#!usr/bin/env bash

echo "Deployging to Heroku..."

heroku stack:set container
heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
git push heroku main