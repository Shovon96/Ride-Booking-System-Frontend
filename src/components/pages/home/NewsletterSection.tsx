import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

export const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-2xl flex items-center justify-center shadow-2xl">
              <Mail className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Stay Updated With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-white to-[#d01622]">
                Latest News
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest updates, offers, and news delivered to your inbox.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative group">
              {/* Input Container */}
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent group-hover:border-[#0862ca]/30 transition-all duration-300">
                {/* Mail Icon */}
                <div className="pl-6">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>

                {/* Input */}
                <input
                  className="flex-1 px-4 py-5 text-gray-900 placeholder:text-gray-400 focus:outline-none text-base font-medium"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="m-2 px-8 py-3 bg-gradient-to-r from-[#0862ca] to-[#d01622] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
            </div>

            {/* Privacy Text */}
            <p className="text-sm text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">10K+</div>
              <div className="text-sm text-gray-400">Subscribers</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">Weekly</div>
              <div className="text-sm text-gray-400">Updates</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Free</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
