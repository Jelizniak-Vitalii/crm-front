export type User = {
  id: number;
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  city?: string;
  address?: string | null;
  role_id: number;
};
