import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSent(true);
    
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "rcyic@university.edu",
      sub: "Mon - Fri, 9am to 6pm",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+254 700 000 777",
      sub: "Direct line for inquiries",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "CIT Dept, University of Embu",
      sub: "6-60100, Embu, Kenya",
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header Section */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs"
          >
            <MessageSquare size={14} />
            <span>Get in touch</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
            Let's build something <span className="text-gradient">Responsibly</span>.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Have an idea, a question, or want to collaborate? We're here to help you navigate the future of ethical tech.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 items-start">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-[2.5rem] border-white/5 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="text-emerald-500" size={40} />
                      </div>
                      <h3 className="text-3xl font-display font-bold">Message Received!</h3>
                      <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground ml-1">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            required
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                          required
                          placeholder="How can we help?"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                        <textarea
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                          required
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span className="flex items-center space-x-2">
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span>Send Message</span>
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="p-8 glass-card rounded-[2.5rem] border-white/5 space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">Contact Info</h3>
                <p className="text-muted-foreground">Reach us via any of these channels.</p>
              </div>

              <div className="space-y-8">
                {contactMethods.map((method, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className={method.color} size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{method.title}</p>
                      <p className="text-lg font-medium text-foreground">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                <h4 className="font-bold flex items-center space-x-2">
                  <Globe size={18} className="text-primary" />
                  <span>Global Presence</span>
                </h4>
                <div className="aspect-video rounded-3xl overflow-hidden grayscale opacity-50 relative group">
                  <div className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity" />
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
                    <div className="w-3 h-3 bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 text-center space-y-4">
              <h4 className="text-xl font-display font-bold">Community Support</h4>
              <p className="text-sm text-muted-foreground">
                Join our Discord for real-time support and collaboration with other innovators.
              </p>
              <Button variant="outline" className="w-full rounded-xl border-primary/30 hover:bg-primary/20">
                Join Discord
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
