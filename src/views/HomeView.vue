<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { services } from '../data/services'
import { homeFAQs } from '../data/site'
import FAQList from '../components/FAQList.vue'
import ContactBand from '../components/ContactBand.vue'
import FloodButton from '../components/FloodButton.vue'
import SplitHeading from '../components/SplitHeading.vue'

const featured = [...services.slice(1), services[0]]
const workSteps = [
  { title: 'Tell us what you need', text: 'Share your comfort concerns, property type, and ZIP code. We’ll confirm coverage and the next available service options.' },
  { title: 'Understand your system', text: 'We assess your equipment and explain what needs attention, so you know what’s behind the problem.' },
  { title: 'Choose with confidence', text: 'Compare the repair or replacement options, then agree on the scope before any work begins.' },
  { title: 'Get back to comfortable', text: 'We complete the agreed work, check system operation, and walk you through the care your equipment needs.' },
]
const serviceTrack = ref(null)
const atStart = ref(true)
const atEnd = ref(false)
const currentService = ref(1)
let trackObserver = null

function updateServicePosition() {
  const track = serviceTrack.value
  if (!track) return
  atStart.value = track.scrollLeft <= 2
  atEnd.value = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
  const step = track.children[1]?.offsetLeft - track.children[0]?.offsetLeft
  currentService.value = atEnd.value ? featured.length : Math.min(featured.length, Math.round(track.scrollLeft / (step || 1)) + 1)
}

function slideServices(direction) {
  const track = serviceTrack.value
  if (!track || track.children.length < 2) return
  const step = track.children[1].offsetLeft - track.children[0].offsetLeft
  track.scrollBy({ left: direction * step, behavior: still ? 'instant' : 'smooth' })
}

/* ── Scroll-reveal (IntersectionObserver) ── */
let observer = null

/* ── Hero background drifts at half the scroll speed ── */
const heroBg = ref(null)
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let queued = false
function drift() {
  queued = false
  const bg = heroBg.value
  if (!bg) return
  const hero = bg.parentElement.getBoundingClientRect()
  if (hero.bottom < 0 || hero.top > window.innerHeight) return
  bg.style.transform = `translate3d(0, ${(hero.top * -0.5).toFixed(1)}px, 0)`
}
function onScroll() {
  if (queued) return
  queued = true
  requestAnimationFrame(drift)
}

