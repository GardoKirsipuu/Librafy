<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto f-full w-full">
        <div class="relative inset-y-20 mx-auto p-5 sm:w-[36rem] w-11/12 shadow-lg rounded-2xl bg-teal-500">
            <div class="flex flex-row text-3xl justify-between">
                <h1 class="mx-2">Logi sisse</h1>
                <Icon @click="$emit('closeModal')" class="text-3xl cursor-pointer" name="material-symbols:close" />
            </div>
            <form @submit.prevent="handleSignin" class="mt-4 grid justify-items-center">
                <label class="justify-self-start mb-2 ml-2 text-xl" for="email">E-mail</label>
                <input class="rounded-2xl p-3 mb-4 w-full focus:outline-none focus:ring" placeholder="mail@mail.ee" type="email" v-model="emailLogin" id="email" no-filter/>
                <label class="justify-self-start mb-2 ml-2 text-xl" for="parool">Parool</label>
                <input class="rounded-2xl p-3 mb-4 w-full focus:outline-none focus:ring" placeholder="********" v-model="paroolLogin" type="password" id="parool"/>
                <p class="text-red-500 text-center font-semibold">{{message}}</p>
                <p class="text-center mb-4">Pole kasutajat? Registreeri <a class="underline font-normal cursor-pointer hover:font-semibold" @click="$emit('changeModal')">siin</a></p>
                <button class="rounded-2xl p-3 w-1/3 bg-teal-700 text-white transition hover:bg-teal-800 hover:scale-105">Logi sisse</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])
const client = useSupabaseAuthClient()
const emailLogin = ref("")
const paroolLogin = ref("")
const message = ref("")

const handleSignin = async ({email, parool}) => {
    if (emailLogin.value === "" || paroolLogin.value === "") {
        message.value = "Palun täida kõik väljad"
        console.log(emailLogin.value, paroolLogin.value)
        return
    }

    const { user, error } = await client.auth.signInWithPassword({
        email: emailLogin.value,
        password: paroolLogin.value
    })

    if (error) {
        if (error.message === "Invalid login credentials") {
            message.value = "Vale e-mail või parool"
            console.log(emailLogin.value, paroolLogin.value)
        } else {
            message.value = error.message
        }
        return
    } else {
        alert("Sisselogimine õnnestus")
        closeClick()
        return user;
    }
}

const closeClick = () => {
    emit('closeModal')
}
</script>