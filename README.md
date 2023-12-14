## Tech Stack

1. Next.js
2. TypeScript
3. Tailwind CSS
4. NextAuth.js
5. AWS S3
6. Google OAuth

## Description

This app is building by Next.js, and use AWS S3 to store images, and use Google OAuth to login.

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Env Var

```dotenv
AWS_S3_REGION=set-your-region
AWS_ACCESS_KEY_ID=set-your-access-key
AWS_SECRET_ACCESS_KEY=set-your-secret-key
AWS_S3_BUCKET_NAME=set-your-bucket-name

GCP_CLIENT_ID=set-your-client-id
GCP_CLIENT_SECRET=set-your-client-secret

NEXTAUTH_SECRET=set-your-secret
```
