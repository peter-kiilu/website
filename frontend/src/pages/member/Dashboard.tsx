import { Calendar, Activity, Award, User, ArrowRight, Sparkles, TrendingUp, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const Dashboard = () => {
  const stats = [
    { name: 'Upcoming Events', value: '5', icon: Calendar, change: '+2', trend: 'up', color: 'text-primary' },
    { name: 'Activities Attended', value: '12', icon: Activity, change: '+4', trend: 'up', color: 'text-blue-500' },
    { name: 'Points Earned', value: '850', icon: Award, change: '+150', trend: 'up', color: 'text-emerald-500' },
    { name: 'Suggestions', value: '3', icon: User, change: '0', trend: 'neutral', color: 'text-yellow-500' },
  ];

  const recentActivities = [
    { id: 1, name: 'Ethical AI Workshop', date: '2023-06-15', points: 50, category: 'Workshop' },
    { id: 2, name: 'Coding Competition', date: '2023-05-28', points: 100, category: 'Competition' },
    { id: 3, name: 'Guest Lecture', date: '2023-05-10', points: 30, category: 'Panel' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs"
            >
              <Sparkles size={14} />
              <span>Innovator Console</span>
            </motion.div>
            <h1 className="text-5xl font-display font-extrabold tracking-tight">
              Member <span className="text-gradient">Dashboard</span>.
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
            <Button className="rounded-2xl h-12 px-6 shadow-xl shadow-primary/20">
              New Suggestion
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] border-white/5 p-8 group hover:-translate-y-1 transition-all">
                <div className="space-y-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform ${stat.color}`}>
                    <stat.icon size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.name}</p>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl font-display font-bold leading-none">{stat.value}</span>
                      {stat.change !== '0' && (
                        <span className="text-xs font-bold text-emerald-500 flex items-center">
                          <TrendingUp size={12} className="mr-1" />
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          {/* Recent Activities List */}
          <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-display font-bold">Recent Milestones</h2>
              <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest">View All Log</Button>
            </div>
            
            <Card className="rounded-[2.5rem] border-white/5 overflow-hidden">
              <div className="divide-y divide-white/5">
                {recentActivities.map((activity, i) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-8 flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                        <Activity size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-lg group-hover:text-primary transition-colors">{activity.name}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground font-medium">
                          <span className="bg-white/5 px-2 py-0.5 rounded-lg border border-white/10 uppercase tracking-widest text-[8px] font-bold">
                            {activity.category}
                          </span>
                          <span>{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-500 font-display font-bold text-xl">+{activity.points}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold italic">XP Points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <aside className="space-y-8">
            <h2 className="text-2xl font-display font-bold px-4">Quick Missions</h2>
            <div className="space-y-4">
              {[
                { title: 'Upcoming Events', icon: Calendar, color: 'bg-primary/10 text-primary', sub: 'Plan your next workshop' },
                { title: 'Suggest Activity', icon: Activity, color: 'bg-blue-500/10 text-blue-500', sub: 'Contribute to the club' },
                { title: 'Achievements', icon: Award, color: 'bg-yellow-500/10 text-yellow-500', sub: 'View your digital badges' }
              ].map((action, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="w-full text-left p-6 glass-card rounded-[2rem] border-white/5 hover:border-white/20 transition-all group flex items-center space-x-6"
                >
                  <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <action.icon size={24} />
                  </div>
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-lg group-hover:text-primary transition-colors">{action.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{action.sub}</p>
                  </div>
                  <ArrowRight size={18} className="ml-auto text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </motion.button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
