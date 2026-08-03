import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Users, ExternalLink, Sparkles, Filter, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

const DEFAULT_CANDIDATES = [
  {
    id: 'u1',
    name: 'Santhosh M',
    university: 'Anna University',
    degree: 'B.E. Computer Science & Engineering',
    ppsScore: 98,
    status: 'Shortlisted',
    credits: 800,
    skills: ['React', 'TypeScript', 'Node.js', 'AI Vibe Coding']
  },
  {
    id: 'u2',
    name: 'Alice Chen',
    university: 'Stanford University',
    degree: 'M.S. Artificial Intelligence',
    ppsScore: 96,
    status: 'Interview Scheduled',
    credits: 760,
    skills: ['Python', 'PyTorch', 'FastAPI', 'RAG']
  },
  {
    id: 'u3',
    name: 'Karthik Raja',
    university: 'Vellore Institute of Technology (VIT)',
    degree: 'B.Tech Information Technology',
    ppsScore: 94,
    status: 'Under Review',
    credits: 710,
    skills: ['Next.js', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    id: 'u4',
    name: 'Priya Sharma',
    university: 'SRM Institute of Technology',
    degree: 'B.Tech Software Engineering',
    ppsScore: 92,
    status: 'Shortlisted',
    credits: 680,
    skills: ['React Native', 'GraphQL', 'Docker']
  },
  {
    id: 'u5',
    name: 'David Miller',
    university: 'MIT',
    degree: 'B.S. Computer Science',
    ppsScore: 90,
    status: 'Offer Extended',
    credits: 650,
    skills: ['Go', 'Kubernetes', 'AWS', 'Microservices']
  }
];

export default function CandidatesList() {
  const [searchQuery, setSearchQuery] = useState('');

  const candidatesData = DEFAULT_CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SidebarLayout userType="hr">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Job Readiness Candidate Match
          </div>
          <h1 className="text-3xl font-display font-bold">Candidate Pool</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Browse verified student candidates, review AI Job Readiness scores, and invite candidates for interviews.
          </p>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search candidate by name, university, or skill..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 bg-background" 
          />
        </div>
      </div>

      <Card className="border-border shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>University & Degree</TableHead>
                <TableHead>Skills & Stack</TableHead>
                <TableHead>PPS Readiness Score</TableHead>
                <TableHead>Hiring Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidatesData.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-bold flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-foreground">{candidate.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{candidate.credits} Verified Credits</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-foreground text-xs">{candidate.university}</div>
                    <div className="text-[11px] text-muted-foreground">{candidate.degree}</div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {candidate.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono font-extrabold text-primary text-sm flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-500" />
                      {candidate.ppsScore} PPS
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50 text-xs">
                      {candidate.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Link href={`/hr/candidates/${candidate.id}`}>
                      <Button size="sm" variant="outline" className="gap-1 text-xs">
                        View Profile <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {candidatesData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No matching candidates found in the talent pool.
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
