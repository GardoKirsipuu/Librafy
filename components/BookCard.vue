<template>
    <NuxtLink :to="`/book/${props.teavik.ISBN}`">
        <div class="rounded-2xl shadow-xl bg-white max-w-sm text-center h-96 xl:h-[36rem]">
            <img class="rounded-t-2xl h-3/4 w-full object-cover" :src="img_src">
            <div class="p-2 h-1/4 xl:text-xl">
                <h1 class="font-bold mb-2">{{ props.teavik.pealkiri }}</h1>
                <p class="">{{ props.teavik.autor }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
    const props = defineProps(['teavik'])

    const img_src = "https://atswlmvttmyajxhfylxi.supabase.co/storage/v1/object/public/teavik-pilt/" + props.teavik.pilt
</script>