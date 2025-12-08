import { Link } from "react-router";
import { FiBox, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/join-as-employee", label: "Join as Employee" },
    { to: "/join-as-hr", label: "Join as HR Manager" },
    { to: "/login", label: "Login" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
    { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <FiBox className="h-8 w-8 text-primary" />
              <span>AssetVerse</span>
            </Link>
            <p className="text-sm text-neutral-content/70">
              Streamline your corporate asset management with AssetVerse. 
              Track, assign, and manage company assets efficiently.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-primary-content transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-neutral-content/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-neutral-content/70">
                  House 42, Road 5, Dhanmondi<br />
                  Dhaka 1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="text-neutral-content/70 hover:text-primary transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:support@assetverse.com"
                  className="text-neutral-content/70 hover:text-primary transition-colors"
                >
                  support@assetverse.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-neutral-content/70 mb-3">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered input-sm bg-neutral-focus w-full"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-content/10 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-content/60">
            <p>© {currentYear} AssetVerse. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
