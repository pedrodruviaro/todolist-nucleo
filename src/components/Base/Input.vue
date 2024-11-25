<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string>()

const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
  if (!inputRef.value) return
  inputRef.value.focus()
}

defineExpose({
  focusInput,
})
</script>

<template>
  <input
    type="text"
    placeholder="Estudar 1h de PHP"
    class="border rounded px-2.5 py-1.5 text-base text-brand-black focus:outline-brand-blue-base w-full"
    ref="inputRef"
    v-model="model"
  />
</template>
