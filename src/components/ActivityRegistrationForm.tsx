import { useState } from 'react';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

interface RegistrationData {
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
}

const ActivityRegistrationForm = ({ activityId }: { activityId: string }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    studentId: '',
    department: 'Computer Science',
    year: '1'
  });

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Information Technology'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you would call your API here
      console.log('Registering for activity:', activityId, formData);
      alert('Registration successful!');
      setFormData({
        name: '',
        email: '',
        studentId: '',
        department: 'Computer Science',
        year: '1'
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Register for this Activity</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiUser className="text-gray-500 mr-2" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMail className="text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="University Email"
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <FiUser className="text-gray-500 mr-2" />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Student ID"
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="flex-1 outline-none bg-white"
            required
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <FiCalendar className="text-gray-500 mr-2" />
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="flex-1 outline-none bg-white"
            required
          >
            {[1, 2, 3, 4].map(year => (
              <option key={year} value={year.toString()}>Year {year}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-accent-dark transition"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default ActivityRegistrationForm;