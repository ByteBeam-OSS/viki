// src/modules/docker/api.js
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { DOCKER_API_URL, MONGO_URI } from '../../config.js';


const axiosInstance = axios.create({
    baseURL: 'http://localhost',           // Dummy URL for Axios to parse
  socketPath: '/var/run/docker.sock'
  });
  
  export const dockerApi = {
    async fetchContainers() {
      const response = await axiosInstance.get('/containers/json');
      return response.data;
    },
  
    async fetchServices() {
      const response = await axiosInstance.get('/services');
      return response.data;
    },
  
    async fetchTasks() {
      const response = await axiosInstance.get('/tasks');
      return response.data;
    },
  
    async fetchNodes() {
      const response = await axiosInstance.get('/nodes');
      return response.data;
    }
  };
  
let db;

export const mongoService = {
  async connect() {
    const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    await client.connect();
    db = client.db('viki');
    console.log('Connected to MongoDB');
  },

  async saveContainers(containers) {
    const collection = db.collection('containers');
    await collection.insertMany(containers);
  },

  async saveServices(services) {
    const collection = db.collection('services');
    await collection.insertMany(services);
  },

  async saveNodes(nodes) {
    const collection = db.collection('nodes');
    await collection.insertMany(nodes);
  },

  async saveTasks(tasks) {
    const collection = db.collection('tasks');
    await collection.insertMany(tasks);
  }
};
