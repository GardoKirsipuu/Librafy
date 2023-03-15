<template>
    <ul class="text-xl flex flex-col text-start bg-teal-500 p-3 gap-y-2 shadow-2xl divide-y-2 divide-black">
        <li class="flex flex-row items-center mx-auto" @click="logName">
            <Icon name="material-symbols:add"/>
            <p>Lisa raamat</p>
        </li>
        <li class="flex flex-row items-center mx-auto pt-2" @click="logout">
            <Icon name="material-symbols:logout"/>
            <p>Logi välja</p>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps(['user'])

const client = useSupabaseAuthClient()

const logout = async () => {
    const { error } = await client.auth.signOut()
    if (error) {
        console.log(error)
    }
}

const logName = () => {
    console.log(props.user.user_metadata)
}

</script>