import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetFeedbackList } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export default function AdminFeedback() {
  const { data: feedbackRes, isLoading } = useGetFeedbackList({
    query: { queryKey: ['adminFeedbackList'], retry: false }
  });

  const mockFeedback = [
    { _id: 'f1', studentName: 'Alice Chen', category: 'Platform Usability', rating: 5, comments: 'The new dashboard is very intuitive and easy to use.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Pending' },
    { _id: 'f2', studentName: 'Bob Smith', category: 'Project Workspace', rating: 4, comments: 'Great code evaluation feedback on my Express REST API submission, but the editor sometimes lags.', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'Reviewed' },
    { _id: 'f3', studentName: 'Charlie Lee', category: 'Course Content', rating: 3, comments: 'Some of the advanced React topics are missing practical examples.', createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'Resolved' },
  ];

  const feedbackData = (feedbackRes as any)?.data || mockFeedback;

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Student Feedback</h1>
          <p className="text-muted-foreground mt-1">Review and manage feedback submitted by students.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search feedback..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-[300px]">Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackData.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    {item.studentName || 'Unknown Student'}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>{item.rating}</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-slate-600" title={item.comments}>
                    {item.comments}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {item.createdAt && !isNaN(Date.parse(item.createdAt)) 
                      ? format(new Date(item.createdAt), 'MMM d, yyyy')
                      : item.createdAt || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      item.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                      item.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }>
                      {item.status || 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {feedbackData.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No feedback received yet.
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
