# AI4C Lab Website

AI for Construction Laboratory 홈페이지 — Next.js 14 + Notion API

## 🚀 빠른 시작

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local.example`을 복사해서 `.env.local` 파일 생성:
```bash
cp .env.local.example .env.local
```
그 다음 `.env.local`에 실제 값 입력:
```env
NOTION_TOKEN=secret_xxx...
NOTION_MEMBERS_DB_ID=32자리ID
NOTION_PUBLICATIONS_DB_ID=32자리ID
NOTION_NEWS_DB_ID=32자리ID
NOTION_PROJECTS_DB_ID=32자리ID
```

### 3. 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000

---

## 📁 Notion DB 구조

| DB 이름 | 필드 |
|---------|------|
| ai4c-members | name, image, course(Select), period, email, order(Number), active(Checkbox) |
| ai4c-publications | title, authors, journal(Select), date, url, citations(Number) |
| ai4c-projects | title, description, period, status(Select), thumbnail, tags(Multi-select) |
| ai4c-news | title, date, category(Select), content, link |

---

## ☁️ Vercel 배포

1. GitHub에 프로젝트 push
2. [vercel.com](https://vercel.com) → "Add New Project" → GitHub 레포 선택
3. Environment Variables에 `.env.local` 값들 모두 입력
4. Deploy 클릭

→ 자동으로 `your-project.vercel.app` 도메인 생성됨

---

## ✏️ 콘텐츠 수정 방법

| 항목 | 방법 |
|------|------|
| 멤버 추가 | Notion `ai4c-members` DB에 행 추가 |
| 논문 추가 | Notion `ai4c-publications` DB에 행 추가 |
| 프로젝트 추가 | Notion `ai4c-projects` DB에 행 추가 |
| 뉴스 게시 | Notion `ai4c-news` DB에 행 추가 |

수정 후 최대 60초 내에 웹사이트에 자동 반영됩니다 (ISR).

---

## 🔄 Google Scholar 자동 동기화 (GitHub Actions)

Google Scholar 변동사항을 Notion `ai4c-publications` DB로 자동 반영하도록 설정할 수 있습니다.

### 포함된 파일
- `.github/workflows/sync-scholar-publications.yml`
- `scripts/sync-scholar-publications.js`

### 동작 방식
1. 스케줄(12시간마다) 또는 수동 실행으로 GitHub Actions 실행
2. Scholar 프로필에서 논문 목록 파싱
3. Notion Publications DB에 신규 논문 생성 + 기존 논문(citations/date/url 등) 갱신

### GitHub Secrets 설정
레포지토리 `Settings > Secrets and variables > Actions`에 아래 시크릿 추가:

- `NOTION_TOKEN`
- `NOTION_PUBLICATIONS_DB_ID`
- `SCHOLAR_USER_ID` (예: `egT87vMAAAAJ`)
- `SERPAPI_API_KEY` (권장, GitHub Actions에서 Scholar 403 차단 회피용)

실패 시 메일 알림까지 받으려면 아래 시크릿도 추가:

- `SMTP_SERVER` (예: `smtp.gmail.com`)
- `SMTP_PORT` (예: `465`)
- `SMTP_USERNAME` (발송 계정)
- `SMTP_PASSWORD` (앱 비밀번호 또는 SMTP 비밀번호)
- `ALERT_EMAIL_FROM` (예: `ai4c-bot@yourdomain.com`)
- `ALERT_EMAIL_TO` (알림 수신 메일)

> 참고: `SERPAPI_API_KEY` 없이 GitHub Actions에서 직접 Scholar 스크래핑을 시도하면 403이 발생할 수 있습니다.

### 수동 로컬 실행
```bash
npm run sync:scholar
```

---

## 🎨 디자인 커스터마이징

- 색상: `app/globals.css`의 CSS 변수 수정
- 연구실 정보: `app/page.tsx`의 `researchAreas` 배열 수정
- 연락처: `app/page.tsx` 하단 이메일 주소 수정
