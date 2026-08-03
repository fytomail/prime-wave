import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useParams, Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Send, CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon, 
  Link2, Upload, ExternalLink, Award, Trophy, Lock 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ASSIGNMENTS_DATA, Assignment } from '@/lib/assignments-data';
import { 
  isAssignmentUnlocked, 
  isAssignmentCompleted, 
  submitAssignmentAction, 
  getAssignmentSubmission, 
  AssignmentSubmission 
} from '@/lib/assignments-store';

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Find assignment
  let currentAssignment: Assignment | null = null;
  for (const group of ASSIGNMENTS_DATA) {
    const found = group.assignments.find(a => a.id === id);
    if (found) {
      currentAssignment = found;
      break;
    }
  }

  // Fallback to first assignment if not found
  if (!currentAssignment) {
    currentAssignment = ASSIGNMENTS_DATA[0].assignments[0];
  }

  const asgId = currentAssignment.id;
  const isUnlocked = isAssignmentUnlocked(
    currentAssignment.semesterNumber, 
    currentAssignment.assignmentNumber, 
    asgId
  );
  const isCompleted = isAssignmentCompleted(asgId);
  const existingSubmission = getAssignmentSubmission(asgId);

  // Form State
  const [urlLink, setUrlLink] = useState(existingSubmission?.urlLink || '');
  const [imageUrl, setImageUrl] = useState(existingSubmission?.imageUrl || '');
  const [notes, setNotes] = useState(existingSubmission?.notes || '');
  const [imagePreview, setImagePreview] = useState(existingSubmission?.imageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingSubmission) {
      setUrlLink(existingSubmission.urlLink);
      setImageUrl(existingSubmission.imageUrl || '');
      setNotes(existingSubmission.notes || '');
      setImagePreview(existingSubmission.imageUrl || '');
    }
  }, [asgId]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlLink.trim()) {
      toast({
        title: "URL Link Required",
        description: "Please enter your GitHub repository or application URL link.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const sub = submitAssignmentAction(asgId, {
        urlLink: urlLink.trim(),
        imageUrl: imageUrl.trim() || imagePreview,
        notes: notes.trim()
      });

      setIsSubmitting(false);
      toast({
        title: "Assignment Evaluated & Passed! 🎉",
        description: `Score: ${sub.score}/100. Awarded +${sub.creditsEarned} Credits! Next assignment unlocked.`,
      });
      window.dispatchEvent(new Event('assignments-progress-updated'));
    }, 800);
  };

  return (
    <SidebarLayout userType="student">
      {/* Top Breadcrumb */}
      <Link href="/assignments">
        <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Assignments
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary/30">
                    Semester {currentAssignment.semesterNumber} • Assignment {currentAssignment.assignmentNumber}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Passed ({existingSubmission?.score || 95}/100)
                    </Badge>
                  )}
                </div>
                <div className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Award className="w-4 h-4" /> +{currentAssignment.creditsAwarded} Credits
                </div>
              </div>

              <CardTitle className="text-2xl sm:text-3xl font-display">{currentAssignment.title}</CardTitle>
              <CardDescription className="text-base mt-1">{currentAssignment.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 space-y-2">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Assignment Requirements:</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  {currentAssignment.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-background/80 p-2.5 rounded-lg border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Submission Form Component */}
          {isUnlocked ? (
            <Card className="border-primary/30 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-display">
                  <Upload className="w-5 h-5 text-primary" /> {isCompleted ? 'Update Solution Submission' : 'Submit Assignment Solution'}
                </CardTitle>
                <CardDescription>
                  Upload screenshots/images and paste your solution URL link. AI will evaluate your submission instantly.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* URL Link Input */}
                  <div className="space-y-2">
                    <Label htmlFor="urlLink" className="text-sm font-semibold flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-primary" /> Repository or Live Application URL *
                    </Label>
                    <Input 
                      id="urlLink" 
                      placeholder="https://github.com/username/project-repo or https://my-app.vercel.app" 
                      value={urlLink}
                      onChange={e => setUrlLink(e.target.value)}
                      required
                    />
                  </div>

                  {/* Image / Screenshot Upload Field */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUpload" className="text-sm font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-primary" /> Assignment Screenshot / Image Evidence
                    </Label>

                    <div className="grid sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <Input 
                          id="imageUpload" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageFileChange}
                          className="cursor-pointer text-xs"
                        />
                        <span className="text-[11px] text-muted-foreground mt-1 block">
                          Or enter an image URL link below:
                        </span>
                        <Input 
                          placeholder="https://example.com/screenshot.png" 
                          value={imageUrl}
                          onChange={e => {
                            setImageUrl(e.target.value);
                            setImagePreview(e.target.value);
                          }}
                          className="mt-1 text-xs"
                        />
                      </div>

                      {/* Image Preview Box */}
                      {imagePreview ? (
                        <div className="relative rounded-lg overflow-hidden border border-border bg-muted h-32 flex items-center justify-center">
                          <img src={imagePreview} alt="Assignment Screenshot" className="object-cover w-full h-full" />
                          <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px] bg-background/80 backdrop-blur">
                            Preview
                          </Badge>
                        </div>
                      ) : (
                        <div className="rounded-lg border-2 border-dashed border-muted-foreground/20 h-32 flex flex-col items-center justify-center text-muted-foreground text-xs p-4 text-center">
                          <ImageIcon className="w-6 h-6 mb-1 text-muted-foreground/50" />
                          <span>No screenshot selected</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes & Description Field */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-semibold">
                      Notes / Implementation Highlights
                    </Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any notes about your solution, prompts used, or technical highlights..." 
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2 font-semibold shadow-md">
                    {isSubmitting ? 'Evaluating Submission...' : 'Submit Assignment for AI Evaluation'}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-muted bg-muted/40">
              <CardContent className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Assignment Locked</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Complete the previous assignment (Assignment {currentAssignment.semesterNumber}.{currentAssignment.assignmentNumber - 1}) to unlock this challenge.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Evaluation & Feedback Sidebar */}
        <div className="space-y-6">
          {existingSubmission ? (
            <>
              <Card className="border-green-500/40 bg-green-50/30 dark:bg-green-950/20 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-lg">
                    <CheckCircle2 className="w-5 h-5" /> Evaluation Passed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-3 border-b border-green-200/60 dark:border-green-800/40">
                    <div className="text-4xl font-display font-bold text-green-700 dark:text-green-400">
                      {existingSubmission.score}
                    </div>
                    <div className="text-xs font-semibold text-green-600 dark:text-green-400 mt-0.5">
                      / 100 Evaluated Score (+{existingSubmission.creditsEarned} Credits)
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requirement Match:</span>
                      <span className="font-bold text-foreground">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted At:</span>
                      <span className="font-medium text-foreground">
                        {new Date(existingSubmission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-base">
                    <Sparkles className="w-4 h-4" /> AI Feedback & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs leading-relaxed">
                  <p className="text-muted-foreground">
                    {existingSubmission.feedback}
                  </p>
                  
                  {existingSubmission.urlLink && (
                    <div className="p-2.5 rounded bg-muted border border-border">
                      <span className="font-semibold text-foreground block mb-1">Submitted URL Link:</span>
                      <a href={existingSubmission.urlLink} target="_blank" rel="noreferrer" className="text-primary underline flex items-center gap-1 break-all">
                        {existingSubmission.urlLink} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Trophy className="w-4 h-4" /> Evaluation Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-3 text-muted-foreground">
                <p>Submit your repository or application URL and screenshot image to trigger automated evaluation.</p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>Earn +50 Credits upon passing</li>
                  <li>Unlock the next assignment immediately</li>
                  <li>Receive instant AI evaluation score and feedback</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
