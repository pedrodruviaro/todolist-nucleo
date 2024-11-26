import { useServices } from '@/composables/services/useServices'
import type { Todo } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  const services = useServices()

  const todos = ref<Todo[]>([])

  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
  const uncompletedTodos = computed(() => todos.value.filter((todo) => !todo.completed))

  const loadTodos = async () => {
    try {
      const response = await services.todos.getAll()

      if (response) {
        todos.value = response
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async (todo: Todo) => {
    try {
      await services.todos.create(todo)
      todos.value.push(todo)
    } catch (error) {
      console.log(error)
    }
  }

  const completeTodo = async (id: string) => {
    try {
      const todo = todos.value.find((todo) => todo.id === id)
      if (!todo) return

      await services.todos.complete(todo)
      todo.completed = true
    } catch (error) {
      console.log(error)
    }
  }

  const remove = async (id: string) => {
    try {
      await services.todos.remove(id)

      const index = todos.value.findIndex((todo) => todo.id === id)
      todos.value.splice(index, 1)
    } catch (error) {
      console.log(error)
    }
  }

  return { todos, completedTodos, uncompletedTodos, loadTodos, addTodo, completeTodo, remove }
})
