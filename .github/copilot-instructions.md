# Smart Medication Adherence System - Copilot Instructions

## Project Overview
This is a modern Next.js healthcare dashboard for IoT-based elderly medication adherence monitoring system using ESP32, sensors, and Blynk cloud platform.

## Technology Stack
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Components**: Lucide React for icons, Framer Motion for animations
- **State Management**: Zustand

## Project Structure
- `/app` - Next.js App Router pages
- `/components` - Reusable React components
- `/data` - Mock data for development
- `/utils` - Helper functions and utilities
- `/types` - TypeScript type definitions
- `/styles` - Global CSS and theming

## Key Features to Maintain
1. Dark mode support throughout the application
2. Responsive design for all screen sizes
3. Real-time data visualization with Recharts
4. Smooth animations with Framer Motion
5. Accessible UI components
6. Proper TypeScript typing

## Development Guidelines
- Use TypeScript for all new components
- Follow the component structure in `/components`
- Add new pages in `/app` following Next.js conventions
- Maintain the color scheme: Primary (Sky Blue), Success (Green), Warning (Amber), Danger (Red)
- Keep components focused and reusable
- Document complex functions with comments

## Common Tasks
- **Adding new dashboard page**: Create folder in `/app/dashboard/` with `page.tsx`
- **Creating new component**: Add to `/components` with appropriate folder
- **Adding utilities**: Update `/utils/helpers.ts`
- **Type definitions**: Update `/types/index.ts`
- **Mock data**: Update `/data/mockData.ts`

## For Blynk Integration
1. Replace mock data calls with actual Blynk API endpoints
2. Create `/utils/api.ts` for API integration
3. Update environment variables in `.env.local`
4. Replace hardcoded timestamps with real data from sensors

## Notes
- This is a LKTI project (Lomba Karya Tulis Ilmiah)
- Focus on healthcare IoT for elderly care
- All components are dark mode compatible
- Mobile-first responsive design
