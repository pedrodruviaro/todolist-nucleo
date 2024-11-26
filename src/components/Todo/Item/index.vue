<script setup lang="ts">
import BaseButton from '@/components/Base/Button.vue'
import BaseTooltip from '@/components/Base/Tooltip.vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  id: string
  todo: string
  completed: boolean
}>()

const emits = defineEmits<{
  complete: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <li class="p-2.5 border rounded flex justify-between items-center gap-3 flex-wrap sm:flex-nowrap">
    <p :class="{ 'line-through': props.completed }">{{ props.todo }}</p>

    <div class="flex gap-2">
      <BaseTooltip text="Concluir" v-if="!props.completed">
        <BaseButton @click="emits('complete', props.id)" variant="icon">
          <Icon icon="mdi:check" />
        </BaseButton>
      </BaseTooltip>

      <BaseTooltip text="Apagar">
        <BaseButton @click="emits('remove', props.id)" variant="icon">
          <Icon icon="mdi:trash" />
        </BaseButton>
      </BaseTooltip>
    </div>
  </li>
</template>
