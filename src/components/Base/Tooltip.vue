<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="tooltip relative inline-block">
    <slot />
    <span
      class="tooltiptext bg-brand-white invisible text-brand-black text-center text-sm p-1 px-2 rounded-md absolute mt-1 z-[1]"
      >{{ props.text }}</span
    >
  </div>
</template>

<style scoped>
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
