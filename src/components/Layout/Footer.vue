<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="py-4 shadow-sm">
    <div class="container">
      <p class="text-sm text-center opacity-85">&copy; {{ currentYear }} - TodoList</p>
    </div>
  </footer>
</template>
