import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FiFileText,
  FiUserCheck,
  FiAlertTriangle,
  FiDollarSign,
  FiShield,
  FiRefreshCw,
  FiXCircle,
  FiBook,
  FiHelpCircle,
} from "react-icons/fi";

const Terms = () => {
  const lastUpdated = "January 10, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: FiUserCheck,
      title: "Acceptance of Terms",
      content: `By accessing or using AssetVerse ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service. These Terms apply to all visitors, users, HR managers, and employees who access or use the Service.

Your continued use of AssetVerse following the posting of revised Terms means that you accept and agree to the changes. We encourage you to review these Terms periodically for any updates.`,
    },
    {
      id: "accounts",
      icon: FiUserCheck,
      title: "User Accounts",
      content: `When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.

You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

Account Types:
• HR Manager Accounts: Have administrative privileges to manage company assets, employees, and subscriptions.
• Employee Accounts: Can view assigned assets, request new assets, and manage personal profile information.

You may not use as a username the name of another person or entity that is not lawfully available for use, or a name or trademark that is subject to any rights of another person or entity without appropriate authorization.`,
    },
    {
      id: "services",
      icon: FiFileText,
      title: "Service Description",
      content: `AssetVerse provides a corporate asset management platform that enables businesses to:
• Track and manage company assets (laptops, phones, furniture, etc.)
• Manage employee affiliations and asset assignments
• Process asset requests and returns
• Generate reports and analytics on asset utilization

We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) at any time with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.

The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.`,
    },
    {
      id: "subscriptions",
      icon: FiDollarSign,
      title: "Subscriptions & Payments",
      content: `AssetVerse offers various subscription packages to meet different organizational needs:

Free Plan: Includes basic features with a limit of 5 employees.
Standard Plan: $8/month with enhanced features and up to 10 employees.
Premium Plan: $15/month with full features and up to 20 employees.

Payment Terms:
• All paid subscriptions are billed in advance on a monthly basis.
• Payments are processed securely through Stripe payment gateway.
• You agree to provide current, complete, and accurate billing information.
• Prices are subject to change upon 30 days' notice.

Refund Policy:
• We offer a 14-day money-back guarantee for first-time paid subscribers.
• Refund requests after 14 days will be reviewed on a case-by-case basis.
• Downgrades take effect at the end of the current billing period.`,
    },
    {
      id: "content",
      icon: FiShield,
      title: "User Content & Data",
      content: `You retain ownership of all content you upload to AssetVerse, including asset information, company logos, and employee data ("User Content").

By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your content solely for the purpose of providing the Service to you.

You are responsible for ensuring that:
• You have the right to upload and share the content.
• The content does not violate any applicable laws or regulations.
• The content does not infringe on any third party's intellectual property rights.

We may remove any content that violates these Terms or that we deem inappropriate without prior notice.`,
    },
    {
      id: "prohibited",
      icon: FiXCircle,
      title: "Prohibited Activities",
      content: `You agree not to engage in any of the following prohibited activities:

• Using the Service for any unlawful purpose or in violation of any laws.
• Attempting to gain unauthorized access to any portion of the Service.
• Interfering with or disrupting the integrity or performance of the Service.
• Uploading viruses, malware, or other malicious code.
• Collecting or harvesting any information from the Service without permission.
• Impersonating another person or entity.
• Selling, reselling, or exploiting any portion of the Service.
• Using automated systems or software to extract data from the Service.
• Circumventing any access controls or usage limits.

Violation of these prohibitions may result in immediate termination of your account and may subject you to legal action.`,
    },
    {
      id: "termination",
      icon: FiAlertTriangle,
      title: "Termination",
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination:
• Your right to use the Service will immediately cease.
• We may delete your data within 30 days of termination.
• You may request a data export before termination takes effect.
• Any outstanding payments will become immediately due.

You may terminate your account at any time by contacting our support team or using the account deletion feature in your profile settings. HR managers should ensure proper handoff of company data before account termination.`,
    },
    {
      id: "liability",
      icon: FiBook,
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by applicable law, in no event shall AssetVerse, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:

• Your access to or use of or inability to access or use the Service.
• Any conduct or content of any third party on the Service.
• Any content obtained from the Service.
• Unauthorized access, use, or alteration of your transmissions or content.

Our total liability for any claims under these Terms shall not exceed the amount you paid us in the 12 months prior to the claim.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for incidental or consequential damages, so the above limitations may not apply to you.`,
    },
    {
      id: "changes",
      icon: FiRefreshCw,
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any material changes by:

• Posting the new Terms on this page.
• Updating the "Last updated" date at the top of this page.
• Sending an email notification to registered users.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.

If you do not agree to the new terms, please stop using the Service and contact us to delete your account.`,
    },
    {
      id: "governing",
      icon: FiBook,
      title: "Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.

Any disputes arising out of or relating to these Terms or the Service shall be resolved through:
1. Good faith negotiation between the parties.
2. Mediation if negotiation fails.
3. Binding arbitration in Dhaka, Bangladesh, if mediation fails.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.`,
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
              <FiFileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-base-content/70 mb-4">
              Please read these terms carefully before using AssetVerse.
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
            {sections.slice(0, 6).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="btn btn-sm btn-ghost bg-base-100 hover:btn-primary"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title.split(" ")[0]}</span>
              </a>
            ))}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost bg-base-100">
                More...
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {sections.slice(6).map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex items-center gap-2">
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Sections */}
          <div className="space-y-8">
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                  <div className="prose max-w-none">
                    {section.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-base-content/70 whitespace-pre-line">
                        {paragraph}
                      </p>
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
            className="mt-12 card bg-base-200"
          >
            <div className="card-body p-8 text-center">
              <FiHelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
              <p className="text-base-content/70 mb-6">
                If you have any questions about these Terms of Service, please
                contact our support team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn btn-primary">
                  Contact Support
                </Link>
                <a
                  href="mailto:legal@assetverse.com.bd"
                  className="btn btn-outline"
                >
                  legal@assetverse.com.bd
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="btn btn-outline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
