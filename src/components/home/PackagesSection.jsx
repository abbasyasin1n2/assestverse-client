import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FiCheck,
  FiStar,
  FiArrowRight,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";

// Default packages (used as fallback)
const defaultPackages = [
  {
    _id: "1",
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
  },
  {
    _id: "2",
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"],
    popular: true,
  },
  {
    _id: "3",
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"],
  },
];

const PackagesSection = () => {
  // Fetch packages from API
  const { data: apiPackages, isLoading, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/packages");
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use API data if available, otherwise fallback to defaults
  const packages = apiPackages?.length > 0 ? apiPackages : defaultPackages;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Get package styling based on name
  const getPackageStyle = (pkg) => {
    const isPopular = pkg.name === "Standard" || pkg.popular;
    return {
      isPopular,
      cardClass: isPopular
        ? "bg-primary text-primary-content scale-105 shadow-2xl shadow-primary/25 border-primary"
        : "bg-base-100 border-base-200 hover:border-primary/30 hover:shadow-xl",
      buttonClass: isPopular
        ? "btn-secondary"
        : "btn-primary btn-outline",
      priceColor: isPopular ? "text-primary-content" : "text-primary",
    };
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
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Choose the Perfect{" "}
            <span className="text-primary">Plan</span> for Your Team
          </h2>
          <p className="text-base-content/70 text-lg">
            Start free with our Basic plan. Upgrade anytime as your team grows.
            All plans include core asset management features.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
        >
          {packages.map((pkg, index) => {
                const style = getPackageStyle(pkg);
                return (
                  <motion.div
                    key={pkg._id}
                    variants={itemVariants}
                    className={`relative card border ${style.cardClass} transition-all duration-300`}
                  >
                    {/* Popular Badge */}
                    {style.isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-secondary-content text-sm font-semibold shadow-lg">
                          <FiStar className="h-4 w-4" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="card-body p-8">
                      {/* Package Name */}
                      <h3 className={`text-xl font-bold ${style.isPopular ? "" : "text-base-content"}`}>
                        {pkg.name}
                      </h3>

                      {/* Price */}
                      <div className="my-6">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-5xl font-bold ${style.priceColor}`}>
                            ${pkg.price}
                          </span>
                          <span className={`${style.isPopular ? "text-primary-content/70" : "text-base-content/50"}`}>
                            /month
                          </span>
                        </div>
                        <p className={`text-sm mt-2 ${style.isPopular ? "text-primary-content/80" : "text-base-content/60"}`}>
                          Up to {pkg.employeeLimit} employees
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {pkg.features?.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              style.isPopular 
                                ? "bg-primary-content/20" 
                                : "bg-success/20"
                            }`}>
                              <FiCheck className={`h-3 w-3 ${
                                style.isPopular 
                                  ? "text-primary-content" 
                                  : "text-success"
                              }`} />
                            </div>
                            <span className={style.isPopular ? "text-primary-content/90" : "text-base-content/70"}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        to="/join-as-hr"
                        className={`btn ${style.buttonClass} w-full gap-2`}
                      >
                        Get Started
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-base-200/50">
            <div className="flex items-center gap-2">
              <FiZap className="h-5 w-5 text-warning" />
              <span className="font-medium">All plans include:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-base-content/70">
              <span><FiCheckCircle className="inline mr-1" /> Unlimited Assets</span>
              <span><FiCheckCircle className="inline mr-1" /> Request Management</span>
              <span><FiCheckCircle className="inline mr-1" /> Real-time Tracking</span>
              <span><FiCheckCircle className="inline mr-1" /> Secure Dashboard</span>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-base-content/70 mb-4">
            Need more than 20 employees?
          </p>
          <Link
            to="/contact"
            className="btn btn-outline btn-primary"
          >
            Contact Us for Enterprise
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;
