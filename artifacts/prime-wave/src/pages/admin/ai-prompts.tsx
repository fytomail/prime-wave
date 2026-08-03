import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Sparkles, Code2 } from 'lucide-react';

const DEMO_AI_PROMPTS = [
  {
    id: 'p-1',
    name: 'Vibe Coding Code Generator',
    model: 'Claude 3.5 Sonnet / Cursor',
    category: 'Code Generation',
    systemPrompt: 'You are an expert full-stack engineer building production React/TypeScript web apps with Tailwind CSS. Follow clean architecture.',
    status: 'Active'
  },
  {
    id: 'p-2',
    name: 'AI Topic Learning Assistant',
    model: 'GPT-4o Mini',
    category: 'Interactive Tutor',
    systemPrompt: 'You are a patient AI tutor. Explain coding concepts simply, provide clean code snippets, and assist students step-by-step.',
    status: 'Active'
  },
  {
    id: 'p-3',
    name: 'Automated Code & Security Evaluator',
    model: 'GPT-4o / Claude 3.5',
    category: 'Evaluation Engine',
    systemPrompt: 'Evaluate student code repository submissions against assignment requirements. Calculate scores for logic, quality, and performance.',
    status: 'Active'
  }
];

export default function AdminAiPrompts() {
  return (
    <SidebarLayout userType="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">AI Prompts & Model Configurations</h1>
        <p className="text-muted-foreground mt-1">Manage system prompts, AI tutor personas, and code evaluation model templates.</p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" /> Active AI System Prompts ({DEMO_AI_PROMPTS.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              AI Code Models Engine
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prompt Template Name</TableHead>
                <TableHead>Target AI Model</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="max-w-[350px]">System Prompt Instructions</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_AI_PROMPTS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-bold text-foreground text-sm">
                    {p.name}
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    {p.model}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {p.category}
                    </Badge>
                  </TableCell>

                  <TableCell className="max-w-[350px] text-xs text-muted-foreground font-mono leading-relaxed line-clamp-2">
                    "{p.systemPrompt}"
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
