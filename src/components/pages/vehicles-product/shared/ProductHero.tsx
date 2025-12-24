import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ProductHeroProps {
  category: 'CAR' | 'BIKE';
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const ProductHero = ({ category, title, subtitle, backgroundImage }: ProductHeroProps) => {
  const gradientColors = category === 'CAR' 
    ? 'from-[#0862ca]/20 via-[#0862ca]/30 to-[#d01622]/20'
    : 'from-[#d01622]/20 via-[#d01622]/10 to-[#0862ca]/60';

  return (
    <section className="relative h-[40vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors}`} />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white tracking-wide">{category === 'CAR' ? 'Car' : 'Bike'} Parts Store</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-2xl">
            {title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-gray-200 to-[#d01622]">
              {subtitle}
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
            Quality {category === 'CAR' ? 'automotive' : 'motorcycle'} parts and accessories for your vehicle
          </p>
        </motion.div>
      </div>
    </section>
  );
};
