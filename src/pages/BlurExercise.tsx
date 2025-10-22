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
import { MemorizationTimer } from "@/components/MemorizationTimer";

interface InternalSection {
  title: string;
  content: string;
}

interface BlurtQuestion {
  question: string;
  keyKeywords: string[];
  marks: number;
}

interface QuestionFeedback {
  questionNumber: number;
  feedback: string;
  coveredKeywords: string[];
  missedKeywords: string[];
}

const BlurExercise = () => {
  const { topicId, subsectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isPhysics = window.location.pathname.includes('/physics/');
  
  const [topic, setTopic] = useState<TopicSection | null>(null);
  const [subsection, setSubsection] = useState<Subsection | null>(null);
  const [pairs, setPairs] = useState<InternalSection[]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [questions, setQuestions] = useState<BlurtQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<QuestionFeedback[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shouldRetryQuestions, setShouldRetryQuestions] = useState(false);

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
    
    // Parse internal sections from content_html
    const parser = new DOMParser();
    const doc = parser.parseFromString(foundSubsection.content_html, 'text/html');
    const h3Elements = doc.querySelectorAll('h3');
    
    const parsedPairs: InternalSection[] = [];
    h3Elements.forEach((h3, index) => {
      const title = h3.textContent || `Section ${index + 1}`;
      let content = '';
      let nextSibling = h3.nextElementSibling;
      
      while (nextSibling && nextSibling.tagName !== 'H3') {
        content += nextSibling.textContent + '\n';
        nextSibling = nextSibling.nextElementSibling;
      }
      
      if (content.trim()) {
        parsedPairs.push({ title, content: content.trim() });
      }
    });
    
    setPairs(parsedPairs);
  }, [topicId, subsectionId, isPhysics]);

  const generateQuestions = async () => {
    setIsGenerating(true);
    
    try {
      const currentPair = pairs[currentPairIndex];
      const nextPair = pairs[currentPairIndex + 1];
      const pairContent = nextPair ? `${currentPair.content}\n\n${nextPair.content}` : currentPair.content;
      
      const { data, error } = await supabase.functions.invoke('generate-blurt-questions', {
        body: {
          content: currentPair.content,
          pairContent: pairContent,
          previousKeywords: feedbackHistory.flatMap(f => [...f.coveredKeywords, ...f.missedKeywords])
        }
      });
      
      if (error) throw error;
      
      setQuestions(data.questions || []);
      setUserAnswers(new Array(data.questions?.length || 0).fill(""));
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

  const handleTimerComplete = async () => {
    setTimerCompleted(true);
    setShowTimer(false);
    await generateQuestions();
  };

  const handleSubmitAnswers = async () => {
    if (userAnswers.some(a => !a.trim())) {
      toast({ title: "Please answer all questions", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mark-answer', {
        body: {
          questions: questions.map((q, idx) => ({
            question: q.question,
            keyKeywords: q.keyKeywords,
            userAnswer: userAnswers[idx]
          }))
        }
      });
      
      if (error) throw error;
      
      const newFeedback: QuestionFeedback[] = data.feedback.map((f: any, idx: number) => ({
        questionNumber: feedbackHistory.length + idx + 1,
        feedback: f.feedback,
        coveredKeywords: f.coveredKeywords,
        missedKeywords: f.missedKeywords
      }));
      
      setFeedbackHistory([...feedbackHistory, ...newFeedback]);
      setShowFeedback(true);
      
      // Check if any question has missed keywords
      const hasMissedKeywords = newFeedback.some(f => f.missedKeywords.length > 0);
      setShouldRetryQuestions(hasMissedKeywords);
      
    } catch (error) {
      console.error('Error getting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to get feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinuePractice = async () => {
    setShowFeedback(false);
    
    if (shouldRetryQuestions) {
      // Retry same questions
      setUserAnswers(new Array(questions.length).fill(""));
    } else {
      // Generate new questions
      await generateQuestions();
    }
  };

  const handleMoveToNextPair = () => {
    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
      setShowTimer(true);
      setTimerCompleted(false);
      setQuestions([]);
      setUserAnswers([]);
      setFeedbackHistory([]);
      setShowFeedback(false);
      setShouldRetryQuestions(false);
    } else {
      saveSession();
    }
  };

  const saveSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const allCovered = feedbackHistory.flatMap(f => f.coveredKeywords);
      const allMissed = feedbackHistory.flatMap(f => f.missedKeywords);
      
      await supabase.from('blurt_sessions').insert({
        user_id: user.id,
        topic_slug: topicId,
        subsection_slug: subsectionId,
        pair_number: currentPairIndex + 1,
        score: allCovered.length,
        max_score: allCovered.length + allMissed.length,
        keywords_added: allCovered,
        keywords_missed: allMissed
      });
      
      toast({ title: "Session completed!" });
      navigate(isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`);
    } catch (error) {
      console.error('Error saving session:', error);
      toast({
        title: "Error",
        description: "Failed to save session.",
        variant: "destructive"
      });
    }
  };

  if (!topic || !subsection || pairs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-12">
            <p className="text-muted-foreground mb-4">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-2">Blurting Practice</h1>
          <p className="text-muted-foreground">{subsection.title}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Pair {currentPairIndex + 1} of {pairs.length}: {pairs[currentPairIndex].title}
          </p>
        </div>

        {showTimer && (
          <Card>
            <CardHeader>
              <CardTitle>Memorize this content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg max-h-[400px] overflow-y-auto">
                <h3 className="font-semibold mb-2">{pairs[currentPairIndex].title}</h3>
                <p className="whitespace-pre-wrap">{pairs[currentPairIndex].content}</p>
              </div>
              <MemorizationTimer onComplete={handleTimerComplete} duration={120} />
            </CardContent>
          </Card>
        )}

        {isGenerating && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg">Generating questions...</p>
            </CardContent>
          </Card>
        )}

        {timerCompleted && !isGenerating && questions.length > 0 && !showFeedback && (
          <Card>
            <CardHeader>
              <CardTitle>Answer the Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Question {idx + 1}</p>
                    <p className="text-lg mt-2">{q.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      [{q.marks} marks]
                    </p>
                  </div>

                  <Textarea
                    value={userAnswers[idx] || ""}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[idx] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    placeholder="Write your answer here..."
                    className="min-h-[150px]"
                  />
                </div>
              ))}

              <Button 
                onClick={handleSubmitAnswers} 
                className="w-full"
                disabled={isSubmitting || userAnswers.some(a => !a?.trim())}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit All Answers
              </Button>
            </CardContent>
          </Card>
        )}

        {showFeedback && (
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedbackHistory.slice(-questions.length).map((feedback, idx) => (
                <div key={idx} className="space-y-3 pb-6 border-b last:border-b-0">
                  <h3 className="font-bold text-lg">Question {idx + 1} Feedback:</h3>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <p className="text-blue-900 dark:text-blue-100 whitespace-pre-wrap">{feedback.feedback}</p>
                  </div>

                  {feedback.coveredKeywords.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="text-green-600">✓</span> Points you did well
                      </h4>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                        <ul className="list-disc list-inside space-y-1">
                          {feedback.coveredKeywords.map((keyword, kidx) => (
                            <li key={kidx} className="text-green-700 dark:text-green-400 font-medium">{keyword}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {feedback.missedKeywords.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="text-destructive">✗</span> Ideas you missed
                      </h4>
                      <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <ul className="list-disc list-inside space-y-1">
                          {feedback.missedKeywords.map((keyword, kidx) => (
                            <li key={kidx} className="text-destructive font-medium">{keyword}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleContinuePractice} 
                  className="w-full"
                >
                  {shouldRetryQuestions ? "Try Same Questions Again" : "Generate New Questions"}
                </Button>
                
                <Button 
                  onClick={handleMoveToNextPair}
                  variant="outline"
                  className="w-full"
                >
                  Move to Next Pair
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlurExercise;
