import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, FileQuestion, PenLine, CheckCircle as CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackState {
  question: string;
  answer: string;
  keyIdeasCovered: string[];
  keyIdeasMissed: string[];
  score: number;
  maxMarks: number;
  feedbackText: string;
  topicId: string;
  subsectionId: string;
  subsectionTitle: string;
  questionType: "blurt" | "exam";
  photoImage?: string;
  previousQuestionResults?: any[]; // Preserve question history
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackData = location.state as FeedbackState;

  if (!feedbackData) {
    navigate("/dashboard");
    return null;
  }

  const { question, answer, keyIdeasCovered, keyIdeasMissed, score, maxMarks, topicId, subsectionId, subsectionTitle, questionType, photoImage, feedbackText, previousQuestionResults } = feedbackData;
  const percentage = Math.round((score / maxMarks) * 100);

  // Save practice session to database
  useEffect(() => {
    const savePracticeSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.from("practice_sessions").insert({
          user_id: user.id,
          topic_slug: topicId,
          subsection_slug: subsectionId,
          subsection_title: subsectionTitle,
          overall_score: score,
          max_marks: maxMarks,
          questions_count: 1,
          key_ideas_covered: keyIdeasCovered,
          key_ideas_missed: keyIdeasMissed,
        });

        if (error) {
          console.error("Error saving practice session:", error);
        } else {
          console.log("Practice session saved successfully");
        }
      } catch (error) {
        console.error("Error saving practice session:", error);
      }
    };

    savePracticeSession();
  }, [topicId, subsectionId, subsectionTitle, score, maxMarks, keyIdeasCovered, keyIdeasMissed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-6">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/blur-practice/${topicId}/${subsectionId}`)} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>

        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm">
                {questionType === "exam" ? "Exam Question" : "Blurt Question"}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {maxMarks} marks
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold">Question</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg">{question}</p>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-secondary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Question Score</CardTitle>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{percentage}%</div>
                <div className="text-sm text-muted-foreground">{score}/{maxMarks} marks</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-xl font-semibold">AI Examiner Feedback</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{feedbackData.feedbackText}</p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="shadow-lg border-l-4 border-l-green-500">
            <CardHeader className="bg-green-50 dark:bg-green-950/20">
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Key Ideas Covered ({keyIdeasCovered.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {keyIdeasCovered.length > 0 ? (
                <ul className="space-y-2">
                  {keyIdeasCovered.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{idea}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No key ideas covered</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-l-yellow-500">
            <CardHeader className="bg-yellow-50 dark:bg-yellow-950/20">
              <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                <AlertTriangle className="h-5 w-5" />
                Key Ideas Missed ({keyIdeasMissed.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {keyIdeasMissed.length > 0 ? (
                <ul className="space-y-2">
                  {keyIdeasMissed.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{idea}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">All key ideas covered!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-xl font-semibold">Your Answer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {photoImage ? (
              <img 
                src={photoImage} 
                alt="Your submitted answer" 
                className="w-full h-auto rounded-lg max-h-[600px] object-contain"
              />
            ) : (
              <div className="bg-background/50 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {answer}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate(`/blur-practice/${topicId}/${subsectionId}`, { 
              state: { moveToNext: true } 
            })}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Move to Next
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate(`/blur-practice/${topicId}/${subsectionId}`, { 
              state: { generateQuestion: "blurt", previousQuestionResults } 
            })}
          >
            <PenLine className="mr-2 h-5 w-5" />
            Blurt Question
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate(`/blur-practice/${topicId}/${subsectionId}`, { 
              state: { generateQuestion: "exam", previousQuestionResults } 
            })}
          >
            <FileQuestion className="mr-2 h-5 w-5" />
            Exam Question
          </Button>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary"
            onClick={() => navigate("/progress")}
          >
            <CheckIcon className="mr-2 h-5 w-5" />
            Finish Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
