import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { productDesignData } from "@/data/productDesignData";

const ProductDesignSections = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = productDesignData.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <h1 className="text-4xl font-bold mb-2">Product Design Topics</h1>
        <p className="text-muted-foreground mb-8">Chapter 2: Specialist Technical Principles</p>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section) => (
            <Card
              key={section.id}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => section.status === "ready" && navigate(`/product-design/topic/${section.id}`)}
            >
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>
                  {section.status === "ready" ? "Ready to study" : "Coming soon"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={section.status === "ready" ? "default" : "outline"}
                  disabled={section.status !== "ready"}
                >
                  {section.status === "ready" ? "Start Learning" : "Not Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDesignSections;
