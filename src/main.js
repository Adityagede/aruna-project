import './style.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'

// =========================
// ALPINE JS SETUP
// =========================
window.Alpine = Alpine

Alpine.plugin(collapse)

Alpine.data('hotelNavbar', () => ({
  open: false,
  galleryOpen: false,
  mobileGalleryOpen: false,

  toggleMenu() {
    this.open = !this.open
  },

  toggleGallery() {
    this.galleryOpen = !this.galleryOpen
  },

  toggleMobileGallery() {
    this.mobileGalleryOpen = !this.mobileGalleryOpen
  },

  closeAll() {
    this.open = false
    this.galleryOpen = false
    this.mobileGalleryOpen = false
  },
}))


Alpine.data('floatingWhatsApp', () => ({
  open: false,

  phone: '6281234567890',

  message:
    'Hello Aruna Ubud Retreat, I would like to ask about room availability and special offers.',

  toggle() {
    this.open = !this.open
  },

  close() {
    this.open = false
  },

  get whatsappUrl() {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`
  },
}))

Alpine.start()

// =========================
// AOS SETUP
// =========================
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100,
})

// =========================
// SWIPER SETUP
// =========================
const projectSwiperEl = document.querySelector('.project-swiper')

if (projectSwiperEl) {
  new Swiper('.project-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })
}