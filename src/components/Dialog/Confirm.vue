<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { nextTick, ref, watch } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    label: string
    confirmLabel?: string
  }>(),
  { confirmLabel: 'Confirmar' },
)

const emits = defineEmits<{
  confirm: []
}>()

const isOpen = defineModel<boolean>()

const modalRef = ref<HTMLElement | null>(null)

useClickOutside(modalRef, () => (isOpen.value = false))

const { activate, deactivate } = useFocusTrap(modalRef)

watch(
  () => isOpen.value,
  async (open) => {
    if (open) {
      await nextTick()
      activate()
    } else {
      deactivate()
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-transition">
      <div
        v-show="isOpen"
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 top-0 grid h-full w-full place-items-center bg-neutral-500 bg-opacity-50"
        @keydown.esc="isOpen = false"
      >
        <Transition name="modal-transition" mode="out-in">
          <div ref="modalRef" v-if="isOpen" class="w-[94%] max-w-max rounded-lg bg-neutral-50 p-4">
            <BaseTitle size="xs" :label="props.label" />
            <div class="mt-6 flex items-center gap-4">
              <BaseButton
                label="Cancelar"
                variant="ghost"
                :disabled="props.loading"
                @click="isOpen = false"
              />

              <BaseButton :label="props.confirmLabel" :loading="props.loading" @click="emits('confirm')" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.3s ease;
}
.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0;
}

.modal-transition-enter-active,
.modal-transition-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.modal-transition-enter-from,
.modal-transition-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
