import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Ethical AI Hackathon",
      date: "2025-06-10",
      location: "CS Building",
      attendees: "24/50",
      description: "24-hour hackathon focused on ethical AI solutions"
    },
    {
      id: 2,
      title: "Sustainable Coding Workshop",
      date: "2025-06-17",
      location: "Engineering Hall",
      attendees: "15/30",
      description: "Learn energy-efficient programming techniques"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Club Activities</h1>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-2">
          <button className="btn-primary px-4 py-2">All Activities</button>
          <button className="border border-primary-DEFAULT text-primary-DEFAULT px-4 py-2 rounded-lg">
            Upcoming
          </button>
        </div>
        <Link to="/activities/suggest" className="btn-secondary">
          Suggest an Activity
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {activities.map(activity => (
          <div key={activity.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
                <p className="mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <FiMapPin className="mr-2" />
                    {activity.location}
                  </span>
                  <span className="flex items-center">
                    <FiUsers className="mr-2" />
                    {activity.attendees} attendees
                  </span>
                </div>
              </div>
              <Link 
                to={`/activities/${activity.id}`} 
                className="btn-primary whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;