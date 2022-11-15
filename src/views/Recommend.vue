<template>
  <div class="recommend">
    推荐页面
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getRecommend } from '@/service/recommend'

export default defineComponent({
  name: 'recommend',
  async created () {
    const result = await getRecommend()
    console.log(result)
  }
})

</script>

<style lang="scss" scoped>

</style>
