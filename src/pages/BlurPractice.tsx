import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Send, BookOpen, CheckCircle, ChevronDown, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, PracticeItem } from "@/data/sectionsData";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import SectionContent from "@/components/SectionContent";
import { AIChatbot } from "@/components/AIChatbot";
import { PhotoUpload } from "@/components/PhotoUpload";
import { MemorizationTimer } from "@/components/MemorizationTimer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InternalSubsection = {
  title: string;
  html: string;
};

type QuestionResult = {
  questionIndex: number;
  question: string;
  answer: string;
  keyIdeasCovered: string[];
  keyIdeasMissed: string[];
  score: number;
  maxMarks: number;
  feedbackText: string;
};

type PhotoFeedbackData = {
  keyIdeasCovered: string[];
  keyIdeasMissed: string[];
  feedbackText: string;
};

type GeneratedQuestion = {
  question: string;
  marks: number;
  expectedKeyPoints: string[];
};

type KnowledgeGap = {
  topic: string;
  issue: string;
  recommendation: string;
};

type KnowledgeGapAnalysis = {
  overallAssessment: string;
  strengths: string[];
  knowledgeGaps: KnowledgeGap[];
  nextSteps: string[];
};

// Parse HTML to extract internal subsections
const parseInternalSubsections = (html: string): InternalSubsection[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const subsectionDivs = doc.querySelectorAll('div.subsection');
  
  const subsections: InternalSubsection[] = [];
  subsectionDivs.forEach((div) => {
    const heading = div.querySelector('.subsection-heading');
    if (heading) {
      subsections.push({
        title: heading.textContent || '',
        html: div.outerHTML
      });
    }
  });
  
  return subsections;
};

