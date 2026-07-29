import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAdminAssignmentsList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpenCheck, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminAssignments() {
  const { data: res } = useGetAdminAssignmentsList({
    query: { queryKey: ['adminAssignments'], retry: false }
  });
  const data = (res as any)?.data || [
    { _id: 'a1', title: 'Build a REST API with Express', semester: 2, totalSubmissions: 142, status: 'Published' },
    { _id: 'a2', title: 'React Hooks & State Management', semester: 3, totalSubmissions: 98, status: 'Published' },
    { _id: 'a3', title: 'Database Indexing & Optimization', semester: 4, totalSubmissions: 64, status: 'Draft' }
  ];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Assignments Management</h1>
          <p className="text-muted-foreground mt-1">Manage global student assignments, rubrics, and grading.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search assignments..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any, idx: number) => (
                <TableRow key={item._id || idx}>
                  <TableCell className="font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <BookOpenCheck className="w-4 h-4" />
                    </div>
                    {item.title}
                  </TableCell>
                  <TableCell>Semester {item.semester}</TableCell>
                  <TableCell className="font-mono">{item.totalSubmissions} submitted</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">{item.status}</Badge>
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
