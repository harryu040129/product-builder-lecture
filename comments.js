const commentsDisclosure = document.querySelector('#commentsDisclosure');
const commentsStatus = document.querySelector('#commentsStatus');
let commentsRequested = false;

window.disqus_config = function () {
  this.page.url = window.location.href.split('#')[0].split('?')[0];
  this.page.identifier = 'page-note-all-reviews';
  this.callbacks.onReady = [function () {
    commentsStatus.hidden = true;
  }];
};

commentsDisclosure.addEventListener('toggle', () => {
  if (!commentsDisclosure.open || commentsRequested) return;
  commentsRequested = true;
  const script = document.createElement('script');
  script.src = 'https://productbuilder-xcgzswnvsg.disqus.com/embed.js';
  script.setAttribute('data-timestamp', Date.now());
  script.onerror = () => {
    commentsStatus.textContent = '댓글을 불러오지 못했어요. 잠시 후 다시 열어 주세요.';
    commentsRequested = false;
    script.remove();
  };
  commentsStatus.textContent = '댓글을 불러오는 중이에요…';
  document.head.appendChild(script);
});
