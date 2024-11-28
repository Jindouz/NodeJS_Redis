Connects to a Redis server using the node-redis package, reads configuration from a YAML file, and flush the Redis database at startup.


### Dockers:

Redis
```
docker network create node_redis_network

cd node-redis-compose

docker-compose up -d
```

NodeJS
```
cd nodeJS

docker build -t node-redis-app .

docker run --name node-redis-app --network node_redis_network -p 3000:3000 node-redis-app

```
