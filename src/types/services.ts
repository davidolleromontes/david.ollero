export interface IContact {
  id?: string
  name: string;
  avatar: string;
  phone: string;
  cell?: string;
  email?: string;
  favorite?: boolean;
}

export interface IEmployee {
  id: string
  name?: string;
  avatar: string;
  phone?: string;
  cell?: string;
  email?: string;
  favorite?: boolean;
}