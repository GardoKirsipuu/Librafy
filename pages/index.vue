<template>
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-2 md:grid-cols-4 justify-around place-items-center gap-4 p-4">
        <div v-for="teavik in teavik">
          <BookCard :teavik="teavik"/>
        </div>  
      </div>
    </div>
</template>

<script setup>
const client = useSupabaseClient()

const { data: teavik, error } = await client
  .from('Teavik')
  .select('*')

</script>