import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HrInterviews() {
  const { toast } = useToast();

  const interviews = [
    { id: 'int1', candidateName: 'Alice Chen', jobTitle: 'Senior AI Engineer', date: 'Tomorrow, 10:00 AM', mode: 'Google Meet', status: 'Scheduled' },
    { id: 'int2', candidateName: 'Bob Smith', jobTitle: 'Frontend Developer', date: 'Jul 31, 2:30 PM', mode: 'Zoom Video', status: 'Confirmed' },
    { id: 'int3', candidateName: 'Charlie Lee', jobTitle: 'Backend Engineer', date: 'Aug 2, 11:00 AM', mode: 'Google Meet', status: 'Pending Link' }
  ];

  return (
    <SidebarLayout userType="hr">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Scheduled Interviews</h1>
          <p className="text-muted-foreground mt-1">Manage technical rounds and interview schedules for candidates.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold">{item.candidateName}</TableCell>
                  <TableCell>{item.jobTitle}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {item.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 border-purple-500 text-purple-600 bg-purple-50">
                      <Video className="w-3 h-3" /> {item.mode}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => toast({ title: "Meeting Joined", description: "Connecting to video call..." })}
                    >
                      Join Meeting
                    </Button>
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
