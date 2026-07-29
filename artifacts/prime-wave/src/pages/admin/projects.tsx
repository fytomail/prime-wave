import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAdminProjectsList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Code2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminProjects() {
  const { data: res } = useGetAdminProjectsList({
    query: { queryKey: ['adminProjects'], retry: false }
  });
  const data = (res as any)?.data || [
    { _id: 'p1', title: 'E-Commerce Microservices Backend', category: 'Backend', activeTeams: 45, status: 'Active' },
    { _id: 'p2', title: 'RAG AI Assistant Dashboard', category: 'AI / LLM', activeTeams: 32, status: 'Active' },
    { _id: 'p3', title: 'Real-time Chat App', category: 'Full Stack', activeTeams: 28, status: 'Active' }
  ];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Projects Management</h1>
          <p className="text-muted-foreground mt-1">Manage capstones, mini-projects, and student project submissions.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search projects..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Active Teams</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any, idx: number) => (
                <TableRow key={item._id || idx}>
                  <TableCell className="font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    {item.title}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-mono">{item.activeTeams} teams</TableCell>
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
