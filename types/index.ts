export type ProductType = 'file' | 'event' | 'service' | 'course';

export interface IProduct {
  _id?: string;
  creatorId: string;
  title: string;
  description: string;
  type: ProductType;
  price: number;
  fileUrl?: string;     // For e-books/designs
  eventDate?: Date;     // For training/events
  stripeProductId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'creator' | 'customer';
  stripeAccountId?: string;
  storeName?: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
}