/*
  # Initial CRM Database Schema

  1. Tables
    - users (system users/employees)
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - role (text)
      - created_at (timestamp)
      
    - customers
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - company (text)
      - status (text)
      - assigned_to (uuid, references users)
      - created_at (timestamp)
      - updated_at (timestamp)
      
    - contacts
      - id (uuid, primary key)
      - customer_id (uuid, references customers)
      - name (text)
      - email (text)
      - phone (text)
      - position (text)
      - is_primary (boolean)
      - created_at (timestamp)
      
    - interactions
      - id (uuid, primary key)
      - customer_id (uuid, references customers)
      - user_id (uuid, references users)
      - type (text)
      - notes (text)
      - created_at (timestamp)
      
    - deals
      - id (uuid, primary key)
      - customer_id (uuid, references customers)
      - user_id (uuid, references users)
      - title (text)
      - amount (decimal)
      - status (text)
      - stage (text)
      - expected_close_date (date)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Indexes
    - Added indexes on frequently queried columns
    - Added indexes for foreign keys
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text,
  phone text,
  company text,
  status text NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES users(id),
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_assigned_to ON customers(assigned_to);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_company ON customers(company);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  position text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_customer_id ON contacts(customer_id);
CREATE INDEX idx_contacts_email ON contacts(email);

-- Interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  type text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interactions_customer_id ON interactions(customer_id);
CREATE INDEX idx_interactions_user_id ON interactions(user_id);
CREATE INDEX idx_interactions_created_at ON interactions(created_at);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open',
  stage text NOT NULL DEFAULT 'initial',
  expected_close_date date,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_deals_customer_id ON deals(customer_id);
CREATE INDEX idx_deals_user_id ON deals(user_id);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_stage ON deals(stage);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON deals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();