<script setup lang="ts">
import LayoutDefault from '@/layouts/Default.vue'
import BaseTitle from '@/components/Base/Title.vue'
import TodoFormCreateLoader from '@/components/Todo/FormCreate/Loader.vue'
import TodoFormCreate from '@/components/Todo/FormCreate/index.vue'
import TodoListLoader from '@/components/Todo/List/Loader.vue'
import TodoList from '@/components/Todo/List/index.vue'
import TodoItem from '@/components/Todo/Item/index.vue'
import { ref, defineAsyncComponent } from 'vue'
import type { Todo } from '@/types'

const LazyDialogConfirm = defineAsyncComponent({
  loader: () => import('@/components/Dialog/Confirm.vue'),
})

const todos = ref<Todo[]>([])

const todo = ref('')

const handleCreateTodo = () => {
  console.log('* -> create todo')

  todo.value = ''
}

const isConfirmDialogOpen = ref(false)
</script>

<template>
  <LayoutDefault>
    <section class="space-y-4 mb-8">
      <BaseTitle label="Crie sua tarefa" as="h1" />

      <TodoFormCreateLoader :loading="false">
        <TodoFormCreate v-model="todo" @submited="handleCreateTodo" :loading="false" />
      </TodoFormCreateLoader>
    </section>

    <section class="space-y-2">
      <BaseTitle size="sm" label="Minhas tarefas" />

      <TodoListLoader :loading="false">
        <TodoList v-auto-animate v-if="todos.length > 0">
          <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :id="todo.id"
            :todo="todo.todo"
            :completed="false"
            @complete="() => console.log('* -> complete todo')"
            @edit="() => console.log('* -> edit todo')"
            @remove="(id: string) => (todos = todos.filter((t) => t.id !== id))"
          />
        </TodoList>

        <p class="opacity-80" v-else>Sem tarefas criadas por enquanto</p>
      </TodoListLoader>
    </section>

    <LazyDialogConfirm
      label="Deseja realmente apagar esse Todo?"
      v-model="isConfirmDialogOpen"
      @confirm="() => console.log('confirmou')"
    />
  </LayoutDefault>
</template>
