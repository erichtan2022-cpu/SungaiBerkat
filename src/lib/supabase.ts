import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  category: 'anak' | 'ibu';
  target_amount: number;
  current_amount: number;
  image_url: string;
  status: 'active' | 'completed' | 'upcoming';
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: 'recipient' | 'donor';
  content: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type Volunteer = {
  name: string;
  email: string;
  interest: 'anak' | 'ibu' | 'both';
  location: string;
  availability: string;
};

export type Contact = {
  name: string;
  email: string;
  message: string;
};

export type Donation = {
  project_id?: string;
  donor_name?: string;
  amount: number;
  purpose: 'anak' | 'ibu' | 'general';
  payment_method: 'qris' | 'bank' | 'ewallet';
};