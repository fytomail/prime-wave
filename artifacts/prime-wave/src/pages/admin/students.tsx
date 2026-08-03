import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserCircle, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DEMO_STUDENTS = [
  {
    id: 'st-1',
    name: 'Santhosh M',
    email: 'santhosh@primewave.edu',
    university: 'Anna University',
    semester: 1,
    credits: 100,
    ppsScore: 98,
    status: 'Active'
  },
  {
    id: 'st-2',
    name: 'Alice Chen',
    email: 'alice.chen@stanford.edu',
    university: 'Stanford University',
    semester: 2,
    credits: 220,
    ppsScore: 96,
    status: 'Active'
  },
  {
    id: 'st-3',
    name: 'Karthik Raja',
    email: 'karthik@vit.ac.in',
    university: 'Vellore Institute of Technology (VIT)',
    semester: 3,
    credits: 340,
    ppsScore: 94,
    status: 'Active'
  },
  {
    id: 'st-4',
    name: 'Priya Sharma',
    email: 'priya@srmist.edu.in',
    university: 'SRM Institute of Science & Tech',
    semester: 2,
    credits: 200,
    ppsScore: 92,
    status: 'Active'
  },
  {
    id: 'st-5',
    name: 'David Miller',
    email: 'david@mit.edu',
    university: 'Massachusetts Institute of Technology (MIT)',
    semester: 4,
    credits: 460,
    ppsScore: 90,
    status: 'Active'
  }
];

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = DEMO_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Enrolled Students</h1>
          <p className="text-muted-foreground mt-1">Manage active student accounts, semester progress, and credit scores.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search student by name, email, or university..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 bg-background" 
          />
        </div>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-primary" /> Active Student Registry ({filteredStudents.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Verified Student Profiles
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name & Email</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Current Semester</TableHead>
                <TableHead>Earned Credits</TableHead>
                <TableHead>PPS Readiness</TableHead>
                <TableHead>Account Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((st) => (
                <TableRow key={st.id}>
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 shrink-0">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-foreground">{st.name}</div>
                        <div className="text-xs font-mono text-muted-foreground font-normal">{st.email}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                      {st.university}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      Semester {st.semester}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-bold text-amber-600 dark:text-amber-400 text-xs">
                    +{st.credits} Credits
                  </TableCell>

                  <TableCell className="font-mono font-extrabold text-primary text-xs">
                    {st.ppsScore} PPS
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> {st.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No matching student records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
