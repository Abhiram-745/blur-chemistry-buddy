import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Section {
  id: string;
  title: string;
  spec_tag: string;
  keywords: string[];
}

const BlurExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const fetchSection = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("sections")
        .select("id, title, spec_tag, keywords")
        .eq("id", id)
        .single();

      if (data) {
        setSection(data);
      }
      setLoading(false);
    };

    fetchSection();
  }, [id, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateScore = (userContent: string, keywords: string[]) => {
    const lowerContent = userContent.toLowerCase();
    const foundKeywords = keywords.filter((keyword) =>
      lowerContent.includes(keyword.toLowerCase())
    );
    const missedKeywords = keywords.filter(
      (keyword) => !lowerContent.includes(keyword.toLowerCase())
    );

    const score = Math.round((foundKeywords.length / keywords.length) * 100);

    return {
      score,
      foundKeywords,
      missedKeywords,
    };
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something before submitting!");
      return;
    }

    if (!section) return;

    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { score, foundKeywords, missedKeywords } = calculateScore(content, section.keywords);

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        user_id: user.id,
        section_id: section.id,
        content,
        score,
        keywords_found: foundKeywords,
        keywords_missed: missedKeywords,
      })
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else if (data) {
      toast.success("Submission saved!");
      navigate(`/results/${data.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading exercise...</div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-12">
            <p className="text-muted-foreground mb-4">Section not found.</p>
            <Button onClick={() => navigate("/sections")}>Back to Sections</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(`/section/${id}`)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Section
        </Button>

        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{section.spec_tag}</Badge>
                </div>
                <CardTitle className="text-2xl">Blur Exercise: {section.title}</CardTitle>
                <CardDescription className="mt-2">
                  Write everything you remember without looking at the content!
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-mono">{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <Textarea
              placeholder="Start writing everything you remember about this topic... Don't worry about perfect formatting, just get your thoughts down!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] text-base resize-none"
              autoFocus
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                {content.split(/\s+/).filter((word) => word.length > 0).length} words
              </p>
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={submitting || !content.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                {submitting ? "Submitting..." : "Submit Answer"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlurExercise;
