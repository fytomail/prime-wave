import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Clock, User, Plus, ExternalLink, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DEFAULT_INTERVIEWS = [
  { 
    id: 'int-1', 
    candidateName: 'Santhosh M', 
    jobTitle: 'Senior AI Engineer', 
    university: 'Anna University',
    date: 'Tomorrow, 10:00 AM', 
    mode: 'Google Meet', 
    status: 'Scheduled',
    ppsScore: 98
  },
  { 
    id: 'int-2', 
    candidateName: 'Alice Chen', 
    jobTitle: 'Full-Stack Developer', 
    university: 'Stanford University',
    date: 'Aug 5, 2:30 PM', 
    mode: 'Zoom Video', 
    status: 'Confirmed',
    ppsScore: 96
  },
  { 
    id: 'int-3', 
    candidateName: 'Karthik Raja', 
    jobTitle: 'Backend AI Specialist', 
    university: 'VIT University',
    date: 'Aug 6, 11:00 AM', 
    mode: 'Google Meet', 
    status: 'Pending Link',
    ppsScore: 94
  },
  { 
    id: 'int-4', 
    candidateName: 'Priya Sharma', 
    jobTitle: 'UI/UX SaaS Designer', 
    university: 'SRM Institute',
    date: 'Aug 7, 4:00 PM', 
    mode: 'Microsoft Teams', 
    status: 'Scheduled',
    ppsScore: 92
  }
];

export default function HrInterviews() {
  const { toast } = useToast();
  const [interviewsList, setInterviewsList] = useState(DEFAULT_INTERVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Interview Form
  const [candName, setCandName] = useState('');
  const [role, setRole] = useState('AI Software Engineer');
  const [dateTime, setDateTime] = useState('');
  const [meetMode, setMeetMode] = useState('Google Meet');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim() || !dateTime.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter candidate name and date/time.",
        variant: "destructive"
      });
      return;
    }

    const newInterview = {
      id: `int-${Date.now()}`,
      candidateName: candName.trim(),
      jobTitle: role,
      university: 'Prime Wave Candidate',
      date: dateTime,
      mode: meetMode,
      status: 'Scheduled',
      ppsScore: 95
    };

    setInterviewsList([newInterview, ...interviewsList]);
    setIsModalOpen(false);
    setCandName('');
    setDateTime('');

    toast({
      title: "Interview Scheduled! 📅",
      description: `Meeting invite sent to ${candName}.`,
    });
  };

  return (
    <SidebarLayout userType="hr">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Technical Interview Rounds
          </div>
          <h1 className="text-3xl font-display font-bold">Scheduled Interviews</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Manage live technical coding rounds, video interview schedules, and candidate evaluations.
          </p>
        </div>

        <Button 
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md shrink-0 h-11 px-5"
        >
          <Plus className="w-4 h-4" /> Schedule Interview
        </Button>
      </div>

      <Card className="border-border shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Target Job Role</TableHead>
                <TableHead>Scheduled Date & Time</TableHead>
                <TableHead>Meeting Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewsList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold">
                    <div className="text-foreground">{item.candidateName}</div>
                    <div className="text-xs text-muted-foreground font-normal">{item.university}</div>
                  </TableCell>

                  <TableCell className="font-medium text-xs text-foreground">
                    {item.jobTitle}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      {item.date}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="gap-1 border-purple-500 text-purple-600 bg-purple-50 text-xs">
                      <Video className="w-3.5 h-3.5" /> {item.mode}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 text-xs">
                      {item.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => toast({ title: "Connecting Meeting...", description: `Joining ${item.mode} room with ${item.candidateName}` })}
                      className="gap-1 text-xs"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Call
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Schedule Interview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <Calendar className="w-5 h-5 text-primary" /> Schedule Technical Interview
            </DialogTitle>
            <DialogDescription>
              Set up a live technical evaluation round for candidate.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSchedule} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="candName" className="text-sm font-semibold">Candidate Name *</Label>
              <Input 
                id="candName" 
                placeholder="e.g. Santhosh M" 
                value={candName} 
                onChange={e => setCandName(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-semibold">Job Role</Label>
              <select
                id="role"
                className="w-full p-2.5 rounded-md border border-input text-sm bg-background font-medium"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="Senior AI Software Engineer">Senior AI Software Engineer</option>
                <option value="Full-Stack React Engineer">Full-Stack React Engineer</option>
                <option value="SaaS Backend Architect">SaaS Backend Architect</option>
                <option value="UI/UX Product Designer">UI/UX Product Designer</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTime" className="text-sm font-semibold">Date & Time *</Label>
              <Input 
                id="dateTime" 
                placeholder="e.g. Tomorrow, 11:00 AM" 
                value={dateTime} 
                onChange={e => setDateTime(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetMode" className="text-sm font-semibold">Meeting Platform</Label>
              <select
                id="meetMode"
                className="w-full p-2.5 rounded-md border border-input text-sm bg-background font-medium"
                value={meetMode}
                onChange={e => setMeetMode(e.target.value)}
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom Video">Zoom Video</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
              </select>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2 font-semibold">
                <Calendar className="w-4 h-4" /> Schedule & Send Invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
