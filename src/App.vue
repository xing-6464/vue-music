<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view
    :style="viewStyle"
    v-slot="{ Component }"
    name="user"
  >
    <transition appear name="slide">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </transition>
  </router-view>
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
