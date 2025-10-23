import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MemorizationTimer } from "@/components/MemorizationTimer";

interface Section {
  id: string;
  title: string;
  spec_tag: string;
  keywords: string[];
  content: string;
}

interface GeneratedQuestion {
  question: string;
  revisionNotes: string;
  helperNotes: string;
  marks: number;
}

interface QuestionFeedback {
  questionIndex: number;
  feedback: string;
  coveredKeywords: string[];
  missedKeywords: string[];
  score: number;
  maxMarks: number;
}

const BlurExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [feedbackHistory, setFeedbackHistory] = useState<QuestionFeedback[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hiddenNotes, setHiddenNotes] = useState<Set<number>>(new Set());
  const [hiddenRevisionNotes, setHiddenRevisionNotes] = useState<Set<number>>(new Set());
  const [memorizationDuration, setMemorizationDuration] = useState(180);

  useEffect(() => {
    const fetchSection = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("sections")
        .select("id, title, spec_tag, keywords, content")
        .eq("id", id)
        .single();

      if (data) {
        setSection(data);
        
        // Calculate memorization time based on word count
        const wordCount = data.content.trim().split(/\s+/).length;
        const seconds = Math.ceil((wordCount / 50) * 10);
        setMemorizationDuration(Math.max(30, seconds));
      }
      setLoading(false);
    };

    fetchSection();
  }, [id, navigate]);

  const handleTimerComplete = async () => {
    setShowTimer(false);
    setIsGeneratingQuestions(true);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        "generate-blurt-questions",
        {
          body: {
            studyContent: section?.content || "",
            numQuestions: 2,
          },
        }
      );

      if (functionError) throw functionError;

      const generatedQuestions = functionData?.questions || [];
      setQuestions(generatedQuestions);
      setUserAnswers(new Array(generatedQuestions.length).fill(""));
      setShowQuestions(true);
      toast.success("Questions generated!");
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const toggleNoteVisibility = (index: number) => {
    setHiddenNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleRevisionNoteVisibility = (index: number) => {
    setHiddenRevisionNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSubmitAnswers = async () => {
    if (userAnswers.some((answer) => !answer.trim())) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackPromises = questions.map(async (q, index) => {
        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          "mark-answer",
          {
            body: {
              question: q.question,
              studentAnswer: userAnswers[index],
              expectedContent: q.helperNotes,
              marks: q.marks,
            },
          }
        );

        if (functionError) throw functionError;

        return {
          questionIndex: index,
          feedback: functionData.feedback || "",
          coveredKeywords: functionData.keyIdeasCovered || [],
          missedKeywords: functionData.keyIdeasMissed || [],
          score: functionData.score || 0,
          maxMarks: q.marks,
        };
      });

      const allFeedback = await Promise.all(feedbackPromises);
      setFeedbackHistory(allFeedback);
      setShowFeedback(true);
      toast.success("Answers submitted!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldRetryQuestions = feedbackHistory.some((f) => f.missedKeywords.length > 0);

  const handleContinuePractice = async () => {
    if (shouldRetryQuestions) {
      // Retry same questions
      setUserAnswers(new Array(questions.length).fill(""));
      setShowFeedback(false);
      setFeedbackHistory([]);
      toast.info("Try the same questions again!");
    } else {
      // Generate new questions
      setIsGeneratingQuestions(true);
      setShowFeedback(false);
      setFeedbackHistory([]);

      try {
        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          "generate-blurt-questions",
          {
            body: {
              studyContent: section?.content || "",
              numQuestions: 2,
            },
          }
        );

        if (functionError) throw functionError;

        const generatedQuestions = functionData?.questions || [];
        setQuestions(generatedQuestions);
        setUserAnswers(new Array(generatedQuestions.length).fill(""));
        setHiddenNotes(new Set());
        setHiddenRevisionNotes(new Set());
        toast.success("New questions generated!");
      } catch (error) {
        console.error("Error generating questions:", error);
        toast.error("Failed to generate questions. Please try again.");
      } finally {
        setIsGeneratingQuestions(false);
      }
    }
  };

  const handleMoveToNextSection = async () => {
    // Save session to database
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !section) return;

    const allCoveredKeywords = feedbackHistory.flatMap((f) => f.coveredKeywords);
    const allMissedKeywords = feedbackHistory.flatMap((f) => f.missedKeywords);
    const totalScore = feedbackHistory.reduce((sum, f) => sum + f.score, 0);
    const maxScore = feedbackHistory.reduce((sum, f) => sum + f.maxMarks, 0);

    await supabase.from("submissions").insert({
      user_id: user.id,
      section_id: section.id,
      content: userAnswers.join("\n\n"),
      score: Math.round((totalScore / maxScore) * 100),
      keywords_found: allCoveredKeywords,
      keywords_missed: allMissedKeywords,
    });

    toast.success("Progress saved!");
    navigate("/sections");
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
        <Button variant="ghost" onClick={() => navigate("/sections")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sections
        </Button>

        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{section.spec_tag}</Badge>
            </div>
            <CardTitle className="text-2xl">Blur Exercise: {section.title}</CardTitle>
            <CardDescription className="mt-2">
              Memorize the content, then answer questions with AI-generated helper notes!
            </CardDescription>
          </CardHeader>
        </Card>

        {showTimer && (
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Study the content below:</h3>
                <div className="prose prose-sm max-w-none bg-muted/50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                  {section.content}
                </div>
              </div>
              <MemorizationTimer
                duration={memorizationDuration}
                onComplete={handleTimerComplete}
              />
            </CardContent>
          </Card>
        )}

        {isGeneratingQuestions && (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <div className="animate-pulse text-muted-foreground">Generating questions...</div>
            </CardContent>
          </Card>
        )}

        {showQuestions && !showFeedback && (
          <div className="space-y-6">
            {questions.map((q, index) => (
              <Card key={index} className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1} ({q.marks} marks)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Revision Notes:</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRevisionNoteVisibility(index)}
                      >
                        {hiddenRevisionNotes.has(index) ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Notes
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide Notes
                          </>
                        )}
                      </Button>
                    </div>
                    {!hiddenRevisionNotes.has(index) && (
                      <p className="text-sm text-muted-foreground">{q.revisionNotes}</p>
                    )}
                  </div>
                  <p className="text-base font-medium">{q.question}</p>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Helper Notes:</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleNoteVisibility(index)}
                      >
                        {hiddenNotes.has(index) ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Notes
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide Notes
                          </>
                        )}
                      </Button>
                    </div>
                    {!hiddenNotes.has(index) && (
                      <p className="text-sm text-muted-foreground">{q.helperNotes}</p>
                    )}
                  </div>
                  <Textarea
                    placeholder="Write your answer here..."
                    value={userAnswers[index]}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[index] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    className="min-h-[200px]"
                  />
                </CardContent>
              </Card>
            ))}
            <Button
              size="lg"
              onClick={handleSubmitAnswers}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isSubmitting ? "Submitting..." : "Submit All Answers"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {showFeedback && (
          <div className="space-y-6">
            {feedbackHistory.map((feedback, index) => (
              <Card key={index} className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} Feedback: {feedback.score}/{feedback.maxMarks} marks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">AI Feedback:</p>
                    <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                  </div>
                  {feedback.coveredKeywords.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">✅ Key Ideas Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {feedback.coveredKeywords.map((keyword, i) => (
                          <Badge key={i} variant="default" className="bg-green-500">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {feedback.missedKeywords.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">❌ Key Ideas Missed:</p>
                      <div className="flex flex-wrap gap-2">
                        {feedback.missedKeywords.map((keyword, i) => (
                          <Badge key={i} variant="destructive">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={handleContinuePractice}
                disabled={isGeneratingQuestions}
                className="flex-1"
              >
                {shouldRetryQuestions ? "Try Same Questions Again" : "Generate New Questions"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleMoveToNextSection}
                className="flex-1"
              >
                Move to Next Section
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlurExercise;
