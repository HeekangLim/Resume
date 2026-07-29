# 임희강 · 모바일 앱 개발자 포트폴리오

17년 차 모바일 앱 개발자 임희강의 포트폴리오 웹사이트입니다.
Android(Kotlin · Jetpack Compose)와 Flutter 크로스플랫폼을 중심으로,
잡코리아 · 풀무원 · GS ITM 등에서의 경력을 정리했습니다.

## 구성

- `index.html` — CSS·JS를 모두 인라인한 **단일 HTML 파일** (소개 · 기술 · 경력 · 프로젝트 · 교육/자격 · 연락처)

## 보기

`index.html` 파일을 더블클릭해 브라우저에서 바로 열면 됩니다. 별도 서버나 빌드가 필요 없습니다.

## 배포 (GitHub Pages)

별도 빌드 없이 정적 파일만으로 동작합니다.
저장소 Settings → Pages → Branch를 선택하면 바로 배포됩니다.

## 배포용 빌드

Cloudflare Worker 호환 정적 빌드가 필요할 때는 아래 명령을 실행합니다.

```bash
npm run build
```

생성 결과는 `dist/client`(정적 파일)과 `dist/server`(정적 자산 진입점)에 저장됩니다.
