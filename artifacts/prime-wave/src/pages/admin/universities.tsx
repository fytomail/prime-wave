import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, MapPin, Users, Plus, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DEMO_UNIVERSITIES = [
  { id: 'uni-1', name: 'Anna University', location: 'Chennai, India', studentCount: 320, code: 'AU-CHE', status: 'Active Partner' },
  { id: 'uni-2', name: 'SRM Institute of Science & Technology', location: 'Kanchipuram, India', studentCount: 280, code: 'SRM-KCH', status: 'Active Partner' },
  { id: 'uni-3', name: 'Vellore Institute of Technology (VIT)', location: 'Vellore, India', studentCount: 240, code: 'VIT-VEL', status: 'Active Partner' },
  { id: 'uni-4', name: 'Stanford University', location: 'California, USA', studentCount: 180, code: 'STAN-US', status: 'Active Partner' },
  { id: 'uni-5', name: 'Massachusetts Institute of Technology (MIT)', location: 'Cambridge, USA', studentCount: 120, code: 'MIT-US', status: 'Active Partner' }
];

export default function AdminUniversities() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = DEMO_UNIVERSITIES.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout userType="admin">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Partner Universities</h1>
          <p className="text-muted-foreground mt-1">Manage academic partner institutions and student enrollment quotas.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search university by name or location..." 
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
              <GraduationCap className="w-5 h-5 text-primary" /> Partner Institutions ({filteredUniversities.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Verified Academic Partners
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>University Name</TableHead>
                <TableHead>Institutional Code</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Enrolled Students</TableHead>
                <TableHead>Partnership Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUniversities.map((uni) => (
                <TableRow key={uni.id}>
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="text-foreground">{uni.name}</div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    {uni.code}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      {uni.location}
                    </span>
                  </TableCell>

                  <TableCell className="text-right font-bold text-xs">
                    {uni.studentCount} Students
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> {uni.status}
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
