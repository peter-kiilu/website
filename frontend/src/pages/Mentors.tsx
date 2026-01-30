import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Search, Filter, Briefcase, GraduationCap, Clock, Mail, ArrowRight, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { API_URL, User as UserType } from '../lib/api';

export default function Mentors() {
  const [mentors, setMentors] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`${API_URL}/users/mentors`);
        if (response.ok) {
          const data = await response.json();
          setMentors(data);
        }
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.expertise?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || mentor.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(mentors.map(m => m.department).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
            <Users size={16} />
            <span>Mentorship Program</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">
            Find Your <span className="text-gradient">Mentor</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced professionals and faculty members who can guide you on your tech journey.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none min-w-[200px]"
              >
                <option value="all" className="bg-background">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-background">{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Mentors Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredMentors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <GraduationCap className="mx-auto text-muted-foreground/50 mb-4" size={64} />
            <h3 className="text-xl font-bold mb-2">No Mentors Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full p-6 hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <User className="text-primary" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{mentor.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.department}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-primary">
                        <Briefcase size={12} />
                        <span>{mentor.role === 'mentor' ? 'Mentor' : 'Staff'}</span>
                      </div>
                    </div>
                  </div>

                  {mentor.expertise && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Expertise</p>
                      <p className="text-sm text-foreground">{mentor.expertise}</p>
                    </div>
                  )}

                  {mentor.bio && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>
                  )}

                  {mentor.availability && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                      <Clock size={12} />
                      <span>{mentor.availability}</span>
                    </div>
                  )}

                  <div className="mt-auto flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl"
                      onClick={() => window.location.href = `mailto:${mentor.email}`}
                    >
                      <Mail size={16} className="mr-2" />
                      Contact
                    </Button>
                    <Link to={`/mentors/${mentor.id}`} className="flex-1">
                      <Button className="w-full rounded-xl group/btn">
                        View Profile
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
