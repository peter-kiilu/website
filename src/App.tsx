import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/blog/Blog';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import BlogPost from './pages/blog/BlogPost';
import Profile from './pages/member/Profile';
import ActivityDetail from './pages/ActivityDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full pt-20 overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;