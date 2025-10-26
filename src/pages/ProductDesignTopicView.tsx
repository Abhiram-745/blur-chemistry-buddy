import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { productDesignData, type TopicSection } from "@/data/productDesignData";
import SectionContent from "@/components/SectionContent";
import ColorLegend from "@/components/ColorLegend";
import PracticeExamQuestions from "@/components/PracticeExamQuestions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductDesignTopicView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<TopicSection | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showPracticeDialog, setShowPracticeDialog] = useState(false);
  const [selectedSubsectionId, setSelectedSubsectionId] = useState<string | null>(null);

  useEffect(() => {
    const foundTopic = productDesignData.find((t) => t.id === id);
    setTopic(foundTopic || null);
    
    if (foundTopic?.status === "ready" && foundTopic.subsections.length > 0) {
      setOpenSections({ [foundTopic.subsections[0].id]: true });
    }
  }, [id]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const openPracticeDialog = (subsectionId: string) => {
    setSelectedSubsectionId(subsectionId);
    setShowPracticeDialog(true);
  };

  const startBlurtPractice = () => {
    if (selectedSubsectionId) {
      navigate(`/product-design/blur-practice/${id}/${selectedSubsectionId}`);
    }
  };

  const startExamPractice = () => {
    if (selectedSubsectionId) {
      // Navigate to exam practice - for now using same route, can be changed later
      navigate(`/product-design/blur-practice/${id}/${selectedSubsectionId}?mode=exam`);
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  if (topic.status === "coming_soon") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/product-design/sections/specialist-technical")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>
          <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">This topic is coming soon!</p>
        </div>
      </div>
    );
  }

  const allSubsectionContent = topic.subsections
    .map((sub) => sub.content_html)
    .join("\n\n");
  const allSubsections = topic.subsections.map((sub) => ({
    title: sub.title,
    content: sub.content_html
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/product-design/sections/specialist-technical")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>

        <h1 className="text-4xl font-bold mb-2">{topic.title}</h1>
        <p className="text-muted-foreground mb-8">{topic.subsections.length} subsections</p>

        <ColorLegend />

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {topic.subsections.map((subsection, index) => (
            <Card key={subsection.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3">{subsection.title}</CardTitle>
                    <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-4">
                      {subsection.practice_items?.length || 0} questions
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => openPracticeDialog(subsection.id)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Full Study Notes</h2>
          {topic.subsections.map((subsection) => (
            <Collapsible
              key={subsection.id}
              open={openSections[subsection.id]}
              onOpenChange={() => toggleSection(subsection.id)}
            >
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg">{subsection.title}</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openSections[subsection.id] ? "rotate-180" : ""
                      }`}
                    />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <SectionContent html={subsection.content_html} />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        <PracticeExamQuestions
          sectionContent={allSubsectionContent}
          sectionTitle={topic.title}
          subsections={allSubsections}
        />
      </div>

      <Dialog open={showPracticeDialog} onOpenChange={setShowPracticeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Practice Mode</DialogTitle>
            <DialogDescription>
              Select how you'd like to practice this subsection
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              size="lg"
              className="w-full h-auto py-6 flex-col gap-2"
              onClick={startBlurtPractice}
            >
              <BookOpen className="h-6 w-6" />
              <div>
                <div className="font-semibold">Blurt Question</div>
                <div className="text-xs font-normal opacity-80">Active recall practice</div>
              </div>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full h-auto py-6 flex-col gap-2"
              onClick={startExamPractice}
            >
              <FileText className="h-6 w-6" />
              <div>
                <div className="font-semibold">Exam Question</div>
                <div className="text-xs font-normal opacity-80">Exam-style practice</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDesignTopicView;
