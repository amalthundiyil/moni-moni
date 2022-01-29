FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /server

COPY ./requirements.txt requirements.txt

RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt


COPY . .