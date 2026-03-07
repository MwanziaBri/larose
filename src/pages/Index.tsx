import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RoomCard } from "@/components/RoomCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Link } from "react-router-dom";
import {
  ArrowRight, Leaf, Mountain, Utensils, Sparkles, Play,
  Calendar, Users, Music, Camera, Heart, GlassWater
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import AboutSection from "@/components/aboutsection";
const rooms = [

  {
    name: "Musizi",
    description: "Elegant room featuring traditional design elements and modern comfort. Inspired by the Muwafu tree, known for its resilience and beauty in Ugandan folklore.",
    price: 38,
    image: "/img_11.png",
    video: "/vid_11.mp4",
    guests: 2,
    size: "38 m²",
    beds: "1 King Bed",
    view: "Garden View",
    amenities: [
      "Private Balcony",
      "Rain Shower",
      "Personal Butler Service",
      "King Size Bed",
      "Separate Living Area",
      "Garden View",
      "Complimentary Minibar",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Evening Turndown Service",
      "Welcome Fruits",
      "Premium Toiletries"
    ],
    highlights: ["Honeymoon Favorite", "Butler Service", "Garden Views"]
  },
  {
    name: "Muvule",
    description: "Luxurious room with premium finishes and stunning forest views. Named after the mighty Muvule tree (Milicia excelsa), prized for its durable and beautiful timber.",
    price: 68,
    image: "/img_16.png",
    video: "/vid_10.mp4",
    guests: 2,
    size: "42 m²",
    beds: "1 King Bed + Sitting Area",
    view: "Panoramic Forest View",
    amenities: [
      "Panoramic Forest View",
      "Luxury Bathroom with Tub",
      "Separate Sitting Area",
      "King Size Bed",
      "Premium Minibar",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Evening Turndown Service",
      "Welcome Fruits & Wine",
      "Premium Toiletries",
      "Work Desk",
      "Blackout Curtains"
    ],
    highlights: ["Luxury Finish", "Forest Views", "Premium Amenities"]
  },

  
  {
    name: "Jambula (Family Room)",
    description: "Spacious family suite with private balcony overlooking the tropical forest canopy. Perfect for families or groups. Named after the Jambula tree, known for its delicious fruits that bring families together during harvest.",
    price: 98,
    image: "/img_87.png",
    video: "/vid_6.mp4",
    guests: 4,
    size: "55 m²",
    beds: "1 King Bed + 2 Twin Beds",
    view: "Forest Valley View",
    amenities: [
      "Two Separate Bedrooms",
      "Large Living Area",
      "Kitchenette",
      "Outdoor Dining on Balcony",
      "Children's Welcome Gift",
      "Family Board Games",
      "Baby Cot Available",
      "Extra Storage Space",
      "Two Bathrooms",
      "Child Safety Features",
      "Microwave & Fridge",
      "Dining Table",
      "Forest View",
      "Private Balcony",
      "Butler Service"
    ],
    highlights: ["Family-Friendly", "Spacious", "Child Amenities", "Group Stay"]
  }
];

const testimonials = [
  {
    name: "Sarah Nakirijja",
    location: "Kampala, Uganda",
    text: "An absolutely magical experience! The wooden lodges blend seamlessly with nature. Waking up to bird songs and forest views was unforgettable.",
    rating: 5,
  },
  {
    name: "James Chen",
    location: "Singapore",
    text: "The restaurant serves the most exquisite farm-to-table cuisine. Staff went above and beyond to make our anniversary special.",
    rating: 5,
  },
  {
    name: "Emma Laurent",
    location: "Paris, France",
    text: "True luxury in harmony with nature. The spa treatments using local herbs were rejuvenating. Can't wait to return!",
    rating: 5,
  },
];

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable practices and locally sourced materials throughout our resort.",
  },
  {
    icon: Mountain,
    title: "Pristine Nature",
    description: "Surrounded by 50 acres of protected tropical forest and mountain views.",
  },
  {
    icon: Utensils,
    title: "Farm to Table",
    description: "Fresh, organic cuisine prepared by award-winning chefs daily.",
  },
  {
    icon: Sparkles,
    title: "Wellness & Spa",
    description: "Holistic treatments inspired by ancient traditions and local healing herbs.",
  },
];

const Index = () => {
  // Display only first 3 rooms on homepage
  const featuredRooms = rooms.slice(0, 3);
  const videoRef = useRef(null);
  const eventsVideoRef = useRef(null);
  const sectionRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [eventsHasPlayed, setEventsHasPlayed] = useState(false);

  // Autoplay testimonial video when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && videoRef.current) {
            videoRef.current.play();
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  // Autoplay events video when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !eventsHasPlayed && eventsVideoRef.current) {
            eventsVideoRef.current.play();
            setEventsHasPlayed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (eventsSectionRef.current) {
      observer.observe(eventsSectionRef.current);
    }

    return () => {
      if (eventsSectionRef.current) {
        observer.unobserve(eventsSectionRef.current);
      }
    };
  }, [eventsHasPlayed]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <Hero />
      {/* About Preview */}
      <AboutSection />

      {/* Rooms Preview */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-label text-secondary">Accommodations</span>
            <h2 className="heading-section text-foreground mt-2 mb-4">
              Rooms & Suites
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Each room is a private sanctuary, featuring natural wood interiors,
              luxury amenities, and breathtaking forest views.
            </p>
            <div className="divider-elegant mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.name} {...room} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/rooms"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Rooms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Preview */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="img_10.png"
            alt="Fine dining restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wood-dark/80" />
        </div>
        <div className="container-luxury relative z-10">
          <div className="max-w-2xl text-wood-cream">
            <span className="text-label text-secondary">Dining</span>
            <h2 className="heading-section mt-2 mb-6">
              The Canopy Restaurant
            </h2>
            <p className="text-body text-wood-cream/80 mb-6">
              Indulge in exquisite farm-to-table cuisine prepared by our award-winning
              chefs. With panoramic forest views and locally sourced ingredients,
              every meal becomes an unforgettable culinary journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/restaurant" className="btn-secondary inline-flex items-center gap-2">
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/booking" className="btn-hero inline-flex items-center gap-2">
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </section>
      

      {/* Testimonials with Autoplay Video */}
      <section ref={sectionRef} className="section-padding bg-muted/30">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-label text-secondary">Testimonials</span>
            <h2 className="heading-section text-foreground mt-2 mb-4">
              Guest Experiences
            </h2>
            <div className="divider-elegant" />
          </div>

          {/* Video Testimonial - Autoplay on scroll */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="w-full h-[400px] object-cover"
                poster="/testimonial-thumb.jpg"
              >
                <source src="/vid_4.mp4" type="video/mp4" />
              </video>

              {/* Gradient overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Text overlay */}
              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <p className="text-sm font-medium text-amber-400 mb-1">GUEST STORY</p>
                <p className="text-white/80">"A magical getaway in nature"</p>
              </div>

              {/* Small play/pause indicator */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                ▶️ Playing
              </div>
            </div>
          </div>

          {/* Regular testimonial cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SECTION - Video on Left, Text on Right (AFTER Testimonials) */}
      

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury text-center">
          <h2 className="heading-section mb-4">
            Begin Your Nature Escape
          </h2>
          <p className="text-body opacity-90 max-w-xl mx-auto mb-8">
            Reserve your sanctuary today and experience the perfect blend
            of luxury, tranquility, and natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="btn-secondary">
              Book Your Stay
            </Link>
            <a
              href="https://www.booking.com/hotel/ug/la-roza-nature-resort.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
            >
              Book on Booking.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;