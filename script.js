const translations = {
  en: {
    title: 'page.note — Stories that stay with you', homeLabel: 'page.note home', mainNavigation: 'Main navigation', explore: 'Explore', myShelf: 'My Shelf', community: 'Community', openSearch: 'Open search', closeSearch: 'Close search', profile: 'My profile', bookIllustration: 'Book and flower illustration', heroTitle: 'After closing a book,<br><em>the story stays.</em>', heroDescription: 'Save the lines and thoughts that linger with you,<br class="desktop-only"> then share them with people reading the same book.', writeReview: 'Write a review', editorsPick: 'Let’s read together<br>this week', moreBooks: 'Browse more books', featuredImage: 'A book on a table', bookOfMonth: 'Book of the month', featuredAuthor: 'By Claire Keegan · Dasan Books', featuredTitle: 'Foster', readers: '(2,461 readers)', featuredDescription: '“A great love held in a small, quiet story.”<br>A young girl’s summer that gently stays with you long after the last page.', leaveThought: 'Leave a thought', freshReviews: 'Fresh from the shelf', reviewFilter: 'Review filters', all: 'All', highestRated: 'Highest rated', mostRecent: 'Most recent', writeTitle: 'What feeling did<br><em>today’s book leave you with?</em>', writeDescription: 'It doesn’t have to be perfect. Even one line can become a story that is entirely yours.', quote: '“ Reading is understanding yourself more deeply<br>through someone else’s experience. ”', bookLabel: 'Book read', ratingLabel: 'My rating', reviewLabel: 'Thoughts', bookPlaceholder: 'Enter the book title', reviewPlaceholder: 'Write down what the book brought to mind', saveReview: 'Save my review', feedbackTitle: 'Help make page.note<br><em>better with your ideas.</em>', feedbackDescription: 'Tell us what felt missing, what could work better, or what you would love to see next. Every thought helps shape the next page.', feedbackEmailLabel: 'Email <small>(optional)</small>', feedbackEmailPlaceholder: 'Leave your email if you would like a reply', feedbackTypeLabel: 'What kind of feedback is this?', feedbackTypePlaceholder: 'Choose a feedback type', feedbackTypeImprove: 'Something to improve', feedbackTypeMissing: 'A feature you would like', feedbackTypeIssue: 'Something that is not working well', feedbackTypeOther: 'Something else', feedbackMessageLabel: 'Your recommendation', feedbackMessagePlaceholder: 'Tell us what we can make better.', feedbackSubmit: 'Send feedback', feedbackSuccess: 'Thank you — your recommendation has been sent.', feedbackError: 'We could not send that right now. Please try again.', searchPlaceholder: 'Search for a book or author', popularSearches: 'Popular searches · Foster · The Vegetarian · Demian', searchLabel: 'Search books or authors', searchStart: 'Start typing to search your shelf.', searchResults: 'result(s)', noSearchResults: 'No books or reviews matched', featuredResult: 'Featured book', reviewResult: 'Review', selectRating: 'Select a rating', ratingWords: ['Not for me', 'So-so', 'Good', 'Loved it', 'Absolutely loved it'], reviewBy: '’s review', reviewByPrefix: 'Review by ', saved: 'Your review has been added to your shelf.', chooseRating: 'Choose a rating first.', searchOpen: 'Open search', languageButton: 'KO', languageButtonLabel: '한국어로 전환'
  }
};

const defaultReviews = [
  { book: '아몬드', text: '상처를 이해하는 방식은 사람마다 다르다는 걸, 아주 담담하고 다정하게 알려준 책.', rating: 5, user: '지은', likes: 24, color: '' },
  { book: '불편한 편의점', text: '평범한 하루에도 서로를 살게 하는 작은 친절이 있다는 것을 다시 믿게 되었다.', rating: 4, user: '현우', likes: 18, color: 'peach' },
  { book: '여름은 오래 그곳에 남아', text: '여름의 공기와 빛을 고스란히 품은 문장들. 천천히 아껴 읽고 싶은 이야기.', rating: 5, user: '소연', likes: 31, color: 'green' }
];
let reviews = JSON.parse(localStorage.getItem('page-note-reviews') || 'null') || defaultReviews;
let score = 0;
let language = localStorage.getItem('page-note-language') || 'ko';
const grid = document.querySelector('#reviewGrid');
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
const copy = key => language === 'en' ? translations.en[key] : null;

