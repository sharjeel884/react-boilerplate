# Quick Start Guide

## Installation

```bash
npm install
```

## Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Demo Credentials

### Admin User
- **Email:** admin@example.com
- **Password:** admin123

### Regular User
- **Email:** user@example.com
- **Password:** user123

## Features Overview

### Authentication
- Navigate to `/login` to sign in
- Navigate to `/register` to create a new account
- Authentication state persists across page refreshes
- Protected routes automatically redirect to login if not authenticated

### Users Management
- Navigate to `/users` to view the users list
- Click "Add User" to create a new user
- Click the edit icon to update a user
- Click the delete icon to remove a user
- Use the search bar to filter users

### Dashboard
- Navigate to `/dashboard` to see the main dashboard
- View statistics and overview information

## Project Structure

```
src/
├── config/           # Axios & React Query configuration
├── modules/          # Feature modules (auth, users)
├── shared/           # Shared components (Header, Footer, Sidebar)
├── components/       # UI components (Typography)
├── pages/           # Page components
└── routes/          # Route configuration
```

## Key Technologies

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 3** - Styling
- **Zustand** - State Management
- **React Query** - Data Fetching
- **Axios** - HTTP Client
- **React Router** - Routing
- **TanStack React Table** - Table Component

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. Replace mock data with real API endpoints
2. Add more modules as needed
3. Customize the design system colors
4. Add more shared components
5. Implement additional features

