// src/main.js
import { mongoService } from './modules/docker/api.js';
import { dockerGather } from './modules/docker/gather.js';
import { POLL_INTERVAL } from './config.js';

(async () => {
  await mongoService.connect();

  // Initial gathering
  await dockerGather.gatherAll();

  // Periodic gathering
  setInterval(async () => {
    console.log("Gathering Docker information...");
    await dockerGather.gatherAll();
  }, POLL_INTERVAL);
})();
