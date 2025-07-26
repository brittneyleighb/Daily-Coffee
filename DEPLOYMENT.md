# Daily-Coffee Deployment Guide

## Vercel Deployment

### Prerequisites
1. A Supabase project set up with authentication enabled
2. Supabase functions deployed (if using AI features)
3. Environment variables configured

### Step 1: Environment Variables
In your Vercel dashboard, add the following environment variables:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_FUNCTION_URL=https://your-project-id.supabase.co/functions/v1
```

### Step 2: Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Import the project
3. Add environment variables in the dashboard
4. Deploy

### Step 3: Configure Supabase (if needed)
1. Set up authentication providers
2. Configure RLS policies for user data
3. Deploy edge functions for AI recipe generation

## Build Configuration

The project uses:
- **Vite** for building and bundling
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components via shadcn/ui
- **Supabase** for backend services

## Fixed Issues
- ✅ Import path corrections for components
- ✅ File naming consistency (case-sensitive)
- ✅ Radix UI dependency installation
- ✅ Version-pinned import removal
- ✅ TypeScript configuration
- ✅ Vercel SPA routing configuration

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```