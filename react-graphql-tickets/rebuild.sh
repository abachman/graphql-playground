#!/bin/bash

docker-compose stop react
yes | docker-compose rm react
docker-compose build react
docker-compose up -d react