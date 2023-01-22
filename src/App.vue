<script setup>
import RadioPlayer from '@/components/RadioPlayer.vue'

const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}

window.addEventListener('resize', documentHeight)
documentHeight()
</script>

<template>
  <radio-player />
</template>
