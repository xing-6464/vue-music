<template>
  <div class="singer-detail">
    <MusicList
      :songs="songs"
      :title="title"
      :pic="pic"
    />
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/musicList/musicList.vue'

export default {
  name: 'SingerDetail',
  props: {
    singer: Object
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    pic () {
      return this.singer && this.singer.pic
    },
    title () {
      return this.singer && this.singer.name
    }
  },
  components: {
    MusicList
  },
  async created () {
    const result = await getSingerDetail(this.singer)
    this.songs = await processSongs(result.songs)
  }
}

</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
