import LoginImage from "@/assets/login-rider-image.png";
import { LoginForm } from "./LoginForm";
import Logo from "@/assets/Logo";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl" />
      </div>

      {/* Left Side - Form */}
      <div className="flex flex-col gap-6 p-4 md:p-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 md:justify-start"
        >
          <div className="flex items-center gap-2 font-medium">
            <Logo />
          </div>
        </motion.div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <LoginForm />
          </motion.div>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-6 border border-gray-200 w-full max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-full animate-pulse" />
            <h3 className="font-bold text-gray-900">Demo Credentials</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-700">Admin:</span>
              <span className="text-[#0862ca] font-mono">shovon@admin.com</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-700">Driver:</span>
              <span className="text-green-600 font-mono">shovon@driver.com</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
              <span className="font-medium text-gray-700">Rider:</span>
              <span className="text-purple-600 font-mono">shovon@rider.com</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mt-4">
              <span className="font-medium text-gray-700">All Password:</span>
              <span className="text-gray-900 font-mono">Shovon@22</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden bg-muted lg:block"
      >
        <img
          src={LoginImage}
          alt="Login"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0862ca]/20 via-transparent to-[#d01622]/20" />
      </motion.div>
    </div>
  );
}
