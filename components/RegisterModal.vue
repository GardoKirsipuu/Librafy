<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto f-full w-full">
        <div class="relative inset-y-20 mx-auto p-5 sm:w-[36rem] w-11/12 shadow-lg rounded-2xl bg-teal-500">
            <div class="flex flex-row text-3xl justify-between">
                <h1 class="">Registreeri</h1>
                <Icon @click="closeClick()" class="text-3xl cursor-pointer" name="material-symbols:close" />
            </div>
            <form @submit.prevent="handleSignup" class="mt-4 grid justify-items-center">
                <label class="justify-self-start mb-2 ml-2 text-xl">E-post</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" type="email" placeholder="mail@mail.ee" v-model="email"/>
                <label class="justify-self-start mb-2 ml-2 text-xl">Eesnimi</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" placeholder="Eesnimi" v-model="eesnimi"/>
                <label class="justify-self-start mb-2 ml-2 text-xl">Perenimi</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" placeholder="Perenimi" v-model="perenimi"/>
                <label class="justify-self-start mb-2 ml-2 text-xl">Isikukood</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" placeholder="Isikukood" v-model="isikukood"/>
                <label class="justify-self-start mb-2 ml-2 text-xl">Parool</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" type="password" placeholder="Parool" v-model="parool"/>
                <label class="justify-self-start mb-2 ml-2 text-xl">Parool uuesti</label>
                <input class="rounded-2xl p-3 mb-3 w-full focus:outline-none focus:ring" type="password" placeholder="Parool uuesti" v-model="paroolUuesti"/>
                <button type="submit" class="rounded-2xl p-3 sm:w-1/3 bg-teal-700 text-white transition hover:bg-teal-800 hover:scale-105">Loo kasutaja</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])
const client = useSupabaseAuthClient()

const email = ref("")
const eesnimi = ref("")
const perenimi = ref("")
const isikukood = ref("")
const parool = ref("")
const paroolUuesti = ref("")

const handleSignup = async () => {
    if (email.value === "" || eesnimi.value === "" || perenimi.value === "" || isikukood.value === "" || parool.value === "" || paroolUuesti.value === "") {
        alert("Täida kõik väljad!")
        return
    }

    if (isikukood.value.length !== 11) {
        alert("Isikukood peab olema 11 tähemärki pikk!")
        return
    }

    if (isikukood.value.match(/^[0-9]+$/) === null) {
        alert("Isikukood peab olema ainult numbrid!")
        return
    }

    if (parool.value.length < 8) {
        alert("Parool peab olema vähemalt 8 tähemärki pikk!")
        return
    }

    if (parool.value !== paroolUuesti.value) {
        alert("Paroolid ei kattu!")
        return
    }

    const { user, error } = await client.auth.signUp({
        email: email.value,
        password: parool.value,
        options: {
            data: {
                eesnimi: eesnimi.value,
                perenimi: perenimi.value,
                isikukood: isikukood.value
            }
        }
    })

    if (error) {
        alert(error.message)
        return
    } else {
        alert("Kasutaja loodud!")
        return user
        closeClick()
        window.location.reload()
    }
}

const closeClick = () => {
    emit('closeModal')
}
</script>