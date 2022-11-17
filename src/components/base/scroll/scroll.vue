<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
import useScroll from './use-scroll'

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['scroll'])

const rootRef = ref(null)
const scroll = useScroll(rootRef, props, emits)

defineExpose({
  scroll
})

</script>
