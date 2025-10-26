import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, BookOpen, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { productDesignData, TopicSection } from "@/data/productDesignData";

const ProductDesignSections = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = productDesignData.filter((section: TopicSection) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/product-design/chapters")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chapters
        </Button>

        <h1 className="text-4xl font-bold mb-2">GCSE AQA Product Design Topics</h1>
        <p className="text-muted-foreground mb-8">Chapter 2: Specialist Technical Principles</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section: TopicSection) => (
            <Card
              key={section.id}
              className={`hover:shadow-lg transition-all cursor-pointer animate-fade-in hover:scale-[1.02] ${
                section.status === "coming_soon" ? "opacity-75" : ""
              }`}
              onClick={() => navigate(`/product-design/topic/${section.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  {section.status === "ready" ? (
                    <Badge variant="default" className="text-xs">
                      Ready
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {section.status === "ready" ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">
                        {section.subsections.length} subsections available
                      </p>
                      <p className="text-xs text-primary font-medium">
                        Click to view content & practice blurting
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This topic is coming soon.
                    </p>
                  )}
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  variant={section.status === "ready" ? "default" : "outline"}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  {section.status === "ready" ? "Start Practice" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-muted-foreground">No topics found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDesignSections;
