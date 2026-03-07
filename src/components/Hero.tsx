import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Import your additional hero images here (add more as needed)

const images = ["/img_1.png", "/img_48.png", "/img_88.png"];

const subtitles = [
  "Where luxury meets nature's embrace.",
  "Discover serenity in pristine tropical forests.",
  "An eco-friendly haven awaits you.",
  "Escape to tranquility and natural beauty.",
  "Indulge in ultimate relaxation surrounded by paradise.",
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Image slideshow (auto-advance every 8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for rotating subtitles
  useEffect(() => {
    const currentFullText = subtitles[currentSubtitleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000); // pause before deleting
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 1) {
          setIsDeleting(false);
          setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }
      }
    }, isDeleting ? 50 : 80); // faster delete, slower type

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentSubtitleIndex]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`La Roza Nature Resort - View ${index + 1}`}
            className="
    absolute inset-0
    w-full h-full
    object-cover object-center
    transition-opacity duration-1000 ease-in-out
  "
            style={{
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        {/* Lighter overlay - reduced from 60% to 30% */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury px-4 md:px-8 text-center text-wood-cream">
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <span className="text-label text-secondary mb-4 block drop-shadow-lg">
            Welcome to
          </span>
        </div>

        <h1
          className="heading-display mb-6 animate-fade-up drop-shadow-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          La Roza Nature Resort
        </h1>

        {/* Typewriter subtitle */}
        <p
          className="text-elegant text-wood-cream/90 max-w-2xl mx-auto mb-8 h-20 animate-fade-up drop-shadow-lg"
          style={{ animationDelay: "0.6s" }}
        >
          <span>{displayedText}</span>
          <span className="inline-block w-1 h-6 bg-wood-cream/80 ml-1 animate-pulse" />
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            to="/booking"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
          >
            Book Room
          </Link>
          <Link
            to="/rooms"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 inline-flex items-center"
          >
            Explore Rooms
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-wood-cream/70 hover:text-secondary transition-colors animate-bounce drop-shadow-lg"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}