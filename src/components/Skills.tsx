import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Technology {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  technologies: Technology[];
}

interface SkillsProps {
  data: SkillCategory[] | null;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (!data || !Array.isArray(data)) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };



  const getCategoryIcon = (category: string): string => {
    const catLower = category.toLowerCase();
    if (catLower.includes('backend')) return '🏗️';
    if (catLower.includes('cloud') || catLower.includes('devops')) return '☁️';
    if (catLower.includes('ai') || catLower.includes('machine')) return '🤖';
    if (catLower.includes('database')) return '🗄️';
    if (catLower.includes('programming')) return '💻';
    if (catLower.includes('test')) return '🧪';
    if (catLower.includes('tools')) return '🔧';
    return '📚';
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
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
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-slate-300">My </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto">
              A comprehensive toolkit of technologies and frameworks I use to build robust, scalable solutions
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Category header */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-4xl">{getCategoryIcon(skillCategory.category)}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    {skillCategory.category}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-4">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      variants={skillVariants}
                      className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-700/40 transition-colors duration-200"
                      whileHover={{ x: 8 }}
                    >
                      <motion.img
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                        whileHover={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-lg lg:text-xl font-medium text-slate-300 group-hover:text-white transition-colors duration-200">
                        {tech.name}
                      </span>
                      
                      {/* Skill level indicator */}
                      <div className="ml-auto">
                        <motion.div
                          className="w-16 h-1 bg-slate-600 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isInView ? 1 : 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: isInView ? `${Math.random() * 30 + 70}%` : 0 
                            }}
                            transition={{ 
                              duration: 1, 
                              delay: (categoryIndex * 0.1) + (techIndex * 0.05) + 0.5,
                              ease: "easeOut" 
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category stats */}
                <motion.div
                  className="mt-6 pt-6 border-t border-slate-700/50 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: categoryIndex * 0.2 + 1 }}
                >
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {skillCategory.technologies.length}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">
                    Technologies
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.p
              className="text-lg text-slate-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 1.5 }}
            >
              Always learning and exploring new technologies to stay at the forefront of innovation
            </motion.p>
            <motion.div
              className="inline-flex items-center space-x-2 text-blue-400"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>View my projects to see these skills in action</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
