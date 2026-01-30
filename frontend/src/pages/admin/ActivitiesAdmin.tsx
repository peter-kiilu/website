import { useState } from 'react';
import { Check, X, Trash2, Edit, Plus, Filter, Search, MoreVertical, Calendar, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const ActivitiesAdmin = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Ethical AI Hackathon",
      date: "2023-06-10",
      status: "approved",
      suggestedBy: "student@university.edu",
      priority: "high"
    },
    {
      id: 2,
      title: "Sustainable Coding Workshop",
      date: "2023-07-15",
      status: "pending",
      suggestedBy: "member@university.edu",
      priority: "medium"
    }
  ]);

  const handleApprove = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: "approved" } : activity
    ));
  };

  const handleReject = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: "rejected" } : activity
    ));
  };

  const handleDelete = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Admin Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs"
            >
              <ShieldCheck size={14} />
              <span>Admin Control Center</span>
            </motion.div>
            <h1 className="text-5xl font-display font-extrabold tracking-tight">
              Manage <span className="text-gradient">Activities</span>.
            </h1>
          </div>
          
          <Button className="rounded-2xl h-12 px-8 shadow-xl shadow-primary/20">
            <Plus size={18} className="mr-2" />
            New Activity
          </Button>
        </header>

        {/* Filters/Search Bar */}
        <Card className="rounded-[2rem] border-white/5 p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search activities, organizers, or status..." 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="outline" className="rounded-2xl h-14 px-6 border-white/5 bg-white/5 flex-grow md:flex-grow-0">
              <Filter size={18} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="rounded-2xl h-14 w-14 border-white/5 bg-white/5 p-0 shrink-0">
              <MoreVertical size={20} />
            </Button>
          </div>
        </Card>

        {/* Data Table */}
        <Card className="rounded-[2.5rem] border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Activity Details</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Organizer</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {activities.map((activity) => (
                    <motion.tr 
                      key={activity.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-8">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Calendar size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-lg">{activity.title}</p>
                            <p className="text-sm text-muted-foreground font-medium">{new Date(activity.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <User size={16} />
                          <span className="text-sm font-medium">{activity.suggestedBy}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          activity.status === 'approved' 
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : activity.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                             activity.status === 'approved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                             activity.status === 'pending' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                             'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                          }`} />
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center justify-end space-x-2">
                          {activity.status === 'pending' && (
                            <>
                              <Button
                                onClick={() => handleApprove(activity.id)}
                                variant="outline"
                                className="w-10 h-10 p-0 rounded-xl border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500"
                              >
                                <Check size={18} />
                              </Button>
                              <Button
                                onClick={() => handleReject(activity.id)}
                                variant="outline"
                                className="w-10 h-10 p-0 rounded-xl border-red-500/20 hover:bg-red-500/10 text-red-500"
                              >
                                <X size={18} />
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => handleDelete(activity.id)}
                            variant="outline"
                            className="w-10 h-10 p-0 rounded-xl border-white/5 hover:bg-white/10 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </Button>
                          <Button 
                            variant="outline"
                            className="w-10 h-10 p-0 rounded-xl border-white/5 hover:bg-white/10 text-primary"
                          >
                            <Edit size={18} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivitiesAdmin;
