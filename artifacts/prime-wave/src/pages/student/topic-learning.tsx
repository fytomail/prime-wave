import { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useParams, Link, useLocation } from 'wouter';
import { useGetTopic, useCompleteTopic } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, FileText, Code2, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { useAuth } from '@/contexts/AuthContext';

export default function TopicLearning() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { user } = useAuth();
  const studentId = user?._id || '';
  const { toast } = useToast();
  
  const { data: topic, isLoading } = useGetTopic(Number(id), {
    query: { enabled: !!id, queryKey: ['topic', Number(id)] }
  });

  const completeTopic = useCompleteTopic({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Topic Completed!",
          description: "Credits earned and progress updated.",
        });
        setLocation('/semester/1');
      }
    }
  });

  const handleComplete = () => {
    completeTopic.mutate({
      id: Number(id),
      data: { studentId: studentId, timeSpent: 45 }
    });
  };

  const mockTopic = {
    id: Number(id),
    moduleId: 1,
    title: "Introduction to React Hooks",
    content: "React hooks allow you to use state and other features without writing a class.",
    estimatedHours: 2,
    credits: 10,
    type: "concept"
  };
  const topicData = topic && typeof topic === 'object' && 'title' in topic ? topic : mockTopic;

  return (
    <SidebarLayout userType="student">
      <div className="flex items-center justify-between mb-6">
        <Link href={`/semester/${topicData.moduleId}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Semester
          </Button>
        </Link>
        <div className="flex gap-2">
          {topicData.isCompleted ? (
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 px-3 py-1">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Completed
            </Badge>
          ) : (
            <Button onClick={handleComplete} disabled={completeTopic.isPending} className="gap-2">
              Mark as Complete <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Content Area */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-background border rounded-xl p-8 shadow-sm">
            <h1 className="text-3xl font-display font-bold mb-4">{topicData.title}</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                {topicData.description || "In this topic, we will cover the foundational concepts required to build scalable applications."}
              </p>
              
              {/* Dummy content representing lesson */}
              <div className="space-y-6 text-foreground">
                <h3 className="text-xl font-bold">1. Introduction to the Concept</h3>
                <p>
                  Understanding the core principles is vital before moving into implementation. The architecture dictates how components interact and scale under load.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                  <pre><code>{`function initializeSystem(config) {
  if (!config.valid) throw new Error("Invalid config");
  return new System(config);
}`}</code></pre>
                </div>
                <h3 className="text-xl font-bold">2. Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Always validate input boundaries</li>
                  <li>Use dependency injection for testability</li>
                  <li>Keep functions pure where possible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-xl border border-muted">
            <Button variant="outline">Previous Topic</Button>
            <Button>Next Topic <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>

        {/* AI Learning Tools Sidebar */}
        <div className="w-full lg:w-80 shrink-0 sticky top-4">
          <Card className="border-primary/20 shadow-md">
            <div className="p-4 border-b bg-primary/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">AI Learning Assistant</h3>
            </div>
            <CardContent className="p-0">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4">Summary</TabsTrigger>
                  <TabsTrigger value="qa" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4">Ask AI</TabsTrigger>
                  <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-4">Notes</TabsTrigger>
                </TabsList>
                
                <div className="p-4 h-[400px] overflow-y-auto">
                  <TabsContent value="summary" className="mt-0 space-y-4">
                    <p className="text-sm">The key takeaway from this topic is the separation of concerns.</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        <span className="font-semibold block mb-1">Key Term:</span>
                        Dependency Injection - passing dependencies to objects instead of creating them internally.
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="qa" className="mt-0 flex flex-col h-full">
                    <div className="flex-1 space-y-3">
                      <div className="bg-primary/10 text-primary-foreground text-sm p-3 rounded-lg rounded-tl-none self-start max-w-[85%] text-slate-800">
                        Hi! What part of {topicData.title} do you need help understanding?
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t relative">
                      <input type="text" placeholder="Ask a question..." className="w-full text-sm rounded-md border border-input px-3 py-2 pr-10 bg-background" />
                      <button className="absolute right-2 top-6 text-primary"><ArrowRight className="w-4 h-4" /></button>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="mt-0">
                    <textarea 
                      className="w-full h-[350px] resize-none border-0 focus:ring-0 text-sm p-0 bg-transparent" 
                      placeholder="Take personal notes here. They will be saved automatically..."
                    ></textarea>
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
