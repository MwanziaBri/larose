import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Wine, Coffee, Pizza, Sandwich, Fish, UtensilsCrossed, Salad, Beef, ChefHat, Flame, Leaf, GlassWater, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Restaurant = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    // Food and drink categories with featured images
    const categories = [
        {
            id: "breakfast",
            name: "Morning Delights",
            icon: <Coffee className="w-5 h-5" />,
            description: "Start your day right with our fresh breakfast selection",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
            items: [
                { name: "Traditional African Breakfast", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
                { name: "English Breakfast Platter", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80" },
                { name: "Fresh Baked Pastries", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" },
            ],
            color: "from-amber-500/20 to-orange-500/20"
        },
        {
            id: "cocktails",
            name: "Signature Cocktails",
            icon: <Wine className="w-5 h-5" />,
            description: "Handcrafted drinks with premium spirits",
            image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
            items: [
                { name: "Tropical Sunset Margarita", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
                { name: "Forest Berry Cosmopolitan", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
                { name: "Spiced Ginger Mule", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },

            ],
            color: "from-purple-500/20 to-pink-500/20"
        },
        {
            id: "starters",
            name: "Fresh Starters",
            icon: <Salad className="w-5 h-5" />,
            description: "Light bites to awaken your palate",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
            items: [
                { name: "Garden Fresh Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
                { name: "Homemade Soups", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
                { name: "Crispy Vegetable Samosas", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80" },

            ],
            color: "from-green-500/20 to-emerald-500/20"
        },
        {
            id: "pizza",
            name: "Wood-Fired Pizza",
            icon: <Pizza className="w-5 h-5" />,
            description: "Crispy, thin-crust pizzas from our stone oven",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
            items: [
                { name: "Classic Margherita", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
                { name: "Forest Mushroom Delight", image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80" },
                { name: "Spicy Chicken Supreme", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },

            ],
            color: "from-red-500/20 to-orange-500/20"
        },
        {
            id: "burgers",
            name: "Gourmet Burgers",
            icon: <Beef className="w-5 h-5" />,
            description: "Juicy burgers with house-made sauces",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
            items: [
                { name: "Signature Beef Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80" },
                { name: "Crispy Chicken Burger", image: "https://images.unsplash.com/photo-1606755962773-d324e166a853?w=400&q=80" },
                { name: "Fresh Fish Fillet Burger", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" },

            ],
            color: "from-amber-700/20 to-yellow-600/20"
        },
        {
            id: "sandwiches",
            name: "Artisan Sandwiches",
            icon: <Sandwich className="w-5 h-5" />,
            description: "Freshly made sandwiches on artisan bread",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
            items: [
                { name: "Chicken Club Sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80" },
                { name: "Premium Beef Sandwich", image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&q=80" },
                { name: "Fresh Tuna Special", image: "https://images.unsplash.com/photo-1553909489-cd47ac30e1b1?w=400&q=80" },

            ],
            color: "from-yellow-500/20 to-amber-500/20"
        },
        {
            id: "pasta",
            name: "Italian Classics",
            icon: <UtensilsCrossed className="w-5 h-5" />,
            description: "Fresh pasta dishes made daily",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
            items: [
                { name: "Spaghetti Bolognese", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80" },
                { name: "Creamy Carbonara", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
                { name: "Spicy Arrabbiata", image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80" },

            ],
            color: "from-blue-500/20 to-indigo-500/20"
        },
        {
            id: "seafood",
            name: "Fresh Seafood",
            icon: <Fish className="w-5 h-5" />,
            description: "Daily catch from local waters",
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
            items: [
                { name: "Whole Fried Fish", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" },
                { name: "Steamed Fish Fillet", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
                { name: "Spicy Fish Curry", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" },

            ],
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            id: "drinks",
            name: "Refreshments",
            icon: <GlassWater className="w-5 h-5" />,
            description: "Fresh juices and premium beverages",
            image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
            items: [
                { name: "Fresh Fruit Juices", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80" },
                { name: "Premium Imported Beers", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
                { name: "Local Craft Beers", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },

            ],
            color: "from-cyan-500/20 to-teal-500/20"
        }
    ];

    // Featured highlights
    const highlights = [
        {
            title: "Farm to Table",
            description: "Fresh ingredients sourced from local farms",
            icon: <Leaf className="w-6 h-6" />,
            color: "text-green-600 bg-green-100"
        },
        {
            title: "Handcrafted",
            description: "Each dish prepared with care and attention",
            icon: <ChefHat className="w-6 h-6" />,
            color: "text-amber-600 bg-amber-100"
        },
        {
            title: "Wood-Fired",
            description: "Authentic flavors from our stone oven",
            icon: <Flame className="w-6 h-6" />,
            color: "text-red-600 bg-red-100"
        },
        {
            title: "Premium Spirits",
            description: "Selection of fine wines and spirits",
            icon: <Sparkles className="w-6 h-6" />,
            color: "text-purple-600 bg-purple-100"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-wood-cream/10 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/10" />
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
                    </div>
                </div>
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
                            <UtensilsCrossed className="w-6 h-6" />
                            <span className="text-lg font-medium">Culinary Experience</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                            La Roza <span className="text-primary">Restaurant</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                            Where every dish tells a story, and every drink creates a memory
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="btn-primary">
                                View Our Menu
                            </Button>
                            <Button size="lg" variant="outline">
                                Make Reservation
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((highlight, index) => (
                            <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className={`inline-flex p-3 rounded-xl ${highlight.color} mb-4`}>
                                    {highlight.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                                <p className="text-gray-600">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-8 sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Explore Our Menu</h2>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                            <Button
                                variant={activeCategory === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory("all")}
                                className="whitespace-nowrap"
                            >
                                All Categories
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={activeCategory === category.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveCategory(category.id)}
                                    className="whitespace-nowrap flex items-center gap-2"
                                >
                                    {category.icon}
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    {/* All Categories View */}
                    {activeCategory === "all" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} z-0 opacity-60`} />
                                        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                                            <div className="text-center">
                                                <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-xl mb-4">
                                                    {category.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{category.name}</h3>
                                                <p className="text-white/90 text-sm mt-2">{category.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="p-6 bg-white">
                                        <div className="grid grid-cols-1 gap-3">
                                            {category.items.slice(0, 4).map((item, index) => (
                                                <div key={index} className="flex items-center gap-3 group/item">
                                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                                    <span className="text-gray-700 group-hover/item:text-primary transition-colors">
                                                        {typeof item === 'string' ? item : item.name}
                                                    </span>
                                                </div>
                                            ))}
                                            {category.items.length > 4 && (
                                                <div className="pt-2">
                                                    <span className="text-sm text-gray-500">
                                                        +{category.items.length - 4} more items
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Single Category View */
                        <div>
                            {categories
                                .filter(category => category.id === activeCategory)
                                .map((category) => (
                                    <div key={category.id} className="max-w-6xl mx-auto">
                                        {/* Category Header */}
                                        <div className="text-center mb-12">
                                            <div className="inline-flex items-center gap-3 mb-4">
                                                <div className="p-3 bg-primary/10 rounded-xl">
                                                    {category.icon}
                                                </div>
                                                <h2 className="text-4xl font-bold text-gray-900">{category.name}</h2>
                                            </div>
                                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                                {category.description}
                                            </p>
                                        </div>

                                        {/* Items Grid with Images */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Left Column: Featured Image */}
                                            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50`} />
                                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                                    <div className="text-center text-white">
                                                        <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">Our Specialties</h3>
                                                        <p className="text-lg opacity-90">Carefully crafted for your enjoyment</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Items List */}
                                            <div className="space-y-6">
                                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border">
                                                    <h4 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b">
                                                        Featured Items
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {category.items.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start gap-3 p-4 hover:bg-white rounded-lg transition-colors group relative overflow-hidden"
                                                            >
                                                                {typeof item === 'object' && item.image && (
                                                                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                                                        <img
                                                                            src={item.image}
                                                                            alt={typeof item === 'string' ? item : item.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 relative z-10" />
                                                                <div className="relative z-10">
                                                                    <h5 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                                                        {typeof item === 'string' ? item : item.name}
                                                                    </h5>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        Freshly prepared with premium ingredients
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Additional Info */}
                                                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">About This Category</h4>
                                                    <p className="text-gray-600">
                                                        Each item in our {category.name.toLowerCase()} menu is carefully crafted by our chefs
                                                        using the finest ingredients. We focus on quality, flavor, and presentation
                                                        to ensure an unforgettable dining experience.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Item Images Gallery */}
                                        <div className="mt-12">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Menu Items Gallery</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                                                {category.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
                                                    >
                                                        {typeof item === 'object' && item.image ? (
                                                            <>
                                                                <img
                                                                    src={item.image}
                                                                    alt={typeof item === 'string' ? item : item.name}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <p className="text-sm font-medium">{typeof item === 'string' ? item : item.name}</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                                <span className="text-gray-500 text-sm text-center px-2">
                                                                    {typeof item === 'string' ? item : item.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Featured Drinks Section */}
                    <div className="mt-16 pt-16 border-t">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Signature Beverages</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                From handcrafted cocktails to premium wines and fresh juices
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                                <div className="text-purple-600 mb-4">
                                    <Wine className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Craft Cocktails</h3>
                                <ul className="space-y-2">
                                    <li className="text-gray-700">• Tropical Sunset Margarita</li>
                                    <li className="text-gray-700">• Forest Berry Cosmopolitan</li>
                                    <li className="text-gray-700">• Spiced Ginger Mule</li>
                                    <li className="text-gray-700">• Classic La Roza Martini</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                                <div className="text-blue-600 mb-4">
                                    <GlassWater className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fresh Juices</h3>
                                <ul className="space-y-2">
                                    <li className="text-gray-700">• Fresh Watermelon Juice</li>
                                    <li className="text-gray-700">• Tropical Pineapple Blend</li>
                                    <li className="text-gray-700">• Passion Fruit Delight</li>
                                    <li className="text-gray-700">• Avocado Milk Shake</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                                <div className="text-amber-600 mb-4">
                                    <Coffee className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hot Beverages</h3>
                                <ul className="space-y-2">
                                    <li className="text-gray-700">• African Tea Blend</li>
                                    <li className="text-gray-700">• Premium Coffee Selection</li>
                                    <li className="text-gray-700">• Herbal Infusions</li>
                                    <li className="text-gray-700">• Ginger & Lemon Tea</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-20 bg-gradient-to-r from-primary/5 via-white to-secondary/5">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            The La Roza Dining Experience
                        </h2>
                        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                            Join us for more than just a meal. Experience our passion for food,
                            our commitment to quality, and our warm hospitality in every visit.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button size="lg" className="btn-primary">
                                View Full Menu
                            </Button>
                            <Button size="lg" variant="outline">
                                Book Your Table
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Restaurant;