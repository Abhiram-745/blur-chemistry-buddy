import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { productDesignData, type TopicSection } from "@/data/productDesignData";
import SectionContent from "@/components/SectionContent";
import ColorLegend from "@/components/ColorLegend";
import PracticeExamQuestions from "@/components/PracticeExamQuestions";

const ProductDesignTopicView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<TopicSection | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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

  const startSubsectionPractice = (subsectionId: string) => {
    navigate(`/product-design/blur-practice/${id}/${subsectionId}`);
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
          <Button variant="ghost" onClick={() => navigate("/product-design/sections")} className="mb-6">
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
        <Button variant="ghost" onClick={() => navigate("/product-design/sections")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>

        <h1 className="text-4xl font-bold mb-2">{topic.title}</h1>
        <p className="text-muted-foreground mb-8">{topic.subsections.length} subsections</p>

        <ColorLegend />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {topic.subsections.map((subsection) => (
            <Card key={subsection.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{subsection.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => startSubsectionPractice(subsection.id)}
                >
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
    </div>
  );
};

export default ProductDesignTopicView;
