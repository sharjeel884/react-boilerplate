# React Boilerplate with Micro Management

A modern React boilerplate with micro-management architecture, authentication, and CRUD operations.

## Features

- ✅ **Micro Management Architecture** - Modular structure with separate modules
- ✅ **Authentication Module** - Login, Register with mock data
- ✅ **Users CRUD Module** - Full CRUD operations with React Table
- ✅ **State Management** - Zustand for global state
- ✅ **Data Fetching** - React Query (TanStack Query)
- ✅ **HTTP Client** - Axios with custom instance
- ✅ **Routing** - React Router with protected/public routes
- ✅ **UI Components** - Tailwind CSS with custom design system
- ✅ **Icons** - React Icons
- ✅ **Table** - TanStack React Table (lightweight)

## Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **React Query** - Data Fetching
- **Axios** - HTTP Client
- **React Router** - Routing
- **React Icons** - Icons
- **TanStack React Table** - Table Component

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── axiosInstance.ts
│   └── queryClient.ts
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── users/          # Users CRUD module
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── shared/             # Shared components
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Sidebar.tsx
│       └── Layout.tsx
├── components/         # UI components
│   └── ui/
│       └── Typography.tsx
├── pages/              # Page components
│   ├── DashboardPage.tsx
│   └── SettingsPage.tsx
└── routes/             # Route components
    ├── AppRoutes.tsx
    ├── ProtectedRoute.tsx
    └── PublicRoute.tsx
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Authentication

### Demo Credentials

- **Admin User:**
  - Email: `admin@example.com`
  - Password: `admin123`

- **Regular User:**
  - Email: `user@example.com`
  - Password: `user123`

### Features

- Login/Register with mock data
- Protected routes
- Public routes (redirect if authenticated)
- Persistent authentication state
- Automatic token management

## Users CRUD

### Features

- List users with pagination
- Search users
- Create new users
- Update existing users
- Delete users
- Role-based display (admin/user)
- Status management (active/inactive)

## Color System

The project uses a comprehensive color system with Tailwind:

- **Primary Colors** - Blue shades (primary-50 to primary-950)
- **Secondary Colors** - Purple shades (secondary-50 to secondary-950)
- **Success Colors** - Green shades (success-50 to success-950)
- **Warning Colors** - Yellow shades (warning-50 to warning-950)
- **Error Colors** - Red shades (error-50 to error-950)
- **Gray Colors** - Gray shades (gray-50 to gray-950)

## Typography

Custom typography components available:

- `H1`, `H2`, `H3`, `H4`, `H5`, `H6` - Headings
- `P` - Paragraph
- `Text` - Text span
- `Small` - Small text

## Micron Components

Pre-built utility classes:

- `.btn` - Button base
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.btn-ghost` - Ghost button
- `.btn-danger` - Danger button
- `.input` - Input field
- `.card` - Card container
- `.badge` - Badge component
- `.badge-primary`, `.badge-secondary`, etc. - Badge variants

## Routes

### Public Routes
- `/login` - Login page
- `/register` - Register page

### Protected Routes
- `/dashboard` - Dashboard (requires authentication)
- `/users` - Users management (requires authentication)
- `/settings` - Settings page (requires authentication)

## State Management

### Auth Store (Zustand)

```typescript
import { useAuthStore } from '@/modules/auth/store/authStore';

const { user, token, isAuthenticated, login, logout } = useAuthStore();
```

### React Query Hooks

#### Authentication
- `useLogin()` - Login mutation
- `useRegister()` - Register mutation
- `useLogout()` - Logout mutation
- `useCurrentUser()` - Get current user query

#### Users
- `useUsers(params)` - Get users list
- `useUser(id)` - Get single user
- `useCreateUser()` - Create user mutation
- `useUpdateUser()` - Update user mutation
- `useDeleteUser()` - Delete user mutation

## API Configuration

The axios instance is configured in `src/config/axiosInstance.ts`:

- Base URL from environment variable `VITE_API_BASE_URL`
- Automatic token injection from localStorage
- Request/Response interceptors
- Automatic redirect on 401 errors

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## License

MIT
