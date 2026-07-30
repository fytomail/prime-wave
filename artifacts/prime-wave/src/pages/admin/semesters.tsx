import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAdminSemestersList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Map, BookOpen } from 'lucide-react';

export default function AdminSemesters() {
  const { data: res } = useGetAdminSemestersList({
    query: { queryKey: ['adminSemesters'], retry: false }
  });
  const semestersData = (res as any)?.data || [];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Curriculum & Semesters</h1>
        <p className="text-muted-foreground mt-1">Manage global learning roadmaps, semester modules, and topics.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Modules Included</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semestersData.map((sem: any, idx: number) => (
                <TableRow key={sem._id || idx}>
                  <TableCell className="font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-mono">
                      S{sem.semesterNumber || idx + 1}
                    </div>
                    Semester {sem.semesterNumber || idx + 1}
                  </TableCell>
                  <TableCell className="font-semibold">{sem.title}</TableCell>
                  <TableCell className="font-mono flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {sem.modulesCount || 6} Modules
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">{sem.status || 'Active'}</Badge>
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
