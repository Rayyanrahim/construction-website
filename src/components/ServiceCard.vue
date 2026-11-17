<script setup>
defineProps({ service: { type: Object, required: true }, image: Boolean })
</script>
<template><RouterLink :to="'/services/' + service.slug" class="service-card" :class="{ 'with-image': image }"><img v-if="image" :src="service.image" :alt="service.imageAlt" :style="{ objectPosition: service.imagePosition }" loading="lazy" width="600" height="400" /><div class="service-card-body"><h3>{{ service.title }}<span aria-hidden="true">↗</span></h3><p>{{ service.short }}</p><span class="service-link">Explore service</span></div></RouterLink></template>

