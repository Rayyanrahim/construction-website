<script setup>
import BrandLogo from './BrandLogo.vue'
import { company } from '../data/site'
import { services } from '../data/services'
</script>
<template>
  <footer class="site-footer"><div class="container footer-grid">
    <div class="footer-intro"><BrandLogo /><p>Heating, cooling, and everyday comfort.<br />For the place you call home.</p><span class="footer-location">Florida roots. Nationwide service.</span></div>
    <div class="footer-column"><h2>Our services</h2><RouterLink v-for="service in services.slice(1, 4)" :key="service.slug" :to="'/services/' + service.slug">{{ service.title }}</RouterLink><RouterLink to="/services">View all services ↗</RouterLink></div>
    <div class="footer-column"><h2>Get to know us</h2><RouterLink to="/about">About us</RouterLink><RouterLink to="/service-areas">Service areas</RouterLink><RouterLink to="/contact">Contact & booking</RouterLink></div>
    <div class="footer-column"><h2>Let’s talk</h2><a :href="'tel:' + company.phone">{{ company.phoneDisplay }}</a><a :href="'mailto:' + company.email">{{ company.email }}</a><small class="sample-note">Sample contact details. Official details coming soon.</small></div>
  </div><div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} {{ company.name }}.</span><span>Residential & commercial HVAC</span></div></footer>
</template>

