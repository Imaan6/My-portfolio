import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Contact {
  email?: string;
  phone?: string;
  website?: string;
}

interface AboutMeData {
  name: string;
  title: string;
  contact: Contact;
  bio: string;
  links?: Array<{
    name: string;
    url: string;
  }>;
}

interface HeroProps {
  data: AboutMeData | null;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data) return null;

  const { name, title, contact, bio } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigationItems: string[] = ['about', 'skills', 'experience', 'projects', 'contact'];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-purple-950/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              {name?.split(' ')[0]}
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-slate-300 hover:text-white capitalize transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold mb-6">
            <span className="block text-slate-200">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-slate-300 font-medium">
            {title}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-14">
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            {bio}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-full text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="border-3 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-12 py-5 rounded-full text-lg lg:text-xl font-bold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Contact info */}
        {contact && (
          <motion.div variants={itemVariants} className="mt-16 flex justify-center items-center gap-8 text-slate-400">
            {contact.email && (
              <motion.a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors duration-200 p-3 rounded-full hover:bg-slate-800/50"
                whileHover={{ scale: 1.2 }}
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </motion.a>
            )}
            {contact.website && (
              <motion.a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 p-3 rounded-full hover:bg-slate-800/50"
                whileHover={{ scale: 1.2 }}
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-slate-500 rounded-full p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div className="w-1 h-3 bg-slate-500 rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
