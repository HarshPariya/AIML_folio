# AIML Portfolio - Harsh Pariya

A premium, modern portfolio website built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcasing AI/ML expertise, projects, technical writing, and research in an interactive, performance-optimized experience.

**🌐 Live Portfolio:** https://aiml-folio-alpha.vercel.app/

---

## ✨ Features

### 🎯 Core Sections
- **Hero** - Eye-catching introduction with rotating tech stack showcase
- **About** - Professional narrative with journey timeline and key metrics
- **Skills** - Interactive tech stack visualization with proficiency indicators
- **Projects** - Detailed case studies of 6+ AI/ML projects with live demos and GitHub links
- **Experience** - Professional timeline highlighting relevant roles and achievements
- **Research** - Published/ongoing research initiatives in AI/ML
- **Blog** - Technical writing platform (3+ articles on RAG, Transfer Learning, MLOps)
- **Model Showcase** - Interactive demonstrations of trained models
- **Testimonials** - Social proof from colleagues and mentors
- **Open Source** - GitHub contribution highlights and public projects
- **Contact** - Email contact form with validation

### 🚀 Performance & UX
- **Server-Side Rendering (SSR)** for optimal SEO and initial load performance
- **Static Generation (SSG)** for blog posts and projects with `generateStaticParams`
- **Smooth Scrolling** with Lenis for elegant viewport navigation
- **Ambient Background** with GPU-accelerated Three.js visuals
- **Particle Effects** and neural network animations powered by Three.js
- **Framer Motion** animations for delightful micro-interactions
- **Custom Cursor** with magnetic effects
- **Dark Mode** support with next-themes
- **Analytics** - Vercel Analytics and Speed Insights integration
- **Mobile Responsive** - Tailwind CSS responsive design system

### 📊 Technical Excellence
- **Type Safety** - Full TypeScript support across codebase
- **Zero-Config Content** - Content stored in structured TypeScript (`lib/data.ts`, `lib/blog.ts`)
- **MDX-Ready Architecture** - Blog content structure supports easy migration to MDX
- **SEO Optimized** - Metadata generation, Open Graph tags, JSON-LD structured data
- **Security Headers** - Content Security Policy, X-Frame-Options, Permissions-Policy
- **Code Quality** - ESLint configuration, strict type checking

---

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 15.3.1** - React framework with SSR/SSG, API routes, optimized images
- **React 19.1.0** - UI library with concurrent rendering
- **TypeScript 5.7.3** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4.0.6** - Utility-first CSS framework
- **Tailwind Merge 2.6.0** - Smart Tailwind class merging
- **Class Variance Authority 0.7.1** - Type-safe component variant management
- **CLSX 2.1.1** - Conditional className utility

### Animations & Interactivity
- **Framer Motion 12.4.7** - Production-ready motion library
- **Three.js 0.171.0** - 3D graphics library
- **@react-three/fiber 9.1.2** - React renderer for Three.js
- **Lenis 1.1.20** - Smooth scroll library
- **Lucide React 0.469.0** - Beautiful icon library

### Utilities & Monitoring
- **Next Themes 0.4.4** - Dark mode support
- **@Vercel/Analytics 1.4.1** - Web analytics
- **@Vercel/Speed-Insights 1.1.0** - Performance monitoring

### Development Tools
- **ESLint 9.20.1** - Code quality and consistency
- **Tailwind CSS PostCSS 4.0.6** - PostCSS plugin for Tailwind
- **@types packages** - TypeScript definitions

---

## 📂 Project Structure

