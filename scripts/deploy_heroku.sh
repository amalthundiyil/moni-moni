#!/bin/bash

echo "Deploying to Heroku..."

heroku stack:set container
# heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
git push -f heroku main:master

echo "Watching Heroku Logs..."
heroku logs --tail