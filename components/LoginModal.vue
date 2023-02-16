<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto f-full w-full">
        <div class="relative inset-y-20 mx-auto p-5 sm:w-[36rem] w-11/12 shadow-lg rounded-2xl bg-teal-400">
            <div class="flex flex-row text-xl justify-between">
                <h1 class="">Logi sisse</h1>
                <Icon @click="$emit('closeModal')" class="text-2xl cursor-pointer" name="material-symbols:close" />
            </div>
            <div class="mt-4 grid justify-items-center">
                <input class="rounded-2xl p-3 mb-4 w-full" placeholder="E-post"/>
                <input class="rounded-2xl p-3 mb-4 w-full" placeholder="Parool"/>
                <p class="text-center mb-4">Pole kasutajat? Registreeri <a class="underline font-normal cursor-pointer hover:font-semibold" onClick="">siin</a></p>
                <button class="rounded-2xl p-3 w-1/3 bg-teal-700 text-white">Logi sisse</button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>