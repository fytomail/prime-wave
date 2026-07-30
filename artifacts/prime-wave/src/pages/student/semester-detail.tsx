import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetSemester, useListModules, useGetSemesterProgress } from '@workspace/api-client-react';
import { useParams } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function SemesterDetail() {
  const { id } = useParams<{ id: string }>();
  const studentId = 1;

  const { data: semester, isLoading: isLoadingSem } = useGetSemester(Number(id), {
    query: { enabled: !!id, queryKey: ['semester', Number(id)] }
  });

  const { data: modules, isLoading: isLoadingMod } = useListModules(Number(id), {
    query: { enabled: !!id, queryKey: ['modules', Number(id)] }
  });

  const { data: progress, isLoading: isLoadingProg } = useGetSemesterProgress(studentId, Number(id), {
    query: { enabled: !!id, queryKey: ['semesterProgress', studentId, Number(id)] }
  });

  const isLoading = isLoadingSem || isLoadingMod || isLoadingProg;

  
  const semesterData = semester && typeof semester === 'object' ? semester : null;

  
  const modulesData = Array.isArray(modules) ? modules : (modules as any)?.data || [];

  
  const progressData = progress && typeof progress === 'object' ? progress : null;
  if (!semesterData || !progressData) {
    return (
      <SidebarLayout userType="student">
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <p className="text-muted-foreground">No data available yet.</p>
        </div>
      </SidebarLayout>
    );
  }

  const progressPercent = progressData 
    ? (progressData.completedModules / progressData.totalModules) * 100 
    : 0;

  return (
    <SidebarLayout userType="student">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          Semester {semesterData.number}
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">{semesterData.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">{semesterData.description}</p>
      </div>

      {progressData && (
        <Card className="mb-10 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-primary">{Math.round(progressPercent)}%</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className="font-semibold text-lg mb-2">Overall Progress</h3>
                <Progress value={progressPercent} className="h-3" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{progressData.completedModules} of {progressData.totalModules} modules</span>
                  <span>{progressData.completedTopics} of {progressData.totalTopics} topics</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-display font-bold mb-6">Modules</h2>
      
      <div className="grid gap-4">
        {modulesData?.map((module, index) => {
          // Mock status based on order
          const isCompleted = module.status === 'completed';
          const isLocked = module.status === 'locked';

          return (
            <Link key={module.id} href={isLocked ? '#' : `/topic/1`} className={isLocked ? 'pointer-events-none cursor-default' : ''}>
              <Card className={`transition-all ${isLocked ? 'opacity-60 bg-muted/50' : 'hover:border-primary hover:shadow-md cursor-pointer'}`}>
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-muted-foreground">Module {module.order}</span>
                      {isCompleted && <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded"><CheckCircle className="w-3 h-3 mr-1" /> Completed</span>}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-muted-foreground text-sm">{module.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-8 shrink-0 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-medium">Topics</span>
                      </div>
                      <span className="font-semibold">{module.topicsCount || 0}</span>
                    </div>
                    
                    {!isLocked && (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </SidebarLayout>
  );
}
