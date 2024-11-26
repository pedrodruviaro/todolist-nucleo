<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

type Variant = 'solid' | 'ghost' | 'outline' | 'icon'

const props = withDefaults(
  defineProps<{
    label?: string
    to?: string | RouteRecordRaw
    block?: boolean
    variant?: Variant
    loading?: boolean
  }>(),
  {
    block: false,
    variant: 'solid',
    loading: false,
  },
)

const componentToRender = computed(() => (props.to ? RouterLink : 'button'))

const variantClasses = computed(() => ({
  solid: 'bg-brand-blue-base text-brand-white hover:brightness-95',
  ghost: 'hover:bg-neutral-100',
  outline: 'border border-brand-black hover:bg-neutral-100 hover:border-neutral-700',
  icon: 'border aspect-square p-2.5 grid place-items-center hover:bg-neutral-50',
}))

const customButtonClasses = computed(() => [
  {
    'w-full': props.block,
    'max-w-max': !props.block,
    'cursor-not-allowed opacity-80': props.loading,
    'cursor-pointer': !props.loading,
    'px-5 py-1.5': props.variant !== 'icon',
  },
  variantClasses.value[props.variant],
])
</script>

<template>
  <component
    class="flex items-center justify-center gap-2 rounded text-center disabled:opacity-50 disabled:cursor-not-allowed"
    :is="componentToRender"
    :to="props.to"
    :class="customButtonClasses"
    :disabled="props.loading"
  >
    <template v-if="props.label">
      {{ props.label }}
    </template>

    <slot v-else />

    <Icon icon="mdi:loading" class="animate-spin" v-if="props.loading" />
  </component>
</template>
