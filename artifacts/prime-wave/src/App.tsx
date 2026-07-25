import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import NotFound from '@/pages/not-found';
import Landing from '@/pages/landing';
import StudentDashboard from '@/pages/student/dashboard';
import Roadmap from '@/pages/student/roadmap';
import SemesterDetail from '@/pages/student/semester-detail';
import TopicLearning from '@/pages/student/topic-learning';
import AssignmentsList from '@/pages/student/assignments-list';
import AssignmentDetail from '@/pages/student/assignment-detail';
import ProjectsList from '@/pages/student/projects-list';
import ProjectWorkspace from '@/pages/student/project-workspace';
import Portfolio from '@/pages/student/portfolio';
import Leaderboard from '@/pages/student/leaderboard';
import Certificates from '@/pages/student/certificates';

import HrLanding from '@/pages/hr/landing';
import HrDashboard from '@/pages/hr/dashboard';
import JobsList from '@/pages/hr/jobs-list';
import JobDetail from '@/pages/hr/job-detail';
import CandidateProfile from '@/pages/hr/candidate-profile';

import PlatformAdmin from '@/pages/admin/dashboard';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      
      {/* Student Routes */}
      <Route path="/dashboard" component={StudentDashboard} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/semester/:id" component={SemesterDetail} />
      <Route path="/topic/:id" component={TopicLearning} />
      <Route path="/assignments" component={AssignmentsList} />
      <Route path="/assignments/:id" component={AssignmentDetail} />
      <Route path="/projects" component={ProjectsList} />
      <Route path="/projects/:id" component={ProjectWorkspace} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/certificates" component={Certificates} />
      
      {/* HR Routes */}
      <Route path="/hr" component={HrLanding} />
      <Route path="/hr/dashboard" component={HrDashboard} />
      <Route path="/hr/jobs" component={JobsList} />
      <Route path="/hr/jobs/:id" component={JobDetail} />
      <Route path="/hr/candidates/:studentId" component={CandidateProfile} />
      
      {/* Admin Route */}
      <Route path="/admin" component={PlatformAdmin} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
