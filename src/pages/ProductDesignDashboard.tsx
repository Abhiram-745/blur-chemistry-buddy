import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Clock, ArrowLeft } from "lucide-react";

const ProductDesignDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/subjects")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subjects
        </Button>

        <h1 className="text-4xl font-bold mb-2">Product Design Dashboard</h1>
        <p className="text-muted-foreground mb-8">GCSE AQA Product Design - Chapter 2: Specialist Technical Principles</p>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate("/product-design/sections")}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Browse Topics</CardTitle>
              <CardDescription>Explore Chapter 2 content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Topics</Button>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your study history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDesignDashboard;
