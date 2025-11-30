import type { User, CreateUserData, UpdateUserData, UsersResponse } from '../types/user.types';

// Mock users database
let mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-01-03').toISOString(),
  },
];

export const userService = {
  getUsers: async (params?: { page?: number; limit?: number; search?: string }): Promise<UsersResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredUsers = [...mockUsers];

    // Search filter
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
    }

    const total = filteredUsers.length;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedUsers = filteredUsers.slice(start, end);

    // Remove password from response
    const users = paginatedUsers.map(({ password, ...user }) => user);

    return {
      users,
      total,
      page,
      limit,
    };
  },

  getUserById: async (id: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  createUser: async (data: CreateUserData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userIndex = mockUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Check email uniqueness if email is being updated
    if (data.email && data.email !== mockUsers[userIndex].email) {
      const existingUser = mockUsers.find((u) => u.email === data.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const { password, ...userWithoutPassword } = mockUsers[userIndex];
    return userWithoutPassword;
  },

  deleteUser: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const userIndex = mockUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(userIndex, 1);
  },
};

