import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FiPackage,
  FiUserCheck,
  FiPieChart,
  FiRepeat,
  FiLock,
  FiSmartphone,
  FiZap,
  FiGlobe,
  FiShield,
  FiDatabase,
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiBell,
  FiSettings,
  FiArrowRight,
  FiCheck,
  FiLayers,
} from "react-icons/fi";

const Features = () => {
  const mainFeatures = [
    {
      icon: FiPackage,
      title: "Asset Inventory Management",
      description:
        "Maintain a complete inventory of all company assets. Track laptops, monitors, furniture, and more with detailed information and images.",
      details: [
        "Add unlimited assets with images and descriptions",
        "Categorize assets (Laptops, Monitors, Furniture, etc.)",
        "Mark assets as Returnable or Non-returnable",
        "Real-time quantity tracking",
        "Asset condition monitoring",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiUserCheck,
      title: "Employee Assignment",
      description:
        "Easily assign assets to employees and track who has what. Get instant visibility into asset allocation across your organization.",
      details: [
        "Direct asset assignment to employees",
        "Automatic affiliation on first request approval",
        "Multi-company employee support",
        "Complete assignment history",
        "Bulk assignment options",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiRepeat,
      title: "Request & Approval Workflow",
      description:
        "Streamlined request process for employees. HR managers can approve or reject requests with a single click.",
      details: [
        "Simple one-click request submission",
        "Request notes and justifications",
        "Quick approve/reject actions for HR",
        "Automatic inventory updates",
        "Email notifications on status changes",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FiPieChart,
      title: "Analytics & Reports",
      description:
        "Gain insights with detailed analytics. Track asset utilization, request trends, and generate comprehensive reports.",
      details: [
        "Returnable vs Non-returnable distribution charts",
        "Top requested assets reports",
        "Asset utilization metrics",
        "Employee asset assignment reports",
        "Export reports to PDF",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiLock,
      title: "Role-Based Access Control",
      description:
        "Secure access control with HR and Employee roles. Each user sees only what they need to see.",
      details: [
        "HR Manager full administrative access",
        "Employee self-service portal",
        "Protected routes and API endpoints",
        "JWT token-based authentication",
        "Firebase-backed security",
      ],
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: FiSmartphone,
      title: "Responsive Design",
      description:
        "Access AssetVerse from any device. Our responsive interface works seamlessly on desktop, tablet, and mobile.",
      details: [
        "Mobile-first approach",
        "Touch-friendly interfaces",
        "Adaptive layouts for all screen sizes",
        "Fast loading on mobile networks",
        "PWA-ready architecture",
      ],
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const additionalFeatures = [
    {
      icon: FiDatabase,
      title: "Cloud Storage",
      description: "All your asset data securely stored in the cloud with automatic backups.",
    },
    {
      icon: FiShield,
      title: "Data Security",
      description: "Enterprise-grade security with encrypted data transmission and storage.",
    },
    {
      icon: FiBell,
      title: "Notifications",
      description: "Real-time notifications for requests, approvals, and important updates.",
    },
    {
      icon: FiClock,
      title: "Activity History",
      description: "Complete audit trail of all asset movements and changes.",
    },
    {
      icon: FiUsers,
      title: "Team Management",
      description: "View team members and their assets, with birthday reminders.",
    },
    {
      icon: FiTrendingUp,
      title: "Scalable Plans",
      description: "Start free and scale as you grow with flexible pricing plans.",
    },
    {
      icon: FiSettings,
      title: "Easy Configuration",
      description: "Simple setup with intuitive dashboards for HR managers.",
    },
    {
      icon: FiLayers,
      title: "Multi-Company Support",
      description: "Employees can work with multiple companies simultaneously.",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <FiZap className="h-4 w-4" />
              Powerful Features
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="text-primary">Manage Assets</span> Efficiently
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
              AssetVerse comes packed with enterprise-grade features designed to make 
              asset management effortless for companies of all sizes. From small startups 
              to large corporations, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-as-hr" className="btn btn-primary btn-lg gap-2">
                Get Started Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn btn-outline btn-lg">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 lg:py-28 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Core Features Built for <span className="text-primary">Modern Teams</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Our comprehensive feature set ensures you have all the tools needed 
              for complete asset management control.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
              >
                {/* Image/Icon Side */}
                <div className="flex-1 w-full">
                  <div className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${feature.color} aspect-square md:aspect-video flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                    <feature.icon className="h-24 w-24 md:h-32 md:w-32 text-white relative z-10" />
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rounded-lg rotate-12"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-base-content/70 text-lg mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                          <FiCheck className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-base-content/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 lg:py-28 bg-base-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              And <span className="text-primary">Much More</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Discover additional features that make AssetVerse the complete solution 
              for corporate asset management.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card bg-base-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-base-content/70 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience All These Features?
            </h2>
            <p className="text-primary-content/80 text-lg mb-10">
              Join hundreds of companies already using AssetVerse to manage their corporate assets. 
              Start with our free Basic plan - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-as-hr" className="btn bg-white text-primary hover:bg-white/90 btn-lg gap-2">
                Start Free Trial
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
