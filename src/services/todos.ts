import type { Todo } from '@/types'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/todos',
  timeout: 6000,
})

export default () => ({
  async getAll() {
    try {
      const response = await api.get<Todo[]>('/')
      return response.data
    } catch (error) {
      throw new Error('Não foi possível buscar os dados')
    }
  },

  async create(newTodo: Todo) {
    try {
      await api.post('/', newTodo)
    } catch (error) {
      throw new Error('Não foi possível criar o todo')
    }
  },

  async complete(todo: Todo) {
    try {
      await api.put(`/${todo.id}`, todo)
    } catch (error) {
      throw new Error('Não foi possível completar o todo')
    }
  },

  async remove(id: string) {
    try {
      await api.delete(`/${id}`)
    } catch (error) {
      throw new Error('Não foi possível remover o todo')
    }
  },
})
