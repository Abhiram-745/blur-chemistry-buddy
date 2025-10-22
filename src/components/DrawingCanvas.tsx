import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eraser, Trash2, Loader2, Pen } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DrawingCanvasProps {
  studyContent: string;
  questions: string[];
  currentQuestion: string;
  topicId: string;
  subsectionId: string;
  subsectionTitle: string;
  questionType: "blurt" | "exam";
  marks: number;
}

export const DrawingCanvas = ({ 
  studyContent, 
  questions, 
  currentQuestion, 
  topicId, 
  subsectionId, 
  subsectionTitle, 
  questionType, 
  marks 
}: DrawingCanvasProps) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // Set drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setContext(ctx);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;

    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    if (isEraser) {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 20;
    } else {
      context.globalCompositeOperation = "source-over";
      context.lineWidth = 2;
    }

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    toast.success("Canvas cleared!");
  };

  const handleAnalyze = async () => {
    if (!canvasRef.current) return;

    setIsAnalyzing(true);
    try {
      const imageBase64 = canvasRef.current.toDataURL("image/png");

      const { data, error } = await supabase.functions.invoke('analyze-photo-answer', {
        body: {
          imageBase64,
          studyContent,
          questions,
          maxMarks: marks
        }
      });

      if (error) throw error;

      toast.success("Drawing analyzed successfully!");
      
      navigate("/results", {
        state: {
          question: currentQuestion,
          answer: data.extractedText || "Drawing answer submitted",
          keyIdeasCovered: data.keyIdeasCovered || [],
          keyIdeasMissed: data.keyIdeasMissed || [],
          score: data.score || 0,
          maxMarks: marks,
          feedbackText: data.feedbackText || '',
          topicId,
          subsectionId,
          subsectionTitle,
          questionType,
          photoImage: imageBase64
        }
      });
    } catch (error) {
      console.error('Error analyzing drawing:', error);
      toast.error("Failed to analyze drawing. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Draw Your Answer</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={isEraser ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEraser(!isEraser)}
            >
              {isEraser ? <Pen className="h-4 w-4" /> : <Eraser className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCanvas}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          className="w-full border border-border rounded-lg touch-none cursor-crosshair bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
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
            "Analyze My Drawing"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
