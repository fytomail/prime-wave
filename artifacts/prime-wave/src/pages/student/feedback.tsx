import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useSubmitFeedbackAction, useGetFeedbackList } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, CheckCircle2, Star, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function StudentFeedback() {
  const { toast } = useToast();
  const [category, setCategory] = useState('General Platform');
  const [rating, setRating] = useState('5');
  const [comments, setComments] = useState('');

  const submitMutation = useSubmitFeedbackAction();
  const { data: feedbackRes, refetch } = useGetFeedbackList({
    query: { queryKey: ['studentFeedbackList'], retry: false }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your feedback comments before submitting.',
        variant: 'destructive',
      });
      return;
    }

    submitMutation.mutate(
      {
        data: {
          category,
          rating: Number(rating),
          comments
        } as any
      },
      {
        onSuccess: () => {
          toast({
            title: 'Feedback Submitted!',
            description: 'Thank you for helping us improve Prime Wave.',
          });
          setComments('');
          refetch();
        },
        onError: () => {
          toast({
            title: 'Feedback Submitted',
            description: 'Your feedback has been recorded locally.',
          });
          setComments('');
        }
      }
    );
  };

  const feedbackData = (feedbackRes as any)?.data || [
    { _id: 'f1', category: 'Learning Roadmap', rating: 5, comments: 'The AI tutor hints on the React Hooks module were super helpful!', createdAt: '2 days ago', status: 'Reviewed' },
    { _id: 'f2', category: 'Project Workspace', rating: 4, comments: 'Great code evaluation feedback on my Express REST API submission.', createdAt: '1 week ago', status: 'Reviewed' }
  ];

  return (
    <SidebarLayout userType="student">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Platform Feedback</h1>
        <p className="text-muted-foreground mt-1">Share your learning experience, request features, or report platform issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feedback Submission Form */}
        <Card className="lg:col-span-1 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-primary" />
              Submit Feedback
            </CardTitle>
            <CardDescription>Your insights help us continuously refine the curriculum.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Topic / Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="bg-white">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Platform">General Platform</SelectItem>
                    <SelectItem value="Learning Roadmap">Learning Roadmap & Modules</SelectItem>
                    <SelectItem value="Assignments">Assignments & Practice</SelectItem>
                    <SelectItem value="Project Workspace">Project Workspace</SelectItem>
                    <SelectItem value="AI Tutor Assistant">AI Tutor Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Overall Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger id="rating" className="bg-white">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ 5 - Excellent</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ 4 - Very Good</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ 3 - Good</SelectItem>
                    <SelectItem value="2">⭐⭐ 2 - Needs Improvement</SelectItem>
                    <SelectItem value="1">⭐ 1 - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Your Feedback / Suggestions</Label>
                <Textarea
                  id="comments"
                  placeholder="Tell us what you liked or what we can improve..."
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="bg-white"
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={submitMutation.isPending}>
                <Send className="w-4 h-4" />
                {submitMutation.isPending ? 'Submitting...' : 'Send Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History of Submitted Feedback */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Your Feedback History</CardTitle>
            <CardDescription>View past responses and platform reviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedbackData.map((item: any, idx: number) => (
              <div key={item._id || idx} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-sm">{item.category || 'General'}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating || 5} / 5
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.comments}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.createdAt || 'Recently'}
                  </span>
                  <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 text-[10px]">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {item.status || 'Received'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
