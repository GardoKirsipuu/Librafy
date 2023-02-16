<template>
    <div class="max-w-screen py-4 flex flex-row flex-wrap justify-center items-center bg-teal-400 shadow-lg">
        <div class="md:order-1 basis-1/2 md:basis-1/4 md:text-3xl text-2xl px-8">
            <NuxtLink class="flex flex-row" to="/">
                <Icon class="md:text-4xl text-3xl" name="material-symbols:menu-book-outline" />
                <p>Librafy</p>
            </NuxtLink>
        </div>
        <div class="md:order-3 basis-1/2 md:basis-1/4 text-end pr-8 md:text-3xl text-2xl">
            <Icon name="material-symbols:account-circle" />
            <a href="#" class="align-middle" @click="showLoginModal = !showLoginModal">Logi sisse</a>
        </div>
        <div class="md:order-2 basis-full md:basis-2/4 text-center mt-4 md:mt-0">
            <input class="md:w-3/4 text-2xl rounded-2xl p-2" placeholder="Otsi raamat"/>
        </div>
    </div>

    <LoginModal v-show="showLoginModal" @close-modal="showLoginModal = !showLoginModal"/>
</template>

<script setup>
    const showLoginModal = ref(false)
</script>