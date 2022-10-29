#!/bin/bash

heroku stack:set container
# heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
git push -f heroku main:master
heroku logs --tail