import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetProjects } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { FolderGit2, Star, CheckCircle, Clock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectsList() {
  const { user } = useAuth();
  const studentId = user?._id || '';

  const { data: projectsRes, isLoading } = useGetProjects({
    query: { queryKey: ['projects', studentId] }
  });
  const projects = (projectsRes as any)?.data || projectsRes;

  
  const projectsData = Array.isArray(projects) ? projects : (projects as any)?.data || [];

  return (
    <SidebarLayout userType="student">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects Workspace</h1>
          <p className="text-muted-foreground mt-1">Real-world applications that build your portfolio and industry readiness.</p>
        </div>
        <Link href="/projects/create">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Submit Project
          </Button>
        </Link>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map(project => (
            <Card key={project.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className={project.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                  {project.description || 'A comprehensive full-stack application built during the curriculum.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack?.map(tech => (
                    <span key={tech} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 font-semibold text-primary">
                    {project.score ? (
                      <><Star className="w-4 h-4 fill-current" /> {project.score} Score</>
                    ) : (
                      <><Clock className="w-4 h-4" /> Pending</>
                    )}
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm">Workspace</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </SidebarLayout>
  );
}
