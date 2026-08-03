import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, CheckCircle2, ArrowRight, Award, Trophy, Sparkles, FolderGit2, BookOpen, Layers } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { ROADMAP_DATA, Semester } from '@/lib/roadmap-data';
import { 
  isSemesterUnlocked, 
  isSemesterCompleted, 
  getTotalEarnedCredits, 
  getProjectSubmission,
  resetRoadmapProgress 
} from '@/lib/roadmap-store';

export default function Roadmap() {
  const [credits, setCredits] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const refreshData = () => {
    setCredits(getTotalEarnedCredits());
    setUpdateTrigger(prev => prev + 1);
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('roadmap-progress-updated', handleUpdate);
    return () => window.removeEventListener('roadmap-progress-updated', handleUpdate);
  }, []);

  return (
    <SidebarLayout userType="student">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 8-Semester AI Developer Track
          </div>
          <h1 className="text-3xl font-display font-bold">Learning Roadmap</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Your step-by-step 8-semester journey from AI foundations to production enterprise products & career placement.
          </p>
        </div>

        {/* Credit Score & Progress Card */}
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur p-4 rounded-xl border border-border shadow-sm shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Credit Score</div>
            <div className="text-2xl font-bold text-foreground flex items-center gap-1.5">
              {credits} <span className="text-sm font-normal text-muted-foreground">Credits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute top-4 bottom-4 left-6 md:left-8 w-1 bg-muted rounded-full"></div>

        <div className="space-y-10 py-2">
          {ROADMAP_DATA.map((semester: Semester) => {
            const unlocked = isSemesterUnlocked(semester.number);
            const completed = isSemesterCompleted(semester.number);
            const projectSubmission = getProjectSubmission(semester.id);

            const status = completed ? 'completed' : unlocked ? 'unlocked' : 'locked';

            return (
              <div key={semester.id} className="relative flex items-start pl-14 md:pl-20">
                {/* Timeline Icon Badge */}
                <div 
                  className={`absolute left-6 md:left-8 -translate-x-1/2 w-9 h-9 rounded-full border-4 border-background flex items-center justify-center z-10 transition-all ${
                    completed ? 'bg-green-600 text-white shadow-md' :
                    unlocked ? 'bg-primary text-white shadow-md shadow-primary/20' :
                    'bg-muted text-muted-foreground border-muted-foreground/20'
                  }`}
                >
                  {completed ? <CheckCircle2 className="w-5 h-5" /> :
                   unlocked ? <Unlock className="w-4 h-4" /> :
                   <Lock className="w-4 h-4" />}
                </div>

                {/* Semester Card */}
                <Card className={`w-full transition-all border ${
                  completed ? 'border-green-500/30 bg-green-50/20 dark:bg-green-950/10' :
                  unlocked ? 'border-primary/30 shadow-md hover:border-primary' :
                  'opacity-65 bg-muted/30 border-muted'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={completed ? "default" : unlocked ? "secondary" : "outline"} className={completed ? "bg-green-600 hover:bg-green-700" : ""}>
                          Semester {semester.number}
                        </Badge>
                        {completed && (
                          <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {semester.number === 1 && !completed && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Started for First-time Students
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-medium px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20 flex items-center gap-1 shrink-0 self-start sm:self-auto">
                        <Award className="w-3.5 h-3.5" /> +{semester.project.credits} Project Credits
                      </div>
                    </div>

                    <CardTitle className="text-xl md:text-2xl mt-2 font-display">
                      Semester {semester.number} – {semester.title}
                    </CardTitle>
                    <p className="text-sm font-medium text-primary/80">{semester.subtitle}</p>
                  </CardHeader>

                  <CardContent className="pb-4 space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {semester.description}
                    </p>

                    {/* Modules & Topics Breakdown Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t text-xs">
                      {semester.modules.map(mod => (
                        <div key={mod.id} className="p-2 rounded bg-muted/50 border border-muted text-muted-foreground">
                          <span className="font-semibold block text-foreground truncate">Mod {mod.number}: {mod.title}</span>
                          <span>{mod.topics.length} Topics</span>
                        </div>
                      ))}
                    </div>

                    {/* Semester Project Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-primary tracking-wider">Semester Final Project</div>
                          <div className="text-sm font-bold text-foreground">{semester.project.title}</div>
                        </div>
                      </div>

                      {projectSubmission ? (
                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 shrink-0 self-start sm:self-auto">
                          ✓ Project Submitted (+{projectSubmission.creditsAwarded} CR)
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground shrink-0">
                          Solve & upload to earn {semester.project.credits} Credits
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 justify-end border-t bg-muted/20">
                    {unlocked ? (
                      <Link href={`/semester/${semester.number}`}>
                        <Button variant={completed ? "outline" : "default"} className="gap-2 font-medium">
                          {completed ? 'Review Content' : 'Click Learning into 1st Semester'}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" disabled className="gap-2 text-muted-foreground">
                        <Lock className="w-4 h-4" /> Locked (Complete Semester {semester.number - 1} first)
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SidebarLayout>
  );
}
