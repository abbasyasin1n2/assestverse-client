import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FiBox,
  FiUsers,
  FiShield,
  FiTrendingUp,
  FiAward,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

const About = () => {
  const stats = [
    { label: "Companies Trust Us", value: "500+", icon: FiBox },
    { label: "Assets Managed", value: "50K+", icon: FiTrendingUp },
    { label: "Happy Employees", value: "10K+", icon: FiUsers },
    { label: "Years of Excellence", value: "5+", icon: FiAward },
  ];

  const values = [
    {
      icon: FiShield,
      title: "Security First",
      description:
        "Your data security is our top priority. We use enterprise-grade encryption and follow industry best practices to keep your asset data safe.",
    },
    {
      icon: FiZap,
      title: "Innovation",
      description:
        "We continuously evolve our platform with cutting-edge technologies to provide you with the best asset management experience.",
    },
    {
      icon: FiHeart,
      title: "Customer Success",
      description:
        "Your success is our success. Our dedicated support team is always ready to help you maximize the value of our platform.",
    },
    {
      icon: FiTarget,
      title: "Transparency",
      description:
        "We believe in clear communication and honest practices. No hidden fees, no surprises – just straightforward asset management.",
    },
  ];

  const team = [
    {
      name: "Sarah Rahman",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/300?img=1",
      description: "Former HR Director with 15+ years of corporate experience.",
    },
    {
      name: "Ahmed Khan",
      role: "CTO",
      image: "https://i.pravatar.cc/300?img=3",
      description: "Tech visionary with expertise in enterprise software.",
    },
    {
      name: "Fatima Begum",
      role: "Head of Product",
      image: "https://i.pravatar.cc/300?img=5",
      description: "Product strategist focused on user-centric design.",
    },
    {
      name: "Karim Hassan",
      role: "Head of Customer Success",
      image: "https://i.pravatar.cc/300?img=8",
      description: "Dedicated to ensuring every customer achieves their goals.",
    },
  ];

  const milestones = [
    { year: "2020", event: "AssetVerse founded in Dhaka, Bangladesh" },
    { year: "2021", event: "Launched first version with 50 beta customers" },
    { year: "2022", event: "Expanded to serve 200+ companies across South Asia" },
    { year: "2023", event: "Introduced advanced analytics and reporting features" },
    { year: "2024", event: "Reached 500+ enterprise clients milestone" },
    { year: "2025", event: "Launched AI-powered asset optimization features" },
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
            className="text-center max-w-4xl mx-auto"
          >
            <span className="badge badge-primary badge-lg mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming How Companies{" "}
              <span className="text-primary">Manage Assets</span>
            </h1>
            <p className="text-lg text-base-content/70 mb-8">
              AssetVerse is Bangladesh's leading corporate asset management platform.
              We help organizations streamline their HR operations, track company
              assets, and manage employee equipment with unparalleled ease and
              efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body items-center text-center p-6">
                  <stat.icon className="w-8 h-8 text-primary mb-2" />
                  <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                  <p className="text-sm text-base-content/70">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="badge badge-secondary mb-4">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empowering Businesses Through Smart Asset Management
              </h2>
              <p className="text-base-content/70 mb-6">
                At AssetVerse, we believe that effective asset management is the
                backbone of successful organizations. Our mission is to provide
                businesses with intuitive, powerful tools that eliminate the chaos
                of manual tracking and bring clarity to asset management.
              </p>
              <p className="text-base-content/70 mb-6">
                We understand the challenges HR managers face daily – from tracking
                who has which laptop to ensuring timely returns of company equipment.
                That's why we've built a platform that makes these tasks effortless.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-success w-5 h-5" />
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-success w-5 h-5" />
                  <span>Automated Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-success w-5 h-5" />
                  <span>Secure Platform</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-content p-6 rounded-xl shadow-xl">
                <FiGlobe className="w-8 h-8 mb-2" />
                <p className="font-bold">Serving 15+ Countries</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-primary mb-4">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Our core values shape everything we do – from product development to
              customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="card-body">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="card-title text-lg">{value.title}</h3>
                  <p className="text-base-content/70 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-secondary mb-4">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the People Behind AssetVerse
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              A passionate team of innovators, problem-solvers, and customer advocates
              working together to revolutionize asset management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all group"
              >
                <figure className="px-6 pt-6">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:ring-secondary transition-all">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                  <p className="text-base-content/70 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-primary mb-4">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Milestones Along the Way
            </h2>
          </div>

          <ul className="timeline timeline-snap-icon timeline-vertical max-md:timeline-compact">
            {milestones.map((milestone, index) => (
              <li key={milestone.year}>
                {index > 0 && <hr className="bg-primary" />}
                <div className="timeline-middle">
                  <div className="w-5 h-5 rounded-full bg-primary"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`${
                    index % 2 === 0 ? "timeline-start md:text-end" : "timeline-end"
                  } mb-10`}
                >
                  <time className="font-mono text-2xl font-bold text-primary">
                    {milestone.year}
                  </time>
                  <p className="text-base-content/80">{milestone.event}</p>
                </motion.div>
                {index < milestones.length - 1 && <hr className="bg-primary" />}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Asset Management?
          </h2>
          <p className="text-xl text-primary-content/80 mb-8">
            Join 500+ companies already using AssetVerse to streamline their
            operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/join-as-hr" className="btn btn-secondary btn-lg">
              Get Started Free
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg border-primary-content text-primary-content hover:bg-primary-content hover:text-primary">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
