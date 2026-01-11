import { useState } from "react";
import { motion } from "motion/react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiHeadphones,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We've received your message and will get back to you within 24 hours.",
      confirmButtonColor: "#6366f1",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      type: "general",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Our Office",
      lines: ["House 42, Road 5, Dhanmondi", "Dhaka 1205, Bangladesh"],
    },
    {
      icon: FiPhone,
      title: "Call Us",
      lines: ["+880 1700-000000", "+880 2-9876543"],
    },
    {
      icon: FiMail,
      title: "Email Us",
      lines: ["support@assetverse.com.bd", "sales@assetverse.com.bd"],
    },
    {
      icon: FiClock,
      title: "Working Hours",
      lines: ["Sunday - Thursday: 9AM - 6PM", "Friday - Saturday: Closed"],
    },
  ];

  const supportOptions = [
    {
      icon: FiMessageSquare,
      title: "General Inquiry",
      description: "Have questions about our platform? We're here to help.",
      action: "general",
    },
    {
      icon: FiHeadphones,
      title: "Technical Support",
      description: "Experiencing issues? Our tech team is ready to assist.",
      action: "support",
    },
    {
      icon: FiUsers,
      title: "Sales & Partnerships",
      description: "Interested in enterprise solutions or partnerships?",
      action: "sales",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/abbas.yasin.7",
      icon: FaFacebook,
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      href: "https://x.com/bankai_tenshou",
      icon: FaXTwitter,
      label: "X (Twitter)",
      color: "hover:text-gray-600",
    },
    {
      href: "https://www.linkedin.com/in/abbas-yasin-789452392/",
      icon: FaLinkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      href: "https://www.instagram.com/abbasyasin1n2/",
      icon: FaInstagram,
      label: "Instagram",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge badge-primary badge-lg mb-4">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-lg text-base-content/70">
              Have questions, feedback, or need assistance? We'd love to hear from
              you. Our team is ready to help you get the most out of AssetVerse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.button
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setFormData((prev) => ({ ...prev, type: option.action }))}
                className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer text-left ${
                  formData.type === option.action ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        formData.type === option.action
                          ? "bg-primary text-primary-content"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{option.title}</h3>
                      <p className="text-base-content/70 text-sm">
                        {option.description}
                      </p>
                    </div>
                    {formData.type === option.action && (
                      <FiCheckCircle className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-8">
                  <h2 className="card-title text-2xl mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Full Name *</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Email Address *</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Company Name</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company Ltd."
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Phone Number</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+880 1XXX-XXXXXX"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Subject *</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Message *</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        className="textarea textarea-bordered w-full h-32"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-block"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="card-body p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm">{info.title}</h3>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-base-content/70 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="card bg-base-100 shadow-xl overflow-hidden">
                <figure className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9025567774044!2d90.38068131543156!3d23.750892394568396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AssetVerse Office Location"
                  ></iframe>
                </figure>
              </div>

              {/* Social Links */}
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="card-title">Connect With Us</h3>
                  <p className="text-primary-content/80 text-sm">
                    Follow us on social media for updates, tips, and more.
                  </p>
                  <div className="flex gap-3 mt-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-circle btn-ghost bg-primary-content/10 hover:bg-primary-content/20"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for Quick Answers?</h2>
          <p className="text-base-content/70 mb-6">
            Check out our FAQ section for answers to commonly asked questions.
          </p>
          <a href="/#faq" className="btn btn-outline btn-primary">
            View FAQs
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
