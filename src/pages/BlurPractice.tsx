import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Send, BookOpen, CheckCircle, ChevronDown, Camera, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, PracticeItem } from "@/data/sectionsData";
import { physicsData } from "@/data/physicsData";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import SectionContent from "@/components/SectionContent";
import { AIChatbot } from "@/components/AIChatbot";
import { PhotoUpload } from "@/components/PhotoUpload";
import { DrawingCanvas } from "@/components/DrawingCanvas";
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
  const [showQuestionTypeSelector, setShowQuestionTypeSelector] = useState(true);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState<PhotoFeedbackData | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [showMemorizationTimer, setShowMemorizationTimer] = useState(false);
  const [memorizationDuration, setMemorizationDuration] = useState(180); // 3 minutes default
  const [showTimerSection, setShowTimerSection] = useState(true);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState<"blurt" | "exam" | null>(null);
  const [pendingGenerateType, setPendingGenerateType] = useState<"blurt" | "exam" | null>(null);
  const [pendingMoveToNext, setPendingMoveToNext] = useState(false);
  const [targetPairIndex, setTargetPairIndex] = useState<number | null>(null);
  const [pairReady, setPairReady] = useState(false);

  // Persist current pair index for robustness across navigations (only after pair is initialized)
  useEffect(() => {
    if (!topicId || !subsectionId) return;
    if (internalSubsections.length === 0 || currentPairSubsections.length === 0) return;
    try {
      sessionStorage.setItem(`bp:${topicId}:${subsectionId}:pairIndex`, String(currentPairIndex));
    } catch {}
  }, [currentPairIndex, topicId, subsectionId, internalSubsections.length, currentPairSubsections.length]);

  useEffect(() => {
    // Determine dataset: prefer URL flag, otherwise infer from topic id presence in physics data
    const urlSaysPhysics = location.pathname.includes('/physics/');
    const topicLooksPhysics = physicsData.some((t) => t.id === topicId);
    const isPhysics = urlSaysPhysics || topicLooksPhysics;
    const dataSource = isPhysics ? physicsData : sectionsData;
    
    console.log('BlurPractice - Looking for:', { 
      topicId, 
      subsectionId, 
      isPhysics,
      reason: { urlSaysPhysics, topicLooksPhysics }, 
      pathname: location.pathname,
      availableTopics: dataSource.map(t => t.id)
    });
    
    const topic = dataSource.find((t) => t.id === topicId);
    if (!topic) {
      console.error('Topic not found:', topicId);
      toast({
        title: "Topic Not Found",
        description: `Could not find topic: ${topicId}`,
        variant: "destructive"
      });
      return;
    }

    console.log('Found topic:', topic.title, 'Available subsections:', topic.subsections.map(s => s.id));

    const targetSubsection = topic.subsections.find((s) => s.id === subsectionId);
    if (!targetSubsection) {
      console.error('Subsection not found:', subsectionId);
      toast({
        title: "Subsection Not Found",
        description: `Could not find subsection: ${subsectionId}`,
        variant: "destructive"
      });
      return;
    }

    setSubsectionTitle(targetSubsection.title);
    setCanonicalKeywords(targetSubsection.canonical_keywords);

    // Parse internal subsections from HTML
    const parsed = parseInternalSubsections(targetSubsection.content_html);
    setInternalSubsections(parsed);

    // Restore last viewed pair from sessionStorage (default to first pair)
    const totalPairsLocal = Math.ceil(parsed.length / 2);
    let restoredIndex = 0;
    try {
      const saved = sessionStorage.getItem(`bp:${topicId}:${subsectionId}:pairIndex`);
      const n = saved !== null ? parseInt(saved, 10) : NaN;
      if (!isNaN(n) && n >= 0 && n < totalPairsLocal) restoredIndex = n;
    } catch {}

    const startIdx = restoredIndex * 2;
    const initialPair = parsed.slice(startIdx, startIdx + 2);
    setCurrentPairIndex(restoredIndex);
    setCurrentPairSubsections(initialPair);
    setExpandedSections([0]); // Auto-expand first

    // Calculate memorization time based on word count for the restored pair
    // Extract text from HTML and count words
    const textContent = initialPair.map(sub => {
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
      console.log("Move to next requested, setting pending", { 
        internalLen: internalSubsections.length, 
        pairLen: currentPairSubsections.length,
        stateCurrentPairIndex: state.currentPairIndex,
        currentPairIndexBefore: currentPairIndex
      });
      // Restore the current pair index from navigation state FIRST
      if (typeof state.currentPairIndex === 'number') {
        console.log("Restoring currentPairIndex from state:", state.currentPairIndex);
        setCurrentPairIndex(state.currentPairIndex);
      } else {
        console.warn("No currentPairIndex in navigation state, staying at:", currentPairIndex);
      }
      // Preserve question type if provided
      if (state.keepType) {
        setQuestionType(state.keepType);
      }
      setPendingMoveToNext(true);
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    } else if (state?.generateQuestion) {
      console.log("Generate question requested from Results", {
        generateQuestion: state.generateQuestion,
        stateCurrentPairIndex: state.currentPairIndex,
        currentPairIndexBefore: currentPairIndex
      });
      // Skip intro and study content, go straight to question generation
      setShowTimerSection(false);
      setShowStudyContent(false);
      setTimerStarted(false);
      setQuestionType(state.generateQuestion);
      // Set target pair index from navigation state
      const restoredPairIndex = typeof state.currentPairIndex === 'number' ? state.currentPairIndex : currentPairIndex;
      console.log("Setting targetPairIndex to:", restoredPairIndex);
      setTargetPairIndex(restoredPairIndex);
      // Restore previous question results if coming back from results page
      if (state.previousQuestionResults) {
        setQuestionResults(state.previousQuestionResults);
      }
      setIsGeneratingQuestion(true);
      setPendingGenerateType(state.generateQuestion);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Materialize pair from targetPairIndex
  useEffect(() => {
    if (internalSubsections.length === 0 || targetPairIndex === null) {
      return;
    }
    
    console.log("Materializing pair from targetPairIndex", {
      targetPairIndex,
      internalSubsectionsCount: internalSubsections.length
    });
    
    const start = targetPairIndex * 2;
    const nextPair = internalSubsections.slice(start, start + 2);
    
    console.log("Setting currentPairIndex and currentPairSubsections", {
      currentPairIndex: targetPairIndex,
      pairTitles: nextPair.map(s => s.title)
    });
    
    setCurrentPairIndex(targetPairIndex);
    setCurrentPairSubsections(nextPair);
    setPairReady(true);
    
    // Clear target after materializing
    setTargetPairIndex(null);
  }, [internalSubsections, targetPairIndex]);

  // Execute pending move to next when data is ready AND currentPairIndex is restored
  useEffect(() => {
    if (pendingMoveToNext && internalSubsections.length > 0 && currentPairSubsections.length > 0) {
      console.log("Executing pending moveToNext", { 
        currentPairIndex, 
        internalLen: internalSubsections.length,
        pairLen: currentPairSubsections.length
      });
      handleMoveToNextSubsection();
      setPendingMoveToNext(false);
    }
  }, [pendingMoveToNext, internalSubsections, currentPairSubsections, currentPairIndex]);

  // Wait for content to be ready and pairReady before generating question
  useEffect(() => {
    if (pendingGenerateType && pairReady && currentPairSubsections.length > 0) {
      console.log("Ready to generate question", {
        pendingGenerateType,
        currentPairIndex,
        pairTitles: currentPairSubsections.map(s => s.title)
      });
      generateNewQuestion(pendingGenerateType)
        .finally(() => {
          setIsGeneratingQuestion(false);
          setPendingGenerateType(null);
          setPairReady(false);
        });
    }
  }, [pendingGenerateType, pairReady, currentPairIndex, currentPairSubsections]);

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

  // Get cumulative subsections up to current pair
  const getCumulativeSubsections = () => {
    const end = Math.min(internalSubsections.length, (currentPairIndex + 1) * 2);
    return internalSubsections.slice(0, end);
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
    setShowTimerSection(false);
    setShowStudyContent(true);
    setTimerStarted(true);
    setShowMemorizationTimer(true);
  };

  const handleMemorizationComplete = async () => {
    setShowMemorizationTimer(false);
    setShowStudyContent(false);
    setIsGeneratingQuestion(true);
    try {
      await generateNewQuestion();
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

  // Build study content from cumulative pairs up to current pair
  const buildStudyContent = (): string => {
    // Build cumulative content from all pairs up to current pair
    const cumulative = getCumulativeSubsections();
    const contentText = cumulative.map(sub => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(sub.html, 'text/html');
      return doc.body.textContent || '';
    }).join('\n\n').trim();
    
    console.log("buildStudyContent - cumulative", {
      currentPairIndex,
      cumulativeCount: cumulative.length,
      studyChars: contentText.length,
      titles: cumulative.map(s => s.title)
    });
    
    return contentText;
  };

  // Build study content ONLY from the current pair (not cumulative)
  const buildPairContent = (): string => {
    const contentText = currentPairSubsections.map(sub => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(sub.html, 'text/html');
      return doc.body.textContent || '';
    }).join('\n\n').trim();

    console.log("buildPairContent - pair-only", {
      currentPairIndex,
      pairTitles: currentPairSubsections.map(s => s.title),
      studyChars: contentText.length
    });

    return contentText;
  };

  const generateNewQuestion = async (typeOverride?: "blurt" | "exam") => {
    setIsGeneratingQuestion(true);
    const qType = typeOverride ?? questionType;
    const studyContent = buildPairContent();
    
    console.log("generateNewQuestion CALLED", {
      qType,
      endpoint: qType === "exam" ? "generate-varied-questions" : "generate-questions",
      currentPairIndex,
      pairTitles: currentPairSubsections.map(s => s.title),
      studyChars: studyContent.length,
      previousQuestionsCount: generatedQuestions.length
    });
    
    try {

      const endpoint = qType === "exam" 
        ? "generate-varied-questions"
        : "generate-questions";

      // Get previously asked questions to avoid repetition
      const previousQuestions = generatedQuestions.map(q => q.question);

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${endpoint}`;
      const payload = {
        studyContent,
        questionType: qType,
        numQuestions: 1,
        previousQuestions,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      } as const;

      const doFetch = () =>
        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

      let response = await doFetch();

      if (!response.ok) {
        let message = "";
        try {
          const j = await response.json();
          message = j?.error || "";
        } catch {}

        // Surface rate limit/credits properly and attempt a single auto-retry on 429
        if (response.status === 429) {
          toast({
            title: "Please wait a moment",
            description: "AI rate limit hit. Retrying in 1.5s…",
          });
          await new Promise((r) => setTimeout(r, 1500));
          response = await doFetch();
        } else if (response.status === 402) {
          toast({
            title: "AI credits needed",
            description: message || "Add credits to continue generating questions.",
            variant: "destructive",
          });
          return;
        } else {
          throw new Error(message || "Failed to generate question");
        }
      }

      let result = await response.json();

      // If no questions returned, try once more quickly
      if (!result?.questions?.length) {
        await new Promise((r) => setTimeout(r, 500));
        const retry = await doFetch();
        if (retry.ok) result = await retry.json();
      }

      if (result?.questions && result.questions.length > 0) {
        const newQuestion = result.questions[0];
        setCurrentGeneratedQuestion(newQuestion);
        setGeneratedQuestions([...generatedQuestions, newQuestion]);
      } else {
        // Client-side safe fallback to avoid error toast
        const stop = new Set(["the","a","an","and","or","but","if","then","than","that","this","these","those","is","are","was","were","be","been","being","to","of","in","on","for","as","at","by","with","from","it","its","their","there","which","who","whom","into","out","about","over","under","between","within","also","can","may","might","should","would"]);
        const textAll = studyContent.toLowerCase();
        const words = textAll.split(/[^a-z0-9-]+/g).filter(w => w && w.length > 2 && !stop.has(w));
        const freq: Record<string, number> = {};
        for (const w of words) freq[w] = (freq[w] || 0) + 1;
        const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(([w])=>w);
        const top1 = sorted[0] || "key term";
        const top2 = sorted[1];
        const qText = qType === "exam"
          ? (top2 ? `Explain how ${top1} and ${top2} relate in these notes.` : `Explain ${top1} using these notes.`)
          : `Define: ${top1}`;
        const fallback = { question: qText, marks: qType === "exam" ? 3 : 1, expectedKeyPoints: top2 ? [top1, top2] : [top1] };
        setCurrentGeneratedQuestion(fallback);
        setGeneratedQuestions([...generatedQuestions, fallback]);
      }
    } catch (error) {
      // Final safety: generate a minimal on-notes fallback instead of erroring
      const stop = new Set(["the","a","an","and","or","but","if","then","than","that","this","these","those","is","are","was","were","be","been","being","to","of","in","on","for","as","at","by","with","from","it","its","their","there","which","who","whom","into","out","about","over","under","between","within","also","can","may","might","should","would"]);
      const textAll = studyContent.toLowerCase();
      const words = textAll.split(/[^a-z0-9-]+/g).filter(w => w && w.length > 2 && !stop.has(w));
      const freq: Record<string, number> = {};
      for (const w of words) freq[w] = (freq[w] || 0) + 1;
      const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(([w])=>w);
      const top1 = sorted[0] || "key term";
      const top2 = sorted[1];
      const qText = qType === "exam"
        ? (top2 ? `Explain how ${top1} and ${top2} relate in these notes.` : `Explain ${top1} using these notes.`)
        : `Define: ${top1}`;
      const fallback = { question: qText, marks: qType === "exam" ? 3 : 1, expectedKeyPoints: top2 ? [top1, top2] : [top1] };
      setCurrentGeneratedQuestion(fallback);
      setGeneratedQuestions([...generatedQuestions, fallback]);
      console.warn("Generate question fallback used:", error);
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
      // Build expected content from current pair only (same as question generation)
      const expectedContent = buildPairContent();
      
      console.log("handleSubmit - marking against pair content", {
        currentPairIndex,
        pairTitles: currentPairSubsections.map(s => s.title),
        expectedChars: expectedContent.length,
        marks: currentGeneratedQuestion.marks
      });

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
      console.log("Navigating to Results with currentPairIndex:", currentPairIndex);
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
          questionType,
          currentPairIndex, // Pass current pair index
          previousQuestionResults: questionResults // Preserve question history
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
      await generateNewQuestion(newQuestionType);
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
      const nextCumulative = internalSubsections.slice(0, nextPairStart + 2);
      
      console.log("Moving to next pair", {
        currentPairIndexBefore: currentPairIndex,
        nextPairIndex,
        nextPairStart,
        pairTitles: nextPair.map(s => s.title),
        cumulativeNextCount: nextCumulative.length,
        titlesIncluded: nextCumulative.map(s => s.title),
        totalPairs: Math.ceil(internalSubsections.length / 2)
      });
      
      setCurrentPairIndex(nextPairIndex);
      setCurrentPairSubsections(nextPair);
      
      // Recalculate memorization time for the new pair
      const textContent = nextPair.map(sub => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(sub.html, 'text/html');
        return doc.body.textContent || '';
      }).join(' ');
      
      const wordCount = textContent.trim().split(/\s+/).length;
      const seconds = Math.ceil((wordCount / 50) * 10);
      setMemorizationDuration(Math.max(30, seconds));
      
      // Reset UI state for new pair (but keep generatedQuestions for cumulative tracking)
      setShowTimerSection(false);
      setShowStudyContent(true);
      setShowMemorizationTimer(true);
      setTimerStarted(true);
      setShowQuestionTypeSelector(false);
      setCurrentQuestionIndex(0);
      setUserAnswer("");
      setShowQuestionFeedback(false);
      setShowFinalResults(false);
      setExpandedSections([0]);
      setCurrentGeneratedQuestion(null);
      setQuestionResults([]);
      setTimeElapsed(0);
      setSelectedQuestionType(null);
      
      toast({
        title: "Moving to Next Pair",
        description: `Now showing pair ${nextPairIndex + 1} of ${Math.ceil(internalSubsections.length / 2)}`
      });
    } else {
      // No more pairs in this subsection, move to next subsection in topic
      const urlSaysPhysics = location.pathname.includes('/physics/');
      const topicLooksPhysics = physicsData.some((t) => t.id === topicId);
      const isPhysics = urlSaysPhysics || topicLooksPhysics;
      const dataSource = isPhysics ? physicsData : sectionsData;
      
      const topic = dataSource.find((t) => t.id === topicId);
      if (!topic) return;

      const currentSubsectionIndex = topic.subsections.findIndex((s) => s.id === subsectionId);
      const nextSubsection = topic.subsections[currentSubsectionIndex + 1];

      if (nextSubsection) {
        // Navigate to next subsection with correct path prefix
        const pathPrefix = isPhysics ? '/physics/blur-practice' : '/blur-practice';
        navigate(`${pathPrefix}/${topicId}/${nextSubsection.id}`);
      } else {
        // No more subsections in topic, show completion message
        toast({
          title: "Topic Complete!",
          description: "You've completed all subsections in this topic.",
        });
        const backPath = isPhysics ? "/physics/sections" : "/sections";
        navigate(backPath);
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
    const urlSaysPhysics = location.pathname.includes('/physics/');
    const topicLooksPhysics = physicsData.some((t) => t.id === topicId);
    const isPhysics = urlSaysPhysics || topicLooksPhysics;
    const topicPath = isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`;
    navigate(topicPath);
  };

  if (internalSubsections.length === 0) {
    const urlSaysPhysics = location.pathname.includes('/physics/');
    const topicLooksPhysics = physicsData.some((t) => t.id === topicId);
    const isPhysics = urlSaysPhysics || topicLooksPhysics;
    const backPath = isPhysics ? "/physics/sections" : "/sections";
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">Practice Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-center">
              Could not load practice content for this subsection. Please check the console for details or try another topic.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate(backPath)} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = questionResults.length > 0 ? (questionResults.length / (questionResults.length + 1)) * 100 : 0;
  const totalPairs = Math.ceil(internalSubsections.length / 2);

  // Determine navigation path based on subject
  const isPhysics = location.pathname.includes('/physics/');
  const topicPath = isPhysics ? `/physics/topic/${topicId}` : `/topic/${topicId}`;

  // Time to Practice & Memorization Timer intro screen
  if (showTimerSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(topicPath)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topic
          </Button>

          <Card className="mb-6 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                🎯 Choose Your Question Type
              </h2>
              <p className="text-muted-foreground text-lg">
                Select what type of questions you'd like to practice before studying
              </p>
            </div>
          </Card>

          {showQuestionTypeSelector && (
            <Card className="mb-6 border-primary shadow-lg">
              <CardHeader>
                <CardTitle>Question Type</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the type of question you want to practice after the blurt. Blurt Question is recommended, and after that exam questions.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button
                    onClick={() => {
                      setQuestionType('blurt');
                      handleQuestionTypeSelected();
                    }}
                    size="lg"
                    className="w-full h-auto py-6 flex flex-col gap-2"
                  >
                    <span className="text-lg font-semibold">Blurt Question</span>
                    <span className="text-xs opacity-80">Write everything you remember</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setQuestionType('exam');
                      handleQuestionTypeSelected();
                    }}
                    size="lg"
                    variant="outline"
                    className="w-full h-auto py-6 flex flex-col gap-2"
                  >
                    <span className="text-lg font-semibold">Exam Question</span>
                    <span className="text-xs opacity-80">Answer a specific exam-style question</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    );
  }

  // Study content screen
  if (showStudyContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(topicPath)} className="mb-4">
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
            </CardContent>
          </Card>


          {showMemorizationTimer && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <MemorizationTimer 
                  duration={memorizationDuration}
                  onComplete={handleMemorizationComplete}
                />
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
        <Button variant="ghost" onClick={() => navigate(topicPath)} className="mb-4">
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
                <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                  {questionType === "exam" ? "Exam Question" : "Blurt Question"}
                </h3>
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
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDrawingCanvas(!showDrawingCanvas)}
                      size="lg"
                    >
                      <Pen className="mr-2 h-4 w-4" />
                      Draw
                    </Button>
                  </div>

                  {showPhotoUpload && currentGeneratedQuestion && (
                    <PhotoUpload
                      studyContent={buildPairContent()}
                      questions={generatedQuestions.map(q => q.question)}
                      currentQuestion={currentGeneratedQuestion.question}
                      topicId={topicId || ''}
                      subsectionId={subsectionId || ''}
                      subsectionTitle={currentPairSubsections.map(s => s.title).join(', ')}
                      questionType={questionType}
                      marks={currentGeneratedQuestion.marks}
                    />
                  )}

                  {showDrawingCanvas && currentGeneratedQuestion && (
                    <DrawingCanvas
                      studyContent={buildPairContent()}
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
