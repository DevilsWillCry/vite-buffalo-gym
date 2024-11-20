export interface User {
  uid: string;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  isAdmin: boolean;
  Age: number | null;
  Gender: string | null;
  Height: number | null;
  Weight: number | null;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
