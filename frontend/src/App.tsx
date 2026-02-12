import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/blog/Blog';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import BlogPost from './pages/blog/BlogPost';
import Profile from './pages/member/Profile';
import Dashboard from './pages/member/Dashboard';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ActivitiesAdmin from './pages/admin/ActivitiesAdmin';
import Mentors from './pages/Mentors';

function App() {
  useEffect(() => {
    if (!supabase) return;

    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        localStorage.setItem('user_email', session.user.email);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        localStorage.setItem('user_email', session.user.email);
      } else if (_event === 'SIGNED_OUT') {
        localStorage.removeItem('user_email');
        localStorage.removeItem('access_token');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full pt-20 overflow-x-hidden bg-[#0A0A0B] text-foreground transition-colors duration-300">
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/activities" element={<ActivitiesAdmin />} />
            <Route path="/mentors" element={<Mentors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;