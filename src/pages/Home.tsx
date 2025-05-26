import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Ethical AI Workshop",
      date: "2025-06-15",
      excerpt: "Join us for an in-depth workshop exploring the ethical dilemmas surrounding artificial intelligence. We'll discuss bias in algorithms, transparency, accountability, and how to ensure AI is developed and deployed responsibly in society."
    },
    {
      id: 2,
      title: "Sustainable Coding",
      date: "2025-06-22",
      excerpt: "Discover practical strategies to write code that’s not only efficient but also eco-friendly. This session covers energy-aware algorithms, sustainable software engineering principles, and tools that help measure your app’s environmental footprint."
    },
    {
      id: 3,
      title: "Digital Privacy and You",
      date: "2025-06-28",
      excerpt: "In a world where data is constantly collected, learn how to protect your digital identity. This event will cover privacy-first design, encryption basics, and how to advocate for ethical data use in tech development."
    },
    {
      id: 4,
      title: "Hack for Impact: Mini Hackathon",
      date: "2025-07-03",
      excerpt: "Put your skills to the test in a 12-hour hackathon focused on solving real-world challenges in education, health, and community development. Open to all experience levels with mentorship available throughout the event."
    },
    {
      id: 5,
      title: "Open Source for Social Good",
      date: "2025-07-10",
      excerpt: "Get involved in open source projects that drive positive change. Learn how to contribute, collaborate, and make your code count for causes like climate action, accessibility, and equitable tech access."
    },
    {
    id: 6,
    title: "Future of Work: Tech Careers Panel",
    date: "2025-07-17",
    excerpt: "Explore how automation, remote work, and emerging technologies are reshaping the job market. Hear from industry professionals about career paths in tech, skills that will matter most, and how to future-proof your career in a fast-changing world."
   }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-default text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Responsible Computing Young Innovators Club
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering students to innovate responsibly in computing and technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/activities" className="btn-secondary">
              Explore Activities
            </Link>
            <Link to="/contact" className="btn-accent">
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="flex items-center text-gray-500">
                    <FiCalendar className="mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="mb-4">{event.excerpt}</p>
                <Link 
                  to={`/activities/${event.id}`} 
                  className="inline-flex items-center text-primary-default hover:text-primary-dark"
                >
                  Learn more <FiArrowRight className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Involved?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of responsible computing enthusiasts.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;