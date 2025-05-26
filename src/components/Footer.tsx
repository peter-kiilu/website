import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="w-full bg-primary-default text-white py-12">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
            <Link to="/" className="flex items-center space-x-2">
             <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary-DEFAULT font-bold text-sm">RC</span>
              </div>
             <h1 className="text-lg md:text-xl font-bold text-white">RC-YIC</h1>
            </Link>
            </div>
            <p className="text-white">
              Promoting responsible computing innovation among university students through
              ethical technology development and sustainable practices.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white hover:text-black transition">Home</Link></li>
              <li><Link to="/about" className="text-white hover:text-black transition">About</Link></li>
              <li><Link to="/blog" className="text-white hover:text-black transition">Blog</Link></li>
              <li><Link to="/activities" className="text-white hover:text-black transition">Activities</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-dark hover:bg-accent-DEFAULT rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-white text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-dark hover:bg-accent-DEFAULT rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-white text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-dark hover:bg-accent-DEFAULT rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-dark hover:bg-accent-DEFAULT rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-white text-lg" />
              </a>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Contact Email</h5>
              <a 
                href="mailto:contact@rcyic.edu" 
                className="text-white hover:text-black transition-colors"
              >
                contact@rcyic.edu
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-light mt-12 pt-8 text-center text-primary-100">
          <p>&copy; {new Date().getFullYear()} Responsible Computing Young Innovators Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}