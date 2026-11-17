<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { services } from '../data/services'
import { homeFAQs } from '../data/site'
import FAQList from '../components/FAQList.vue'
import ContactBand from '../components/ContactBand.vue'
import FloodButton from '../components/FloodButton.vue'
import SplitHeading from '../components/SplitHeading.vue'

const featured = [...services.slice(1), services[0]]
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
      <div ref="heroBg" class="home-hero-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="home-hero-text">
          <p class="kicker kicker-light reveal rise">Residential & commercial HVAC in Florida</p>
          <SplitHeading tag="h1" text="Reliable comfort starts with the right HVAC team." />
          <p class="home-hero-lead reveal rise" style="--delay: .1s">From air conditioning repairs to complete system replacements, FL Venture Corporation helps Florida homes and businesses stay comfortable year-round.</p>
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
    <section class="about-section section-pad">
      <div class="container about-grid">
        <div class="about-photo reveal fade-right">
          <img src="/images/about-team.jpg" alt="Construction professionals discussing a project blueprint" loading="lazy" width="1400" height="933" />
        </div>
        <div class="about-copy reveal fade-up delay-1">
          <p class="eyebrow">The way we work</p>
          <h2>Thoughtful HVAC service.<br />Clear options.<br />Comfort that lasts.</h2>
          <p>Whether you manage a home or a commercial property, you deserve to understand the work being recommended. We assess your HVAC needs, explain the available options, and confirm the scope with you before work begins.</p>
          <ul class="check-list">
            <li>A clear explanation of what needs attention</li>
            <li>Repair and replacement options you can compare</li>
            <li>The scope agreed before work begins</li>
          </ul>
          <RouterLink class="text-link" to="/about">Get to know us <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ COVERAGE ═══ -->
    <section class="coverage-section section-pad">
      <div class="container coverage-grid">
        <div class="reveal fade-up">
          <p class="eyebrow">Close to your comfort</p>
          <h2>Florida in our name.<br />The U.S. in our reach.</h2>
        </div>
        <div class="reveal fade-up delay-1">
          <p>We serve homes and businesses across Florida with air conditioning, heating, and ventilation support.</p>
          <p class="muted">Enter your ZIP code to ask about service coverage and appointment availability.</p>
          <RouterLink class="text-link" to="/service-areas">Check your service area <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section class="section-pad faq-section">
      <div class="container faq-grid">
        <div class="reveal fade-up">
          <p class="eyebrow">Before you book</p>
          <h2>A few questions<br />we can answer.</h2>
          <p class="muted">Have something else in mind?<br /><RouterLink to="/contact" class="inline-link">Send us a message.</RouterLink></p>
        </div>
        <div class="reveal fade-up delay-1">
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
