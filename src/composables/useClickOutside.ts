import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, callback: () => void) {
  const isOutside = ref(false)

  const handleClick = (event: MouseEvent) => {
    if (target.value && !target.value.contains(event.target as Node)) {
      isOutside.value = true
      callback()
    } else {
      isOutside.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick)
  })

  return { isOutside }
}
