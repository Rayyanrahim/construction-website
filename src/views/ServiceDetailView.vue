<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services, serviceBySlug } from '../data/services'
import ServiceCard from '../components/ServiceCard.vue'
import FAQList from '../components/FAQList.vue'
const route = useRoute()
const service = computed(() => serviceBySlug(route.params.slug))
const related = computed(() => services.filter(s => s.slug !== service.value?.slug).slice(1, 4))
</script>
<template><main v-if="service" id="main">
  <section class="detail-hero image-hero" :style="{ '--hero-image': 'url(' + service.image + ')', '--hero-position': service.imagePosition }"><div class="container"><div class="breadcrumbs"><RouterLink to="/">Home</RouterLink><span>/</span><RouterLink to="/services">Services</RouterLink><span>/</span><span>{{ service.title }}</span></div><div class="detail-hero-copy"><p class="eyebrow">{{ service.label }}</p><h1>{{ service.title }}</h1><p class="lead">{{ service.intro }}</p><RouterLink :to="{ path: '/contact', query: { service: service.slug } }" class="button">Request this service <span aria-hidden="true">↗</span></RouterLink></div></div></section>
  <section class="section-pad"><div class="container information-grid"><div><p class="eyebrow">How we can help</p><h2>A closer look at<br />your system.</h2><p class="muted">The work depends on your equipment and what we find. We’ll explain the recommended scope before you decide.</p></div><ul class="lined-list"><li v-for="item in service.includes" :key="item"><span aria-hidden="true">✓</span>{{ item }}</li></ul></div></section>
  <section class="soft-section section-pad"><div class="container information-grid"><div><p class="eyebrow">Sound familiar?</p><h2>When to get<br />in touch.</h2></div><ul class="lined-list"><li v-for="sign in service.signs" :key="sign"><span aria-hidden="true">→</span>{{ sign }}</li></ul></div></section>
  <section class="section-pad"><div class="container faq-grid"><div><p class="eyebrow">What to expect</p><h2>Let’s make<br />the next step easy.</h2></div><FAQList :items="[service.faq, { q: 'How do I arrange a visit?', a: 'Use the contact form to share your service needs and ZIP code. An appointment is confirmed after the team reviews availability; filling in the form does not book a visit automatically.' }]" /></div></section>
  <section class="related-section section-pad"><div class="container"><div class="section-heading"><h2>You may also need.</h2><RouterLink to="/services" class="text-link">All services ↗</RouterLink></div><div class="service-grid"><ServiceCard v-for="item in related" :key="item.slug" :service="item" /></div></div></section>
</main></template>

