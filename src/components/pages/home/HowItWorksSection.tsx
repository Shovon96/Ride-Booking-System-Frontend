import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            <span className="text-primary font-bold text-shadow-lg text-shadow-gray-400">HOW IT WORKS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Getting a ride is easier than ever. Just follow these simple steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksData?.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center group border border-primary px-6 py-8 rounded-lg hover:bg-background hover:text-foreground transition-colors duration-300 shadow-md shadow-primary/20"
            >
              <div className="relative mb-8">
                <div className=" text-white rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <div className="absolute -top-11 -right-7 p-3 bg-chart-3 text-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
