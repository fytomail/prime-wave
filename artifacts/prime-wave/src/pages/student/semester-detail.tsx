import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useParams, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  BookOpen, CheckCircle, CheckCircle2, Clock, ChevronRight, Lock, Unlock, 
  ArrowLeft, FolderGit2, Upload, Award, ExternalLink, Sparkles 
} from 'lucide-react';
import { ROADMAP_DATA, Semester, Module, Topic } from '@/lib/roadmap-data';
import { 
  isModuleUnlocked, 
  isModuleCompleted, 
  isTopicCompleted, 
  isTopicUnlocked, 
  submitProjectAction, 
  getProjectSubmission, 
  isSemesterCompleted 
} from '@/lib/roadmap-store';
import { useToast } from '@/hooks/use-toast';

export default function SemesterDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Parse semester number
  const semNum = Number(id?.replace('sem-', '')) || 1;
  const semester: Semester | undefined = ROADMAP_DATA.find(s => s.number === semNum);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const refreshState = () => setUpdateTrigger(prev => prev + 1);

  useEffect(() => {
    refreshState();
    const handleUpdate = () => refreshState();
    window.addEventListener('roadmap-progress-updated', handleUpdate);
    return () => window.removeEventListener('roadmap-progress-updated', handleUpdate);
  }, [id]);

  if (!semester) {
    return (
      <SidebarLayout userType="student">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-muted-foreground mb-4">Semester not found.</p>
          <Link href="/roadmap">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmap</Button>
          </Link>
        </div>
      </SidebarLayout>
    );
  }

  // Calculate Progress Stats
  let totalTopics = 0;
  let completedTopics = 0;
  let totalModules = semester.modules.length;
  let completedModulesCount = 0;

  semester.modules.forEach((mod: Module) => {
    const isModComplete = isModuleCompleted(semester.number, mod.number);
    if (isModComplete) completedModulesCount++;

    mod.topics.forEach((t: Topic) => {
      totalTopics++;
      if (isTopicCompleted(t.id)) completedTopics++;
    });
  });

  const progressPercent = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  const projectSubmission = getProjectSubmission(semester.id);
  const semesterDone = isSemesterCompleted(semester.number);

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      toast({
        title: "Repository URL required",
        description: "Please enter your GitHub repository or project link.",
        variant: "destructive"
      });
      return;
    }

    const sub = submitProjectAction(semester.id, { repoUrl, demoUrl, notes });
    setIsSubmitModalOpen(false);
    toast({
      title: "Semester Project Submitted! 🎉",
      description: `Awarded +${sub.creditsAwarded} Credits! Next semester unlocked.`,
    });
    refreshState();
  };

  return (
    <SidebarLayout userType="student">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-6">
        <Link href="/roadmap">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Roadmap
          </Button>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary/30">
                Semester {semester.number}
              </Badge>
              {semesterDone && (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Semester Completed
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">{semester.title}</h1>
            <p className="text-lg text-muted-foreground mt-1 max-w-3xl">{semester.subtitle}</p>
          </div>

          <Button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md shrink-0"
          >
            <FolderGit2 className="w-4 h-4" /> 
            {projectSubmission ? 'View Project Submission' : 'Submit Semester Project'}
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg font-bold text-2xl">
              {Math.round(progressPercent)}%
            </div>
            <div className="flex-1 w-full space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span>Semester Progress</span>
                <span className="text-muted-foreground">{completedTopics} of {totalTopics} Topics Completed</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>{completedModulesCount} of {totalModules} Modules Cleared</span>
                <span>+{semester.project.credits} Project Credit Score Available</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="mb-10 space-y-6">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Modules in Semester {semester.number}
        </h2>

        <div className="grid gap-6">
          {semester.modules.map((mod: Module) => {
            const unlocked = isModuleUnlocked(semester.number, mod.number);
            const completed = isModuleCompleted(semester.number, mod.number);

            return (
              <Card 
                key={mod.id} 
                className={`transition-all border ${
                  completed ? 'border-green-500/30 bg-green-50/10 dark:bg-green-950/5' :
                  unlocked ? 'border-primary/30 hover:border-primary shadow-sm' :
                  'opacity-60 bg-muted/40 border-muted'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={completed ? "default" : unlocked ? "secondary" : "outline"} className={completed ? "bg-green-600" : ""}>
                        Module {mod.number}
                      </Badge>
                      {completed && (
                        <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                      {!unlocked && (
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mod.topics.length} Topics
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mt-1">{mod.title}</CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  {/* Topics Grid inside Module */}
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                    {mod.topics.map((t: Topic) => {
                      const topicDone = isTopicCompleted(t.id);
                      const topicOpen = isTopicUnlocked(semester.number, mod.number, t.number, t.id);

                      return (
                        <Link 
                          key={t.id} 
                          href={topicOpen ? `/topic/${t.id}` : '#'}
                          className={!topicOpen ? 'pointer-events-none' : ''}
                        >
                          <div className={`p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between ${
                            topicDone ? 'bg-green-50/50 border-green-200 dark:bg-green-950/20 text-foreground' :
                            topicOpen ? 'bg-background hover:bg-primary/5 hover:border-primary/50 text-foreground cursor-pointer shadow-2xs' :
                            'bg-muted/40 border-muted text-muted-foreground opacity-70'
                          }`}>
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {topicDone ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                              ) : topicOpen ? (
                                <div className="w-4 h-4 rounded-full border-2 border-primary/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary">
                                  {t.number}
                                </div>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              )}
                              <span className="font-medium truncate">{t.title}</span>
                            </div>
                            {topicOpen && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Semester Final Project Section */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-background to-amber-500/5 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-amber-600 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20">
              <Award className="w-3.5 h-3.5 mr-1" /> Final Semester Assessment
            </Badge>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              +{semester.project.credits} Credit Score
            </span>
          </div>
          <CardTitle className="text-2xl font-display mt-2">{semester.project.title}</CardTitle>
          <CardDescription className="text-base">{semester.project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Project Requirements:</h4>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {semester.project.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-background/60 p-2.5 rounded border border-border">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {projectSubmission && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-500/30 space-y-2 text-sm">
              <div className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Submitted & Verified by AI (+{projectSubmission.creditsAwarded} Credits)
              </div>
              <div className="text-muted-foreground">
                <span className="font-semibold text-foreground">Repository:</span>{' '}
                <a href={projectSubmission.repoUrl} target="_blank" rel="noreferrer" className="text-primary underline flex-inline items-center gap-1">
                  {projectSubmission.repoUrl} <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
              {projectSubmission.demoUrl && (
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Live Demo:</span>{' '}
                  <a href={projectSubmission.demoUrl} target="_blank" rel="noreferrer" className="text-primary underline flex-inline items-center gap-1">
                    {projectSubmission.demoUrl} <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <div className="p-6 pt-0 flex justify-end">
          <Button onClick={() => setIsSubmitModalOpen(true)} className="gap-2">
            <Upload className="w-4 h-4" /> {projectSubmission ? 'Update Submission' : 'Upload & Earn Credits'}
          </Button>
        </div>
      </Card>

      {/* Submission Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <FolderGit2 className="w-5 h-5 text-primary" /> Submit {semester.project.title}
            </DialogTitle>
            <DialogDescription>
              Submit your GitHub repository and live application link to receive your {semester.project.credits} credit score and unlock the next semester.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitProject} className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">GitHub / Code Repository URL *</label>
              <Input 
                placeholder="https://github.com/username/project-repo" 
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Live Demo URL (Optional)</label>
              <Input 
                placeholder="https://my-app.vercel.app" 
                value={demoUrl}
                onChange={e => setDemoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Notes / Key Features Implemented</label>
              <Textarea 
                placeholder="Briefly describe what you built, AI tools used, and key feature highlights..." 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsSubmitModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2">
                <Upload className="w-4 h-4" /> Submit & Earn +{semester.project.credits} Credits
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
