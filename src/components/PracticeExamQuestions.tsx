import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface PracticeExamQuestionsProps {
  sectionContent: string;
  sectionTitle: string;
}

interface GeneratedQuestion {
  question: string;
  marks: number;
  expectedKeyPoints: string[];
}

interface AnswerFeedback {
  score: number;
  maxMarks: number;
  keyIdeasCovered: string[];
  keyIdeasMissed: string[];
  feedbackText: string;
}

const PracticeExamQuestions = ({ sectionContent, sectionTitle }: PracticeExamQuestionsProps) => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);

  // Extract topics from content (simple heuristic: look for headings)
  const extractTopics = (content: string): string[] => {
    const topics: string[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      // Look for markdown headings (##, ###) or bold text that might be topics
      if (line.match(/^#+\s+(.+)/) || line.match(/^\*\*(.+)\*\*$/)) {
        const topic = line.replace(/^#+\s+/, '').replace(/^\*\*(.+)\*\*$/, '$1').trim();
        if (topic && topic.length > 3 && topic.length < 100) {
          topics.push(topic);
        }
      }
    }
    
    // If no topics found, use the section title as the only topic
    return topics.length > 0 ? topics : [sectionTitle];
  };

  const topics = extractTopics(sectionContent);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleGenerateQuestion = async () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "Select topics",
        description: "Please select at least one topic to generate questions about.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setFeedback(null);
    setUserAnswer("");

    try {
      // Build focused study content based on selected topics
      const focusedContent = `${sectionTitle}\n\nFocus on these topics: ${selectedTopics.join(", ")}\n\n${sectionContent}`;

      const { data, error } = await supabase.functions.invoke('generate-varied-questions', {
        body: {
          studyContent: focusedContent,
          numQuestions: 1,
          previousQuestions: previousQuestions
        }
      });

      if (error) throw error;

      if (data?.questions && data.questions.length > 0) {
        const question = data.questions[0];
        setCurrentQuestion(question);
        setPreviousQuestions(prev => [...prev, question.question]);
      } else {
        throw new Error("No questions generated");
      }
    } catch (error) {
      console.error("Error generating question:", error);
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) {
      toast({
        title: "Write an answer",
        description: "Please write your answer before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('mark-answer', {
        body: {
          question: currentQuestion.question,
          answer: userAnswer,
          expectedKeyPoints: currentQuestion.expectedKeyPoints,
          maxMarks: currentQuestion.marks
        }
      });

      if (error) throw error;

      setFeedback({
        score: data.score || 0,
        maxMarks: currentQuestion.marks,
        keyIdeasCovered: data.keyIdeasCovered || [],
        keyIdeasMissed: data.keyIdeasMissed || [],
        feedbackText: data.feedbackText || "Answer submitted."
      });

      toast({
        title: "Answer marked!",
        description: `You scored ${data.score || 0} out of ${currentQuestion.marks} marks.`,
      });
    } catch (error) {
      console.error("Error marking answer:", error);
      toast({
        title: "Error",
        description: "Failed to mark answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(null);
    setUserAnswer("");
    setFeedback(null);
    handleGenerateQuestion();
  };

  return (
    <Card className="mt-6 border-primary/20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BookOpen className="h-6 w-6 text-primary" />
          Practice Exam Questions
        </CardTitle>
        <CardDescription>
          Select topics below and generate application-based exam questions to test your understanding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Topic Selection */}
        <div>
          <h3 className="font-semibold mb-3">Select Topics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center space-x-2">
                <Checkbox
                  id={`topic-${topic}`}
                  checked={selectedTopics.includes(topic)}
                  onCheckedChange={() => toggleTopic(topic)}
                />
                <label
                  htmlFor={`topic-${topic}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {topic}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateQuestion}
            disabled={isGenerating || selectedTopics.length === 0}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Question...
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Generate Question
              </>
            )}
          </Button>
          {currentQuestion && (
            <Button
              onClick={handleNewQuestion}
              disabled={isGenerating}
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Question
            </Button>
          )}
        </div>

        {/* Current Question Display */}
        {currentQuestion && (
          <Card className="bg-background/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Question</CardTitle>
                <Badge variant="secondary">{currentQuestion.marks} marks</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{currentQuestion.question}</ReactMarkdown>
              </div>

              {/* Answer Input */}
              {!feedback && (
                <>
                  <Textarea
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting || !userAnswer.trim()}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Marking...
                      </>
                    ) : (
                      "Submit Answer"
                    )}
                  </Button>
                </>
              )}

              {/* Feedback Display */}
              {feedback && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                    <span className="font-semibold">Your Score:</span>
                    <Badge variant="default" className="text-lg px-4 py-1">
                      {feedback.score} / {feedback.maxMarks}
                    </Badge>
                  </div>

                  {feedback.keyIdeasCovered.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                        ✓ Key Ideas Covered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {feedback.keyIdeasCovered.map((idea, idx) => (
                          <Badge key={idx} variant="outline" className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400">
                            {idea}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {feedback.keyIdeasMissed.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                        ⚠ Key Ideas to Review:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {feedback.keyIdeasMissed.map((idea, idx) => (
                          <Badge key={idx} variant="outline" className="border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400">
                            {idea}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Feedback:</h4>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{feedback.feedbackText}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground p-3 bg-background rounded border">
                    <strong>Your Answer:</strong>
                    <p className="mt-2">{userAnswer}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeExamQuestions;
