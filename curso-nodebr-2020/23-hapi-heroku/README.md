# Download Postgres
docker run \
  --name postgres \
  -e POSTGRES_USER=blima \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker ps

docker exec -it postgres /bin/bash

# PanelPostgres
docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

# MongoDB
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo:4

# MongoClient
docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

 # Create an application user on MongoDB
 docker exec -it mongodb \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('heroes').createUser({user: 'bonejah', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}] })" 