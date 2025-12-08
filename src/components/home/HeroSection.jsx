import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiUsers,
  FiPackage,
  FiShield,
} from "react-icons/fi";
import TrustedBrands from "../shared/TrustedBrands";

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const stats = [
    { value: "500+", label: "Companies", icon: FiUsers },
    { value: "50K+", label: "Assets Tracked", icon: FiPackage },
    { value: "99.9%", label: "Uptime", icon: FiShield },
  ];

  const features = [
    "Real-time asset tracking",
    "Employee management",
    "Request workflow automation",
    "Detailed analytics & reports",
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5"></div>
      
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                #1 Asset Management Platform in Bangladesh
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Streamline Your{" "}
              <span className="text-primary">Corporate Assets</span>{" "}
              Management
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-base-content/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Track, manage, and optimize your company's physical assets with ease. 
              From laptops to furniture — keep everything organized and accountable.
            </motion.p>

            {/* Feature List */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FiCheckCircle className="h-4 w-4 text-success shrink-0" />
                  <span className="text-base-content/80">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/join-as-hr"
                className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25"
              >
                Get Started Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <button className="btn btn-outline btn-lg gap-2">
                <FiPlay className="h-5 w-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-base-300"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-primary">
                    <stat.icon className="h-5 w-5" />
                    {stat.value}
                  </div>
                  <p className="text-sm text-base-content/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative z-10"
            >
              <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-200 overflow-hidden">
                {/* Mock Dashboard Header */}
                <div className="bg-primary px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                  </div>
                  <div className="flex-1 text-center text-primary-content font-medium">
                    AssetVerse Dashboard
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="p-6 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Total Assets", value: "1,234", color: "bg-primary/10 text-primary" },
                      { label: "Assigned", value: "892", color: "bg-success/10 text-success" },
                      { label: "Pending", value: "45", color: "bg-warning/10 text-warning" },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl ${item.color}`}>
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-xs opacity-80">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-base-200/50 rounded-xl p-4">
                    <div className="flex items-end justify-between h-24 gap-2">
                      {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-primary/60 rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-base-content/50">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Mock Asset List */}
                  <div className="space-y-2">
                    {[
                      { name: "MacBook Pro 14\"", status: "Assigned", statusColor: "badge-success" },
                      { name: "Dell Monitor 27\"", status: "Available", statusColor: "badge-info" },
                      { name: "Herman Miller Chair", status: "Pending", statusColor: "badge-warning" },
                    ].map((asset, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
                        className="flex items-center justify-between p-3 bg-base-200/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center">
                            <FiPackage className="h-5 w-5 text-base-content/50" />
                          </div>
                          <span className="font-medium text-sm">{asset.name}</span>
                        </div>
                        <span className={`badge ${asset.statusColor} badge-sm`}>
                          {asset.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -top-4 -right-4 bg-success text-success-content px-4 py-2 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Request Approved!</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="absolute -bottom-4 -left-4 bg-base-100 px-4 py-3 rounded-lg shadow-lg border border-base-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiUsers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Employee Added</p>
                  <p className="text-xs text-base-content/50">Just now</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trusted Brands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <TrustedBrands variant="homepage" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
