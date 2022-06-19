# Use image with both python and node installed
FROM nikolaik/python-nodejs:python3.7-nodejs17

WORKDIR /app/server/

# Install Python dependencies
COPY ./moni-moni/server/requirements.txt /app/server/
RUN pip install --upgrade pip && pip -r requirements.txt

# Install client dependencies
WORKDIR /app/client/

COPY ./moni-moni/client/package.json ./moni-moni/client/package-lock.json /app/client/
RUN npm install

# Add the rest of the code
COPY ./moni-moni /app/
COPY ./moni-moni/server/scripts/ /app/

# Build static files
RUN npm run build

# Move all static files other than index.html to root/ for whitenoise middleware
WORKDIR /app/client/build

RUN mkdir root && mv *.ico *.json root

# Collect static files
RUN mkdir /app/server/staticfiles

WORKDIR /app

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Add a real SECRET_KEY config variable in Heroku.
RUN SECRET_KEY=KEY_ONLY_FOR_STATIC_FILES \
    python3 server/manage.py collectstatic --noinput