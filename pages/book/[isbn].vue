<template>
    <div class="min-h-[80vh] flex md:flex-1 2xl:items-center justify-center">
        <div v-if="isLoading" class="h-[80vh] flex justify-center items-center">
            <div class="wrapper">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
            </div>
        </div>
        <div v-else-if="teavik" class="grid grid-cols-4 py-4">
            <div class="md:col-span-1 col-span-4 flex justify-center items-center px-4">
                <img :src="img_src" class="md:h-[36rem] object-cover rounded-2xl">
            </div>
            <div class="px-4 md:col-span-2 col-span-4 md:pt-0 pt-4 flex flex-col items-center">
                <h1 class="text-4xl font-bold text-center">{{ teavik.pealkiri }}</h1>
                <h2 class="text-2xl font-semibold py-4">{{ teavik.autor }}</h2>
                <p class="text-md">{{ teavik.kirjeldus }}</p>
            </div>
            <div
                class="md:col-span-1 col-span-4 md:pt-0 pt-8 flex flex-col justify-between items-center font-semibold text-lg">
                <div class="flex flex-col gap-8">
                    <h1>ISBN: {{ teavik.ISBN }}</h1>
                    <h1>lmao</h1>
                </div>
                <button @click="lmao()"
                    class="bg-teal-400 hover:bg-teal-300 py-2 w-1/2 my-6 rounded-2xl text-2xl font-semibold">Broneeri</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
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

<style>
.wrapper {
    width: 200px;
    height: 60px;
    position: relative;
    z-index: 1;
}

.circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: rgb(45 212 191);
    left: 15%;
    transform-origin: 50%;
    animation: circle7124 .5s alternate infinite ease;
}

@keyframes circle7124 {
    0% {
        top: 60px;
        height: 5px;
        border-radius: 50px 50px 25px 25px;
        transform: scaleX(1.7);
    }

    40% {
        height: 20px;
        border-radius: 50%;
        transform: scaleX(1);
    }

    100% {
        top: 0%;
    }
}

.circle:nth-child(2) {
    left: 45%;
    animation-delay: .2s;
}

.circle:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
}

.shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: shadow046 .5s alternate infinite ease;
}

@keyframes shadow046 {
    0% {
        transform: scaleX(1.5);
    }

    40% {
        transform: scaleX(1);
        opacity: .7;
    }

    100% {
        transform: scaleX(.2);
        opacity: .4;
    }
}

.shadow:nth-child(4) {
    left: 45%;
    animation-delay: .2s
}

.shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
}
</style>
  