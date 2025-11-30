import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

// Mock users database
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
];

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const token = `mock-token-${user.id}-${Date.now()}`;

    return {
      token,
      user: userWithoutPassword,
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      email: data.email,
      name: data.name,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push({
      ...newUser,
      password: data.password,
    });

    const token = `mock-token-${newUser.id}-${Date.now()}`;

    return {
      token,
      user: newUser,
    };
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Extract user ID from token (mock implementation)
    const userId = token.split('-')[2];
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem('authToken');
  },
};

