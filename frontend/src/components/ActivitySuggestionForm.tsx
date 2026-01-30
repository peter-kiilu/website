import { useState } from 'react';
import { CheckCircle2, Sparkles, Send, Calendar, Mail, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

type ActivitySuggestion = {
  title: string;
  description: string;
  semester: string;
  contactEmail: string;
};

type ActivitySuggestionFormProps = {
  onSuccess?: () => void;
};

export default function ActivitySuggestionForm({ onSuccess }: ActivitySuggestionFormProps) {
  const [formData, setFormData] = useState<ActivitySuggestion>({
    title: '',
    description: '',
    semester: '',
    contactEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          semester: '',
          contactEmail: ''
        });
        setIsSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-card rounded-[2.5rem] border-white/10 overflow-hidden">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-12 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <h3 className="text-3xl font-display font-bold">Awesome Suggestion!</h3>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto">
              We've received your idea. Our team will review it and get back to you soon.
            </p>
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
              <div className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs">
                <Sparkles size={14} />
                <span>Collaborate</span>
              </div>
              <h3 className="text-3xl font-display font-bold">Shape the Future.</h3>
              <p className="text-muted-foreground">What kind of activities would you like to see next?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Activity Title</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    required
                    placeholder="e.g., Sustainable Web Workshop"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                  required
                  placeholder="Tell us more about your vision..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Target Semester</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      required
                    >
                      <option value="" className="bg-background">Select Semester</option>
                      <option value="Fall 2025" className="bg-background">Fall 2025</option>
                      <option value="Spring 2026" className="bg-background">Spring 2026</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      required
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Idea...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Send size={18} />
                  <span>Submit Suggestion</span>
                </span>
              )}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground px-8">
              * By submitting, you agree to collaborate with the RC-YIC team to bring this idea to life.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
