<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      :style="bgImageStyle"
      ref="baImage"
      >
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div
          v-show="songs.length > 0"
          class="play-btn"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放</span>
        </div>
      </div>
      <div
        class="filter"
        :style="filterStyle"
      ></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
          :rank="rank"
        ></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SongList from '@/components/base/song-list/song-list'
import Scroll from '@/components/wrap-scroll/index'
// import Scroll from '@/components/base/scroll/scroll.vue'

const RESERVED_HEIGHT = 40

export default {
  name: 'musicList',
  components: {
    SongList,
    Scroll
  },
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default () {
        return '抱歉, 没有找到部分的歌曲'
      }
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0
    }
  },
  computed: {
    bgImageStyle () {
      let zIndex = 0
      let height = 0
      let translateZ = 0
      let paddingTop = '70%'
      let scale = 1
      const scrollY = this.scrollY

      if (scrollY > this.maxTranslateY) {
        zIndex = 10
        paddingTop = 0
        height = `${RESERVED_HEIGHT}px`
        translateZ = 1
      }

      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }

      return {
        backgroundImage: `url(${this.pic})`,
        zIndex,
        paddingTop,
        height,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      }
    },
    filterStyle () {
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      const { min } = Math

      if (scrollY >= 0) {
        blur = min(this.maxTranslateY / imageHeight, scrollY / imageHeight) * 20
      }

      return {
        backdropFilter: `blur(${blur}px)`
      }
    },
    playBtnStyle () {
      let display = ''
      if (this.scrollY >= this.maxTranslateY) {
        display = 'none'
      }
      return {
        display
      }
    },
    scrollStyle () {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        top: `${this.imageHeight}px`,
        bottom
      }
    },
    noResult () {
      return !this.loading && !this.songs.length
    },
    ...mapState([
      'playlist'
    ])
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onScroll (pos) {
      this.scrollY = -pos.y
    },
    selectItem ({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random () {
      this.randomPlay(this.songs)
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  mounted () {
    this.imageHeight = this.$refs.baImage.clientHeight
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
  }
}
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
