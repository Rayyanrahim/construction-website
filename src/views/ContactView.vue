<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { company } from '../data/site'
import { services, serviceBySlug } from '../data/services'
const route = useRoute()
const prepared = ref(false)
const form = ref({
  name: '', email: '', phone: '',
  zip: typeof route.query.zip === 'string' ? route.query.zip : '',
  service: serviceBySlug(route.query.service)?.slug || '',
  property: 'Home', message: '',
})
const requestText = computed(() => [
  'Service request — ' + company.name,
  'Name: ' + form.value.name,
  'Email: ' + form.value.email,
  'Phone: ' + form.value.phone,
  'ZIP code: ' + form.value.zip,
  'Property: ' + form.value.property,
  'Service: ' + (serviceBySlug(form.value.service)?.title || 'Help choosing a service'),
  '', form.value.message,
].join('\n'))
const emailDraft = computed(() => 'mailto:' + company.email + '?subject=' + encodeURIComponent('HVAC inquiry from ' + form.value.name) + '&body=' + encodeURIComponent(requestText.value))
function downloadRequest() {
  const url = URL.createObjectURL(new Blob([requestText.value], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'fl-construction-venture-service-request.txt'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/contact-support.jpg'); --hero-position: center 15%"><div class="container"><p class="eyebrow">Contact FL CONSTRUCTION VENTURE</p><h1>Let’s talk about<br />your HVAC needs.</h1><p>Request information about repairs, new equipment, maintenance, or commercial HVAC service. Share a few details and we’ll help identify the next step.</p></div></section><section class="contact-page section-pad"><div class="container contact-grid">
  <div class="contact-copy"><h2>How can we<br />help your property?</h2><div class="contact-direct"><div><span>Sample phone</span><a :href="'tel:' + company.phone">{{ company.phoneDisplay }} ↗</a></div><div><span>Sample email</span><a :href="'mailto:' + company.email">{{ company.email }} ↗</a></div></div><p class="contact-sample"><strong>Sample business contact details</strong><br />Phone, email, and office address are placeholders for this website. Replace them with verified business details before launch. This form prepares a request; it does not submit it to a server.</p><div class="contact-location"><span aria-hidden="true">↗</span><p><strong>Sample office address</strong><br />{{ company.address }}</p></div></div>
  <form class="contact-form" @submit.prevent="prepared = true"><h2>Tell us what you need</h2><p>Share your property type, Florida ZIP code, and HVAC concern.</p><div class="form-row"><label>Full name<input v-model="form.name" autocomplete="name" placeholder="Your name" required /></label><label>Email address<input v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com" required /></label></div><div class="form-row"><label>Phone number<input v-model="form.phone" type="tel" autocomplete="tel" placeholder="(000) 000-0000" required /></label><label>Florida ZIP code<input v-model="form.zip" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a valid US ZIP code." placeholder="e.g. 32801" required /></label></div><div class="form-row"><label>What can we help with?<select v-model="form.service"><option value="">Help me choose</option><option v-for="service in services" :key="service.slug" :value="service.slug">{{ service.title }}</option></select></label><label>Property type<select v-model="form.property"><option>Home</option><option>Business</option><option>Other</option></select></label></div><label>Tell us a little more<textarea v-model="form.message" rows="4" placeholder="Describe the system, issue, and when it started." required></textarea></label><button class="button form-submit" type="submit">Prepare inquiry <span aria-hidden="true">↗</span></button><p class="form-note">Your details stay in this page until you choose to email or save them.</p><div v-if="prepared" class="request-ready" role="status"><h3>Your inquiry is ready.</h3><p>Nothing has been sent. Contact details are samples, so save your request or review the email draft before sending.</p><button class="text-link" type="button" @click="downloadRequest">Save request as a text file <span aria-hidden="true">↓</span></button><a :href="emailDraft" class="draft-link">Open an email draft with the sample address ↗</a></div></form>
</div></section></main></template>

