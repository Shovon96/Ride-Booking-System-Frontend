import Logo from '@/assets/Logo';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/wrong-contact-information' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Your reliable ride-sharing partner. Safe, fast, and affordable transportation at your fingertips.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-[#0862ca] hover:to-[#d01622] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/5 group-hover:bg-[#0862ca]/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-[#0862ca]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Phone</div>
                  <span className="text-gray-300">+1256547457</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/5 group-hover:bg-[#d01622]/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-[#d01622]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <span className="text-gray-300">choloride@example.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/5 group-hover:bg-[#0862ca]/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-[#0862ca]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Address</div>
                  <span className="text-gray-300">102 Ruposhi Hall, Mirpur</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} CHOLORIDE. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
