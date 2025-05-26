import { FiActivity, FiCalendar, FiAward, FiUser } from 'react-icons/fi';

const Dashboard = () => {
  const stats = [
    { name: 'Upcoming Events', value: '5', icon: FiCalendar, change: '+2', changeType: 'positive' },
    { name: 'Activities Attended', value: '12', icon: FiActivity, change: '+4', changeType: 'positive' },
    { name: 'Points Earned', value: '850', icon: FiAward, change: '+150', changeType: 'positive' },
    { name: 'Suggestions', value: '3', icon: FiUser, change: '0', changeType: 'neutral' },
  ];

  const recentActivities = [
    { id: 1, name: 'Ethical AI Workshop', date: '2023-06-15', points: 50 },
    { id: 2, name: 'Coding Competition', date: '2023-05-28', points: 100 },
    { id: 3, name: 'Guest Lecture', date: '2023-05-10', points: 30 },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Member Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-primary-100 text-primary-DEFAULT">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    {stat.change !== '0' && (
                      <span className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{activity.name}</p>
                      <p className="text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-semibold bg-secondary-100 text-secondary-DEFAULT rounded-full">
                      +{activity.points} pts
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-primary-DEFAULT text-white px-6 py-4 rounded-lg shadow-md hover:bg-primary-dark transition flex items-center justify-center">
            <FiCalendar className="mr-2" />
            View Upcoming Events
          </button>
          <button className="bg-secondary-DEFAULT text-white px-6 py-4 rounded-lg shadow-md hover:bg-secondary-dark transition flex items-center justify-center">
            <FiActivity className="mr-2" />
            Suggest New Activity
          </button>
          <button className="bg-accent-DEFAULT text-white px-6 py-4 rounded-lg shadow-md hover:bg-accent-dark transition flex items-center justify-center">
            <FiAward className="mr-2" />
            View Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;