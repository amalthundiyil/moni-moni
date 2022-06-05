#!/bin/bash

heroku container:push --app=moni-moni frontend
heroku container:release --app=moni-moni frontend

heroku container:release --app=moni-moni backend
heroku container:release --app=moni-moni backend