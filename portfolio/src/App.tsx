import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ArrowRight, Briefcase, MapPin, Calendar, Facebook, Instagram } from 'lucide-react';

// --- Interfaces ---

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

interface JobData {
  role: string;
  company: string;
  date: string;
  type: string;
}

interface SkillData {
  name: string;
  logo: string;
}

// --- Components ---

// 1. Calendar Widget (Static Black, No Shadow)
const CalendarWidget: React.FC = () => {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: Wed, Jan 14 2026
      const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const day = now.getDate();
      const year = now.getFullYear();
      
      setDateString(`${weekday}, ${month} ${day} ${year}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 left-6 z-50 hidden lg:flex items-center gap-3 px-6 py-3 rounded-full bg-black/80 border border-white/10"
    >
      <Calendar size={16} className="text-white/70" />
      <span className="text-sm font-bold text-white tracking-tight font-dot">{dateString}</span>
    </motion.div>
  );
};

// 2. iOS Liquid Glass Navbar
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: string[] = ["About", "Projects", "Education", "Experience"];

  return (
    <div className="fixed bottom-6 left-0 right-0 lg:top-6 lg:bottom-auto z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`
          pointer-events-auto
          flex items-center gap-4 lg:gap-6 px-6 py-3 rounded-full transition-all duration-500 ease-out font-dot
          bg-white/65 backdrop-blur-3xl backdrop-saturate-150 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:shadow-none
          ${scrolled ? "lg:!bg-white/65 lg:!backdrop-blur-3xl lg:!border-white/50 lg:!shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : ""}
        `}
      >
        <div className="flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-bold tracking-tighter">
          <a 
            href="#home" 
            className="flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100"
          >
             <img 
              src="/home-agreement.png" 
              alt="Home" 
              className="w-4 h-4 object-contain" 
            />
          </a>

          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="transition-colors font-medium text-gray-600 hover:text-black"
            >
              {link}
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

// 3. Section Wrapper
const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full px-6 py-12 lg:py-24 max-w-5xl mx-auto flex flex-col justify-center ${className}`}>
    {children}
  </section>
);

// 4. New iOS Liquid Glass Card
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true }) => (
  <motion.div 
    whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" } : {}}
    className={`
      relative overflow-hidden
      bg-white/65 
      backdrop-blur-3xl backdrop-saturate-150
      border border-white/50
      shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]
      transition-all duration-300
      ${className}
    `}
  >
    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// 5. Infinite Marquee Component
const SkillsMarquee: React.FC<{ skills: SkillData[] }> = ({ skills }) => {
  return (
    <div className="w-full overflow-hidden relative py-4 lg:py-8 mask-linear-gradient">
      <div className="absolute inset-y-0 left-0 w-12 lg:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 lg:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max">
        <motion.div 
          className="flex gap-10 lg:gap-24 px-8 lg:px-12"
          animate={{ x: ["0%", "-100%"] }} 
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 
          }}
        >
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default">
              <img src={skill.logo} alt={skill.name} className="w-6 h-6 lg:w-10 lg:h-10 object-contain" />
              <span className="text-lg lg:text-3xl font-bold tracking-tight text-black/80 font-dot whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollYProgress } = useScroll();
  
  const jobs: JobData[] = [
    { role: "Senior ML Engineer", company: "TechCorp Nepal", date: "2023 - Present", type: "Full-time" },
    { role: "AI Researcher", company: "Kathmandu University", date: "2021 - 2023", type: "Research" },
  ];

  const techStack: SkillData[] = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  ];

  return (
    <div className="relative bg-[#FAFAFA] text-[#1a1a1a] overflow-x-hidden font-dot selection:bg-black selection:text-white">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#000 2px, transparent 2px)' }}>
      </div>

      <Navbar />
      <CalendarWidget />

      {/* 1. HOME */}
      <Section id="home" className="pt-12 lg:pt-0 min-h-auto lg:min-h-screen flex items-center"> 
        <div className="flex flex-row items-center justify-between gap-4 md:gap-10 lg:gap-16 w-full">
          
          <div className="flex-1 space-y-2 md:space-y-4 text-left z-10 min-w-0">
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-gray-400 font-dot text-sm md:text-base tracking-widest pl-1"
            >
              Hi, I am
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="font-dot text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tighter uppercase [word-spacing:-0.4em]"
            >
              Safal Narshing <br /> Shrestha
            </motion.h1>

            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
               className="flex flex-col gap-1 md:gap-2 pt-1 pl-1"
            >
              <p className="font-dot text-xl md:text-2xl text-gray-600">
                ML/AI Engineer
              </p>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 font-dot">
                <MapPin size={10} className="md:w-3 md:h-3" />
                <span>Kathmandu, Nepal</span>
              </div>

              {/* ACTIVE NOW */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green-600 font-dot">
                  Active Now
                </span>
              </motion.div>

            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 md:gap-4 pt-3 md:pt-6 pl-1"
            >
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-[10px] md:text-xs hover:scale-105 transition-transform font-dot">
                <ArrowUpRight size={14} className="md:w-4 md:h-4" />
                Resume
              </button>
              <a href="#connect">
                <button className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-[10px] md:text-xs hover:bg-gray-300 transition-colors font-dot">
                  Contact Me
                </button>
              </a>
            </motion.div>
          </div>

          <div className="w-28 md:flex-1 md:w-full max-w-xs z-10 flex-shrink-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-gray-100"
            >
              <img 
                src="./public/pfp.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale contrast-[1.2] brightness-105"
              />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPC9zdmc+')] mix-blend-hard-light opacity-40 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 2. SKILLS */}
      <section id="skills" className="w-full py-4 lg:py-24 flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto px-6 w-full text-center mb-4 lg:mb-6">
            <p className="font-dot text-[10px] lg:text-sm text-gray-400 tracking-widest uppercase">Tech Stack</p>
        </div>
        <SkillsMarquee skills={techStack} />
      </section>

      {/* 3. ABOUT ME */}
      <Section id="about" className="min-h-[80vh]">
        <div className="flex flex-col items-center text-center w-full space-y-12">
           <h2 className="font-dot text-5xl md:text-6xl uppercase tracking-tight">About Me</h2>
           <div className="space-y-8 font-dot text-sm md:text-base leading-relaxed text-gray-700 w-full text-left md:text-center">
              <p>
                I've always been drawn to the space where logic meets imagination. What began as curiosity tinkering with code, solving puzzles, and breaking things just to rebuild them better—has evolved into a journey through machine learning, AI, and immersive technologies.
              </p>
              <p>
                I'm Safal Shrestha, a developer who believes that every line of code tells a story. For me, technology isn't just about automation or algorithms—it's about exploration. I've built research-driven systems that range from Sudoku-solving algorithms and AR-based learning tools to speech recognition models, each project reflecting a small step in understanding how intelligence can be shaped by design.
              </p>
              <p>
                I enjoy working at the intersection of creativity and computation—where data meets design, and science meets storytelling. My process is deeply iterative: experiment, observe, refine, repeat. Whether it's an app, a real simulation, or a neural network, I approach every build like a narrative—each function adding character, each data shaping context.
              </p>
              <p>
                Today, I'm still learning, still building, and still questioning. Because in technology, there's always another story waiting to be written—one commit at a time.
              </p>
           </div>
        </div>
      </Section>

      {/* 4. EDUCATION */}
      <Section id="education">
          <div className="w-full">
            <h2 className="font-dot text-4xl uppercase mb-16 pl-6">Education</h2>
            <div className="space-y-16 pl-6 border-l-[1.5px] border-gray-300 ml-6">
               <div className="relative pl-10">
                 <div className="absolute -left-[9px] top-2 w-[17px] h-[17px] bg-black rounded-full border-4 border-[#FAFAFA]"></div>
                 <h3 className="text-3xl font-bold tracking-tight font-dot">Bachelors Of Science in Computer Science</h3>
                 <p className="text-xl text-gray-600 mt-2 font-medium font-dot">Kathmandu University</p>
                 <div className="flex flex-wrap gap-6 mt-4 text-sm font-dot text-gray-500 uppercase tracking-widest">
                   <span>2023 — 2027</span>
                   <span>Dhulikhel, Nepal</span>
                 </div>
               </div>
               <div className="relative pl-10 opacity-60">
                 <div className="absolute -left-[9px] top-2 w-[17px] h-[17px] bg-gray-400 rounded-full border-4 border-[#FAFAFA]"></div>
                 <h3 className="text-3xl font-bold tracking-tight font-dot">High School Science</h3>
                 <p className="text-xl text-gray-600 mt-2 font-medium font-dot">Kathmandu University High School</p>
                 <div className="flex flex-wrap gap-6 mt-4 text-sm font-dot text-gray-500 uppercase tracking-widest">
                   <span>2020-2022</span>
                   <span>Kathmandu, Nepal</span>
                 </div>
               </div>
            </div>
          </div>
      </Section>

      {/* 5. EXPERIENCE */}
      <Section id="experience">
        <h2 className="font-dot text-4xl mb-12 uppercase text-left">Experience</h2>
        <div className="space-y-6 w-full">
          {jobs.map((job, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.8)" }} 
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-2xl bg-white/40 border border-white/50 cursor-default transition-colors hover:shadow-lg hover:shadow-black/5 hover:border-white/80"
            >
               <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 border border-white flex items-center justify-center font-bold text-2xl text-gray-600 shadow-sm group-hover:scale-105 transition-transform duration-300 font-dot">
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors font-dot">{job.role}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 font-dot">
                    <Briefcase size={14} />
                    <span>{job.company}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full mx-1"></span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 pl-20 md:pl-0 w-full md:w-auto justify-between md:justify-end">
                 <span className="font-dot text-xs font-medium text-gray-400 uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full border border-white/40 group-hover:bg-white group-hover:text-black transition-colors">
                    {job.date}
                 </span>
                 <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent group-hover:bg-white transition-all shadow-none group-hover:shadow-sm">
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-black -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 6. CONNECT SECTION */}
      <section id="connect" className="w-full px-6 py-24 max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-dot text-5xl md:text-7xl uppercase mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-dot">
            Interested in collaborating on AI projects or just want to say hi? My inbox is always open.
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black text-white pt-16 pb-32 md:pb-16 border-t border-white/10 mt-12">
        {/* CHANGED: max-w-5xl -> w-[80%] mx-auto (for exactly 10% margin on each side) */}
        <div className="w-[90%] lg:w-[80%] mx-auto px-0">
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                
                {/* Left Side: Bio & Status */}
                <div className="space-y-6 max-w-sm">
                    <div className="text-2xl font-bold tracking-tight font-dot">SPIDEY</div>

                    <p className="text-gray-400 text-sm leading-relaxed font-dot">
                        I'm Safal - an ML/AI Engineer & Researcher.
                        Building intelligent systems and exploring the boundaries of machine learning.
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 font-dot">
                            Available for work
                        </span>
                    </div>
                </div>

                {/* Right Side: General Links */}
                <div>
                    <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-6 font-dot">General</h3>
                    <div className="flex flex-col gap-4 text-sm text-gray-300 font-dot">
                        {["About", "Projects", "Education", "Experience"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright & Socials */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 text-xs font-dot text-center md:text-left">
                    © 2026 Safal N. Shrestha. All rights reserved.
                </p>

                {/* Socials */}
                <div className="flex gap-6 text-gray-400">
                    <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default App;