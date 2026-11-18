<script setup>
import { onMounted, onUnmounted } from 'vue'
import { errors } from '../data/errors'
import FloodButton from '../components/FloodButton.vue'
import SplitHeading from '../components/SplitHeading.vue'

const code = 404
const error = errors[code]

// The app answers every address with a normal "OK", so ask search engines not to list this page.
let robots = null
onMounted(() => {
  robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex'
  document.head.append(robots)
})
onUnmounted(() => robots?.remove())
</script>

<template>
  <main id="main" class="error-page">
    <div class="container">
      <p class="error-code rise" aria-hidden="true">
        <span v-for="(digit, i) in String(code)" :key="i">{{ digit }}</span>
      </p>
      <p class="kicker rise">Error {{ code }} · {{ error.label }}</p>
      <SplitHeading tag="h1" :text="error.title" />
      <p class="error-text rise" style="--delay: .1s">{{ error.text }}</p>
      <div class="error-actions rise" style="--delay: .2s">
        <FloodButton to="/">Back to home</FloodButton>
      </div>
      <nav class="error-links rise" style="--delay: .3s" aria-label="Popular pages">
        <span>Popular pages</span>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/service-areas">Service areas</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
      </nav>
    </div>
  </main>
</template>

<!-- The standalone server error pages repeat this look in error-pages.js; keep the two in step. -->
<style scoped>
.error-page { padding: 96px 0 110px; background: var(--soft); color: var(--navy); text-align: center; }
.error-code { margin: 0 0 18px; color: var(--navy); font-size: clamp(120px, 21vw, 250px); font-weight: 700; line-height: .86; letter-spacing: -.03em; }
.error-code span:nth-child(2) { color: var(--orange); }
.error-page .kicker { width: fit-content; margin-inline: auto; }
.error-page h1 { text-wrap: balance; margin: 0 0 16px; font-size: clamp(34px, 4.2vw, 56px); font-weight: 700; line-height: 1.15; letter-spacing: -.03em; }
.error-text { max-width: 520px; margin: 0 auto 30px; color: var(--muted); font-size: 17px; line-height: 1.6; }
.error-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }

.error-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 30px; max-width: 620px; margin: 48px auto 0; padding-top: 26px; border-top: 1px solid var(--line); font-size: 14px; }
.error-links span { color: var(--muted); }
.error-links a { color: var(--navy); font-weight: 500; text-decoration: underline; text-underline-offset: 4px; transition: color .2s; }
.error-links a:hover { color: #b85122; }

.rise { animation: rise .9s ease var(--delay, 0s) both; }
@keyframes rise {
  from { opacity: 0; transform: translate3d(0, 30px, 0); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 700px) {
  .error-page { padding: 60px 0 70px; }
  .error-text { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .rise { animation: none; }
}
</style>
