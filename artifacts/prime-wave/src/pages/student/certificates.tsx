import React from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useGetCertificatesList } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, CheckCircle, QrCode } from 'lucide-react';
import { format } from 'date-fns';

import { useAuth } from '@/contexts/AuthContext';

export default function Certificates() {
  const { user } = useAuth();
  const studentId = user?._id || '';

  const { data: certsRes, isLoading } = useGetCertificatesList({
    query: { queryKey: ['certificates', studentId] }
  });
  const certificates = (certsRes as any)?.data || certsRes;

  
  const certificatesData = Array.isArray(certificates) ? certificates : [];

  return (
    <SidebarLayout userType="student">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Verified Certificates</h1>
        <p className="text-muted-foreground mt-1">Blockchain-verified credentials proving your engineering capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificatesData?.length ? (
          certificatesData.map((cert) => (
            <Card key={cert.id} className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Award className="w-32 h-32" />
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><QrCode className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">{cert.type} Certification</p>
                  <h3 className="text-2xl font-display font-bold text-foreground leading-tight">{cert.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Issue Date</p>
                    <p className="font-medium text-sm">{format(new Date(cert.issuedAt), 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Verification ID</p>
                    <p className="font-mono text-sm text-slate-500">{cert.verificationCode}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 w-fit px-3 py-1.5 rounded-md border border-green-200">
                  <CheckCircle className="w-4 h-4" /> Officially Verified
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-2">No certificates yet</h3>
            <p className="text-muted-foreground">Complete semesters and capstone projects to earn verified certificates.</p>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
