#!/bin/bash

heroku container:push --app=moni-moni web
heroku container:release --app=moni-moni web