import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Activities', href: '/activities' },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'LinkedIn', icon: Linkedin, href: '#' },
    ]
  };

  return (
    <footer className="w-full bg-card/30 backdrop-blur-xl border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group w-fit">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-lg">RC</span>
              </div>
              <h1 className="text-xl font-display font-bold tracking-tight text-foreground">
                RC<span className="text-primary">-</span>YIC
              </h1>
            </Link>
            <p className="text-muted-foreground text-lg max-w-md">
              Empowering the next generation of university students to innovate responsibly through ethical technology and sustainable development.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={item.name}
                >
                  <item.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-foreground font-semibold text-lg mb-6">Stay Connected</h4>
            <div className="p-1 rounded-2xl bg-white/5 border border-white/10 focus-within:border-primary/50 transition-colors">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-transparent border-none focus:ring-0 text-sm px-4 py-2 w-full text-foreground"
                />
                <button className="bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-colors">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail size={18} className="text-primary" />
              <a href="mailto:contact@rcyic.edu" className="hover:text-primary transition-colors">
                contact@rcyic.edu
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} <span className="text-foreground font-medium">RC-YIC</span>. All rights reserved. 
            <span className="mx-2 hidden sm:inline">|</span> 
            <br className="sm:hidden" />
            Designed for Responsibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
