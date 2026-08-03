import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Star, MessageSquare, GraduationCap, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getStudentFeedbacks, StudentFeedbackItem } from '@/lib/feedback-store';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<StudentFeedbackItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshFeedbacks = () => {
    setFeedbacks(getStudentFeedbacks());
  };

  useEffect(() => {
    refreshFeedbacks();
    const handleUpdate = () => refreshFeedbacks();
    window.addEventListener('student-feedback-updated', handleUpdate);
    return () => window.removeEventListener('student-feedback-updated', handleUpdate);
  }, []);

  const filteredFeedbacks = feedbacks.filter(item => 
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Student Feedbacks & Reviews</h1>
          <p className="text-muted-foreground mt-1">Review feedback submitted by students across universities and service categories.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by student, university, or text..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 bg-background" 
          />
        </div>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Admin Feedback Portal
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {filteredFeedbacks.length} Total Submissions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Service Rating</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="max-w-[320px]">Feedback Description</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((item: StudentFeedbackItem) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold text-foreground">
                    {item.studentName}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item.universityName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-foreground">{item.rating}.0</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[320px] text-xs text-foreground leading-relaxed">
                    "{item.description}"
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {item.createdAt}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200 text-[10px]' :
                        'bg-green-50 text-green-700 border-green-200 text-[10px]'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredFeedbacks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No matching student feedback found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
