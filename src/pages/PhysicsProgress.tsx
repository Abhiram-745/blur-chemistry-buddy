import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Target, Award, Calendar, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";

interface Stats {
  totalAttempts: number;
  averageScore: number;
  topicScores: { [topic: string]: { avg: number; count: number; lastScore: number; topicSlug?: string; subsectionSlug?: string } };
  recentImprovement: number;
  weeklyProgress: { week: string; avgScore: number; attempts: number }[];
  bestStreak: number;
  currentStreak: number;
}

// Physics topic IDs to filter by
const PHYSICS_TOPICS = [
  "energy",
  "electricity", 
  "particle-model",
  "atomic-structure",
  "forces",
  "waves",
  "magnetism",
  "space-physics"
];

const PhysicsProgress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalAttempts: 0,
    averageScore: 0,
    topicScores: {},
    recentImprovement: 0,
    weeklyProgress: [],
    bestStreak: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Filter for physics topics only
    const { data: sessions } = await supabase
      .from("practice_sessions")
      .select(`
        overall_score,
        max_marks,
        created_at,
        subsection_title,
        topic_slug,
        subsection_slug
      `)
      .eq("user_id", user.id)
      .in("topic_slug", PHYSICS_TOPICS)
      .order("created_at", { ascending: false });

    if (sessions) {
      const typedSessions = sessions as any[];
      const totalAttempts = typedSessions.length;
      
      // Calculate average as percentage
      const averageScore = totalAttempts > 0
        ? Math.round(typedSessions.reduce((acc, s) => acc + ((s.overall_score / s.max_marks) * 100), 0) / totalAttempts)
        : 0;

      // Calculate per-subsection scores
      const topicScores: { [topic: string]: { scores: number[]; count: number; topicSlug?: string; subsectionSlug?: string } } = {};
      typedSessions.forEach((session) => {
        const topic = session.subsection_title;
        const percentage = Math.round((session.overall_score / session.max_marks) * 100);
        
        if (!topicScores[topic]) {
          topicScores[topic] = { 
            scores: [], 
            count: 0,
            topicSlug: session.topic_slug,
            subsectionSlug: session.subsection_slug
          };
        }
        topicScores[topic].scores.push(percentage);
        topicScores[topic].count++;
      });

      const formattedTopicScores: { [topic: string]: { avg: number; count: number; lastScore: number; topicSlug?: string; subsectionSlug?: string } } = {};
      Object.entries(topicScores).forEach(([topic, data]) => {
        formattedTopicScores[topic] = {
          avg: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
          count: data.count,
          lastScore: data.scores[0],
          topicSlug: data.topicSlug,
          subsectionSlug: data.subsectionSlug,
        };
      });

      // Calculate weekly progress (last 8 weeks)
      const weeklyProgress: { week: string; avgScore: number; attempts: number }[] = [];
      const now = new Date();
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        const weekSessions = typedSessions.filter(session => {
          const sessionDate = new Date(session.created_at);
          return sessionDate >= weekStart && sessionDate < weekEnd;
        });
        
        if (weekSessions.length > 0) {
          const weekAvg = Math.round(
            weekSessions.reduce((acc, s) => acc + ((s.overall_score / s.max_marks) * 100), 0) / weekSessions.length
          );
          weeklyProgress.push({
            week: `Week ${8 - i}`,
            avgScore: weekAvg,
            attempts: weekSessions.length,
          });
        }
      }

      // Calculate streaks (consecutive days)
      const dateSet = new Set(
        typedSessions.map(s => new Date(s.created_at).toDateString())
      );
      const sortedDates = Array.from(dateSet).sort((a, b) => 
        new Date(b).getTime() - new Date(a).getTime()
      );
      
      let currentStreak = 0;
      let bestStreak = 0;
      let tempStreak = 0;
      
      for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
          tempStreak = 1;
          const today = new Date().toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          if (sortedDates[0] === today || sortedDates[0] === yesterday) {
            currentStreak = 1;
          }
        } else {
          const prevDate = new Date(sortedDates[i - 1]);
          const currDate = new Date(sortedDates[i]);
          const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / 86400000);
          
          if (diffDays === 1) {
            tempStreak++;
            if (i === 1) currentStreak = tempStreak;
          } else {
            bestStreak = Math.max(bestStreak, tempStreak);
            tempStreak = 1;
          }
        }
      }
      bestStreak = Math.max(bestStreak, tempStreak, currentStreak);

      // Calculate recent improvement (last 5 vs previous 5)
      let recentImprovement = 0;
      if (totalAttempts >= 10) {
        const recent5 = typedSessions.slice(0, 5).reduce((acc, s) => acc + ((s.overall_score / s.max_marks) * 100), 0) / 5;
        const previous5 = typedSessions.slice(5, 10).reduce((acc, s) => acc + ((s.overall_score / s.max_marks) * 100), 0) / 5;
        recentImprovement = Math.round(recent5 - previous5);
      }

      setStats({
        totalAttempts,
        averageScore,
        topicScores: formattedTopicScores,
        recentImprovement,
        weeklyProgress,
        bestStreak,
        currentStreak,
      });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading progress...</div>
      </div>
    );
  }

  const sortedTopics = Object.entries(stats.topicScores).sort(([, a], [, b]) => a.avg - b.avg);
  const weakestTopics = sortedTopics.slice(0, 3);
  const strongestTopics = sortedTopics.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate("/physics/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Physics Progress Dashboard</h1>
          <p className="text-muted-foreground">Track your improvement and identify areas to focus on</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Total Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.totalAttempts}</div>
              <p className="text-sm text-muted-foreground mt-2">Practice sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.averageScore}%</div>
              <p className="text-sm text-muted-foreground mt-2">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Recent Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${stats.recentImprovement >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {stats.recentImprovement > 0 ? "+" : ""}{stats.recentImprovement}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Last 5 vs previous 5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.currentStreak}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Best: {stats.bestStreak} days
              </p>
            </CardContent>
          </Card>
        </div>

        {stats.weeklyProgress.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Progress
              </CardTitle>
              <CardDescription>Your performance over the last 8 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.weeklyProgress.map((week) => (
                  <div key={week.week} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{week.week}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{week.attempts} attempts</span>
                        <span className="font-bold text-primary">{week.avgScore}%</span>
                      </div>
                    </div>
                    <ProgressBar value={week.avgScore} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {weakestTopics.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Areas to Focus On</CardTitle>
              <CardDescription>Topics where you could use more practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakestTopics.map(([topic, data]) => (
                  <div key={topic} className="space-y-2">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{topic}</h3>
                        <p className="text-sm text-muted-foreground">{data.count} attempts • Last: {data.lastScore}%</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{data.avg}%</div>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            if (data.topicSlug && data.subsectionSlug) {
                              navigate(`/physics/blur-practice/${data.topicSlug}/${data.subsectionSlug}`);
                            } else {
                              navigate("/physics/sections");
                            }
                          }}
                        >
                          Practice
                        </Button>
                      </div>
                    </div>
                    <ProgressBar value={data.avg} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {strongestTopics.length > 0 && (
          <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">Your Strengths</CardTitle>
              <CardDescription>Topics you've mastered well</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strongestTopics.map(([topic, data]) => (
                  <div key={topic} className="space-y-2">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{topic}</h3>
                        <p className="text-sm text-muted-foreground">{data.count} attempts • Last: {data.lastScore}%</p>
                      </div>
                      <Badge variant="default" className="text-lg px-4 py-2 bg-green-600 dark:bg-green-700">
                        {data.avg}%
                      </Badge>
                    </div>
                    <ProgressBar value={data.avg} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {stats.totalAttempts === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No physics practice sessions yet. Start practicing to see your progress!</p>
              <Button onClick={() => navigate("/physics/sections")}>Browse Physics Topics</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PhysicsProgress;
