import { Link } from "react-router";
import { FiBox, FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight } from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import TrustedBrands from "./TrustedBrands";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/join-as-employee", label: "Join as Employee" },
    { to: "/join-as-hr", label: "Join as HR Manager" },
    { to: "/login", label: "Login" },
  ];

  const resourceLinks = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing Plans" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/abbas.yasin.7", icon: FaFacebook, label: "Facebook", color: "hover:text-blue-500" },
    { href: "https://x.com/bankai_tenshou", icon: FaXTwitter, label: "X (Twitter)", color: "hover:text-gray-400" },
    { href: "https://www.linkedin.com/in/abbas-yasin-789452392/", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { href: "https://www.instagram.com/abbasyasin1n2/", icon: FaInstagram, label: "Instagram", color: "hover:text-pink-500" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-content">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-content/80 mt-1">
                Get the latest updates, news, and special offers delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full pl-10 bg-white text-base-content"
                  required
                />
              </div>
              <button type="submit" className="btn bg-neutral text-neutral-content hover:bg-neutral-focus">
                <FiSend className="h-5 w-5" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FiBox className="h-6 w-6 text-primary-content" />
              </div>
              <span>AssetVerse</span>
            </Link>
            <p className="text-neutral-content/70 text-sm leading-relaxed max-w-sm">
              AssetVerse is Bangladesh's leading corporate asset management platform. 
              Streamline your HR operations, track company assets, and manage employee 
              equipment with ease and efficiency.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-ghost btn-circle btn-sm ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FiArrowRight className="h-4 w-4 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-neutral-content/70 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FiArrowRight className="h-4 w-4 text-primary" />
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-neutral-content/70 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FiArrowRight className="h-4 w-4 text-primary" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm group">
                <FiMapPin className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-neutral-content/70">
                  House 42, Road 5, Dhanmondi<br />
                  Dhaka 1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <FiPhone className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="tel:+8801700000000"
                  className="text-neutral-content/70 hover:text-primary transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <FiMail className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:support@assetverse.com.bd"
                  className="text-neutral-content/70 hover:text-primary transition-colors"
                >
                  support@assetverse.com.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trusted Brands Section */}
        <div className="border-t border-neutral-content/10 mt-10 pt-8">
          <TrustedBrands variant="default" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-neutral-focus">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-content/60">
            <p>© {currentYear} AssetVerse. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
