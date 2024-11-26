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

  const loading = ref(false)
  const errors = ref<ZodFormattedError<Todo>>()
  const todo = ref('')

  const create = async () => {
    const result = schema.safeParse({ todo: todo.value })

    if (!result.success) {
      errors.value = result.error.format()
      return
    }

    try {
      loading.value = true

      const newTodo: Todo = {
        id: uuid(),
        completed: false,
        todo: todo.value,
      }

      await store.addTodo(newTodo)

      errors.value = undefined
      todo.value = ''
    } catch (error) {
      console.log('error => ', error)
    } finally {
      loading.value = false
    }
  }

  return {
    todo,
    errors,
    loading,
    create,
  }
}
