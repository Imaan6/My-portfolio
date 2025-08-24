import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Technology {
  name: string;
  icon: string;
}

interface ProjectItem {
  name: string;
  associated_with?: string;
  duration: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  technologies?: Technology[];
  links?: string | string[];
}

interface ProjectsProps {
  data: ProjectItem[] | null;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  if (!data || !Array.isArray(data)) return null;

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    rest: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      rotateX: 5,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const getProjectIcon = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('hotel') || nameLower.includes('ai')) return '🏨';
    if (nameLower.includes('tourba') || nameLower.includes('performance')) return '🚀';
    if (nameLower.includes('accident') || nameLower.includes('management')) return '⚕️';
    return '💼';
  };

  const getStatusColor = (duration: string): string => {
    if (duration.includes('Present')) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getStatusText = (duration: string): string => {
    if (duration.includes('Present')) return 'Active';
    return 'Completed';
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-300">Featured </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto">
              Showcasing innovative solutions that demonstrate my expertise in backend development, AI/ML, and cloud technologies
            </p>
          </motion.div>

          {/* Projects - Compact cards layout */}
          <div className="space-y-4">
            {data.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Enhanced vertical project card */}
                  <div className="p-6 sm:p-8">
                    <div className="space-y-8">
                      
                      {/* Project title header - Full width at top */}
                      <motion.div
                        className="bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300 group/header relative overflow-hidden"
                        whileHover={{ scale: 1.01, y: -2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 opacity-0 group-hover/header:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start gap-6">
                            <motion.div
                              className="text-4xl sm:text-5xl flex-shrink-0 drop-shadow-lg"
                              animate={hoveredProject === index ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.8, repeat: hoveredProject === index ? Infinity : 0 }}
                            >
                              {getProjectIcon(project.name)}
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover/header:text-transparent group-hover/header:bg-gradient-to-r group-hover/header:from-blue-400 group-hover/header:to-purple-400 group-hover/header:bg-clip-text transition-all duration-300 leading-tight">
                                  {project.name}
                                </h3>
                                <motion.div
                                  className={`px-6 py-3 rounded-2xl text-sm font-bold ${getStatusColor(project.duration)} text-white shadow-xl border-2 border-white/20`}
                                  whileHover={{ scale: 1.05, rotate: 2 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  {getStatusText(project.duration)}
                                </motion.div>
                              </div>
                              
                              <div className="space-y-2">
                                {project.associated_with && (
                                  <p className="text-lg text-slate-300 font-medium">
                                    @ {project.associated_with}
                                  </p>
                                )}
                                <p className="text-base text-slate-400 font-medium">
                                  {project.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Challenge/Solution/Outcome sections */}
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Challenge */}
                        {project.challenge && (
                          <motion.div
                            className="bg-gradient-to-br from-red-500/15 to-red-600/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30 hover:border-red-400/50 transition-all duration-300 group/section relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                          >
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                              <h4 className="text-base font-bold text-red-300 uppercase tracking-wider flex items-center mb-6">
                                <motion.span 
                                  className="mr-3 text-2xl"
                                  whileHover={{ scale: 1.3, rotate: 15 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  🎯
                                </motion.span>
                                Challenge
                              </h4>
                              <p className="text-lg lg:text-xl text-slate-200 leading-relaxed font-medium group-hover/section:text-white transition-colors duration-300">
                                {project.challenge}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                          <motion.div
                            className="bg-gradient-to-br from-blue-500/15 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group/section relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                          >
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                              <h4 className="text-base font-bold text-blue-300 uppercase tracking-wider flex items-center mb-6">
                                <motion.span 
                                  className="mr-3 text-2xl"
                                  whileHover={{ scale: 1.3, rotate: 15 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  💡
                                </motion.span>
                                Solution
                              </h4>
                              <p className="text-lg lg:text-xl text-slate-200 leading-relaxed font-medium group-hover/section:text-white transition-colors duration-300">
                                {project.solution}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Outcome */}
                        {project.outcome && (
                          <motion.div
                            className="bg-gradient-to-br from-green-500/15 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-500/30 hover:border-green-400/50 transition-all duration-300 group/section relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                          >
                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                              <h4 className="text-base font-bold text-green-300 uppercase tracking-wider flex items-center mb-6">
                                <motion.span 
                                  className="mr-3 text-2xl"
                                  whileHover={{ scale: 1.3, rotate: 15 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  🎉
                                </motion.span>
                                Outcome
                              </h4>
                              <p className="text-lg lg:text-xl text-slate-200 leading-relaxed font-medium group-hover/section:text-white transition-colors duration-300">
                                {project.outcome}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Technologies and Link - At the bottom */}
                      <motion.div 
                        className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          {/* Technologies */}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex-1">
                              <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="mr-2">🛠️</span>
                                Technology Stack
                              </h5>
                              <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, techIndex) => (
                                  <motion.div
                                    key={techIndex}
                                    className="flex items-center space-x-2 bg-purple-500/15 text-purple-200 px-4 py-2 rounded-xl text-sm font-medium border border-purple-500/30 hover:bg-purple-500/25 hover:border-purple-400/40 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + techIndex * 0.03 }}
                                  >
                                    <img
                                      src={tech.icon}
                                      alt={`${tech.name} icon`}
                                      className="w-4 h-4"
                                    />
                                    <span>{tech.name}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Project link */}
                          {project.links && (
                            <motion.a
                              href={typeof project.links === 'string' ? project.links : project.links[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 group/link shadow-lg hover:shadow-2xl flex-shrink-0"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>View Project</span>
                              <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={hoveredProject === index ? { x: [0, 4, 0], rotate: [0, 10, 0] } : {}}
                                transition={{ duration: 0.6, repeat: Infinity }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </motion.svg>
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Subtle hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-purple-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.div
              className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm px-8 py-4 rounded-full border border-slate-700/50"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-slate-300 font-medium">
                  More projects in development
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
