import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

const blogPosts = [
  {
    id: 1,
    title: "Ethical Considerations in AI Development",
    excerpt: "Exploring the moral responsibilities of AI developers and how to implement ethical frameworks.",
    date: "2025-05-15",
    author: "Dr. Sarah Chen",
    category: "AI Ethics"
  },
  {
    id: 2,
    title: "Sustainable Computing Practices",
    excerpt: "How to reduce the environmental impact of your computing projects and research.",
    date: "2025-04-22",
    author: "Prof. James Wilson",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "Responsible Data Management",
    excerpt: "Best practices for handling user data with privacy and security in mind.",
    date: "2025-03-10",
    author: "Alex Johnson",
    category: "Data Science"
  }
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">RC-YIC Blog</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Filters */}
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
            All Posts
          </button>
          <button className="border border-gray-700 bg-gray-400 text-primary-DEFAULT px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700">
            AI Ethics
          </button>
          <button className="border border-gray-700 bg-gray-400 text-primary-DEFAULT px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700">
            Sustainability
          </button>
        </div>
        
        <div className="space-y-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <span className="inline-block bg-secondary-100 text-secondary-DEFAULT text-xs px-2 py-1 rounded-full font-semibold mb-3">
                  {post.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-3">
                  <Link to={`/blog/${post.id}`} className="hover:text-primary-DEFAULT transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-1" />
                      {post.author}
                    </span>
                  </div>                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="flex items-center text-primary-DEFAULT font-medium mt-3 sm:mt-0 hover:underline"
                  >
                    Read more <FiArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-gray-700 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              2
            </button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              3
            </button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}