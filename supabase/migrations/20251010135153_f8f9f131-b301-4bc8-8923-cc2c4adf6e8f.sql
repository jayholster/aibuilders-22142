-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles (only admins can manage roles)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create submission_status enum
CREATE TYPE public.submission_status AS ENUM ('pending', 'reviewed', 'approved', 'declined');

-- Create prototype_submissions table
CREATE TABLE public.prototype_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  prototype_title TEXT NOT NULL,
  modules_used TEXT[] NOT NULL,
  prototype_link TEXT,
  description TEXT NOT NULL,
  feedback_requested TEXT,
  consent_public_gallery BOOLEAN DEFAULT false,
  status public.submission_status DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prototype_submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for prototype_submissions
CREATE POLICY "Anyone can insert submissions"
  ON public.prototype_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON public.prototype_submissions
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.prototype_submissions
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
  ON public.prototype_submissions
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view approved gallery submissions"
  ON public.prototype_submissions
  FOR SELECT
  USING (status = 'approved' AND consent_public_gallery = true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for updated_at on prototype_submissions
CREATE TRIGGER update_prototype_submissions_updated_at
  BEFORE UPDATE ON public.prototype_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();