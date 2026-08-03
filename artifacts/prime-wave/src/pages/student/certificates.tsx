import React, { useState } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  Award, Download, CheckCircle, QrCode, Printer, Sparkles, 
  ExternalLink, Trophy, ShieldCheck, UserCheck 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROADMAP_DATA, Semester } from '@/lib/roadmap-data';
import { isSemesterCompleted, isSemesterUnlocked, getTotalEarnedCredits } from '@/lib/roadmap-store';

export default function Certificates() {
  const { user } = useAuth();
  const studentName = user?.name || user?.username || 'Santhosh M';

  const [selectedCertSemester, setSelectedCertSemester] = useState<Semester | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <SidebarLayout userType="student">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Verified Credentials
          </div>
          <h1 className="text-3xl font-display font-bold">Semester Certificates</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Official certificates showcasing verified student name, completed semester, and earned credit scores.
          </p>
        </div>

        {/* Student Badge */}
        <div className="flex items-center gap-3 bg-background/80 backdrop-blur p-4 rounded-xl border border-border shadow-xs shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Certified Student</div>
            <div className="text-lg font-bold text-foreground">{studentName}</div>
          </div>
        </div>
      </div>

      {/* Grid of All 8 Semester Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ROADMAP_DATA.map((semester: Semester) => {
          const isCompleted = isSemesterCompleted(semester.number);
          const isUnlocked = isSemesterUnlocked(semester.number);

          // Simulated Issue Date & Cert ID
          const certId = `PW-CERT-SEM${semester.number}-8492${semester.number}`;
          const creditScore = semester.project.credits + 20 * semester.modules.reduce((acc, m) => acc + m.topics.length, 0);

          return (
            <Card 
              key={semester.id} 
              className={`relative overflow-hidden transition-all border ${
                isCompleted ? 'border-primary/40 shadow-md bg-gradient-to-br from-background via-background to-primary/5' :
                isUnlocked ? 'border-border bg-card shadow-xs' :
                'opacity-60 bg-muted/40 border-muted'
              }`}
            >
              {/* Background Watermark Crest */}
              <div className="absolute -top-6 -right-6 p-6 opacity-10 pointer-events-none text-primary">
                <Award className="w-36 h-36" />
              </div>

              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-md">
                      <Award className="w-6 h-6" />
                    </div>
                    <Badge variant={isCompleted ? "default" : isUnlocked ? "secondary" : "outline"} className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}>
                      {isCompleted ? "✓ Certificate Verified" : isUnlocked ? "In Progress" : "Locked"}
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Semester {semester.number} Certificate
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground leading-snug">
                      {semester.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {semester.subtitle}
                    </p>
                  </div>
                </div>

                {/* Metadata Row: Student Name, Semester, Credit Score */}
                <div className="grid grid-cols-3 gap-2 border-t pt-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">Student Name</span>
                    <span className="font-bold text-foreground truncate block">{studentName}</span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">Semester</span>
                    <span className="font-bold text-primary block">Semester {semester.number}</span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider font-semibold">Credit Score</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 block">+{creditScore} Credits</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Prime Wave Certified</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedCertSemester(semester)}
                      className="text-xs gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" /> View Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Official Certificate Dialog Modal */}
      <Dialog open={!!selectedCertSemester} onOpenChange={() => setSelectedCertSemester(null)}>
        <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden bg-white text-slate-900 border-amber-500/40">
          {selectedCertSemester && (() => {
            const sem = selectedCertSemester;
            const certId = `PW-CERT-SEM${sem.number}-8492${sem.number}`;
            const totalSemCredits = sem.project.credits + 20 * sem.modules.reduce((acc, m) => acc + m.topics.length, 0);

            return (
              <div className="p-8 sm:p-12 relative border-8 border-double border-amber-500/30 bg-radial from-amber-50/50 via-white to-slate-50 shadow-2xl space-y-6">
                {/* Top Seal Badge */}
                <div className="flex justify-between items-start border-b border-amber-200 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-lg">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-indigo-950">Prime Wave Academy</div>
                      <div className="text-xl font-display font-extrabold text-indigo-900 tracking-tight">Certificate of Completion</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Certificate ID</div>
                    <div className="text-xs font-mono font-bold text-slate-700">{certId}</div>
                  </div>
                </div>

                {/* Main Certificate Content */}
                <div className="text-center space-y-4 py-4">
                  <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">This is to officially certify that</p>
                  
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-indigo-950 underline decoration-amber-400 decoration-2 underline-offset-8">
                    {studentName}
                  </h2>

                  <p className="text-sm text-slate-600 max-w-lg mx-auto pt-2 leading-relaxed">
                    has successfully completed all requirements, practical assessments, and final project deliverables for
                  </p>

                  <div className="p-4 rounded-xl bg-indigo-950 text-white shadow-inner max-w-xl mx-auto space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Semester {sem.number} Specialist Certification</div>
                    <div className="text-xl font-display font-bold">{sem.title}</div>
                  </div>

                  {/* Credit Score Display */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Verified Credit Score: +{totalSemCredits} Credits</span>
                  </div>
                </div>

                {/* Footer Signatures & Official Verification */}
                <div className="grid grid-cols-3 gap-4 border-t border-amber-200 pt-6 text-center text-xs">
                  <div>
                    <div className="font-mono text-[11px] text-slate-500 mb-1">Issue Date</div>
                    <div className="font-bold text-slate-800">August 3, 2026</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center mb-1 font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-900 uppercase">Verified Seal</span>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] text-slate-500 mb-1">Academic Director</div>
                    <div className="font-bold text-slate-800 font-serif italic">Prime Wave AI Board</div>
                  </div>
                </div>

                {/* Modal Print & Download Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
                    <Printer className="w-4 h-4" /> Print Certificate
                  </Button>
                  <Button size="sm" onClick={() => setSelectedCertSemester(null)} className="gap-1.5">
                    Close
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
