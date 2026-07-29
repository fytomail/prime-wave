import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login: authLogin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both username/email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isEmail = identifier.includes('@');
      const response = await login({
        email: isEmail ? identifier : undefined,
        username: !isEmail ? identifier : undefined,
        password,
      });
      
      if (response.success && response.data?.tokens?.accessToken && response.data?.user) {
        authLogin(response.data.tokens.accessToken, response.data.user);
        
        toast({
          title: 'Success',
          description: 'Login successful',
        });
        
        // Redirect based on role
        const role = response.data.user.role;
        if (role === 'student') setLocation('/dashboard');
        else if (role === 'admin') setLocation('/admin');
        else if (role === 'company') setLocation('/hr/dashboard');
        else setLocation('/dashboard');
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Login failed',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Invalid credentials or login failed',
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
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="student or student@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