```
d:\AIML_Portfolio/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout with global styles
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global Tailwind CSS
│   ├── robots.ts                     # SEO robots.txt
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   ├── not-found.tsx                 # 404 page
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              # Contact form API endpoint
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx              # Individual blog post (SSG)
│   ├── og/
│   │   └── route.tsx                 # OG image generation
│   ├── projects/
│   │   ├── page.tsx                  # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx              # Individual project page (SSG)
│
├── components/                       # React components
│   ├── layout/
│   │   ├── navbar.tsx                # Navigation header
│   │   └── footer.tsx                # Footer
│   ├── sections/
│   │   ├── hero.tsx                  # Hero section
│   │   ├── about.tsx                 # About section with timeline
│   │   ├── skills.tsx                # Skills visualization
│   │   ├── projects.tsx              # Projects showcase
│   │   ├── experience.tsx            # Experience timeline
│   │   ├── research.tsx              # Research section
│   │   ├── blog-preview.tsx          # Blog preview
│   │   ├── certifications.tsx        # Certifications
│   │   ├── contact.tsx               # Contact form
│   │   ├── model-showcase.tsx        # AI model demos
│   │   ├── playground.tsx            # Interactive playground
│   │   ├── tech-graph.tsx            # Technology network graph
│   │   ├── opensource.tsx            # Open source contributions
│   │   └── testimonials.tsx          # Testimonials section
│   ├── blog/
│   │   ├── blog-card.tsx             # Blog post card component
│   │   └── blog-list.tsx             # Blog listing with search/filter
│   ├── projects/
│   │   ├── project-card.tsx          # Project card component
│   │   └── project-poster.tsx        # Project poster/hero
│   ├── ui/
│   │   ├── backgrounds.tsx           # Ambient background effects
│   │   ├── badge.tsx                 # Badge/tag component
│   │   ├── button.tsx                # Button component
│   │   ├── counter.tsx               # Animated counter
│   │   ├── custom-cursor.tsx         # Custom cursor
│   │   ├── logo.tsx                  # Logo component
│   │   ├── magnetic.tsx              # Magnetic interaction effect
│   │   ├── reveal.tsx                # Reveal animation
│   │   ├── scroll-progress.tsx       # Scroll progress bar
│   │   ├── section-heading.tsx       # Section heading
│   │   └── spotlight-card.tsx        # Spotlight card effect
│   ├── visuals/
│   │   ├── neural-network.tsx        # Neural network visualization
│   │   └── particle-globe.tsx        # Animated particle globe
│   └── providers/
│       └── smooth-scroll.tsx         # Smooth scroll provider
│
├── lib/                              # Utility functions & data
│   ├── data.ts                       # Content data (hero, skills, projects, etc.)
│   ├── blog.ts                       # Blog posts & content management
│   ├── site.ts                       # Site configuration (SEO, links, metadata)
│   ├── seo.ts                        # Metadata generation utilities
│   └── utils.ts                      # Helper functions
│
├── public/                           # Static assets
│   ├── images/                       # Project & blog images
│   ├── icons/                        # SVG icons
│   └── Harsh-Pariya-Resume.pdf       # Resume file
│
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Dependencies & scripts
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (recommend 20 LTS)
- **npm** 9+ or **yarn** 4+

### Installation

```bash
# Clone the repository
git clone https://github.com/HarshPariya/AIML_folio.git
cd AIML_folio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## ✏️ Customization

### 1. **Update Site Configuration**
Edit `lib/site.ts` to customize:
- Name, role, tagline, and description
- Contact email and phone
- Social media links (GitHub, LinkedIn, Twitter, Kaggle, HuggingFace)
- Resume URL
- Location and availability

```typescript
export const siteConfig = {
  name: "Your Name",
  role: "Your Role",
  email: "your.email@example.com",
  links: {
    github: "https://github.com/yourusername",
    // ... other links
  },
  // ... rest of config
};
```

### 2. **Customize Content**
Edit `lib/data.ts` to update:
- Hero rotating words
- Hero statistics
- About paragraphs
- Journey timeline
- Skills with proficiency levels
- Projects with demo links and technologies

### 3. **Add Blog Posts**
Edit `lib/blog.ts` to add new posts:

```typescript
export const posts: BlogPost[] = [
  {
    slug: "your-post-slug",
    title: "Your Post Title",
    excerpt: "Brief excerpt...",
    date: "2025-01-15", // ISO format
    tags: ["Tag1", "Tag2"],
    cover: "/blog/cover.svg",
    content: [
      { type: "p", text: "Paragraph text..." },
      { type: "h2", text: "Heading" },
      { type: "code", lang: "python", text: "code here" },
      // ... more blocks
    ],
  },
];
```

### 4. **Modify Styling**
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes with `clsx` and `class-variance-authority`

