<template>
  <div class="search">
    <div class="search-input-wrapper">
      <SearchInput v-model="query"></SearchInput>
    </div>
    <Scroll
      class="search-content"
      v-show="!query"
      ref="scrollRef"
    >
      <div class="">
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
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <Confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          ></Confirm>
          <SearchList
          :searches="searchHistory"
          @select="addQuery"
          @delete="deleteSearch"
          ></SearchList>
        </div>
      </div>
    </Scroll>
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
import { computed, ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SearchInput from '@/components/search/search-input.vue'
import SearchList from '@/components/base/search-list/search-list.vue'
import Suggest from '@/components/search/suggest.vue'
import Confirm from '@/components/base/confirm/confirm.vue'
import Scroll from '@/components/wrap-scroll/index'
import { getHotKeys } from '@/service/search'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import useSearchHistory from '@/components/search/use-search-history'

const query = ref('')
const hotKeys = ref([])
const selectedSinger = ref(null)
const scrollRef = ref(null)
const confirmRef = ref(null)

const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)

const router = useRouter()

const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

getHotKeys().then(result => {
  hotKeys.value = result.hotKeys
})

watch(query, async newQuery => {
  if (!newQuery) {
    await nextTick()
    refreshScroll()
  }
})

function refreshScroll () {
  scrollRef.value.scroll.refresh()
}

function addQuery (s) {
  query.value = s
}

function selectSong (song) {
  saveSearch(query.value)
  store.dispatch('addSong', song)
}

function selectSinger (singer) {
  saveSearch(query.value)
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/search/${singer.mid}`
  })
}

function cacheSinger (singer) {
  storage.session.set(SINGER_KEY, singer)
}

function showConfirm () {
  confirmRef.value.show()
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
