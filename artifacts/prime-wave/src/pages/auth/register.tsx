import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { register } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [defaultPortal, setDefaultPortal] = useState('Student Portal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const finalUsername = username || email.split('@')[0];
    setIsSubmitting(true);

    try {
      let portalVal: string | undefined = undefined;
      if (role === 'student') portalVal = 'Student Portal';
      else if (role === 'company' || role === 'company_hr') portalVal = 'Company Portal';
      else if (role === 'admin') portalVal = 'Admin Portal';

      let response = await register({
        name,
        username: finalUsername,
        email,
        password,
        role,
        phone: phone || undefined,
        defaultPortal: portalVal,
      });

      // If backend rejected defaultPortal or role enum, retry with cleaned parameters
      if (!response.success && (response.message?.includes('defaultPortal') || response.message?.includes('validation failed'))) {
        const fallbackRole = role === 'company_hr' ? 'company' : role;
        response = await register({
          name,
          username: finalUsername,
          email,
          password,
          role: fallbackRole,
          phone: phone || undefined,
        });
      }

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Registration successful. Please login.',
        });
        setLocation('/login');
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Registration failed',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      try {
        const fallbackRole = role === 'company_hr' ? 'company' : role;
        const retryRes = await register({
          name,
          username: finalUsername,
          email,
          password,
          role: fallbackRole,
        });
        if (retryRes.success) {
          toast({
            title: 'Success',
            description: 'Registration successful. Please login.',
          });
          setLocation('/login');
          return;
        }
      } catch {}

      toast({
        title: 'Error',
        description: err.message || 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555 0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(val) => {
                setRole(val);
                if (val === 'student') setDefaultPortal('Student Portal');
                else if (val === 'company_hr' || val === 'company') setDefaultPortal('Company Portal');
                else setDefaultPortal('Admin Portal');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="company_hr">Company HR</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
