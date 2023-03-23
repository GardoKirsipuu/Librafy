<template>
    <div class="conteiner mx-auto flex flex-col justify-center lg:w-[50vw] w-full p-4">
        <LoanCard v-for="laen in laenutused" :user="props.user" :laenutus="laen" />
    </div>
</template>

<script setup>
const props = defineProps(['user'])
const client = useSupabaseAuthClient()
const laenutused = ref(null)

async function fetchLaenutused() {
    const { data, error } = await client.from('Laenutus').select('*, Teavik_kogu(Teavik(*))').eq('user_id', props.user.id)
    if (error) {
        console.error(error)
        return
    }
    if (data && data.length > 0) {
        laenutused.value = data
        laenutused.value.forEach(laenutus => {
            laenutus.startdate = new Date(laenutus.startdate).toLocaleDateString()
            laenutus.enddate = new Date(laenutus.enddate).toLocaleDateString()
        })
    }


}

onBeforeMount(fetchLaenutused)
</script>