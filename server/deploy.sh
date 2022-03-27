#!/bin/sh

# Build everything in /server
docker build -t jeffgat/exodus-server:latest .

# Push to docker hub
docker push jeffgat/exodus-server:latest

ssh root@164.92.66.3 "docker pull jeffgat/exodus-server:latest && docker tag jeffgat/exodus-server:latest dokku/server:latest && dokku git:from-image server dokku/server:latest && dokku ps:rebuild server"