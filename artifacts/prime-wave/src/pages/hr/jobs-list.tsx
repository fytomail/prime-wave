import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useListJobs } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Plus, Users, Target, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function JobsList() {
  const companyId = 1;
  const { data: jobs, isLoading } = useListJobs({ companyId }, {
    query: { queryKey: ['jobs', companyId] }
  });

  return (
    <SidebarLayout userType="hr">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Job Postings</h1>
          <p className="text-muted-foreground mt-1">Manage open roles and view matched candidates.</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Post New Job</Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : jobs?.map(job => (
          <Card key={job.id} className="hover:border-primary/40 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                  <Badge variant={job.status === 'open' ? 'default' : 'secondary'} className={job.status === 'open' ? 'bg-green-500 hover:bg-green-600' : ''}>
                    {job.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location || 'Remote'}</span>
                  <span>Min PPS: <strong className="text-slate-700">{job.minPpsScore || 0}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills?.map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-primary">{job.applicantsCount || 0}</div>
                  <div className="text-xs font-medium text-muted-foreground uppercase flex items-center justify-center gap-1 mt-1">
                    <Users className="w-3 h-3" /> Matches
                  </div>
                </div>
                <Link href={`/hr/jobs/${job.id}`}>
                  <Button>View Candidates</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {!jobs?.length && !isLoading && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
            No active jobs. Create a posting to let our AI match you with top engineering talent.
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
