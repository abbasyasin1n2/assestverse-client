import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is AssetVerse?",
      answer:
        "AssetVerse is a comprehensive corporate asset management platform designed for businesses in Bangladesh. It helps HR managers track company assets like laptops, monitors, furniture, and equipment, while enabling employees to easily request and manage the assets assigned to them.",
    },
    {
      question: "How much does AssetVerse cost?",
      answer:
        "We offer three pricing tiers: Basic ($5/month for up to 5 employees), Standard ($8/month for up to 10 employees), and Premium ($15/month for up to 20 employees). All plans include unlimited assets, request management, and real-time tracking. You can start with our free trial to explore the platform.",
    },
    {
      question: "Can employees work with multiple companies?",
      answer:
        "Yes! AssetVerse supports employees working with multiple companies simultaneously. When an employee requests an asset from a new company and gets approved, they automatically become affiliated with that company. They can view and manage assets from all their affiliated companies in one dashboard.",
    },
    {
      question: "How does the asset request process work?",
      answer:
        "Employees can browse available assets from any company and submit a request with an optional note. The HR manager receives the request and can approve or reject it with one click. Upon approval, the asset is automatically assigned to the employee and inventory is updated in real-time.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. AssetVerse uses enterprise-grade security measures including encrypted data transmission, secure authentication via Firebase, and role-based access control. Your company data is stored securely and only accessible to authorized personnel.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time through the dashboard. When you upgrade, your new employee limit takes effect immediately. We use Stripe for secure payment processing, and you can view your payment history in your account settings.",
    },
    {
      question: "What types of assets can I track?",
      answer:
        "You can track any physical asset your company owns. Common examples include IT equipment (laptops, monitors, keyboards), furniture (chairs, desks), vehicles, tools, and more. Each asset can be marked as 'Returnable' or 'Non-returnable' to manage the return workflow appropriately.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes! All plans include email support. Standard and Premium plans include priority support with faster response times. Premium customers also get access to 24/7 support and a dedicated account manager for enterprise needs.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-base-200/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-base-content/70 text-lg mb-8">
              Got questions? We've got answers. If you can't find what you're
              looking for, feel free to contact our support team.
            </p>

            {/* Contact Card */}
            <div className="bg-base-100 rounded-2xl p-6 border border-base-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FiHelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Still have questions?</h3>
                  <p className="text-sm text-base-content/70 mb-3">
                    Can't find the answer you're looking for? Our team is here to help.
                  </p>
                  <a
                    href="mailto:support@assetverse.com.bd"
                    className="btn btn-primary btn-sm"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-base-100 rounded-xl border transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary shadow-lg"
                    : "border-base-200 hover:border-primary/30"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
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
                      <div className="px-6 pb-5">
                        <p className="text-base-content/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
