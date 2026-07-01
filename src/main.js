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

Alpine.data('contactForm', () => ({
  name: '',
  email: '',
  phone: '',
  message: '',

  sendToWhatsApp() {
    const phoneNumber = '6281234567890'

    const text = `
Hello Aruna Ubud Retreat,

I would like to plan my stay.

Name: ${this.name}
Email: ${this.email}
Phone: ${this.phone}

Message:
${this.message}
    `.trim()

    const encodedText = encodeURIComponent(text)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
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


// =========================
// ACTIVE NAV PAGE
// =========================
const navPageMap = {
  '': 'home',
  'index.html': 'home',
  'about.html': 'about',
  'accommodation.html': 'accommodation',
  'offers.html': 'offers',
  'contact.html': 'contact',
  'gallery.html': 'gallery',
}

const currentFile = window.location.pathname.split('/').pop()
const currentPage = navPageMap[currentFile] || 'home'

const navLinks = document.querySelectorAll('[data-nav-page]')

navLinks.forEach((link) => {
  const linkPage = link.dataset.navPage
  const isActive = linkPage === currentPage

  link.classList.toggle('is-active', isActive)

  if (isActive) {
    link.setAttribute('aria-current', 'page')
  } else {
    link.removeAttribute('aria-current')
  }
})

// =========================
// RETREAT DEPTH SCROLL EFFECT
// =========================
const retreatDepthSection = document.querySelector('.retreat-depth-section')

if (retreatDepthSection) {
  const updateRetreatDepth = () => {
    const rect = retreatDepthSection.getBoundingClientRect()
    const scrollableDistance = retreatDepthSection.offsetHeight - window.innerHeight

    if (scrollableDistance <= 0) return

    const progress = Math.min(
      Math.max(-rect.top / scrollableDistance, 0),
      1
    )

    const imageScale = 1.04 + progress * 0.12
const imageY = progress * -25
const imageBrightness = 0.9 - progress * 0.12

const cardY = progress * -45
const cardScale = 1 - progress * 0.025
const cardOpacity = 1 - progress * 0.1

    retreatDepthSection.style.setProperty('--image-scale', imageScale)
    retreatDepthSection.style.setProperty('--image-y', `${imageY}px`)
    retreatDepthSection.style.setProperty('--image-brightness', imageBrightness)
    retreatDepthSection.style.setProperty('--card-y', `${cardY}px`)
    retreatDepthSection.style.setProperty('--card-scale', cardScale)
    retreatDepthSection.style.setProperty('--card-opacity', cardOpacity)
  }

  window.addEventListener('scroll', updateRetreatDepth, { passive: true })
  window.addEventListener('resize', updateRetreatDepth)

  updateRetreatDepth()
}



// =========================
// RETREAT SINK SCROLL EFFECT
// =========================
const retreatSinkSection = document.querySelector('.retreat-sink-section')

if (retreatSinkSection) {
  let ticking = false

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
  }

  const updateSinkEffect = () => {
    const rect = retreatSinkSection.getBoundingClientRect()
    const sectionHeight = retreatSinkSection.offsetHeight
    const viewportHeight = window.innerHeight

    const scrollable = sectionHeight - viewportHeight

    if (scrollable <= 0) return

    const progress = clamp(-rect.top / scrollable, 0, 1)

    retreatSinkSection.style.setProperty('--sink-progress', progress.toFixed(3))

    ticking = false
  }

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSinkEffect)
      ticking = true
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)

  updateSinkEffect()
}