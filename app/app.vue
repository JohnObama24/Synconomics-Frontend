<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Synconomics — AI-Powered Business Ecosystem',
  htmlAttrs: {
    lang: 'id',
    class: 'scroll-smooth'
  },
  bodyAttrs: {
    class: 'antialiased selection:bg-syn-accent selection:text-syn-dark'
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap' }
  ],
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', defer: true },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', defer: true }
  ]
})
</script>
