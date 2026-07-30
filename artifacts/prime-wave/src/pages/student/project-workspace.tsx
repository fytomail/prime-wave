import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetProjectById, useSubmitProjectAction } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BrainCircuit, CheckSquare, Github, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

export default function ProjectWorkspace() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: projectRes, isLoading } = useGetProjectById(id || '', {
    query: { enabled: !!id, queryKey: ['project', id] }
  });
  const project: any = (projectRes as any)?.data || projectRes;

  const updateMut = useSubmitProjectAction({
    mutation: {
      onSuccess: () => {
        toast({ title: 'Project Updated', description: 'Your repository link has been saved.' });
      }
    }
  });

  const { register, handleSubmit } = useForm({
    defaultValues: { githubUrl: '' }
  });

  const onSubmit = (data: any) => {
    updateMut.mutate({
      id: Number(id),
      data
    });
  };

  
  const projectData = project && typeof project === 'object' ? project : null;

  return (
    <SidebarLayout userType="student">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="-ml-3 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
        <div className="flex gap-2">
          {projectData.githubUrl && (
            <Button variant="outline" className="gap-2" asChild>
              <a href={projectData.githubUrl} target="_blank" rel="noreferrer">
                <Github className="w-4 h-4" /> View Repo
              </a>
            </Button>
          )}
          <Button className="gap-2"><Send className="w-4 h-4" /> Final Submit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">{projectData.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{projectData.description}</p>
            <div className="flex gap-2 mb-6">
              {projectData.techStack?.map(tech => (
                <span key={tech} className="px-2.5 py-1 bg-muted rounded-md text-xs font-semibold">{tech}</span>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Database Schema Design", status: "done" },
                  { title: "API Endpoint Implementation", status: "done" },
                  { title: "Frontend Integration", status: "current" },
                  { title: "Deployment & CI/CD", status: "pending" }
                ].map((m, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${m.status === 'current' ? 'border-primary bg-primary/5' : ''}`}>
                    <CheckSquare className={`w-5 h-5 ${m.status === 'done' ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <span className={`font-medium ${m.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{m.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repository Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input id="githubUrl" placeholder="https://github.com/username/project" {...register('githubUrl')} defaultValue={projectData.githubUrl || ''} />
                </div>
                <Button type="submit" variant="secondary" disabled={updateMut.isPending}>Save</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="w-full">
          <Card className="border-primary/20 shadow-md sticky top-4">
            <div className="p-4 border-b bg-primary/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">AI Project Mentor</h3>
            </div>
            <CardContent className="p-0">
              <Tabs defaultValue="guidance" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger value="guidance" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4">Guidance</TabsTrigger>
                  <TabsTrigger value="review" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4">Code Review</TabsTrigger>
                </TabsList>
                
                <div className="p-4 h-[500px] overflow-y-auto">
                  <TabsContent value="guidance" className="mt-0 space-y-4">
                    <p className="text-sm">For the Frontend Integration milestone, focus on state management. Consider using Context or Zustand for global state.</p>
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <span className="font-semibold block mb-1">Tip:</span>
                      Don't forget to handle loading and error states for your API calls.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="review" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-muted-foreground">
                      <BrainCircuit className="w-12 h-12 opacity-20" />
                      <p>Connect your GitHub repository to get real-time AI code reviews on your commits.</p>
                      <Button variant="outline" size="sm">Configure Integration</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
