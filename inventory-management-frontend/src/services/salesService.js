import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/sales';

export const create = async (saleData) => {
  return axios.post(API_URL, saleData);
};

export const get = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const getAll = async () => {
  console.log("Sending request to: " + API_URL)
  return axios.get(API_URL);
};

const salesService = {
  create,
  get,
  getAll
};

export default salesService;