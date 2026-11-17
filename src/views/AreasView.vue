<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ContactBand from '../components/ContactBand.vue'
const zip = ref('')
const router = useRouter()
function continueRequest() { router.push({ path: '/contact', query: { zip: zip.value } }) }
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/service-areas.jpg'); --hero-position: center 50%"><div class="container"><p class="eyebrow">Service areas</p><h1>Florida roots.<br />Nationwide reach.</h1><p>HVAC service requests for homes and businesses across the United States. Tell us where you are and we’ll confirm local availability.</p></div></section><section class="section-pad"><div class="container coverage-grid"><div><p class="eyebrow">Start with your location</p><h2>Home is where<br />you need us.</h2><p class="muted">Service timing depends on the location, equipment, and work involved. Send your ZIP code with your request so the team can review your area.</p><form class="zip-form" @submit.prevent="continueRequest"><label for="area-zip">Your ZIP code</label><div><input id="area-zip" v-model="zip" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="e.g. 33401" title="Enter a 5-digit ZIP code, optionally followed by a 4-digit extension." required /><button class="button" type="submit">Check availability <span aria-hidden="true">↗</span></button></div></form></div><div class="region-list"><div><span>01</span><h3>Northeast</h3><p>Residential & commercial inquiries</p></div><div><span>02</span><h3>South</h3><p>Including Florida and the Southeast</p></div><div><span>03</span><h3>Midwest</h3><p>Heating, cooling & air quality</p></div><div><span>04</span><h3>West</h3><p>Service scheduling by location</p></div></div></div></section><ContactBand /></main></template>

