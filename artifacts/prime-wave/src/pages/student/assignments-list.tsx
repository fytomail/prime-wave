import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAssignments } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { FileCode2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

export default function AssignmentsList() {
  const { user } = useAuth();
  const studentId = user?._id || '';

  const { data: assignmentsRes, isLoading } = useGetAssignments({
    studentId: studentId
  }, {
    query: { enabled: !!studentId, queryKey: ['assignments', studentId] }
  });
  const assignments = Array.isArray(assignmentsRes) ? assignmentsRes : assignmentsRes?.data;

  const mockAssignments = [
    { id: "a1", title: "Build a React App", description: "Create a simple React app with state.", status: "pending", type: "code", maxScore: 100, deadline: new Date(Date.now() + 86400000).toISOString() },
    { id: "a2", title: "API Integration", description: "Fetch data from a public API.", status: "submitted", type: "code", maxScore: 100 },
    { id: "a3", title: "CSS Styling", description: "Style a page using Tailwind.", status: "passed", type: "code", maxScore: 100 }
  ];
  const assignmentsData = Array.isArray(assignments) && assignments.length > 0 ? assignments : mockAssignments;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'passed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'submitted': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <FileCode2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'passed': return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">Passed</Badge>;
      case 'failed': return <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">Needs Revision</Badge>;
      case 'submitted': return <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">Evaluating</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <SidebarLayout userType="student">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-1">Code challenges and theoretical questions to prove your mastery.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {assignmentsData.map((assignment) => (
            <Card key={assignment.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-muted rounded-lg shrink-0">
                    {getStatusIcon(assignment.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{assignment.title}</h3>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl">
                      {assignment.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5 px-2 py-1 bg-secondary rounded">
                        <FileCode2 className="w-3 h-3" /> {assignment.type.toUpperCase()}
                      </span>
                      {assignment.deadline && (
                        <span className="flex items-center gap-1.5 text-red-500">
                          <Clock className="w-3 h-3" /> Due {format(new Date(assignment.deadline), 'MMM d')}
                        </span>
                      )}
                      <span>Max Score: {assignment.maxScore}</span>
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 flex justify-end">
                  <Link href={`/assignments/${assignment.id}`}>
                    <Button variant={assignment.status === 'passed' ? 'outline' : 'default'}>
                      {assignment.status === 'passed' ? 'View Feedback' : 'Open Assignment'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </SidebarLayout>
  );
}
