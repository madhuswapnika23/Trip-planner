export type UserRole = 'user' | 'admin';

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string;
  joinedAt: string;
  tripsCount: number;
  savedTrips: number;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-1',
    email: 'user@roamly.ai',
    password: 'password',
    name: 'Alex Rivera',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    joinedAt: '2024-01-15',
    tripsCount: 7,
    savedTrips: 12,
  },
  {
    id: 'admin-1',
    email: 'admin@roamly.ai',
    password: 'password',
    name: 'Jordan Park',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    joinedAt: '2023-06-01',
    tripsCount: 23,
    savedTrips: 45,
  },
];

const CUSTOM_USERS_KEY = 'roamly_registered_users';

export function getCustomUsers(): MockUser[] {
  try {
    const saved = localStorage.getItem(CUSTOM_USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveCustomUser(newUser: MockUser): void {
  const users = getCustomUsers();
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }
  try {
    localStorage.setItem(CUSTOM_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save custom user:', e);
  }
}

export function findUser(email: string, password: string): MockUser | null {
  const customUsers = getCustomUsers();
  const customFound = customUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (customFound) return customFound;

  const mockFound = MOCK_USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (mockFound) return mockFound;

  // Fallback: If user enters any email and password, generate/allow login with that custom name/email
  if (email.includes('@')) {
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const dynamicUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      name: formattedName,
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formattedName)}`,
      joinedAt: new Date().toISOString().split('T')[0],
      tripsCount: 0,
      savedTrips: 0,
    };
    saveCustomUser(dynamicUser);
    return dynamicUser;
  }

  return null;
}
