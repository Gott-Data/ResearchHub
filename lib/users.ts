import { User } from '@/types/auth';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const usersDirectory = path.join(process.cwd(), 'data', 'users');

export function ensureUsersDirectory() {
  if (!fs.existsSync(usersDirectory)) {
    fs.mkdirSync(usersDirectory, { recursive: true });
  }
}

export function getAllUsers(): User[] {
  ensureUsersDirectory();

  const files = fs.readdirSync(usersDirectory);
  const users = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(usersDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as User;
    });

  return users;
}

export function getUserByEmail(email: string): User | null {
  const users = getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getUserById(id: string): User | null {
  ensureUsersDirectory();

  const filePath = path.join(usersDirectory, `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content) as User;
}

export function createUser(email: string, name: string, password: string, role: 'admin' | 'author' = 'author'): User {
  ensureUsersDirectory();

  // Check if user already exists
  if (getUserByEmail(email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    email: email.toLowerCase(),
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    role,
  };

  const filePath = path.join(usersDirectory, `${user.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2), 'utf8');

  return user;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

export function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'password'>>): User | null {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  const updatedUser = { ...user, ...updates };
  const filePath = path.join(usersDirectory, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedUser, null, 2), 'utf8');

  return updatedUser;
}
