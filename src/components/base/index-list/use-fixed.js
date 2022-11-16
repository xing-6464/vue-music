import { computed, nextTick, ref, watch } from 'vue'

export default function useFixed (props) {
  const groupRef = ref(null)
  const listHeight = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  watch(scrollY, (newY) => {
    const listHeightValue = listHeight.value

    for (let i = 0; i < listHeightValue.length - 1; i++) {
      const heightTop = listHeightValue[i]
      const heightBottom = listHeightValue[i + 1]

      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
      }
    }
  })

  function calculate () {
    const list = groupRef.value.children
    const listHeightValue = listHeight.value
    let height = 0

    listHeightValue.length = 0
    listHeightValue.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightValue.push(height)
    }
  }

  function onScroll (pos) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle
  }
}
