# 🌿 쑥맵 (SMRoad) - Frontend

> AI 기반 졸업 로드맵 & 시간표 자동 설계 서비스

숙명여대 학생들을 위한 맞춤형 졸업 플래너. 학점이수표를 업로드하면 AI가 졸업요건을 분석하고, 최적의 커리큘럼 로드맵과 시간표를 자동으로 설계해줍니다.

## 주요 기능

- **📄 학점이수표 PDF 분석** — 업로드만 하면 전필/전선/교필/교선 자동 분류
- **🎓 졸업요건 분석** — 부족 학점, 미이수 필수과목, 추가학기 위험 감지
- **🗺️ AI 커리큘럼 로드맵** — 진로 기반 맞춤 수강 순서 추천
- **📅 AI 시간표 자동 생성** — 공강/연강/오전 선호 반영, 충돌 자동 제거
- **✏️ 시간표 수동 수정** — 과목 추가/삭제, 실시간 충돌 검사

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| State | React Context + localStorage |

## 프로젝트 구조

```
src/
├── api/            # 백엔드 API 호출 함수 (axios)
├── assets/         # 이미지, 아이콘
├── components/     # 공통 컴포넌트 (Navbar, MyPageModal)
├── context/        # UserContext (로그인 정보 관리)
├── data/           # 정적 데이터 (courses.json, majors.js)
├── hooks/          # 커스텀 훅 (useHomeData)
├── pages/          # 페이지 컴포넌트
│   ├── Login.jsx       # 로그인 + 초기 설정 (PDF 업로드 포함)
│   ├── Home.jsx        # 대시보드 (학점현황, 로드맵, 시간표)
│   ├── Timetable.jsx   # AI 시간표 (수정 모드)
│   ├── Roadmap.jsx     # 커리큘럼 로드맵
│   └── Curriculum.jsx  # 교과과정 조회
├── styles/         # global.css
├── App.jsx         # 라우팅 설정
└── main.jsx        # 엔트리포인트
```

## 로그인 흐름

```
Google OAuth → PDF 업로드 → 기본정보(전공/학년) → 전공선택(복수/연계) → 진로입력 → 홈
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

개발 서버: `http://localhost:5173`

## API 연결

백엔드 API 주소는 환경변수로 관리합니다:

```env
VITE_API_URL=http://localhost:8000/api
```

개발 중에는 Vite 프록시가 `/api` 요청을 백엔드로 전달합니다.

