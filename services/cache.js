import { Query } from "mongoose";
import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;
const client = await createClient({ url: redisURL })
  .on("error", (err) => console.log("Redis client error", err))
  .connect();
const exec = Query.prototype.exec;

// Function to determine whether to cache a query or not
Query.prototype.cache = function (options = {}) {
  this._cache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

// Overriding "exec" method
Query.prototype.exec = async function () {
  if (!this._cache) {
    return exec.apply(this);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // Check value for "key" in redis
  const cacheValue = await client.hGet(this.hashKey, key);

  // If found, return that
  if (cacheValue) {
    return JSON.parse(cacheValue);
  }

  // Otherwise, make the query and store the result in redis
  const result = await exec.apply(this);

  client.hSet(this.hashKey, key, JSON.stringify(result));

  return result;
};

// Clear cache of a specific user
export function clearHash(hashKey) {
  client.del(JSON.stringify(hashKey));
}
