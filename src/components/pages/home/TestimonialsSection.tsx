import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, testimonials.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            // disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-[#0862ca] p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg hover:shadow-xl disabled:hover:scale-100">
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-[#0862ca] transition-colors" />
            </div>
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            // disabled={currentIndex + itemsPerPage >= testimonials.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-[#0862ca] p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg hover:shadow-xl disabled:hover:scale-100">
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-[#0862ca] transition-colors" />
            </div>
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${currentIndex + index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className="group"
                aria-label={`Go to page ${index + 1}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${Math.floor(currentIndex / itemsPerPage) === index
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
