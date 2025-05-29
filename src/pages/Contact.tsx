import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary flex items-center">
              <FiSend className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <FiMail className="text-primary-DEFAULT" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <p className="text-gray-600">rcyic@university.edu</p>
                <p className="text-gray-600">support@rcyic.edu</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <FiPhone className="text-primary-DEFAULT" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                <p className="text-gray-600">+254 700 000 777</p>
                <p className="text-gray-600">Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <FiMapPin className="text-primary-DEFAULT" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Location</h3>
                <p className="text-gray-600">Communication & Information Techology Department</p>
                <p className="text-gray-600">University of Embu Campus</p>
                <p className="text-gray-600">6-60100, Embu</p>
                <p className="text-gray-600">Embu, Nairobi Meru Highway</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;