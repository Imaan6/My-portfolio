import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Technology {
  name: string;
  icon: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  keyAchievements?: string[];
  technologies?: Technology[];
}

interface ExperienceProps {
  data: ExperienceItem[] | null;
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (!data || !Array.isArray(data)) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        stiffness: 120 
      },
    },
  };

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...data].sort((a, b) => {
    const getStartYear = (duration: string): number => {
      const parts = duration.split(' - ')[0];
      const year = parts.split(' ')[1] || parts.split(' ')[0];
      return parseInt(year) || 0;
    };
    return getStartYear(b.duration) - getStartYear(a.duration);
  });

  // Helper functions for company-specific styling
  const getCompanyIcon = (company: string): string => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('freelancer')) return '💼';
    if (companyLower.includes('zerofiltre')) return '🌐';
    if (companyLower.includes('om1')) return '🏢';
    if (companyLower.includes('prestigia')) return '🏨';
    if (companyLower.includes('innovx')) return '🚀';
    if (companyLower.includes('upwork')) return '💼';
    return '🏭';
  };

  const getCompanyColor = (company: string): string => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('freelancer')) return 'from-green-500 to-emerald-600';
    if (companyLower.includes('zerofiltre')) return 'from-blue-500 to-cyan-600';
    if (companyLower.includes('om1')) return 'from-purple-500 to-violet-600';
    if (companyLower.includes('prestigia')) return 'from-blue-500 to-purple-600';
    if (companyLower.includes('innovx')) return 'from-green-500 to-blue-600';
    if (companyLower.includes('upwork')) return 'from-green-400 to-teal-600';
    return 'from-slate-500 to-slate-600';
  };

  const getCompanyAccent = (company: string): string => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('freelancer')) return 'green-500';
    if (companyLower.includes('zerofiltre')) return 'blue-500';
    if (companyLower.includes('om1')) return 'purple-500';
    if (companyLower.includes('prestigia')) return 'blue-500';
    if (companyLower.includes('innovx')) return 'green-500';
    if (companyLower.includes('upwork')) return 'green-500';
    return 'slate-500';
  };

  return (
    <section id="experience" className="py-16 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-slate-300">My </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Professional journey building scalable solutions and leading technical initiatives
            </p>
          </motion.div>

          {/* Experience cards */}
          <div className="space-y-6">
            {sortedExperiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 overflow-hidden hover:shadow-2xl">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${getCompanyColor(experience.company)} p-6`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span>{getCompanyIcon(experience.company)}</span>
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 truncate">
                            {experience.role}
                          </h3>
                          <p className="text-white/90 text-lg font-medium">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center flex-wrap gap-3">
                        <span className="text-white/80 text-sm font-medium bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {experience.duration}
                        </span>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${experience.duration.includes('Present') 
                          ? 'bg-green-400/20 text-green-100 border border-green-400/30' 
                          : 'bg-white/10 text-white/80 border border-white/20'
                        }`}>
                          {experience.duration.includes('Present') ? '🟢 Current' : '✅ Completed'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Key achievements */}
                    {experience.keyAchievements && experience.keyAchievements.length > 0 && (
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                          <motion.span 
                            className="mr-3 text-2xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            🏆
                          </motion.span>
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {experience.keyAchievements.map((achievement, achIndex) => (
                            <motion.div
                              key={achIndex}
                              className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-all duration-200"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: achIndex * 0.1 }}
                            >
                              <span className={`text-${getCompanyAccent(experience.company)} mt-1 flex-shrink-0 w-6 h-6 bg-${getCompanyAccent(experience.company)}/20 rounded-full flex items-center justify-center text-sm font-bold`}>
                                ✓
                              </span>
                              <span className="text-slate-200 text-sm sm:text-base leading-relaxed">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies && experience.technologies.length > 0 && (
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                          <span className="mr-3 text-xl">🛠️</span>
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={techIndex}
                              className="flex items-center space-x-2 bg-slate-700/30 text-slate-200 px-3 py-2 rounded-lg text-sm border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 group/tech"
                              whileHover={{ scale: 1.05, y: -2 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.03 }}
                            >
                              <motion.img
                                src={tech.icon}
                                alt={`${tech.name} icon`}
                                className="w-4 h-4 group-hover/tech:scale-110 transition-transform duration-200"
                                whileHover={{ rotate: [0, 5, -5, 0] }}
                              />
                              <span className="font-medium">{tech.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm px-6 py-4 rounded-full border border-slate-700/50">
              <div className="flex -space-x-2">
                {['🚀', '💼', '🏗️', '☁️'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg border-2 border-slate-950"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "linear",
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <span className="text-slate-300 font-medium">
                3+ Years of Professional Excellence
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;