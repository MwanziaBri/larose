import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        { src: "img_89.png", alt: "Infinity pool overlooking the forest" },
        { src: "img_88.png", alt: "Luxury lodge interior" }
    ];

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => prev === images.length - 1 ? 0 : prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="section-padding bg-muted/30">
            <div className="container-luxury">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Slider */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-lg shadow-elevated">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                        }`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ))}

                            {/* Dots at bottom */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-card hidden md:block">
                            <p className="font-display text-3xl">15+</p>
                            <p className="text-sm">Years of Excellence</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <span className="text-label text-secondary">About Us</span>
                        <h2 className="heading-section text-foreground">
                            A Sanctuary Where Nature & Luxury Unite
                        </h2>
                        <p className="text-body text-muted-foreground">
                             La Roza Nature Resort offers
                            an unparalleled escape from the ordinary. Our eco-luxury lodges,
                            crafted entirely from sustainable wood, provide the perfect harmony
                            between refined comfort and natural beauty.
                        </p>
                        <p className="text-body text-muted-foreground">
                            Since 2009, we've been welcoming guests seeking authentic experiences,
                            world-class dining, and the restorative power of nature. Every detail
                            is thoughtfully designed to create memories that last a lifetime.
                        </p>
                        <Link
                            to="/booking"
                            className="btn-outline inline-flex items-center gap-2"
                        >
                            Make reservations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;