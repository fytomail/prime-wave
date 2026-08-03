import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Code2, FolderGit2, Award } from 'lucide-react';
import { ROADMAP_DATA, Semester } from '@/lib/roadmap-data';

export default function AdminProjects() {
  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Flagship Projects Catalog</h1>
        <p className="text-muted-foreground mt-1">Review the 8 flagship semester projects required for student portfolio verification.</p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-primary" /> 8 Semester Flagship Projects ({ROADMAP_DATA.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              100 Credits per Semester Project
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Project Title</TableHead>
                <TableHead className="max-w-[350px]">Project Description</TableHead>
                <TableHead>Requirements Count</TableHead>
                <TableHead className="text-right">Credit Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROADMAP_DATA.map((sem: Semester) => (
                <TableRow key={sem.id}>
                  <TableCell className="font-bold">
                    <Badge variant="secondary">Semester {sem.number}</Badge>
                  </TableCell>

                  <TableCell className="font-bold text-foreground text-sm">
                    {sem.project.title}
                  </TableCell>

                  <TableCell className="max-w-[350px] text-xs text-muted-foreground line-clamp-2">
                    {sem.project.description}
                  </TableCell>

                  <TableCell className="text-xs font-semibold text-primary">
                    {sem.project.requirements.length} Core Requirements
                  </TableCell>

                  <TableCell className="text-right font-bold text-amber-600 dark:text-amber-400 text-xs">
                    +{sem.project.credits} Credits
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
