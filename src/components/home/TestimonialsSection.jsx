import { motion } from "motion/react";
import { FiStar } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rafiq Ahmed",
      role: "HR Director",
      company: "TechBangla Ltd.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "AssetVerse transformed how we manage our IT equipment. Before, we used spreadsheets and lost track of assets constantly. Now everything is organized and employees can request what they need instantly.",
    },
    {
      id: 2,
      name: "Fatima Rahman",
      role: "Operations Manager",
      company: "Dhaka Innovations",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "The approval workflow is brilliant. I can review and approve asset requests from my phone. Our team productivity has improved significantly since we started using AssetVerse.",
    },
    {
      id: 3,
      name: "Kamal Hossain",
      role: "CEO",
      company: "GreenTech BD",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      text: "As a growing startup, we needed something simple yet powerful. AssetVerse's pricing is perfect for us - we started with 5 employees and easily upgraded as we grew. Highly recommended!",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      role: "Admin Lead",
      company: "Chittagong Exports",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      text: "Managing assets across multiple offices was a nightmare before AssetVerse. Now I have complete visibility into every laptop, chair, and piece of equipment we own. Game changer!",
    },
    {
      id: 5,
      name: "Imran Khan",
      role: "IT Manager",
      company: "Digital Solutions BD",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      text: "The analytics feature helps me make data-driven decisions about our IT purchases. I can see which assets are most requested and plan accordingly. Excellent platform!",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-base-200/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Trusted by Companies{" "}
            <span className="text-primary">Across Bangladesh</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            See what HR managers and business owners say about their experience
            with AssetVerse.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-base-100 rounded-2xl p-6 lg:p-8 border border-base-200 h-full flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="h-5 w-5 fill-warning text-warning"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base-content/80 leading-relaxed flex-grow mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-base-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-base-content/60">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
