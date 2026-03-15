-- 5. Content Archive (Speichert die generierten Posts der Agenten)
CREATE TABLE public.generated_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    agent_id TEXT NOT NULL,
    prompt TEXT,
    content_result TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS) aktivieren
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- Zugriffsrichtlinien erstellen (Voller Zugriff für den jeweiligen Nutzer)
CREATE POLICY "Users can view their own generated content"
    ON public.generated_content FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generated content"
    ON public.generated_content FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated content"
    ON public.generated_content FOR DELETE
    USING (auth.uid() = user_id);
