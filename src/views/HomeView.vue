<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { services } from '../data/services'
import { homeFAQs } from '../data/site'
import FAQList from '../components/FAQList.vue'
import ContactBand from '../components/ContactBand.vue'
import FloodButton from '../components/FloodButton.vue'
import SplitHeading from '../components/SplitHeading.vue'

const featured = services.slice(1, 4)

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
          <p class="kicker kicker-light reveal rise">Your everyday comfort, taken care of</p>
          <SplitHeading tag="h1" text="Your home. Comfortable again." />
          <p class="home-hero-lead reveal rise" style="--delay: .1s">AC repair, new systems, and routine care. Florida Construction Venture helps keep your home feeling just right.</p>
          <div class="reveal rise" style="--delay: .2s">
            <FloodButton to="/contact" fill="light">Request service</FloodButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ QUICK SERVICES ═══ -->
    <section class="quick-services reveal fade-up">
      <div class="container quick-grid">
        <RouterLink to="/services/ac-repair"><span class="quick-icon" aria-hidden="true">01</span><div><strong>AC not cooling?</strong><span>Let's find the problem.</span></div><b aria-hidden="true">↗</b></RouterLink>
        <RouterLink to="/services/ac-installation"><span class="quick-icon" aria-hidden="true">02</span><div><strong>Time for a new system?</strong><span>Explore your options.</span></div><b aria-hidden="true">↗</b></RouterLink>
        <RouterLink to="/services/hvac-maintenance"><span class="quick-icon" aria-hidden="true">03</span><div><strong>Keep it running well.</strong><span>Plan your next tune-up.</span></div><b aria-hidden="true">↗</b></RouterLink>
      </div>
    </section>

    <!-- ═══ FEATURED SERVICES ═══ -->
    <section class="home-services">
      <div class="container">
        <div class="home-services-head">
          <div>
            <p class="kicker reveal rise">What we can help with</p>
            <SplitHeading tag="h2" text="Whatever the weather, we’ve got your comfort covered." />
          </div>
          <div class="reveal rise">
            <FloodButton to="/services">See all services</FloodButton>
          </div>
        </div>
        <div class="home-services-grid">
          <RouterLink v-for="(service, i) in featured" :key="service.slug" :to="'/services/' + service.slug" class="photo-card reveal rise" :style="{ '--delay': i * 0.1 + 's' }">
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
        <p class="home-services-foot reveal rise" style="--delay: .4s">
          <span class="tag-label">More</span>
          <span>Need something else? We cover {{ services.length }} HVAC services.</span>
          <RouterLink to="/services">View all services</RouterLink>
        </p>
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
          <h2>Good service.<br />Clear answers.<br />A comfortable home.</h2>
          <p>You shouldn't need to know HVAC to get good HVAC service. Tell us what's happening. We'll assess the system, explain the options, and agree on the next step with you.</p>
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
          <p>From a home that won't cool down to a business that needs a new system, we welcome service requests across the United States.</p>
          <p class="muted">Share your ZIP code to confirm local availability and scheduling.</p>
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
