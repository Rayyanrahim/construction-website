<script setup>
import { ref } from 'vue'
defineProps({ items: { type: Array, required: true } })
const openIndex = ref(null)
function toggle(i) { openIndex.value = openIndex.value === i ? null : i }
</script>
<template>
  <div class="faq-list">
    <div class="faq-item" v-for="(item, i) in items" :key="item.q" :class="{ open: openIndex === i }">
      <button class="faq-summary" @click="toggle(i)">{{ item.q }}<span aria-hidden="true">+</span></button>
      <div class="faq-panel"><div class="faq-panel-inner"><p>{{ item.a }}</p></div></div>
    </div>
  </div>
</template>
<style scoped>
.faq-item { border-bottom: 1px solid var(--line, #dce3e7); }
.faq-summary {
  display: flex; align-items: center; justify-content: space-between; gap: 25px;
  list-style: none; padding: 23px 0; font-size: 15px; font-weight: 600; cursor: pointer;
  width: 100%; background: none; border: none; text-align: left; color: inherit; font-family: inherit;
}
.faq-summary > span { font-size: 22px; font-weight: 400; color: #5e7b8e; display: inline-block; transition: transform .3s ease; }
.faq-item.open .faq-summary > span { transform: rotate(45deg); }
.faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.faq-item.open .faq-panel { grid-template-rows: 1fr; }
.faq-panel-inner { overflow: hidden; }
.faq-panel-inner p { color: var(--muted, #65747e); font-size: 14px; margin: -1px 35px 25px 0; }
</style>
