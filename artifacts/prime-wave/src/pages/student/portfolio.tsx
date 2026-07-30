import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetPortfolioByStudentId } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Linkedin, Award, Briefcase, Share2, MapPin, GraduationCap } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';

export default function Portfolio() {
  const { user } = useAuth();
  const studentId = user?._id || '';
  
  const { data: portfolioRes, isLoading, isError } = useGetPortfolioByStudentId(studentId, {
    query: { enabled: !!studentId, queryKey: ['portfolio', studentId], retry: false }
  });
  const portfolio: any = (portfolioRes as any)?.data || portfolioRes;

  
  const portfolioData = portfolio && typeof portfolio === 'object' ? portfolio : null;
  if (!portfolioData) {
    return (
      <SidebarLayout userType="student">
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">No data available yet.</p>
        </div>
      </SidebarLayout>
    );
  }

  // Loading state removed so fallback data renders instantly while fetching

  return (
    <SidebarLayout userType="student">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold">Public Portfolio</h1>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" /> Share Profile
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-8 border-none shadow-md overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative">
          <div className="w-32 h-32 rounded-full border-4 border-white/20 bg-slate-700 flex flex-shrink-0 items-center justify-center text-4xl font-display font-bold">
            {portfolioData.studentName?.charAt(0) || 'S'}
          </div>
          
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-3xl font-display font-bold mb-2">{portfolioData.studentName || 'Student Name'}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300 mb-6">
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {portfolioData.university || 'University Name'}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {portfolioData.githubUrl && (
                <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-none gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              )}
              {portfolioData.linkedinUrl && (
                <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-none gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 z-10 bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-center">
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">Prime Placement Score</div>
              <div className="text-5xl font-display font-bold text-white">{portfolioData.ppsScore}</div>
            </div>
            <div className="text-center w-full pt-4 border-t border-white/10">
              <div className="text-sm font-medium text-slate-300 mb-2">Industry Readiness</div>
              <div className="w-full bg-slate-800 rounded-full h-2.5">
                <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${portfolioData.industryReadiness}%` }}></div>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-display font-bold flex items-center gap-2 border-b pb-4">
            <Briefcase className="w-6 h-6 text-primary" /> Verified Projects
          </h3>
          
          <div className="grid gap-6">
            {portfolioData.projects?.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-muted flex items-center justify-center p-6 border-r md:border-b-0 border-b">
                    <Github className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                  <CardContent className="p-6 md:w-2/3 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold">{project.title}</h4>
                      {project.score && <Badge variant="secondary" className="bg-primary/10 text-primary">{project.score} Score</Badge>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-secondary rounded text-xs font-medium">{tech}</span>
                      ))}
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline w-fit">
                        View Repository <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
            {!portfolioData.projects?.length && (
              <p className="text-muted-foreground text-center py-8">No completed projects yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-lg mb-4">Verified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills?.map(skill => (
                  <Badge key={skill} variant="outline" className="px-3 py-1.5 text-sm">{skill}</Badge>
                ))}
                {!portfolioData.skills?.length && (
                  <span className="text-muted-foreground text-sm">Skills will appear here as you complete modules.</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Certifications
              </h3>
              <div className="space-y-4">
                {portfolioData.certificates?.map(cert => (
                  <div key={cert.id} className="flex gap-3 items-start border-b last:border-0 pb-4 last:pb-0">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Issued {new Date(cert.issuedAt).getFullYear()}</p>
                      <p className="text-xs font-mono mt-1 text-slate-400">ID: {cert.verificationCode}</p>
                    </div>
                  </div>
                ))}
                {!portfolioData.certificates?.length && (
                  <p className="text-sm text-muted-foreground">No certifications earned yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
