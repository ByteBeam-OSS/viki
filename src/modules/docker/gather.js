// src/modules/docker/gather.js
import { dockerApi } from './api.js';
import store from '../../store/index.js';

export const dockerGather = {
  async gatherContainers() {
    const containers = await dockerApi.fetchContainers();
    store.commit('SET_CONTAINERS', containers);
    console.log(`Fetched ${containers.length} containers`);
  },

  async gatherServices() {
    const services = await dockerApi.fetchServices();
    store.commit('SET_SERVICES', services);
    console.log(`Fetched ${services.length} services`);
  },

  async gatherNodes() {
    const nodes = await dockerApi.fetchNodes();
    store.commit('SET_NODES', nodes);
    console.log(`Fetched ${nodes.length} nodes`);
  },

  async gatherTasks() {
    const tasks = await dockerApi.fetchTasks();
    store.commit('SET_TASKS', tasks);
    console.log(`Fetched ${tasks.length} tasks`);
  },

  async gatherAll() {
    await Promise.all([
      this.gatherContainers(),
      this.gatherServices(),
      this.gatherNodes(),
      this.gatherTasks()
    ]);
  }
};
