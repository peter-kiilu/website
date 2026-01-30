import { useState } from 'react';
import { User, Mail, GraduationCap, Building2, Calendar, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface RegistrationData {
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
}

const ActivityRegistrationForm = ({ activityId }: { activityId: string }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    studentId: '',
    department: 'Computer Science',
    year: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Information Technology'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registering for activity:', activityId, formData);
      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          studentId: '',
          department: 'Computer Science',
          year: '1'
        });
        setIsSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-card rounded-[2.5rem] border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-12 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-display font-bold text-foreground">Registration Successful!</h3>
              <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                You're all set! Check your email for event details and further instructions.
              </p>
            </div>
            <Sparkles className="mx-auto text-primary animate-pulse" />
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="p-8 md:p-12 space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-display font-bold">Secure your Spot</h3>
              <p className="text-muted-foreground">Fill in your university details to join this session.</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      required
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">University Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      required
                      placeholder="jane@university.edu"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Student registration Number</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    required
                    placeholder="E.g. CIT/100/2021"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Academic Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      required
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-background">{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Academic Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      required
                    >
                      {[1, 2, 3, 4].map(year => (
                        <option key={year} value={year.toString()} className="bg-background">Year {year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
                  <Send size={18} />
                  <span>Confirm Registration</span>
                </span>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityRegistrationForm;
