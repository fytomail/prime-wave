import React from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  Map as MapIcon,
  BookOpenCheck,
  Code2,
  Trophy,
  Award,
  UserCircle,
  Briefcase,
  Building,
  BarChart,
  LogOut,
  Settings,
  PlusCircle,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

import { PrimeWaveLogo } from '@/components/common/logo';

interface SidebarLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'hr' | 'admin';
}

export function SidebarLayout({ children, userType }: SidebarLayoutProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleSignOut = () => {
    logout();
    toast({
      title: 'Signed Out',
      description: 'You have been successfully logged out.',
    });
    setLocation('/login');
  };

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/roadmap', label: 'Roadmap', icon: MapIcon },
    { href: '/assignments', label: 'Assignments', icon: BookOpenCheck },
    { href: '/projects', label: 'Projects', icon: Code2 },
    { href: '/projects/create', label: 'Submit Project', icon: PlusCircle },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/certificates', label: 'Certificates', icon: Award },
    { href: '/portfolio', label: 'Portfolio', icon: UserCircle },
    { href: '/feedback', label: 'Feedback & Support', icon: MessageSquare },
  ];

  const hrLinks = [
    { href: '/hr/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/hr/jobs', label: 'Job Listings', icon: Briefcase },
    { href: '/hr/jobs/create', label: 'Post New Job', icon: PlusCircle },
    { href: '/hr/candidates', label: 'Candidate Pool', icon: Users },
    { href: '/hr/interviews', label: 'Interviews', icon: Calendar },
    { href: '/hr/analytics', label: 'Analytics', icon: BarChart },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Platform Stats', icon: BarChart },
    { href: '/admin/students', label: 'Students', icon: UserCircle },
    { href: '/admin/companies', label: 'Companies', icon: Building },
    { href: '/admin/universities', label: 'Universities', icon: GraduationCap },
    { href: '/admin/semesters', label: 'Curriculum', icon: BookOpen },
    { href: '/admin/assignments', label: 'Assignments', icon: BookOpenCheck },
    { href: '/admin/projects', label: 'Projects', icon: Code2 },
    { href: '/certificates', label: 'Certificates', icon: Award },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/admin/ai-prompts', label: 'AI Prompts', icon: BrainCircuit },
    { href: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  let links = studentLinks;
  if (userType === 'hr') links = hrLinks;
  if (userType === 'admin') links = adminLinks;

  const displayName = user?.name || user?.username || 'User';
  const displayRole = user?.role ? user.role.toUpperCase() : userType.toUpperCase();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r bg-background hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-primary">
            <PrimeWaveLogo className="w-8 h-8" />
            Prime Wave
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate text-foreground">{displayName}</div>
              <div className="text-xs text-muted-foreground font-mono">{displayRole}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 md:hidden">
          <Link href="/" className="font-display font-bold text-lg text-primary flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            Prime Wave
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive px-2 py-1 border rounded"
          >
            <LogOut className="w-3.5 h-3.5" />
            Out
          </button>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
