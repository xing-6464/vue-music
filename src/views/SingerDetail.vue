<template>
  <div class="singer-detail">
    <MusicList
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    />
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constant'

export default createDetailComponent('SingerDetail', SINGER_KEY, getSingerDetail)
// export default {
//   name: 'SingerDetail',
//   props: {
//     singer: Object
//   },
//   data () {
//     return {
//       songs: [],
//       loading: true
//     }
//   },
//   computed: {
//     computedSinger () {
//       let ret = null
//       const singer = this.singer

//       if (singer) {
//         ret = singer
//       } else {
//         const catchSinger = storage.session.get(SINGER_KEY)
//         if (catchSinger && catchSinger.mid === this.$route.params.id) {
//           ret = catchSinger
//         }
//       }
//       return ret
//     },
//     pic () {
//       const singer = this.computedSinger
//       return singer && singer.pic
//     },
//     title () {
//       const singer = this.computedSinger
//       return singer && singer.name
//     }
//   },
//   components: {
//     MusicList
//   },
//   async created () {
//     if (!this.computedSinger) {
//       const path = this.$route.matched[0].path
//       this.$router.push({
//         path
//       })
//       return
//     }
//     const result = await getSingerDetail(this.computedSinger)
//     this.songs = await processSongs(result.songs)
//     this.loading = false
//   }
// }

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
