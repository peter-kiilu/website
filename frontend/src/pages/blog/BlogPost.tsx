import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { id } = useParams();
  
  // Sample blog post data - in a real app, this would come from an API
  const post = {
    id: 1,
    title: "Ethical Considerations in AI Development",
    content: `
      <p class="text-xl leading-relaxed mb-8">Artificial Intelligence is transforming industries, but with great power comes great responsibility. In this post, we explore the ethical frameworks every developer should consider.</p>
      
      <h2 class="text-3xl font-display font-bold mt-12 mb-6">Key Principles</h2>
      <p class="mb-6">Responsible AI development should adhere to several core principles that ensure technology serves humanity rather than just efficiency.</p>
      <ul class="space-y-4 mb-8">
        <li class="flex items-start">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></span>
          <span><strong>Transparency:</strong> Systems should be explainable to users, with clear documentation on how decisions are reached.</span>
        </li>
        <li class="flex items-start">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></span>
          <span><strong>Fairness:</strong> Actively identifying and mitigating bias in training data and algorithms to prevent discrimination.</span>
        </li>
        <li class="flex items-start">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></span>
          <span><strong>Privacy:</strong> Protecting user data throughout the entire lifecycle, using techniques like differential privacy.</span>
        </li>
      </ul>
      
      <h2 class="text-3xl font-display font-bold mt-12 mb-6">Practical Implementation</h2>
      <p class="mb-6">Here are concrete steps your team can take starting today:</p>
      <ol class="list-decimal list-inside space-y-4 mb-8 pl-4">
        <li>Conduct ethical impact assessments before starting a new feature.</li>
        <li>Ensure diverse dataset collection to represent all user groups.</li>
        <li>Perform regular bias audits on your models in production.</li>
      </ol>
    `,
    author: "Dr. Sarah Chen",
    date: "2023-05-15",
    category: "AI Ethics",
    image: "/images/ethical-ai.png"
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary transition-colors mb-4 group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
              Back to Stories
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-primary/20 backdrop-blur-md text-primary text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg border border-primary/30 font-bold mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-foreground leading-[1.1] mb-8">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-t border-white/5 pt-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{post.author}</p>
                    <p className="text-xs">Main Author</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-primary" />
                  <span className="text-sm font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="max-w-4xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-12">
          {/* Share Sidebar */}
          <aside className="hidden lg:flex flex-col items-center space-y-6 pt-2 h-fit sticky top-32">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground vertical-text rotate-180 mb-4 whitespace-nowrap">
              Share Story
            </p>
            {[
              { icon: Facebook, color: 'hover:text-blue-500' },
              { icon: Twitter, color: 'hover:text-sky-400' },
              { icon: Linkedin, color: 'hover:text-blue-600' },
              { icon: MessageCircle, color: 'hover:text-emerald-500' }
            ].map((social, i) => (
              <button key={i} className={`p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground transition-all duration-300 ${social.color} hover:bg-white/10 hover:scale-110`}>
                <social.icon size={20} />
              </button>
            ))}
          </aside>

          {/* Body */}
          <div className="space-y-8">
            <div 
              className="prose prose-invert prose-lg max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="p-8 md:p-12 glass-card rounded-[3rem] bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-bold">Join the Conversation</h3>
                  <p className="text-muted-foreground max-w-md">
                    Become a member of RC-YIC to access exclusive resources and participate in ethical tech discussions.
                  </p>
                </div>
                <Button size="lg" className="rounded-2xl px-12 py-8 text-lg shrink-0">
                  Connect Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* More Stories could go here */}
    </div>
  );
};

export default BlogPost;
