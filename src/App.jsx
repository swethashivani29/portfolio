import { useState, useEffect, useRef } from 'react'
import './App.css'

// Data
const resumeData = {
  name: "Swetha Shivani",
  title: "Software Engineer",
  phone: "8688766935",
  email: "cnk.swetha@gmail.com",
  linkedin: "https://www.linkedin.com/in/swetha-shivani-4b1a66115/",
  github: "https://github.com/Swethashivani",
  location: "Hyderabad, India",
  summary: "Software Engineer experienced in building performance-first Shopify storefronts and web applications for D2C brands. Proven track record of owning high-impact features for large clients, optimizing frontend performance, and collaborating closely with product and design teams. Hands-on experience with Shopify-native personalization, client-side architectures, and Spring Boot backend systems with REST APIs and database persistence.",
  experience: [
    {
      title: "Software Engineer",
      company: "Tectonic",
      type: "Remote",
      date: "April 2025 - Present",
      tagline: "Self-optimizing storefronts for leading brands",
      points: [
        "Collaborated with D2C brands to build high-performance storefronts using custom web and desktop app builders integrated with Shopify ecosystems.",
        "Led development of product detail pages (PDP), listing pages, and custom landing pages for Frido, the company's largest revenue-generating client, contributing directly to increased engagement and successful new product launches.",
        "Improved performance and page-speed metrics across Frido storefront, optimizing core web vitals and frontend responsiveness, resulting in faster load times and improved user experience.",
        "Worked closely with cross-functional teams, including product management and design, to translate UI/UX vision into scalable, implementable mobile and web experiences for Frido's app initiative.",
        "Contributed to multiple other Shopify-based storefront projects including Vaaree, Bombay Shaving Company, Ember, and other enterprise D2C brands.",
        "Was part of the on-call support rotation, prioritizing and resolving critical production issues to minimize downtime and ensure client success."
      ],
      link: "https://myfrido.com/"
    }
  ],
  projects: [
    {
      title: "Shopify Smart Recommendation App",
      date: "January 2026 - February 2026",
      description: "Built a performance-first Shopify recommendation app enabling personalized product discovery using client-side storage and Shopify-native data.",
      points: [
        "Enabled personalized product discovery using client-side storage and Shopify-native data, avoiding heavy backend infrastructure.",
        "Reduced recommendation load time by keeping logic client-side and Shopify-native, ensuring zero impact on Core Web Vitals.",
        "Built merchant-friendly configuration using Shopify Metaobjects, eliminating the need for custom dashboards."
      ]
    },
    {
      title: "BookMyShow Backend Application",
      date: "2024 - 2025",
      description: "Built a Spring Boot backend application powering a movie ticket booking system with REST APIs and persistent data storage.",
      points: [
        "Designed and developed a Spring Boot-based backend application to support core movie ticket booking workflows.",
        "Built RESTful APIs to retrieve show timings, add new shows, and handle ticket bookings, ensuring clean and scalable API design.",
        "Implemented data persistence using JPA Hibernate with MySQL, managing entities and relationships for shows, bookings, and schedules."
      ]
    }
  ],
  skills: {
    software: ["HTML", "CSS", "JavaScript", "Java", "React", "Spring Boot", "MySQL", "Git", "Shopify"],
    collaboration: ["Cross-function Collaboration", "Feature Ownership"]
  },
  achievements: [
    {
      icon: "🏆",
      title: "Leadership Skills",
      description: "Mentored and onboarded 2 interns, providing end-to-end KT, task breakdowns, and regular guidance, enabling them to contribute to production features independently."
    },
    {
      icon: "⭐",
      title: "Customer Excellence",
      description: "Earned high trust from the Frido team through consistent ownership, fast turnaround on requirements, and proactive problem-solving."
    },
    {
      icon: "⚙️",
      title: "Operational Excellence",
      description: "Recognized for reliability during on-call rotations, resolving critical production issues under tight timelines and minimizing client downtime."
    }
  ],
  education: [
    {
      degree: "Electronics and Communication Engineering",
      institution: "National Institute of Technology Calicut",
      location: "Calicut, India",
      date: "Jan 2014 - Dec 2018",
      gpa: "7.93 / 10"
    },
    {
      degree: "Intermediate Education",
      institution: "Sri Chaitanya Jr College",
      location: "Vijayawada",
      date: "2012 - 2014"
    }
  ],
  languages: [
    { name: "Telugu", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Fluent" }
  ]
}

// Components
function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <img src="/profile.jpeg" alt={resumeData.name} className="profile-photo" />
          <div className="header-text">
            <h1>{resumeData.name}</h1>
            <p className="title">{resumeData.title}</p>
            <div className="contact-info">
              <a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a>
              <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>{resumeData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Navigation() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills', 'achievements', 'education', 'languages']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Education', 'Languages']

  return (
    <nav className="nav">
      <ul>
        {navItems.map(item => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function AnimatedSection({ children, id, className }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${className || ''} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </section>
  )
}

function About() {
  return (
    <AnimatedSection id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>{resumeData.summary}</p>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Experience() {
  return (
    <AnimatedSection id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company} ({exp.type})</p>
              </div>
              <span className="experience-date">{exp.date}</span>
            </div>
            <p className="tagline"><em>{exp.tagline}</em></p>
            <ul className="experience-description">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            {exp.link && (
              <p className="experience-link">
                <a href={exp.link} target="_blank" rel="noopener noreferrer">
                  Visit Website →
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}

function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resumeData.projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resumeData.projects.length) % resumeData.projects.length)
  }

  return (
    <AnimatedSection id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p className="project-date">{project.date}</p>
                <p>{project.description}</p>
                <ul>
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-buttons">
          <button className="carousel-btn" onClick={prevSlide}>←</button>
          <button className="carousel-btn" onClick={nextSlide}>→</button>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Skills() {
  return (
    <AnimatedSection id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Software Skills</h3>
            <div className="skill-tags">
              {resumeData.skills.software.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3>Product & Collaboration</h3>
            <div className="skill-tags">
              {resumeData.skills.collaboration.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Achievements() {
  return (
    <AnimatedSection id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Key Achievements</h2>
        <div className="achievements-grid">
          {resumeData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <h3>
                <span className="achievement-icon">{achievement.icon}</span>
                {achievement.title}
              </h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Education() {
  return (
    <AnimatedSection id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.institution}</p>
              <div className="education-meta">
                <span>{edu.location}</span>
                <span>{edu.date}</span>
              </div>
              {edu.gpa && <span className="gpa-badge">GPA: {edu.gpa}</span>}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Languages() {
  return (
    <AnimatedSection id="languages" className="languages-section">
      <div className="container">
        <h2 className="section-title">Languages</h2>
        <div className="languages-list">
          {resumeData.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <h4>{lang.name}</h4>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Let's Connect!</p>
        <div className="social-links">
          <a href={`mailto:${resumeData.email}`}>Email</a>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={resumeData.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="copyright">© 2026 {resumeData.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Languages />
      </main>
      <Footer />
    </div>
  )
}

export default App
