import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Lightbulb, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { motion } from 'framer-motion';

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Ethical AI Workshop",
      date: "2025-06-15",
      icon: ShieldCheck,
      excerpt: "Level up your tech stack with ethical AI implementation strategies."
    },
    {
      id: 2,
      title: "Sustainable Coding",
      date: "2025-06-22",
      icon: Zap,
      excerpt: "Performance optimization meets eco-friendly computing."
    },
    {
      id: 3,
      title: "Digital Privacy and You",
      date: "2025-06-28",
      icon: ShieldCheck,
      excerpt: "Master the art of privacy-first design in modern apps."
    }
  ];

  const features = [
    {
      title: "Ethical Innovation",
      description: "Developing technology with humans in mind, not just code.",
      icon: Lightbulb
    },
    {
      title: "Sustainable Tech",
      description: "Reducing digital footprints through efficient optimization.",
      icon: Zap
    },
    {
      title: "Privacy First",
      description: "Building trust by protecting user identities by design.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium">Join the Future of Tech</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-foreground">
              Innovate <span className="text-gradient">Responsibly</span> for a Better Tomorrow.
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              RC-YIC is the movement for university innovators dedicated to ethical tech, digital privacy, and sustainable computing.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/activities">
                <Button size="lg" className="rounded-2xl px-10 text-lg shadow-2xl">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-2xl px-10 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Decorative Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 p-8 glass-card border-white/20 rounded-[3rem] shadow-3xl bg-white/5 backdrop-blur-2xl">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className={i === 0 ? "col-span-2" : ""}>
                    <div className="p-6 rounded-3xl bg-white/10 border border-white/10 space-y-4 hover:bg-white/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <feature.icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold font-display">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floaties */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 blur-3xl rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[["100+", "Active Members"], ["8+", "Tech Projects"], ["2+", "University Chapters"], ["15+", "Workshops"]].map(([stat, label]) => (
              <div key={label} className="space-y-2">
                <h4 className="text-4xl font-bold font-display text-primary">{stat}</h4>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Featured <span className="text-primary italic">Events</span>.</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Stay updated with our latest workshops, hackathons and panels focused on the future of tech.
              </p>
            </div>
            <Link to="/activities">
              <Button variant="outline" className="rounded-xl group">
                View All Events <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full group hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader>
                    <div className="text-accent mb-4 p-3 bg-accent/10 w-fit rounded-xl group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <event.icon size={24} />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                    <CardDescription className="flex items-center pt-2">
                      <Calendar size={14} className="mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{event.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/activities/${event.id}`} className="w-full">
                      <Button variant="ghost" className="w-full group/btn justify-between py-6 rounded-xl border border-white/5 hover:bg-white/5">
                        Details <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden bg-primary shadow-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-primary to-accent pointer-events-none opacity-50" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Ready to create tech <br /> that matters?
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Join the club today and start building the future of responsible computing with us.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link to="/contact">
                <Button variant="glass" size="lg" className="rounded-2xl px-12 py-8 text-xl bg-white text-primary hover:bg-white/90 shadow-2xl">
                  Apply to Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;