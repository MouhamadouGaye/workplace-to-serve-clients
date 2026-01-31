import { Request, Response } from 'express';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  assigned_to?: number;
  assigned_to_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  customer_id: number;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  is_primary: boolean;
  created_at: string;
}

export interface Interaction {
  id: number;
  customer_id: number;
  user_id: number;
  type: string;
  notes?: string;
  created_at: string;
  customer_name?: string;
  user_name?: string;
}

export interface Deal {
  id: number;
  customer_id: number;
  user_id: number;
  title: string;
  amount: number;
  status: string;
  stage: string;
  expected_close_date?: string;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  user_name?: string;
}

// Request types
export interface TypedRequest<T = unknown> extends Request {
  body: T;
}

// Custom parameter interfaces
export interface UserRequestBody {
  email: string;
  name: string;
  role: string;
}

export interface CustomerRequestBody {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  assigned_to?: number;
}

export interface ContactRequestBody {
  customer_id: number;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  is_primary: boolean;
}

export interface InteractionRequestBody {
  customer_id: number;
  user_id: number;
  type: string;
  notes?: string;
}

export interface DealRequestBody {
  customer_id: number;
  user_id: number;
  title: string;
  amount: number;
  status: string;
  stage: string;
  expected_close_date?: string;
}