import { useState } from 'react';
import { Link } from 'react-router-dom'
import ActivitySuggestionForm from '../components/ActivitySuggestionForm';
import { FiCalendar, FiMapPin, FiUsers, FiPlus } from 'react-icons/fi';

const activities = [
  {
    id: 1,
    title: "Ethical AI Hackathon",
    date: "2025-06-10",
    location: "CS Building Room 101",
    participants: 24,
    description: "A 24-hour hackathon focused on developing AI solutions with ethical considerations built-in.",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Sustainable Computing Workshop",
    date: "2025-05-20",
    location: "Charter Hall",
    participants: 15,
    description: "Learn how to reduce energy consumption in your computing projects.",
    status: "past"
  },
  {
    id: 3,
    title: "Tech for Social Good Panel",
    date: "2025-07-05",
    location: "University Auditorium",
    participants: 42,
    description: "Industry leaders discuss how technology can address social challenges.",
    status: "upcoming"
  }
];

export default function Activities() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Club Activities</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Activities
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'upcoming' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'past' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Past
            </button>
              <Link to="/activities/suggest" className="btn-secondary">
              Join an Activity
              </Link>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-secondary-dark transition-colors"
          >
            <FiPlus className="mr-2" />
            Suggest Activity
          </button>
        </div>
        
        {showForm && (
          <div className="mb-8">
            <ActivitySuggestionForm onSuccess={() => setShowForm(false)} />
          </div>
        )}
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No activities found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map(activity => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-3 ${
                    activity.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </span>
                  
                  <h2 className="text-xl font-bold mb-3">{activity.title}</h2>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {new Date(activity.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-2 text-gray-400" />
                      {activity.location}
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-2 text-gray-400" />
                      {activity.participants} participants
                    </div>
                  </div>
                  
                  {activity.status === 'upcoming' && (
                    <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-primary-dark transition-colors">
                      Register
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}