-- 4. Agent Configurations (Kommandozentrale / Instagram KI-Crew)
CREATE TABLE public.agent_configurations (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    scout_active BOOLEAN DEFAULT false,
    architect_active BOOLEAN DEFAULT false,
    diplomat_active BOOLEAN DEFAULT false,
    guardian_active BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS) aktivieren
ALTER TABLE public.agent_configurations ENABLE ROW LEVEL SECURITY;

-- Zugriffsrichtlinien erstellen
CREATE POLICY "Users can view their own agent configs"
    ON public.agent_configurations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent configs"
    ON public.agent_configurations FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own agent configs"
    ON public.agent_configurations FOR INSERT
    WITH CHECK (auth.uid() = user_id);
