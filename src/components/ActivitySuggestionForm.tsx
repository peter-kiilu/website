import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

type ActivitySuggestion = {
  title: string;
  description: string;
  semester: string;
  contactEmail: string;
};

type ActivitySuggestionFormProps = {
  onSuccess?: () => void;
};

export default function ActivitySuggestionForm({ onSuccess }: ActivitySuggestionFormProps) {
  const [formData, setFormData] = useState<ActivitySuggestion>({
    title: '',
    description: '',
    semester: '',
    contactEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          semester: '',
          contactEmail: ''
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <FiCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
        <h3 className="text-lg font-medium text-green-800 mb-1">Thank you for your suggestion!</h3>
        <p className="text-green-600">We've received your activity suggestion and will review it soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Suggest a New Activity</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Activity Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
            required
            placeholder="e.g., Ethical AI Workshop"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
            required
            placeholder="Describe the activity in detail..."
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
              Target Semester *
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-700 focus:border-gray-700"
              required
            >
              <option value="">Select semester</option>
              <option value="Fall 2023">Fall 2025</option>
              <option value="Spring 2024">Spring 2025</option>
              <option value="Summer 2024">Summer 2025</option>
              <option value="Fall 2024">Fall 2025</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-black mb-1">
              Your Email *
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
              required
              placeholder="your.email@university.edu"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting 
                ? 'bg-primary-300' 
                : 'bg-gray-700 hover:bg-primary-dark'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </div>
        
        <p className="text-xs text-gray-500">
          By submitting this form, you agree to our privacy policy. We may contact you for more details about your suggestion.
        </p>
      </div>
    </form>
  );
}