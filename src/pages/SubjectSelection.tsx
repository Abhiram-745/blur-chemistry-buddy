import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, Calculator, Dna, Zap, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";

const SubjectSelection = () => {
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

  const subjects = [
    {
      name: "Chemistry",
      icon: Beaker,
      color: "from-blue-500 to-cyan-500",
      available: true,
      route: "/chemistry/dashboard"
    },
    {
      name: "Physics",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      available: true,
      route: "/physics/dashboard"
    },
    {
      name: "Biology",
      icon: Dna,
      color: "from-green-500 to-emerald-500",
      available: false,
      route: null
    },
    {
      name: "Maths",
      icon: Calculator,
      color: "from-orange-500 to-red-500",
      available: false,
      route: null
    }
  ];

  const handleSubjectClick = (subject: typeof subjects[0]) => {
    if (subject.available && subject.route) {
      navigate(subject.route);
    } else {
      toast.info(`${subject.name} content coming soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Choose Your Subject</h1>
            <p className="text-muted-foreground">Select a subject to start revising</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card
                key={subject.name}
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  !subject.available ? 'opacity-60' : ''
                }`}
                onClick={() => handleSubjectClick(subject)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">{subject.name}</CardTitle>
                  <CardDescription className="text-center">
                    {subject.available ? 'Available now' : 'Coming soon'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={subject.available ? "default" : "outline"}
                    disabled={!subject.available}
                  >
                    {subject.available ? 'Start Learning' : 'Not Available'}
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

export default SubjectSelection;