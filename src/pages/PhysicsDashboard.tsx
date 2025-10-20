import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, History, Settings, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";

const PhysicsDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const menuItems = [
    {
      title: "Topics",
      description: "Browse physics topics",
      icon: BookOpen,
      path: "/physics/sections",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Practice History",
      description: "Review your past practice sessions",
      icon: History,
      path: "/history",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Progress",
      description: "Track your learning progress",
      icon: BarChart3,
      path: "/progress",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      path: "/settings",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/subjects")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>
            <div>
              <h1 className="text-4xl font-bold mb-2">GCSE Physics</h1>
              <p className="text-muted-foreground">AQA Specification</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Open
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhysicsDashboard;
