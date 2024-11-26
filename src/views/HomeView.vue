<script setup lang="ts">
import LayoutDefault from '@/layouts/Default.vue'
import BaseTitle from '@/components/Base/Title.vue'
import TodoFormCreateLoader from '@/components/Todo/FormCreate/Loader.vue'
import TodoFormCreate from '@/components/Todo/FormCreate/index.vue'
import TodoListLoader from '@/components/Todo/List/Loader.vue'
import TodoList from '@/components/Todo/List/index.vue'
import TodoItem from '@/components/Todo/Item/index.vue'
import BaseButton from '@/components/Base/Button.vue'
import { ref, defineAsyncComponent, onMounted, computed, watchEffect, watch } from 'vue'
import { useTodosStore } from '@/stores/todos/useTodosStore'
import { useTodoCreate } from '@/composables/todos/useTodoCreate'

// Load todos
const loadingTodos = ref(true)
const todosStore = useTodosStore()

onMounted(() => {
  try {
    loadingTodos.value = true
    todosStore.loadTodos()
  } catch (error) {
    // error handling
  } finally {
    loadingTodos.value = false
  }
})

const seletedFilter = ref<'completed' | 'uncompleted'>('uncompleted')
const todos = computed(() => {
  return seletedFilter.value === 'completed' ? todosStore.completedTodos : todosStore.uncompletedTodos
})

// Create
const { todo, errors, create } = useTodoCreate()

// Remove
const LazyDialogConfirm = defineAsyncComponent({
  loader: () => import('@/components/Dialog/Confirm.vue'),
})

const isConfirmDialogOpen = ref(false)
const todoToRemove = ref<string | null>(null)

const handleRemove = (id: string) => {
  todoToRemove.value = id
  isConfirmDialogOpen.value = true
}

const handleConfirmRemove = () => {
  if (todoToRemove.value) {
    todosStore.remove(todoToRemove.value)
    todoToRemove.value = null
  }
  isConfirmDialogOpen.value = false
}

watch(
  () => isConfirmDialogOpen.value,
  () => {
    if (!isConfirmDialogOpen.value) {
      todoToRemove.value = null
    }
  },
  { immediate: false },
)
</script>

<template>
  <LayoutDefault>
    <section class="space-y-4 mb-10">
      <BaseTitle label="Crie sua tarefa" as="h1" />
      <TodoFormCreateLoader :loading="false">
        <TodoFormCreate v-model="todo" @submited="create" :errors="errors" :loading="false" />
      </TodoFormCreateLoader>
    </section>

    <section class="space-y-4">
      <div class="flex flex-wrap gap-3 justify-between">
        <BaseTitle size="sm" label="Minhas tarefas" />

        <div class="flex gap-2">
          <BaseButton
            :variant="seletedFilter === 'uncompleted' ? 'solid' : 'ghost'"
            @click="seletedFilter = 'uncompleted'"
            >Incompletas</BaseButton
          >
          <BaseButton
            :variant="seletedFilter === 'completed' ? 'solid' : 'ghost'"
            @click="seletedFilter = 'completed'"
            >Completadas</BaseButton
          >
        </div>
      </div>

      <TodoListLoader :loading="false">
        <TodoList v-auto-animate v-if="todos.length > 0">
          <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :id="todo.id"
            :todo="todo.todo"
            :completed="todo.completed"
            @complete="(id: string) => todosStore.completeTodo(id)"
            @remove="handleRemove"
          />
        </TodoList>

        <p class="opacity-80" v-else>Sem tarefas por aqui</p>
      </TodoListLoader>
    </section>

    <LazyDialogConfirm
      label="Deseja realmente apagar esse Todo?"
      v-model="isConfirmDialogOpen"
      @confirm="handleConfirmRemove"
    />
  </LayoutDefault>
</template>
