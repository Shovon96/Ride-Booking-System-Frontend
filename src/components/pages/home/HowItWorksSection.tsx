import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksItem {
  step: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  howItWorksData: HowItWorksItem[];
}

export const HowItWorksSection = ({ howItWorksData }: HowItWorksSectionProps) => {
  return (
    <section className="py-16 mt-40 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0862ca]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Getting a ride is easier than ever. Just follow these simple steps.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0862ca]/20 via-[#d01622]/20 to-[#0862ca]/20" style={{ top: '6rem' }} />

          {howItWorksData?.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Card */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0862ca]/30 h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-black text-lg">{item.step}</span>
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-full animate-ping opacity-20" />
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-8 mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0862ca]/10 to-[#d01622]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="text-[#0862ca] group-hover:text-[#d01622] transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#0862ca] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-5 w-5 text-[#d01622] animate-pulse" />
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0862ca]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Arrow Between Steps - Hidden on mobile */}
              {index < howItWorksData.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-6 z-10">
                  <ArrowRight className="h-6 w-6 text-[#0862ca]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
