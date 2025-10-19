import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadProps {
  studyContent: string;
  questions: string[];
  currentQuestion: string;
  topicId: string;
  subsectionId: string;
  subsectionTitle: string;
  questionType: "blurt" | "exam";
  marks: number;
}

export const PhotoUpload = ({ studyContent, questions, currentQuestion, topicId, subsectionId, subsectionTitle, questionType, marks }: PhotoUploadProps) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            if (file.size > 10 * 1024 * 1024) {
              toast.error("File too large. Maximum size is 10MB.");
              return;
            }
            
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            toast.success("Image pasted successfully!");
          }
          event.preventDefault();
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const processClipboardItems = (items?: DataTransferItemList | null) => {
    if (!items) return false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          if (file.size > 10 * 1024 * 1024) {
            toast.error("File too large. Maximum size is 10MB.");
            return true;
          }
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onloadend = () => setPreviewUrl(reader.result as string);
          reader.readAsDataURL(file);
          toast.success("Image pasted successfully!");
          return true;
        }
      }
    }
    return false;
  };

  const handleReactPaste = (event: React.ClipboardEvent) => {
    const handled = processClipboardItems(event.clipboardData?.items);
    if (handled) event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large. Maximum size is 10MB.");
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsAnalyzing(true);
    try {
    const { data, error } = await supabase.functions.invoke('analyze-photo-answer', {
      body: {
        imageBase64: previewUrl,
        studyContent,
        questions,
        maxMarks: marks
      }
    });

      if (error) throw error;

      toast.success("Photo analyzed successfully!");
      
      // Navigate to Results page with feedback
      navigate("/results", {
        state: {
          question: currentQuestion,
          answer: data.extractedText || "Photo answer submitted",
          keyIdeasCovered: data.keyIdeasCovered || [],
          keyIdeasMissed: data.keyIdeasMissed || [],
          score: data.score || 0,
          maxMarks: marks,
          feedbackText: data.feedbackText || '',
          topicId,
          subsectionId,
          subsectionTitle,
          questionType,
          photoImage: previewUrl
        }
      });
    } catch (error) {
      console.error('Error analyzing photo:', error);
      toast.error("Failed to analyze photo. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="text-lg">Upload Photo of Your Answers</CardTitle>
      </CardHeader>
      <CardContent onPaste={handleReactPaste}>
        {!previewUrl ? (
          <label
            tabIndex={0}
            role="button"
            onPaste={handleReactPaste}
            className="flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload, drag and drop, or paste (Ctrl+V)</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto rounded-lg max-h-96 object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze My Answers"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};