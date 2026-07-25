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
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'hr' | 'admin';
}

export function SidebarLayout({ children, userType }: SidebarLayoutProps) {
  const [location] = useLocation();

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/roadmap', label: 'Roadmap', icon: MapIcon },
    { href: '/assignments', label: 'Assignments', icon: BookOpenCheck },
    { href: '/projects', label: 'Projects', icon: Code2 },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/certificates', label: 'Certificates', icon: Award },
    { href: '/portfolio', label: 'Portfolio', icon: UserCircle },
  ];

  const hrLinks = [
    { href: '/hr/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/hr/jobs', label: 'Job Listings', icon: Briefcase },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Platform Stats', icon: BarChart },
  ];

  let links = studentLinks;
  if (userType === 'hr') links = hrLinks;
  if (userType === 'admin') links = adminLinks;

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r bg-background hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            Prime Wave
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href || location.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-destructive cursor-pointer transition-colors">
            <LogOut className="w-5 h-5" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background flex items-center px-6 md:hidden">
          <Link href="/" className="font-display font-bold text-lg text-primary flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            Prime Wave
          </Link>
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
