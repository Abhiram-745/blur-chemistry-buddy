import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubtopicProgress {
  topic_slug: string;
  subsection_slug: string;
  subsection_title: string;
  blurt_score_avg: number;
  exam_score_avg: number;
  combined_score: number;
}

interface SubtopicProgressListProps {
  title: string;
  subtopics: SubtopicProgress[];
  isPhysics?: boolean;
}

export const SubtopicProgressList = ({ title, subtopics, isPhysics }: SubtopicProgressListProps) => {
  const navigate = useNavigate();

  const handlePractice = (topicSlug: string) => {
    const path = isPhysics ? `/physics/topic/${topicSlug}` : `/topic/${topicSlug}`;
    navigate(path);
  };

  if (subtopics.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subtopics.map((subtopic) => (
          <div key={`${subtopic.topic_slug}-${subtopic.subsection_slug}`} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{subtopic.subsection_title}</p>
                <Progress value={subtopic.combined_score} className="mt-2" />
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handlePractice(subtopic.topic_slug)}
              >
                Practice
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Blurt: {Math.round(subtopic.blurt_score_avg)}%</span>
              <span>Exam: {Math.round(subtopic.exam_score_avg)}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};