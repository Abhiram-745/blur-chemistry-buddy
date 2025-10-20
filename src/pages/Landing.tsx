import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Brain, TrendingUp, Award, BookOpen, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/subjects");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mx-auto bg-gradient-to-br from-primary to-secondary p-4 rounded-3xl w-fit mb-6 animate-fade-in">
            <Beaker className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Master AQA GCSE with
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> BlurtAI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            BlurtAI uses proven "blurting" techniques to help you ace your exams through powerful active recall practice.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-lg px-8 hover:opacity-90"
              onClick={() => navigate("/auth")}
            >
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate("/help")}>
              Learn How It Works
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Active Recall</CardTitle>
              <CardDescription>
                Write everything you remember without looking. Proven to be 3x more effective than re-reading notes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                See your improvement over time. Identify weak topics and watch your scores climb.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader>
              <Target className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Spaced Repetition</CardTitle>
              <CardDescription>
                Smart review recommendations ensure you practice topics at optimal intervals for long-term retention.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How BlurtAI Works</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Read the Section</h3>
              <p className="text-muted-foreground">
                Browse our comprehensive library of AQA GCSE topics across Chemistry, Physics, Biology, and Maths. 
                Each section covers specific learning objectives with clear explanations and key concepts.
              </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Blur It Out</h3>
                <p className="text-muted-foreground">
                  Close your notes and write everything you remember about the topic. Don't worry about perfection -
                  focus on recalling key concepts and terminology.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Instant Feedback</h3>
                <p className="text-muted-foreground">
                  See your score and which keywords you remembered vs. missed. Review the gaps in your knowledge
                  and try again to improve.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Review & Improve</h3>
                <p className="text-muted-foreground">
                  Use spaced repetition recommendations to review topics at the right time. Track your progress
                  and watch your chemistry knowledge grow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 mb-16">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-muted-foreground">Topics Available</p>
            </div>
            <div>
              <Award className="h-12 w-12 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">3x</div>
              <p className="text-muted-foreground">More Effective Than Reading</p>
            </div>
            <div>
              <Target className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-muted-foreground">Aligned with AQA Spec</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center p-12">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Ready to Ace Your Exams?</CardTitle>
            <CardDescription className="text-lg">
              Join students who are mastering AQA GCSE through active recall with BlurtAI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-lg px-12 hover:opacity-90"
              onClick={() => navigate("/auth")}
            >
              Start Learning For Free
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Full access to all features
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">BlurtAI</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button onClick={() => navigate("/help")}>Help</button>
              <button onClick={() => navigate("/privacy")}>Privacy</button>
              <button onClick={() => navigate("/terms")}>Terms</button>
              <button onClick={() => navigate("/contact")}>Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
