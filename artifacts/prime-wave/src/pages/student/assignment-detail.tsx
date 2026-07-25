import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useParams, Link } from 'wouter';
import { useGetAssignment, useGetAssignmentEvaluation, useSubmitAssignment } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const studentId = 1;
  const { toast } = useToast();

  const { data: assignment, isLoading: loadingAss } = useGetAssignment(Number(id), {
    query: { enabled: !!id, queryKey: ['assignment', Number(id)] }
  });

  const { data: evaluation, isLoading: loadingEval } = useGetAssignmentEvaluation(Number(id), studentId, {
    query: { enabled: !!id && assignment?.status === 'passed', queryKey: ['evaluation', Number(id)] }
  });

  const submitMut = useSubmitAssignment({
    mutation: {
      onSuccess: () => {
        toast({ title: 'Submitted successfully', description: 'AI is evaluating your code.' });
      }
    }
  });

  const { register, handleSubmit } = useForm({
    defaultValues: { githubUrl: '', content: '' }
  });

  const onSubmit = (data: any) => {
    submitMut.mutate({
      data: { studentId, ...data }
    });
  };

  if (loadingAss || !assignment) {
    return (
      <SidebarLayout userType="student">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <Skeleton className="h-[400px] w-full" />
      </SidebarLayout>
    );
  }

  const isCompleted = assignment.status === 'passed';

  return (
    <SidebarLayout userType="student">
      <Link href="/assignments">
        <Button variant="ghost" size="sm" className="mb-6 -ml-3 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Assignments
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-display">{assignment.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{assignment.description}</CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-muted-foreground block">Max Score</span>
                  <span className="text-2xl font-display font-bold text-primary">{assignment.maxScore}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h4>Requirements</h4>
                <ul>
                  <li>Implement the core logic as described.</li>
                  <li>Ensure all edge cases are handled.</li>
                  <li>Write clean, documented code.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {!isCompleted && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {assignment.type === 'code' && (
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                      <Input id="githubUrl" placeholder="https://github.com/username/repo" {...register('githubUrl')} />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="content">Notes / Code Snippet</Label>
                    <Textarea id="content" className="font-mono h-48" placeholder="Paste your code or add notes here..." {...register('content')} />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={submitMut.isPending}>
                    {submitMut.isPending ? 'Submitting...' : 'Submit for Evaluation'} <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {isCompleted && evaluation && (
          <div className="space-y-6">
            <Card className="border-green-500/50 bg-green-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" /> Passed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 border-b border-green-200/50 mb-4">
                  <div className="text-5xl font-display font-bold text-green-700">{evaluation.overallScore}</div>
                  <div className="text-sm font-medium text-green-600 mt-1">/ 100 Overall Score</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Logic</span> <span className="font-semibold">{evaluation.logic}/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Code Quality</span> <span className="font-semibold">{evaluation.codeQuality}/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Performance</span> <span className="font-semibold">{evaluation.performance}/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-primary text-base">
                  <Sparkles className="w-4 h-4" /> AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {evaluation.feedback}
                </p>
                {evaluation.improvementPlan && (
                  <div className="bg-primary/5 rounded-lg p-3 text-sm border border-primary/10">
                    <span className="font-semibold block mb-1">How to improve:</span>
                    {evaluation.improvementPlan}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
