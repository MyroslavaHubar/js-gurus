import Swiper from 'swiper/bundle';
import '../css/reviews.css';
import { fetchReviews } from './api.js';
import iziToast from 'izitoast';

async function loadReviews() {
  const swiperWrapperReviews = document.querySelector(
    '.swiper-wrapper-reviews'
  );

  try {
    const reviews = await fetchReviews();

    if (!reviews.length) {
      iziToast.error({
        title: 'Error',
        message: 'Not found',
        position: 'topRight',
      });
      return;
    }
    swiperWrapperReviews.innerHTML = '';

    reviews.forEach(review => {
      const slide = document.createElement('li');
      slide.classList.add('swiper-slide', 'swiper-slide-reviews');
      slide.innerHTML = `
        <div class="review-content">
          <img src="${review.avatar_url}" alt="${review.author}" />
          <div class="review-text">
            <p class="review-author">${review.author}</p>
            <p class="review-comment">${review.review}</p>
          </div>
        </div>
      `;
      swiperWrapperReviews.appendChild(slide);
    });

    const swiperReview = new Swiper('.swiper-review', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next-reviews',
        prevEl: '.swiper-button-prev-reviews',
      },
      keyboard: {
        enabled: true,
      },
      speed: 700,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    swiperReview.on('slideChange', () => {
      const isAtBeginning = swiperReview.isBeginning;
      const isAtEnd = swiperReview.isEnd;

      document.querySelector('.swiper-button-prev-reviews').disabled =
        isAtBeginning;
      document.querySelector('.swiper-button-next-reviews').disabled = isAtEnd;
    });

    document.querySelector('.swiper-button-prev-reviews').disabled =
      swiperReview.isBeginning;
    document.querySelector('.swiperReview-button-next-reviews').disabled =
      swiperReview.isEnd;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch reviews: ' + error.message,
      position: 'topRight',
    });
    console.error('Error fetching reviews:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadReviews();
});
