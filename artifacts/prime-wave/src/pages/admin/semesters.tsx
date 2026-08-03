import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Layers, Award, FolderGit2, CheckCircle2 } from 'lucide-react';
import { ROADMAP_DATA, Semester } from '@/lib/roadmap-data';

export default function AdminSemesters() {
  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Curriculum & Semesters</h1>
        <p className="text-muted-foreground mt-1">Manage the 8-semester AI Developer curriculum breakdown, module topics, and final projects.</p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> 8-Semester Curriculum Roadmap Catalog
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              8 Semesters • 32 Modules
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Title & Subtitle</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Total Topics</TableHead>
                <TableHead>Semester Project</TableHead>
                <TableHead className="text-right">Project Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROADMAP_DATA.map((sem: Semester) => {
                const totalTopics = sem.modules.reduce((acc, m) => acc + m.topics.length, 0);

                return (
                  <TableRow key={sem.id}>
                    <TableCell className="font-bold">
                      <Badge variant="secondary">Semester {sem.number}</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="font-bold text-foreground">{sem.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{sem.subtitle}</div>
                    </TableCell>

                    <TableCell className="font-semibold text-xs text-primary">
                      {sem.modules.length} Modules
                    </TableCell>

                    <TableCell className="text-xs font-semibold text-foreground">
                      {totalTopics} Topics
                    </TableCell>

                    <TableCell>
                      <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {sem.project.title}
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-bold text-amber-600 dark:text-amber-400 text-xs">
                      +{sem.project.credits} Credits
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
