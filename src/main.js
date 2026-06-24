import './style.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'

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


Alpine.data('welcomePopup', () => ({
  open: false,
  duration: 6000,
  secondsLeft: 6,
  timer: null,
  countdownTimer: null,

  init() {
    const alreadySeen = sessionStorage.getItem('arunaWelcomePopupSeen')

    if (alreadySeen) return

    this.open = true
    this.secondsLeft = Math.ceil(this.duration / 1000)

    document.body.classList.add('overflow-hidden')

    this.countdownTimer = setInterval(() => {
      if (this.secondsLeft > 1) {
        this.secondsLeft--
      }
    }, 1000)

    this.timer = setTimeout(() => {
      this.close()
    }, this.duration)
  },

  close() {
    this.open = false
    document.body.classList.remove('overflow-hidden')
    sessionStorage.setItem('arunaWelcomePopupSeen', 'true')

    if (this.timer) {
      clearTimeout(this.timer)
    }

    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
}))

Alpine.store('mobileCta', {
  bookNowVisible: false,

  reveal() {
    this.bookNowVisible = true
  },
})  

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

const heroSwiperEl = document.querySelector('.hero-swiper')

if (heroSwiperEl) {
  new Swiper('.hero-swiper', {
    modules: [Autoplay],
    loop: true,
    speed: 1200,
    slidesPerView: 1,
    allowTouchMove: false,

    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  })
}

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