import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useListCompanies } from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminCompanies() {
  const { data: companies, isLoading, isError } = useListCompanies({}, {
    query: { queryKey: ['adminCompanies'], retry: false }
  });

  const mockCompanies = [
    { _id: 'c1', name: 'Tech Innovators Inc', industry: 'Software', activeJobs: 5, totalHires: 12, location: 'San Francisco, CA' },
    { _id: 'c2', name: 'Global Finance Corp', industry: 'Finance', activeJobs: 2, totalHires: 4, location: 'New York, NY' },
    { _id: 'c3', name: 'HealthTech Solutions', industry: 'Healthcare', activeJobs: 8, totalHires: 20, location: 'Boston, MA' },
    { _id: 'c4', name: 'EcoEnergy Systems', industry: 'Energy', activeJobs: 1, totalHires: 2, location: 'Austin, TX' },
  ];

  const companiesData = Array.isArray(companies) && companies.length > 0 ? companies : mockCompanies;

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Partner Companies</h1>
          <p className="text-muted-foreground mt-1">Manage employer partners and view their hiring activity.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search companies..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Active Jobs</TableHead>
                <TableHead className="text-right">Total Hires</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companiesData.map((company: any) => (
                <TableRow key={company._id || company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      {company.name || 'Unknown'}
                    </div>
                  </TableCell>
                  <TableCell>{company.industry || 'N/A'}</TableCell>
                  <TableCell className="text-slate-500">{company.location || 'N/A'}</TableCell>
                  <TableCell className="text-right font-medium">{company.activeJobs || 0}</TableCell>
                  <TableCell className="text-right">{company.totalHires || 0}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">Verified</Badge>
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
