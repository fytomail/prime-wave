import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetPortfolio } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github, Linkedin, Target, Calendar, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CandidateProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const { toast } = useToast();

  const { data: portfolio, isLoading } = useGetPortfolio(Number(studentId), {
    query: { enabled: !!studentId, queryKey: ['portfolio', Number(studentId)] }
  });

  const handleSchedule = () => {
    toast({
      title: "Interview Request Sent",
      description: "The candidate will be notified of your interest."
    });
  };

  const portfolioData = portfolio || {
    studentId: studentId,
    studentName: "Alice",
    university: "MIT",
    githubUrl: "https://github.com/alice",
    linkedinUrl: "https://linkedin.com/in/alice",
    ppsScore: 95,
    industryReadiness: 90,
    projects: [
      { id: "p1", title: "E-Commerce", score: 95, description: "Microservices backend.", techStack: ["Node", "Mongo"] }
    ],
    skills: ["React", "TypeScript", "Node.js"],
    certificates: [
      { id: "c1", type: "course", title: "Frontend", verificationCode: "CERT-ABCD" }
    ]
  };

  return (
    <SidebarLayout userType="hr">
      <Link href="/hr/jobs">
        <Button variant="ghost" size="sm" className="-ml-3 mb-4 gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </Link>

      {/* Profile Header (HR View) */}
      <Card className="mb-8 border border-primary/20 shadow-sm overflow-hidden bg-white">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative">
          <div className="w-24 h-24 rounded-full border bg-slate-100 flex flex-shrink-0 items-center justify-center text-3xl font-display font-bold text-slate-700">
            {portfolioData.studentName?.charAt(0) || 'S'}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">{portfolioData.studentName}</h2>
            <p className="text-lg text-slate-600 mb-4">{portfolioData.university}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {portfolioData.githubUrl && (
                <Button variant="outline" size="sm" className="gap-2 text-slate-600" asChild>
                  <a href={portfolioData.githubUrl} target="_blank" rel="noreferrer"><Github className="w-4 h-4" /> GitHub</a>
                </Button>
              )}
              {portfolioData.linkedinUrl && (
                <Button variant="outline" size="sm" className="gap-2 text-slate-600" asChild>
                  <a href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end w-full md:w-auto mt-4 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PPS Score</div>
                <div className="text-3xl font-display font-bold text-primary">{portfolioData.ppsScore}</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Readiness</div>
                <div className="text-3xl font-display font-bold text-green-600">{portfolioData.industryReadiness}%</div>
              </div>
            </div>
            <Button onClick={handleSchedule} className="w-full gap-2"><Calendar className="w-4 h-4" /> Schedule Interview</Button>
            <Button variant="secondary" className="w-full gap-2"><MessageSquare className="w-4 h-4" /> Message Candidate</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-display font-bold text-slate-900 border-b pb-2">Verified Projects</h3>
          
          <div className="space-y-4">
            {portfolioData.projects?.map(project => (
              <Card key={project.id} className="border border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>
                    {project.score && <Badge variant="secondary" className="bg-primary/10 text-primary font-bold border-0">{project.score}/100 AI Score</Badge>}
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack?.map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200">{tech}</span>
                    ))}
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline">
                      Review Source Code <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills?.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-white border-slate-300 text-slate-700">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">Prime Wave Certifications</h3>
              <div className="space-y-3">
                {portfolioData.certificates?.map(cert => (
                  <div key={cert.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{cert.type}</div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">{cert.title}</div>
                    <div className="text-xs text-slate-500 font-mono">ID: {cert.verificationCode}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
