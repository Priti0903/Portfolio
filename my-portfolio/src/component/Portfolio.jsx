//npm install if required
// npm start

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Menu } from "lucide-react";

const PROFILE = {
  name: "Priti Vishwakarma",
  role: "MCA Student | Aspiring Full Stack Developer",
  email: "pritiv.8211@gmail.com",
  linkedin: "https://www.linkedin.com/in/priti-vishwakarma-4282a126b/",
  github: "https://github.com/Priti0903?tab=repositories",
  resumeHref: "/Resume.pdf", // must be inside /public
  photo: "/Portfolio/images/photo.jpg",       // must be inside /public
  phone: "+91-9689744822",
  location: "Pimpri, Pune - 411018"
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Portfolio() {
  const mainRef = useRef(null);
  const [active, setActive] = useState("hero");

  function scrollToSection(hashOrId) {
    const id = hashOrId?.startsWith?.("#") ? hashOrId.slice(1) : hashOrId;
    if (!id) return;
    const container = mainRef.current;
    const target = document.getElementById(id);
    if (!container || !target) return;
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const top = targetRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    const sections = Array.from(container.querySelectorAll("section[id]"));

    function onScroll() {
      const containerRect = container.getBoundingClientRect();
      const containerMid = containerRect.top + container.clientHeight / 2;
      let current = active;
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= containerMid && rect.bottom >= containerRect.top + 20) {
          current = s.id;
          break;
        }
      }
      setActive((prev) => (prev !== current ? current : prev));
    }

    onScroll();

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white font-sans overflow-x-hidden">
      <ParticleBackground />
      <Navbar onNavigate={scrollToSection} active={active} />

      <main
        ref={mainRef}
        className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth"
      >
        <section id="hero" className="snap-start">
          <HeroSection scrollToSection={scrollToSection} />
        </section>
        <section id="about" className="snap-start">
          <AboutSection />
        </section>
        <section id="education" className="snap-start">
          <EducationSection />
        </section>
        <section id="skills" className="snap-start">
          <SkillsSection scrollContainerRef={mainRef} />
        </section>
        <section id="projects" className="snap-start">
          <ProjectsSection />
        </section>
        <section id="achievements" className="snap-start">
          <AchievementsSection />
        </section>
        <section id="contact" className="snap-start">
          <ContactSection />
        </section>
        <Footer />
      </main>
    </div>
  );
}