const BlurPractice = () => {
  const { topicId, subsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [internalSubsections, setInternalSubsections] = useState<InternalSubsection[]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [currentPairSubsections, setCurrentPairSubsections] = useState<InternalSubsection[]>([]);
  const [allPracticeItems, setAllPracticeItems] = useState<PracticeItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<PracticeItem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showQuestionFeedback, setShowQuestionFeedback] = useState(false);
  const [keywordsFound, setKeywordsFound] = useState<string[]>([]);
  const [keywordsMissed, setKeywordsMissed] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showStudyContent, setShowStudyContent] = useState(true);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [subsectionTitle, setSubsectionTitle] = useState("");
  const [canonicalKeywords, setCanonicalKeywords] = useState<string[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentGeneratedQuestion, setCurrentGeneratedQuestion] = useState<GeneratedQuestion | null>(null);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [knowledgeGapAnalysis, setKnowledgeGapAnalysis] = useState<KnowledgeGapAnalysis | null>(null);
  const [isAnalyzingGaps, setIsAnalyzingGaps] = useState(false);
  const [questionType, setQuestionType] = useState<"blurt" | "exam">("blurt");
  const [showQuestionTypeSelector, setShowQuestionTypeSelector] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState<PhotoFeedbackData | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [showMemorizationTimer, setShowMemorizationTimer] = useState(false);
  const [memorizationDuration, setMemorizationDuration] = useState(180); // 3 minutes default
  const [showReadyToBlur, setShowReadyToBlur] = useState(true); // Show intro screen first

  useEffect(() => {
    const topic = sectionsData.find((t) => t.id === topicId);
    if (!topic) return;

    const targetSubsection = topic.subsections.find((s) => s.id === subsectionId);
    if (!targetSubsection) return;

    setSubsectionTitle(targetSubsection.title);
    setCanonicalKeywords(targetSubsection.canonical_keywords);

    // Parse internal subsections from HTML
    const parsed = parseInternalSubsections(targetSubsection.content_html);
    setInternalSubsections(parsed);

    // Set first pair (first 2 internal subsections)
    const firstPair = parsed.slice(0, 2);
    setCurrentPairSubsections(firstPair);
    setExpandedSections([0]); // Auto-expand first

    // Calculate memorization time based on word count
    // Extract text from HTML and count words
    const textContent = firstPair.map(sub => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(sub.html, 'text/html');
      return doc.body.textContent || '';
    }).join(' ');
    
    const wordCount = textContent.trim().split(/\s+/).length;
    // 10 seconds per 50 words
    const seconds = Math.ceil((wordCount / 50) * 10);
    setMemorizationDuration(Math.max(30, seconds)); // Minimum 30 seconds

    // Get practice items for this subsection
    setAllPracticeItems(targetSubsection.practice_items);
    if (targetSubsection.practice_items.length > 0) {
      setCurrentPrompt(targetSubsection.practice_items[0]);
    }

    // Load timer preference
    const timerPref = localStorage.getItem("timerEnabled");
    if (timerPref === "true") {
      setTimerEnabled(true);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [topicId, subsectionId]);

  // Handle navigation state from Results page
  useEffect(() => {
    const state = location.state as any;
    if (state?.moveToNext) {
      handleMoveToNextSubsection();
      window.history.replaceState({}, document.title);
    } else if (state?.generateQuestion) {
      // Skip intro and study content, go straight to question generation
      setShowReadyToBlur(false);
      setShowStudyContent(false);
      setQuestionType(state.generateQuestion);
      setIsGeneratingQuestion(true);
      generateNewQuestion().finally(() => setIsGeneratingQuestion(false));
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Text selection handler for AI chatbot
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (text && text.length > 3) {
        setHighlightedText(text);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  useEffect(() => {
    if (timerEnabled && !showQuestionFeedback && !showStudyContent && !showFinalResults) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [timerEnabled, showQuestionFeedback, showStudyContent, showFinalResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const generateFeedback = (found: string[], missed: string[], answerLower: string, prompt: PracticeItem): string => {
    const totalTopics = prompt.feedback_guidance?.topic_coverage?.length || 0;
    let feedbackParts: string[] = [];

    // Check coverage of each topic
    if (prompt.feedback_guidance?.topic_coverage) {
      prompt.feedback_guidance.topic_coverage.forEach((topicGuide) => {
        const topicKeywordsFound = topicGuide.required_keywords.filter(kw => 
          answerLower.includes(kw.toLowerCase())
        );
        
        const coveragePercent = topicKeywordsFound.length / topicGuide.required_keywords.length;
        
        if (coveragePercent === 0) {
          feedbackParts.push(`❌ **${topicGuide.topic}**: ${topicGuide.feedback_if_missing}`);
        } else if (coveragePercent < 0.7) {
          feedbackParts.push(`⚠️ **${topicGuide.topic}**: ${topicGuide.feedback_if_partial}`);
        }
      });
    }

    // Generate positive feedback based on what they covered
    if (found.length > 0) {
      const keyIdeas = found.slice(0, 4).join(", ");
      const moreCount = found.length > 4 ? ` and ${found.length - 4} more` : "";
      feedbackParts.unshift(`✅ **Good work!** You included key ideas about ${keyIdeas}${moreCount}.`);
    }

    // If they missed important things
    if (missed.length > 0 && missed.length <= 3) {
      feedbackParts.push(`⚠️ **Key ideas missed**: You didn't mention ${missed.join(", ")}. Make sure to include these concepts.`);
    } else if (missed.length > 3) {
      feedbackParts.push(`⚠️ **Several key ideas missed**: Review the notes to cover ${missed.slice(0, 2).join(", ")} and ${missed.length - 2} other important concepts.`);
    }

    return feedbackParts.join("\n\n");
  };

  const calculateScore = (found: string[], missed: string[]): number => {
    // Better scoring: weight found items more heavily
    // If they covered most topics, score should be high even if they missed some keywords
    const totalKeywords = found.length + missed.length;
    if (totalKeywords === 0) return 0;
    
    // Give 70% base score if they covered at least half
    // Then add points for additional coverage
    const coverageRatio = found.length / totalKeywords;
    
    if (coverageRatio >= 0.8) return 90 + Math.round(coverageRatio * 10);
    if (coverageRatio >= 0.6) return 75 + Math.round(coverageRatio * 15);
    if (coverageRatio >= 0.4) return 55 + Math.round(coverageRatio * 20);
    if (coverageRatio >= 0.2) return 35 + Math.round(coverageRatio * 20);
    
    return Math.round(coverageRatio * 100);
  };

  const handleStartPractice = async () => {
    setShowQuestionTypeSelector(true);
  };

  const handleQuestionTypeSelected = async () => {
    setShowQuestionTypeSelector(false);
    setShowMemorizationTimer(true);
  };

  const handleMemorizationComplete = async () => {
    setShowMemorizationTimer(false);
    setIsGeneratingQuestion(true);
    try {
      await generateNewQuestion();
      setShowStudyContent(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const generateNewQuestion = async () => {
    setIsGeneratingQuestion(true);
    try {
      const studyContent = currentPairSubsections
        .map(sub => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(sub.html, 'text/html');
          return doc.body.textContent || '';
        })
        .join("\n\n");

      const endpoint = questionType === "exam" 
        ? "generate-varied-questions"
        : "generate-questions";

      // Get previously asked questions to avoid repetition
      const previousQuestions = generatedQuestions.map(q => q.question);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            studyContent,
            questionType,
            numQuestions: 1,
            previousQuestions, // Send previous questions to avoid repetition
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate question");
      }

      const result = await response.json();
      if (result.questions && result.questions.length > 0) {
        const newQuestion = result.questions[0];
        setCurrentGeneratedQuestion(newQuestion);
        setGeneratedQuestions([...generatedQuestions, newQuestion]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive"
      });
      console.error("Error generating question:", error);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty answer",
        description: "Please write something before submitting!",
        variant: "destructive"
      });
      return;
    }

    if (!currentGeneratedQuestion) return;

    // Show loading state
    toast({
      title: "AI is marking your answer...",
      description: "Please wait",
    });

    try {
      // Get the content from the current internal subsections for context
      const expectedContent = currentPairSubsections
        .map(sub => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(sub.html, 'text/html');
          return doc.body.textContent || '';
        })
        .join("\n\n");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mark-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            question: currentGeneratedQuestion.question,
            studentAnswer: userAnswer,
            expectedContent,
            marks: currentGeneratedQuestion.marks,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to mark answer");
      }

      const result = await response.json();

      const found = result.keyIdeasCovered || [];
      const missed = result.keyIdeasMissed || [];
      const feedback = result.feedback || "";

      const questionResult: QuestionResult = {
        questionIndex: questionResults.length,
        question: currentGeneratedQuestion.question,
        answer: userAnswer,
        keyIdeasCovered: found,
        keyIdeasMissed: missed,
        score: result.score,
        maxMarks: currentGeneratedQuestion.marks,
        feedbackText: feedback
      };
      setQuestionResults([...questionResults, questionResult]);

      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Navigate to Results page with feedback data
      navigate("/results", {
        state: {
          question: currentGeneratedQuestion.question,
          answer: userAnswer,
          keyIdeasCovered: found,
          keyIdeasMissed: missed,
          score: result.score,
          maxMarks: currentGeneratedQuestion.marks,
          feedbackText: feedback,
          topicId,
          subsectionId,
          subsectionTitle: currentPairSubsections.map(s => s.title).join(', '),
          questionType
        },
        replace: true // Force page refresh
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to mark answer",
        variant: "destructive"
      });
      console.error("Error marking answer:", error);
    }
  };

  const handleAnswerAnother = async (newQuestionType?: "blurt" | "exam") => {
    if (newQuestionType) {
      setQuestionType(newQuestionType);
    }
    setUserAnswer("");
    setShowQuestionFeedback(false);
    setKeywordsFound([]);
    setKeywordsMissed([]);
    setFeedbackText("");
    setTimeElapsed(0);
    setPhotoFeedback(null);
    setShowStudyContent(false); // Don't show study content again
    setIsGeneratingQuestion(true);
    try {
      await generateNewQuestion();
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleMoveToNextSubsection = async () => {
    // Check if there are more pairs within this subsection
    const nextPairIndex = currentPairIndex + 1;
    const nextPairStart = nextPairIndex * 2;
    
    if (nextPairStart < internalSubsections.length) {
      // Move to next pair within same subsection
      const nextPair = internalSubsections.slice(nextPairStart, nextPairStart + 2);
      setCurrentPairIndex(nextPairIndex);
      setCurrentPairSubsections(nextPair);
      setShowReadyToBlur(true); // Show ready screen for next pair
      setShowStudyContent(true);
      setCurrentQuestionIndex(0);
      setUserAnswer("");
      setShowQuestionFeedback(false);
      setExpandedSections([0]);
      setCurrentGeneratedQuestion(null);
      setGeneratedQuestions([]); // Reset questions for new pair
    } else {
      // No more pairs in this subsection, move to next subsection in topic
      const topic = sectionsData.find((t) => t.id === topicId);
      if (!topic) return;

      const currentSubsectionIndex = topic.subsections.findIndex((s) => s.id === subsectionId);
      const nextSubsection = topic.subsections[currentSubsectionIndex + 1];

      if (nextSubsection) {
        // Navigate to next subsection
        navigate(`/blur-practice/${topicId}/${nextSubsection.id}`);
      } else {
        // No more subsections in topic, show completion message
        toast({
          title: "Topic Complete!",
          description: "You've completed all subsections in this topic.",
        });
        navigate("/sections");
      }
    }
  };

  const analyzeKnowledgeGaps = async () => {
    if (questionResults.length === 0) return;
    
    setIsAnalyzingGaps(true);
    try {
      const studyContent = currentPairSubsections
        .map(sub => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(sub.html, 'text/html');
          return doc.body.textContent || '';
        })
        .join("\n\n");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-knowledge-gaps`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            studyContent,
            questionResults,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze knowledge gaps");
      }

      const result = await response.json();
      setKnowledgeGapAnalysis(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze knowledge gaps",
        variant: "destructive"
      });
      console.error("Error analyzing knowledge gaps:", error);
    } finally {
      setIsAnalyzingGaps(false);
    }
  };

  const getOverallScore = () => {
    if (questionResults.length === 0) return 0;
    const totalMarks = questionResults.reduce((sum, result) => sum + result.maxMarks, 0);
    const earnedMarks = questionResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round((earnedMarks / totalMarks) * 100);
  };

  const handleFinish = () => {
    navigate(`/topic/${topicId}`);
  };

  if (internalSubsections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <p className="text-muted-foreground">Practice not found</p>
            <Button onClick={() => navigate("/sections")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = questionResults.length > 0 ? (questionResults.length / (questionResults.length + 1)) * 100 : 0;
  const totalPairs = Math.ceil(internalSubsections.length / 2);

  // Ready to Blur intro screen
  if (showReadyToBlur) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topic
          </Button>

          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardHeader className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">✍️</div>
                <CardTitle className="text-3xl mb-2">Ready to Blur?</CardTitle>
                <p className="text-muted-foreground text-lg">
                  {subsectionTitle}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <p className="text-center text-lg">
                  AI will generate unique questions about what you just studied. Answer as many as you like before moving on!
                </p>
              </div>
              <Button 
                onClick={() => setShowReadyToBlur(false)} 
                size="lg" 
                className="w-full text-lg py-6"
              >
                Start Blurting Practice →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Study content screen
  if (showStudyContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topic
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant="secondary">
                  Pair {currentPairIndex + 1} of {totalPairs}
                </Badge>
              </div>
              <CardTitle className="text-2xl">Review Before Blurting</CardTitle>
              <p className="text-sm text-muted-foreground">
                {subsectionTitle}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Read these {currentPairSubsections.length} sections, then test your recall
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentPairSubsections.map((subsection, index) => (
                <Card key={index} className="overflow-hidden">
                  <Collapsible
                    open={expandedSections.includes(index)}
                    onOpenChange={() => toggleSection(index)}
                  >
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors py-3">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{subsection.title}</CardTitle>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedSections.includes(index) ? "transform rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CollapsibleTrigger>
                    </CardHeader>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <SectionContent html={subsection.html} />
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}

              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary">
                <h3 className="font-semibold text-lg mb-3">🎯 Time to Practice</h3>
                <p className="text-sm mb-4">
                  Choose your question type and start testing your knowledge!
                </p>
                <Button 
                  onClick={handleStartPractice} 
                  size="lg" 
                  className="w-full"
                  disabled={isGeneratingQuestion}
                >
                  {isGeneratingQuestion ? "Generating Question..." : "Choose Question Type →"}
                </Button>
              </div>

              {showQuestionTypeSelector && (
                <Card className="border-primary shadow-lg">
                  <CardHeader>
                    <CardTitle>Choose Question Type</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Select what type of questions you'd like to practice
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={questionType} onValueChange={(value: "blurt" | "exam") => setQuestionType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blurt">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">Blurt Questions</span>
                            <span className="text-xs text-muted-foreground">Quick recall questions to test memory</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="exam">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">Exam Questions</span>
                            <span className="text-xs text-muted-foreground">Varied AQA-style questions with mark schemes</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleQuestionTypeSelected} size="lg" className="w-full">
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              )}

              {showMemorizationTimer && (
                <MemorizationTimer 
                  duration={memorizationDuration}
                  onComplete={handleMemorizationComplete}
                />
              )}
            </CardContent>
          </Card>

          <AIChatbot 
            studyContent={currentPairSubsections.map(s => s.html).join('\n\n')}
            highlightedText={highlightedText}
          />
        </div>
      </div>
    );
  }

  // Final results screen
  if (showFinalResults) {
    const overallScore = getOverallScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl mb-2">Practice Complete! 🎉</CardTitle>
              <p className="text-muted-foreground">
                {subsectionTitle}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <p className="text-6xl font-bold text-primary mb-2">{overallScore}%</p>
                <p className="text-sm text-muted-foreground">
                  Answered {questionResults.length} questions
                </p>
              </div>

              {isAnalyzingGaps ? (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">AI is analyzing your knowledge gaps...</p>
                </div>
              ) : knowledgeGapAnalysis && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-lg mb-3">📊 Overall Assessment</h3>
                    <p className="text-sm">{knowledgeGapAnalysis.overallAssessment}</p>
                  </div>

                  {knowledgeGapAnalysis.strengths.length > 0 && (
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border-l-4 border-green-500">
                      <h3 className="font-semibold text-lg mb-3">✅ Your Strengths</h3>
                      <ul className="space-y-2">
                        {knowledgeGapAnalysis.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {knowledgeGapAnalysis.knowledgeGaps.length > 0 && (
                    <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-semibold text-lg mb-4">🎯 Knowledge Gaps to Address</h3>
                      <div className="space-y-4">
                        {knowledgeGapAnalysis.knowledgeGaps.map((gap, idx) => (
                          <div key={idx} className="bg-background/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">{gap.topic}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{gap.issue}</p>
                            <p className="text-sm text-primary">💡 {gap.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {knowledgeGapAnalysis.nextSteps.length > 0 && (
                    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border-l-4 border-purple-500">
                      <h3 className="font-semibold text-lg mb-3">📝 Next Steps</h3>
                      <ul className="space-y-2">
                        {knowledgeGapAnalysis.nextSteps.map((step, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-purple-500 mt-1">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Question Breakdown:</h3>
                {questionResults.map((result, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Question {idx + 1}</p>
                      <Badge variant={result.score >= result.maxMarks * 0.75 ? "default" : result.score >= result.maxMarks * 0.5 ? "secondary" : "destructive"}>
                        {result.score}/{result.maxMarks} marks
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{result.question}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-600">✓ {result.keyIdeasCovered.length} key ideas</span>
                      <span className="text-yellow-600">⚠ {result.keyIdeasMissed.length} missed</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 Next Steps</h3>
                <p className="text-sm mb-3">
                  {overallScore >= 80 
                    ? "Excellent work! You've mastered these sections. Ready for the next group?"
                    : overallScore >= 60
                    ? "Good effort! Review the missed key ideas and try another study group."
                    : "Review the sections again and retry to improve your score."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleFinish} className="flex-1" size="lg">
                  Choose Next Section
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowFinalResults(false);
                    setShowStudyContent(true);
                    setQuestionResults([]);
                    setTimeElapsed(0);
                    setCurrentGeneratedQuestion(null);
                    setKnowledgeGapAnalysis(null);
                  }} 
                  className="flex-1"
                >
                  Retry This Section
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topic
        </Button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">
              Question {questionResults.length + 1}
            </h1>
            {timerEnabled && !showQuestionFeedback && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
            )}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {subsectionTitle} • Pair {currentPairIndex + 1} of {totalPairs}
          </p>
        </div>

        {!currentGeneratedQuestion ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Generating question...</p>
          </Card>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="default">AI Generated</Badge>
                <Badge variant="default" className="bg-primary">{currentGeneratedQuestion.marks} marks</Badge>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Exam Question</h3>
                <div className="text-lg leading-relaxed space-y-2">
                  {currentGeneratedQuestion.question.split(/(?=\([a-z]\))/).map((part, idx) => {
                    const match = part.match(/^\(([a-z])\)\s*(.*)/);
                    if (match) {
                      return (
                        <div key={idx} className="pl-4">
                          <span className="font-semibold text-primary">{match[1]}) </span>
                          <span>{match[2]}</span>
                        </div>
                      );
                    }
                    return <div key={idx} className="font-medium">{part}</div>;
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!showQuestionFeedback ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-sm font-semibold mb-2">Your Answer:</p>
                    <Textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Write everything you remember here..."
                      className="min-h-[200px] text-base bg-background"
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button onClick={handleSubmit} className="flex-1" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Answer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                      size="lg"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>

                  {showPhotoUpload && currentGeneratedQuestion && (
                    <PhotoUpload
                      studyContent={currentPairSubsections.map(s => s.html).join('\n\n')}
                      questions={generatedQuestions.map(q => q.question)}
                      currentQuestion={currentGeneratedQuestion.question}
                      topicId={topicId || ''}
                      subsectionId={subsectionId || ''}
                      subsectionTitle={currentPairSubsections.map(s => s.title).join(', ')}
                      questionType={questionType}
                      marks={currentGeneratedQuestion.marks}
                    />
                  )}

                  {photoFeedback && (
                    <div className="space-y-4">
                      {/* AI Feedback */}
                      <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                          <span className="text-xl">📷</span>
                          Photo Feedback
                        </h3>
                        <div className="prose prose-sm max-w-none text-foreground">
                          <p className="text-sm whitespace-pre-line">{photoFeedback.feedbackText}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Key Ideas Covered */}
                        <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                          <h3 className="font-semibold text-base mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            Key Ideas Covered ({photoFeedback.keyIdeasCovered.length})
                          </h3>
                          <div className="space-y-2">
                            {photoFeedback.keyIdeasCovered.length > 0 ? (
                              photoFeedback.keyIdeasCovered.map((keyword, idx) => (
                                <div key={idx} className="p-3 bg-green-100 dark:bg-green-900/30 rounded-md text-sm text-green-900 dark:text-green-100">
                                  {keyword}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No key ideas covered</p>
                            )}
                          </div>
                        </div>

                        {/* Key Ideas Missed */}
                        <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                          <h3 className="font-semibold text-base mb-4 flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                            <span className="text-xl">⚠</span>
                            Key Ideas Missed ({photoFeedback.keyIdeasMissed.length})
                          </h3>
                          <div className="space-y-2">
                            {photoFeedback.keyIdeasMissed.length > 0 ? (
                              photoFeedback.keyIdeasMissed.map((keyword, idx) => (
                                <div key={idx} className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-md text-sm text-yellow-900 dark:text-yellow-100">
                                  {keyword}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">All key ideas covered!</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* User's Answer Display */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Your Answer:</p>
                    <p className="text-sm">{userAnswer}</p>
                  </div>

                  {/* AI Feedback */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <span className="text-xl">💡</span>
                      AI Feedback on Your Answer
                    </h3>
                    <div className="prose prose-sm max-w-none text-foreground">
                      <p className="text-sm whitespace-pre-line">{feedbackText}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Key Ideas Covered */}
                    <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                      <h3 className="font-semibold text-base mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        Key Ideas Covered ({keywordsFound.length})
                      </h3>
                      <div className="space-y-2">
                        {keywordsFound.length > 0 ? (
                          keywordsFound.map((keyword, idx) => (
                            <div key={idx} className="p-3 bg-green-100 dark:bg-green-900/30 rounded-md text-sm text-green-900 dark:text-green-100">
                              {keyword}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No key ideas covered</p>
                        )}
                      </div>
                    </div>

                    {/* Key Ideas Missed */}
                    <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                      <h3 className="font-semibold text-base mb-4 flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                        <span className="text-xl">⚠</span>
                        Key Ideas Missed ({keywordsMissed.length})
                      </h3>
                      <div className="space-y-2">
                        {keywordsMissed.length > 0 ? (
                          keywordsMissed.map((keyword, idx) => (
                            <div key={idx} className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-md text-sm text-yellow-900 dark:text-yellow-100">
                              {keyword}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">All key ideas covered!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Question Score */}
                  <div className="p-8 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-3">Question Score</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-6xl font-bold text-primary">
                        {Math.round((questionResults[questionResults.length - 1]?.score / questionResults[questionResults.length - 1]?.maxMarks) * 100) || 0}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {questionResults[questionResults.length - 1]?.score || 0}/{questionResults[questionResults.length - 1]?.maxMarks || 0} marks
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={() => handleAnswerAnother("blurt")} 
                        size="lg" 
                        variant="default" 
                        disabled={isGeneratingQuestion}
                      >
                        {isGeneratingQuestion && questionType === "blurt" ? "Generating..." : "Generate Blurt Question"}
                      </Button>
                      <Button 
                        onClick={() => handleAnswerAnother("exam")} 
                        size="lg" 
                        variant="default" 
                        disabled={isGeneratingQuestion}
                      >
                        {isGeneratingQuestion && questionType === "exam" ? "Generating..." : "Generate Exam Question"}
                      </Button>
                    </div>
                    <Button 
                      onClick={handleMoveToNextSubsection} 
                      size="lg" 
                      variant="outline"
                    >
                      Move to Next Section
                    </Button>
                    <Button 
                      onClick={() => navigate(`/sections/${topicId}`)} 
                      size="lg" 
                      variant="secondary"
                    >
                      Go to Notes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <AIChatbot 
          studyContent={currentPairSubsections.map(s => s.html).join('\n\n')}
          highlightedText={highlightedText}
        />
      </div>
    </div>
  );
};

export default BlurPractice;
