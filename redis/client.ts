import { createClient } from 'redis';
import { Redis } from "@upstash/redis";

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

// client.on('error', err => console.log('Redis Client Error', err));
// client.on('connect', ()=>console.log('connected to redis'));



export default client;