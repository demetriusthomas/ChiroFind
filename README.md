# ChiroFind

A modern chiropractor finder and booking marketplace. Discover and book appointments with top-rated chiropractors in your area.

## Features

- **Search & Discovery**: Find chiropractors by location, specialty, and availability
- **Symptom Matcher**: Interactive tool to find providers who specialize in your specific conditions
- **Provider Profiles**: Detailed profiles with credentials, reviews, and booking availability
- **SEO Directory**: State and city pages for local search optimization
- **Online Booking**: Schedule appointments directly through the platform

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Fonts**: Playfair Display (headings), DM Sans (body)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/demetriusthomas/ChiroFind.git
cd chirofind
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── chiropractor/[id]/ # Provider profile page
│   ├── chiropractors/     # SEO directory pages
│   └── search/            # Search results page
├── components/
│   ├── home/              # Homepage components
│   ├── layout/            # Navbar, Footer
│   ├── search/            # Search and filter components
│   └── ui/                # Shadcn/ui components
├── lib/                   # Utilities and helpers
└── generated/             # Prisma client (auto-generated)
```

## Design System

- **Primary Color**: Gold (#C8A45C)
- **Secondary Color**: Navy (#1A1A2E)
- **Background**: Cream (#FAFAF7)
- **Heading Font**: Playfair Display
- **Body Font**: DM Sans

## Development Phases

- **Phase 1** (Current): Core UI, search, provider profiles, SEO pages
- **Phase 2**: Authentication, real database, provider dashboard
- **Phase 3**: Booking system, payments, notifications
- **Phase 4**: Reviews, analytics, mobile optimization

## License

MIT
