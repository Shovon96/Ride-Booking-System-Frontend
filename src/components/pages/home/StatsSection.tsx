import { motion } from 'framer-motion';
import CountUp from "react-countup";
import { TrendingUp, Users, MapPin, Star } from 'lucide-react';

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const getIcon = (index: number) => {
  const icons = [
    <Users className="h-8 w-8" />,
    <TrendingUp className="h-8 w-8" />,
    <MapPin className="h-8 w-8" />,
    <Star className="h-8 w-8" />
  ];
  return icons[index] || icons[0];
};

const getGradient = (index: number) => {
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-yellow-500 to-yellow-600'
  ];
  return gradients[index] || gradients[0];
};

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 text-center group hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${getGradient(index)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(index)}
                </div>
              </div>

              {/* Number */}
              <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={2.5}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />
              </div>

              {/* Label */}
              <div className="text-sm lg:text-base font-semibold text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Decorative Line */}
              <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
