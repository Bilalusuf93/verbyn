# verbyn

Single-page marketing site for the Verbyn digital product studio, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion for React and Lucide.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npx tsc --noEmit
npm run lint
npm run build && npm start
```

## Configuration

Brand and content live in **`lib/site-config.ts`**: studio name, tagline, navigation, services, projects and process steps. Values that haven't been confirmed are left empty, and the UI hides them:

| Setting | Where | Effect when empty |
| --- | --- | --- |
| `siteConfig.email` | `lib/site-config.ts` | No email link is shown. "Let's Talk" scrolls to the form. |
| `siteConfig.socials` | `lib/site-config.ts` | Social links in the contact section and footer are hidden. |
| `NEXT_PUBLIC_SITE_URL` | env | No canonical URL, no sitemap entries, no sitemap line in robots.txt. |

To add a project, append it to `projects`. The Work section adapts on its own, and the "More projects coming soon" row disappears once there are two or more.

## Contact form (EmailJS)

The form uses the same EmailJS service and template as the intalk.ai site, but calls EmailJS **from the server** (`app/actions/contact.ts`). That way input is validated on the server and the keys never reach the browser.

1. Set these in `.env.local` (locally) and in Vercel → Settings → Environment Variables:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY` (the intalk.ai repo calls this `NEXT_PUBLIC_EMAILJS_USER_ID`)
   - `EMAILJS_PRIVATE_KEY`: optional, but recommended. Required if "Use Private Key" is turned on.
2. In EmailJS, go to **Account → Security** and enable **"Allow EmailJS API for non-browser applications"**. Without it, EmailJS rejects server calls with a 403.
3. The template receives `from_name`, `from_email`, `reply_to`, `message`, `from_phone` (empty) and `preferredMethod` (`"email"`). These match the intalk.ai template, so it works unchanged.

Behaviour: validation runs on the client and again on the server (zod). A honeypot field and a minimum fill time filter out bots. Success is shown only after EmailJS accepts the message. If the variables are missing, the form shows an error and does not pretend to succeed.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab and import it at vercel.com/new. Vercel detects Next.js, so no build settings are needed.
2. Add the environment variables above, plus `NEXT_PUBLIC_SITE_URL` once the domain is known.
3. Deploy, then attach the custom domain under Settings → Domains.

## Structure

```
app/            layout (fonts, metadata), page, robots, sitemap, OG image, icon, server action
components/
  layout/       Navbar (client), Footer
  sections/     Hero, Capabilities, Services, Projects, Process, FinalCta, Contact, ContactForm (client)
  ui/           Button, SectionHeading, ServiceCard, ProjectCard (client), Reveal (client), DrawLine, Wordmark
  motion/       MotionProvider (LazyMotion + reduced motion), shared variants
lib/            site-config, contact schema, utils
```

The motion system:

- The hero entrance is pure CSS, so the headline paints before hydration.
- Scroll reveals use Motion `whileInView` and fire once. A `<noscript>` rule keeps content visible without JavaScript.
- `MotionConfig reducedMotion="user"` together with `prefers-reduced-motion` CSS turns off ambient motion, parallax and spatial transitions.
