# page.note — 나만의 책 이야기
책 감상과 별점을 기록하는 HTML/CSS/JavaScript 웹 프로젝트입니다. 빌드 도구 없이 브라우저에서 동작하며, 개인 감상은 localStorage에 저장합니다.

## 주요 기능
- 감상·별점 작성, 좋아요, 필터
- 책과 감상 검색
- 메인 페이지 한국어/영어 전환
- 전체 감상 페이지
- Formspree 의견 전송과 Disqus 댓글 연동

기본 감상은 데모 데이터입니다. localStorage의 감상·좋아요는 현재 브라우저에만 저장되며 계정 간 동기화나 공용 게시판 데이터베이스는 없습니다. Disqus 댓글은 별도 외부 서비스입니다.

## 로컬 실행
Python 3가 있다면 저장소 루트에서:
```sh
python -m http.server 8000
```
브라우저에서 http://localhost:8000 을 엽니다. 같은 주소·포트를 사용해야 같은 localStorage 기록을 볼 수 있습니다.

## 파일 안내
| 파일 | 역할 |
| --- | --- |
| [index.html](index.html) | 메인 페이지 |
| [style.css](style.css) | 공통 스타일 |
| [script.js](script.js) | 감상 작성·검색·언어 전환 |
| [reviews.html](reviews.html) / [reviews.js](reviews.js) | 전체 감상 표시 |
| [comments.js](comments.js) | Disqus 댓글 지연 로딩 |
| [ads.txt](ads.txt) | 광고 판매자 정보 |

## 외부 서비스 설정
배포 또는 재사용할 때 HTML의 Formspree 폼 주소, Google Analytics·Clarity·AdSense 식별자, `comments.js`의 Disqus 주소, `ads.txt`를 본인 설정에 맞게 확인하세요. 외부 스크립트·폰트·댓글·폼 전송에는 네트워크가 필요합니다.

## 검증 범위
이번 문서 정리는 소스 구조와 동작 경로를 확인한 결과입니다. 실제 폼 제출, 댓글 게시, 광고·분석 서비스 동작 검증은 수행하지 않았습니다.
