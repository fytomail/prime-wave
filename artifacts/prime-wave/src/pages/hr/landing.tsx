import React from 'react';
import { Link } from 'wouter';
import { Building, Users, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HrLanding() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-900">
            <Building className="w-6 h-6 text-primary" /> Prime Wave <span className="font-normal text-muted-foreground text-sm border-l pl-2 ml-2">For Employers</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="hidden sm:inline-flex">Student Portal</Button>
            </Link>
            <Link href="/hr/dashboard">
              <Button>Company Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-24 pb-16 px-6 relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Hire pre-vetted engineers, <br/>not resumes.
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Access a pool of talent continuously evaluated by AI across 7 semesters of rigorous coursework and real-world projects.
            </p>
            <Link href="/hr/dashboard">
              <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 border-0">
                Access Talent Pool <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Prime Placement Score (PPS)</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Stop guessing if a candidate can code. Our PPS is an objective, standardized metric built from thousands of data points:
                </p>
                <ul className="space-y-4">
                  {[
                    "Algorithmic problem-solving ability",
                    "Code quality, architecture, and documentation",
                    "Consistency across 7 semesters of learning",
                    "Real-world capstone project evaluations"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted rounded-2xl p-8 border">
                <div className="bg-background rounded-xl p-6 shadow-sm mb-4">
                  <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">AJ</div>
                      <div>
                        <div className="font-bold">Alex Johnson</div>
                        <div className="text-xs text-muted-foreground">Full Stack Developer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">890</div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">PPS Score</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">React / Node.js</span> <span>Top 5%</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">System Design</span> <span>Top 10%</span></div>
                  </div>
                  <Button className="w-full mt-6" variant="secondary">View Full Portfolio</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
