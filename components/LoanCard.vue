<template>
    <div class="bg-neutral-300 rounded-xl p-2 grid grid-cols-4 w-full mb-4">
        <img class="lg:col-span-1 col-span-4 lg:h-full h-72 justify-self-center lg:mb-0 mb-4 object-cover rounded-xl"
            :src="img_src">
        <div class="lg:col-span-3 col-span-4 flex flex-col justify-center lg:gap-12 gap-4 items-center">
            <div class="text-xl w-full flex lg:flex-row flex-col lg:gap-0 gap-4 justify-around items-center">
                <h1>Pealkiri: {{ laenutus.Teavik_kogu.Teavik.pealkiri }}</h1>
                <h2>Autor: {{ laenutus.Teavik_kogu.Teavik.autor }}</h2>
            </div>
            <div class="text-xl w-full flex lg:flex-row flex-col lg:gap-0 gap-4 justify-around items-center">
                <p>Laenutatud: {{ laenutus.startdate }}</p>
                <p>Tähtaeg: {{ laenutus.enddate }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['user', 'laenutus'])
const img_src = "https://atswlmvttmyajxhfylxi.supabase.co/storage/v1/object/public/teavik-pilt/" + props.laenutus.Teavik_kogu.Teavik.pilt

</script>