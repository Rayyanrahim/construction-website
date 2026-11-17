<script setup>
defineProps({ items: { type: Array, required: true } })
</script>
<template><div class="faq-list"><details v-for="item in items" :key="item.q"><summary>{{ item.q }}<span aria-hidden="true">+</span></summary><p>{{ item.a }}</p></details></div></template>

