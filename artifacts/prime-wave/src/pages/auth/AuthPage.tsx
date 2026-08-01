import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chrome, Github, Eye, EyeOff, Check } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { login, register } from '@workspace/api-client-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AuthPage({ initialMode = 'signup' }: { initialMode?: 'signup' | 'login' }) {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: authLogin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        const name = [formData.firstName, formData.lastName].filter(Boolean).join(' ');
        const res = await register({
          name,
          email: formData.email,
          password: formData.password,
          role: 'student',
          defaultPortal: 'Student Portal'
        });
        toast({ title: 'Success', description: 'Account created successfully!' });
        authLogin(res.data?.tokens?.accessToken || '', res.data?.user);
        setLocation('/dashboard');
      } else {
        const res = await login({
          email: formData.email,
          password: formData.password
        });
        toast({ title: 'Success', description: 'Logged in successfully!' });
        authLogin(res.data?.tokens?.accessToken || '', res.data?.user);
        
        // redirect based on role
        const role = res.data?.user?.role;
        if (role === 'admin') setLocation('/admin');
        else if (role === 'company' || role === 'company_hr') setLocation('/hr/dashboard');
        else setLocation('/dashboard');
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Authentication failed',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for Left Hero Column
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* ------------------------------------------------------------- */}
      {/* LEFT COLUMN: Hero & Pure Background Video (Hidden on mobile)  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative hidden lg:flex w-[52%] flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
        {/* Background Video - Pure playback with NO dark overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero Content Container */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 w-full max-w-xs space-y-8"
        >
          {/* Brand/Logo Header */}
          <motion.div
            variants={heroChildVariants}
            className="flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5 shadow-lg">
              <PrimeWaveLogo className="w-full h-full text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white drop-shadow-md">
              PRIMEWAVE
            </span>
          </motion.div>

          {/* Heading Block */}
          <motion.div variants={heroChildVariants} className="space-y-2 text-center">
            <h1 className="text-4xl font-medium tracking-tight whitespace-nowrap text-white drop-shadow-lg">
              {mode === 'signup' ? 'Join PRIMEWAVE' : 'Welcome to PRIMEWAVE'}
            </h1>
            <p className="text-white/80 text-sm leading-relaxed px-4 drop-shadow">
              Follow these 3 quick phases to activate your space.
            </p>
          </motion.div>

          {/* Staggered Phase Steps */}
          <motion.div variants={heroChildVariants} className="space-y-3">
            <StepItem
              number={1}
              text="Register your identity"
              active={activeStep === 1}
              onClick={() => setActiveStep(1)}
            />
            <StepItem
              number={2}
              text="Configure your studio"
              active={activeStep === 2}
              onClick={() => setActiveStep(2)}
            />
            <StepItem
              number={3}
              text="Finalize your profile"
              active={activeStep === 3}
              onClick={() => setActiveStep(3)}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT COLUMN: Interactive Form                                */}
      {/* ------------------------------------------------------------- */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden relative">
        {/* Top-Left Brand Logo for Mobile View */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/20 p-1">
            <PrimeWaveLogo className="w-full h-full text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            PRIMEWAVE
          </span>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10 my-auto"
        >
          {/* Header */}
          <div className="space-y-1.5 text-left">
            <h2 className="text-3xl font-medium tracking-tight text-white">
              {mode === 'signup' ? 'Create New Profile' : 'Welcome Back'}
            </h2>
            <p className="text-white/40 text-sm">
              {mode === 'signup'
                ? 'Input your basic details to begin the journey.'
                : 'Enter your credentials to access your workspace.'}
            </p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={<Chrome className="w-4 h-4 text-white" />} label="Google" />
            <SocialButton icon={<Github className="w-4 h-4 text-white" />} label="Github" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
              Or
            </span>
          </div>

          {/* Registration / Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup
                  label="First Name"
                  placeholder="John"
                  type="text"
                  value={formData.firstName}
                  onChange={(val) => handleInputChange('firstName', val)}
                />
                <InputGroup
                  label="Last Name"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastName}
                  onChange={(val) => handleInputChange('lastName', val)}
                />
              </div>
            )}

            <InputGroup
              label="Email"
              placeholder="john.doe@example.com"
              type="email"
              value={formData.email}
              onChange={(val) => handleInputChange('email', val)}
            />

            <InputGroup
              label="Password"
              placeholder="••••••••••••"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(val) => handleInputChange('password', val)}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-white transition-colors focus:outline-none"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              helperText={
                mode === 'signup' ? 'Requires at least 8 symbols.' : undefined
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition-all duration-200 cursor-pointer shadow-lg shadow-white/5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (mode === 'signup' ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Footer Toggle Link */}
          <div className="text-center pt-2">
            {mode === 'signup' ? (
              <p className="text-sm text-white/50">
                Member of the team?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-white font-medium hover:underline cursor-pointer transition-colors"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p className="text-sm text-white/50">
                New to PRIMEWAVE?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-white font-medium hover:underline cursor-pointer transition-colors"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

{/* ==================================================================== */}
{/* REUSABLE FUNCTIONAL COMPONENTS                                       */}
{/* ==================================================================== */}

/**
 * 1. StepItem Component
 */
interface StepItemProps {
  number: number;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

function StepItem({ number, text, active = false, onClick }: StepItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer select-none ${
        active
          ? 'bg-white text-black border border-white shadow-xl scale-[1.02]'
          : 'bg-brand-gray text-white border-none hover:bg-white/10'
      }`}
    >
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0 transition-colors ${
          active ? 'bg-black text-white' : 'bg-white/10 text-white/40'
        }`}
      >
        {active ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : number}
      </div>
      <span className="text-sm font-medium tracking-tight truncate">{text}</span>
    </div>
  );
}

/**
 * 2. SocialButton Component
 */
interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-black border border-white/10 rounded-xl hover:bg-white/5 flex items-center justify-center gap-3 h-12 text-sm font-medium text-white transition-all duration-200 cursor-pointer active:scale-[0.98]"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/**
 * 3. InputGroup Component
 */
interface InputGroupProps {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (value: string) => void;
  rightElement?: React.ReactNode;
  helperText?: string;
}

function InputGroup({
  label,
  placeholder,
  type,
  value,
  onChange,
  rightElement,
  helperText,
}: InputGroupProps) {
  return (
    <div className="space-y-1.5 w-full text-left">
      <label className="text-sm font-medium text-white block">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 w-full outline-none transition-all text-sm"
        />
        {rightElement && (
          <div className="absolute right-3.5 flex items-center">{rightElement}</div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-white/40 pt-0.5">{helperText}</p>
      )}
    </div>
  );
}

/**
 * 4. PRIMEWAVE Logo SVG Component (Matching the uploaded double-mountain logo)
 */
function PrimeWaveLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer Rounded Container */}
      <rect x="8" y="8" width="84" height="84" rx="22" ry="22" strokeWidth="7" />

      {/* Top Ascending Line Accent */}
      <line x1="18" y1="64" x2="63" y2="25" strokeWidth="7" />

      {/* Right Mountain Peak Wave */}
      <polyline points="23 72 63 34 77 68" strokeWidth="7" />

      {/* Left Mountain Peak Wave */}
      <polyline points="37 72 48 56 56 72" strokeWidth="7" />
    </svg>
  );
}
