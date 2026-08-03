import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpenCheck, FileCode2, Award } from 'lucide-react';
import { ASSIGNMENTS_DATA, Assignment } from '@/lib/assignments-data';

export default function AdminAssignments() {
  const allAssignments: Assignment[] = [];
  ASSIGNMENTS_DATA.forEach(group => {
    group.assignments.forEach(asg => allAssignments.push(asg));
  });

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Platform Assignments Catalog</h1>
        <p className="text-muted-foreground mt-1">Manage assignments across all 8 semesters (32 total practical assignments).</p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-primary" /> Assignment Definitions ({allAssignments.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              50 Credits per Assignment
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment Code</TableHead>
                <TableHead>Title & Subtitle</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Max Score</TableHead>
                <TableHead className="text-right">Credits Awarded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAssignments.map((asg: Assignment) => (
                <TableRow key={asg.id}>
                  <TableCell className="font-bold font-mono text-xs text-primary">
                    Assignment {asg.semesterNumber}.{asg.assignmentNumber}
                  </TableCell>

                  <TableCell>
                    <div className="font-bold text-foreground text-sm">{asg.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{asg.subtitle}</div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      Semester {asg.semesterNumber}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded uppercase font-semibold">
                      {asg.type}
                    </span>
                  </TableCell>

                  <TableCell className="text-right font-bold text-xs">
                    {asg.maxScore}
                  </TableCell>

                  <TableCell className="text-right font-bold text-amber-600 dark:text-amber-400 text-xs">
                    +{asg.creditsAwarded} CR
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
