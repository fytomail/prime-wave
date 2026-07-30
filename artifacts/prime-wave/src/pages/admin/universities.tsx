import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAdminUniversitiesList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminUniversities() {
  const { data: res } = useGetAdminUniversitiesList({
    query: { queryKey: ['adminUniversities'], retry: false }
  });
  const universitiesData = (res as any)?.data || [];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Universities Directory</h1>
          <p className="text-muted-foreground mt-1">Manage partner universities and campus enrollments.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search universities..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>University</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Enrolled Students</TableHead>
                <TableHead>Semesters Active</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universitiesData.map((uni: any, idx: number) => (
                <TableRow key={uni._id || idx}>
                  <TableCell className="font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    {uni.name || uni.university || 'University'}
                  </TableCell>
                  <TableCell>{uni.location || 'USA'}</TableCell>
                  <TableCell className="font-mono">{uni.enrolledStudents || uni.count || 1200}</TableCell>
                  <TableCell>{uni.activeSemesters || 8}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">Active Partner</Badge>
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
