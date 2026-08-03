import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  FolderGit2, Star, CheckCircle, CheckCircle2, Clock, Plus, ExternalLink, 
  Upload, Sparkles, Trophy, Award, BookOpen, Image as ImageIcon, Link2 
} from 'lucide-react';
import { ROADMAP_DATA, Semester, SemesterProject } from '@/lib/roadmap-data';
import { 
  getAllProjectSubmissions, 
  getProjectSubmission, 
  submitProjectAction, 
  ProjectSubmission 
} from '@/lib/roadmap-store';
import { useToast } from '@/hooks/use-toast';

export default function ProjectsList() {
  const { toast } = useToast();

  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmission>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedSemesterId, setSelectedSemesterId] = useState('sem-1');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  
  // Details Modal State
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Semester | null>(null);

  const refreshState = () => {
    setSubmissions(getAllProjectSubmissions());
  };

  useEffect(() => {
    refreshState();
    const handleUpdate = () => refreshState();
    window.addEventListener('roadmap-progress-updated', handleUpdate);
    return () => window.removeEventListener('roadmap-progress-updated', handleUpdate);
  }, []);

  const completedCount = Object.keys(submissions).length;

  const handleOpenSubmitModal = (semId?: string) => {
    if (semId) {
      setSelectedSemesterId(semId);
      const existing = submissions[semId];
      if (existing) {
        setRepoUrl(existing.repoUrl || '');
        setDemoUrl(existing.demoUrl || '');
        setNotes(existing.notes || '');
      } else {
        setRepoUrl('');
        setDemoUrl('');
        setNotes('');
      }
    }
    setIsSubmitModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      toast({
        title: "Repository URL required",
        description: "Please enter your GitHub repository or application URL link.",
        variant: "destructive"
      });
      return;
    }

    const sub = submitProjectAction(selectedSemesterId, {
      repoUrl: repoUrl.trim(),
      demoUrl: demoUrl.trim(),
      notes: notes.trim()
    });

    setIsSubmitModalOpen(false);
    toast({
      title: "Project Submitted & Verified! 🎉",
      description: `Awarded +${sub.creditsAwarded} Credits! Portfolio updated.`,
    });
    refreshState();
  };

  return (
    <SidebarLayout userType="student">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 8-Semester Portfolio Projects
          </div>
          <h1 className="text-3xl font-display font-bold">Projects Workspace</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Real-world applications built across 8 semesters that demonstrate industry readiness and form your verified portfolio.
          </p>
        </div>

        {/* Counter & Submit Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-background/80 backdrop-blur p-3.5 rounded-xl border border-border shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Completed</div>
              <div className="text-xl font-bold text-foreground">
                {completedCount} <span className="text-sm font-normal text-muted-foreground">/ 8 Projects</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => handleOpenSubmitModal()}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md h-12 px-5 text-sm font-semibold"
          >
            <Plus className="w-4 h-4" /> Submit Project
          </Button>
        </div>
      </div>

      {/* Projects Grid (All 8 Semester Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROADMAP_DATA.map((semester: Semester) => {
          const submission = submissions[semester.id];
          const isDone = !!submission;

          return (
            <Card 
              key={semester.id} 
              className={`flex flex-col h-full transition-all border ${
                isDone ? 'border-green-500/40 bg-green-50/20 dark:bg-green-950/10 shadow-sm' :
                'border-border hover:border-primary/50 shadow-xs'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2.5 rounded-xl ${isDone ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-primary/10 text-primary'}`}>
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <Badge variant={isDone ? 'default' : 'secondary'} className={isDone ? 'bg-green-600 hover:bg-green-700' : ''}>
                    {isDone ? '✓ Completed' : 'In Progress'}
                  </Badge>
                </div>

                <div className="text-xs font-semibold text-primary mb-1">
                  Semester {semester.number}
                </div>
                <CardTitle className="text-lg font-bold font-display leading-snug line-clamp-2">
                  {semester.project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs mt-1">
                  {semester.project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-end space-y-4 pt-0">
                {/* Requirements Pills */}
                <div className="space-y-1.5 pt-2 border-t text-xs text-muted-foreground">
                  <div className="font-semibold text-foreground text-[11px] uppercase tracking-wider">Key Requirements:</div>
                  <ul className="space-y-1">
                    {semester.project.requirements.slice(0, 2).map((req, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status & Open Button */}
                <div className="pt-3 border-t flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 font-semibold text-xs text-amber-600 dark:text-amber-400">
                    {isDone ? (
                      <><Award className="w-4 h-4 text-green-600" /> +{submission.creditsAwarded} CR</>
                    ) : (
                      <><Clock className="w-4 h-4 text-muted-foreground" /> Pending ({semester.project.credits} CR)</>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedProjectDetails(semester)}
                      className="text-xs font-medium"
                    >
                      Open Project
                    </Button>
                    <Button 
                      variant={isDone ? "ghost" : "default"} 
                      size="sm" 
                      onClick={() => handleOpenSubmitModal(semester.id)}
                      className="text-xs"
                    >
                      {isDone ? 'Edit' : 'Submit'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Details Modal (Open Button) */}
      <Dialog open={!!selectedProjectDetails} onOpenChange={() => setSelectedProjectDetails(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProjectDetails && (() => {
            const sem = selectedProjectDetails;
            const sub = submissions[sem.id];

            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Semester {sem.number} Project
                    </Badge>
                    {sub && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed (+{sub.creditsAwarded} CR)
                      </Badge>
                    )}
                  </div>
                  <DialogTitle className="text-2xl font-display font-bold">
                    {sem.project.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm mt-1">
                    {sem.project.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">All Project Requirements:</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      {sem.project.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-muted/40 p-2.5 rounded-lg border border-border text-xs">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {sub ? (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-500/30 space-y-2 text-xs">
                      <div className="font-bold text-green-700 dark:text-green-400 flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4" /> Submitted & Verified (+{sub.creditsAwarded} Credits)
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Repository:</span>{' '}
                        <a href={sub.repoUrl} target="_blank" rel="noreferrer" className="text-primary underline flex-inline items-center gap-1">
                          {sub.repoUrl} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </div>
                      {sub.demoUrl && (
                        <div>
                          <span className="font-semibold text-foreground">Live Application Demo:</span>{' '}
                          <a href={sub.demoUrl} target="_blank" rel="noreferrer" className="text-primary underline flex-inline items-center gap-1">
                            {sub.demoUrl} <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        </div>
                      )}
                      {sub.notes && (
                        <div className="pt-1 text-muted-foreground border-t border-green-200 dark:border-green-800/40">
                          <span className="font-semibold text-foreground">Notes:</span> {sub.notes}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground flex items-center justify-between">
                      <span>Status: Not submitted yet. Submit to earn +{sem.project.credits} Credits.</span>
                      <Button size="sm" onClick={() => {
                        setSelectedProjectDetails(null);
                        handleOpenSubmitModal(sem.id);
                      }}>
                        Submit Solution
                      </Button>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedProjectDetails(null)}>Close</Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Submit Project Modal (Right Side Corner Button) */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <FolderGit2 className="w-5 h-5 text-primary" /> Submit Project Solution
            </DialogTitle>
            <DialogDescription>
              Select your semester project and submit repository / demo links to earn credits and update your portfolio.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Select Semester Project *</label>
              <select 
                className="w-full p-2.5 rounded-md border border-input text-sm bg-background font-medium focus:ring-1 focus:ring-primary"
                value={selectedSemesterId}
                onChange={e => {
                  setSelectedSemesterId(e.target.value);
                  const existing = submissions[e.target.value];
                  if (existing) {
                    setRepoUrl(existing.repoUrl || '');
                    setDemoUrl(existing.demoUrl || '');
                    setNotes(existing.notes || '');
                  } else {
                    setRepoUrl('');
                    setDemoUrl('');
                    setNotes('');
                  }
                }}
              >
                {ROADMAP_DATA.map(sem => (
                  <option key={sem.id} value={sem.id}>
                    Semester {sem.number}: {sem.project.title} (+{sem.project.credits} CR)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">GitHub / Code Repository URL *</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="https://github.com/username/project-repo" 
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Live Demo Application URL (Optional)</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="https://my-app.vercel.app" 
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Implementation Notes & Description</label>
              <Textarea 
                placeholder="Describe key feature highlights, tech stack used, and AI workflow tools..." 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsSubmitModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2 font-semibold">
                <Upload className="w-4 h-4" /> Submit & Earn +100 Credits
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
