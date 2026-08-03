import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Briefcase, CheckCircle, BarChart3, Trophy, Sparkles, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HrAnalytics() {
  const analyticsData = {
    totalApplications: 142,
    shortlistedCount: 38,
    interviewsConducted: 19,
    offersAccepted: 12,
    monthlyHires: [
      { month: 'Jan', applicants: 24, hires: 2 },
      { month: 'Feb', applicants: 32, hires: 3 },
      { month: 'Mar', applicants: 28, hires: 2 },
      { month: 'Apr', applicants: 35, hires: 4 },
      { month: 'May', applicants: 40, hires: 5 },
      { month: 'Jun', applicants: 48, hires: 6 }
    ]
  };

  return (
    <SidebarLayout userType="hr">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Company Recruitment Performance
        </div>
        <h1 className="text-3xl font-display font-bold">Recruitment Analytics</h1>
        <p className="text-muted-foreground mt-1 max-w-xl">
          Detailed breakdown of candidate funnel conversion rates, applicant metrics, and monthly hiring trends.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Applicants</p>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{analyticsData.totalApplications}</h3>
            <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shortlisted Candidates</p>
              <Trophy className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{analyticsData.shortlistedCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">26.7% Shortlist Rate</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Interviews Held</p>
              <BarChart3 className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{analyticsData.interviewsConducted}</h3>
            <p className="text-xs text-muted-foreground mt-1">Technical Rounds</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Offers Accepted</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-display font-bold mt-2 text-foreground">{analyticsData.offersAccepted}</h3>
            <p className="text-xs text-green-600 font-semibold mt-1">63.1% Acceptance Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart View */}
      <Card className="border-border shadow-xs">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-display flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Monthly Applicant vs Hire Conversion Trend
          </CardTitle>
          <CardDescription>Visual comparison of overall candidate applications against successful hires per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.monthlyHires} margin={{ top: 5, right: 10, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
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
