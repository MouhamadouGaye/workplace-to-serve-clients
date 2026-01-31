-- Users table
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text,
    phone text,
    company text,
    status text NOT NULL DEFAULT 'new',
    assigned_to integer REFERENCES users(id),
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_customers_assigned_to ON customers(assigned_to);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_company ON customers(company);
-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id serial PRIMARY KEY,
    customer_id integer NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
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
    id serial PRIMARY KEY,
    customer_id integer NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES users(id),
    type text NOT NULL,
    notes text,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interactions_customer_id ON interactions(customer_id);
CREATE INDEX idx_interactions_user_id ON interactions(user_id);
CREATE INDEX idx_interactions_created_at ON interactions(created_at);
-- Deals table
CREATE TABLE IF NOT EXISTS deals (
    id serial PRIMARY KEY,
    customer_id integer NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES users(id),
    title text NOT NULL,
    amount decimal(10, 2) NOT NULL DEFAULT 0,
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
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER update_customers_updated_at BEFORE
UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE
UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- First SAVE
ALTER TABLE public.contacts
ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(id);
ALTER TABLE public.contacts
ADD CONSTRAINT valid_email CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );
– -- Second SAVE
ALTER TABLE public.contacts
ALTER COLUMN name
SET DATA TYPE VARCHAR(255);
ALTER TABLE public.contacts
ALTER COLUMN email
SET DATA TYPE VARCHAR(255);
ALTER TABLE public.contacts
ALTER COLUMN phone
SET DATA TYPE VARCHAR(20);
-- Third SAVE
ALTER TABLE public.contacts
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_updated_at BEFORE
UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE UNIQUE INDEX idx_single_primary_contact ON public.contacts (customer_id)
WHERE is_primary = true;
--Fourth SAVE
ALTER TABLE public.contacts
ADD CONSTRAINT unique_email UNIQUE (email);
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    -- For hashed passwords
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'user')),
    -- Role-based access
    manager_id INTEGER REFERENCES users(id) ON DELETE
    SET NULL,
        -- Self-referencing for manager hierarchy
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Index for email for quick lookup
CREATE INDEX idx_users_email ON users(email);
-- Index for managerial hierarchy queries
CREATE INDEX idx_users_manager_id ON users(manager_id);
-- -- prettier-ignore 
--                                        Table "public.contacts"
--    Column    |           Type           | Collation | Nullable |               Default                
-- -------------+--------------------------+-----------+----------+--------------------------------------
--  id          | integer                  |           | not null | nextval('contacts_id_seq'::regclass)
--  customer_id | integer                  |           | not null | 
--  name        | character varying(255)   |           | not null | 
--  email       | character varying(255)   |           |          | 
--  phone       | character varying(20)    |           |          | 
--  position    | text                     |           |          | 
--  is_primary  | boolean                  |           |          | false
--  created_at  | timestamp with time zone |           |          | CURRENT_TIMESTAMP
--  updated_at  | timestamp with time zone |           |          | CURRENT_TIMESTAMP
-- Indexes:
--     "contacts_pkey" PRIMARY KEY, btree (id)
--     "idx_contacts_customer_id" btree (customer_id)
--     "idx_contacts_customer_primary" btree (customer_id, is_primary)
--     "idx_contacts_email" btree (email)
--     "idx_single_primary_contact" UNIQUE, btree (customer_id) WHERE is_primary = true
-- Check constraints:
--     "valid_email" CHECK (email::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
-- Foreign-key constraints:
--     "contacts_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
-- Triggers:
--     set_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at()
-- crm=# ALTER TABLE public.contacts ADD CONSTRAINT unique_email UNIQUE (email);
-- ALTER TABLE
-- crm=#
-- Create the contacts table
CREATE TABLE public.contacts (
    id SERIAL PRIMARY KEY,
    -- Primary key with auto-increment
    customer_id INTEGER NOT NULL,
    -- Foreign key referencing customers table
    name VARCHAR(255) NOT NULL,
    -- Contact's name
    email VARCHAR(255),
    -- Contact's email
    phone VARCHAR(20),
    -- Contact's phone number
    position TEXT,
    -- Contact's position or role
    is_primary BOOLEAN DEFAULT FALSE,
    -- Whether the contact is the primary contact
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Last update timestamp
);
-- Add foreign key constraint to reference the customers table
ALTER TABLE public.contacts
ADD CONSTRAINT contacts_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE;
-- Add unique constraint for email
ALTER TABLE public.contacts
ADD CONSTRAINT unique_email UNIQUE (email);
-- Add unique constraint for a single primary contact per customer
CREATE UNIQUE INDEX idx_single_primary_contact ON public.contacts (customer_id)
WHERE is_primary = TRUE;
-- Add additional indexes for faster queries
CREATE INDEX idx_contacts_customer_id ON public.contacts (customer_id);
CREATE INDEX idx_contacts_customer_primary ON public.contacts (customer_id, is_primary);
CREATE INDEX idx_contacts_email ON public.contacts (email);
-- Add a check constraint for valid email format
ALTER TABLE public.contacts
ADD CONSTRAINT valid_email CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );
-- Create a trigger to update the updated_at timestamp on row updates
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_updated_at BEFORE
UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    -- For hashed passwords
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'user')),
    -- Role-based access
    manager_id INTEGER REFERENCES users(id) ON DELETE
    SET NULL,
        -- Self-referencing for manager hierarchy
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Index for email for quick lookup
CREATE INDEX idx_users_email ON users(email);
-- Index for managerial hierarchy queries
CREATE INDEX idx_users_manager_id ON users(manager_id);
-------------------------------
-- 1. Add the 'password' column
ALTER TABLE users
ADD COLUMN password TEXT NOT NULL DEFAULT 'temporary_password';
-- Temporary value for existing users
-- 2. Add the 'manager_id' column with a foreign key
ALTER TABLE users
ADD COLUMN manager_id INTEGER REFERENCES users(id) ON DELETE
SET NULL;
-- 3. Add the 'updated_at' column
ALTER TABLE users
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
-- 4. Add a CHECK constraint to the 'role' column
ALTER TABLE users
ADD CONSTRAINT chk_role CHECK (role IN ('admin', 'manager', 'user'));
-- 5. Update existing rows (if needed)
-- Replace 'temporary_password' with a hashed value using bcrypt or another hashing tool later in your code
UPDATE users
SET password = 'temporary_password'
WHERE password IS NULL;
-- Optionally, set 'manager_id' to NULL or update with valid values based on your hierarchy
UPDATE users
SET manager_id = NULL;
-- 6. Add triggers to update the 'updated_at' column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_updated_at BEFORE
UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();