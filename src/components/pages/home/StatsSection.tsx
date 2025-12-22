import { motion } from 'framer-motion';
import CountUp from "react-countup";

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-chart-4 mb-2">
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={3.5}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce={false}
                />
              </div>
              <div className="text-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
