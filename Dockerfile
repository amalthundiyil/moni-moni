FROM python:3.7

# Install curl, node, npm 
RUN apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs \
    && curl -o- -L https://www.npmjs.com/package/install.sh | bash

WORKDIR /app/server/

# Install Python dependencies
COPY ./moni-moni/server/requirements.txt /app/server/
RUN pip3 install --upgrade pip -r requirements.txt

# Install JS dependencies
WORKDIR /app/client/

COPY ./moni-moni/client/package.json ./moni-moni/client/package-lock.json /app/client/
RUN $HOME/.npm/bin/npm install

# Add the rest of the code
COPY . /app/
COPY ./moni-moni/server/scripts/ /app/
# Build static files
RUN $HOME/.npm/bin/npm build

# Have to move all static files other than index.html to root/
# for whitenoise middleware
WORKDIR /app/client/build

RUN mkdir root && mv *.ico *.js *.json root

# Collect static files
RUN mkdir /app/server/staticfiles

WORKDIR /app

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN DJANGO_SETTINGS_MODULE=server.settings.prod \
    SECRET_KEY=TEST_SECRET_KEY \
    python3 server/manage.py collectstatic --noinput