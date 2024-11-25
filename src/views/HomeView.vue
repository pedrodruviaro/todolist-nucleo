<script setup lang="ts">
import LayoutDefault from '@/layouts/Default.vue'
import BaseTitle from '@/components/Base/Title.vue'
</script>

<template>
  <LayoutDefault>
    <section class="space-y-4 mb-8">
      <BaseTitle label="Crie sua tarefa" as="h1" />
      <form class="grid gap-2 sm:flex">
        <input type="text" placeholder="Estudar 1h de PHP" class="border w-full" />
        <button type="submit" class="border">Add</button>
      </form>
    </section>

    <section class="space-y-2">
      <BaseTitle size="sm" label="Minhas tarefas" />
      <ul>
        <li>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, impedit!</p>
          <div>
            <button>C</button>
            <button>D</button>
          </div>
        </li>
      </ul>
    </section>
  </LayoutDefault>
</template>
