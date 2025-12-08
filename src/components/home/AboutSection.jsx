import { motion } from "motion/react";
import {
  FiShield,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router";

const AboutSection = () => {
  const benefits = [
    {
      icon: FiShield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee. Your data is encrypted and protected at all times.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: FiTrendingUp,
      title: "Boost Productivity",
      description:
        "Reduce asset management time by 70%. Automated workflows mean less paperwork and more efficiency.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: FiClock,
      title: "Real-Time Tracking",
      description:
        "Know exactly where every asset is at any moment. Instant updates when assets are assigned or returned.",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: FiUsers,
      title: "Team Collaboration",
      description:
        "Seamlessly manage employees across departments. Easy request and approval workflows for everyone.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const stats = [
    { value: "৳50L+", label: "Assets Managed" },
    { value: "500+", label: "Companies Trust Us" },
    { value: "15K+", label: "Active Users" },
    { value: "99.9%", label: "Customer Satisfaction" },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-base-100">
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
            Why Choose AssetVerse
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            The Smarter Way to Manage{" "}
            <span className="text-primary">Corporate Assets</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            AssetVerse provides a comprehensive solution for businesses in Bangladesh
            to track, manage, and optimize their physical assets. Say goodbye to
            spreadsheets and hello to efficiency.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className={`h-7 w-7 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-base-content/70 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content with Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8 lg:p-12">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>

              {/* Content Cards */}
              <div className="relative space-y-4">
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-base-100 rounded-xl p-4 shadow-lg flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <FiCheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">Asset Assigned</p>
                    <p className="text-sm text-base-content/60">MacBook Pro to John Doe</p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-base-100 rounded-xl p-4 shadow-lg flex items-center gap-4 ml-8"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <FiUsers className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Team Expanded</p>
                    <p className="text-sm text-base-content/60">5 new employees added</p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-base-100 rounded-xl p-4 shadow-lg flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                    <FiTrendingUp className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <p className="font-semibold">Inventory Updated</p>
                    <p className="text-sm text-base-content/60">50 new monitors added</p>
                  </div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-primary text-primary-content rounded-xl p-4 mt-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-xs opacity-80">Total Assets</p>
                    </div>
                    <div className="h-10 w-px bg-primary-content/20"></div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">892</p>
                      <p className="text-xs opacity-80">Assigned</p>
                    </div>
                    <div className="h-10 w-px bg-primary-content/20"></div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">342</p>
                      <p className="text-xs opacity-80">Available</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About AssetVerse
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Built for Growing Businesses in Bangladesh
            </h2>
            <p className="text-base-content/70 text-lg mb-6">
              AssetVerse was created to solve a common problem faced by companies
              across Bangladesh — keeping track of valuable company assets like
              laptops, monitors, furniture, and equipment.
            </p>
            <p className="text-base-content/70 mb-8">
              Our platform makes it easy for HR managers to maintain a complete
              inventory, assign assets to employees, and track everything in
              real-time. Employees can request what they need with just a few
              clicks, making the entire process seamless and efficient.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-8">
              {[
                "Complete asset lifecycle management",
                "Employee self-service portal",
                "Automated approval workflows",
                "Detailed reports and analytics",
                "Multi-company support for employees",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <FiCheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-base-content/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/join-as-hr" className="btn btn-primary gap-2">
              Start Managing Assets
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-primary-content"
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-content/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
