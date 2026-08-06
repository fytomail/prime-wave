import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Award, Search, GraduationCap, ShieldCheck, Printer, 
  CheckCircle2, Sparkles, Filter, Users, Trophy, Download, ExternalLink, RefreshCw 
} from 'lucide-react';
import { ROADMAP_DATA, Semester } from '@/lib/roadmap-data';

interface AdminCertificateItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  university: string;
  semesterNumber: number;
  semesterTitle: string;
  certificateId: string;
  issueDate: string;
  creditScore: number;
  ppsScore: number;
  status: 'Verified' | 'Pending';
}

const MOCK_ADMIN_CERTIFICATES: AdminCertificateItem[] = [
  {
    id: 'cert-1',
    studentId: 'st-1',
    studentName: 'Santhosh M',
    studentEmail: 'santhosh@primewave.edu',
    university: 'Anna University',
    semesterNumber: 1,
    semesterTitle: 'Python Fundamentals & Problem Solving',
    certificateId: 'PW-CERT-SEM1-84921',
    issueDate: 'August 4, 2026',
    creditScore: 140,
    ppsScore: 98,
    status: 'Verified'
  },
  {
    id: 'cert-2',
    studentId: 'st-1',
    studentName: 'Santhosh M',
    studentEmail: 'santhosh@primewave.edu',
    university: 'Anna University',
    semesterNumber: 2,
    semesterTitle: 'Fullstack Web Development with React',
    certificateId: 'PW-CERT-SEM2-84922',
    issueDate: 'August 5, 2026',
    creditScore: 180,
    ppsScore: 98,
    status: 'Verified'
  },
  {
    id: 'cert-3',
    studentId: 'st-2',
    studentName: 'Alice Chen',
    studentEmail: 'alice.chen@stanford.edu',
    university: 'Stanford University',
    semesterNumber: 1,
    semesterTitle: 'Python Fundamentals & Problem Solving',
    certificateId: 'PW-CERT-SEM1-84923',
    issueDate: 'July 28, 2026',
    creditScore: 140,
    ppsScore: 96,
    status: 'Verified'
  },
  {
    id: 'cert-4',
    studentId: 'st-2',
    studentName: 'Alice Chen',
    studentEmail: 'alice.chen@stanford.edu',
    university: 'Stanford University',
    semesterNumber: 2,
    semesterTitle: 'Fullstack Web Development with React',
    certificateId: 'PW-CERT-SEM2-84924',
    issueDate: 'August 2, 2026',
    creditScore: 180,
    ppsScore: 96,
    status: 'Verified'
  },
  {
    id: 'cert-5',
    studentId: 'st-3',
    studentName: 'Karthik Raja',
    studentEmail: 'karthik@vit.ac.in',
    university: 'Vellore Institute of Technology (VIT)',
    semesterNumber: 1,
    semesterTitle: 'Python Fundamentals & Problem Solving',
    certificateId: 'PW-CERT-SEM1-84925',
    issueDate: 'July 20, 2026',
    creditScore: 140,
    ppsScore: 94,
    status: 'Verified'
  },
  {
    id: 'cert-6',
    studentId: 'st-3',
    studentName: 'Karthik Raja',
    studentEmail: 'karthik@vit.ac.in',
    university: 'Vellore Institute of Technology (VIT)',
    semesterNumber: 3,
    semesterTitle: 'Data Structures & Algorithmic Engineering',
    certificateId: 'PW-CERT-SEM3-84926',
    issueDate: 'August 1, 2026',
    creditScore: 220,
    ppsScore: 94,
    status: 'Verified'
  },
  {
    id: 'cert-7',
    studentId: 'st-4',
    studentName: 'Priya Sharma',
    studentEmail: 'priya@srmist.edu.in',
    university: 'SRM Institute of Science & Tech',
    semesterNumber: 1,
    semesterTitle: 'Python Fundamentals & Problem Solving',
    certificateId: 'PW-CERT-SEM1-84927',
    issueDate: 'July 15, 2026',
    creditScore: 140,
    ppsScore: 92,
    status: 'Verified'
  },
  {
    id: 'cert-8',
    studentId: 'st-4',
    studentName: 'Priya Sharma',
    studentEmail: 'priya@srmist.edu.in',
    university: 'SRM Institute of Science & Tech',
    semesterNumber: 2,
    semesterTitle: 'Fullstack Web Development with React',
    certificateId: 'PW-CERT-SEM2-84928',
    issueDate: 'August 3, 2026',
    creditScore: 180,
    ppsScore: 92,
    status: 'Verified'
  },
  {
    id: 'cert-9',
    studentId: 'st-5',
    studentName: 'David Miller',
    studentEmail: 'david@mit.edu',
    university: 'Massachusetts Institute of Technology (MIT)',
    semesterNumber: 4,
    semesterTitle: 'Backend Architecture & Cloud Microservices',
    certificateId: 'PW-CERT-SEM4-84929',
    issueDate: 'August 6, 2026',
    creditScore: 250,
    ppsScore: 90,
    status: 'Verified'
  },
  {
    id: 'cert-10',
    studentId: 'st-6',
    studentName: 'Ananya Roy',
    studentEmail: 'ananya@iitb.ac.in',
    university: 'IIT Bombay',
    semesterNumber: 1,
    semesterTitle: 'Python Fundamentals & Problem Solving',
    certificateId: 'PW-CERT-SEM1-84930',
    issueDate: 'August 4, 2026',
    creditScore: 140,
    ppsScore: 95,
    status: 'Verified'
  }
];

