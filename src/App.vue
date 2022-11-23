<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle"></router-view>
  <Player></Player>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import MHeader from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
import Player from '@/components/player/player.vue'

const store = useStore()
const playlist = computed(() => store.state.playlist)

const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : '0'
  return {
    bottom
  }
})
</script>
