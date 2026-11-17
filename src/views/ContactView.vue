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
const emailDraft = computed(() => 'mailto:' + company.email + '?subject=' + encodeURIComponent('HVAC service request from ' + form.value.name) + '&body=' + encodeURIComponent(requestText.value))
function downloadRequest() {
  const url = URL.createObjectURL(new Blob([requestText.value], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'florida-construction-venture-service-request.txt'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>
<template><main id="main"><section class="page-hero image-hero" style="--hero-image: url('/images/contact-support.jpg'); --hero-position: center 15%"><div class="container"><p class="eyebrow">Let’s get you comfortable</p><h1>Tell us what<br />you need.</h1><p>A repair, a new system, or a little guidance. Share a few details and take the first step.</p></div></section><section class="contact-page section-pad"><div class="container contact-grid">
  <div class="contact-copy"><h2>Let’s arrange<br />your next step.</h2><div class="contact-direct"><div><span>Call us</span><a :href="'tel:' + company.phone">{{ company.phoneDisplay }} ↗</a></div><div><span>Email us</span><a :href="'mailto:' + company.email">{{ company.email }} ↗</a></div></div><p class="contact-sample"><strong>Contact details coming soon.</strong><br />The number and email shown are samples. You can prepare and save your request below; online booking is not active yet.</p><div class="contact-location"><span aria-hidden="true">↗</span><p><strong>Across the United States</strong><br />Availability confirmed for your ZIP code.</p></div></div>
  <form class="contact-form" @submit.prevent="prepared = true"><h2>Request service</h2><p>Start with what you know. We’ll help with the rest.</p><div class="form-row"><label>Full name<input v-model="form.name" autocomplete="name" placeholder="Your name" required /></label><label>Email address<input v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com" required /></label></div><div class="form-row"><label>Phone number<input v-model="form.phone" type="tel" autocomplete="tel" placeholder="(000) 000-0000" required /></label><label>ZIP code<input v-model="form.zip" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a valid US ZIP code." placeholder="e.g. 33401" required /></label></div><div class="form-row"><label>What can we help with?<select v-model="form.service"><option value="">Help me choose</option><option v-for="service in services" :key="service.slug" :value="service.slug">{{ service.title }}</option></select></label><label>Property type<select v-model="form.property"><option>Home</option><option>Business</option><option>Other</option></select></label></div><label>Tell us a little more<textarea v-model="form.message" rows="4" placeholder="What is the system doing? When did you notice the problem?" required></textarea></label><button class="button form-submit" type="submit">Prepare service request <span aria-hidden="true">↗</span></button><p class="form-note">Your details stay in this page until you choose to email or save them.</p><div v-if="prepared" class="request-ready" role="status"><h3>Your request is ready.</h3><p>Nothing has been sent. Contact details are still samples, so save your request for now.</p><button class="text-link" type="button" @click="downloadRequest">Save request as a text file <span aria-hidden="true">↓</span></button><a :href="emailDraft" class="draft-link">Open an email draft with the sample address ↗</a></div></form>
</div></section></main></template>

