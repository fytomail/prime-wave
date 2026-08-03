import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Users, Briefcase, Target, ChevronRight, UserPlus, Sparkles, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { PrimeWaveLogo } from '@/components/common/logo';

const DEMO_DASHBOARD_DATA = {
  activeJobs: 8,
  totalApplicants: 142,
  avgMatchScore: 94,
  totalHired: 12,
  recentCandidates: [
    {
      studentId: 'u1',
      studentName: 'Santhosh M',
      university: 'Anna University',
      matchScore: 98,
      ppsScore: 98,
      skills: ['React', 'TypeScript', 'AI Vibe Coding', 'Node.js']
    },
    {
      studentId: 'u2',
      studentName: 'Alice Chen',
      university: 'Stanford University',
      matchScore: 96,
      ppsScore: 96,
      skills: ['PyTorch', 'Python', 'RAG Search', 'FastAPI']
    },
    {
      studentId: 'u3',
      studentName: 'Karthik Raja',
      university: 'Vellore Institute of Technology (VIT)',
      matchScore: 94,
      ppsScore: 94,
      skills: ['Next.js', 'Tailwind CSS', 'PostgreSQL']
    },
    {
      studentId: 'u4',
      studentName: 'Priya Sharma',
      university: 'SRM Institute of Science & Tech',
      matchScore: 92,
      ppsScore: 92,
      skills: ['React Native', 'GraphQL', 'Docker']
    },
    {
      studentId: 'u5',
      studentName: 'David Miller',
      university: 'Massachusetts Institute of Technology (MIT)',
      matchScore: 90,
      ppsScore: 90,
      skills: ['Go', 'Kubernetes', 'AWS', 'Microservices']
    }
  ]
};

export default function HrDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || user?.username || 'Company Recruiter';

  return (
    <SidebarLayout userType="hr">
      {/* Header Banner with Prime Wave Logo */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-background p-2 border border-primary/20 shadow-md flex items-center justify-center shrink-0">
            <PrimeWaveLogo className="w-10 h-10" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3" /> Company Recruiter Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Welcome, {displayName}</h1>
            <p className="text-sm text-muted-foreground">Overview of your candidate pipeline and hiring metrics on Prime Wave.</p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Link href="/hr/jobs">
            <Button className="gap-2 shadow-sm"><Briefcase className="w-4 h-4" /> Manage Jobs</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider">Active Job Postings</p>
                <h3 className="text-3xl font-display font-bold mt-2">{DEMO_DASHBOARD_DATA.activeJobs} Jobs</h3>
              </div>
              <Briefcase className="w-6 h-6 text-primary-foreground/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Applicants</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{DEMO_DASHBOARD_DATA.totalApplicants}</h3>
              </div>
              <Users className="w-6 h-6 text-primary shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg. Match Score</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-green-600 dark:text-green-400">{DEMO_DASHBOARD_DATA.avgMatchScore}%</h3>
              </div>
              <Target className="w-6 h-6 text-green-600/70 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Offers Accepted</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-indigo-600 dark:text-indigo-400">{DEMO_DASHBOARD_DATA.totalHired} Hires</h3>
              </div>
              <UserPlus className="w-6 h-6 text-indigo-600/70 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Matched Candidate Pool Section */}
      <Card className="border-border shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Top AI-Matched Candidates
            </CardTitle>
            <CardDescription className="text-xs mt-1">Verified student candidates matching your active technical roles.</CardDescription>
          </div>
          <Link href="/hr/candidates">
            <Button variant="ghost" size="sm" className="gap-1 text-primary text-xs font-semibold">
              View Candidate Pool <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y border-t border-border">
            {DEMO_DASHBOARD_DATA.recentCandidates.map((candidate) => (
              <div key={candidate.studentId} className="py-4 flex items-center justify-between gap-4 flex-wrap hover:bg-muted/30 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base border border-primary/20 shrink-0">
                    {candidate.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                      {candidate.studentName}
                      <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                        {candidate.matchScore}% Match
                      </Badge>
                    </h4>
                    <p className="text-xs text-muted-foreground">{candidate.university}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase">PPS Score</div>
                    <div className="font-mono font-extrabold text-primary text-sm flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {candidate.ppsScore} PPS
                    </div>
                  </div>
                  <Link href={`/hr/candidates/${candidate.studentId}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
