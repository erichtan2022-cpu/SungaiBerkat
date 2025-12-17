/*
  # Sungai Berkat Indonesia Database Schema
  
  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project title
      - `description` (text) - Detailed description
      - `category` (text) - 'anak' or 'ibu'
      - `target_amount` (numeric) - Target donation amount
      - `current_amount` (numeric) - Current collected amount
      - `image_url` (text) - Project image URL
      - `status` (text) - 'active', 'completed', 'upcoming'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `volunteers`
      - `id` (uuid, primary key)
      - `name` (text) - Volunteer name
      - `email` (text) - Contact email
      - `interest` (text) - 'anak', 'ibu', or 'both'
      - `location` (text) - Volunteer location
      - `availability` (text) - Time availability
      - `status` (text) - 'pending', 'approved', 'active'
      - `created_at` (timestamptz)
    
    - `donations`
      - `id` (uuid, primary key)
      - `project_id` (uuid, nullable) - References projects
      - `donor_name` (text) - Donor name (optional)
      - `amount` (numeric) - Donation amount
      - `purpose` (text) - 'anak', 'ibu', 'general'
      - `payment_method` (text) - 'qris', 'bank', 'ewallet'
      - `status` (text) - 'pending', 'completed', 'failed'
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text) - Person name
      - `role` (text) - 'recipient' or 'donor'
      - `content` (text) - Testimonial content
      - `image_url` (text, nullable) - Person photo
      - `is_active` (boolean) - Display status
      - `created_at` (timestamptz)
    
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `message` (text) - Message content
      - `status` (text) - 'unread', 'read', 'replied'
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on projects and testimonials
    - Add policies for public insert on volunteers, donations, and contacts
    - Authenticated users can manage all data
*/

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('anak', 'ibu')),
  target_amount numeric NOT NULL DEFAULT 0,
  current_amount numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'upcoming')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  interest text NOT NULL CHECK (interest IN ('anak', 'ibu', 'both')),
  location text NOT NULL,
  availability text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as volunteer"
  ON volunteers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view volunteers"
  ON volunteers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update volunteer status"
  ON volunteers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete volunteers"
  ON volunteers FOR DELETE
  TO authenticated
  USING (true);

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  donor_name text DEFAULT 'Hamba Tuhan',
  amount numeric NOT NULL,
  purpose text NOT NULL CHECK (purpose IN ('anak', 'ibu', 'general')),
  payment_method text NOT NULL CHECK (payment_method IN ('qris', 'bank', 'ewallet')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create donation"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view completed donations"
  ON donations FOR SELECT
  USING (status = 'completed');

CREATE POLICY "Authenticated users can view all donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete donations"
  ON donations FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('recipient', 'donor')),
  content text NOT NULL,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact status"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample projects
INSERT INTO projects (title, description, category, target_amount, current_amount, image_url, status) VALUES
('Beasiswa Pendidikan Anak Jalanan', 'Program beasiswa lengkap untuk 20 anak jalanan agar dapat kembali bersekolah dan memiliki masa depan cerah. Termasuk biaya sekolah, seragam, buku, dan uang saku.', 'anak', 50000000, 32500000, 'https://images.pexels.com/photos/8422132/pexels-photo-8422132.jpeg', 'active'),
('Pelatihan Wirausaha Ibu Single Parent', 'Program pelatihan keterampilan usaha bagi 30 ibu single parent, meliputi pelatihan kue, jahit, dan digital marketing. Modal usaha disediakan setelah pelatihan.', 'ibu', 30000000, 18750000, 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', 'active'),
('Bantuan Alat Sekolah Anak Prasejahtera', 'Pengadaan tas, sepatu, alat tulis, dan buku pelajaran untuk 100 anak dari keluarga prasejahtera di pedalaman.', 'anak', 25000000, 21000000, 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg', 'active'),
('Modal Usaha Kecil Ibu Tunggal', 'Bantuan modal usaha untuk 15 ibu tunggal yang ingin memulai usaha kecil seperti warung, jualan online, atau jasa catering.', 'ibu', 20000000, 8500000, 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 'active'),
('Rumah Belajar untuk Anak Putus Sekolah', 'Pembangunan rumah belajar komunitas dengan fasilitas buku, komputer, dan tenaga pengajar sukarelawan untuk anak-anak putus sekolah.', 'anak', 75000000, 45000000, 'https://images.pexels.com/photos/8422147/pexels-photo-8422147.jpeg', 'active'),
('Program Kesehatan Ibu dan Anak', 'Pemeriksaan kesehatan gratis dan bantuan nutrisi untuk 50 ibu single parent dan anak-anak mereka.', 'ibu', 15000000, 15000000, 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg', 'completed');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, image_url, is_active) VALUES
('Ibu Maria Sihombing', 'recipient', 'Terima kasih Sungai Berkat Indonesia. Saya yang tadinya bingung mencari nafkah untuk kedua anak saya, kini sudah bisa berjualan kue dan punya penghasilan tetap. Tuhan memberkati!', 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg', true),
('Bapak David Christianto', 'donor', 'Senang sekali bisa menjadi bagian dari pelayanan yang mulia ini. Laporan transparansi yang diberikan membuat saya yakin donasi saya tepat sasaran.', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', true),
('Adik Jonathan (13 tahun)', 'recipient', 'Aku senang bisa sekolah lagi. Sekarang aku punya cita-cita mau jadi dokter buat bantu orang-orang kayak aku. Makasih banyak!', 'https://images.pexels.com/photos/8613311/pexels-photo-8613311.jpeg', true),
('Ibu Grace Wijaya', 'donor', 'Pelayanan yang sangat profesional dan penuh kasih. Saya merasakan kehadiran Kristus dalam setiap program yang dijalankan. Tuhan Yesus memberkati!', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', true);