const defaultReviews = [
  { book: '아몬드', text: '상처를 이해하는 방식은 사람마다 다르다는 걸, 아주 담담하고 다정하게 알려준 책.', rating: 5, user: '지은', likes: 24, color: '' },
  { book: '불편한 편의점', text: '평범한 하루에도 서로를 살게 하는 작은 친절이 있다는 것을 다시 믿게 되었다.', rating: 4, user: '현우', likes: 18, color: 'peach' },
  { book: '여름은 오래 그곳에 남아', text: '여름의 공기와 빛을 고스란히 품은 문장들. 천천히 아껴 읽고 싶은 이야기.', rating: 5, user: '소연', likes: 31, color: 'green' }
];
let reviews = JSON.parse(localStorage.getItem('page-note-reviews') || 'null') || defaultReviews;
let score = 0;
const grid = document.querySelector('#reviewGrid');
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

function renderReviews(list = reviews) {
  grid.innerHTML = list.map((review, index) => `<article class="review-card">
    <div class="card-top"><span class="book-tag">${escapeHtml(review.book)}</span><span class="card-stars">${stars(review.rating)}</span></div>
    <blockquote>“${escapeHtml(review.text)}”</blockquote>
    <div class="card-footer"><span>${escapeHtml(review.user)}의 감상</span><button class="like" data-index="${index}">♡ ${review.likes}</button></div>
  </article>`).join('');
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); }
renderReviews();

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active');
  if (button.dataset.filter === '5') renderReviews(reviews.filter(r => r.rating === 5));
  else if (button.dataset.filter === 'recent') renderReviews([...reviews].reverse());
  else renderReviews();
}));
grid.addEventListener('click', event => { const button = event.target.closest('.like'); if (!button) return; const review = reviews[button.dataset.index]; review.likes += 1; localStorage.setItem('page-note-reviews', JSON.stringify(reviews)); button.classList.add('liked'); button.textContent = `♥ ${review.likes}`; });

document.querySelectorAll('#starPicker button').forEach(button => button.addEventListener('click', () => {
  score = Number(button.dataset.score); document.querySelectorAll('#starPicker button').forEach(star => star.classList.toggle('selected', Number(star.dataset.score) <= score)); document.querySelector('#ratingText').textContent = `${score}점 · ${['아쉬워요','그저 그래요','좋아요','아주 좋아요','정말 좋았어요'][score - 1]}`;
}));
document.querySelector('#reviewForm').addEventListener('submit', event => {
  event.preventDefault(); if (!score) { showToast('별점을 먼저 선택해 주세요.'); return; }
  reviews.unshift({book: document.querySelector('#bookTitle').value.trim(), text: document.querySelector('#reviewText').value.trim(), rating: score, user: '나', likes: 0});
  localStorage.setItem('page-note-reviews', JSON.stringify(reviews)); renderReviews(); event.target.reset(); score = 0; document.querySelectorAll('#starPicker button').forEach(star => star.classList.remove('selected')); document.querySelector('#ratingText').textContent = '별점을 선택해 주세요'; document.querySelector('#reviews').scrollIntoView(); showToast('감상이 서재에 기록되었어요.');
});
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => { document.querySelector('#bookTitle').value = button.dataset.book; document.querySelector('#write').scrollIntoView(); document.querySelector('#reviewText').focus(); }));
const overlay = document.querySelector('#searchOverlay'); document.querySelector('#searchButton').addEventListener('click', () => { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); setTimeout(() => document.querySelector('#searchInput').focus(), 250); }); document.querySelector('#closeSearch').addEventListener('click', () => overlay.classList.remove('open')); document.addEventListener('keydown', event => { if(event.key === 'Escape') overlay.classList.remove('open'); });
