const defaultReviews = [
  { book: '아몬드', text: '상처를 이해하는 방식은 사람마다 다르다는 걸, 아주 담담하고 다정하게 알려준 책.', rating: 5, user: '지은', likes: 24 },
  { book: '불편한 편의점', text: '평범한 하루에도 서로를 살게 하는 작은 친절이 있다는 것을 다시 믿게 되었다.', rating: 4, user: '현우', likes: 18 },
  { book: '여름은 오래 그곳에 남아', text: '여름의 공기와 빛을 고스란히 품은 문장들. 천천히 아껴 읽고 싶은 이야기.', rating: 5, user: '소연', likes: 31 }
];
const reviews = JSON.parse(localStorage.getItem('page-note-reviews') || 'null') || defaultReviews;
const stars = rating => '★'.repeat(rating) + '☆'.repeat(5 - rating);
const escapeHtml = text => { const element = document.createElement('div'); element.textContent = text; return element.innerHTML; };
const grid = document.querySelector('#allReviewsGrid');

grid.innerHTML = reviews.map(review => `<article class="review-card">
  <div class="card-top"><span class="book-tag">${escapeHtml(review.book)}</span><span class="card-stars">${stars(review.rating)}</span></div>
  <blockquote>“${escapeHtml(review.text)}”</blockquote>
  <div class="card-footer"><span>${escapeHtml(review.user)}의 감상</span><span>♡ ${review.likes}</span></div>
</article>`).join('');
