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
import CreateProject from '@/pages/student/create-project';
import ProjectWorkspace from '@/pages/student/project-workspace';
import Portfolio from '@/pages/student/portfolio';
import Leaderboard from '@/pages/student/leaderboard';
import Certificates from '@/pages/student/certificates';
import StudentFeedback from '@/pages/student/feedback';

import HrLanding from '@/pages/hr/landing';
import HrDashboard from '@/pages/hr/dashboard';
import JobsList from '@/pages/hr/jobs-list';
import JobDetail from '@/pages/hr/job-detail';
import CreateJob from '@/pages/hr/create-job';
import CandidateProfile from '@/pages/hr/candidate-profile';
import CandidatesList from '@/pages/hr/candidates-list';
import HrInterviews from '@/pages/hr/interviews';
import HrAnalytics from '@/pages/hr/analytics';

import PlatformAdmin from '@/pages/admin/dashboard';
import AdminStudents from '@/pages/admin/students';
import AdminCompanies from '@/pages/admin/companies';
import AdminUniversities from '@/pages/admin/universities';
import AdminSemesters from '@/pages/admin/semesters';
import AdminAssignments from '@/pages/admin/assignments';
import AdminProjects from '@/pages/admin/projects';
import AdminAiPrompts from '@/pages/admin/ai-prompts';
import AdminFeedback from '@/pages/admin/feedback';

const queryClient = new QueryClient();

import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      
      {/* Auth Routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Student Routes */}
      <Route path="/dashboard">
        <AuthGuard allowedRoles={['student']}><StudentDashboard /></AuthGuard>
      </Route>
      <Route path="/roadmap">
        <AuthGuard allowedRoles={['student']}><Roadmap /></AuthGuard>
      </Route>
      <Route path="/semester/:id">
        <AuthGuard allowedRoles={['student']}><SemesterDetail /></AuthGuard>
      </Route>
      <Route path="/topic/:id">
        <AuthGuard allowedRoles={['student']}><TopicLearning /></AuthGuard>
      </Route>
      <Route path="/assignments">
        <AuthGuard allowedRoles={['student']}><AssignmentsList /></AuthGuard>
      </Route>
      <Route path="/assignments/:id">
        <AuthGuard allowedRoles={['student']}><AssignmentDetail /></AuthGuard>
      </Route>
      <Route path="/projects">
        <AuthGuard allowedRoles={['student']}><ProjectsList /></AuthGuard>
      </Route>
      <Route path="/projects/create">
        <AuthGuard allowedRoles={['student']}><CreateProject /></AuthGuard>
      </Route>
      <Route path="/projects/:id">
        <AuthGuard allowedRoles={['student']}><ProjectWorkspace /></AuthGuard>
      </Route>
      <Route path="/portfolio">
        <AuthGuard allowedRoles={['student']}><Portfolio /></AuthGuard>
      </Route>
      <Route path="/leaderboard">
        <AuthGuard allowedRoles={['student']}><Leaderboard /></AuthGuard>
      </Route>
      <Route path="/certificates">
        <AuthGuard allowedRoles={['student']}><Certificates /></AuthGuard>
      </Route>
      <Route path="/feedback">
        <AuthGuard allowedRoles={['student']}><StudentFeedback /></AuthGuard>
      </Route>
      
      {/* HR Routes */}
      <Route path="/hr" component={HrLanding} />
      <Route path="/hr/dashboard">
        <AuthGuard allowedRoles={['company', 'company_hr']}><HrDashboard /></AuthGuard>
      </Route>
      <Route path="/hr/jobs">
        <AuthGuard allowedRoles={['company', 'company_hr']}><JobsList /></AuthGuard>
      </Route>
      <Route path="/hr/jobs/create">
        <AuthGuard allowedRoles={['company', 'company_hr']}><CreateJob /></AuthGuard>
      </Route>
      <Route path="/hr/jobs/:id">
        <AuthGuard allowedRoles={['company', 'company_hr']}><JobDetail /></AuthGuard>
      </Route>
      <Route path="/hr/candidates">
        <AuthGuard allowedRoles={['company', 'company_hr']}><CandidatesList /></AuthGuard>
      </Route>
      <Route path="/hr/candidates/:studentId">
        <AuthGuard allowedRoles={['company', 'company_hr']}><CandidateProfile /></AuthGuard>
      </Route>
      <Route path="/hr/interviews">
        <AuthGuard allowedRoles={['company', 'company_hr']}><HrInterviews /></AuthGuard>
      </Route>
      <Route path="/hr/analytics">
        <AuthGuard allowedRoles={['company', 'company_hr']}><HrAnalytics /></AuthGuard>
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin">
        <AuthGuard allowedRoles={['admin']}><PlatformAdmin /></AuthGuard>
      </Route>
      <Route path="/admin/students">
        <AuthGuard allowedRoles={['admin']}><AdminStudents /></AuthGuard>
      </Route>
      <Route path="/admin/companies">
        <AuthGuard allowedRoles={['admin']}><AdminCompanies /></AuthGuard>
      </Route>
      <Route path="/admin/universities">
        <AuthGuard allowedRoles={['admin']}><AdminUniversities /></AuthGuard>
      </Route>
      <Route path="/admin/semesters">
        <AuthGuard allowedRoles={['admin']}><AdminSemesters /></AuthGuard>
      </Route>
      <Route path="/admin/assignments">
        <AuthGuard allowedRoles={['admin']}><AdminAssignments /></AuthGuard>
      </Route>
      <Route path="/admin/projects">
        <AuthGuard allowedRoles={['admin']}><AdminProjects /></AuthGuard>
      </Route>
      <Route path="/admin/ai-prompts">
        <AuthGuard allowedRoles={['admin']}><AdminAiPrompts /></AuthGuard>
      </Route>
      <Route path="/admin/feedback">
        <AuthGuard allowedRoles={['admin']}><AdminFeedback /></AuthGuard>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
