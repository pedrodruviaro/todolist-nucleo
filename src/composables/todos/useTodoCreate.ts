import { useTodosStore } from '@/stores/todos/useTodosStore'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'
import { z, type ZodFormattedError } from 'zod'
import type { Todo } from '@/types'

const schema = z.object({
  todo: z.string().min(2, 'Insira pelo menos 2 caracteres'),
})

export function useTodoCreate() {
  const store = useTodosStore()

  const errors = ref<ZodFormattedError<Todo>>()
  const todo = ref('')

  const create = () => {
    const result = schema.safeParse({ todo: todo.value })

    if (!result.success) {
      errors.value = result.error.format()
      return
    }

    const newTodo: Todo = {
      id: uuid(),
      completed: false,
      todo: todo.value,
    }

    store.addTodo(newTodo)

    errors.value = undefined
    todo.value = ''
  }

  return {
    todo,
    errors,
    create,
  }
}
