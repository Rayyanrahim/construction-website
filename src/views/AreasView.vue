<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ContactBand from '../components/ContactBand.vue'
const zip = ref('')
const router = useRouter()
function continueRequest() { router.push({ path: '/contact', query: { zip: zip.value } }) }
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/service-areas.jpg'); --hero-position: center 50%"><div class="container"><p class="eyebrow">Service areas</p><h1>Serving Florida,<br />one ZIP code at a time.</h1><p>We welcome residential and commercial HVAC inquiries throughout Florida. Share your ZIP code and we’ll confirm local service coverage and appointment availability.</p></div></section><section class="section-pad"><div class="container coverage-grid"><div><p class="eyebrow">Check your location</p><h2>Let’s start<br />with your ZIP code.</h2><p class="muted">Service coverage and scheduling depend on your location and the work required. Send your ZIP code with your request so we can check availability.</p><form class="zip-form" @submit.prevent="continueRequest"><label for="area-zip">Florida ZIP code</label><div><input id="area-zip" v-model="zip" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="e.g. 32801" title="Enter a 5-digit ZIP code, optionally followed by a 4-digit extension." required /><button class="button" type="submit">Ask about service <span aria-hidden="true">↗</span></button></div></form></div><div class="region-list"><div><span>01</span><h3>North Florida</h3><p>Residential & commercial HVAC inquiries</p></div><div><span>02</span><h3>Central Florida</h3><p>AC repair, installation & maintenance</p></div><div><span>03</span><h3>South Florida</h3><p>Cooling, ventilation & indoor air quality</p></div><div><span>04</span><h3>Coastal communities</h3><p>Coverage confirmed by ZIP code</p></div></div></div></section><ContactBand /></main></template>

