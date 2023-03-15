<template>
    <div class="text-xl flex flex-col text-start bg-teal-500 p-2 pt-0 gap-y-2 divide-y-2 divide-black">
        <NuxtLink to="/addBook" class="flex flex-row items-center mx-auto cursor-pointer" @click="$emit('closeDropdown')">
            <Icon name="material-symbols:add" />
            <p>Lisa raamat</p>
        </NuxtLink>
        <div class="flex flex-row items-center mx-auto pt-2 cursor-pointer" @click="logout(); $emit('closeDropdown');">
            <Icon name="material-symbols:logout" />
            <p>Logi välja</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['user'])

const client = useSupabaseAuthClient()

const logout = async () => {
    const { error } = await client.auth.signOut()
    if (error) {
        console.log(error)
        return
    }
    alert('Oled välja logitud')
    navigateTo('/')
}

</script>