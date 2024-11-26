import { useServices } from '@/composables/services/useServices'
import type { Todo } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  const services = useServices()

  const todos = ref<Todo[]>([])

  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
  const uncompletedTodos = computed(() => todos.value.filter((todo) => !todo.completed))

  const loadTodos = () => {
    todos.value = services.todos.getAll()
  }

  const addTodo = (todo: Todo) => {
    services.todos.create(todo)
    todos.value.push(todo)
  }

  const completeTodo = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (!todo) return

    todo.completed = true
    services.todos.complete(id)
  }

  const remove = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    todos.value.splice(index, 1)

    services.todos.remove(id)
  }

  return { todos, completedTodos, uncompletedTodos, loadTodos, addTodo, completeTodo, remove }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot))
}
