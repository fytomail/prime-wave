import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetHrDashboard } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Users, Briefcase, Target, Building2, ChevronRight, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HrDashboard() {
  const companyId = 1;
  const { data: dashboard, isLoading } = useGetHrDashboard(companyId, {
    query: { queryKey: ['hrDashboard', companyId] }
  });

  if (isLoading || !dashboard) {
    return (
      <SidebarLayout userType="hr">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-32" /><Skeleton className="h-32" />
          <Skeleton className="h-32" /><Skeleton className="h-32" />
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout userType="hr">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Company Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your hiring pipeline on Prime Wave.</p>
        </div>
        <Link href="/hr/jobs">
          <Button className="gap-2"><Briefcase className="w-4 h-4" /> Manage Jobs</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">Active Jobs</p>
                <h3 className="text-4xl font-display font-bold mt-2">{dashboard.activeJobs}</h3>
              </div>
              <Briefcase className="w-6 h-6 text-primary-foreground/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                <h3 className="text-4xl font-display font-bold mt-2 text-slate-900">{dashboard.totalApplicants}</h3>
              </div>
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Match Score</p>
                <h3 className="text-4xl font-display font-bold mt-2 text-green-600">{dashboard.avgMatchScore}%</h3>
              </div>
              <Target className="w-6 h-6 text-green-600/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Hired</p>
                <h3 className="text-4xl font-display font-bold mt-2 text-indigo-600">{dashboard.totalHired}</h3>
              </div>
              <UserPlus className="w-6 h-6 text-indigo-600/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-display">Recent AI-Matched Candidates</CardTitle>
          <Link href="/hr/jobs">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">View All <ChevronRight className="w-4 h-4" /></Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {dashboard.recentCandidates?.map((candidate) => (
              <div key={candidate.studentId} className="py-4 first:pt-0 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg border">
                    {candidate.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{candidate.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{candidate.university || 'Prime Wave Academy'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Match</div>
                    <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 font-bold">
                      {candidate.matchScore}%
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">PPS</div>
                    <div className="font-bold text-slate-900">{candidate.ppsScore}</div>
                  </div>
                  <Link href={`/hr/candidates/${candidate.studentId}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                </div>
              </div>
            ))}
            {!dashboard.recentCandidates?.length && (
              <div className="text-center py-8 text-muted-foreground">
                No new candidates matched recently. Make sure your job requirements are up to date.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
