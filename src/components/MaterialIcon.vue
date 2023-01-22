<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'filled',
      validator(value) {
        return [
          'filled',
          'outlined',
          'rounded',
          'sharp',
          'two-tone'
        ].includes(value)
      }
  },
  color: {
    type: String,
    default: 'inherit'
  },
  size: {
    type: [Number, String],
    default: 24
  }
})

const styles = computed(() => {
  return {
    fontSize: parseInt(props.size) + 'px',
    color: props.color,
  }
})
</script>

<template>
  <span class="material-icons" :class="props.type" :style="styles">
    {{ name }}
  </span>
</template>
