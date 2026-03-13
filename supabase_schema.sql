-- 1. Profiles Table (Erweitert das Standard Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS (Row Level Security) für Profiles aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Prompts Table (Speichert alle Community & Marketplace Prompts)
CREATE TABLE public.prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  category TEXT, -- z.B. 'Midjourney', 'ChatGPT', 'Claude'
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  price DECIMAL(10,2) DEFAULT 0.00, -- Für Marketplace (0 = Kostenlos)
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0
);

-- RLS für Prompts
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public prompts are viewable by everyone." ON public.prompts FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view their own private prompts." ON public.prompts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own prompts." ON public.prompts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prompts." ON public.prompts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own prompts." ON public.prompts FOR DELETE USING (auth.uid() = user_id);

-- 3. User Likes Table (Verhindert doppeltes Liken und speichert Favoriten)
CREATE TABLE public.user_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
  UNIQUE(user_id, prompt_id) -- Jeder User kann einen Prompt nur einmal liken
);

-- RLS für Likes
ALTER TABLE public.user_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all likes." ON public.user_likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes." ON public.user_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes." ON public.user_likes FOR DELETE USING (auth.uid() = user_id);

-- Function & Trigger um likes_count in der prompts Tabelle automatisch zu updaten
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.prompts SET likes_count = likes_count + 1 WHERE id = NEW.prompt_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.prompts SET likes_count = likes_count - 1 WHERE id = OLD.prompt_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_prompt_likes
AFTER INSERT OR DELETE ON public.user_likes
FOR EACH ROW EXECUTE FUNCTION update_likes_count();
