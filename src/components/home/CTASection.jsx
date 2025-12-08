import { motion } from "motion/react";
import { Link } from "react-router";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const CTASection = () => {
  const benefits = [
    "Free Basic plan available",
    "No credit card required",
    "Setup in under 5 minutes",
    "Cancel anytime",
  ];

  return (
    <section className="py-20 lg:py-28 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12 lg:p-16"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-primary-content text-sm font-medium mb-6">
                Start Your Free Trial Today
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-content mb-6"
            >
              Ready to Transform Your Asset Management?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-lg md:text-xl text-primary-content/80 mb-8"
            >
              Join hundreds of companies in Bangladesh who trust AssetVerse to
              manage their corporate assets efficiently.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-primary-content/90"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <FiCheck className="h-3 w-3" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/join-as-hr"
                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 gap-2"
              >
                Get Started as HR
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/join-as-employee"
                className="btn btn-lg btn-outline border-white/30 text-primary-content hover:bg-white/10 hover:border-white/50"
              >
                Join as Employee
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
