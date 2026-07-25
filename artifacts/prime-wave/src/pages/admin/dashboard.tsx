import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetPlatformDashboard } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Building, Briefcase, Award, TrendingUp, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PlatformAdmin() {
  const { data: dashboard, isLoading } = useGetPlatformDashboard({
    query: { queryKey: ['platformDashboard'] }
  });

  if (isLoading || !dashboard) {
    return (
      <SidebarLayout userType="admin">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-32" /><Skeleton className="h-32" />
          <Skeleton className="h-32" /><Skeleton className="h-32" />
        </div>
        <Skeleton className="h-[400px]" />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">High-level metrics across students, universities, and employers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Students</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboard.totalStudents}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Users className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Partner Companies</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboard.totalCompanies}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg text-purple-500"><Building className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Placement Rate</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboard.placementRate}%</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-green-500"><TrendingUp className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Certs Issued</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboard.totalCertificatesIssued}</h3>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><Award className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students by Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboard.studentsPerSemester || []} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="semester" tickFormatter={(val) => `Sem ${val}`} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Universities by Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboard.topUniversities?.map((uni, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-slate-500">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-900">{uni.university}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {uni.count} students
                  </div>
                </div>
              ))}
              {!dashboard.topUniversities?.length && (
                <p className="text-center text-muted-foreground py-8">No university data available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
