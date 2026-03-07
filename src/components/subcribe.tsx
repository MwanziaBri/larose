import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const NewsletterSubscribe = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://larozanatureresort.com/server/new.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    source: 'website_newsletter',
                    subscribedAt: new Date().toISOString()
                })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server error");
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message || "Subscription failed");
            }

            toast.success("Thank you! You've successfully subscribed.");
            setEmail("");
        } catch (error) {
            console.error('Newsletter error:', error);
            let errorMsg = "Subscription failed. Please try again.";

            if (error instanceof Error && error.message.includes("already subscribed")) {
                errorMsg = "You're already subscribed!";
            }

            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-wood-dark text-wood-cream">
            <div className="container-luxury px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="heading-section mb-4">
                        Stay Connected with La Roza
                    </h2>
                    <p className="text-lg md:text-xl text-wood-cream/80 mb-10 max-w-2xl mx-auto">
                        Be the first to receive exclusive offers, seasonal updates, and special announcements from our nature retreat.
                    </p>

                    {/* Form Card - Clean, solid background, no gradients */}
                    <div className="bg-wood-cream text-wood-dark p-8 md:p-10 rounded-xl shadow-elevated">
                      

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 bg-white border-wood-dark/20 text-wood-dark placeholder:text-gray-500 focus-visible:ring-secondary focus-visible:ring-2 h-14 text-lg px-6"
                                required
                                disabled={isSubmitting}
                            />

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium h-14 px-8 whitespace-nowrap transition-all"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Mail className="w-5 h-5 mr-2" />
                                        Subscribe
                                    </>
                                )}
                            </Button>
                        </form>

                  
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSubscribe;