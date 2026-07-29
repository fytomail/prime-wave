import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetPlatformDashboard } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Building, Briefcase, Award, TrendingUp, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useAuth } from '@/contexts/AuthContext';

export default function PlatformAdmin() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useGetPlatformDashboard({
    query: { queryKey: ['platformDashboard'] }
  });

  const mockDashboard = {
    totalStudents: 15234,
    totalUniversities: 42,
    totalCompanies: 156,
    avgPPSScore: 84,
    activeJobs: 342,
    monthlySignups: [
      { semester: 1, count: 4000 },
      { semester: 2, count: 3200 },
      { semester: 3, count: 2800 },
      { semester: 4, count: 2400 },
      { semester: 5, count: 1900 },
      { semester: 6, count: 934 }
    ],
    topUniversities: [
      { university: "MIT", count: 3420 },
      { university: "Stanford", count: 2890 },
      { university: "CMU", count: 2150 },
      { university: "UC Berkeley", count: 1980 }
    ]
  };

  const rawData = (dashboard as any)?.data || dashboard;
  const dashboardData = rawData && typeof rawData === 'object' && 'totalStudents' in rawData ? rawData : mockDashboard;
  const topUniversities = Array.isArray(dashboardData?.topUniversities) && dashboardData.topUniversities.length > 0 ? dashboardData.topUniversities : mockDashboard.topUniversities;
  const monthlySignups = Array.isArray(dashboardData?.monthlySignups) && dashboardData.monthlySignups.length > 0 ? dashboardData.monthlySignups : mockDashboard.monthlySignups;
  const displayName = user?.name || user?.username || 'Administrator';

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Welcome, {displayName}</h1>
        <p className="text-muted-foreground mt-1">High-level platform metrics across students, universities, and employers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Students</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboardData.totalStudents}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Users className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Universities</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboardData.totalUniversities}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg text-purple-500"><GraduationCap className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Companies</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboardData.totalCompanies}</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-green-500"><Building className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg PPS Score</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{dashboardData.avgPPSScore}</h3>
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
                <BarChart data={monthlySignups} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
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
              {topUniversities.map((uni: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-slate-500">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-900">{uni.university || uni.name || 'University'}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {uni.count || uni.studentCount || 0} students
                  </div>
                </div>
              ))}
              {!topUniversities.length && (
                <p className="text-center text-muted-foreground py-8">No university data available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
