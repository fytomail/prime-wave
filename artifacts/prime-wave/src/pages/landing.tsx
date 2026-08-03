import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Code2, BrainCircuit, Trophy, Building, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PrimeWaveLogo } from '@/components/common/logo';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-display font-bold text-xl text-primary">
            <PrimeWaveLogo className="w-8 h-8" />
            Prime Wave
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#curriculum" className="hover:text-foreground transition-colors">Curriculum</a>
            <a href="#hiring" className="hover:text-foreground transition-colors">For Employers</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/hr">
              <Button variant="ghost" className="hidden sm:inline-flex">Hire Talent</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Student Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium text-primary bg-primary/10">
              The AI-Powered Engineering Academy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8">
              From ambitious student to <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">industry-ready engineer.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              7 semesters of structured learning. AI-guided projects. Verified certification. Direct hiring. 
              The complete ecosystem for launching software engineering careers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base">
                  Start Learning Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/hr">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                  Explore Talent Pool
                </Button>
              </Link>
            </div>
            
            <div className="mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium text-foreground">4.9/5</span> average student rating
              </div>
              <div className="flex items-center gap-6 grayscale opacity-60">
                <div className="font-display font-bold text-xl flex items-center gap-1"><Building className="w-5 h-5"/> TechCorp</div>
                <div className="font-display font-bold text-xl">NEXUS</div>
                <div className="font-display font-bold text-xl italic">Vanguard</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / How it works */}
        <section id="how-it-works" className="py-24 bg-muted/30 px-6 border-y">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Prime Wave Ecosystem</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">An intelligent platform bridging the gap between academic learning and industry expectations.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-2xl border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Guided Learning</h3>
                <p className="text-muted-foreground">Personalized roadmaps, instant code reviews, and an AI mentor that explains concepts tailored to your learning style.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Mastery</h3>
                <p className="text-muted-foreground">Earn credits, build a quantified portfolio, and achieve the Prime Placement Score (PPS) that proves your capability.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Placement</h3>
                <p className="text-muted-foreground">Employers hire directly from the platform based on your PPS, project portfolio, and AI-assessed skill matching.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section id="curriculum" className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">7 Semesters to Mastery</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our structured curriculum takes you from fundamentals to advanced system design. Every module includes hands-on projects and AI-evaluated assessments.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Semesters 1-2: Foundations & Core Logic",
                    "Semesters 3-4: Web Architecture & APIs",
                    "Semesters 5-6: Scalability & DevOps",
                    "Semester 7: Capstone & Interview Prep"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/roadmap">
                  <Button variant="outline">View Full Syllabus</Button>
                </Link>
              </div>
              <div className="flex-1 w-full bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-sm shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="pt-6">
                  <p><span className="text-blue-400">const</span> <span className="text-yellow-300">journey</span> = [</p>
                  <p className="pl-4">{"{ semester: 1, focus: 'Algorithms' },"}</p>
                  <p className="pl-4">{"{ semester: 3, focus: 'Fullstack' },"}</p>
                  <p className="pl-4">{"{ semester: 7, focus: 'System Design' }"}</p>
                  <p>];</p>
                  <br/>
                  <p><span className="text-blue-400">await</span> aiMentor.<span className="text-blue-300">evaluate</span>(capstoneProject);</p>
                  <p className="text-green-400 mt-2">// Output: PPS Score: 850, Industry Ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-display font-bold mb-6">Ready to shape your future?</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              Join thousands of students building their engineering portfolios on Prime Wave.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-base text-primary">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <Code2 className="w-5 h-5 text-primary" /> Prime Wave
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Prime Wave Education Platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
