import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

// --- Interfaces ---

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

interface JobData {
  role: string;
  company: string;
  date: string;
}

// --- Components ---

// 1. Liquid Glass Navbar
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: string[] = ["Projects", "Experience", "Education", "Skills"];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`
          flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300
          ${scrolled 
            ? "bg-white/40 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/5" 
            : "bg-black text-white"
          }
        `}
      >
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tighter">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className={`hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}
            >
              {link}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Icon Placeholder */}
        <div className="md:hidden">
          <span className="font-bold text-xs">MENU</span>
        </div>
      </motion.nav>
    </div>
  );
};

// 2. Section Wrapper
const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => (
  <section id={id} className={`min-h-screen w-full px-6 py-24 max-w-7xl mx-auto flex flex-col justify-center ${className}`}>
    {children}
  </section>
);

// 3. Liquid Glass Card
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`
      relative overflow-hidden rounded-2xl p-8
      bg-white/40 backdrop-blur-md border border-white/60 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]
      ${className}
    `}
  >
    {/* Optional: Glossy reflection effect */}
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

// --- Main App ---

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollYProgress } = useScroll();
  
  const jobs: JobData[] = [
    { role: "Senior ML Engineer", company: "TechCorp Nepal", date: "2023 - Present" },
    { role: "AI Researcher", company: "Kathmandu University", date: "2021 - 2023" },
  ];

  const techStack: string[] = ["Python", "TensorFlow", "PyTorch", "React", "TypeScript", "AWS", "Docker", "NLP"];

  return (
    <div className="relative bg-[#FAFAFA] text-[#1a1a1a] overflow-x-hidden">
      
      {/* Background Decor: Halftone Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#000 2px, transparent 2px)' }}>
      </div>

      <Navbar />

      {/* Hero Section */}
      <Section id="home" className="pt-32 lg:pt-0 min-h-[90vh]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text */}
          <div className="flex-1 space-y-8 z-10">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              Hi, I am
            </motion.p>
            
            {/* The Dot Matrix Name */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="font-dot text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight uppercase"
            >
              Safal <br /> Narshing <br /> Shrestha
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-dot text-2xl md:text-3xl text-gray-600 uppercase tracking-widest"
            >
              ML/AI Engineer
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex gap-4 pt-4"
            >
              <button className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                <ArrowUpRight size={18} />
                Resume
              </button>
              <button className="flex items-center gap-2 bg-gray-200 text-black px-8 py-3 rounded-full hover:bg-gray-300 transition-colors">
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right Image with Halftone Effect */}
          <div className="flex-1 relative w-full max-w-md lg:max-w-lg z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-[3rem] overflow-hidden grayscale contrast-125"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
              {/* CSS Halftone Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPC9zdmc+')] mix-blend-overlay opacity-50 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Projects Section - Using Liquid Glass Cards */}
      <Section id="projects">
        <h2 className="font-dot text-4xl mb-12 uppercase">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <GlassCard key={item} className="h-80 flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold border border-black px-2 py-1 rounded-full">2024</span>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Neural Network Visualizer</h3>
                <p className="text-gray-500 text-sm">A web-based tool to visualize backpropagation in real-time using React and TensorFlow.js.</p>
              </div>
              <div className="w-full h-32 bg-gray-200/50 rounded-lg mt-4 overflow-hidden relative">
                 {/* Placeholder for project thumbnail */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white/20"></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <h2 className="font-dot text-4xl mb-12 uppercase">Experience</h2>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <GlassCard key={idx} className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-left w-full">
                <h3 className="text-xl font-bold">{job.role}</h3>
                <p className="text-gray-500">{job.company}</p>
              </div>
              <span className="font-mono text-sm bg-black/5 px-3 py-1 rounded-full">{job.date}</span>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Skills & Education Grid */}
      <Section id="education">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h2 className="font-dot text-4xl mb-8 uppercase">Education</h2>
            <div className="space-y-8 pl-4 border-l-2 border-gray-200">
               <div className="relative">
                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-black rounded-full"></div>
                 <h3 className="text-xl font-bold">Bachelors in Computer Engineering</h3>
                 <p className="text-gray-500">Kathmandu University</p>
                 <p className="text-xs text-gray-400 mt-1">2019 - 2023</p>
               </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-dot text-4xl mb-8 uppercase">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer / Contact */}
      <footer className="w-full py-12 px-6 border-t border-gray-200 mt-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="font-dot text-2xl">Safal N. Shrestha</h2>
            <p className="text-gray-500 text-sm">Kathmandu, Nepal</p>
          </div>
          <div className="flex gap-6">
            <Github className="hover:scale-110 transition-transform cursor-pointer" />
            <Linkedin className="hover:scale-110 transition-transform cursor-pointer" />
            <Mail className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <p className="text-xs text-gray-400">© 2026. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;