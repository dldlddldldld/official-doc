# Handover — 공문 목록 (official-doc)

## 현재 상태

Next.js 기반 "공문(공식 문서) 목록" 화면. 최초 스캐폴드 1커밋(`공문 목록 초기 화면 추가`)만 존재하는 초기 단계.

## 구조

- `app/official-docs/page.tsx` — `/official-docs` 라우트, `OfficialDocsList` 렌더링
- `app/official-docs/OfficialDocsList.tsx` — 메인 화면
  - 키워드 검색 입력 + 검색/초기화 버튼
  - "공문 등록" 버튼 (동작 미구현)
  - `react-query`(`useQuery`)로 목록 조회, 테이블(제목/작성자/작성일) 렌더링, 하단 페이지네이션
- `app/official-docs/api.ts` — `GET /public-letter/list` 호출 (`keyword`, `page` 쿼리 파라미터)
- `app/official-docs/types.ts` — `OfficialDoc { id, title, author, createdAt }`
- `components/ui/Pagination.tsx` — 페이지 번호 버튼 나열 (이전/다음 버튼 없음)
- `lib/axios.ts` — `NEXT_PUBLIC_API_BASE_URL` 기반 axios 클라이언트 (`withCredentials: true`)
- `official-doc-template.zip` — 위 파일들과 동일한 내용의 초기 템플릿 zip

## 알려진 이슈 / 다음 작업 후보

1. `OfficialDocsList.tsx`의 `Math.ceil(data?.total / 10)` — `data`가 `undefined`일 때 `data?.total`도 `undefined`가 되어 `NaN` 발생 (에러는 안 나지만 의도치 않은 동작). optional chaining 또는 기본값 처리 필요.
2. "공문 등록" 버튼에 `onClick` 핸들러 없음 — 등록 플로우 미구현.
3. `Pagination` 컴포넌트가 전체 페이지 수만큼 버튼을 나열 — 페이지가 많아지면 UI가 깨짐. 이전/다음, 축약(ellipsis) 처리 필요.
4. 에러 상태 처리 없음 — `useQuery`의 `isError`/`error`를 사용하지 않음.
5. `shadcn/ui` 계열(`@/components/ui/input`, `@/components/ui/button`)을 사용하지만 리포지토리에 해당 컴포넌트 파일이 없음 — 별도 설정 또는 누락 확인 필요.

## 참고

- API base URL은 `.env.local`의 `NEXT_PUBLIC_API_BASE_URL`로 설정.
- 별도의 handover/handoff 문서는 이 리포지토리, git 히스토리, GitHub 이슈·PR 어디에도 없었음. 이 파일이 최초 작성본.
