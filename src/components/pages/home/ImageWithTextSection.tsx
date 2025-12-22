import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router';
import homePageImage from '/login.webp';

interface ImageWithTextSectionProps {
  role: string;
  handleDriverClick: () => void;
}

export const ImageWithTextSection = ({ role, handleDriverClick }: ImageWithTextSectionProps) => {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
          <img
            src={homePageImage}
            alt="Bike Rider"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>

        {/* Right Text Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-4xl mb-6 uppercase text-primary font-bold text-shadow-lg text-shadow-gray-400"
          >
            {role ? "You can start the journey from here!" : "Ready to Start Your Journey?"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ul className='text-lg mb-8 text-foreground leading-10'>
              <li>✔ Fast, Safe & Easy Income for a better lifestyle</li>
              <li>✔ Scope to avail bonus offers</li>
              <li>✔ Hassle free on-time Payment</li>
            </ul>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to={role ? "/user" : "/registration"}
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-lg hover:bg-red-500 transition-colors duration-200 flex items-center justify-center"
            >
              <Users className="mr-2" />
              {role ? role : "Register"}
            </Link>
            <div
              onClick={handleDriverClick}
              className="border-2 border-foreground text-foreground px-6 py-2 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <TrendingUp className="mr-2" />
              Drive & Earn
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
