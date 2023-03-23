<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto f-full w-full">
        <div class="relative inset-y-20 mx-auto p-5 sm:w-[36rem] w-11/12 shadow-lg rounded-2xl bg-teal-500">
            <div class="flex flex-row text-3xl justify-end">
                <Icon @click="closeClick" class="text-3xl cursor-pointer" name="material-symbols:close" />
            </div>
            <form @submit.prevent="handleLoan" class="mt-4 grid justify-items-center">
                <label class="justify-self-start mb-2 ml-2 text-xl" for="email">Vali raamatukogu, kust broneerida</label>
                <select class="rounded-2xl p-3 mb-4 w-full focus:outline-none focus:ring" v-model="tkId">
                    <option v-for="tk in props.tk" :value="tk.id">{{ tk.Raamatukogud.nimi }}</option>
                </select>

                <button
                    class="rounded-2xl p-3 w-1/3 bg-teal-700 text-white transition hover:bg-teal-800 hover:scale-105">Broneeri</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])
const client = useSupabaseAuthClient()
const props = defineProps(['tk', 'user', 'isbn'])
const tkId = ref(null)
const handleLoan = async () => {
    const { data, error } = await client.from('Laenutus').insert([
        {
            TK_ID: tkId.value,
            user_id: props.user.id,
            ISBN: props.isbn
        }
    ])
    if (error) {
        console.log(error)
        console.log(client)
        console.log(props.user.id)
    } else {
        alert('Broneeritud edukalt!')
        closeClick()
        window.location.reload()
    }
}

const closeClick = () => {
    emit('closeModal')
}
</script>