export default function AdminCertificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<string>('all');
  const [selectedUniFilter, setSelectedUniFilter] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<AdminCertificateItem | null>(null);

  const filteredCertificates = MOCK_ADMIN_CERTIFICATES.filter(cert => {
    const matchesSearch = 
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.semesterTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSemester = 
      selectedSemesterFilter === 'all' || 
      cert.semesterNumber.toString() === selectedSemesterFilter;

    const matchesUni = 
      selectedUniFilter === 'all' || 
      cert.university.toLowerCase().includes(selectedUniFilter.toLowerCase());

    return matchesSearch && matchesSemester && matchesUni;
  });

  const uniqueUniversities = Array.from(new Set(MOCK_ADMIN_CERTIFICATES.map(c => c.university)));

  const handlePrint = () => {
    window.print();
  };

  return (
    <SidebarLayout userType="admin">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Platform Certificate Registry
          </div>
          <h1 className="text-3xl font-display font-bold">Issued Student Certificates</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Inspect all verified student certificates, earned credit scores, semester completions, and credential verification data.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold border-primary/30 bg-background flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Cryptographically Verified
          </Badge>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-primary shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Certificates Issued</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">3,420</h3>
              </div>
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Award className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Certified Students</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">980</h3>
              </div>
              <div className="p-2.5 bg-green-500/10 rounded-xl text-green-600"><Users className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credit Points Awarded</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-amber-600 dark:text-amber-400">485,200</h3>
              </div>
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600"><Trophy className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-xs">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Partner Universities</p>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">34</h3>
              </div>
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-600"><GraduationCap className="w-5 h-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search student, certificate ID, university..."
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
            className="px-3 py-2 text-xs rounded-md border border-input bg-background font-medium focus:outline-none focus:ring-1 focus:ring-primary max-w-[200px] truncate"
          >
            <option value="all">All Universities</option>
            {uniqueUniversities.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          {(searchQuery || selectedSemesterFilter !== 'all' || selectedUniFilter !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery('');
                setSelectedSemesterFilter('all');
                setSelectedUniFilter('all');
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Certificates Table */}
      <Card className="border-border shadow-xs">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Certificate Records ({filteredCertificates.length})
            </CardTitle>
            <span className="text-xs text-muted-foreground">Showing verified student credentials</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name & Email</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Certificate & Semester</TableHead>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Credit / PPS</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((cert) => (
                <TableRow key={cert.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 shrink-0">
                        {cert.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-foreground">{cert.studentName}</div>
                        <div className="text-xs font-mono text-muted-foreground font-normal">{cert.studentEmail}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                      {cert.university}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div>
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold mb-1">
                        Semester {cert.semesterNumber}
                      </Badge>
                      <div className="text-xs font-semibold text-foreground line-clamp-1">
                        {cert.semesterTitle}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {cert.certificateId}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground font-medium">
                    {cert.issueDate}
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      +{cert.creditScore} Credits
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      {cert.ppsScore} PPS Score
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" className="bg-green-600 text-[11px] gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCert(cert)}
                      className="text-xs gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-primary" /> View Cert
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredCertificates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    No certificate records match your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Official Certificate Dialog Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden bg-white text-slate-900 border-amber-500/40">
          {selectedCert && (
            <div className="p-8 sm:p-12 relative border-8 border-double border-amber-500/30 bg-radial from-amber-50/50 via-white to-slate-50 shadow-2xl space-y-6">
              {/* Top Seal Header */}
              <div className="flex justify-between items-start border-b border-amber-200 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-lg">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-indigo-950">Prime Wave Platform Administrator Verification</div>
                    <div className="text-xl font-display font-extrabold text-indigo-900 tracking-tight">Official Certificate of Completion</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Credential ID</div>
                  <div className="text-xs font-mono font-bold text-slate-800">{selectedCert.certificateId}</div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="text-center space-y-4 py-4">
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">This is to officially certify that</p>
                
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-indigo-950 underline decoration-amber-400 decoration-2 underline-offset-8">
                  {selectedCert.studentName}
                </h2>
                
                <p className="text-xs text-slate-600 font-medium">
                  Student Email: <span className="font-mono font-semibold">{selectedCert.studentEmail}</span> • <span className="font-semibold">{selectedCert.university}</span>
                </p>

                <p className="text-sm text-slate-600 max-w-lg mx-auto pt-2 leading-relaxed">
                  has successfully completed all required modules, code deliverables, and project criteria for
                </p>

                <div className="p-4 rounded-xl bg-indigo-950 text-white shadow-inner max-w-xl mx-auto space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Semester {selectedCert.semesterNumber} Specialist Certification</div>
                  <div className="text-xl font-display font-bold">{selectedCert.semesterTitle}</div>
                </div>

                {/* Credit Score Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Verified Score: +{selectedCert.creditScore} Credits • {selectedCert.ppsScore} PPS</span>
                </div>
              </div>

              {/* Footer Signatures */}
              <div className="grid grid-cols-3 gap-4 border-t border-amber-200 pt-6 text-center text-xs">
                <div>
                  <div className="font-mono text-[11px] text-slate-500 mb-1">Issue Date</div>
                  <div className="font-bold text-slate-800">{selectedCert.issueDate}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center mb-1 font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-900 uppercase">Verified Seal</span>
                </div>

                <div>
                  <div className="font-mono text-[11px] text-slate-500 mb-1">Academic Board</div>
                  <div className="font-bold text-slate-800 font-serif italic">Prime Wave AI Board</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
                  <Printer className="w-4 h-4" /> Print Certificate
                </Button>
                <Button size="sm" onClick={() => setSelectedCert(null)} className="gap-1.5">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
