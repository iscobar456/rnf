#! /bin/bash

if [[ -z $(docker container ls -a | grep rnf) ]]; then
  echo "Container does not exist. Building and starting a new container..."
  docker run -d \
    -p 3000:3000 \
    -v ./db:/app/db \
    --name rnf \
    rnf

  # Reset the ownership of the db directory to match the user and group inside the container
  # This is necessary to ensure that the container can read and write to the db directory
  echo "Resetting ownership of the db directory..."
  sudo chgrp -R $(docker run --rm rnf id -u):$(docker run --rm rnf id -g) ./db

elif [[ $(docker container ls | grep rnf) ]]; then
  echo "Container already running."

else
  echo "Container exists but is not running. Starting it now..."
  docker start rnf

fi