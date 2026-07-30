import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetJob, useGetJobCandidates } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Award, UserCircle } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: job, isLoading: loadingJob } = useGetJob(Number(id), {
    query: { enabled: !!id, queryKey: ['job', Number(id)] }
  });

  const { data: candidates, isLoading: loadingCands } = useGetJobCandidates(Number(id), {
    query: { enabled: !!id, queryKey: ['jobCandidates', Number(id)] }
  });

  
  const jobData = job && typeof job === 'object' ? job : null;
  if (!jobData) {
    return (
      <SidebarLayout userType="hr">
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">No data available yet.</p>
        </div>
      </SidebarLayout>
    );
  }

  
  const candidatesData = Array.isArray(candidates) ? candidates : [];

  return (
    <SidebarLayout userType="hr">
      <Link href="/hr/jobs">
        <Button variant="ghost" size="sm" className="-ml-3 mb-4 gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Button>
      </Link>

      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">{jobData.title}</h1>
            <p className="text-muted-foreground mt-1">{jobData.location || 'Remote'} • Min PPS: {jobData.minPpsScore}</p>
          </div>
          <Badge variant="outline" className="bg-slate-50 text-slate-700">{jobData.status.toUpperCase()}</Badge>
        </div>
        <p className="text-sm text-slate-600 max-w-3xl mb-4">{jobData.description}</p>
        <div className="flex gap-2">
          {jobData.requiredSkills?.map(s => <Badge key={s} variant="secondary" className="font-mono text-xs">{s}</Badge>)}
        </div>
      </div>

      <h2 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" /> AI Matched Candidates
      </h2>

      <div className="grid gap-4">
        {candidatesData?.length ? (
          candidatesData.map((cand) => (
            <Card key={cand.studentId} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center font-display font-bold text-2xl text-slate-600 border border-slate-200">
                    {cand.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{cand.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{cand.university} • Semester {cand.semesterNumber}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm font-medium">
                      <span className="text-primary flex items-center gap-1"><Award className="w-4 h-4"/> PPS: {cand.ppsScore}</span>
                      {cand.industryReadiness && cand.industryReadiness > 70 && (
                         <span className="text-green-600 flex items-center gap-1">Industry Ready ({cand.industryReadiness}%)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Match Score</div>
                    <div className="text-3xl font-display font-bold text-green-600">{cand.matchScore}%</div>
                  </div>
                  <Link href={`/hr/candidates/${cand.studentId}`}>
                    <Button className="gap-2">Profile <UserCircle className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
           <div className="text-center py-12 border rounded-xl bg-slate-50 text-slate-500">
             No candidates match the criteria yet. Check back later or adjust the job requirements.
           </div>
        )}
      </div>
    </SidebarLayout>
  );
}
