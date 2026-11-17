import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ServicesView from './views/ServicesView.vue'
import ServiceDetailView from './views/ServiceDetailView.vue'
import AboutView from './views/AboutView.vue'
import AreasView from './views/AreasView.vue'
import ContactView from './views/ContactView.vue'
import NotFoundView from './views/NotFoundView.vue'
import { serviceBySlug } from './data/services'
import { company } from './data/site'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || (to.hash ? { el: to.hash, top: 100 } : { top: 0 })
  },
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Heating & Cooling Services' } },
    { path: '/services', component: ServicesView, meta: { title: 'Our HVAC Services' } },
    { path: '/services/:slug', name: 'service', component: ServiceDetailView },
    { path: '/about', component: AboutView, meta: { title: 'About Us' } },
    { path: '/service-areas', component: AreasView, meta: { title: 'Nationwide Service Areas' } },
    { path: '/contact', component: ContactView, meta: { title: 'Contact & Service Requests' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Page Not Found' } },
  ],
})
router.beforeEach(to => {
  if (to.name === 'service' && !serviceBySlug(to.params.slug)) {
    return { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') }, replace: true }
  }
})
router.afterEach(to => {
  const service = to.name === 'service' ? serviceBySlug(to.params.slug) : null
  document.title = (service?.title || to.meta.title) + ' | ' + company.name
  const description = document.querySelector('meta[name="description"]')
  if (description) description.content = service?.intro || 'Florida Construction Venture offers residential and commercial HVAC services across the United States. Explore AC repair, installation, maintenance, air ducts, and indoor air quality.'
})
createApp(App).use(router).mount('#app')

