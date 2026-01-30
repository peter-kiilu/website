import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { User, Mail, Lock, Hash, Book, ArrowRight, UserPlus, Sparkles, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    student_id: '',
    department: 'Computer Science'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Section */}
                <div className="space-y-5">
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="University Email"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      name="password"
                      type="password"
                      required
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Create Password"
                    />
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Academic Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      name="student_id"
                      type="text"
                      required
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="Student Registration No"
                    />
                  </div>

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
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group"
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

