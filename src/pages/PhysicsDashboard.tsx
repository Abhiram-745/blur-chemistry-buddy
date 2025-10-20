import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, TrendingUp, LogOut, Settings as SettingsIcon, HelpCircle, Target, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Profile {
  full_name: string | null;
}

interface TopicPerformance {
  topic: string;
  sectionId: string;
  avgScore: number;
  attempts: number;
  lastAttempt: string;
  isStrength: boolean;
}

const PhysicsDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [topicPerformance, setTopicPerformance] = useState<TopicPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch practice sessions with section data
      const { data: sessions } = await supabase
        .from("practice_sessions")
        .select(`
          id,
          overall_score,
          max_marks,
          created_at,
          subsection_title,
          sections (
            title,
            id
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (sessions) {
        // Calculate topic performance
        const topicScores: { 
          [topic: string]: { 
            scores: number[]; 
            sectionId: string; 
            lastAttempt: string;
          } 
        } = {};
        
        sessions.forEach((session: any) => {
          if (session.sections) {
            const topic = session.subsection_title || session.sections.title;
            const percentage = Math.round((session.overall_score / session.max_marks) * 100);
            
            if (!topicScores[topic]) {
              topicScores[topic] = { 
                scores: [], 
                sectionId: session.sections.id,
                lastAttempt: session.created_at 
              };
            }
            topicScores[topic].scores.push(percentage);
            
            if (new Date(session.created_at) > new Date(topicScores[topic].lastAttempt)) {
              topicScores[topic].lastAttempt = session.created_at;
            }
          }
        });

        const performance = Object.entries(topicScores)
          .map(([topic, data]) => {
            const avgScore = Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length);
            return {
              topic,
              sectionId: data.sectionId,
              avgScore,
              attempts: data.scores.length,
              lastAttempt: data.lastAttempt,
              isStrength: avgScore >= 70
            };
          })
          .sort((a, b) => b.avgScore - a.avgScore);
        
        setTopicPerformance(performance);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">
              Welcome back, {profile?.full_name || "Student"}! 👋
            </h1>
            <p className="text-muted-foreground">Ready to continue your physics revision?</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 animate-slide-up">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/physics/sections")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Browse Sections
              </CardTitle>
              <CardDescription>Explore physics topics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View All Sections</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate("/history")}>
                View History
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/progress")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Progress
              </CardTitle>
              <CardDescription>Track your improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Analytics</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/settings")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                Settings
              </CardTitle>
              <CardDescription>Preferences & profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Manage Account</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/help")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                Help & Guide
              </CardTitle>
              <CardDescription>How to use PhysicsBlur</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        </div>

        {topicPerformance.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  Your Strengths
                </CardTitle>
                <CardDescription>Topics you're performing well in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topicPerformance.filter(t => t.isStrength).length > 0 ? (
                    topicPerformance
                      .filter(t => t.isStrength)
                      .slice(0, 3)
                      .map((topic) => (
                        <div
                          key={topic.sectionId}
                          className="flex items-center justify-between p-3 bg-background rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                          onClick={() => navigate(`/physics/sections`)}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{topic.topic}</p>
                            <p className="text-xs text-muted-foreground">
                              Average: {topic.avgScore}% • {topic.attempts} attempts
                            </p>
                          </div>
                          <Badge className="bg-green-600">
                            {topic.avgScore}%
                          </Badge>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Complete more practice to see your strengths</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <Target className="h-5 w-5" />
                  Areas to Focus On
                </CardTitle>
                <CardDescription>Topics that need more practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topicPerformance.filter(t => !t.isStrength).length > 0 ? (
                    topicPerformance
                      .filter(t => !t.isStrength)
                      .slice(0, 3)
                      .map((topic) => (
                        <div
                          key={topic.sectionId}
                          className="flex items-center justify-between p-3 bg-background rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                          onClick={() => navigate(`/blur-practice/${topic.sectionId}/0`)}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{topic.topic}</p>
                            <p className="text-xs text-muted-foreground">
                              Average: {topic.avgScore}% • {topic.attempts} attempts
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Practice
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Complete more practice to see areas to focus on</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicsDashboard;
