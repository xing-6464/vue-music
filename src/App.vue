<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
  <Player></Player>
</template>

<script setup>
import MHeader from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
import Player from '@/components/player/player.vue'
</script>
