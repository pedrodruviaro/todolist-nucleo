<script setup lang="ts">
import BaseSkeleton from '@/components/Base/Skeleton.vue'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-2 sm:flex">
    <BaseSkeleton class="w-full h-9" />
    <BaseSkeleton class="w-20 h-9" />
  </div>

  <slot v-else />
</template>
