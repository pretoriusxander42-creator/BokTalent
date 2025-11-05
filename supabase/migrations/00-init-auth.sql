-- Create profiles table with role
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text check (role in ('player', 'scout', 'school_admin', 'admin')) not null default 'player',
  updated_at timestamp with time zone,
  email text
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create secure policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'player');
  return new;
end;
$$;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();