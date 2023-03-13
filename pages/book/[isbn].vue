<template>
    <div>
        <div v-if="isLoading" class="h-[80vh] flex justify-center items-center">
            <h1>Loading...</h1>
        </div>
        <div v-else-if="teavik" class="grid grid-cols-3 py-4">
            <div class="md:col-span-1 col-span-3 flex justify-center items-center px-4">
                <img :src="img_src" class="w-full h-[84vh] object-cover rounded-2xl">
            </div>
            <div class="px-4 md:col-span-1 col-span-3 flex flex-col items-center">
                <h1 class="text-4xl font-bold text-center">{{ teavik.pealkiri }}</h1>
                <h2 class="text-2xl font-semibold py-4">{{ teavik.autor }}</h2>
                <p class="text-md">{{ teavik.kirjeldus }}</p>
                <button @click="lmao()" class="bg-teal-400 py-2 w-1/2 my-6 rounded-2xl text-2xl font-semibold">Broneeri</button>
            </div>
            <div class="md:col-span-1 col-span-3 flex flex-col items-center font-semibold text-lg">
                <h1>ISBN: {{ teavik.ISBN }}</h1>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onBeforeMount, ref } from 'vue';

const route = useRoute()

const client = useSupabaseClient()

const isLoading = ref(false)
const teavik = ref(null)
const img_src = ref(null)

async function fetchTeavik() {
    isLoading.value = true
    const { data, error } = await client.from('Teavik').select('*').eq('ISBN', route.params.isbn)
    if (error) {
        console.error(error)
        return
    }
    if (data && data.length > 0) {
        teavik.value = data[0];
        img_src.value = "https://atswlmvttmyajxhfylxi.supabase.co/storage/v1/object/public/teavik-pilt/" + teavik.value.pilt
    } else {
        teavik.value = null;
    }
    isLoading.value = false
}

onBeforeMount(fetchTeavik)

const lmao = () => {
    console.log("lmao")
}
</script>
  