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
  const [userAnswer, setUserAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missedKeywords, setMissedKeywords] = useState<string[]>([]);
  const [coveredKeywords, setCoveredKeywords] = useState<string[]>([]);
  const [showMissedKeywords, setShowMissedKeywords] = useState(false);
  const [sessionResults, setSessionResults] = useState<{
    score: number;
    maxScore: number;
    keywordsAdded: string[];
    keywordsMissed: string[];
  } | null>(null);

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

  const handleTimerComplete = async () => {
    setTimerCompleted(true);
    setShowTimer(false);
    setIsGenerating(true);
    
    try {
      const currentPair = pairs[currentPairIndex];
      const nextPair = pairs[currentPairIndex + 1];
      const pairContent = nextPair ? `${currentPair.content}\n\n${nextPair.content}` : currentPair.content;
      
      const { data, error } = await supabase.functions.invoke('generate-blurt-questions', {
        body: {
          content: currentPair.content,
          pairContent: pairContent,
          previousKeywords: questions.flatMap(q => q.keyKeywords)
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

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({ title: "Please write an answer", variant: "destructive" });
      return;
    }
    
    const currentQuestion = questions[0];
    const userAnswerLower = userAnswer.toLowerCase();
    const missed = currentQuestion.keyKeywords.filter(
      keyword => !userAnswerLower.includes(keyword.toLowerCase())
    );
    const covered = currentQuestion.keyKeywords.filter(
      keyword => userAnswerLower.includes(keyword.toLowerCase())
    );
    
    if (missed.length > 0) {
      setMissedKeywords(missed);
      setCoveredKeywords(covered);
      setShowMissedKeywords(true);
    } else {
      handleNextQuestion();
    }
  };

  const handleAddMissedKeywords = () => {
    const newAnswer = userAnswer + '\n\n' + missedKeywords.join(', ');
    setUserAnswer(newAnswer);
    setShowMissedKeywords(false);
    setMissedKeywords([]);
    setCoveredKeywords([]);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (questions.length > 1) {
      setQuestions(questions.slice(1));
      setUserAnswer("");
    } else {
      // All questions answered for this pair
      if (currentPairIndex < pairs.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
        setShowTimer(true);
        setTimerCompleted(false);
        setQuestions([]);
        setUserAnswer("");
      } else {
        // All pairs completed
        saveSession();
      }
    }
  };

  const saveSession = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Calculate final score
      const totalKeywords = questions.reduce((sum, q) => sum + q.keyKeywords.length, 0);
      const coveredKeywords = questions.flatMap(q => q.keyKeywords);
      
      await supabase.from('blurt_sessions').insert({
        user_id: user.id,
        topic_slug: topicId,
        subsection_slug: subsectionId,
        pair_number: currentPairIndex + 1,
        score: coveredKeywords.length,
        max_score: totalKeywords,
        keywords_added: coveredKeywords,
        keywords_missed: missedKeywords
      });
      
      toast({ title: "Session saved!" });
      navigate(isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`);
    } catch (error) {
      console.error('Error saving session:', error);
      toast({
        title: "Error",
        description: "Failed to save session.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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

        {timerCompleted && !isGenerating && questions.length > 0 && !showMissedKeywords && (
          <Card>
            <CardHeader>
              <CardTitle>Question {questions.length}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg">{questions[0].question}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  [{questions[0].marks} marks]
                </p>
              </div>

              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="min-h-[200px]"
              />

              <Button 
                onClick={handleSubmitAnswer} 
                className="w-full"
                disabled={!userAnswer.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Answer
              </Button>
            </CardContent>
          </Card>
        )}

        {showMissedKeywords && (
          <Card>
            <CardHeader>
              <CardTitle>Answer Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {coveredKeywords.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className="text-green-600">✓</span> Points you did well
                  </h3>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <ul className="list-disc list-inside space-y-1">
                      {coveredKeywords.map((keyword, idx) => (
                        <li key={idx} className="text-green-700 dark:text-green-400 font-medium">{keyword}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-destructive">✗</span> Ideas you missed
                </h3>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <ul className="list-disc list-inside space-y-1">
                    {missedKeywords.map((keyword, idx) => (
                      <li key={idx} className="text-destructive font-medium">{keyword}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please add these ideas to your answer before continuing.
                </p>
              </div>
              
              <Button 
                onClick={handleAddMissedKeywords} 
                className="w-full"
              >
                Add Missing Ideas & Continue
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlurExercise;
