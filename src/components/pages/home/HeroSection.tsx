import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  role: string;
  handleDriverClick: () => void;
}

const carouselSlides = [
  {
    id: 1,
    image: '/choloride-hero-banner-image.png',
    title: 'Your Ride,',
    subtitle: 'Your Way',
    description: 'Experience premium transportation with verified drivers and real-time tracking.',
    gradient: 'from-[#0862ca]/40 via-[#0862ca]/30 to-[#d01622]/40',
  },
  {
    id: 2,
    image: '/login.webp',
    title: 'Journey Begins',
    subtitle: 'With Us',
    description: 'Join thousands of happy riders. Fast, reliable, and secure rides anytime.',
    gradient: 'from-[#d01622]/40 via-[#0862ca]/30 to-[#0862ca]/40',
  },
];

export const HeroSection = ({ role, handleDriverClick }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: `url('${carouselSlides[currentSlide].image}')`,
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${carouselSlides[currentSlide].gradient}`} />

          {/* Animated Shapes */}
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
              className="absolute -top-20 -right-20 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-full lg:w-3/5 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
              >
                <Sparkles className="h-4 w-4 text-[#d01622]" />
                <span className="text-sm font-medium text-white tracking-wide">Premium Ride Service</span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight">
                  <span className="block text-white drop-shadow-2xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {carouselSlides[currentSlide].title}
                  </span>
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#0862ca] via-[#d01622] to-[#0862ca] drop-shadow-lg mt-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {carouselSlides[currentSlide].subtitle}
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-2xl leading-relaxed font-light"
              >
                {carouselSlides[currentSlide].description}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={role ? '/user' : '/login'}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-linear-to-r from-[#0862ca] to-[#d01622] rounded-xl overflow-hidden shadow-2xl hover:shadow-[#d01622]/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {role ? role : 'Login Now'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d01622] to-[#0862ca] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {role === 'DRIVER' && (
                  <div
                    onClick={handleDriverClick}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl overflow-hidden shadow-xl hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>{role === 'DRIVER' ? 'Start Driving' : 'Drive & Earn'}</span>
                  </div>
                )}

                {!role && (
                  <Link
                    to={'/registration'}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl overflow-hidden shadow-xl hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Modern Style */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 group"
        aria-label="Previous slide"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-xl">
          <ChevronLeft className="h-6 w-6 text-white group-hover:text-gray-900 transition-colors" />
        </div>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 group"
        aria-label="Next slide"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-xl">
          <ChevronRight className="h-6 w-6 text-white group-hover:text-gray-900 transition-colors" />
        </div>
      </button>

      {/* Dots Indicator - Modern Style */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 shadow-xl">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-10 h-2 bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-full'
                  : 'w-2 h-2 bg-white/40 group-hover:bg-white/70 rounded-full'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
