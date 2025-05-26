import { useParams } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import ActivityRegistrationForm from '../components/ActivityRegistrationForm';

const ActivityDetail = () => {
  const { id } = useParams();
  
  // In a real app, this would come from an API
  const activity = {
    id: '1',
    title: "Ethical AI Hackathon",
    description: "A 24-hour hackathon focused on developing AI solutions with ethical considerations built-in. Teams will work on real-world problems and present their solutions to a panel of judges.",
    date: "2025-06-10T09:00:00",
    endDate: "2023-06-11T09:00:00",
    location: "Computer Science Building, Room 101",
    capacity: 50,
    registered: 32,
    organizer: "Dr. Sarah Chen",
    requirements: "Basic programming knowledge. Teams of 3-5 students.",
    points: 100
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />
                  {formatDate(activity.date)} - {formatDate(activity.endDate)}
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="mr-2" />
                  {activity.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-2" />
                  {activity.registered}/{activity.capacity} registered
                </div>
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-2" />
                  {activity.points} points
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p>{activity.description}</p>
                
                <h2 className="text-xl font-semibold mt-6 mb-2">Requirements</h2>
                <p>{activity.requirements}</p>
                
                <h2 className="text-xl font-semibold mt-6 mb-2">Organizer</h2>
                <p>{activity.organizer}</p>
              </div>
              
              <div className="mt-8">
                <ActivityRegistrationForm activityId={id || ''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;