document.querySelectorAll('[data-i18n]').forEach(element => { element.dataset.ko = element.innerHTML; });
document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.dataset.koPlaceholder = element.placeholder; });
document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.dataset.koAria = element.getAttribute('aria-label'); });
document.querySelectorAll('[data-i18n-alt]').forEach(element => { element.dataset.koAlt = element.alt; });

function translatePage() {
  const english = language === 'en';
  document.documentElement.lang = language;
  document.title = english ? translations.en.title : 'page.note — 나만의 책 이야기';
  document.querySelectorAll('[data-i18n]').forEach(element => { const key = element.dataset.i18n; element.innerHTML = english ? translations.en[key] : element.dataset.ko; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { const key = element.dataset.i18nPlaceholder; element.placeholder = english ? translations.en[key] : element.dataset.koPlaceholder; });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { const key = element.dataset.i18nAria; element.setAttribute('aria-label', english ? translations.en[key] : element.dataset.koAria); });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => { const key = element.dataset.i18nAlt; element.alt = english ? translations.en[key] : element.dataset.koAlt; });
  const button = document.querySelector('#languageButton');
  button.textContent = english ? translations.en.languageButton : 'EN';
  button.setAttribute('aria-label', english ? translations.en.languageButtonLabel : '영어로 전환');
  document.querySelector('#ratingText').textContent = english ? translations.en.selectRating : '별점을 선택해 주세요';
  document.querySelectorAll('[data-book-en]').forEach(button => { button.dataset.book = english ? button.dataset.bookEn : '맡겨진 소녀'; });
  renderReviews();
}

function renderReviews(list = reviews) {
  const footer = review => language === 'en' ? `${translations.en.reviewByPrefix}${escapeHtml(review.user)}` : `${escapeHtml(review.user)}의 감상`;
  grid.innerHTML = list.map((review, index) => `<article class="review-card">
    <div class="card-top"><span class="book-tag">${escapeHtml(review.book)}</span><span class="card-stars">${stars(review.rating)}</span></div>
    <blockquote>“${escapeHtml(review.text)}”</blockquote>
    <div class="card-footer"><span>${footer(review)}</span><button class="like" data-index="${index}">♡ ${review.likes}</button></div>
  </article>`).join('');
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); }

