import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Building, Briefcase, Award, TrendingUp, GraduationCap, Sparkles, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { PrimeWaveLogo } from '@/components/common/logo';

const DEMO_PLATFORM_STATS = {
  totalStudents: 1240,
  totalUniversities: 34,
  totalCompanies: 18,
  avgPPSScore: 92.4,
  topUniversities: [
    { name: 'Anna University', count: 320, location: 'Chennai' },
    { name: 'SRM Institute of Science & Technology', count: 280, location: 'Kanchipuram' },
    { name: 'Vellore Institute of Technology (VIT)', count: 240, location: 'Vellore' },
    { name: 'Stanford University', count: 180, location: 'California' },
    { name: 'Massachusetts Institute of Technology (MIT)', count: 120, location: 'Cambridge' }
  ],
  monthlySignups: [
    { semester: 1, count: 420 },
    { semester: 2, count: 290 },
    { semester: 3, count: 210 },
    { semester: 4, count: 160 },
    { semester: 5, count: 90 },
    { semester: 6, count: 50 },
    { semester: 7, count: 15 },
    { semester: 8, count: 5 }
  ]
};

export default function PlatformAdmin() {
  const { user } = useAuth();
  const displayName = user?.name || user?.username || 'Chandru S';

  return (
    <SidebarLayout userType="admin">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-background p-2 border border-primary/20 shadow-md flex items-center justify-center shrink-0">
            <PrimeWaveLogo className="w-10 h-10" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3" /> Platform Administrator Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Welcome, {displayName}</h1>
            <p className="text-sm text-muted-foreground">High-level platform metrics across students, universities, curriculum, and partner companies.</p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Enrolled Students</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{DEMO_PLATFORM_STATS.totalStudents}</h3>
              </div>
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600"><Users className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Partner Universities</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{DEMO_PLATFORM_STATS.totalUniversities}</h3>
              </div>
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-600"><GraduationCap className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Authorized Companies</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{DEMO_PLATFORM_STATS.totalCompanies}</h3>
              </div>
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-600"><Building className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg. Platform PPS</p>
                <h3 className="text-3xl font-display font-bold mt-2 text-amber-600 dark:text-amber-400">{DEMO_PLATFORM_STATS.avgPPSScore}</h3>
              </div>
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600"><Award className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester Enrolment Chart */}
        <Card className="border-border shadow-xs">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold">Students Distribution by Semester</CardTitle>
            <CardDescription className="text-xs">Active student progression across all 8 curriculum semesters.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_PLATFORM_STATS.monthlySignups} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="semester" tickFormatter={(val) => `Sem ${val}`} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Universities */}
        <Card className="border-border shadow-xs">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold">Top Universities by Student Enrollment</CardTitle>
            <CardDescription className="text-xs">Leading partner institutions on Prime Wave.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {DEMO_PLATFORM_STATS.topUniversities.map((uni, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-sm block">{uni.name}</span>
                      <span className="text-[11px] text-muted-foreground">{uni.location}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                    {uni.count} Students
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
