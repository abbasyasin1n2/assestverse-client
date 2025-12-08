import { motion } from "motion/react";
import {
  FiPackage,
  FiUserCheck,
  FiPieChart,
  FiRepeat,
  FiLock,
  FiSmartphone,
  FiZap,
  FiGlobe,
} from "react-icons/fi";

const FeaturesSection = () => {
  const features = [
    {
      icon: FiPackage,
      title: "Asset Inventory Management",
      description:
        "Maintain a complete inventory of all company assets. Track laptops, monitors, furniture, and more with detailed information and images.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiUserCheck,
      title: "Employee Assignment",
      description:
        "Easily assign assets to employees and track who has what. Get instant visibility into asset allocation across your organization.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiRepeat,
      title: "Request & Approval Workflow",
      description:
        "Streamlined request process for employees. HR managers can approve or reject requests with a single click.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FiPieChart,
      title: "Analytics & Reports",
      description:
        "Gain insights with detailed analytics. Track asset utilization, request trends, and generate comprehensive reports.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiLock,
      title: "Role-Based Access",
      description:
        "Secure access control with HR and Employee roles. Each user sees only what they need to see.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: FiSmartphone,
      title: "Responsive Design",
      description:
        "Access AssetVerse from any device. Our responsive interface works seamlessly on desktop, tablet, and mobile.",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-base-200/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Everything You Need to{" "}
            <span className="text-primary">Manage Assets</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            AssetVerse comes packed with features designed to make asset management
            effortless for companies of all sizes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-base-100 border border-base-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-base-200/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-base-100 border border-base-200 shadow-lg">
            <div className="flex items-center gap-2">
              <FiZap className="h-6 w-6 text-warning" />
              <span className="font-medium">Ready to get started?</span>
            </div>
            <div className="h-8 w-px bg-base-300"></div>
            <div className="flex items-center gap-2 text-base-content/70">
              <FiGlobe className="h-5 w-5" />
              <span>Free for up to 5 employees</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
