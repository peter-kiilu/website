-- Create the users table
create table public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null, -- In a real app, integrate with Supabase Auth or hash this!
  full_name text not null,
  student_id text,
  department text,
  points int default 0,
  joined_at timestamptz default now()
);

-- Enable Row Level Security (RLS) is recommended, 
-- but for this simple backend API accessing via service_role or authenticated client,
-- we'll leave it open or standard for now. 
-- Ideally, you would add policies.

-- Example Policy (Optional - if using Supabase Client on Frontend directly):
-- alter table public.users enable row level security;
-- create policy "Users can view their own data" on public.users
-- for select using (auth.uid() = id); 
