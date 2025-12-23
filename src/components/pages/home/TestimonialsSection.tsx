import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
              Customers Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 group"
            aria-label="Previous testimonial"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-[#0862ca] p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg hover:shadow-xl">
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-[#0862ca] transition-colors" />
            </div>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 group"
            aria-label="Next testimonial"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-[#0862ca] p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg hover:shadow-xl">
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-[#0862ca] transition-colors" />
            </div>
          </button>

          {/* Testimonial Card */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-2xl flex items-center justify-center shadow-lg">
                      <Quote className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6 mt-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xl lg:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                    "{testimonials[currentIndex].comment}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0862ca] to-[#d01622] opacity-20" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl text-gray-900">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-10 h-3 bg-gradient-to-r from-[#0862ca] to-[#d01622]'
                      : 'w-3 h-3 bg-gray-300 group-hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
