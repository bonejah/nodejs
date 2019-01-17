* https://www.docker.com/
* https://hub.docker.com/

## Postgres
``` 
docker run \
 --name postgres \
 -e POSTGRES_USER=bruno \
 -e POSTGRES_PASSWORD=123456 \
 -e POSTGRES_DB=heroes \
 -p 5432:5432 \
 -d \
 postgres

docker exec -it postgres /bin/bash
 ```

## Interface grafica para visualizar o POSTGRES
```
docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer
```

## MONGODB
```
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo:4

docker exec -it mongodb
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSibling('heroes').createUser({user: 'bruno', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}]})"

```


## Interface grafica para visualizar o MONGODB
```
docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient
```
