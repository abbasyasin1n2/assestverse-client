import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiTag,
  FiSearch,
  FiTrendingUp,
  FiBookOpen,
} from "react-icons/fi";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Asset Management",
    "HR Tips",
    "Product Updates",
    "Industry Insights",
    "Best Practices",
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of Corporate Asset Management: Trends to Watch in 2025",
    excerpt:
      "Discover how AI, IoT, and cloud technologies are reshaping how companies track and manage their physical assets. Learn what leading organizations are doing differently.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    category: "Industry Insights",
    author: {
      name: "Sarah Rahman",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "CEO & Founder",
    },
    date: "January 10, 2026",
    readTime: "8 min read",
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Common Asset Management Mistakes and How to Avoid Them",
      excerpt:
        "From poor documentation to lack of regular audits, learn about the pitfalls that cost companies thousands and how to prevent them.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      category: "Best Practices",
      author: { name: "Ahmed Khan", avatar: "https://i.pravatar.cc/100?img=3" },
      date: "January 8, 2026",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How to Build an Effective Asset Request Workflow",
      excerpt:
        "Streamline your asset request process with these proven strategies that reduce approval time by 70%.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500",
      category: "HR Tips",
      author: { name: "Fatima Begum", avatar: "https://i.pravatar.cc/100?img=5" },
      date: "January 5, 2026",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "AssetVerse 2.0: New Features That Will Transform Your Workflow",
      excerpt:
        "Introducing advanced analytics, bulk operations, and seamless integrations in our biggest update yet.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      category: "Product Updates",
      author: { name: "Tech Team", avatar: "https://i.pravatar.cc/100?img=8" },
      date: "January 3, 2026",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "The ROI of Proper Asset Tracking: A Case Study",
      excerpt:
        "See how one company saved $500,000 annually by implementing a comprehensive asset management system.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
      category: "Industry Insights",
      author: { name: "Karim Hassan", avatar: "https://i.pravatar.cc/100?img=11" },
      date: "December 28, 2025",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Remote Work Asset Management: Best Practices for Distributed Teams",
      excerpt:
        "Managing company equipment when your team is spread across multiple locations requires a strategic approach.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
      category: "Asset Management",
      author: { name: "Sarah Rahman", avatar: "https://i.pravatar.cc/100?img=1" },
      date: "December 22, 2025",
      readTime: "6 min read",
    },
    {
      id: 7,
      title: "Creating an Asset Return Policy That Works",
      excerpt:
        "A comprehensive guide to developing and implementing an effective asset return policy for your organization.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
      category: "HR Tips",
      author: { name: "Ahmed Khan", avatar: "https://i.pravatar.cc/100?img=3" },
      date: "December 18, 2025",
      readTime: "5 min read",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularTags = [
    "Asset Tracking",
    "HR Management",
    "Inventory",
    "Employee Onboarding",
    "Return Policy",
    "Audit",
    "Compliance",
    "ROI",
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
            <span className="badge badge-primary badge-lg mb-4">
              <FiBookOpen className="w-4 h-4 mr-1" />
              Blog & Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & <span className="text-primary">Best Practices</span>
            </h1>
            <p className="text-lg text-base-content/70 mb-8">
              Expert advice, industry trends, and practical tips to help you master
              asset management and streamline your HR operations.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-12 pr-4 py-3"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-base-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn btn-sm ${
                  activeCategory === category
                    ? "btn-primary"
                    : "btn-ghost bg-base-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card lg:card-side bg-base-100 shadow-xl overflow-hidden group"
          >
            <figure className="lg:w-1/2">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="card-body lg:w-1/2 p-8 lg:p-12 justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-secondary">{featuredPost.category}</span>
                <span className="badge badge-outline badge-primary">Featured</span>
              </div>
              <h2 className="card-title text-2xl lg:text-3xl mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-base-content/70 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{featuredPost.author.name}</p>
                    <p className="text-xs text-base-content/60">{featuredPost.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-base-content/60">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary gap-2">
                  Read Article
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts Grid */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <span className="text-base-content/60">
                  {filteredPosts.length} articles
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="card bg-base-100 p-12 text-center">
                  <FiSearch className="w-12 h-12 mx-auto text-base-content/30 mb-4" />
                  <h3 className="text-lg font-bold mb-2">No articles found</h3>
                  <p className="text-base-content/60">
                    Try adjusting your search or category filter.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
                    >
                      <figure className="overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </figure>
                      <div className="card-body p-6">
                        <span className="badge badge-primary badge-sm">
                          {post.category}
                        </span>
                        <h3 className="card-title text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-base-content/70 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="w-8 rounded-full">
                                <img src={post.author.avatar} alt={post.author.name} />
                              </div>
                            </div>
                            <span className="text-sm font-medium">{post.author.name}</span>
                          </div>
                          <span className="text-xs text-base-content/60 flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="btn btn-outline btn-primary btn-wide">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              {/* Newsletter */}
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="card-title">Subscribe to Newsletter</h3>
                  <p className="text-primary-content/80 text-sm">
                    Get the latest insights delivered to your inbox weekly.
                  </p>
                  <div className="form-control mt-4">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="input bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/50"
                    />
                  </div>
                  <button className="btn bg-primary-content text-primary hover:bg-primary-content/90 mt-2">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg">
                    <FiTag className="w-5 h-5" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        className="btn btn-sm btn-ghost bg-base-200 hover:bg-primary hover:text-primary-content"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg">
                    <FiTrendingUp className="w-5 h-5" />
                    Trending Now
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {blogPosts.slice(0, 4).map((post, index) => (
                      <li key={post.id} className="flex gap-3 group cursor-pointer">
                        <span className="text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors">
                          0{index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-base-content/60 mt-1">
                            {post.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
