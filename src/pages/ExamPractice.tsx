import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { sectionsData, TopicSection, Subsection } from "@/data/sectionsData";
import { physicsData } from "@/data/physicsData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExamQuestion {
  question: string;
  marks: number;
  expectedKeyPoints: string[];
}

interface QuestionResult {
  question: string;
  answer: string;
  keyIdeasCovered: string[];
  keyIdeasMissed: string[];
  score: number;
  maxMarks: number;
  feedbackText: string;
}

const ExamPractice = () => {
  const { topicId, subsectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isPhysics = window.location.pathname.includes('/physics/');
  
  const [topic, setTopic] = useState<TopicSection | null>(null);
  const [subsection, setSubsection] = useState<Subsection | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const dataSource = isPhysics ? physicsData : sectionsData;
    const foundTopic = dataSource.find((t) => t.id === topicId);
    
    if (!foundTopic) {
      toast({ title: "Topic not found", variant: "destructive" });
      navigate(isPhysics ? "/physics/sections" : "/sections");
      return;
    }
    
    const foundSubsection = foundTopic.subsections.find((s) => s.id === subsectionId);
    if (!foundSubsection) {
      toast({ title: "Subsection not found", variant: "destructive" });
      navigate(isPhysics ? "/physics/sections" : "/sections");
      return;
    }
    
    setTopic(foundTopic);
    setSubsection(foundSubsection);
    
    generateExamQuestions(foundSubsection);
  }, [topicId, subsectionId, isPhysics]);

  const generateExamQuestions = async (sub: Subsection) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(sub.content_html, 'text/html');
      const content = doc.body.textContent || '';
      
      const { data, error } = await supabase.functions.invoke('generate-varied-questions', {
        body: {
          content: content,
          questionType: 'exam',
          count: 5
        }
      });
      
      if (error) throw error;
      
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitAnswer = async () => {
    setIsMarking(true);
    const currentQuestion = questions[currentQuestionIndex];
    
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
      
      const result: QuestionResult = {
        question: currentQuestion.question,
        answer: userAnswer,
        keyIdeasCovered: data.keyIdeasCovered || [],
        keyIdeasMissed: data.keyIdeasMissed || [],
        score: data.score || 0,
        maxMarks: currentQuestion.marks,
        feedbackText: data.feedbackText || ""
      };
      
      setResults([...results, result]);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer("");
      } else {
        await savePracticeSession([...results, result]);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error marking answer:', error);
      toast({
        title: "Error",
        description: "Failed to mark answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsMarking(false);
    }
  };

  const savePracticeSession = async (allResults: QuestionResult[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const totalScore = allResults.reduce((sum, r) => sum + r.score, 0);
      const maxMarks = allResults.reduce((sum, r) => sum + r.maxMarks, 0);
      const allCovered = allResults.flatMap(r => r.keyIdeasCovered);
      const allMissed = allResults.flatMap(r => r.keyIdeasMissed);
      
      await supabase.from('practice_sessions').insert({
        user_id: user.id,
        topic_slug: topicId,
        subsection_slug: subsectionId,
        subsection_title: subsection?.title,
        questions_count: questions.length,
        overall_score: totalScore,
        max_marks: maxMarks,
        key_ideas_covered: allCovered,
        key_ideas_missed: allMissed
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxMarks = results.reduce((sum, r) => sum + r.maxMarks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topic
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Exam Practice</h1>
          <p className="text-muted-foreground">{subsection?.title}</p>
        </div>

        {isGenerating && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg">Generating exam questions...</p>
            </CardContent>
          </Card>
        )}

        {!isGenerating && !showResults && questions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg">{questions[currentQuestionIndex].question}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  [{questions[currentQuestionIndex].marks} marks]
                </p>
              </div>

              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[200px]"
                disabled={isMarking}
              />

              <Button 
                onClick={handleSubmitAnswer} 
                className="w-full"
                disabled={!userAnswer.trim() || isMarking}
              >
                <Send className="mr-2 h-4 w-4" />
                {isMarking ? "Marking..." : "Submit Answer"}
              </Button>
            </CardContent>
          </Card>
        )}

        {showResults && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold mb-2">
                    {totalScore}/{maxMarks}
                  </p>
                  <p className="text-muted-foreground">
                    {Math.round((totalScore / maxMarks) * 100)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {results.map((result, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">Question {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{result.question}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Your Answer:</p>
                    <p className="text-sm text-muted-foreground">{result.answer}</p>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      Score: {result.score}/{result.maxMarks}
                    </p>
                    <p className="text-sm">{result.feedbackText}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              onClick={() => navigate(isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`)}
              className="w-full"
            >
              Back to Topic
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPractice;
