import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { MessageSquare, Plus, Send, CheckCircle2, Star, Clock, GraduationCap, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getStudentFeedbacks, addStudentFeedback, StudentFeedbackItem } from '@/lib/feedback-store';

export default function StudentFeedback() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [feedbacks, setFeedbacks] = useState<StudentFeedbackItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState(user?.name || user?.username || 'Santhosh M');
  const [universityName, setUniversityName] = useState('Anna University');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('General Platform');

  const refreshFeedbacks = () => {
    setFeedbacks(getStudentFeedbacks());
  };

  useEffect(() => {
    refreshFeedbacks();
    const handleUpdate = () => refreshFeedbacks();
    window.addEventListener('student-feedback-updated', handleUpdate);
    return () => window.removeEventListener('student-feedback-updated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !universityName.trim() || !description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in student name, university, and feedback description.',
        variant: 'destructive',
      });
      return;
    }

    addStudentFeedback({
      studentName: studentName.trim(),
      universityName: universityName.trim(),
      description: description.trim(),
      rating,
      category
    });

    setIsModalOpen(false);
    setDescription('');
    toast({
      title: 'Feedback Sent to Admin! 🎉',
      description: 'Thank you for your review. Your feedback is now visible to platform administrators.',
    });
    refreshFeedbacks();
  };

  return (
    <SidebarLayout userType="student">
      {/* Header Banner with Top-Right Add Feedback Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <h1 className="text-3xl font-display font-bold">Feedback & Support</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Share your experience, rate our services, and submit feedback directly to platform administrators.
          </p>
        </div>

        {/* Right side corner Add Feedback button */}
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md shrink-0 h-11 px-5"
        >
          <Plus className="w-4 h-4" /> Add Feedback
        </Button>
      </div>

      {/* History of Student Feedbacks Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Submitted Platform Feedbacks ({feedbacks.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((item: StudentFeedbackItem) => (
            <Card key={item.id} className="border-border hover:border-primary/40 transition-all shadow-xs">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-base">{item.studentName}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      <span>{item.universityName}</span>
                    </div>
                  </div>

                  {/* Star Rating Display */}
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-foreground">{item.rating}.0</span>
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed pt-1">
                  "{item.description}"
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    Submitted on {item.createdAt}
                  </span>
                  <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 text-[10px]">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Sent to Admin ({item.status})
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Feedback Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <MessageSquare className="w-5 h-5 text-primary" /> Submit Student Feedback
            </DialogTitle>
            <DialogDescription>
              Your rating and comments will be sent directly to the Admin Portal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-sm font-semibold">Student Name *</Label>
                <Input 
                  id="studentName" 
                  value={studentName} 
                  onChange={e => setStudentName(e.target.value)} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="universityName" className="text-sm font-semibold">University Name *</Label>
                <Input 
                  id="universityName" 
                  placeholder="e.g. Anna University" 
                  value={universityName} 
                  onChange={e => setUniversityName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Service Quality Rating *</Label>
              <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star 
                      className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-300'}`} 
                    />
                  </button>
                ))}
                <span className="ml-2 font-bold text-sm text-foreground">
                  {rating} of 5 Stars ({rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : 'Needs Improvement'})
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-semibold">Feedback Category</Label>
              <select
                id="category"
                className="w-full p-2.5 rounded-md border border-input text-sm bg-background font-medium"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="General Platform">General Platform & Services</option>
                <option value="Learning Roadmap">Learning Roadmap & 8 Semesters</option>
                <option value="Assignments">Assignments & Practice</option>
                <option value="Projects Workspace">Projects Workspace</option>
                <option value="AI Tutor Assistant">AI Tutor Assistant</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">Feedback Description *</Label>
              <Textarea 
                id="description" 
                placeholder="Share your detailed thoughts, suggestions, or review of our services..." 
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2 font-semibold">
                <Send className="w-4 h-4" /> Send Feedback to Admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
