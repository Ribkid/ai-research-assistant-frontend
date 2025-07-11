# AI Research Assistant Frontend

A modern Next.js frontend for the AI Research Assistant platform featuring advanced Magic UI components, user authentication, and real-time report generation.

## Features

- **🎨 Modern UI**: Beautiful interface with Magic UI components including:
  - Animated sparkles text
  - Blur fade animations
  - Scroll progress indicators
  - Rainbow buttons and shimmer effects
  - Dynamic word rotation

- **🔐 Authentication**: Secure user authentication with NextAuth.js and Supabase PostgreSQL

- **📊 Real-time Reports**: Live progress tracking for AI-generated research reports

- **📱 Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15.3.5 with TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js with Supabase PostgreSQL
- **Database**: PostgreSQL (Supabase)
- **Animation**: Framer Motion (motion)
- **UI Components**: Magic UI (custom components)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXTAUTH_SECRET=your-super-secret-key-for-nextauth
NEXTAUTH_URL=http://192.168.4.5:3001
NEXT_PUBLIC_API_URL=http://192.168.4.5:8000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=your-postgresql-connection-string
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

The application will be available at `http://192.168.4.5:3001`

## API Integration

The frontend connects to the AI Research Assistant API server running on port 8000. Make sure the backend API server is running before using the application.

### API Endpoints Used:
- `POST /api/research/generate` - Generate new research reports
- `GET /api/research/status/{report_id}` - Get report generation status
- `GET /api/research/reports` - List all reports
- `GET /health` - API health check

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   └── ui/                # Magic UI components
└── lib/                   # Utility libraries
    ├── api.ts             # API client
    ├── db.ts              # Database connection
    ├── supabase.ts        # Supabase client
    └── utils.ts           # Utility functions
```

## Magic UI Components

This project includes several custom Magic UI components:

- **BlurFade**: Smooth blur and fade animations
- **ScrollProgress**: Page scroll progress indicator
- **WordRotate**: Rotating text animation
- **RainbowButton**: Gradient rainbow button effects
- **SparklesText**: Animated sparkles text effect
- **ShimmerButton**: Shimmering button animations
- **GridPattern**: Animated background patterns

## Database Schema

The application uses PostgreSQL with the following user table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

- **Development**: `npm run dev` (port 3001)
- **Production Build**: `npm run build`
- **Production Start**: `npm start`
- **Linting**: `npm run lint`

## Environment

- **Frontend**: http://192.168.4.5:3001
- **Backend API**: http://192.168.4.5:8000
- **Database**: PostgreSQL (Supabase)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of the AI Research Assistant platform.