<script setup lang="ts">
import BaseSkeleton from '@/components/Base/Skeleton.vue'

const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  { amount: 4 },
)
</script>

<template>
  <div v-if="props.loading" class="grid gap-4">
    <BaseSkeleton class="w-full h-16" v-for="i in props.amount" :key="i" />
  </div>

  <slot v-else />
</template>
