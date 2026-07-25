import { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetStudentDashboard } from '@workspace/api-client-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Award, BookOpen, Flame, Target, ChevronRight, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentDashboard() {
  const studentId = 1; // Demo user
  const { data: dashboard, isLoading } = useGetStudentDashboard(studentId, {
    query: { enabled: true, queryKey: ['studentDashboard', studentId] }
  });

  if (isLoading || !dashboard) {
    return (
      <SidebarLayout userType="student">
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout userType="student">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Welcome back, Student</h1>
        <p className="text-muted-foreground mt-1">Here's your progress for Semester {dashboard.semesterNumber}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">PPS Score</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-primary">{dashboard.ppsScore}</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Top 15% of platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits Earned</p>
                <h3 className="text-3xl font-display font-bold mt-2">{dashboard.creditsEarned}</h3>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-500">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 required for next level</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Topics Completed</p>
                <h3 className="text-3xl font-display font-bold mt-2">{dashboard.topicsCompleted}</h3>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across all modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Day Streak</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-orange-500">{dashboard.streakDays}</h3>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Current Semester Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Semester {dashboard.semesterNumber} Progress</CardTitle>
              <CardDescription>You are making good pacing against the syllabus.</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboard.semesterProgress ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Modules</span>
                      <span className="text-muted-foreground">{dashboard.semesterProgress.completedModules} / {dashboard.semesterProgress.totalModules}</span>
                    </div>
                    <Progress value={(dashboard.semesterProgress.completedModules / dashboard.semesterProgress.totalModules) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Topics</span>
                      <span className="text-muted-foreground">{dashboard.semesterProgress.completedTopics} / {dashboard.semesterProgress.totalTopics}</span>
                    </div>
                    <Progress value={(dashboard.semesterProgress.completedTopics / dashboard.semesterProgress.totalTopics) * 100} className="h-2 bg-muted [&>div]:bg-indigo-500" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Link href={`/semester/${dashboard.semesterProgress.semesterId}`}>
                      <Button>Continue Semester <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">No progress data available.</div>
              )}
            </CardContent>
          </Card>

          {/* Up Next */}
          <Card>
            <CardHeader>
              <CardTitle>Up Next for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold mb-2">
                    Topic
                  </div>
                  <h4 className="font-bold text-lg">{dashboard.nextTopic || "Advanced React Patterns"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">Module 3 • Est. 45 mins</p>
                </div>
                <Link href="/topic/1">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Industry Readiness */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Industry Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20">
                  <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent -rotate-45"></div>
                  <div className="text-center">
                    <span className="text-3xl font-bold font-display">{dashboard.industryReadiness}%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                You are on track for Junior Developer roles. Complete more projects to boost this score.
              </p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboard.recentActivity && dashboard.recentActivity.length > 0 ? (
                  dashboard.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-4 relative">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 absolute -left-1 ring-4 ring-background"></div>
                      <div className="pl-4 border-l pb-6 last:pb-0 last:border-0 border-muted">
                        <p className="font-medium text-sm">{activity.title}</p>
                        {activity.detail && <p className="text-xs text-muted-foreground mt-1">{activity.detail}</p>}
                        {activity.score && (
                          <div className="mt-2 text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded">
                            Score: {activity.score}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
