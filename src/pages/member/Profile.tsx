import { FiUser, FiMail, FiAward, FiCalendar } from 'react-icons/fi';

const Profile = () => {
  const memberData = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    studentId: "CS2023001",
    department: "Computer Science",
    joinDate: "2023-01-15",
    points: 450,
    activitiesAttended: 8
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gray-300 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center">
                    <FiUser className="text-primary-DEFAULT text-4xl" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2">{memberData.name}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiMail className="text-gray-500 mr-2" />
                      <span>{memberData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">ID:</span>
                      <span>{memberData.studentId}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Department:</span>
                      <span>{memberData.department}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" />
                      <span>Member since {new Date(memberData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg self-start">
                  <div className="flex items-center mb-2">
                    <FiAward className="text-primary-DEFAULT mr-2" />
                    <span className="font-semibold">Points Earned</span>
                  </div>
                  <div className="text-3xl font-bold text-center">{memberData.points}</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold mb-3">Activity Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Activities Attended</div>
                  <div className="text-xl font-bold">{memberData.activitiesAttended}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Current Registrations</div>
                  <div className="text-xl font-bold">3</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Suggestions Made</div>
                  <div className="text-xl font-bold">5</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Member Level</div>
                  <div className="text-xl font-bold">Silver</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">My Upcoming Activities</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-500">You have 3 upcoming activities</p>
              {/* Activity list would go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;