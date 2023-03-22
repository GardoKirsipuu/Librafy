<template>
    <div v-if="!client.headers.Authorization" class="flex flex-1 justify-center items-center min-h-[80vh] text-2xl">
        <p>Selle lehe vaatamiseks pead olema sisse logitud</p>
    </div>

    <div v-else class="grid grid-cols-3 min-h-[80vh] items-center">
        <div class="md:col-span-2 col-span-3 p-6 md:text-xl text-lg">

            <div class="flex flex-col justify-center ">
                <label for="pealkiri">Pealkiri</label>
                <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="pealkiri" v-model="pealkiri">

                <label for="autor">Autor</label>
                <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="autor" v-model="autor">

                <label for="ISBN">ISBN kood</label>
                <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="ISBN" v-model="ISBN">

                <label for="kirjeldus">Kirjeldus</label>
                <textarea class="bg-neutral-200 rounded-2xl p-2 mb-4 resize-y" id="kirjeldus" v-model="kirjeldus"></textarea>
            </div>

            <div class="flex md:flex-row flex-col md:justify-evenly justify-between">
                <div class="flex flex-col md:w-1/3 md:mb-0 mb-4">
                    <label for="raamatukogu">Raamatukogu</label>
                    <select class="bg-neutral-200 flex-initial p-2 rounded-2xl mt-4" v-model="raamatukoguId" id="raamatukogu">
                        <option disabled selected hiddden>Vali raamatukogu</option>
                        <option v-for="raamatukogu in raamatukogud" :value="raamatukogu.id">{{ raamatukogu.nimi }}</option>
                    </select>
                </div>
                <div class="flex flex-col md:w-1/3">
                    <label for="kogus">Raamatute kogus</label>
                    <input class="bg-neutral-200 flex-initial p-2 rounded-2xl mt-4" type="number" v-model.number="kogus" placeholder="Raamatute kogus">
                </div>
            </div>

        </div>

        <div class="md:col-span-1 col-span-3 flex flex-col items-center p-6 text-xl">
            <label class="bg-teal-400 hover:bg-teal-300 p-3 rounded-2xl text-xl" for="uploadPilt">Lae ülesse raamatu kaanest pilt</label>
            <input type="file" name="pilt" accept="image/png, image/jpeg" id="uploadPilt" @change="handleFileUpload" hidden>
            <div v-if="uploadPilt" class="flex flex-col items-center mt-4">
                <img class="w-1/2 h-full" :src="uploadPilt">
                <button class="bg-teal-400 hover:bg-teal-300 py-2 px-4 rounded-2xl text-xl mt-4" @click="uploadPilt = null">Eemalda pilt</button>
            </div>
        </div>

        <div class="col-span-3 flex justify-center h-max">
            <button @click="handleTeavikUpload" class="bg-teal-400 hover:bg-teal-300 py-2 my-6 rounded-2xl text-2xl font-semibold text-center md:w-1/6 w-4/5">Lisa raamat</button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';


const uploadPilt = ref(null)
const uploadPiltFile = ref(null)
const uploadPiltUrl = ref(null)
const pealkiri = ref('')
const autor = ref('')
const ISBN = ref('')
const kirjeldus = ref('')
const raamatukoguId = ref('')
const kogus = ref(0)

const raamatukogud = ref(null)
const client = useSupabaseAuthClient()

const fetchRaamatukogud = async () => {
    const { data, error } = await client.from('Raamatukogud').select('*')
    if (error) {
        console.error(error)
        return
    }
    raamatukogud.value = data
    console.log(client.headers.Authorization)
}

onBeforeMount(fetchRaamatukogud)

const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        uploadPilt.value = reader.result
        uploadPiltFile.value = file
        uploadPiltUrl.value = file.name
    }
}

const uploadTeavik = async () => {
    const { data, error } = await client.from('Teavik').insert([
        {
            pealkiri: pealkiri.value,
            autor: autor.value,
            ISBN: ISBN.value,
            kirjeldus: kirjeldus.value,
            pilt: uploadPiltUrl.value
        }
    ])
    if (error) {
        console.error(error)
        return
    }
}

const uploadPiltToSB = async (pilt) => {
    const { data, error } = await client.storage.from('teavik-pilt').upload(`/${uploadPiltUrl.value}`, pilt)
}

const uploadTeavikKogu = async () => {
    const { data, error } = await client.from('Teavik_kogu').insert([
        {
            RK_ID: raamatukoguId.value,
            ISBN: ISBN.value,
            Kogus: kogus.value
        }
    ])
    if (error) {
        console.error(error)
        return
    }
}

const handleTeavikUpload = async () => {
    await uploadPiltToSB(uploadPiltFile.value)
    await uploadTeavik()
    await uploadTeavikKogu()
    alert('Raamat lisatud!')
}

</script>