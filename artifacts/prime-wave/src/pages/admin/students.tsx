import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useListStudents } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminStudents() {
  const { data: students, isLoading, isError } = useListStudents({}, {
    query: { queryKey: ['adminStudents'], retry: false }
  });

  

  const studentsData = Array.isArray(students) ? students : [];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Registered Students</h1>
          <p className="text-muted-foreground mt-1">Manage and view all students on the platform.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search students..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>PPS Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.map((student: any) => (
                <TableRow key={student._id || student.id || student.email}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium shrink-0">
                        {student.name?.charAt(0) || 'S'}
                      </div>
                      {student.name || 'Unknown'}
                    </div>
                  </TableCell>
                  <TableCell>{student.university || 'N/A'}</TableCell>
                  <TableCell className="text-slate-500">{student.email}</TableCell>
                  <TableCell>{student.creditScore || student.creditsEarned || 0}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      (student.ppsScore || 0) >= 90 ? "bg-green-50 text-green-700 border-green-200" :
                      (student.ppsScore || 0) >= 80 ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }>
                      {student.ppsScore || 0}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
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
