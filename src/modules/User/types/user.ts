export type User = {
  id: number;
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
  password: string;
  phone: string;
  active: boolean;
  onlineBooking: boolean;
  position: string;
  role_id: number;
  updatedAt?: string;
  createdAt?: string;
};
