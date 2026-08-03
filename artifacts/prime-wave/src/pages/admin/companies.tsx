import React, { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Building, Plus, Mail, ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getAuthorizedCompanies, 
  grantCompanyAccessAction, 
  toggleCompanyAccessAction, 
  CompanyAccessItem 
} from '@/lib/company-access-store';

export default function AdminCompanies() {
  const { toast } = useToast();

  const [companies, setCompanies] = useState<CompanyAccessItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Grant Access Form
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [location, setLocation] = useState('Remote / On-site');

  const refreshCompanies = () => {
    setCompanies(getAuthorizedCompanies());
  };

  useEffect(() => {
    refreshCompanies();
    const handleUpdate = () => refreshCompanies();
    window.addEventListener('company-access-updated', handleUpdate);
    return () => window.removeEventListener('company-access-updated', handleUpdate);
  }, []);

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !companyEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter Company Name and Authorized Email ID.",
        variant: "destructive"
      });
      return;
    }

    const newComp = grantCompanyAccessAction({
      name: companyName.trim(),
      email: companyEmail.trim(),
      industry: industry.trim(),
      location: location.trim()
    });

    setIsModalOpen(false);
    setCompanyName('');
    setCompanyEmail('');

    toast({
      title: "Company Access Granted! 🏢",
      description: `Admin authorization granted to ${newComp.name} (${newComp.email}). Company portal access is now active.`,
    });
    refreshCompanies();
  };

  const handleToggleAccess = (id: string, currentName: string, isGranted: boolean) => {
    const updated = toggleCompanyAccessAction(id);
    if (updated) {
      toast({
        title: updated.accessGranted ? "Access Granted" : "Access Revoked",
        description: updated.accessGranted ? 
          `Company portal access enabled for ${currentName}.` : 
          `Company portal access restricted for ${currentName}.`,
      });
      refreshCompanies();
    }
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout userType="admin">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Admin Employer Authorization Portal
          </div>
          <h1 className="text-3xl font-display font-bold">Partner Companies & Access Control</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Grant exclusive Company Portal access by company name and authorized Email ID. Only Admin-approved emails can log in.
          </p>
        </div>

        {/* Top-Right Corner Access Company Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by company or email..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 bg-background text-xs" 
            />
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-md h-11 px-5 text-sm font-semibold shrink-0"
          >
            <Plus className="w-4 h-4" /> Access Company
          </Button>
        </div>
      </div>

      {/* Companies & Access Table */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" /> Admin-Authorized Companies ({filteredCompanies.length})
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Only Admin-Granted Emails Allowed
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Authorized Email ID</TableHead>
                <TableHead>Industry & Location</TableHead>
                <TableHead className="text-right">Active Jobs</TableHead>
                <TableHead className="text-right">Total Hires</TableHead>
                <TableHead>Portal Access Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company: CompanyAccessItem) => (
                <TableRow key={company.id}>
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20 shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div className="text-foreground">{company.name}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {company.email}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-medium text-foreground">{company.industry}</div>
                    <div className="text-[11px] text-muted-foreground">{company.location}</div>
                  </TableCell>

                  <TableCell className="text-right font-bold text-xs">{company.activeJobs}</TableCell>
                  <TableCell className="text-right font-bold text-xs">{company.totalHires}</TableCell>

                  <TableCell>
                    {company.accessGranted ? (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Access Granted
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs">
                        <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Access Revoked
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant={company.accessGranted ? "outline" : "default"}
                      onClick={() => handleToggleAccess(company.id, company.name, company.accessGranted)}
                      className="text-xs gap-1"
                    >
                      {company.accessGranted ? 'Revoke Access' : 'Grant Access'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredCompanies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No authorized companies match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grant Company Access Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <Building className="w-5 h-5 text-primary" /> Grant Company Portal Access
            </DialogTitle>
            <DialogDescription>
              Enter the company name and authorized Email ID. Only this email will be permitted to access the Company Portal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleGrantAccess} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold">Company Name *</Label>
              <Input 
                id="companyName" 
                placeholder="e.g. Google Inc. or Zoho Corp." 
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyEmail" className="text-sm font-semibold">Authorized Company Email ID *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="companyEmail" 
                  type="email"
                  placeholder="hr@company.com or recruiter@company.com" 
                  value={companyEmail}
                  onChange={e => setCompanyEmail(e.target.value)}
                  className="pl-9 font-mono text-xs"
                  required 
                />
              </div>
              <span className="text-[11px] text-muted-foreground block">
                This Email ID will be exclusively authorized by Admin to access the Company Portal.
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-semibold">Industry Sector</Label>
              <Input 
                id="industry" 
                placeholder="e.g. AI & Cloud Infrastructure" 
                value={industry}
                onChange={e => setIndustry(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold">Location / Office</Label>
              <Input 
                id="location" 
                placeholder="e.g. San Francisco, CA / Remote" 
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Grant Admin Access
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
}
