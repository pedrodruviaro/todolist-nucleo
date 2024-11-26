import { TODOS_KEY } from '@/constants/localKeys'
import type { Todo } from '@/types'

export default () => ({
  getAll() {
    const todos = localStorage.getItem(TODOS_KEY)
    return todos ? (JSON.parse(todos) as Todo[]) : []
  },

  create(newTodo: Todo) {
    const todos = this.getAll()
    localStorage.setItem(TODOS_KEY, JSON.stringify([...todos, newTodo]))
  },

  complete(id: string) {
    const todos = this.getAll()
    todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = true
      }
      return todo
    })

    localStorage.setItem(TODOS_KEY, JSON.stringify([...todos]))
  },

  remove(id: string) {
    const todos = this.getAll().filter((todo) => todo.id !== id)
    localStorage.setItem(TODOS_KEY, JSON.stringify([...todos]))
  },
})