function Navbar({ onNavigate, active }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  function handleClick(e, href) {
    e.preventDefault();
    if (typeof onNavigate === "function") onNavigate(href);
    setOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0d0f]/70 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 flex items-center justify-between">
      <div className="font-bold text-cyan-300 text-sm sm:text-base md:text-lg">{PROFILE.name}</div>

      <div className="hidden md:flex gap-6 text-xs sm:text-sm md:text-base">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => handleClick(e, l.href)}
            className={`transition ${
              active === l.href.slice(1)
                ? "text-cyan-300 border-b-2 border-cyan-400 pb-1"
                : "text-slate-300 hover:text-cyan-300"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>

      <button
        className="md:hidden"
        onClick={() => setOpen((s) => !s)}
        aria-label="menu"
        aria-expanded={open}
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
      </button>

      {open && (
        <div className="absolute top-14 right-4 bg-slate-900 border border-cyan-500/20 rounded-lg shadow-lg flex flex-col p-4 gap-3 text-xs sm:text-sm md:text-base">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className={`transition ${
                active === l.href.slice(1)
                  ? "text-cyan-300 border-b-2 border-cyan-400 pb-1"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["rgba(14,165,233,0.12)", "rgba(99,102,241,0.10)", "rgba(56,189,248,0.08)"];
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalCompositeOperation = "screen";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -10 || p.x > w + 10) p.x = Math.random() * w;
        if (p.y < -10 || p.y > h + 10) p.y = Math.random() * h;
      });
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    }

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", onResize);
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
function HeroSection({ scrollToSection }) {
  return (
    <section className="min-h-screen flex flex-col md:flex-row-reverse items-center justify-between px-8 md:px-20 py-20 max-w-[1400px] mx-auto">
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className="w-64 h-64 md:w-[22rem] md:h-[22rem] rounded-full object-cover mx-auto border-8 border-[#18181b] bg-[#18181b] shadow-2xl"
          style={{ objectPosition: "center top" }}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        className="w-full md:w-1/2 max-w-2xl z-20 flex flex-col items-center md:items-start mt-10 md:mt-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-center md:text-left">
          Hi, I’m <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
            {PROFILE.name}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-cyan-300 font-medium mb-4 text-center md:text-left">
          {PROFILE.role}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 max-w-xl text-center md:text-left">
          {PROFILE.tagline}
        </p>
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-[1.02] transition-transform text-sm sm:text-base"
          >
            View Projects
          </button>
          <a
            href={PROFILE.resumeHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-cyan-600/20 flex items-center gap-2 text-sm sm:text-base"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-white">
            <Github className="w-5 h-5" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PROFILE.email}?subject=Hello%20${PROFILE.name}&body=I%20saw%20your%20portfolio`}
            className="hover:text-white"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <motion.section
      id="about"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-cyan-300">Me</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
            I am {PROFILE.name}, currently pursuing MCA at D.Y. Patil Institute of MCA &amp; Management,
            Akurdi. I have a strong foundation in programming, algorithms and full-stack development.
          </p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-600/20 rounded-2xl p-6">
          <h3 className="text-cyan-300 text-lg font-semibold mb-3">Highlights</h3>
          <ul className="text-slate-300 space-y-2 list-inside list-disc text-sm sm:text-base md:text-lg">
            <li>Skilled in algorithms, data structures &amp; problem solving.</li>
            <li>Experience building full stack applications with Java, React and Node.</li>
            <li>Strong communicator and collaborative team player.</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

export function EducationSection() {
  const timeline = [
    {
      title: "MCA",
      place: "D.Y. Patil College of MCA & Management, Akurdi",
      year: "2024 – 2026",
      detail: "Currently pursuing, 1st Year CGPA: 8.65",
    },
    { title: "B.Sc. Computer Science", place: "Pune University", year: "2021 – 2024", detail: "CGPA: 9.32" },
    { title: "HSC Science", place: "Nirmal Bethany Jr. College", year: "2019 – 2020", detail: "Percentage: 91.67%" },
  ];

  return (
    <motion.section
      id="education"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
        My <span className="text-cyan-300">Education</span>
      </h2>
      <div className="max-w-3xl mx-auto">
        {timeline.map((t, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="text-cyan-300 text-sm sm:text-base">
              {t.place} • {t.year}
            </p>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">{t.detail}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
export function SkillsSection({ scrollContainerRef }) {
  const tech = [
    { name: "C Programming", level: 85 },
    { name: "C++", level: 75 },
    { name: "Java / Advanced Java", level: 85 },
    { name: "Python", level: 80 },
    { name: "MySQL", level: 85 },
    { name: "HTML / CSS", level: 80 },
    { name: "JavaScript", level: 75 },
  ];

  const soft = [
    { name: "Leadership", level: 90 },
    { name: "Adaptability", level: 95 },
    { name: "Creativity", level: 80 },
    { name: "Team Collaboration", level: 85 },
  ];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef?.current) return;
    const container = scrollContainerRef.current;

    function handleScroll() {
      const skillsSection = document.getElementById("skills");
      if (!skillsSection) return;
      const containerRect = container.getBoundingClientRect();
      const skillsRect = skillsSection.getBoundingClientRect();

      if (skillsRect.top < containerRect.bottom && skillsRect.bottom > containerRect.top) {
        setAnimate(true);
      }
    }

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const SkillBar = ({ skill }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-300">{skill.name}</div>
        <div className="text-xs text-slate-400">{skill.level}%</div>
      </div>
      <div className="w-full bg-slate-800 h-2.5 rounded-lg overflow-hidden mt-1.5">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={animate ? { width: `${skill.level}%`, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"
        />
      </div>
    </div>
  );

  return (
    <motion.section
      id="skills"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        My <span className="text-cyan-300">Skills</span>
      </h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-cyan-300 mb-3 text-lg font-semibold">Technical Skills</h3>
          {tech.map((s, i) => (
            <SkillBar key={i} skill={s} />
          ))}
        </div>
        <div>
          <h3 className="text-cyan-300 mb-3 text-lg font-semibold">Non-Technical Skills</h3>
          {soft.map((s, i) => (
            <SkillBar key={i} skill={s} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: "Bank Management System",
      desc: "Built using Java & MySQL...",
      tech: ["Java", "MySQL"],
      link: "https://github.com/Priti0903/Projects",
      image: "/Portfolio/images/bank-management.jpeg",
    },
    {
      title: "Online Doctor's Appointment System",
      desc: "Developed with PHP, HTML, and CSS. Admins manage schedules. Users book slots.",
      tech: ["PHP", "HTML", "CSS"],
      link: "https://github.com/Priti0903/PHP-Doctor-Appointment-System",
      image: "/Portfolio/images/doctor-appointment.jpeg",
    },
    {
      title: "College Event Management",
      desc: "Built with PHP, HTML, CSS and MySQL. Admins manage events. Users get QR codes.",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      link: "https://github.com/Priti0903/College-Event-Management-System",
      image: "/Portfolio/images/college-event.jpeg",
    },
    {
      title: "Tourify – Travel Itinerary App",
      desc: "Responsive web app for trip planning including day-wise scheduling and destination management.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Priti0903/Tourify-The-Travel-Itinerary",
      image: "/Portfolio/images/travel.jpeg",
    },
  ];

  return (
    <motion.section
      id="projects"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: false }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        My <span className="text-cyan-300">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-slate-900/80 border border-cyan-700 overflow-hidden shadow-lg transform transition-transform hover:scale-105"
          >
            <div className="h-40 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">{p.title}</h3>
              <p className="text-slate-300 mb-4 text-sm">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-600/50 text-cyan-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="text-sm text-cyan-400 flex items-center">
                <Github className="w-4 h-4 mr-2" /> View on GitHub
              </div>
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}

export function AchievementsSection() {
  const list = [
    "Cloud Computing as a Catalyst for Start-up Innovation : Research Paper, International Conference 2025 DYPIMS, Pune.",
    "HackerRank Certifications in C Programming, C++, Java, Advanced Java, Python, SQL.",
    "Secured 1st rank in B.Sc. Computer Science for three consecutive years."
  ];

  return (
    <motion.section
      id="achievements"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        My <span className="text-cyan-300">Achievements</span>
      </h2>
      <ul className="max-w-3xl mx-auto list-disc list-inside space-y-3 text-sm sm:text-base md:text-lg text-slate-300">
        {list.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </motion.section>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setSent(true);
        setError(null);
        e.target.reset();
        setTimeout(() => setSent(false), 3000);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch {
      setError("Failed to send message");
    }
  }

  return (
    <motion.section
      id="contact"
      className="px-8 md:px-16 py-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Contact Me</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-cyan-600/20 rounded-2xl p-5 text-sm sm:text-base">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="mb-2 text-slate-300">
            Email: <a href={`mailto:${PROFILE.email}`} className="text-cyan-300">{PROFILE.email}</a>
          </p>
          <p className="mb-2 text-slate-300">
            LinkedIn: <a href={PROFILE.linkedin} className="text-cyan-300">Profile</a>
          </p>
          <p className="text-slate-300">
            GitHub: <a href={PROFILE.github} className="text-cyan-300">Repo</a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-slate-900/50 border border-cyan-600/20 rounded-2xl p-5 text-sm sm:text-base">
          <label className="block mb-1">Name</label>
          <input name="name" required className="w-full mb-2 p-2 rounded-lg bg-transparent border border-white/10 outline-none" />
          <label className="block mb-1">Email</label>
          <input name="email" type="email" required className="w-full mb-2 p-2 rounded-lg bg-transparent border border-white/10 outline-none" />
          <label className="block mb-1">Message</label>
          <textarea name="message" required rows={4} className="w-full mb-3 p-2 rounded-lg bg-transparent border border-white/10 outline-none" />
          <div className="flex items-center gap-3">
            <button type="submit" className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm">Send</button>
            <a href={PROFILE.resumeHref} download className="px-3 py-2 rounded-xl bg-slate-800/60 border border-cyan-600/20 text-sm">Download CV</a>
          </div>
          {sent && <p className="mt-2 text-xs text-green-300">Message sent!</p>}
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </form>
      </div>
    </motion.section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 py-5 bg-slate-900/80 text-center text-slate-400 text-xs sm:text-sm border-t border-cyan-600/20">
      © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
    </footer>
  );
}