document.querySelector('#languageButton').addEventListener('click', () => {
  language = language === 'ko' ? 'en' : 'ko';
  localStorage.setItem('page-note-language', language);
  translatePage();
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active');
  if (button.dataset.filter === '5') renderReviews(reviews.filter(r => r.rating === 5));
  else if (button.dataset.filter === 'recent') renderReviews([...reviews].reverse());
  else renderReviews();
}));
grid.addEventListener('click', event => { const button = event.target.closest('.like'); if (!button) return; const review = reviews[button.dataset.index]; review.likes += 1; localStorage.setItem('page-note-reviews', JSON.stringify(reviews)); button.classList.add('liked'); button.textContent = `♥ ${review.likes}`; });
document.querySelectorAll('#starPicker button').forEach(button => button.addEventListener('click', () => {
  score = Number(button.dataset.score); document.querySelectorAll('#starPicker button').forEach(star => star.classList.toggle('selected', Number(star.dataset.score) <= score));
  document.querySelector('#ratingText').textContent = language === 'en' ? `${score}/5 · ${translations.en.ratingWords[score - 1]}` : `${score}점 · ${['아쉬워요','그저 그래요','좋아요','아주 좋아요','정말 좋았어요'][score - 1]}`;
}));
document.querySelector('#reviewForm').addEventListener('submit', event => {
  event.preventDefault(); if (!score) { showToast(language === 'en' ? translations.en.chooseRating : '별점을 먼저 선택해 주세요.'); return; }
  reviews.unshift({ book: document.querySelector('#bookTitle').value.trim(), text: document.querySelector('#reviewText').value.trim(), rating: score, user: language === 'en' ? 'Me' : '나', likes: 0 });
  localStorage.setItem('page-note-reviews', JSON.stringify(reviews)); renderReviews(); event.target.reset(); score = 0; document.querySelectorAll('#starPicker button').forEach(star => star.classList.remove('selected')); document.querySelector('#ratingText').textContent = language === 'en' ? translations.en.selectRating : '별점을 선택해 주세요'; document.querySelector('#reviews').scrollIntoView(); showToast(language === 'en' ? translations.en.saved : '감상이 서재에 기록되었어요.');
});
document.querySelector('#feedbackForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const submit = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#feedbackStatus');
  submit.disabled = true;
  status.classList.remove('error');
  status.textContent = language === 'en' ? 'Sending…' : '보내는 중…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Formspree request failed');
    form.reset();
    status.textContent = language === 'en' ? translations.en.feedbackSuccess : '고마워요. 소중한 의견을 잘 받았어요.';
  } catch (error) {
    status.classList.add('error');
    status.textContent = language === 'en' ? translations.en.feedbackError : '전송하지 못했어요. 잠시 후 다시 시도해 주세요.';
  } finally {
    submit.disabled = false;
  }
});
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => { document.querySelector('#bookTitle').value = button.dataset.book; document.querySelector('#write').scrollIntoView(); document.querySelector('#reviewText').focus(); }));
const overlay = document.querySelector('#searchOverlay');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
const searchButton = document.querySelector('#searchButton');
const closeSearchButton = document.querySelector('#closeSearch');
let lastFocusedElement;
const searchCopy = key => language === 'en' ? translations.en[key] : ({ searchStart: '검색어를 입력해 내 서재의 책과 감상을 찾아보세요.', searchResults: '개의 검색 결과', noSearchResults: '일치하는 책이나 감상을 찾지 못했어요.', featuredResult: '이달의 책', reviewResult: '감상' }[key]);
const normalizeSearch = value => value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
function searchItems() {
  return [{ title: language === 'en' ? 'Foster' : '맡겨진 소녀', terms: '맡겨진 소녀 foster 클레어 키건 claire keegan 다산책방', kind: searchCopy('featuredResult'), target: '#shelf' }, ...reviews.map((review, index) => ({ title: review.book, terms: `${review.book} ${review.text} ${review.user}`, kind: searchCopy('reviewResult'), target: `#reviewGrid`, index }))];
}
function renderSearchResults() {
  const query = normalizeSearch(searchInput.value);
  if (!query) { searchResults.innerHTML = `<p class="search-message">${searchCopy('searchStart')}</p>`; return; }
  const matches = searchItems().filter(item => normalizeSearch(`${item.title} ${item.terms}`).includes(query));
  if (!matches.length) { searchResults.innerHTML = `<p class="search-message">${searchCopy('noSearchResults')} “${escapeHtml(searchInput.value.trim())}”</p>`; return; }
  searchResults.innerHTML = `<p class="search-count">${matches.length}${searchCopy('searchResults')}</p>${matches.map(item => `<button class="search-result" type="button" data-target="${item.target}"${Number.isInteger(item.index) ? ` data-review-index="${item.index}"` : ''}><span>${escapeHtml(item.title)}</span><small>${item.kind} <b>→</b></small></button>`).join('')}`;
}
function closeSearch() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); searchButton.focus(); }
searchButton.addEventListener('click', () => { lastFocusedElement = document.activeElement; searchInput.value = ''; renderSearchResults(); overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); setTimeout(() => searchInput.focus(), 250); });
closeSearchButton.addEventListener('click', closeSearch);
searchInput.addEventListener('input', renderSearchResults);
searchResults.addEventListener('click', event => { const result = event.target.closest('.search-result'); if (!result) return; closeSearch(); document.querySelector(result.dataset.target).scrollIntoView({ behavior: 'smooth' }); if (result.dataset.reviewIndex) setTimeout(() => grid.children[Number(result.dataset.reviewIndex)]?.focus(), 500); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeSearch(); });
translatePage();
