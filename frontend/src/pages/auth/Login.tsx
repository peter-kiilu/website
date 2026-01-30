import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await api.login(formData);
      console.log("Logged in:", user);
      localStorage.setItem('user_email', user.email); 
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0A0A0B]">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Branding/Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs">
              <ShieldCheck size={16} />
              <span>Secure Access</span>
            </div>
            <h1 className="text-6xl font-display font-extrabold tracking-tight leading-tight">
              Welcome back to <br />
              <span className="text-gradient">Innovation</span>.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              Sign in to manage your activities, view your XP, and connect with fellow club members.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-white/10 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-bold">500+</span> innovators already joined
            </p>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass-card rounded-[2.5rem] border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="text-primary/20" size={40} />
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Sign In</h2>
                <p className="text-muted-foreground">Enter your credentials to continue</p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-sm font-medium text-muted-foreground">Password</label>
                      <Link to="#" className="text-xs text-primary hover:underline font-bold">Forgot?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="••••••••"
                      />
                    </div>
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
                      <span>Sign In</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-bold hover:underline">
                    Create one now
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

