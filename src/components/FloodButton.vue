<script setup>
import { ref } from 'vue'

defineProps({
  to: { type: String, required: true },
  // Colour that floods the button on hover: 'light' on dark backgrounds, 'dark' on light ones.
  fill: { type: String, default: 'dark' },
})

const flood = ref(null)

// The flood grows out from where the pointer enters and shrinks back to where it leaves.
function anchor(event) {
  const box = event.currentTarget.getBoundingClientRect()
  flood.value.style.left = event.clientX - box.left + 'px'
  flood.value.style.top = event.clientY - box.top + 'px'
}
</script>

<template>
  <RouterLink :to="to" class="flood-button" :class="'fill-' + fill" @mouseenter="anchor" @mouseleave="anchor">
    <span><slot /></span>
    <span ref="flood" class="flood" aria-hidden="true"></span>
  </RouterLink>
</template>

<style scoped>
.flood-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 17px 24px;
  background: var(--orange);
  color: #172f40;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  transition: color .4s ease-in-out;
}
.flood {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
  width: 0;
  height: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width .4s ease-in-out, height .4s ease-in-out;
}
.fill-light .flood { background: #fff; }
.fill-dark .flood { background: var(--navy); }
.flood-button:hover .flood,
.flood-button:focus-visible .flood { width: 225%; height: 562.5px; }
.fill-dark:hover,
.fill-dark:focus-visible { color: #fff; }
</style>
