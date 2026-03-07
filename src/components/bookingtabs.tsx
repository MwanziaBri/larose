// components/BookingTabs.jsx
import { BookingForm } from "@/components/BookingForm";
import {
    ExternalLink,
    Calendar,
    Clock,
    Shield,
    CheckCircle,
    DollarSign,
    Users,
    Home,
    Package,
    Star,
    Heart
} from "lucide-react";

const BookingTabs = ({
    rooms = [], // Pass rooms data
    showHero = true,
    showExternalBooking = true,
    title = "Book Your Stay",
    subtitle = "Reserve your room and begin your journey to tranquility.",
    compact = false // For smaller displays
}) => {
    const bookingBenefits = [
        { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "Best price guarantee" },
        { icon: <Calendar className="w-4 h-4 text-blue-500" />, text: "Flexible check-in/out based on availability" },
        { icon: <Package className="w-4 h-4 text-purple-500" />, text: "Welcome drink & fruit basket on arrival" },
        { icon: <Heart className="w-4 h-4 text-red-500" />, text: "Complimentary nature walk for 3+ night stays" },
        { icon: <Star className="w-4 h-4 text-amber-500" />, text: "Priority upgrade consideration" },
        { icon: <Users className="w-4 h-4 text-secondary" />, text: "Personalized concierge service" }
    ];

    const bookingPolicies = [
        { icon: <Clock className="w-4 h-4" />, text: "Check-in: 3:00 PM | Check-out: 11:00 AM" },
        { icon: <DollarSign className="w-4 h-4" />, text: "30% deposit required to confirm booking" },
        { icon: <Shield className="w-4 h-4" />, text: "Free cancellation up to 72 hours before arrival" },
        { icon: <Users className="w-4 h-4" />, text: "Children under 5 years stay free" },
        { icon: <Home className="w-4 h-4" />, text: "Extra bed available for $30 per night" },
        { icon: <Calendar className="w-4 h-4" />, text: "Minimum 1-night stay required" }
    ];

    return (
        <div className="flex justify-center">
            <div className={compact ? "w-full max-w-2xl" : "w-full max-w-4xl"}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                 

                    {/* Main Content - Centered Form */}
                    <div className="p-6 md:p-8">
                        <div className="flex justify-center">
                            <div className="w-full max-w-2xl">
                                <div className="mb-8 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Complete Your Booking
                                    </h3>
                                    <p className="text-gray-600">
                                        Fill out the form below and our team will confirm your booking within 24 hours.
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <BookingForm rooms={rooms} />
                                    </div>
                                </div>
                            </div>
                        </div>

                     

                      
                    </div>
                </div>

             
            </div>
        </div>
    );
};

export default BookingTabs;