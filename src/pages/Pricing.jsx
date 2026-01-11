import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FiCheck,
  FiStar,
  FiArrowRight,
  FiZap,
  FiShield,
  FiUsers,
  FiHelpCircle,
  FiCreditCard,
} from "react-icons/fi";
import axiosInstance from "../api/axiosInstance";

// Default packages (used as fallback)
const defaultPackages = [
  {
    _id: "1",
    name: "Basic",
    employeeLimit: 5,
    price: 0,
    features: [
      "Up to 5 employees",
      "Basic asset tracking",
      "Email support",
      "Monthly reports",
      "Asset request workflow",
      "Employee self-service portal",
    ],
  },
  {
    _id: "2",
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: [
      "Up to 10 employees",
      "Advanced asset tracking",
      "Priority email support",
      "Weekly reports",
      "Asset analytics dashboard",
      "Bulk asset management",
      "Custom categories",
    ],
    popular: true,
  },
  {
    _id: "3",
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: [
      "Up to 20 employees",
      "Full asset management",
      "24/7 priority support",
      "Real-time reports",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "API access",
    ],
  },
];

const Pricing = () => {
  // Fetch packages from API
  const { data: apiPackages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/packages");
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const packages = apiPackages?.length > 0 ? apiPackages : defaultPackages;

  const comparisonFeatures = [
    { name: "Employee Limit", basic: "5", standard: "10", premium: "20" },
    { name: "Asset Tracking", basic: true, standard: true, premium: true },
    { name: "Request Workflow", basic: true, standard: true, premium: true },
    { name: "Employee Portal", basic: true, standard: true, premium: true },
    { name: "Analytics Dashboard", basic: false, standard: true, premium: true },
    { name: "Priority Support", basic: false, standard: true, premium: true },
    { name: "Custom Branding", basic: false, standard: false, premium: true },
    { name: "API Access", basic: false, standard: false, premium: true },
    { name: "Dedicated Manager", basic: false, standard: false, premium: true },
    { name: "Real-time Reports", basic: false, standard: false, premium: true },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade your plan at any time from your dashboard. When you upgrade, your new employee limit takes effect immediately.",
    },
    {
      question: "Is there a free trial?",
      answer: "Our Basic plan is free forever with up to 5 employees. You can test all core features before deciding to upgrade.",
    },
    {
      question: "How does billing work?",
      answer: "We bill monthly through Stripe. You can cancel or change your plan at any time. There are no long-term contracts.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards through Stripe, including Visa, Mastercard, American Express, and Discover.",
    },
  ];

  const getPackageStyle = (pkg) => {
    const isPopular = pkg.name === "Standard" || pkg.popular;
    return {
      isPopular,
      cardClass: isPopular
        ? "bg-primary text-primary-content scale-100 lg:scale-105 shadow-2xl shadow-primary/25 border-primary"
        : "bg-base-100 border-base-200 hover:border-primary/30 hover:shadow-xl",
      buttonClass: isPopular ? "btn-secondary" : "btn-primary btn-outline",
      priceColor: isPopular ? "text-primary-content" : "text-primary",
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
              <FiCreditCard className="h-4 w-4" />
              Simple Pricing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Choose the Perfect <span className="text-primary">Plan</span> for Your Team
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
              Start free with our Basic plan. Upgrade anytime as your team grows. 
              All plans include core asset management features with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 lg:py-28 bg-base-100">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
            >
              {packages.map((pkg) => {
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
                      <h3 className={`text-2xl font-bold ${style.isPopular ? "" : "text-base-content"}`}>
                        {pkg.name}
                      </h3>

                      {/* Price */}
                      <div className="my-8">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-5xl md:text-6xl font-bold ${style.priceColor}`}>
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
                      <ul className="space-y-4 mb-8">
                        {pkg.features?.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
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
                            <span className={`${style.isPopular ? "text-primary-content/90" : "text-base-content/70"}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        to="/join-as-hr"
                        className={`btn ${style.buttonClass} w-full gap-2 mt-auto`}
                      >
                        {pkg.price === 0 ? "Start Free" : "Get Started"}
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            <div className="flex items-center gap-2 text-base-content/60">
              <FiShield className="h-5 w-5 text-success" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/60">
              <FiZap className="h-5 w-5 text-warning" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/60">
              <FiUsers className="h-5 w-5 text-info" />
              <span>100+ Companies Trust Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
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
              Compare <span className="text-primary">All Features</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              See what's included in each plan to make the best choice for your team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-x-auto"
          >
            <table className="table w-full max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg">
              <thead>
                <tr>
                  <th className="text-left py-4">Feature</th>
                  <th className="text-center py-4">Basic</th>
                  <th className="text-center py-4 bg-primary/10">Standard</th>
                  <th className="text-center py-4">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="hover">
                    <td className="py-4 font-medium">{feature.name}</td>
                    <td className="text-center py-4">
                      {typeof feature.basic === "boolean" ? (
                        feature.basic ? (
                          <FiCheck className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <span className="text-base-content/30">—</span>
                        )
                      ) : (
                        <span className="font-semibold">{feature.basic}</span>
                      )}
                    </td>
                    <td className="text-center py-4 bg-primary/5">
                      {typeof feature.standard === "boolean" ? (
                        feature.standard ? (
                          <FiCheck className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <span className="text-base-content/30">—</span>
                        )
                      ) : (
                        <span className="font-semibold">{feature.standard}</span>
                      )}
                    </td>
                    <td className="text-center py-4">
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <FiCheck className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <span className="text-base-content/30">—</span>
                        )
                      ) : (
                        <span className="font-semibold">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Pricing <span className="text-primary">FAQs</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Common questions about our pricing and billing.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="collapse collapse-plus bg-base-200/50 rounded-xl"
              >
                <input type="radio" name="pricing-faq" defaultChecked={index === 0} />
                <div className="collapse-title text-lg font-semibold flex items-center gap-3">
                  <FiHelpCircle className="h-5 w-5 text-primary shrink-0" />
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 pl-8">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-primary-content/80 text-lg mb-10">
              Join hundreds of companies already using AssetVerse. Start with our 
              free Basic plan and upgrade as your team grows.
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

export default Pricing;
