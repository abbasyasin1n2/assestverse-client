import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FiUserPlus,
  FiPackage,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FiUserPlus,
      title: "Register Your Company",
      description:
        "HR managers sign up and create their company profile. Get started with our free Basic plan - no credit card required.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      icon: FiPackage,
      title: "Add Your Assets",
      description:
        "Upload your company assets to the inventory. Add details like name, type, quantity, and images for easy identification.",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      icon: FiCheckCircle,
      title: "Manage & Track",
      description:
        "Employees request assets, HR approves, and everything is tracked automatically. Real-time visibility for everyone.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-base-100 overflow-hidden">
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
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Get Started in{" "}
            <span className="text-primary">Three Simple Steps</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            AssetVerse makes asset management simple. Here's how you can get
            started in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 -translate-y-1/2 opacity-20"></div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-base-100 rounded-2xl p-8 border border-base-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-30`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (between cards on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-base-100 border border-base-200 flex items-center justify-center shadow-md">
                      <FiArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-base-content/70 mb-6">
            Ready to streamline your asset management?
          </p>
          <Link to="/join-as-hr" className="btn btn-primary btn-lg gap-2">
            Get Started Now
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
