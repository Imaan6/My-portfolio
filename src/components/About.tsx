import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Contact {
  email?: string;
  phone?: string;
  website?: string;
}

interface Link {
  name: string;
  url: string;
}

interface AboutMeData {
  name: string;
  title: string;
  contact: Contact;
  bio: string;
  links?: Link[];
}

interface AboutProps {
  data: AboutMeData | null;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!data) return null;

  const { name, bio, links } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };



  const motivations: string[] = [
    "🚀 Building scalable, high-performance backend systems",
    "🤖 Exploring AI/ML applications in real-world problems",
    "☁️ Architecting cloud-native solutions with AWS",
    "📈 Optimizing system performance and reliability",
    "🌟 Contributing to innovative, forward-thinking teams"
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center"
        >
          {/* Left side - Text content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8">
                <span className="text-slate-300">About </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                {bio}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mb-4 sm:mb-6">
                What drives me:
              </h3>
              <div className="space-y-5">
                {motivations.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4 text-slate-400 hover:text-slate-200 transition-colors duration-200 p-3 rounded-lg hover:bg-slate-800/30"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">{item.split(' ')[0]}</span>
                    <span className="text-lg lg:text-xl font-medium">{item.substring(2)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {links && links.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 border border-slate-700 hover:border-slate-600"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right side - Stats and visual elements */}
          <div className="space-y-6 sm:space-y-8">
            {/* Profile card */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
            >
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white">
                  {name?.split(' ').map(n => n[0]).join('') || 'IE'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{name}</h3>
                  <p className="text-slate-400 mt-1">Available for opportunities</p>
                </div>
              </div>
            </motion.div>



            {/* Technologies preview */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              <h4 className="text-2xl lg:text-3xl font-bold text-white mb-6">Core Technologies</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Go", icon: "https://cdn.simpleicons.org/go/00ADD8" },
                  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
                  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
                  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098" },
                  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 bg-blue-500/20 text-blue-300 px-5 py-3 rounded-2xl text-base lg:text-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={tech.icon}
                      alt={`${tech.name} icon`}
                      className="w-6 h-6"
                    />
                    <span className="font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
