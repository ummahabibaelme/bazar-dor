# বাজার দর | BazarDor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সম্ভাব্য বাজারদর, দৈনিক দাম পরিবর্তন এবং বিভিন্ন বাজারের দামের তুলনা দেখার জন্য responsive web app।

## Technologies
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Better Auth (email/password, Google and GitHub OAuth)
- PostgreSQL + Drizzle ORM
- React Hot Toast
- Lucide icons
- BazarDor API

## Features
1. Responsive Bengali navbar, category navigation and animated price ticker.
2. Hero banner with a same-page jump to all products.
3. Top six price risers and top six fallers, plus a full product grid.
4. Category pages with loading skeletons and numeric ascending/descending price sorting.
5. Login-protected product details with minimum, maximum, average prices and market-by-market ranges.
6. Email/password signup and sign-in, optional Google/GitHub OAuth, toast feedback and sign-out.
7. Profile page and update-name form.
8. Friendly 404 and invalid-category/product states.

## Run locally (Windows)
1. Install Node.js LTS from https://nodejs.org/ and Git from https://git-scm.com/downloads if you do not already have them.
2. Extract this ZIP file.
3. Open the extracted `bazardor-project` folder in VS Code. Make sure `package.json` is visible directly inside the folder.
4. In VS Code, choose **Terminal → New Terminal**.
5. Run `npm install` and wait until it finishes.
6. Copy `.env.example` and rename the copy to `.env.local`.
7. Set `BETTER_AUTH_SECRET` to a random string of at least 32 characters and keep `BETTER_AUTH_URL=http://localhost:3000`.
8. Set up a PostgreSQL database and put its connection string in `DATABASE_URL`. Run the SQL schema below once.
9. Run `npm run dev`, then open http://localhost:3000 in your browser.

## Database setup
Create a PostgreSQL database (for example, with Neon or Supabase), then run the following SQL in its SQL editor. These tables match the Better Auth schema used in this project.

```sql
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY, "name" text NOT NULL, "email" text NOT NULL UNIQUE,
  "email_verified" boolean NOT NULL DEFAULT false, "image" text,
  "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY, "expires_at" timestamp NOT NULL, "token" text NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now(),
  "ip_address" text, "user_agent" text, "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY, "account_id" text NOT NULL, "provider_id" text NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "access_token" text, "refresh_token" text, "id_token" text, "access_token_expires_at" timestamp,
  "refresh_token_expires_at" timestamp, "scope" text, "password" text,
  "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY, "identifier" text NOT NULL, "value" text NOT NULL,
  "expires_at" timestamp NOT NULL, "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now()
);
```

## OAuth setup (optional)
- Google: create an OAuth web application in Google Cloud Console. Set the authorized redirect URI to `http://localhost:3000/api/auth/callback/google` for local development and `https://YOUR-DOMAIN/api/auth/callback/google` for production.
- GitHub: create an OAuth app. Set the callback URL to `http://localhost:3000/api/auth/callback/github` locally and your production domain callback URL in deployment.
- Add the client ID and secret to `.env.local` or your hosting provider's environment variables. Restart the dev server after editing environment variables.
- If OAuth keys are blank, the Google/GitHub buttons show an error toast rather than completing authentication.

## Deploy to Vercel
1. Push the project to a GitHub repository.
2. Import that repository at https://vercel.com/.
3. Add `NEXT_PUBLIC_API_BASE_URL`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and OAuth variables (if configured) in Project Settings → Environment Variables.
4. Set `BETTER_AUTH_URL` to your deployed origin, such as `https://your-project.vercel.app`.
5. Redeploy after setting variables. Test `/`, `/category/chal`, `/signin`, `/signup`, and `/product/sorno-machi-chal` after deployment.

## API
Default API: `https://api.api-store.workers.dev/api/bazardor`. If it is unavailable, change `NEXT_PUBLIC_API_BASE_URL` to `https://api.abcz.workers.dev/api/bazardor`.

## Notes
- Product details are protected behind sign-in as required by the assignment.
- Prices are the provided API's sample estimates and may not match real market prices.
- Make at least eight meaningful commits while developing, for example: `chore: scaffold Next.js app`, `feat: add responsive navbar`, `feat: connect products API`, `feat: build home sections`, `feat: add category sorting`, `feat: add protected product details`, `feat: implement Better Auth`, `feat: add profile update`, `docs: write README`.
