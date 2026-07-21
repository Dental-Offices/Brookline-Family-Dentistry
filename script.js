'use strict';

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function setupNavToggle(toggleSelector, navSelector) {
  const menuButton = document.querySelector(toggleSelector);
  const nav = document.querySelector(navSelector);

  if (!menuButton || !nav) {
    return;
  }

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

setupNavToggle('#menu-toggle', '#main-nav');

// Scroll reveal for service pages
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
setupNavToggle('#hamburger', '#nav');

const testimonials = [
  {
    title: 'The Team Is Amazing',
    text: 'I highly recommend the doctors and staff. Everyone is professional, kind, and they genuinely make you feel like family from check-in to checkout.',
    rating: '5.0/5 Rating',
    score: 5,
    initials: 'JM',
    name: 'John M.',
    service: 'Routine Cleaning',
    source: 'Google Review'
  },
  {
    title: 'Best Dental Experience',
    text: 'Great care from start to finish. The team explains every step clearly, keeps things comfortable, and always respects my time.',
    rating: '4.9/5 Rating',
    score: 4.9,
    initials: 'SR',
    name: 'Sarah R.',
    service: 'Cosmetic Consultation',
    source: 'Patient Feedback'
  },
  {
    title: 'Professional And Friendly',
    text: 'My cleaning and restorative work were excellent. The office is efficient, welcoming, and truly focused on long-term oral health.',
    rating: '4.9/5 Rating',
    score: 4.9,
    initials: 'DP',
    name: 'David P.',
    service: 'Restorative Care',
    source: 'Verified Patient'
  }
];

const testimonialSlider = document.querySelector('[data-slider="testimonials"]');
const reviewsSection = document.getElementById('reviews');
const testimonialTitle = document.getElementById('testimonial-title');
const testimonialText = document.getElementById('testimonial-text');
const testimonialRating = document.getElementById('testimonial-rating');
const testimonialStars = document.getElementById('testimonial-stars');
const testimonialAvatar = document.getElementById('testimonial-avatar');
const testimonialName = document.getElementById('testimonial-name');
const testimonialService = document.getElementById('testimonial-service');
const testimonialSource = document.getElementById('testimonial-source');
const testimonialProgress = document.getElementById('testimonial-progress');
const reviewsDots = document.getElementById('reviews-dots');

if (
  testimonialSlider &&
  reviewsSection &&
  testimonialTitle &&
  testimonialText &&
  testimonialRating &&
  testimonialStars &&
  testimonialAvatar &&
  testimonialName &&
  testimonialService &&
  testimonialSource &&
  testimonialProgress &&
  reviewsDots
) {
  let testimonialIndex = 0;
  const prevButton = reviewsSection.querySelector('[data-action="prev"]');
  const nextButton = reviewsSection.querySelector('[data-action="next"]');

  const dots = testimonials.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'reviews-dot';
    dot.setAttribute('aria-label', `Show review ${index + 1}`);
    dot.addEventListener('click', () => {
      testimonialIndex = index;
      paintTestimonial();
    });
    reviewsDots.appendChild(dot);
    return dot;
  });

  const toStars = (score) => {
    const rounded = Math.max(1, Math.min(5, Math.round(score)));
    return '★'.repeat(rounded);
  };

  const paintTestimonial = () => {
    const item = testimonials[testimonialIndex];
    testimonialTitle.textContent = item.title;
    testimonialText.textContent = item.text;
    testimonialRating.textContent = item.rating;
    testimonialStars.textContent = toStars(item.score);
    testimonialAvatar.textContent = item.initials;
    testimonialName.textContent = item.name;
    testimonialService.textContent = item.service;
    testimonialSource.textContent = item.source;
    testimonialProgress.style.width = `${(item.score / 5) * 100}%`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === testimonialIndex);
    });
  };

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      paintTestimonial();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      paintTestimonial();
    });
  }

  paintTestimonial();
}
