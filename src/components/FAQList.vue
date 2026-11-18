<script setup>
import { ref, useId } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  initialOpen: { type: Number, default: null },
})
const id = useId()
const openIndex = ref(props.initialOpen)
function toggle(i) { openIndex.value = openIndex.value === i ? null : i }
</script>
<template>
  <div class="faq-list">
    <div class="faq-item" v-for="(item, i) in items" :key="item.q" :class="{ open: openIndex === i }">
      <h3 class="faq-question">
        <button :id="`${id}-question-${i}`" class="faq-summary" type="button" :aria-expanded="openIndex === i" :aria-controls="`${id}-answer-${i}`" @click="toggle(i)">
          <span class="faq-question-text">{{ item.q }}</span>
          <svg class="faq-toggle" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 10h14"/><path class="faq-toggle-vertical" d="M10 3v14"/></svg>
        </button>
      </h3>
      <div :id="`${id}-answer-${i}`" class="faq-panel" role="region" :aria-labelledby="`${id}-question-${i}`" :aria-hidden="openIndex !== i" :inert="openIndex !== i"><div class="faq-panel-inner"><p>{{ item.a }}</p></div></div>
    </div>
  </div>
</template>
<style scoped>
.faq-list { border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-question { margin: 0; }
.faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 24px; width: 100%; padding: 25px 0; border: 0; background: none; color: var(--navy); text-align: left; font: inherit; font-size: 18px; font-weight: 600; line-height: 1.5; cursor: pointer; }
.faq-summary:hover { color: var(--accent-text); }
.faq-summary:focus-visible { outline-offset: 5px; }
.faq-question-text { flex: 1; }
.faq-toggle { flex: 0 0 20px; width: 20px; height: 20px; color: var(--accent-text); }
.faq-toggle-vertical { transform-origin: center; transition: transform .2s; }
.open .faq-toggle-vertical { transform: scaleY(0); }
.faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .25s ease; }
.open .faq-panel { grid-template-rows: 1fr; }
.faq-panel-inner { overflow: hidden; }
.faq-panel-inner p { color: var(--muted); font-size: 15px; line-height: 1.8; margin: -2px 44px 26px 0; }
@media (max-width: 700px) {
  .faq-summary { font-size: 17px; gap: 20px; padding-block: 22px; }
  .faq-panel-inner p { margin-right: 24px; }
}
</style>
