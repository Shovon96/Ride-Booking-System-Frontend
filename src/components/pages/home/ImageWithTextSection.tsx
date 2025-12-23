import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import homePageImage from '/login.webp';

interface ImageWithTextSectionProps {
  role: string;
  handleDriverClick: () => void;
}

export const ImageWithTextSection = ({ role, handleDriverClick }: ImageWithTextSectionProps) => {
  const benefits = [
    'Fast, Safe & Easy Income for a better lifestyle',
    'Scope to avail bonus offers',
    'Hassle free on-time Payment',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={homePageImage}
                  alt="Bike Rider"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Active Drivers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
                Join Our Community
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {role ? (
                <>
                  You Can Start The{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Journey From Here!
                  </span>
                </>
              ) : (
                <>
                  Ready To Start Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Journey?
                  </span>
                </>
              )}
            </h2>

            {/* Benefits List */}
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700 leading-relaxed">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to={role ? '/user' : '/registration'}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Users className="h-5 w-5" />
                <span>{role ? role : 'Register Now'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#d01622] to-[#0862ca] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <div
                onClick={handleDriverClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-[#0862ca] transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <TrendingUp className="h-5 w-5 text-[#0862ca]" />
                <span>Drive & Earn</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