onMounted(() => {
  trackObserver = new ResizeObserver(updateServicePosition)
  trackObserver.observe(serviceTrack.value)
  updateServicePosition()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  if (!still) {
    drift()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  }
})
onUnmounted(() => {
  trackObserver?.disconnect()
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <main id="main">

    <!-- ═══ HERO ═══ -->
    <section class="home-hero">
      <div ref="heroBg" class="home-hero-bg" aria-hidden="true">
        <div class="home-hero-photo"></div>
      </div>
      <div class="container">
        <div class="home-hero-text">
          <p class="kicker kicker-light reveal rise">Residential & commercial HVAC in Florida</p>
          <SplitHeading tag="h1" text="Reliable comfort starts with the right HVAC team." />
          <p class="home-hero-lead reveal rise" style="--delay: .1s">From air conditioning repairs to complete system replacements, FL CONSTRUCTION VENTURE helps Florida homes and businesses stay comfortable year-round.</p>
          <div class="reveal rise" style="--delay: .2s">
            <FloodButton to="/contact">Request service</FloodButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ QUICK SERVICES ═══ -->
    <section class="quick-services reveal fade-up">
      <div class="container quick-grid">
        <RouterLink to="/services/ac-repair"><span class="quick-icon" aria-hidden="true">01</span><div><strong>AC not cooling?</strong><span>Get a professional diagnosis.</span></div><b aria-hidden="true">↗</b></RouterLink>
        <RouterLink to="/services/ac-installation"><span class="quick-icon" aria-hidden="true">02</span><div><strong>Time for a new system?</strong><span>Plan a properly sized replacement.</span></div><b aria-hidden="true">↗</b></RouterLink>
        <RouterLink to="/services/hvac-maintenance"><span class="quick-icon" aria-hidden="true">03</span><div><strong>Prepare for peak season.</strong><span>Schedule routine maintenance.</span></div><b aria-hidden="true">↗</b></RouterLink>
      </div>
    </section>

    <!-- ═══ FEATURED SERVICES ═══ -->
    <section class="home-services">
      <div class="container">
        <div class="home-services-head">
          <div>
            <p class="kicker reveal rise">What we can help with</p>
            <SplitHeading tag="h2" text="Heating and cooling solutions for every season." />
          </div>
          <div class="service-slider-controls reveal rise" role="group" aria-label="Browse services">
            <button class="button service-slider-arrow" type="button" aria-label="Previous services" aria-controls="home-service-slider" :disabled="atStart" @click="slideServices(-1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
            </button>
            <button class="button service-slider-arrow" type="button" aria-label="Next services" aria-controls="home-service-slider" :disabled="atEnd" @click="slideServices(1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div id="home-service-slider" ref="serviceTrack" class="home-services-grid" role="region" aria-label="HVAC services" @scroll.passive="updateServicePosition">
          <RouterLink v-for="service in featured" :key="service.slug" :to="'/services/' + service.slug" class="photo-card">
            <img :src="service.image" :alt="service.imageAlt" :style="{ objectPosition: service.imagePosition }" loading="lazy" />
            <span class="photo-card-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M4 16 16 4M6.5 4H16v9.5" /></svg>
            </span>
            <div class="photo-card-text">
              <h3>{{ service.title }}</h3>
              <p>{{ service.short }}</p>
            </div>
          </RouterLink>
        </div>
        <div class="service-slider-status">
          <span>Swipe to explore</span>
          <progress :value="currentService" :max="featured.length" aria-label="Service carousel position"></progress>
          <span>{{ currentService }} / {{ featured.length }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ ABOUT ═══ -->
    <section class="work-section section-pad" aria-labelledby="work-heading">
      <div class="container">
        <div class="work-heading-row reveal fade-up">
          <div>
            <p class="kicker">The way we work</p>
            <h2 id="work-heading">What to expect<br />from your service visit.</h2>
          </div>
          <p>We assess your system, explain the options, and agree on the work with you before getting started.</p>
        </div>
        <div class="work-layout">
          <div class="work-visual reveal fade-right">
            <img class="work-photo" src="/images/hvac-installation.jpg" alt="HVAC technician inspecting an outdoor air conditioning unit" loading="lazy" width="900" height="1100" />
          </div>
          <div class="work-details reveal fade-up delay-1">
            <ol class="work-steps">
              <li v-for="(step, i) in workSteps" :key="step.title">
                <span class="work-step-number" aria-hidden="true">0{{ i + 1 }}</span>
                <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
              </li>
            </ol>
            <RouterLink class="text-link" to="/about">Get to know our approach <span aria-hidden="true">↗</span></RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ COVERAGE ═══ -->
    <section class="comfort-section section-pad" aria-labelledby="comfort-heading">
      <div class="container">
        <div class="comfort-layout">
          <div class="comfort-copy reveal fade-up">
            <p class="kicker kicker-light">Close to your comfort</p>
            <h2 id="comfort-heading">HVAC service for<br />Florida properties.</h2>
            <p>Air conditioning, heating, and ventilation support for homes and commercial properties across Florida.</p>
            <div class="comfort-cards">
              <RouterLink to="/services" class="comfort-card">
                <h3>Residential HVAC</h3>
                <p>Cooling, heating, and cleaner indoor air for everyday living.</p>
                <span class="comfort-card-link">Residential services <b aria-hidden="true">↗</b></span>
              </RouterLink>
              <RouterLink to="/services/commercial-hvac" class="comfort-card">
                <h3>Commercial HVAC</h3>
                <p>HVAC support for the spaces your team and customers depend on.</p>
                <span class="comfort-card-link">Commercial services <b aria-hidden="true">↗</b></span>
              </RouterLink>
            </div>
          </div>
          <div class="comfort-visual reveal fade-up delay-1">
            <img src="/images/service-areas.jpg" alt="Aerial view of a Florida residential community" loading="lazy" width="900" height="1000" />
          </div>
        </div>
        <div class="comfort-footer reveal fade-up">
          <div><strong>Check availability in your area.</strong><p>Share your ZIP code to confirm coverage and appointment availability.</p></div>
          <FloodButton to="/service-areas">Check your service area <span aria-hidden="true">↗</span></FloodButton>
        </div>
      </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section class="section-pad home-faq" aria-labelledby="faq-heading">
      <div class="container home-faq-layout">
        <div class="faq-intro reveal fade-up">
          <p class="kicker">Frequently asked questions</p>
          <h2 id="faq-heading">Before you<br />book a service.</h2>
          <p class="muted">Find answers about your system, service options, and coverage.</p>
          <RouterLink class="text-link" to="/contact">Ask us a question <span aria-hidden="true">↗</span></RouterLink>
        </div>
        <div class="home-faq-questions reveal fade-up delay-1">
          <FAQList :items="homeFAQs" />
        </div>
      </div>
    </section>

    <!-- ═══ CTA BAND ═══ -->
    <div class="reveal fade-up">
      <ContactBand />
    </div>

  </main>
</template>

<style scoped>
.work-heading-row { display: flex; align-items: end; justify-content: space-between; gap: 60px; margin-bottom: 48px; }
.work-heading-row h2 { margin-bottom: 0; }
.work-heading-row > p { max-width: 370px; margin: 0 0 4px; color: var(--muted); font-size: 16px; }
.work-layout { display: grid; grid-template-columns: 1fr 1.08fr; gap: 80px; align-items: start; }
.work-visual { min-width: 0; }
.work-photo { width: 100%; height: 570px; object-fit: cover; object-position: 48% center; border-radius: var(--radius); }
.work-steps { list-style: none; padding: 0; margin: 0 0 20px; border-top: 1px solid var(--line); }
.work-steps li { display: grid; grid-template-columns: 36px 1fr; gap: 20px; padding-block: 25px; border-bottom: 1px solid var(--line); }
.work-step-number { padding-top: 3px; color: var(--accent-text); font-size: 14px; font-weight: 500; font-variant-numeric: tabular-nums; }
.work-steps h3 { font-size: 21px; margin: 0 0 9px; letter-spacing: -.02em; }
.work-steps p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.7; }
.work-details > .text-link { margin-left: 56px; }
.comfort-section { background: var(--navy); color: white; }
.comfort-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 64px; }
.comfort-copy > p:not(.kicker) { max-width: 455px; margin-bottom: 32px; color: #d5e0e8; font-size: 16px; }
.comfort-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
.comfort-card { display: flex; flex-direction: column; align-items: start; padding-block: 24px 0; border-top: 1px solid #ffffff40; }
.comfort-card h3 { margin: 0 0 12px; font-size: 20px; letter-spacing: -.02em; }
.comfort-card p { color: #d5e0e8; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
.comfort-card-link { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; font-size: 13px; font-weight: 600; }
.comfort-card-link b { color: var(--orange); font-size: 20px; font-weight: 400; }
.comfort-card:hover .comfort-card-link { text-decoration: underline; text-underline-offset: 5px; }
.comfort-visual { align-self: stretch; min-height: 470px; }
.comfort-visual > img { height: 100%; width: 100%; max-height: 560px; object-fit: cover; border-radius: var(--radius); }
.comfort-footer { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding-top: 32px; margin-top: 48px; border-top: 1px solid #ffffff40; }
.comfort-footer strong { font-size: 20px; font-weight: 600; }
.comfort-footer p { margin: 8px 0 0; color: #d5e0e8; font-size: 14px; }
.comfort-footer .button { flex-shrink: 0; }
.home-faq { background: var(--soft); }
.home-faq-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 80px; align-items: start; }
.faq-intro > .muted { max-width: 340px; font-size: 16px; margin-bottom: 20px; }
.faq-booking-note { margin: 24px 0 0; color: var(--muted); font-size: 13px; line-height: 1.7; }
@media (max-width: 1050px) {
  .work-layout, .comfort-layout, .home-faq-layout { gap: 40px; }
  .work-heading-row { gap: 35px; }
  .work-heading-row > p { max-width: 330px; }
  .work-photo { height: 610px; }
  .comfort-cards { gap: 20px; }
}
@media (max-width: 760px) {
  .work-heading-row { display: block; margin-bottom: 32px; }
  .work-heading-row > p { max-width: 520px; margin: 22px 0 0; }
  .work-layout, .comfort-layout, .home-faq-layout { grid-template-columns: 1fr; gap: 32px; }
  .work-photo { height: 420px; object-position: center 45%; }
  .work-steps li { padding-block: 22px; }
  .comfort-visual { min-height: 0; }
  .comfort-visual > img { height: 340px; }
  .comfort-footer { align-items: start; flex-direction: column; gap: 24px; margin-top: 32px; padding-top: 28px; }
}
@media (max-width: 440px) {
  .work-photo { height: 360px; }
  .work-steps li { grid-template-columns: 28px 1fr; gap: 14px; }
  .work-steps h3 { font-size: 19px; }
  .work-details > .text-link { margin-left: 42px; }
  .comfort-cards { grid-template-columns: 1fr; gap: 24px; }
  .comfort-visual > img { height: 280px; }
}
/* ─── Scroll-reveal animations ─── */
.reveal {
  opacity: 0;
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal.visible { opacity: 1; transform: none; }

.fade-up         { transform: translateY(32px); }
.fade-right      { transform: translateX(-32px); }

.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.28s; }

/* Hero and services: rise by the element's own height while fading in. */
.reveal.rise { transition: none; }
.reveal.rise.visible { animation: rise 1.25s ease var(--delay, 0s) both; }
@keyframes rise {
  from { opacity: 0; transform: translate3d(0, 100%, 0); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .reveal.rise.visible { animation: none; }
}
</style>
