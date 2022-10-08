#!/bin/sh
psql << END_OF_SCRIPT

DROP DATABASE postgres; 
CREATE DATABASE postgres;

END_OF_SCRIPT