-- Test users (passwords will be 'password123')
-- Note: Run this in the Supabase SQL editor

-- Player user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('d0d54d58-9c28-4b1e-9cd9-8363756c123a', 'player@test.com', crypt('password123', gen_salt('bf')), now(), 'authenticated');

-- Scout user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('7c8d1f45-89ab-4c23-9def-456789abcdef', 'scout@test.com', crypt('password123', gen_salt('bf')), now(), 'authenticated');

-- School admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES ('b2e3f678-cdef-4567-89ab-123456789abc', 'school@test.com', crypt('password123', gen_salt('bf')), now(), 'authenticated');

-- Update roles in profiles
UPDATE public.profiles SET role = 'scout' WHERE email = 'scout@test.com';
UPDATE public.profiles SET role = 'school_admin' WHERE email = 'school@test.com';