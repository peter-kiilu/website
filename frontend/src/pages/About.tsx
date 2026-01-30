import { motion } from 'framer-motion';
import { Target, Users, Handshake, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Faculty Advisor",
      bio: "Professor of Computer Science with expertise in ethical AI and human-centered design.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Alex Johnson",
      role: "President",
      bio: "Senior CS student passionate about sustainable computing and privacy-first architecture.",
      social: { linkedin: "#", github: "#" }
    },
    {
      name: "Maria Garcia",
      role: "Vice President",
      bio: "Focuses on diversity and inclusion in tech and inclusive algorithmic development.",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Mission Section */}
        <section className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Target size={16} />
              <span className="text-sm font-bold uppercase tracking-wider">Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
              Fostering innovation with <span className="text-gradient">Responsibility</span>.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Responsible Computing Young Innovators Club (RC-YIC) is dedicated to empowering students to lead the tech industry with ethics, sustainability, and privacy at the core of their work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              { title: "Ethics", desc: "Placing human values at the center of algorithmic decision making.", icon: "⚖️" },
              { title: "Sustainability", desc: "Reducing the carbon footprint of digital products through optimization.", icon: "🌱" },
              { title: "Privacy", desc: "Championing data protection as a fundamental human right.", icon: "🔒" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass-card rounded-[2.5rem] space-y-4"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h3 className="text-2xl font-bold font-display text-primary">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Team Section */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                <Users size={16} />
                <span className="text-sm font-bold uppercase tracking-wider">The Visionaries</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Leading the <span className="text-accent italic">Change</span>.</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm">
              Our diverse team of students and faculty are committed to reshaping the future of computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors" />
                      <div className="relative w-full h-full rounded-2xl bg-card border border-white/5 flex items-center justify-center overflow-hidden">
                        <span className="text-primary text-4xl font-bold font-display italic">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold font-display">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                    </div>

                    <div className="flex justify-center space-x-4 pt-4 border-t border-white/5">
                      {member.social.linkedin && <Linkedin size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />}
                      {member.social.twitter && <Twitter size={18} className="text-muted-foreground hover:text-sky-400 cursor-pointer transition-colors" />}
                      {member.social.github && <Github size={18} className="text-muted-foreground hover:text-white cursor-pointer transition-colors" />}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-24 px-8 glass-card rounded-[3.5rem] border border-white/10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 text-muted-foreground border border-white/10">
              <Handshake size={16} />
              <span className="text-sm font-bold uppercase tracking-wider">Strategic Allies</span>
            </div>
            <h2 className="text-4xl font-display font-bold">Supported by the <span className="text-primary">Best</span>.</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Sustainable Tech Inst.", "Ethical AI Lab", "Privacy Foundation", "Green Computing Alliance"].map((partner, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs">
                  LOG
                </div>
                <span className="font-display font-bold text-lg tracking-tight">{partner}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pb-20">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-display font-bold">Want to learn more?</h2>
            <p className="text-muted-foreground text-lg">
              Get in touch with us to find out how you can contribute or partner with RC-YIC.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="rounded-2xl px-12">
                Download Brochure
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-12">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
