import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/todos/` 

const todoApi = axios.create({
  baseURL: BASE_URL
})

export const getTodos = async () => {
  const response = await todoApi.get(BASE_URL)
  return response.data;
}

export const createTodo = async (title: string) => {
  const response = await todoApi.post(BASE_URL, {title, completed: false})
  return response.data
}

export const checkTodo = async (id: string) => {
  const response = await todoApi.put(`${BASE_URL+ id}`)
  return response.data
}

export const deleteTodo = async (id: string) => {
  const response = await todoApi.delete(`${BASE_URL+ id}`)
  return response.data
}