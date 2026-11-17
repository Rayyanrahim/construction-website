<script setup>
import { company } from '../data/site'
</script>

<template>
  <RouterLink class="brand" to="/" :aria-label="company.name + ' home'">
    <img class="brand-symbol" src="/brand-symbol.svg" alt="" width="48" height="48" />
    <span><strong>FL CONSTRUCTION</strong><small>VENTURE</small></span>
  </RouterLink>
</template>

