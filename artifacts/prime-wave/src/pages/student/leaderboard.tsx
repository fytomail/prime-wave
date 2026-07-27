import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetLeaderboard } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useGetLeaderboard(undefined, {
    query: { queryKey: ['leaderboard'] }
  });

  return (
    <SidebarLayout userType="student">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 text-yellow-600 rounded-full mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Global Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Rankings based on Prime Placement Score (PPS). Top students get priority interview scheduling.</p>
      </div>

      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-slate-900 text-white p-4 grid grid-cols-12 gap-4 font-semibold text-sm">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Student</div>
          <div className="col-span-3">University</div>
          <div className="col-span-3 text-right">PPS Score</div>
        </div>

        {isLoading ? (
          <div className="p-4 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div className="divide-y">
            {leaderboard?.map((entry, idx) => (
              <div key={entry.studentId} className={`p-4 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-muted/50 ${idx < 3 ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}>
                <div className="col-span-1 flex justify-center">
                  {idx === 0 ? <Medal className="w-6 h-6 text-yellow-500" /> :
                   idx === 1 ? <Medal className="w-6 h-6 text-slate-400" /> :
                   idx === 2 ? <Medal className="w-6 h-6 text-amber-700" /> :
                   <span className="font-mono text-muted-foreground font-semibold">{entry.rank}</span>}
                </div>
                
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {entry.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-base">{entry.studentName}</div>
                    <div className="text-xs text-muted-foreground">Semester {entry.semesterNumber}</div>
                  </div>
                </div>
                
                <div className="col-span-3 flex items-center">
                  <span className="text-sm">{entry.university}</span>
                </div>
                
                <div className="col-span-3 flex justify-end items-center gap-4">
                  {entry.industryReadiness && entry.industryReadiness >= 80 && (
                    <Badge variant="outline" className="hidden md:inline-flex border-green-500 text-green-600 bg-green-50">
                      Industry Ready
                    </Badge>
                  )}
                  <div className="font-display font-bold text-xl text-primary flex items-center gap-1.5">
                    {entry.ppsScore} <Target className="w-4 h-4 opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </SidebarLayout>
  );
}
