<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import { services } from '../data/services'
import { company } from '../data/site'
const route = useRoute()
const open = ref(false)
const servicesOpen = ref(false)
watch(() => route.fullPath, () => { open.value = false; servicesOpen.value = false })
function closeMenus() { open.value = false; servicesOpen.value = false }

// The mega menu opens on hover only where there is a mouse and the full nav is showing.
const hoverNav = () => window.matchMedia('(min-width: 901px) and (hover: hover)').matches
let closing = null
function hoverServices() {
  clearTimeout(closing)
  if (hoverNav()) servicesOpen.value = true
}
// A short wait before closing, so cutting a corner on the way down to the panel doesn't shut it.
function leaveServices() {
  closing = setTimeout(() => { servicesOpen.value = false }, 160)
}
// With a mouse the panel is already open from the hover, so a click keeps it open; elsewhere it toggles.
function clickServices() {
  servicesOpen.value = hoverNav() ? true : !servicesOpen.value
}
// Small copies of the service photos, so opening the menu doesn't pull in the full-size ones.
const thumb = service => service.image.replace('/images/', '/images/thumbs/')
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="utility-bar">
    <div class="container">
      <div class="utility-contacts">
        <a :href="'tel:' + company.phone"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.15.4 2.35.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" /></svg>{{ company.phoneDisplay }}</a>
        <a :href="'mailto:' + company.email"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" /></svg>{{ company.email }}</a>
      </div>
    </div>
  </div>
  <header class="site-header" @keydown.esc="closeMenus">
    <div class="container header-inner">
      <BrandLogo />
      <button class="menu-button" :aria-expanded="open" aria-controls="main-navigation" @click="open = !open">{{ open ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ open ? '×' : '☰' }}</span></button>
      <nav id="main-navigation" :class="{ 'nav-open': open }" aria-label="Main navigation">
        <div class="nav-services" @mouseenter="hoverServices" @mouseleave="leaveServices" @focusout="!$event.currentTarget.contains($event.relatedTarget) && (servicesOpen = false)">
          <button class="nav-trigger" :class="{ active: route.path.startsWith('/services') }" :aria-expanded="servicesOpen" aria-controls="service-menu" @click="clickServices">
            Services
            <svg class="nav-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m2 4 4 4 4-4" /></svg>
          </button>
          <Transition name="mega">
            <div v-show="servicesOpen" id="service-menu" class="mega-menu">
              <div class="container mega-inner">
                <div class="mega-intro">
                  <p class="eyebrow">Our services</p>
                  <p class="mega-title">Heating, cooling and indoor air support for Florida properties.</p>
                  <p class="mega-text">Compare services for your system, then contact us with your location and what you’ve noticed.</p>
                  <RouterLink to="/services" class="button button-small">View all services <span aria-hidden="true">↗</span></RouterLink>
                </div>
                <div class="mega-grid">
                  <RouterLink v-for="service in services" :key="service.slug" :to="'/services/' + service.slug" class="mega-item">
                    <img :src="thumb(service)" alt="" width="64" height="64" loading="lazy" />
                    <span><strong>{{ service.title }}</strong><small>{{ service.label }}</small></span>
                  </RouterLink>
                  <RouterLink to="/services" class="mega-all">View all services <span aria-hidden="true">↗</span></RouterLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <RouterLink to="/service-areas" active-class="active">Service areas</RouterLink><RouterLink to="/about" active-class="active">About us</RouterLink><RouterLink to="/contact" active-class="active">Contact</RouterLink><RouterLink to="/contact" class="button button-small">Request service <span aria-hidden="true">↗</span></RouterLink>
      </nav>
    </div>
  </header>
</template>

