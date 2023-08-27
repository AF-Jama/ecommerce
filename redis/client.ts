import { createClient } from 'redis';
import { Redis } from "@upstash/redis";

const client = new Redis({
  url: 'https://desired-kite-44573.upstash.io',
  token: 'Aa4dASQgOTNhNjlhZDQtNTljOS00MjU5LWExNzAtNTU4OWU2ZmVhNjgyYTE5ZmYwNzE5ZjVkNDUzYjlmYTc3ZTAwMTI5MDUxMDg=',
})

// client.on('error', err => console.log('Redis Client Error', err));
// client.on('connect', ()=>console.log('connected to redis'));



export default client;