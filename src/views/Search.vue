<template>
  <div class="search">
    <div class="search-input-wrapper">
      <SearcchInput v-model="query"></SearcchInput>
    </div>
    <div class="search-content" v-show="!query">
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            class="item"
            v-for="item in hotKeys"
            :key="item.id"
            @click="addQuery(item.key)"
          >
            <span>{{item.key}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <Suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></Suggest>
    </div>
  </div>
  <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SearcchInput from '@/components/search/search-input.vue'
import Suggest from '@/components/search/suggest.vue'
import { getHotKeys } from '@/service/search'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

const query = ref('')
const hotKeys = ref([])
const selectedSinger = ref(null)

const store = useStore()

const router = useRouter()

watch(query, (val) => {
  console.log(val)
})

getHotKeys().then(result => {
  hotKeys.value = result.hotKeys
})

function addQuery (s) {
  query.value = s
}

function selectSong (song) {
  store.dispatch('addSong', song)
}

function selectSinger (singer) {
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/search/${singer.mid}`
  })
}

function cacheSinger (singer) {
  storage.session.set(SINGER_KEY, singer)
}

</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
