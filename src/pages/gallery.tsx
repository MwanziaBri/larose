import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [videoStates, setVideoStates] = useState<{ playing: boolean, muted: boolean }[]>([
        { playing: false, muted: true },
        { playing: false, muted: true },
        { playing: false, muted: true }
    ]);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Featured videos (replace with your actual video URLs)
    const featuredVideos = [
        '/vid_1.mp4',
        '/vid_2.mp4',
        '/vid_3.mp4'
    ];

    // Dynamically gather all gallery images from the public folder

    useEffect(() => {
        const loadImages = async () => {
            const urls: string[] = [];
            let consecutiveMisses = 0;
            let index = 1;
            const maxIndex = 200; // hard limit just in case
            const maxMisses = 20; // stop after this many missing files in a row
            const extensions = ["png", "jpeg", "jpg"];

            while (index <= maxIndex && consecutiveMisses < maxMisses) {
                // skip unwanted files explicitly
                if ([42, 43, 44].includes(index)) {
                    index += 1;
                    consecutiveMisses = 0; // reset so the skip doesn't count as a missing file
                    continue;
                }

                let foundForIndex = false;

                for (const ext of extensions) {
                    const url = `/img_${index}.${ext}`;
                    try {
                        const res = await fetch(url, { method: "HEAD" });
                        if (res.ok) {
                            urls.push(url);
                            foundForIndex = true;
                            break;
                        }
                    } catch (err) {
                        // network error, ignore and try next ext
                    }
                }

                if (foundForIndex) {
                    consecutiveMisses = 0;
                } else {
                    consecutiveMisses += 1;
                }
                index += 1;
            }

            setImages(urls);
        };

        loadImages();
    }, []);

    // Handle video play/pause
    const toggleVideo = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        setVideoStates(prev => {
            const newStates = [...prev];

            if (newStates[index].playing) {
                video.pause();
            } else {
                // Pause all other videos
                videoRefs.current.forEach((vid, i) => {
                    if (vid && i !== index && videoStates[i].playing) {
                        vid.pause();
                        newStates[i] = { ...newStates[i], playing: false };
                    }
                });
                video.play().catch(console.error);
            }

            newStates[index] = {
                ...newStates[index],
                playing: !newStates[index].playing
            };
            return newStates;
        });
    };

    // Handle video mute/unmute
    const toggleMute = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        video.muted = !video.muted;
        setVideoStates(prev => {
            const newStates = [...prev];
            newStates[index] = {
                ...newStates[index],
                muted: video.muted
            };
            return newStates;
        });
    };

    // Navigation functions for lightbox
    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + images.length) % images.length);
        }
    };

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        if (selectedImage !== null) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 md:pt-32 pb-8 md:pb-12 min-h-[40vh] flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="/img_24.png"
                        alt="La Roza Nature Resort"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
                </div>
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center text-white max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
                            Photo & Video Gallery
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 opacity-90 mb-6 md:mb-8 px-2">
                            Experience La Roza Nature through stunning visuals and captivating videos
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">
                                {images.length}+ photos
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">
                                3 featured videos
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Videos Section */}
            <section className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Featured Videos
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto px-2">
                            Watch our resort come to life through these captivating videos
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredVideos.map((src, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl bg-black"
                            >
                                {/* Video Container */}
                                <div className="relative aspect-video">
                                    <video
                                        ref={el => { videoRefs.current[index] = el; }}
                                        src={src}
                                        className="w-full h-full object-cover"
                                        loop
                                        muted={videoStates[index].muted}
                                        playsInline
                                        preload="metadata"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Video Controls Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleVideo(index)}
                                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
                                                >
                                                    {videoStates[index].playing ? (
                                                        <Pause className="w-5 h-5 text-white" />
                                                    ) : (
                                                        <Play className="w-5 h-5 text-white" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => toggleMute(index)}
                                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
                                                >
                                                    {videoStates[index].muted ? (
                                                        <VolumeX className="w-5 h-5 text-white" />
                                                    ) : (
                                                        <Volume2 className="w-5 h-5 text-white" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="text-white/80 text-sm">
                                                Click to {videoStates[index].playing ? 'pause' : 'play'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Play Button Overlay (when paused) */}
                                    {!videoStates[index].playing && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={() => toggleVideo(index)}
                                                className="bg-primary/90 hover:bg-primary rounded-full p-4 transition-all transform hover:scale-105"
                                            >
                                                <Play className="w-8 h-8 text-white" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Video Title Overlay */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                            Video {index + 1}
                                        </span>
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                        {index === 0 && "Resort Tour"}
                                        {index === 1 && "Pool & Wellness"}
                                        {index === 2 && "Nature Experience"}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {index === 0 && "A comprehensive tour of our luxury accommodations and facilities"}
                                        {index === 1 && "Relaxation and leisure at our infinity pool and spa area"}
                                        {index === 2 && "Immerse yourself in the breathtaking natural surroundings"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Instructions */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-sm">
                            Click the play button to start videos. Videos will auto-loop.
                        </p>
                    </div>
                </div>
            </section>

            {/* Full Gallery Section */}
            <section className="py-8 md:py-12 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                            Photo Gallery
                        </h2>
                        <p className="text-gray-600">
                            Browse through all our high-quality images
                        </p>
                    </div>

                    {/* Responsive Gallery Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                    <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Image Number */}
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Count & Info */}
                    <div className="text-center mt-12">
                        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="text-center sm:text-left">
                                <p className="text-gray-900 font-semibold text-lg">
                                    {images.length} High-Quality Images
                                </p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Plus 3 immersive videos showcasing our resort
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="mt-2 sm:mt-0"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Back to Videos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Lightbox - Responsive */}
            {selectedImage !== null && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 sm:p-4">
                    {/* Close button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/50 rounded-full"
                    >
                        <X className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/50 rounded-full"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/50 rounded-full"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>

                    {/* Image Container */}
                    <div className="relative w-full max-w-full max-h-full flex items-center justify-center">
                        <img
                            src={images[selectedImage]}
                            alt={`Gallery image ${selectedImage + 1}`}
                            className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded"
                        />

                        {/* Image number - Responsive */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                            <span className="hidden sm:inline">Image </span>{selectedImage + 1} of {images.length}
                        </div>
                    </div>

                    {/* Mobile-friendly instructions */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:block">
                        <p className="text-white/70 text-sm">
                            Use ← → keys or click arrows to navigate
                        </p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default GalleryPage;