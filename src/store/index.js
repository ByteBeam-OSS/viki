// src/store/index.js
import Vuex from 'vuex';
import { mongoService } from '../modules/docker/api.js';

export default new Vuex.Store({
  state: {
    containers: [],
    services: [],
    nodes: [],
    tasks: []
  },
  mutations: {
    SET_CONTAINERS(state, containers) {
      state.containers = containers;
      mongoService.saveContainers(containers);  // Sync to MongoDB
    },
    SET_SERVICES(state, services) {
      state.services = services;
      mongoService.saveServices(services);      // Sync to MongoDB
    },
    SET_NODES(state, nodes) {
      state.nodes = nodes;
      mongoService.saveNodes(nodes);            // Sync to MongoDB
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
      mongoService.saveTasks(tasks);            // Sync to MongoDB
    }
  }
});
