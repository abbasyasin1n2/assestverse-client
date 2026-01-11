import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  FiPlus,
  FiMinus,
  FiHelpCircle,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiSearch,
  FiPackage,
  FiUsers,
  FiCreditCard,
  FiShield,
  FiSettings,
} from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions", icon: FiHelpCircle },
    { id: "general", label: "General", icon: FiPackage },
    { id: "accounts", label: "Accounts & Registration", icon: FiUsers },
    { id: "billing", label: "Billing & Pricing", icon: FiCreditCard },
    { id: "security", label: "Security & Privacy", icon: FiShield },
    { id: "technical", label: "Technical", icon: FiSettings },
  ];

  const faqs = [
    {
      category: "general",
      question: "What is AssetVerse?",
      answer:
        "AssetVerse is a comprehensive corporate asset management platform designed for businesses. It helps HR managers track company assets like laptops, monitors, furniture, and equipment, while enabling employees to easily request and manage the assets assigned to them. Our platform streamlines the entire asset lifecycle from procurement to retirement.",
    },
    {
      category: "general",
      question: "Who can use AssetVerse?",
      answer:
        "AssetVerse is designed for any organization that needs to track and manage physical assets. This includes startups, small businesses, medium enterprises, and large corporations. Whether you have 5 employees or 500, AssetVerse scales to meet your needs.",
    },
    {
      category: "general",
      question: "What types of assets can I track?",
      answer:
        "You can track any physical asset your company owns. Common examples include IT equipment (laptops, monitors, keyboards, mice), office furniture (chairs, desks, filing cabinets), communication devices (phones, headsets), vehicles, tools, and more. Each asset can be marked as 'Returnable' or 'Non-returnable' to manage the return workflow appropriately.",
    },
    {
      category: "accounts",
      question: "How do I register as an HR Manager?",
      answer:
        "To register as an HR Manager, click on 'Join as HR Manager' and fill in your company details including company name, logo, and your personal information. You'll automatically receive a free Basic plan with 5 employee slots. You can start adding assets and managing your team immediately after registration.",
    },
    {
      category: "accounts",
      question: "How do I register as an Employee?",
      answer:
        "Employees can self-register by clicking 'Join as Employee' and providing their personal details. After registration, you can browse available assets from any company and submit requests. When an HR manager approves your first request, you'll automatically become affiliated with that company.",
    },
    {
      category: "accounts",
      question: "Can employees work with multiple companies?",
      answer:
        "Yes! AssetVerse supports employees working with multiple companies simultaneously. When an employee requests an asset from a new company and gets approved, they automatically become affiliated with that company. They can view and manage assets from all their affiliated companies in one unified dashboard.",
    },
    {
      category: "accounts",
      question: "How does the auto-affiliation system work?",
      answer:
        "When an employee submits their first asset request to a company and the HR manager approves it, the employee automatically becomes affiliated with that company. This eliminates the need for manual employee onboarding and ensures that only active employees who need assets are counted against your employee limit.",
    },
    {
      category: "billing",
      question: "How much does AssetVerse cost?",
      answer:
        "We offer three pricing tiers: Basic (Free - up to 5 employees), Standard ($8/month - up to 10 employees), and Premium ($15/month - up to 20 employees). All plans include unlimited assets, request management, and real-time tracking. The Basic plan is free forever!",
    },
    {
      category: "billing",
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time through your dashboard. When you upgrade, your new employee limit takes effect immediately. We use Stripe for secure payment processing, and you can view your complete payment history in your account settings.",
    },
    {
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards through Stripe, including Visa, Mastercard, American Express, and Discover. All payments are processed securely and you'll receive email receipts for all transactions.",
    },
    {
      category: "billing",
      question: "Is there a refund policy?",
      answer:
        "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with AssetVerse within the first 30 days, contact our support team for a full refund. After 30 days, refunds are provided on a prorated basis.",
    },
    {
      category: "security",
      question: "Is my data secure?",
      answer:
        "Absolutely. AssetVerse uses enterprise-grade security measures including encrypted data transmission (HTTPS/TLS), secure authentication via Firebase, and role-based access control. Your company data is stored securely in MongoDB with automatic backups and is only accessible to authorized personnel.",
    },
    {
      category: "security",
      question: "Who can see my company's assets?",
      answer:
        "Only your employees and HR managers can see detailed information about your company's assets. Public visitors can see a limited view of available assets across the platform, but sensitive information like quantities and assignment details are only visible to authorized users.",
    },
    {
      category: "security",
      question: "How is authentication handled?",
      answer:
        "We use Firebase Authentication for secure login, which supports email/password and Google Sign-In. Additionally, we implement JWT (JSON Web Tokens) for API authentication, ensuring that every request to our servers is properly verified and authorized.",
    },
    {
      category: "technical",
      question: "How does the asset request process work?",
      answer:
        "Employees can browse available assets from any company and submit a request with an optional note explaining their need. The HR manager receives the request in their dashboard and can approve or reject it with one click. Upon approval, the asset is automatically assigned to the employee and the inventory is updated in real-time.",
    },
    {
      category: "technical",
      question: "Can I return assets I no longer need?",
      answer:
        "Yes, for assets marked as 'Returnable', you can submit a return request through your dashboard. The asset will be returned to the company's inventory and the HR manager will be notified. Non-returnable assets (like stationery) cannot be returned.",
    },
    {
      category: "technical",
      question: "Does AssetVerse work on mobile devices?",
      answer:
        "Yes! AssetVerse is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can manage your assets, approve requests, and track inventory from any device with a web browser.",
    },
    {
      category: "technical",
      question: "Do you offer customer support?",
      answer:
        "Yes! All plans include email support. Standard and Premium plans include priority support with faster response times. Premium customers also get access to 24/7 support and a dedicated account manager for enterprise needs. You can reach us at support@assetverse.com.bd.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
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
              <FiHelpCircle className="h-4 w-4" />
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-3xl mx-auto">
              Find answers to common questions about AssetVerse. Can't find what you're 
              looking for? Our support team is always here to help.
            </p>

            {/* Search Box */}
            <div className="max-w-xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-12 pr-4 py-3 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Categories Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setOpenIndex(0);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeCategory === cat.id
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200"
                        }`}
                      >
                        <cat.icon className="h-5 w-5" />
                        <span className="font-medium">{cat.label}</span>
                        <span className={`ml-auto text-sm ${
                          activeCategory === cat.id ? "text-primary-content/70" : "text-base-content/50"
                        }`}>
                          {cat.id === "all" 
                            ? faqs.length 
                            : faqs.filter(f => f.category === cat.id).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Contact Card */}
                <div className="mt-8 p-6 bg-base-200/50 rounded-2xl">
                  <h4 className="font-semibold mb-2">Still have questions?</h4>
                  <p className="text-sm text-base-content/70 mb-4">
                    Can't find the answer you're looking for? Contact our support team.
                  </p>
                  <Link to="/contact" className="btn btn-primary btn-sm w-full gap-2">
                    <FiMessageCircle className="h-4 w-4" />
                    Contact Support
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <FiHelpCircle className="h-16 w-16 text-base-content/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-base-content/70">
                    Try adjusting your search or browse all categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="btn btn-primary btn-sm mt-4"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className={`bg-base-100 rounded-xl border transition-all duration-300 ${
                        openIndex === index
                          ? "border-primary shadow-lg"
                          : "border-base-200 hover:border-primary/30"
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-5 flex items-start justify-between text-left"
                      >
                        <span className="font-semibold pr-4 text-lg">{faq.question}</span>
                        <span
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors mt-1 ${
                            openIndex === index
                              ? "bg-primary text-primary-content"
                              : "bg-base-200 text-base-content"
                          }`}
                        >
                          {openIndex === index ? (
                            <FiMinus className="h-4 w-4" />
                          ) : (
                            <FiPlus className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <p className="text-base-content/70 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Need More <span className="text-primary">Help?</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Our support team is available to assist you with any questions or issues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="card bg-base-100 shadow-lg text-center"
            >
              <div className="card-body items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <FiMail className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Email Support</h3>
                <p className="text-base-content/70 text-sm mb-4">
                  Get a response within 24 hours
                </p>
                <a href="mailto:support@assetverse.com.bd" className="link link-primary">
                  support@assetverse.com.bd
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="card bg-base-100 shadow-lg text-center"
            >
              <div className="card-body items-center">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                  <FiPhone className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-bold text-lg">Phone Support</h3>
                <p className="text-base-content/70 text-sm mb-4">
                  Premium plan customers only
                </p>
                <a href="tel:+8801700000000" className="link link-secondary">
                  +880 1700-000000
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="card bg-base-100 shadow-lg text-center"
            >
              <div className="card-body items-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <FiMessageCircle className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg">Live Chat</h3>
                <p className="text-base-content/70 text-sm mb-4">
                  Available Mon-Fri, 9am-6pm
                </p>
                <Link to="/contact" className="btn btn-outline btn-sm">
                  Start Chat
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
              Ready to Get Started?
            </h2>
            <p className="text-primary-content/80 text-lg mb-10">
              Join hundreds of companies already using AssetVerse. Our platform 
              makes asset management simple and efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-as-hr" className="btn bg-white text-primary hover:bg-white/90 btn-lg gap-2">
                Start Free Trial
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/features" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
