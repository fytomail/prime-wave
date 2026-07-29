import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetCompanyAnalyticsData } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HrAnalytics() {
  const { data: res } = useGetCompanyAnalyticsData({
    query: { queryKey: ['hrAnalytics'], retry: false }
  });

  const mockData = {
    totalApplications: 142,
    shortlistedCount: 38,
    interviewsConducted: 24,
    offersAccepted: 8,
    monthlyHires: [
      { month: 'Jan', applicants: 30, hires: 2 },
      { month: 'Feb', applicants: 45, hires: 3 },
      { month: 'Mar', applicants: 28, hires: 1 },
      { month: 'Apr', applicants: 39, hires: 2 }
    ]
  };

  const analytics = (res as any)?.data || mockData;

  return (
    <SidebarLayout userType="hr">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Recruitment Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed breakdown of candidate pipelines, funnel conversion, and hiring rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Applicants</p>
            <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{analytics.totalApplications}</h3>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Shortlisted</p>
            <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{analytics.shortlistedCount}</h3>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Interviews Held</p>
            <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{analytics.interviewsConducted}</h3>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Offers Accepted</p>
            <h3 className="text-3xl font-display font-bold mt-2 text-slate-900">{analytics.offersAccepted}</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyHires} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="applicants" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Applicants" />
                <Bar dataKey="hires" fill="#22c55e" radius={[4, 4, 0, 0]} name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
