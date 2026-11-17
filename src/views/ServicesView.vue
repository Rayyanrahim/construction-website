<script setup>
import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard.vue'
import ContactBand from '../components/ContactBand.vue'
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/hvac-service.jpg')"><div class="container"><p class="eyebrow">Residential & commercial HVAC</p><h1>Complete care for<br />your HVAC system.</h1><p>Explore air conditioning, heating, ventilation, and indoor air services. Select a service to review what’s involved, what to expect, and how to request an appointment.</p></div></section><section class="section-pad"><div class="container"><div class="service-grid all-services"><ServiceCard v-for="service in services" :key="service.slug" :service="service" /></div></div></section><ContactBand /></main></template>

