FROM python:3.8-alpine

WORKDIR /server

RUN apk add --no-cache bash

COPY ./requirements.txt requirements.txt

RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY . .