import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import PracticeExamQuestions from "@/components/PracticeExamQuestions";

interface Section {
  id: string;
  title: string;
  spec_tag: string;
  level: string;
  learning_objectives: string[];
  content: string;
}

const SectionReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("sections")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setSection(data);
      }
      setLoading(false);
    };

    fetchSection();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading section...</div>
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
        <Button variant="ghost" onClick={() => navigate("/sections")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sections
        </Button>

        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{section.spec_tag}</Badge>
              <Badge variant={section.level === "Higher" ? "default" : "secondary"}>
                {section.level}
              </Badge>
            </div>
            <CardTitle className="text-3xl">{section.title}</CardTitle>
            <CardDescription className="text-base mt-4">
              <span className="font-semibold text-foreground">Learning Objectives:</span>
              <ul className="mt-2 space-y-2">
                {section.learning_objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mb-6 animate-slide-up">
          <CardContent className="prose prose-slate max-w-none p-8 dark:prose-invert">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </CardContent>
        </Card>

        <PracticeExamQuestions 
          sectionContent={section.content}
          sectionTitle={section.title}
        />

        <Card className="mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Ready to Test Your Knowledge?
            </CardTitle>
            <CardDescription>
              Use the "Blur" technique to write everything you remember from this section without looking!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              onClick={() => navigate(`/blur/${section.id}`)}
            >
              Start Blur Exercise
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SectionReader;
