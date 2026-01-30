import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Info, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ActivityRegistrationForm from '../components/ActivityRegistrationForm';
import { Button } from '../components/ui/Button';

const ActivityDetail = () => {
  const { id } = useParams();
  
  // In a real app, this would come from an API
  const activity = {
    id: '1',
    title: "Ethical AI Hackathon",
    description: "A 24-hour hackathon focused on developing AI solutions with ethical considerations built-in. Teams will work on real-world problems and present their solutions to a panel of judges. This is your chance to show that tech can be both innovative and responsible.",
    date: "2025-06-10T09:00:00",
    endDate: "2023-06-11T09:00:00",
    location: "Computer Science Building, Room 101",
    capacity: 50,
    registered: 32,
    organizer: "Dr. Faith Sarai",
    requirements: "Basic programming knowledge. Teams of 3-5 students. Bring your laptop and your most ethical ideas!",
    points: 100,
    image: "/images/ethical-ai.png" // Reusing generated images for consistency
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto space-y-6">
            <Link 
              to="/activities" 
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary transition-colors mb-4 group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
              Back to Events
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="bg-primary/20 backdrop-blur-md text-primary text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg border border-primary/30 font-bold">
                  Hackathon
                </span>
                <span className="flex items-center text-emerald-500 font-bold text-sm bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <Sparkles size={14} className="mr-2" />
                  Limited Slots Left
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-foreground leading-tight">
                {activity.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-card rounded-[2.5rem] border-white/5">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Date</p>
                <div className="flex items-center text-foreground font-medium">
                  <Calendar size={16} className="mr-2 text-primary" />
                  <span>June 10th</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Venue</p>
                <div className="flex items-center text-foreground font-medium">
                  <MapPin size={16} className="mr-2 text-primary" />
                  <span>CS Room 101</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Points</p>
                <div className="flex items-center text-foreground font-medium">
                  <Clock size={16} className="mr-2 text-primary" />
                  <span>{activity.points} XP</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Attendance</p>
                <div className="flex items-center text-foreground font-medium">
                  <Users size={16} className="mr-2 text-primary" />
                  <span>{activity.registered} Joined</span>
                </div>
              </div>
            </div>

            <div className="space-y-8 prose prose-invert max-w-none">
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold text-foreground inline-flex items-center">
                  <Info className="mr-3 text-primary" size={24} />
                  About the Event
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-foreground">Requirements</h3>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-muted-foreground leading-relaxed">
                  {activity.requirements}
                </div>
              </div>

              <div className="flex items-center space-x-6 p-8 glass-card border-white/5 rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organizer</p>
                  <p className="text-xl font-display font-bold">{activity.organizer}</p>
                </div>
                <div className="ml-auto">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <ActivityRegistrationForm activityId={id || ''} />
            
            <div className="mt-8 p-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Questions about the registration? <br />
                <Link to="/contact" className="text-primary hover:underline font-bold">Contact Support</Link>
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
