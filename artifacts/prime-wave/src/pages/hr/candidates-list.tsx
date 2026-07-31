import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetCompanyCandidatesList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Users, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

export default function CandidatesList() {
  const { data: res } = useGetCompanyCandidatesList({
    query: { queryKey: ['hrCandidates'], retry: false, staleTime: 5 * 60 * 1000 }
  });

  

  const candidatesData = (res as any)?.data || [];

  return (
    <SidebarLayout userType="hr">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Candidate Pool</h1>
          <p className="text-muted-foreground mt-1">Review student applicants, match scores, and shortlist talent.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search candidates..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>University & Degree</TableHead>
                <TableHead>PPS Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidatesData.map((candidate: any, idx: number) => (
                <TableRow key={candidate.studentId || idx}>
                  <TableCell className="font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {(candidate.name || 'C').charAt(0)}
                    </div>
                    {candidate.name || 'Candidate'}
                  </TableCell>
                  <TableCell>
                    <div>{candidate.university || 'University'}</div>
                    <div className="text-xs text-muted-foreground">{candidate.degree || 'Degree'}</div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-primary">{candidate.ppsScore || 90} PPS</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
                      {candidate.status || 'Applied'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/hr/candidates/${candidate.studentId || 'u1'}`}>
                      <Button size="sm" variant="outline" className="gap-1">
                        View Profile <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
