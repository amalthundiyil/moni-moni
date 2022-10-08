#!/bin/bash

#!usr/bin/env bash

echo "Deploying to Heroku..."

heroku stack:set container
# heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
git push heroku main

echo "Watching to Heroku Logs..."
heroku logs --tail