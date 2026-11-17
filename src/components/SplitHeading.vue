<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'h2' },
  text: { type: String, required: true },
})

const el = ref(null)
const shown = ref(false)
let observer = null

// Words stay whole so lines only break between them. `i` is the letter's place
// in the whole heading, which sets how long it waits before sliding in.
const words = computed(() => {
  let i = 0
  return props.text.split(/\s+/).filter(Boolean).map(word => [...word].map(char => ({ char, i: i++ })))
})

onMounted(() => {
  // Starts once the heading's top edge is 10% up from the bottom of the screen.
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      shown.value = true
      observer.disconnect()
    }
  }, { rootMargin: '0px 0px -10% 0px' })
  observer.observe(el.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <component :is="tag" ref="el" class="split-heading" :class="{ shown }">
    <span class="sr-only">{{ text }}</span>
    <span aria-hidden="true">
      <template v-for="(word, w) in words" :key="w">
        <span class="split-word"><span v-for="c in word" :key="c.i" class="split-char" :style="{ '--i': c.i }">{{ c.char }}</span></span>{{ ' ' }}
      </template>
    </span>
  </component>
</template>

<style scoped>
.split-word { display: inline-block; white-space: nowrap; }
.split-char {
  display: inline-block;
  opacity: 0;
  transform: translateX(50px);
  /* The curve overshoots slightly, so each letter settles back into place. */
  transition:
    opacity 1s cubic-bezier(.34, 1.56, .64, 1),
    transform 1s cubic-bezier(.34, 1.56, .64, 1);
  transition-delay: calc(var(--i) * 20ms);
}
.shown .split-char { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .split-char { opacity: 1; transform: none; }
}
</style>