### 5. **Update Images & Assets**
Place images in `public/`:
- Profile picture: `public/harsh-pariya.jpg`
- Project images: `public/projects/`
- Blog covers: `public/blog/`
- Icons: `public/icons/`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel will auto-deploy from GitHub
# Or manually deploy:
npm i -g vercel
vercel
```

### Environment Variables

Create a `.env.local` file (if needed for API integrations):

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
# Add other env vars as needed
```

### Build & Hosting

The production build is fully static where possible:
- **Static (○)**: Pre-rendered at build time (fastest)
- **SSG (●)**: Generated on-demand with fallback (blog, projects)
- **Dynamic (ƒ)**: Server-rendered on request (API routes, contact form)

---

## 📝 Content Management

### Blog System
- Blog posts are stored as TypeScript objects in `lib/blog.ts`
- Content is structured with blocks (paragraphs, headings, code, quotes, lists)
- Architecture is **MDX-ready**: easily migrate to Next.js MDX or similar
- Each post auto-generates a static page with metadata and SEO

### Projects
- Projects are stored in `lib/data.ts` under `projects` array
- Each project has title, description, technologies, image, demo link, and GitHub link
- Dynamic routes create individual project pages using `generateStaticParams`

### Dynamic Routes
- Blog: `/blog/[slug]` → generates static pages from `posts` array
- Projects: `/projects/[slug]` → generates static pages from `projects` data

---

## 🔒 Security

The site includes security headers configured in `next.config.ts`:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: SAMEORIGIN prevents clickjacking
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Disables camera, microphone, geolocation

Image remote patterns allow images from:
- Unsplash
- GitHub (user avatars, contribution stats)
- GitHub README stats APIs
- Contribution charts

---

## 📊 Performance Optimizations

- **Image Optimization**: AVIF and WebP formats with Next.js Image component
- **Code Splitting**: Automatic by Next.js, components load on demand
- **CSS-in-JS**: Tailwind generates minimal CSS
- **Compression**: gzip enabled in Next.js config
- **Caching**: Static pages cached indefinitely, SSG pages revalidated on demand
- **Analytics**: Vercel Web Analytics and Speed Insights for monitoring

---

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and adapt for your own use!

---

## 📜 License

This project is provided as-is for personal portfolio use. Feel free to adapt and customize for your own portfolio.

---

## 👤 Author

**Harsh Pariya**
- **Email**: harshpariya195@gmail.com
- **Phone**: +91 96019 86209
- **Location**: Ahmedabad, Gujarat, India
- **GitHub**: https://github.com/HarshPariya
- **LinkedIn**: https://linkedin.com/in/harsh-pariya

---

## 🔗 Links

- **Live Portfolio**: https://aiml-folio-alpha.vercel.app/
- **GitHub Repository**: https://github.com/HarshPariya/AIML_folio
- **Resume**: [Download PDF](/Harsh-Pariya-Resume.pdf)

---

## 📚 Learning Resources

This portfolio demonstrates:
- Modern Next.js 15 with App Router and SSR/SSG
- React 19 with concurrent rendering
- TypeScript for type safety
- Tailwind CSS for responsive design
- Three.js for 3D graphics
- Framer Motion for smooth animations
- SEO best practices (metadata, JSON-LD, sitemaps)
- Performance optimization techniques
- Accessible component design

---

## ❓ FAQ

**Q: Can I use this template for my portfolio?**  
A: Yes! Feel free to fork the repository and adapt it for your own portfolio. Update the content in `lib/data.ts`, `lib/site.ts`, and `lib/blog.ts`.

**Q: How do I add more projects?**  
A: Edit `lib/data.ts` and add new objects to the `projects` array. Each project will automatically get a dynamic route and page.

**Q: How do I write new blog posts?**  
A: Add new posts to the `posts` array in `lib/blog.ts`. Use the `BlogBlock` interface to structure content.

**Q: How do I change the theme/colors?**  
A: Edit `tailwind.config.ts` to customize the color palette, then use the new classes in your components.

**Q: Is this SEO optimized?**  
A: Yes! The site includes metadata generation, Open Graph tags, JSON-LD structured data, dynamic sitemaps, and robots.txt.

---

**Built with ❤️ using Next.js, React, and TypeScript**
