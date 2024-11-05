// src/config.js
export const DOCKER_API_URL = '/var/run/docker.sock';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27018/viki';
export const POLL_INTERVAL = 60000; // Poll every 60 seconds

