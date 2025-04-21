
import axios from "axios";

const API_URL = "https://todo-fastapi-sjxd.onrender.com";

export const getTodos = async (completed) => {
  let url = API_URL;
  if (completed !== undefined) {
    url = `${API_URL}/filter/status/${completed}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const createTodo = async (task) => {
  const response = await axios.post(API_URL, { task });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateTodo = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};
