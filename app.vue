<template>
  <div>
    <TheHeader @search="search = search" :user="user"/>
    <NuxtPage :search-value="search" />
  </div>
</template>

<script setup>
const user = useSupabaseUser()

const search = useState('search')

</script>