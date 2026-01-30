import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Ethical Considerations in AI Development",
    excerpt: "Exploring the moral responsibilities of AI developers and how to implement ethical frameworks in production systems.",
    date: "2025-05-15",
    author: "Dr. Sarah Chen",
    category: "AI Ethics",
    image: "/images/ethical-ai.png"
  },
  {
    id: 2,
    title: "Sustainable Computing Practices",
    excerpt: "How to reduce the environmental impact of your computing projects and research through efficient optimization.",
    date: "2025-04-22",
    author: "Prof. James Wilson",
    category: "Sustainability",
    image: "/images/sustainable-tech.png"
  },
  {
    id: 3,
    title: "Responsible Data Management",
    excerpt: "Best practices for handling user data with privacy and security in mind. Building trust through transparency.",
    date: "2025-03-10",
    author: "Alex Johnson",
    category: "Data Science",
    image: "/images/digital-privacy.png"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 space-y-4 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <BookOpen size={14} />
            <span>Latest Stories</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold">Insights on <span className="text-gradient">Responsible</span> Tech.</h1>
          <p className="text-muted-foreground text-lg">
            Stay ahead of the curve with our latest articles on ethics, sustainability, and innovation in the digital age.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full group overflow-hidden border-white/5 hover:border-primary/20 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/80 backdrop-blur-md text-foreground text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1 text-primary" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <User size={12} className="mr-1 text-primary" />
                      {post.author}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter>
                  <Link to={`/blog/${post.id}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between items-center group/btn rounded-xl border border-white/5 hover:bg-primary hover:text-white transition-all duration-300">
                      <span>Read Story</span>
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Categories / Filter section could go here */}
        <div className="mt-24 p-12 glass-card rounded-[3rem] text-center space-y-6">
          <h3 className="text-3xl font-display font-bold">Never miss an update.</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get the latest stories and insights from our community delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border-white/10 rounded-2xl px-6 py-3 w-full focus:ring-primary focus:border-primary transition-all"
            />
            <Button className="rounded-2xl px-8">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
