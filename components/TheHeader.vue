<template>
    <div class="max-w-screen py-4 flex flex-row flex-wrap justify-center items-center bg-teal-500 shadow-lg">
        <div class="md:order-1 basis-1/2 md:basis-1/4 md:text-3xl text-2xl px-8">
            <NuxtLink class="flex flex-row hover:font-semibold" to="/">
                <Icon class="md:text-4xl text-3xl" name="material-symbols:menu-book-outline" />
                <p>Librafy</p>
            </NuxtLink>
        </div>
        <div v-if="!props.user" class="md:order-3 basis-1/2 md:basis-1/4 text-end pr-8 md:text-3xl text-2xl">
            <Icon name="material-symbols:account-circle" />
            <a href="#" class="align-middle" @click="showLoginModal = !showLoginModal">Logi sisse</a>
        </div>
        <div v-else
            class="md:order-3 basis-1/2 md:basis-1/4 text-end pr-8 md:text-3xl text-2xl hover:font-semibold relative"
            @mouseleave="showDropdown = false">
            <Icon name="material-symbols:account-circle" @click="showDropdown = !showDropdown" class="cursor-pointer" />
            <a href="#" @click="showDropdown = !showDropdown" class="align-middle">{{ props.user.user_metadata.eesnimi
            }}</a>
            <Dropdown @closeDropdown="showDropdown = false" id="dropdown" v-show="showDropdown" :user="props.user"
                class="absolute right-0 md:rounded-2xl rounded-b-2xl" />
        </div>
        <div class="md:order-2 basis-full md:basis-2/4 text-center mt-4 md:mt-0">
            <input class="w-3/4 text-2xl rounded-lg py-2 px-2" placeholder="Otsi raamat" v-model="search"
                @input="$emit('search', search)" />
        </div>
    </div>

    <LoginModal v-show="showLoginModal" @close-modal="showLoginModal = !showLoginModal"
        @change-modal="showLoginModal = !showLoginModal, showRegisterModal = !showRegisterModal" />
    <RegisterModal v-show="showRegisterModal" @close-modal="showRegisterModal = !showRegisterModal" />
</template>

<script setup>
const search = useState('search')
const props = defineProps(['user'])
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showDropdown = ref(false)

</script>