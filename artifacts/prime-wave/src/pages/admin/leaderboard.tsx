import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Trophy, Medal, Search, GraduationCap, Target, RefreshCw, 
  Sparkles, CheckCircle2, TrendingUp, Award, BookOpen, Code2, Clock, UserCheck 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLeaderboardItem {
  id: string;
  rank: number;
  name: string;
  email: string;
  university: string;
  semester: number;
  ppsScore: number;
  credits: number;
  completedProjects: number;
  completedAssignments: number;
  industryReadiness: number;
  lastUpdated: string;
}

const INITIAL_LEADERBOARD: AdminLeaderboardItem[] = [
  {
    id: 'ld-1',
    rank: 1,
    name: 'Santhosh M',
    email: 'santhosh@primewave.edu',
    university: 'Anna University',
    semester: 2,
    ppsScore: 98,
    credits: 820,
    completedProjects: 6,
    completedAssignments: 24,
    industryReadiness: 99,
    lastUpdated: 'Just now'
  },
  {
    id: 'ld-2',
    rank: 2,
    name: 'Alice Chen',
    email: 'alice.chen@stanford.edu',
    university: 'Stanford University',
    semester: 2,
    ppsScore: 96,
    credits: 780,
    completedProjects: 5,
    completedAssignments: 22,
    industryReadiness: 97,
    lastUpdated: '2 mins ago'
  },
  {
    id: 'ld-3',
    rank: 3,
    name: 'Ananya Roy',
    email: 'ananya@iitb.ac.in',
    university: 'IIT Bombay',
    semester: 3,
    ppsScore: 95,
    credits: 750,
    completedProjects: 5,
    completedAssignments: 20,
    industryReadiness: 96,
    lastUpdated: '5 mins ago'
  },
  {
    id: 'ld-4',
    rank: 4,
    name: 'Karthik Raja',
    email: 'karthik@vit.ac.in',
    university: 'Vellore Institute of Technology (VIT)',
    semester: 3,
    ppsScore: 94,
    credits: 710,
    completedProjects: 4,
    completedAssignments: 19,
    industryReadiness: 94,
    lastUpdated: '8 mins ago'
  },
  {
    id: 'ld-5',
    rank: 5,
    name: 'Priya Sharma',
    email: 'priya@srmist.edu.in',
    university: 'SRM Institute of Science & Tech',
    semester: 2,
    ppsScore: 92,
    credits: 680,
    completedProjects: 4,
    completedAssignments: 18,
    industryReadiness: 92,
    lastUpdated: '12 mins ago'
  },
  {
    id: 'ld-6',
    rank: 6,
    name: 'David Miller',
    email: 'david@mit.edu',
    university: 'Massachusetts Institute of Technology (MIT)',
    semester: 4,
    ppsScore: 90,
    credits: 650,
    completedProjects: 4,
    completedAssignments: 16,
    industryReadiness: 90,
    lastUpdated: '15 mins ago'
  },
  {
    id: 'ld-7',
    rank: 7,
    name: 'Rahul Verma',
    email: 'rahul@iiit.ac.in',
    university: 'IIIT Hyderabad',
    semester: 2,
    ppsScore: 89,
    credits: 620,
    completedProjects: 3,
    completedAssignments: 15,
    industryReadiness: 88,
    lastUpdated: '20 mins ago'
  },
  {
    id: 'ld-8',
    rank: 8,
    name: 'Sophia Patel',
    email: 'spatel@berkeley.edu',
    university: 'UC Berkeley',
    semester: 3,
    ppsScore: 88,
    credits: 600,
    completedProjects: 3,
    completedAssignments: 14,
    industryReadiness: 87,
    lastUpdated: '25 mins ago'
  }
];

