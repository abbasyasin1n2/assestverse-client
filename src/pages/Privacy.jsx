import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const Privacy = () => {
  const lastUpdated = "January 10, 2026";

  const sections = [
    {
      id: "collection",
      icon: FiDatabase,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you register for AssetVerse, we collect information such as your name, email address, phone number, company name, and job title. For HR managers, we also collect company logo and business contact information.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including pages visited, features used, time spent on the platform, and device information (browser type, operating system, IP address).",
        },
        {
          subtitle: "Asset Data",
          text: "Information about company assets that you add to the platform, including asset names, categories, descriptions, images, and assignment history.",
        },
      ],
    },
    {
      id: "use",
      icon: FiEye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve AssetVerse services, including processing asset requests, managing employee affiliations, and generating reports.",
        },
        {
          subtitle: "Communication",
          text: "We may use your email to send service-related notifications, updates about new features, security alerts, and promotional content (which you can opt out of at any time).",
        },
        {
          subtitle: "Analytics & Improvement",
          text: "We analyze usage patterns to improve our platform's functionality, user experience, and to develop new features that better serve your needs.",
        },
      ],
    },
    {
      id: "sharing",
      icon: FiGlobe,
      title: "Information Sharing",
      content: [
        {
          subtitle: "With Your Consent",
          text: "We share information between HR managers and employees within the same company affiliation as necessary for the asset management workflow.",
        },
        {
          subtitle: "Service Providers",
          text: "We work with trusted third-party service providers (hosting, payment processing, analytics) who are bound by confidentiality agreements and only process data as instructed.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, court order, or government request, or to protect the rights, property, or safety of AssetVerse, our users, or others.",
        },
      ],
    },
    {
      id: "security",
      icon: FiLock,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3 encryption. Data at rest is encrypted using AES-256 encryption.",
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and authentication mechanisms. Employee data is only accessible to their affiliated HR managers, and personal profile data is controlled by individual users.",
        },
        {
          subtitle: "Regular Audits",
          text: "We conduct regular security audits and vulnerability assessments to identify and address potential security risks promptly.",
        },
      ],
    },
    {
      id: "rights",
      icon: FiCheckCircle,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access your personal data and request a copy in a portable format. You can download your data from your profile settings at any time.",
        },
        {
          subtitle: "Correction & Deletion",
          text: "You can update your personal information through your profile page. You may also request deletion of your account and associated data by contacting our support team.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your notification preferences in settings.",
        },
      ],
    },
    {
      id: "cookies",
      icon: FiAlertCircle,
      title: "Cookies & Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use essential cookies that are necessary for the platform to function properly, including authentication tokens and session management.",
        },
        {
          subtitle: "Analytics Cookies",
          text: "We use analytics tools to understand how users interact with our platform. These cookies help us improve user experience and identify issues.",
        },
        {
          subtitle: "Cookie Management",
          text: "You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect platform functionality.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FiShield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-base-content/70 mb-4">
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your information.
            </p>
            <p className="text-sm text-base-content/60">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-base-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="btn btn-sm btn-ghost bg-base-100 hover:btn-primary"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title.split(" ")[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-base-content/80 leading-relaxed">
              AssetVerse ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our corporate asset
              management platform, including our website and related services
              (collectively, the "Service").
            </p>
            <p className="text-base-content/80 leading-relaxed">
              By using AssetVerse, you agree to the collection and use of
              information in accordance with this policy. If you do not agree with
              our policies and practices, please do not use our Service.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="card bg-base-100 shadow-lg"
              >
                <div className="card-body p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="pl-4 border-l-2 border-primary/20">
                        <h3 className="font-semibold text-lg mb-2">{item.subtitle}</h3>
                        <p className="text-base-content/70">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 card bg-primary text-primary-content"
          >
            <div className="card-body p-8 text-center">
              <FiMail className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-primary-content/80 mb-6">
                If you have any questions or concerns about this Privacy Policy or
                our data practices, please don't hesitate to reach out.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn bg-primary-content text-primary hover:bg-primary-content/90">
                  Contact Us
                </Link>
                <a
                  href="mailto:privacy@assetverse.com.bd"
                  className="btn btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary"
                >
                  privacy@assetverse.com.bd
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/terms" className="btn btn-outline">
              Terms of Service
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
