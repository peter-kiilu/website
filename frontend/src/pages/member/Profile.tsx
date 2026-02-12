import { useEffect, useState } from 'react';
import { User as UserIcon, Mail, Award, Calendar, LogOut, Shield, Zap, Target, Star, ArrowRight } from 'lucide-react';
import { api, User } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const Profile = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user_email');
    navigate('/');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      let email = localStorage.getItem('user_email');
      
      // If no email in local storage, check Supabase session directly
      if (!email && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          email = session.user.email;
          localStorage.setItem('user_email', email);
        }
      }

      if (!email) {
        navigate('/login');
        return;
      }

      try {
        const data = await api.getMe(email);
        setMemberData(data);
      } catch (err: any) {
        console.error("Profile load error:", err);
        // If 404 and we have a session, it means the user is authenticated but not in our DB
        // Redirect to complete profile
        if ((err.message?.includes('404') || err.message?.includes('not found')) && email) {
           navigate(`/register?mode=complete_profile&email=${encodeURIComponent(email)}`);
           return;
        }
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl">
        {error}
      </div>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );

  if (!memberData) return null;

  const stats = [
    { label: 'Events Attended', value: '12', icon: Target, color: 'text-blue-500' },
    { label: 'Club Ranking', value: '#42', icon: Star, color: 'text-yellow-500' },
    { label: 'Suggestions', value: '3', icon: Zap, color: 'text-emerald-500' },
    { label: 'Member Level', value: 'Pro', icon: Shield, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header/Actions */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs"
            >
              <UserIcon size={14} />
              <span>Member Profile</span>
            </motion.div>
            <h1 className="text-5xl font-display font-extrabold tracking-tight">
              Hello, <span className="text-gradient">{memberData.full_name.split(' ')[0]}</span>.
            </h1>
          </div>
          
          <Button 
            variant="outline"
            onClick={handleLogout}
            className="rounded-2xl h-12 px-8 border-red-500/30 text-red-500 hover:bg-red-500/10 shrink-0"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 pt-8">
          {/* Main Profile Info */}
          <div className="space-y-12">
            <Card className="rounded-[3rem] border-white/5 overflow-hidden p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-5">
                <Award size={200} />
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors" />
                  <div className="w-40 h-40 rounded-full border-4 border-white/10 bg-[#1A1A1B] flex items-center justify-center relative overflow-hidden">
                    <UserIcon size={64} className="text-primary/40" />
                    {/* In a real app, this would be an avatar */}
                  </div>
                </div>

                <div className="space-y-8 flex-grow">
                  <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-4xl font-display font-bold leading-tight">{memberData.full_name}</h2>
                    <p className="text-xl text-muted-foreground">{memberData.department} • {memberData.year_of_study ? `Year ${memberData.year_of_study}` : 'Member'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{memberData.email}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium">{new Date(memberData.joined_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold px-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all group">
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform ${stat.color}`}>
                          <stat.icon size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* XP & Level Sidebar */}
          <aside className="space-y-8">
            <Card className="rounded-[2.5rem] border-primary/20 bg-primary/5 p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-primary/10">
                <Award size={120} />
              </div>
              
              <div className="space-y-2 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Experience Points</p>
                <h3 className="text-6xl font-display font-extrabold text-primary">{memberData.points}</h3>
                <p className="text-muted-foreground text-sm font-medium">You're in the top 5% of members!</p>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span>Level 8</span>
                  <span className="text-muted-foreground">Level 9</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground font-medium italic">
                  Complete 2 more activities to reach Senior Innovator level
                </p>
              </div>

              <Button className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20 font-bold group">
                <span>View Leaderboard</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            <Card className="rounded-[2.5rem] border-white/5 bg-white/5 p-8 space-y-6">
              <h4 className="text-xl font-display font-bold">Upcoming Missions</h4>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-[#1A1A1B] rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Target size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">Sustainable AI Hackathon</p>
                      <p className="text-[10px] text-muted-foreground">In 3 days</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-xs font-bold">Discover More Activities</Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
