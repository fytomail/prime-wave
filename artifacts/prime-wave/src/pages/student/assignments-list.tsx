import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  FileCode2, Clock, CheckCircle2, Lock, Unlock, ArrowRight, 
  Award, Trophy, Sparkles, Image as ImageIcon, Link2, BookOpen 
} from 'lucide-react';
import { ASSIGNMENTS_DATA, SemesterAssignmentsGroup, Assignment } from '@/lib/assignments-data';
import { 
  isAssignmentUnlocked, 
  isAssignmentCompleted, 
  getAssignmentSubmission, 
  getTotalAssignmentCredits 
} from '@/lib/assignments-store';
import { isSemesterUnlocked } from '@/lib/roadmap-store';

export default function AssignmentsList() {
  const [credits, setCredits] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const refreshState = () => {
    setCredits(getTotalAssignmentCredits());
    setUpdateTrigger(prev => prev + 1);
  };

  useEffect(() => {
    refreshState();
    const handleUpdate = () => refreshState();
    window.addEventListener('assignments-progress-updated', handleUpdate);
    return () => window.removeEventListener('assignments-progress-updated', handleUpdate);
  }, []);

  return (
    <SidebarLayout userType="student">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 8-Semester Assignment Challenges
          </div>
          <h1 className="text-3xl font-display font-bold">Semester Assignments</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            4 hands-on assignments per semester (32 total). Submit your image evidence & solution URLs to earn credits and unlock the next challenge!
          </p>
        </div>

        {/* Total Earned Credits Badge */}
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur p-4 rounded-xl border border-border shadow-sm shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Assignment Credits</div>
            <div className="text-2xl font-bold text-foreground flex items-center gap-1.5">
              {credits} <span className="text-sm font-normal text-muted-foreground">Credits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Semesters & Assignments List */}
      <div className="space-y-10">
        {ASSIGNMENTS_DATA.map((group: SemesterAssignmentsGroup) => {
          const semUnlocked = isSemesterUnlocked(group.semesterNumber);

          return (
            <div key={group.semesterNumber} className="space-y-4">
              {/* Semester Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <Badge variant={semUnlocked ? "default" : "outline"} className="text-sm px-3 py-1 font-semibold">
                    Semester {group.semesterNumber}
                  </Badge>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {group.semesterTitle}
                  </h2>
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {group.assignments.length} Assignments (50 Credits each)
                </div>
              </div>

              {/* 4 Assignments Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {group.assignments.map((assignment: Assignment) => {
                  const unlocked = isAssignmentUnlocked(
                    assignment.semesterNumber, 
                    assignment.assignmentNumber, 
                    assignment.id
                  );
                  const completed = isAssignmentCompleted(assignment.id);
                  const submission = getAssignmentSubmission(assignment.id);

                  return (
                    <Card 
                      key={assignment.id} 
                      className={`transition-all border ${
                        completed ? 'border-green-500/30 bg-green-50/20 dark:bg-green-950/10 shadow-xs' :
                        unlocked ? 'border-primary/30 hover:border-primary shadow-sm bg-card' :
                        'opacity-60 bg-muted/40 border-muted'
                      }`}
                    >
                      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Assignment {assignment.semesterNumber}.{assignment.assignmentNumber}
                              </Badge>
                              {completed ? (
                                <Badge variant="default" className="bg-green-600 text-xs">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Passed ({submission?.score || 95}/100)
                                </Badge>
                              ) : unlocked ? (
                                <Badge variant="secondary" className="text-xs text-primary bg-primary/10">
                                  <Unlock className="w-3 h-3 mr-1" /> Unlocked
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  <Lock className="w-3 h-3 mr-1" /> Locked
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                              +{assignment.creditsAwarded} CR
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-foreground leading-snug">{assignment.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                            {assignment.description}
                          </p>
                        </div>

                        {/* Card Footer Action */}
                        <div className="pt-3 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded text-[11px] uppercase font-semibold">
                              <FileCode2 className="w-3 h-3" /> {assignment.type}
                            </span>
                            <span>Max: {assignment.maxScore}</span>
                          </div>

                          {unlocked ? (
                            <Link href={`/assignments/${assignment.id}`}>
                              <Button size="sm" variant={completed ? "outline" : "default"} className="gap-1.5 text-xs font-medium">
                                {completed ? 'View Submission' : 'Open Assignment'}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          ) : (
                            <Button size="sm" variant="ghost" disabled className="gap-1.5 text-xs text-muted-foreground">
                              <Lock className="w-3.5 h-3.5" /> Locked
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </SidebarLayout>
  );
}
