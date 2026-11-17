<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
<template><SiteHeader /><RouterView :key="$route.fullPath" /><SiteFooter /></template>

