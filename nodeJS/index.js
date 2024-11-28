
const Redis = require('redis'); // Import Redis module
const fs = require('fs'); // Import file system module
const YAML = require('yaml'); // Import YAML parser


// Read and parse the YAML configuration file
const file = fs.readFileSync('./config.yaml', 'utf8');
const config = YAML.parse(file);

async function initializeRedis() {
    let redisClient = Redis.createClient({
        url: config.redis.url // URL from YAML config file
    });

    // Connect to the Redis server
    await redisClient.connect();

    // Select the specified database 
    await redisClient.select(config.redis.db);

    // Monitor for any errors
    redisClient.on('error', (err) => {
        console.error(err); // Log error to console
        server.log('error-redis', err); // Log error to server
    });

    // Flush the complete database at startup
    await redisClient.flushDb().then(() => {
        console.log("Flushing DB done");
    }).catch((error) => {
        console.error(error); // Log error to console
        server.log('error-redis', error); // Log error to server
    });

    return redisClient;
}

initializeRedis();
