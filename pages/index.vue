<template>
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-2 md:grid-cols-4 justify-around place-items-center gap-4 p-4">
        <div v-for="teavik in filteredTeavik" :key="teavik.ISBN">
          <BookCard :teavik="teavik"/>
        </div>
      </div>
    </div>
</template>

<script setup>

const props = defineProps({
  searchValue: String
})

const client = useSupabaseClient()
const teavik = ref([])

async function fetchTeavik() {
  const { data, error } = await client.from('Teavik').select('*')
  if (error) {
    console.error(error)
    return
  }
  teavik.value = data
}

onMounted(fetchTeavik)

const filteredTeavik = ref([])

function filterTeavik() {
  if (!props.searchValue) {
    filteredTeavik.value = teavik.value
    return
  }

  filteredTeavik.value = teavik.value.filter((item) =>
    item.pealkiri.toLowerCase().includes(props.searchValue.toLowerCase()) ||
    item.autor.toLowerCase().includes(props.searchValue.toLowerCase())
  )
}

watchEffect(() => {
  filterTeavik()
})
</script>