export default function AdminLeaderboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<string>('all');
  const [selectedUniFilter, setSelectedUniFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pps' | 'credits' | 'projects'>('pps');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [selectedStudent, setSelectedStudent] = useState<AdminLeaderboardItem | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const now = new Date();
    setCurrentTimeFormatted(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: 'Leaderboard Updated',
        description: `Refreshed leaderboard metrics for current time (${now.toLocaleTimeString()}).`,
      });
    }, 600);
  };

  const filteredLeaderboard = INITIAL_LEADERBOARD
    .filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.university.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSemester = 
        selectedSemesterFilter === 'all' || 
        item.semester.toString() === selectedSemesterFilter;

      const matchesUni = 
        selectedUniFilter === 'all' || 
        item.university.toLowerCase().includes(selectedUniFilter.toLowerCase());

      return matchesSearch && matchesSemester && matchesUni;
    })
    .sort((a, b) => {
      if (sortBy === 'credits') return b.credits - a.credits;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      return b.ppsScore - a.ppsScore;
    });

  const uniqueUniversities = Array.from(new Set(INITIAL_LEADERBOARD.map(item => item.university)));

  const topStudent = INITIAL_LEADERBOARD[0];

  return (
    <SidebarLayout userType="admin">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 rounded-2xl border border-amber-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" /> Real-time Platform Leaderboard
          </div>
          <h1 className="text-3xl font-display font-bold">Updated Student Leaderboard</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Live rankings based on Prime Placement Score (PPS), earned credits, and verified project accomplishments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-xl border border-border flex items-center gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span>Live Feed</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground border-l pl-3">
              Current Time: <span className="font-bold text-foreground">{currentTimeFormatted}</span>
            </div>
          </div>

          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline" 
            className="gap-2 shadow-xs border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-amber-500 shadow-xs bg-gradient-to-br from-background to-amber-500/5">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">#1 Platform Leader</p>
                <h3 className="text-xl font-display font-bold mt-1 text-foreground">{topStudent.name}</h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">{topStudent.ppsScore} PPS • {topStudent.university}</p>
              </div>
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600"><Trophy className="w-6 h-6" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform Avg PPS Score</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">92.4</h3>
              </div>
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600"><Target className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ranked Active Students</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">1,240</h3>
              </div>
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-600"><UserCheck className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Institution Lead</p>
                <h3 className="text-xl font-display font-bold mt-1 text-foreground">Anna University</h3>
                <p className="text-xs text-muted-foreground mt-0.5">320 Enrolled Students</p>
              </div>
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-600"><GraduationCap className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search student by name, email, or university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Semester Filter */}
          <select 
            value={selectedSemesterFilter}
            onChange={(e) => setSelectedSemesterFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-md border border-input bg-background font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <option key={s} value={s.toString()}>Semester {s}</option>
            ))}
          </select>

          {/* University Filter */}
          <select
            value={selectedUniFilter}
            onChange={(e) => setSelectedUniFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-md border border-input bg-background font-medium focus:outline-none focus:ring-1 focus:ring-primary max-w-[180px] truncate"
          >
            <option value="all">All Universities</option>
            {uniqueUniversities.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-md border border-input bg-background font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="pps">Sort by PPS Score</option>
            <option value="credits">Sort by Total Credits</option>
            <option value="projects">Sort by Projects</option>
          </select>

          {(searchQuery || selectedSemesterFilter !== 'all' || selectedUniFilter !== 'all' || sortBy !== 'pps') && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery('');
                setSelectedSemesterFilter('all');
                setSelectedUniFilter('all');
                setSortBy('pps');
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="border-border shadow-xs overflow-hidden">
        <CardHeader className="bg-slate-950 text-white p-5 border-b border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Platform Leaderboard Data
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs mt-0.5">
                Real-time snapshot updated at {currentTimeFormatted}
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-400/10 text-xs">
              Updated Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-16 text-center font-bold">Rank</TableHead>
                <TableHead>Student Name & Email</TableHead>
                <TableHead>University & Semester</TableHead>
                <TableHead className="text-center">Projects & Assignments</TableHead>
                <TableHead className="text-center">Industry Readiness</TableHead>
                <TableHead className="text-right">Credits & PPS Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaderboard.map((item, idx) => {
                const displayRank = idx + 1;
                return (
                  <TableRow 
                    key={item.id} 
                    className={`hover:bg-muted/50 transition-colors ${
                      idx < 3 ? 'bg-amber-500/5 dark:bg-amber-500/10' : ''
                    }`}
                  >
                    <TableCell className="text-center font-bold">
                      <div className="flex justify-center items-center">
                        {displayRank === 1 ? (
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
                            🥇
                          </div>
                        ) : displayRank === 2 ? (
                          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-extrabold shadow-md">
                            🥈
                          </div>
                        ) : displayRank === 3 ? (
                          <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center font-extrabold shadow-md">
                            🥉
                          </div>
                        ) : (
                          <span className="font-mono text-muted-foreground font-semibold text-sm">#{displayRank}</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-bold">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-foreground">{item.name}</div>
                          <div className="text-xs font-mono text-muted-foreground font-normal">{item.email}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                        {item.university}
                      </span>
                      <Badge variant="secondary" className="text-[10px] mt-1">
                        Semester {item.semester}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-xs font-bold text-foreground">
                          {item.completedProjects} Projects • {item.completedAssignments} Assignments
                        </span>
                        <span className="text-[10px] text-muted-foreground">100% Submission Rate</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.industryReadiness >= 95 
                            ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950/40' 
                            : 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {item.industryReadiness}% Ready
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="font-display font-extrabold text-lg text-primary">
                        {item.ppsScore} PPS
                      </div>
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        +{item.credits} Credits
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStudent(item)}
                        className="text-xs gap-1.5"
                      >
                        Inspect Metrics
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredLeaderboard.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No leaderboard entries match your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Metric Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedStudent && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">{selectedStudent.name}</DialogTitle>
                    <DialogDescription className="text-xs">{selectedStudent.email} • {selectedStudent.university}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 bg-muted/40 p-4 rounded-xl border border-border">
                <div>
                  <span className="text-xs text-muted-foreground block uppercase font-semibold">Global Platform Rank</span>
                  <span className="text-2xl font-display font-extrabold text-amber-600 dark:text-amber-400">#{selectedStudent.rank}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block uppercase font-semibold">Prime Placement Score</span>
                  <span className="text-2xl font-display font-extrabold text-primary">{selectedStudent.ppsScore} PPS</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block uppercase font-semibold">Total Earned Credits</span>
                  <span className="text-lg font-bold text-foreground">+{selectedStudent.credits} Credits</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block uppercase font-semibold">Industry Readiness</span>
                  <span className="text-lg font-bold text-green-600">{selectedStudent.industryReadiness}% Match</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground">Verified Progress Metrics</h4>
                
                <div className="flex justify-between items-center p-3 bg-card border rounded-lg text-xs">
                  <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> Completed Assignments</span>
                  <span className="font-bold text-foreground">{selectedStudent.completedAssignments} Completed</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-card border rounded-lg text-xs">
                  <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-primary" /> Submitted Projects</span>
                  <span className="font-bold text-foreground">{selectedStudent.completedProjects} Submitted</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-card border rounded-lg text-xs">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> Last Active Timestamp</span>
                  <span className="font-mono text-muted-foreground">{selectedStudent.lastUpdated}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button size="sm" onClick={() => setSelectedStudent(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
