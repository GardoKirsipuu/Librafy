<template>
    <div class="grid grid-cols-3 min-h-[80vh] items-center">
        <div class="md:col-span-2 col-span-3 flex flex-col justify-center p-6 text-xl">

            <label for="pealkiri">Pealkiri</label>
            <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="pealkiri" v-model="pealkiri">

            <label for="autor">Autor</label>
            <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="autor" v-model="autor">

            <label for="ISBN">ISBN kood</label>
            <input class="bg-neutral-200 rounded-2xl p-2 mb-4" id="ISBN" v-model="ISBN">

            <label for="kirjeldus">Kirjeldus</label>
            <textarea class="bg-neutral-200 rounded-2xl p-2 mb-4 resize-y" id="kirjeldus" v-model="kirjeldus"></textarea>

            <div class="flex flex-row justify-evenly">
                <select class="bg-neutral-200 flex-initial p-2 rounded-2xl w-1/3 mt-4" v-model="raamatukoguId">
                    <option disabled selected hidden>Vali raamatukogu</option>
                    <option v-for="raamatukogu in raamatukogud" :value="raamatukogu.id">{{ raamatukogu.nimi }}</option>
                </select>
                <input class="bg-neutral-200 flex-initial p-2 rounded-2xl w-1/3 mt-4" type="number" v-model.number="kogus" placeholder="Raamatute kogus">
            </div>

        </div>
        <div class="md:col-span-1 col-span-3 flex flex-col items-center p-6 text-xl">
            <label for="uploadPilt">Lae ülesse raamatu kaanest pilt</label>
            <input type="file" name="pilt" accept="image/png, image/jpeg" id="uploadPilt">
        </div>
        <div class="col-span-3 flex justify-center h-max">
            {{ raamatukoguId }}
            <button class="bg-teal-400 hover:bg-teal-300 py-2 my-6 rounded-2xl text-2xl font-semibold text-center md:w-1/6 w-4/5">Lisa raamat</button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';


const uploadPilt = ref(null)
const raamatukogud = ref(null)

const pealkiri = ref('')
const autor = ref('')
const ISBN = ref('')
const kirjeldus = ref('')
const raamatukoguId = ref('')
const kogus = ref(0)
const client = useSupabaseClient()

const fetchRaamatukogud = async () => {
    const { data, error } = await client.from('Raamatukogud').select('*')
    if (error) {
        console.error(error)
        return
    }
    raamatukogud.value = data
}

onBeforeMount(fetchRaamatukogud)

</script>