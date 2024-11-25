<script setup lang="ts">
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'
</script>

<template>
  <div class="grid grid-rows-[max-content_1fr_max-content] min-h-screen">
    <LayoutHeader />
    <main class="container my-10 lg:my-16">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
