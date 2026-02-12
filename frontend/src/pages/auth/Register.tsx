import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { signInWithGoogle } from '../../lib/supabase';
import { User, Mail, Lock, Hash, Book, ArrowRight, UserPlus, Sparkles, GraduationCap, Briefcase, Check, X, Eye, EyeOff, FileText, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    student_id: '',
    department: 'Computer Science',
    year_of_study: '1',
    role: 'student' as 'student' | 'mentor' | 'staff',
    bio: '',
    expertise: '',
    availability: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength validation
  const passwordChecks = useMemo(() => ({
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    digit: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  }), [formData.password]);

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const isPasswordValid = passwordStrength === 5;

  // Email validation based on role - only validate when form is being submitted or email looks "complete"
  const getEmailError = () => {
    const email = formData.email.toLowerCase().trim();
    
    // Don't validate empty or incomplete emails
    if (!email || email.length < 5 || !email.includes('@')) return null;
    
    // Check if email ends with valid domain
    const isAcKe = email.endsWith('.ac.ke');
    const isGmail = email.endsWith('@gmail.com');
    
    if (formData.role === 'student') {
      if (!isAcKe) return 'Students must use email ending with .ac.ke';
    } else {
      // Mentor or staff - accept .ac.ke OR gmail.com
      if (!isAcKe && !isGmail) return 'Use .ac.ke or @gmail.com email';
    }
    
    return null;
  };
  
  const emailError = useMemo(() => getEmailError(), [formData.email, formData.role]);

  // Form is valid when password is valid AND (no email error OR email is empty - will be caught on submit)
  const isFormValid = isPasswordValid && !emailError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isPasswordValid) {
      setError('Please meet all password requirements');
      return;
    }
    
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);

    try {
      const user = await api.register(formData);
      console.log("Registered:", user);
      localStorage.setItem('user_email', user.email);
      navigate('/profile'); 
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Information Technology'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0A0A0B]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Side: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-emerald-500 font-bold uppercase tracking-widest text-xs">
              <UserPlus size={16} />
              <span>Join the Community</span>
            </div>
            <h1 className="text-6xl font-display font-extrabold tracking-tight leading-tight">
              Start your <br />
              <span className="text-gradient">Tech Journey</span>.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              Become a member of the Young Innovators Club and gain access to workshops, hackathons, and a community of like-minded creators.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="p-6 glass-card border-white/5 rounded-3xl space-y-2">
              <h4 className="text-2xl font-bold text-foreground">100+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Annual Events</p>
            </div>
            <div className="p-6 glass-card border-white/5 rounded-3xl space-y-2">
              <h4 className="text-2xl font-bold text-foreground">5k+</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Active Members</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="glass-card rounded-[2.5rem] border-white/10 p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-8 right-8">
              <GraduationCap className="text-primary/20" size={48} />
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Create Account</h2>
                <p className="text-muted-foreground">Join our ecosystem of innovators</p>
              </div>

              {/* Role Selection */}
              <div className="flex gap-3">
                {[
                  { value: 'student', label: 'Student', icon: GraduationCap },
                  { value: 'mentor', label: 'Mentor/Staff', icon: Briefcase }
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value as any })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      formData.role === role.value || (role.value === 'mentor' && formData.role === 'staff')
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'
                    }`}
                  >
                    <role.icon size={18} />
                    <span className="font-bold text-sm">{role.label}</span>
                  </button>
                ))}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      name="full_name"
                      type="text"
                      required
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 transition-all outline-none ${
                        emailError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'
                      }`}
                      placeholder={formData.role === 'student' ? 'yourname@university.ac.ke' : 'yourname@gmail.com'}
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>
                    )}
                  </div>

                  {/* Password with strength indicator */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="Create Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password strength bar */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength >= level
                              ? level <= 2 ? 'bg-red-500' : level <= 4 ? 'bg-yellow-500' : 'bg-emerald-500'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Password requirements */}
                    <AnimatePresence>
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-2 text-xs"
                        >
                          {[
                            { key: 'length', label: '8+ characters' },
                            { key: 'uppercase', label: 'Uppercase letter' },
                            { key: 'lowercase', label: 'Lowercase letter' },
                            { key: 'digit', label: 'Number' },
                            { key: 'special', label: 'Special character' },
                          ].map((check) => (
                            <div
                              key={check.key}
                              className={`flex items-center gap-1 ${
                                passwordChecks[check.key as keyof typeof passwordChecks] ? 'text-emerald-500' : 'text-muted-foreground'
                              }`}
                            >
                              {passwordChecks[check.key as keyof typeof passwordChecks] ? <Check size={12} /> : <X size={12} />}
                              <span>{check.label}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Academic Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.role === 'student' && (
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input
                        name="student_id"
                        type="text"
                        required
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="Registration No"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-background">{dept}</option>
                      ))}
                    </select>
                  </div>

                  {formData.role === 'student' && (
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <select
                        name="year_of_study"
                        required
                        value={formData.year_of_study}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      >
                        <option value="1" className="bg-background">1st Year</option>
                        <option value="2" className="bg-background">2nd Year</option>
                        <option value="3" className="bg-background">3rd Year</option>
                        <option value="4" className="bg-background">4th Year</option>
                        <option value="5" className="bg-background">5th Year+</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Mentor-specific fields */}
                <AnimatePresence>
                  {(formData.role === 'mentor' || formData.role === 'staff') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="h-px bg-white/5" />
                      <p className="text-xs text-primary font-bold uppercase tracking-widest">Mentor Profile</p>
                      
                      <div className="relative">
                        <FileText className="absolute left-4 top-4 text-primary/40" size={18} />
                        <textarea
                          name="bio"
                          onChange={handleChange}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                          placeholder="Brief bio about yourself..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                          <input
                            name="expertise"
                            type="text"
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="Area of Expertise"
                          />
                        </div>

                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                          <input
                            name="availability"
                            type="text"
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="Availability (e.g., Mon-Fri 9-5)"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Launch Account</span>
                      <Sparkles size={18} className="animate-pulse" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Google OAuth */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (err: any) {
                    console.error("Google sign up error:", err);
                    if (err.message?.includes('configuration')) {
                      setError('System configuration error: Google Sign-in not setup completely.');
                    } else {
                      setError(err.message || 'Google sign-in failed. Please try again.');
                    }
                  }
                }}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground text-sm font-medium">
                  Already part of the club?{' '}
                  <Link to="/login" className="text-primary font-bold hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
