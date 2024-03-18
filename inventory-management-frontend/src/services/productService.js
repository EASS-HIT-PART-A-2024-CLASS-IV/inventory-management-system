import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/products';

export const getAll = async () => {
  console.log("Sending request to: " + API_URL)
  return axios.get(API_URL);
};

export const get = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const create = async (productData) => {
  return axios.post(API_URL, productData);
};

export const update = async (id, productData) => {
  return axios.put(`${API_URL}/${id}`, productData);
};

export const remove = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const productService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default productService;