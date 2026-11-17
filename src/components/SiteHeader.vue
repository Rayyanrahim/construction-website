<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import { services } from '../data/services'
const route = useRoute()
const open = ref(false)
const servicesOpen = ref(false)
watch(() => route.fullPath, () => { open.value = false; servicesOpen.value = false })
function closeMenus() { open.value = false; servicesOpen.value = false }
function hoverServices() {
  if (window.matchMedia('(min-width: 901px) and (hover: hover)').matches) servicesOpen.value = true
}
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="utility-bar"><div class="container"><span>Heating, cooling & indoor air quality</span><span>Serving homes & businesses across the U.S.</span></div></div>
  <header class="site-header" @keydown.esc="closeMenus">
    <div class="container header-inner">
      <BrandLogo />
      <button class="menu-button" :aria-expanded="open" aria-controls="main-navigation" @click="open = !open">{{ open ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ open ? '×' : '☰' }}</span></button>
      <nav id="main-navigation" :class="{ 'nav-open': open }" aria-label="Main navigation">
        <div class="nav-services" @mouseenter="hoverServices" @mouseleave="servicesOpen = false" @focusout="!$event.currentTarget.contains($event.relatedTarget) && (servicesOpen = false)">
          <button class="nav-trigger" :class="{ active: route.path.startsWith('/services') }" :aria-expanded="servicesOpen" aria-controls="service-menu" @click="servicesOpen = !servicesOpen">Services <span aria-hidden="true">⌄</span></button>
          <div v-show="servicesOpen" id="service-menu" class="nav-dropdown"><RouterLink v-for="service in services" :key="service.slug" :to="'/services/' + service.slug">{{ service.title }}</RouterLink></div>
        </div>
        <RouterLink to="/service-areas" active-class="active">Service areas</RouterLink><RouterLink to="/about" active-class="active">About us</RouterLink><RouterLink to="/contact" active-class="active">Contact</RouterLink><RouterLink to="/contact" class="button button-small">Request service <span aria-hidden="true">↗</span></RouterLink>
      </nav>
    </div>
  </header>
</template>

