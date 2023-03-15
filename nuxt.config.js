// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@nuxtjs/supabase'
    ],

    app: {
        head: {
            title: 'Librafy'
        }
    },

    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        serviceKey: process.env.SUPABASE_SERVICE_KEY
    },

    tailwindcss: {
        safelist: [
            'basis-1/4',
            'h-[30rem]',
            'object-cover',
            'grid',
            'grid-cols-3',
            'col-span-3',
            'flex',
            'flex-col',
            'justify-center',
            'items-center'
        ]
    },
})
