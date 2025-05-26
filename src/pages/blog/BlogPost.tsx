import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  
  // Sample blog post data - in a real app, this would come from an API
  const post = {
    id: 1,
    title: "Ethical Considerations in AI Development",
    content: `
      <p>Artificial Intelligence is transforming industries, but with great power comes great responsibility. In this post, we explore the ethical frameworks every developer should consider.</p>
      
      <h2>Key Principles</h2>
      <p>Responsible AI development should adhere to several core principles:</p>
      <ul>
        <li><strong>Transparency:</strong> Systems should be explainable to users</li>
        <li><strong>Fairness:</strong> Avoid bias in training data and algorithms</li>
        <li><strong>Privacy:</strong> Protect user data throughout the lifecycle</li>
      </ul>
      
      <h2>Practical Implementation</h2>
      <p>Here are concrete steps your team can take:</p>
      <ol>
        <li>Conduct ethical impact assessments</li>
        <li>Diverse dataset collection</li>
        <li>Regular bias audits</li>
      </ol>
    `,
    author: "Dr. Sarah Chen",
    date: "2023-05-15",
    category: "AI Ethics",
    image: "/ai-ethics.jpg"
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/blog" 
          className="flex items-center text-accent-DEFAULT hover:text-accent-dark mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-primary-100 text-primary-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500">
                <FaUser className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center text-gray-500">
                <FaCalendarAlt className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {post.title}
            </h1>
            
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Share this post</h3>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center">
                  <span className="sr-only">LinkedIn</span>
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;