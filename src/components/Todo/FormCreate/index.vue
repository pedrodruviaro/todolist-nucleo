<script setup lang="ts">
import BaseInput from '@/components/Base/Input.vue'
import BaseButton from '@/components/Base/Button.vue'
import { vAutoFocus } from '@/directives/vAutoFocus'
import { ref } from 'vue'
import type { ZodFormattedError } from 'zod'
import type { Todo } from '@/types'

const props = defineProps<{
  loading: boolean
  errors?: ZodFormattedError<Todo>
}>()

const emits = defineEmits<{
  submited: []
}>()

const todo = defineModel<string>({ required: true })

const todoInputRef = ref<InstanceType<typeof BaseInput> | null>(null)

const handleSubmit = () => {
  emits('submited')

  if (!todoInputRef.value) return
  todoInputRef.value.focusInput()
}
</script>

<template>
  <form class="grid gap-2 sm:flex" @submit.prevent="handleSubmit">
    <BaseInput v-model="todo" v-auto-focus ref="todoInputRef" />
    <BaseButton :loading="props.loading" type="submit">Criar</BaseButton>
  </form>
  <span class="text-red-500 text-sm" v-if="errors?.todo?._errors">{{ errors.todo._errors[0] }}</span>
</template>
