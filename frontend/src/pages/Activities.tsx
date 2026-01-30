import { useState } from 'react';
import { Link } from 'react-router-dom';
import ActivitySuggestionForm from '../components/ActivitySuggestionForm';
import { Calendar, MapPin, Users, Plus, Filter, Sparkles, ChevronRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';

const activities = [
  {
    id: 1,
    title: "Ethical AI Hackathon",
    date: "2025-06-10",
    location: "CS Building Room 101",
    participants: 24,
    description: "A 24-hour hackathon focused on developing AI solutions with ethical considerations built-in. Prizes for most responsible design.",
    status: "upcoming",
    category: "Hackathon"
  },
  {
    id: 2,
    title: "Sustainable Computing Workshop",
    date: "2025-05-20",
    location: "Charter Hall",
    participants: 15,
    description: "Learn how to reduce energy consumption in your computing projects through efficient algorithm design and green hosting.",
    status: "past",
    category: "Workshop"
  },
  {
    id: 3,
    title: "Tech for Social Good Panel",
    date: "2025-07-05",
    location: "University Auditorium",
    participants: 42,
    description: "Industry leaders discuss how technology can address social challenges without compromising user privacy or dignity.",
    status: "upcoming",
    category: "Panel"
  }
];

export default function Activities() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs"
            >
              <Sparkles size={14} />
              <span>Events & Workshops</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight">
              Fueling Innovation <br />
              <span className="text-gradient">Responsibly</span>.
            </h1>
          </div>
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 flex items-center space-x-2 shrink-0"
          >
            <Plus size={20} />
            <span>Suggest Activity</span>
          </Button>
        </header>

        {/* Suggestion Form Overlay */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-12 border-b border-white/5">
                <ActivitySuggestionForm onSuccess={() => setTimeout(() => setShowForm(false), 2000)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and List */}
        <div className="space-y-12">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              {[
                { label: 'All', value: 'all', icon: Filter },
                { label: 'Upcoming', value: 'upcoming', icon: Sparkles },
                { label: 'Past', value: 'past', icon: History }
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    filter === btn.value 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <btn.icon size={16} />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
            <p className="text-muted-foreground text-sm ml-2">
              Showing {filteredActivities.length} total activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full flex flex-col group hover:-translate-y-2 transition-all duration-300 border-white/5 hover:border-primary/20">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                          {activity.category}
                        </span>
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          activity.status === 'upcoming' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-muted opacity-50'
                        }`} />
                      </div>
                      <CardTitle className="text-2xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                        {activity.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-8 flex-grow space-y-6">
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-3 pt-6 border-t border-white/5">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={16} className="mr-3 text-primary" />
                          <span>{new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={16} className="mr-3 text-primary" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users size={16} className="mr-3 text-primary" />
                          <span>{activity.participants} Innovators Registered</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-8 pt-0">
                      {activity.status === 'upcoming' ? (
                        <Link to={`/activities/${activity.id}`} className="w-full">
                          <Button className="w-full h-12 rounded-xl text-md font-bold group/btn">
                            <span>Register Now</span>
                            <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" disabled className="w-full h-12 rounded-xl opacity-50 cursor-not-allowed">
                          Event Concluded
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-32 space-y-6 glass-card rounded-[3rem]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Filter size={32} className="text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or suggest a new activity!</p>
              </div>
              <Button variant="ghost" onClick={() => setFilter('all')}>View All Activities</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
