const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Faculty Advisor",
      bio: "Professor of Computer Science with expertise in ethical AI"
    },
    {
      name: "Alex Johnson",
      role: "President",
      bio: "Senior CS student passionate about sustainable computing"
    },
    {
      name: "Maria Garcia",
      role: "Vice President",
      bio: "Focuses on diversity and inclusion in tech"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">About RC-YIC</h1>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          The Responsible Computing Young Innovators Club aims to foster innovation 
          while emphasizing ethical considerations, social responsibility, and 
          sustainable practices in technology development.
        </p>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card text-center">
              <div className="w-32 h-32 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-DEFAULT text-4xl font-bold">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary-DEFAULT font-medium mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Partner logos would go here */}
          <div className="bg-gray-200 w-40 h-20 flex items-center justify-center rounded">
            <span className="text-gray-500">Partner Logo</span>
          </div>
          <div className="bg-gray-200 w-40 h-20 flex items-center justify-center rounded">
            <span className="text-gray-500">Partner Logo</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;