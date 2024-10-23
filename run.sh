#!/bin/sh
docker build --tag frontend .
docker run -p 80:80 --detach 'frontend'
