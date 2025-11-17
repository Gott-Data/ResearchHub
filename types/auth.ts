export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // hashed
  createdAt: string;
  role: 'admin' | 'author';
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'author';
}
