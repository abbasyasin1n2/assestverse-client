import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FiUserPlus,
  FiPackage,
  FiCheckCircle,
  FiArrowRight,
  FiArrowDown,
  FiUsers,
  FiClipboard,
  FiSettings,
  FiBox,
  FiShield,
  FiZap,
  FiMonitor,
  FiSmartphone,
  FiDatabase,
  FiPieChart,
  FiCheck,
  FiStar,
  FiLock,
  FiBriefcase,
} from "react-icons/fi";

const HowItWorks = () => {
  const mainSteps = [
    {
      number: "01",
      icon: FiUserPlus,
      title: "Register Your Company",
      description:
        "HR managers sign up and create their company profile with just a few clicks. You'll get started with our free Basic plan that includes 5 employee slots - no credit card required.",
      details: [
        "Create your company profile with logo",
        "Get 5 free employee slots instantly",
        "Set up your HR manager dashboard",
        "Start adding assets immediately",
      ],
      color: "from-blue-500 to-cyan-500",
      visualIcons: [FiBriefcase, FiUserPlus, FiShield],
    },
    {
      number: "02",
      icon: FiPackage,
      title: "Add Your Assets",
      description:
        "Upload your company assets to the inventory. Add comprehensive details like name, type, quantity, and images for easy identification and tracking.",
      details: [
        "Add assets with photos and descriptions",
        "Categorize as Laptop, Monitor, Furniture, etc.",
        "Mark as Returnable or Non-returnable",
        "Set quantities and track availability",
      ],
      color: "from-purple-500 to-pink-500",
      visualIcons: [FiMonitor, FiSmartphone, FiPackage],
    },
    {
      number: "03",
      icon: FiUsers,
      title: "Employees Join & Request",
      description:
        "Employees register independently and request assets they need. When you approve their first request, they automatically become affiliated with your company.",
      details: [
        "Employees self-register on the platform",
        "Browse available assets from any company",
        "Submit requests with optional notes",
        "Automatic company affiliation on approval",
      ],
      color: "from-orange-500 to-red-500",
      visualIcons: [FiUsers, FiClipboard, FiCheck],
    },
    {
      number: "04",
      icon: FiCheckCircle,
      title: "Manage & Track",
      description:
        "Approve or reject requests with a single click. Track all asset assignments in real-time with complete visibility across your organization.",
      details: [
        "One-click approve or reject requests",
        "Automatic inventory updates",
        "Track who has what equipment",
        "Generate reports and analytics",
      ],
      color: "from-green-500 to-emerald-500",
      visualIcons: [FiPieChart, FiDatabase, FiCheckCircle],
    },
  ];

  const hrFeatures = [
    { icon: FiBox, title: "Add & Manage Assets", description: "Complete inventory control" },
    { icon: FiClipboard, title: "Handle Requests", description: "Approve or reject with one click" },
    { icon: FiUsers, title: "Manage Employees", description: "View affiliations and assignments" },
    { icon: FiSettings, title: "Upgrade Plans", description: "Scale as your team grows" },
  ];

  const employeeFeatures = [
    { icon: FiPackage, title: "View Assigned Assets", description: "See all your equipment" },
    { icon: FiClipboard, title: "Request Assets", description: "Browse and request what you need" },
    { icon: FiUsers, title: "View Team", description: "See colleagues and their info" },
    { icon: FiCheckCircle, title: "Return Assets", description: "Easy return workflow" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
              Easy Setup
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get Started in <span className="text-primary">Four Simple Steps</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
              AssetVerse makes corporate asset management incredibly simple. 
              From registration to tracking, everything is designed to save you time 
              and eliminate manual work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-as-hr" className="btn btn-primary btn-lg gap-2">
                Get Started Now
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/features" className="btn btn-outline btn-lg">
                See All Features
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center"
            >
              <FiArrowDown className="h-5 w-5 text-base-content/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-20 lg:py-28 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Journey with <span className="text-primary">AssetVerse</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Follow these simple steps to transform how your company manages assets.
            </p>
          </motion.div>

          <div className="space-y-24 lg:space-y-32">
            {mainSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-16 items-center`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`text-7xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-50`}>
                      {step.number}
                    </span>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-base-content/70 text-lg mb-6">{step.description}</p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                          <FiCheckCircle className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-base-content/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Side */}
                <div className="flex-1 w-full">
                  <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${step.color} p-8 md:p-12 aspect-square md:aspect-video`}>
                    {/* Illustrated Visual */}
                    <div className="relative h-full flex items-center justify-center">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-white rounded-lg rotate-12"></div>
                        <div className="absolute top-1/2 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                      </div>
                      
                      {/* Main Icon Display */}
                      <div className="relative flex items-center justify-center gap-4 md:gap-8">
                        {step.visualIcons.map((Icon, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                            className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg ${
                              i === 1 ? "scale-125 bg-white/30" : ""
                            }`}
                          >
                            <Icon className={`${i === 1 ? "h-10 w-10 md:h-14 md:w-14" : "h-8 w-8 md:h-10 md:w-10"} text-white`} />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Step Number Watermark */}
                      <span className="absolute bottom-4 right-4 text-8xl md:text-9xl font-bold text-white/10">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
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
              Tailored Experience for <span className="text-primary">Everyone</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              AssetVerse provides dedicated dashboards for both HR managers and employees.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* HR Manager */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                    <FiShield className="h-7 w-7 text-primary-content" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">HR Manager</h3>
                    <p className="text-base-content/60">Full administrative control</p>
                  </div>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {hrFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="p-4 rounded-xl bg-base-200/50 hover:bg-primary/10 transition-colors"
                    >
                      <feature.icon className="h-6 w-6 text-primary mb-2" />
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-base-content/60">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <Link to="/join-as-hr" className="btn btn-primary mt-6 gap-2">
                  Join as HR Manager
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Employee */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <FiUsers className="h-7 w-7 text-secondary-content" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Employee</h3>
                    <p className="text-base-content/60">Self-service portal</p>
                  </div>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {employeeFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="p-4 rounded-xl bg-base-200/50 hover:bg-secondary/10 transition-colors"
                    >
                      <feature.icon className="h-6 w-6 text-secondary mb-2" />
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-base-content/60">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <Link to="/join-as-employee" className="btn btn-secondary mt-6 gap-2">
                  Join as Employee
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
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
              Ready to Streamline Your Asset Management?
            </h2>
            <p className="text-primary-content/80 text-lg mb-10">
              Join hundreds of companies already using AssetVerse. The setup takes 
              less than 5 minutes and you can start managing assets right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-as-hr" className="btn bg-white text-primary hover:bg-white/90 btn-lg gap-2">
                Get Started Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
