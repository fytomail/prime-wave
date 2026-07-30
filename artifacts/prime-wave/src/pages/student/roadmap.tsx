import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useListSemesters } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';

export default function Roadmap() {
  const { data: semesters, isLoading } = useListSemesters({
    query: { queryKey: ['semesters'] }
  });

  
  const roadmapData = Array.isArray(semesters) ? semesters : (semesters as any)?.data || [];

  return (
    <SidebarLayout userType="student">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Learning Roadmap</h1>
        <p className="text-muted-foreground mt-1">Your 7-semester journey to becoming an industry-ready engineer.</p>
      </div>

      <div className="relative">
        {/* Vertical line connecting timeline items */}
        <div className="absolute top-0 bottom-0 left-6 md:left-8 w-1 bg-muted rounded-full"></div>

        <div className="space-y-12 py-4">
          {roadmapData.map((semester, index) => {
              // Mocking status logic since it's not fully rich in the model yet
              const status = index === 0 ? 'completed' : index === 1 ? 'unlocked' : 'locked';
              
              return (
                <div key={semester.id} className="relative flex items-start pl-16 md:pl-20">
                  {/* Status Indicator on timeline */}
                  <div className={`absolute left-4 md:left-6 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10 
                    ${status === 'completed' ? 'bg-primary text-white' : 
                      status === 'unlocked' ? 'bg-background border-primary text-primary' : 
                      'bg-muted text-muted-foreground'}`}
                  >
                    {status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                     status === 'unlocked' ? <Unlock className="w-4 h-4" /> : 
                     <Lock className="w-4 h-4" />}
                  </div>

                  <Card className={`w-full transition-all ${status === 'locked' ? 'opacity-60 bg-muted/30' : 'hover:shadow-md'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">Semester {semester.number}</Badge>
                          <CardTitle className="text-xl">{semester.title}</CardTitle>
                        </div>
                        <div className="text-sm font-medium px-3 py-1 bg-secondary rounded-md">
                          {semester.creditsRequired} Credits
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-muted-foreground">{semester.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 justify-end">
                      {status !== 'locked' ? (
                        <Link href={`/semester/${semester.id}`}>
                          <Button variant={status === 'completed' ? 'outline' : 'default'} className="gap-2">
                            {status === 'completed' ? 'Review Content' : 'Continue Learning'}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" disabled className="gap-2">
                          <Lock className="w-4 h-4" /> Locked
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
    </SidebarLayout>
  );
}
