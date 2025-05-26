import { useState } from 'react';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const ActivitiesAdmin = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Ethical AI Hackathon",
      date: "2023-06-10",
      status: "approved",
      suggestedBy: "student@university.edu"
    },
    {
      id: 2,
      title: "Sustainable Coding Workshop",
      date: "2023-07-15",
      status: "pending",
      suggestedBy: "member@university.edu"
    }
  ]);

  const handleApprove = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: "approved" } : activity
    ));
  };

  const handleReject = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: "rejected" } : activity
    ));
  };

  const handleDelete = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Manage Activities</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary-DEFAULT">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Suggested By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.suggestedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {activity.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(activity.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <FiCheck size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(activity.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiX size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <button className="text-primary-DEFAULT hover:text-primary-dark">
                          <FiEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-accent-DEFAULT text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition">
            Add New Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesAdmin;