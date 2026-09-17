<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 🍺 BeerArchive v2

맥주 커뮤니티 NestJS 재설계 버전

기존 Spring Boot 기반 [BeerArchive](저장소 링크로 교체) 프로젝트를 TypeScript / NestJS로 재설계한 버전입니다.
맥주 및 양조장 아카이빙, 커뮤니티 게시판, 리뷰/좋아요, Kakao Map 기반 펍 위치 조회 기능을 제공합니다.

## 기술 스택

- **Backend**: NestJS, TypeScript
- **Database**: MySQL, Prisma ORM
- **External API**: Kakao Map API
- **Infra**: AWS EC2
- **Auth**: JWT 기반 인증

## 주요 기능

- 맥주 / 양조장 CRUD
- 커뮤니티 게시글 작성 및 관리
- 리뷰 및 좋아요
- Kakao Map 기반 펍 위치 조회
- 계정 등급별 권한 관리 (관리자 기능 포함)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 프로젝트 구조

```
src/
├── auth/
├── users/
├── beers/
├── breweries/
├── posts/
├── reviews/
├── likes/
├── maps/
├── common/
├── config/
└── prisma/
```

## 관련 프로젝트

- 기존 Spring Boot 버전: [링크로 교체]
- iOS(SwiftUI) 포트: [링크로 교체]

## License

This project is for portfolio purposes.
