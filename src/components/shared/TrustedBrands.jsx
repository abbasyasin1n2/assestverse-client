import { motion } from "motion/react";

const TrustedBrands = ({ 
  title = "Trusted by leading companies across Bangladesh",
  subtitle,
  variant = "default", // "default" | "homepage" | "minimal"
  showTitle = true,
  className = ""
}) => {
  const brands = [
    { src: "/trustedbrand/trurstedbrand1.svg", alt: "Trusted Brand 1" },
    { src: "/trustedbrand/trustedbrand2.svg", alt: "Trusted Brand 2" },
    { src: "/trustedbrand/trustedbrand3.svg", alt: "Trusted Brand 3" },
    { src: "/trustedbrand/trustedbrand4.png", alt: "Trusted Brand 4" },
  ];

  // Duplicate brands for infinite scroll effect on homepage
  const duplicatedBrands = variant === "homepage" ? [...brands, ...brands] : brands;

  if (variant === "homepage") {
    return (
      <section className={`py-12 lg:py-16 bg-base-200/50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          {showTitle && (
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-base-content">
                {title}
              </h2>
              {subtitle && (
                <p className="text-base-content/70 mt-2 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}

          {/* Animated brands carousel */}
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex items-center gap-12 lg:gap-16"
              animate={{ x: [0, -50 * brands.length] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-10 lg:h-12 w-auto grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Static grid for smaller screens */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mt-8 lg:hidden">
            {brands.map((brand, index) => (
              <motion.img
                key={index}
                src={brand.src}
                alt={brand.alt}
                className="h-8 w-auto grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`flex flex-wrap justify-center items-center gap-6 lg:gap-10 ${className}`}>
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.src}
            alt={brand.alt}
            className="h-6 lg:h-8 w-auto grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
    );
  }

  // Default variant (for footer)
  return (
    <div className={className}>
      {showTitle && (
        <p className="text-center text-sm text-neutral-content/50 mb-6">
          {title}
        </p>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.src}
            alt={brand.alt}
            className="h-8 grayscale hover:grayscale-0 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default TrustedBrands;
