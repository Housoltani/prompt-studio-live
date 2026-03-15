-- Fügen wir die neuen Spalten zur existierenden Tabelle hinzu
ALTER TABLE public.agent_configurations
ADD COLUMN brand_niche TEXT,
ADD COLUMN brand_tone TEXT DEFAULT 'Professional',
ADD COLUMN brand_goal TEXT DEFAULT 'Engagement';
