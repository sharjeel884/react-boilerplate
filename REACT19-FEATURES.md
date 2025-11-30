# React 19 Features & Modern Patterns

## Overview

This project has been updated to use React 19.2 features and modern patterns, removing unnecessary `useEffect` hooks where possible.

## React 19 Features Used

### 1. useSyncExternalStore for Network Status

Instead of using `useEffect` with event listeners, we use React 19's `useSyncExternalStore` hook for network status detection:

```tsx
// src/hooks/use-network-status.ts
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export function useNetworkStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { isOnline, isOffline: !isOnline };
}
```

**Benefits:**
- No `useEffect` needed
- Automatic subscription management
- SSR-safe with `getServerSnapshot`
- More efficient than manual event listeners

### 2. Key Prop for State Reset (Replacing useEffect)

Instead of using `useEffect` to reset form state when props change, we use the `key` prop pattern:

```tsx
// Before (with useEffect)
useEffect(() => {
  if (user) {
    setName(user.name);
    setEmail(user.email);
    // ... reset all fields
  }
}, [user, isOpen]);

// After (React 19 pattern)
const formKey = user?.id || "new";

<Modal key={formKey} {...props}>
  {/* Form with state initialized from props */}
</Modal>
```

**Benefits:**
- Component remounts with fresh state when key changes
- No need for effect cleanup
- More predictable behavior
- Better performance (React can optimize remounts)

### 3. Direct State Initialization

When using the key prop pattern, state can be initialized directly from props:

```tsx
const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");
```

Since the component remounts when the key changes, the state will always be in sync with props.

## Components Created

### 1. Modal Component (`src/components/ui/modal.tsx`)

A reusable modal component with:
- Size variants (sm, md, lg, xl, full)
- Optional title and description
- Close button control
- Overlay click handling
- ModalFooter sub-component

**Usage:**
```tsx
import { Modal, ModalFooter } from "@/components/ui/modal";

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Edit User"
  size="md"
>
  <form>
    {/* Form content */}
    <ModalFooter>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button type="submit">Save</Button>
    </ModalFooter>
  </form>
</Modal>
```

### 2. Error Boundary (`src/components/error-boundary.tsx`)

A class-based error boundary component that:
- Catches React errors
- Shows user-friendly error UI
- Provides error details in a collapsible section
- Offers "Try Again" and "Go Home" actions
- Supports custom fallback UI

**Usage:**
```tsx
import { ErrorBoundary } from "@/components/error-boundary";

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 3. Network Status Component (`src/components/network-status.tsx`)

Monitors internet connectivity and shows toast notifications:
- Uses `useNetworkStatus` hook (React 19 pattern)
- Shows error toast when offline (persistent)
- Shows success toast when back online
- Lightweight toast notifications with Sonner

**Usage:**
Automatically included in the App component.

### 4. Network Status Hook (`src/hooks/use-network-status.ts`)

Custom hook using React 19's `useSyncExternalStore`:
- No `useEffect` needed
- Automatic subscription management
- SSR-safe
- Returns `{ isOnline, isOffline }`

## Toast Integration (Sonner)

Lightweight toast library integrated for notifications:

```tsx
import { toast } from "sonner";

// Success toast
toast.success("Operation successful");

// Error toast (persistent)
toast.error("Error occurred", {
  duration: Infinity,
});

// With action
toast.error("You are offline", {
  description: "Please check your connection",
  action: {
    label: "Dismiss",
    onClick: () => {},
  },
});
```

## Updated Components

### UserModal
- ✅ Removed `useEffect` for state reset
- ✅ Uses `key` prop pattern for state management
- ✅ Uses new Modal component
- ✅ Uses new UI components (Button, Input, Select, Label)

### App Component
- ✅ Wrapped with ErrorBoundary
- ✅ Includes NetworkStatus component
- ✅ Includes Toaster for notifications

## Best Practices

### When to Use Key Prop vs useEffect

**Use Key Prop When:**
- Resetting component state when props change
- Creating/editing forms with different data
- List items that need complete remount

**Use useEffect When:**
- Side effects (API calls, subscriptions)
- DOM manipulation
- Timer management
- Cleanup is required

### React 19 Patterns

1. **useSyncExternalStore** - For external data sources (network, storage, etc.)
2. **Key Prop** - For state reset when props change
3. **Direct Initialization** - Initialize state from props when using key prop
4. **Server Components** - For SSR (when applicable)

## Migration Checklist

- [x] Replace network status `useEffect` with `useSyncExternalStore`
- [x] Replace form reset `useEffect` with key prop pattern
- [x] Create reusable Modal component
- [x] Add Error Boundary
- [x] Add network status monitoring
- [x] Integrate toast notifications
- [x] Update all components to use new patterns

## Performance Benefits

1. **Fewer Re-renders** - Key prop pattern avoids unnecessary effect runs
2. **Better Optimization** - React can optimize remounts better than state updates
3. **SSR Safety** - `useSyncExternalStore` provides server snapshot
4. **Automatic Cleanup** - External store subscriptions are managed automatically

## Future React 19 Features to Consider

- `use()` hook for promises and context
- `useOptimistic` for optimistic updates
- `useActionState` for form actions
- Server Components (when using Next.js or similar)

