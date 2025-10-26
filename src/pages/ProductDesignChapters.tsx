import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, BookOpen } from "lucide-react";

const ProductDesignChapters = () => {
  const navigate = useNavigate();

  const chapters = [
    {
      id: "core-technical",
      title: "Core Technical Principles",
      status: "locked",
      description: "Fundamental principles"
    },
    {
      id: "specialist-technical",
      title: "Specialist Technical Principles",
      status: "ready",
      description: "8 topics available",
      topicCount: 8
    },
    {
      id: "designing-making",
      title: "Designing and Making Principles",
      status: "locked",
      description: "Design methodology"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/product-design/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold mb-2">GCSE AQA Product Design</h1>
        <p className="text-muted-foreground mb-8">Select a chapter to explore</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              className={`${
                chapter.status === "locked"
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-lg transition-all cursor-pointer"
              }`}
              onClick={() => {
                if (chapter.status === "ready") {
                  navigate(`/product-design/sections/${chapter.id}`);
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    {chapter.status === "locked" ? (
                      <Lock className="h-6 w-6 text-white" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-white" />
                    )}
                  </div>
                  {chapter.status === "ready" ? (
                    <Badge className="bg-primary">Ready</Badge>
                  ) : (
                    <Badge variant="secondary">Locked</Badge>
                  )}
                </div>
                <CardTitle className="text-xl mb-2">{chapter.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{chapter.description}</p>
              </CardHeader>
              <CardContent>
                {chapter.status === "ready" ? (
                  <Button className="w-full">View Topics</Button>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    No Content Available
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDesignChapters;
