import axios from '../utils/axios';

export const getTodo = () => axios.get('/todo');

export const createTodo = (payload) => axios.post(`/todo`, payload);

export const updateTodo = ({ todoData, _id }) => axios.put(`/todo/${_id}`, todoData);

export const completeTodo = (payload) => axios.put(`/todo/updateMany`, payload);

export const deleteTodo = (payload) => axios.delete(`/todo`, { data: payload });
