import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetAdminAiPromptsList } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminAiPrompts() {
  const { data: res } = useGetAdminAiPromptsList({
    query: { queryKey: ['adminAiPrompts'], retry: false }
  });
  const data = (res as any)?.data || [];

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">AI System Prompts</h1>
          <p className="text-muted-foreground mt-1">Manage AI tutor prompts, LLM model settings, and context parameters.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search AI prompts..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prompt Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Total Executions</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any, idx: number) => (
                <TableRow key={item._id || idx}>
                  <TableCell className="font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    {item.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.model}</TableCell>
                  <TableCell className="font-mono">{item.usageCount} calls</TableCell>
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
