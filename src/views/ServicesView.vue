<script setup>
import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard.vue'
import ContactBand from '../components/ContactBand.vue'
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/hvac-service.jpg')"><div class="container"><p class="eyebrow">Our services</p><h1>Comfort, from<br />every angle.</h1><p>Find help for your heating, cooling, and indoor air. Explore the service you need, or tell us what’s happening and we’ll help you get started.</p></div></section><section class="section-pad"><div class="container"><div class="service-grid all-services"><ServiceCard v-for="service in services" :key="service.slug" :service="service" /></div></div></section><ContactBand /></main></template>

