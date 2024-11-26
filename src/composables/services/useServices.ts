import TodosServices from '@/services/todos'

export function useServices() {
  return {
    todos: TodosServices(),
  }
}
