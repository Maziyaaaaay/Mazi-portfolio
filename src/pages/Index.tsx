import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Play,
  Code,
  Video,
  Award,
  Briefcase,
  Moon,
  Sun,
  ArrowRight,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Gallery, { GalleryItem } from "@/components/Gallery";
import LazyVideo from "@/components/LazyVideo";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const galleryImages: GalleryItem[] = [
    {
      id: 1,
      src: "/uploads/1.jpeg",
    },
    {
      id: 2,
      src: "/uploads/2.jpeg",
    },
    {
      id: 3,
      src: "/uploads/3.jpeg",
    },
    {
      id: 4,
      src: "/uploads/4.jpeg",
    },
    {
      id: 5,
      src: "/uploads/5.jpeg",
    },
    {
      id: 6,
      src: "/uploads/6.jpeg",
    },
  ];

  const skills = [
    {
      name: "Video Editing",
      icon: Video,
      description: "Professional video editing with advanced effects",
    },
    {
      name: "Python",
      icon: Code,
      description: "Backend development and automation",
    },
    {
      name: "Flutter",
      icon: Code,
      description: "Cross-platform mobile development",
    },
    {
      name: "C Programming",
      icon: Code,
      description: "System programming and algorithms",
    },
    {
      name: "Java",
      icon: Code,
      description: "Object-oriented programming",
    },
  ];

  const projects = [
    {
      title: "ART OF TEACHING",
      description: "Video Description",
      videoSrc: "/uploads/aot.mp4",
      thumbnailSrc: "/uploads/aot.jpg",
      type: "video",
    },
    {
      title: "PERMUTE - SKILL FEST",
      description: "Video Description",
      videoSrc: "/uploads/permute.mp4",
      thumbnailSrc: "/uploads/permute.jpg",
      type: "video",
    },
    {
      title: "MU LEARN INTERNS MEET",
      description: "Video Description",
      videoSrc: "/uploads/sibin.mp4",
      thumbnailSrc: "/uploads/sibin.jpg",
      type: "video",
    },
    {
      title: "Calivista",
      description:
        "All-in-One Website Guide for Kozhikode. Winner of Second Prize in National Level Hackathon, Build for Kozhikode.",
      type: "web",
      link: "https://cali-vista.vercel.app/", // You can replace this with the actual link
      image: "/uploads/calivista-screenshot.jpg",
      category: "Web Development",
      status: "Completed",
      award: "2nd Prize - Build for Kozhikode",
    },
    {
      title: "AmpAware",
      description:
        "An application designed to track and reduce electricity wastage. Winner of Second Prize in Sahakiran Energy Ideathon.",
      type: "app",
      image:
        "https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Mobile App",
      status: "In Development",
      award: "2nd Prize - Sahakiran Energy Ideathon",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "NASA Space Apps Winner",
      description: "Multiple hackathon victories",
    },
    {
      icon: Code,
      title: "Open Source Contributor",
      description: "Active in Python community",
    },
    {
      icon: Video,
      title: "MuLearn Foundation",
      description: "Professional video editing intern",
    },
    {
      icon: Briefcase,
      title: "Freelance Projects",
      description: "50+ successful deliveries",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden font-outfit ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bebas tracking-wider text-black dark:text-white">
                MAZIN KP
              </h1>
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-8">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    Contact
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-4 pt-20">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-black dark:text-white mb-6 tracking-wider leading-tight">
                  MUHAMMED
                  <br />
                  <span className="text-gray-600 dark:text-gray-400">
                    MAZIN KP
                  </span>
                </h1>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm font-medium rounded-full">
                    Video Editor
                  </span>
                  <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm font-medium rounded-full">
                    Python Developer
                  </span>
                  {/* <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm font-medium rounded-full">Creative Technologist</span> */}
                </div>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Passionate sports enthusiast and traveller with strong work
                  ethic and intelligence. Fluent in multiple languages with
                  excellent soft skills.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 group px-8 py-3"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection("projects")}
                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group px-8 py-3"
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    View Projects
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative max-w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl blur-2xl opacity-30 transform scale-95"></div>

                  <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] lg:w-[420px] lg:h-[32rem] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 mx-auto">
                    <img
                      src="/uploads/profile.jpeg"
                      alt="Mohammed Mazin KP"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="text-center mb-20"
            >
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-black dark:text-white mb-6 tracking-wider">
                ABOUT ME
              </h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A creative technologist bridging the gap between artistic vision
                and technical execution.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                viewport={{
                  once: true,
                }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-black dark:bg-white rounded-xl mr-4">
                        <Video className="h-6 w-6 text-white dark:text-black" />
                      </div>
                      <h3 className="font-bebas text-2xl text-black dark:text-white tracking-wider">
                        CREATIVE VISION
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Previously worked as an Intern at MuLearn Foundation,
                      where I collaborated with teams of editors, animators, and
                      videographers to create compelling content that told
                      stories and drove engagement.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        Color Grading
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        Motion Graphics
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        Sound Design
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                viewport={{
                  once: true,
                }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-black dark:bg-white rounded-xl mr-4">
                        <Code className="h-6 w-6 text-white dark:text-black" />
                      </div>
                      <h3 className="font-bebas text-2xl text-black dark:text-white tracking-wider">
                        TECHNICAL EXPERTISE
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Pursuing B.Tech in Information Technology at College of
                      Engineering, Thalassery. Winner of multiple NASA Space
                      Apps challenges, combining technical prowess with creative
                      problem-solving.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        AI/ML
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        Web Development
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        Mobile Apps
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Achievements Grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  variants={fadeInUp}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <achievement.icon className="h-8 w-8 text-black dark:text-white" />
                  </div>
                  <h4 className="font-bebas text-lg text-black dark:text-white tracking-wider mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="text-center mb-20"
            >
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-black dark:text-white mb-6 tracking-wider">
                SKILLS & EXPERTISE
              </h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A comprehensive toolkit for creating digital experiences that
                matter.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInUp}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-black dark:bg-white rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      <skill.icon className="h-6 w-6 text-white dark:text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white text-lg">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-4 bg-gray-50 dark:bg-gray-950"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="text-center mb-20"
            >
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-black dark:text-white mb-6 tracking-wider">
                PROJECT SHOWCASE
              </h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A curated selection of my most impactful projects across video
                editing, web development, and mobile applications
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2 group"
                >
                  {project.type === "video" ? (
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      <LazyVideo
                        src={project.videoSrc}
                        poster={project.thumbnailSrc}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                      {/*<div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>*/}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 text-white text-xs rounded-full backdrop-blur-sm ${
                            project.status === "Completed"
                              ? "bg-green-600/70"
                              : "bg-orange-600/70"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      {project.link && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                              href={project.link}
                              target="_blank"
                              className="bg-white/90 text-black hover:bg-white rounded-md px-3 py-2 flex items-center justify-center"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Project
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bebas text-xl text-black dark:text-white tracking-wider group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.type !== "video" && (
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          {project.type === "web" ? (
                            <Globe className="h-4 w-4" />
                          ) : (
                            <Code className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                      {project.type !== "video" && project.description}
                    </p>
                    {project.award && (
                      <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                        <Award className="h-3 w-3 mr-1" />
                        {project.award}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery images={galleryImages} />

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-4 bg-black dark:bg-gray-900 text-white relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/50 dark:from-gray-800/50 dark:to-gray-900/50"></div>
          <div className="container mx-auto relative">
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="text-center mb-20"
            >
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider">
                LET'S CREATE TOGETHER
              </h2>
              <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Ready to bring your vision to life? Let's collaborate on
                something extraordinary!
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="p-4 bg-white/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bebas text-xl mb-3 tracking-wider">
                  PHONE
                </h3>
                <p className="text-gray-300">+91 7306667874</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="p-4 bg-white/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bebas text-xl mb-3 tracking-wider">
                  EMAIL
                </h3>
                <p className="text-gray-300">mazinkp2005@gmail.com</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="p-4 bg-white/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bebas text-xl mb-3 tracking-wider">
                  LOCATION
                </h3>
                <p className="text-gray-300">Thalassery, Kerala</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="https://www.linkedin.com/in/mzinkp2005/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-400 p-3 hover:text-white hover:bg-gray-800 rounded-sm"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Muhammed Mazin KP. Crafted with ❤️
              and lots of ☕
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
