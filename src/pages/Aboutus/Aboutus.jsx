import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AboutUs.css";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero__overlay">
          <h1 className="aboutus-hero__title" data-aos="fade-right">
            About Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="aboutus-content">
        <div className="aboutus-content__header" data-aos="fade-up">
          <h2>🌿 Our Vision – Bridging Nature and Technology for a Healthier Tomorrow</h2>
        </div>

        <div className="aboutus-content__cards">
          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="100">
            <h4>Promote Natural Healing</h4>
            <p>
              Reintroduce the power of traditional herbs and natural remedies in modern lifestyles through interactive learning.
            </p>
          </div>

          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="200">
            <h4>Make Herbal Knowledge Accessible</h4>
            <p>
              Create a user-friendly platform where anyone can explore, understand, and benefit from medicinal plants and their uses.
            </p>
          </div>

          <div className="aboutus-content__card" data-aos="fade-up" data-aos-delay="300">
            <h4>Foster Eco-conscious Living</h4>
            <p>
              Encourage sustainable wellness and environmental awareness by connecting people digitally with nature’s healing bounty.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
