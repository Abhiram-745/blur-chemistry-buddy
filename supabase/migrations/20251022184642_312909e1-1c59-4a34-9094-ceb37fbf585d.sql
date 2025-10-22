-- Create table for tracking blurting sessions
CREATE TABLE public.blurt_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_slug text NOT NULL,
  subsection_slug text NOT NULL,
  pair_number integer NOT NULL,
  keywords_missed text[] NOT NULL DEFAULT '{}',
  keywords_added text[] NOT NULL DEFAULT '{}',
  score integer NOT NULL,
  max_score integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for aggregate subtopic progress
CREATE TABLE public.subtopic_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_slug text NOT NULL,
  subsection_slug text NOT NULL,
  blurt_score_avg numeric(5,2) DEFAULT 0,
  exam_score_avg numeric(5,2) DEFAULT 0,
  total_blurt_attempts integer DEFAULT 0,
  total_exam_attempts integer DEFAULT 0,
  last_practiced_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_slug, subsection_slug)
);

-- Enable RLS
ALTER TABLE public.blurt_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtopic_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blurt_sessions
CREATE POLICY "Users can view their own blurt sessions"
  ON public.blurt_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own blurt sessions"
  ON public.blurt_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subtopic_progress
CREATE POLICY "Users can view their own progress"
  ON public.subtopic_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.subtopic_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.subtopic_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to update subtopic progress after a blurt session
CREATE OR REPLACE FUNCTION public.update_subtopic_progress_after_blurt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_avg_score numeric(5,2);
  v_total_attempts integer;
BEGIN
  -- Calculate average score for this subtopic
  SELECT 
    AVG((score::numeric / max_score::numeric) * 100),
    COUNT(*)
  INTO v_avg_score, v_total_attempts
  FROM public.blurt_sessions
  WHERE user_id = NEW.user_id
    AND topic_slug = NEW.topic_slug
    AND subsection_slug = NEW.subsection_slug;

  -- Upsert progress record
  INSERT INTO public.subtopic_progress (
    user_id,
    topic_slug,
    subsection_slug,
    blurt_score_avg,
    total_blurt_attempts,
    last_practiced_at
  )
  VALUES (
    NEW.user_id,
    NEW.topic_slug,
    NEW.subsection_slug,
    v_avg_score,
    v_total_attempts,
    now()
  )
  ON CONFLICT (user_id, topic_slug, subsection_slug)
  DO UPDATE SET
    blurt_score_avg = v_avg_score,
    total_blurt_attempts = v_total_attempts,
    last_practiced_at = now();

  RETURN NEW;
END;
$$;

-- Function to update subtopic progress after an exam session
CREATE OR REPLACE FUNCTION public.update_subtopic_progress_after_exam()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_avg_score numeric(5,2);
  v_total_attempts integer;
BEGIN
  -- Calculate average score for this subtopic's exam practice
  SELECT 
    AVG((overall_score::numeric / max_marks::numeric) * 100),
    COUNT(*)
  INTO v_avg_score, v_total_attempts
  FROM public.practice_sessions
  WHERE user_id = NEW.user_id
    AND topic_slug = NEW.topic_slug
    AND subsection_slug = NEW.subsection_slug;

  -- Upsert progress record
  INSERT INTO public.subtopic_progress (
    user_id,
    topic_slug,
    subsection_slug,
    exam_score_avg,
    total_exam_attempts,
    last_practiced_at
  )
  VALUES (
    NEW.user_id,
    NEW.topic_slug,
    NEW.subsection_slug,
    v_avg_score,
    v_total_attempts,
    now()
  )
  ON CONFLICT (user_id, topic_slug, subsection_slug)
  DO UPDATE SET
    exam_score_avg = v_avg_score,
    total_exam_attempts = v_total_attempts,
    last_practiced_at = now();

  RETURN NEW;
END;
$$;

-- Trigger for blurt sessions
CREATE TRIGGER after_blurt_session_insert
  AFTER INSERT ON public.blurt_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_subtopic_progress_after_blurt();

-- Trigger for exam practice sessions
CREATE TRIGGER after_exam_session_insert
  AFTER INSERT ON public.practice_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_subtopic_progress_after_exam();