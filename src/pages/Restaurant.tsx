import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Wine, Coffee, Pizza, Sandwich, Fish, UtensilsCrossed, Salad, Beef, ChefHat, Flame, Leaf, GlassWater, Sparkles, Cake, IceCream, Milk, Soup, Drumstick, Cookie, Apple, Carrot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Restaurant = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Masaka La roza Resort Menu Data
  const menuData = [
    {
      id: "breakfast",
      name: "Breakfast",
      icon: <Coffee className="w-5 h-5" />,
      description: "Start your day with our traditional and international breakfast options",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
      items: [
        { name: "Scrambled Eggs", price: "25,000", description: "Toasted breads, scrambled eggs, potato wedges, avocado slices, grilled mushroom, garnish of simsim and olive oil" },
        { name: "English Sunrise", price: "30,000", description: "Boiled milk, hot water, 2 slices of bread, 2 mini pancakes, fried eggs and a pair of sausages" },
        { name: "Breakfast Sampler", price: "30,000", description: "A choice of eggs, 2 mini pancakes, beef sausages, potatoes and grilled tomato, comes with a cup of tea" },
        { name: "Healthy Treat", price: "25,000", description: "Flavored sweetened yoghurt, fruits, granola muesli and honey garnish" },
        { name: "Combo Special", price: "30,000", description: "Chicken tenders, pan-fried wedges, a choice of omelet, beef sausage and a cup of tea" },
        { name: "Fruit Salads", price: "15,000", description: "Fresh market fruit of Uganda pearl of Africa, in a bowl with side honey" },
        { name: "Fruit Platter", price: "15,000", description: "Assorted fresh seasonal fruits" },
      ],
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      id: "starters",
      name: "Starters",
      icon: <Soup className="w-5 h-5" />,
      description: "Light bites and comforting soups to awaken your palate",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744e7d?w=800&q=80", // Soup image
      items: [
        { name: "Meat Balls", price: "16,000", description: "Rounded meat balls well-seasoned, grilled till ready and served with salsa and pomodoro sauce" },
        { name: "Samosa", price: "10,000", description: "3 pcs of either beef/vegetable/chicken samosa, well fried to perfect served with sweet chili sauce" },
        // New Soups
        { name: "Mushroom Soup (Cream)", price: "20,000", description: "Rich and creamy mushroom soup made with fresh forest mushrooms, finished with a touch of cream and herbs" },
        { name: "Mushroom Soup (Clear)", price: "20,000", description: "Light and flavorful clear mushroom broth with sliced mushrooms and fresh herbs" },
        { name: "Vegetable Soup", price: "20,000", description: "Hearty vegetable soup with carrots, celery, potatoes, and seasonal vegetables in a savory broth" },
        { name: "Tomato Soup", price: "20,000", description: "Classic creamy tomato soup made with ripe tomatoes, basil, and a hint of cream" },
        { name: "Garlic Soup", price: "15,000", description: "Aromatic garlic soup with roasted garlic, herbs, and a touch of olive oil" },
        { name: "Sweet & Sour Soup", price: "15,000", description: "Tangy and flavorful soup with a perfect balance of sweet and sour notes" },
      ],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: "chicken",
      name: "Chicken Dishes",
      icon: <Drumstick className="w-5 h-5" />,
      description: "Delicious chicken prepared in various styles",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      items: [
        { name: "Special la-roza Full Chicken", price: "50,000", description: "A full chicken stuffed and grilled to perfection. Served with brown rice, potato wedges, coleslaw, salads and fries" },
        { name: "Pollo Limone", price: "48,000", description: "Lemon flavored chicken grilled in oven to perfection. Served with fries/wedges/mashed potatoes and house gravy" },
        { name: "Sticky Wings", price: "20,000", description: "Well grilled chicken wings toasted in house BBQ sauce. Served with fries/wedges/mashed potatoes and house salad" },
        { name: "Chicken Breast", price: "30,000", description: "Grilled chicken breast with herbs" },
        { name: "Chicken Stew", price: "30,000", description: "Hearty chicken stew with vegetables" },
      ],
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      id: "beef",
      name: "Beef Dishes",
      icon: <Beef className="w-5 h-5" />,
      description: "Premium beef dishes cooked to perfection",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
      items: [
        { name: "Beef Sizzling", price: "30,000", description: "Beef cubes boneless in house gravy, served on hot sizzler pan with fries/rice/mashed potatoes/naan" },
        { name: "Beef Stew/Pan-Fried", price: "30,000", description: "Beef in La roza stew with assorted vegetables served with rice/potatoes/boiled matooke/mashed potatoes" },
        { name: "Beef Skewers", price: "30,000", description: "Beef cubes well grilled on muchomo sticks, served with fries/wedges/rice/mashed potato and house BBQ sauce" },
        { name: "Steak Mignon", price: "30,000", description: "Grilled marinated steak served with potatoes and house gravy on caramelized vegetables" },
        { name: "Beef Liver Fried/Curry", price: "30,000", description: "Pan-fried liver/curry cooked at La roza standard, served with potato wedges/mashed potatoes/rice and house salad" },
        { name: "Beef Stroganoff", price: "30,000", description: "Tender beef strips in creamy mushroom sauce" },
      ],
      color: "from-amber-700/20 to-yellow-600/20"
    },
    {
      id: "goat",
      name: "Goat Dishes",
      icon: <Flame className="w-5 h-5" />,
      description: "Traditional goat dishes with authentic flavors",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
      items: [
        { name: "Goat Ribs (Embirizzi)", price: "35,000", description: "Well marinated goat ribs, grilled and served with potatoes and house gravy" },
        { name: "Goat Kebab", price: "30,000", description: "Boneless goat minced and grilled, served with wedges, two naan bread and house gravy/mint yoghurt and salsa" },
        { name: "Pan-Fried Goat/Stew", price: "30,000", description: "Goat rambles in La roza mother sauce, served with mashed potato/rice/wedges and house salads" },
        { name: "Goat Sizzling/Curry", price: "30,000", description: "Hot goat stew/sizzling in La roza gravy/curry, served hot on a pan with choice of accompaniment" },
        { name: "Goat Muchomo", price: "35,000", description: "Goat's meat deep fried/grilled with bell peppers, served with jacket wedges, gravy and chapatti" },
      ],
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: "fish",
      name: "Fish Dishes",
      icon: <Fish className="w-5 h-5" />,
      description: "Fresh fish from local waters",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      items: [
        { name: "Whole Fried Fish", price: "45,000", description: "Deep fried fish in La roza seasoning, served with any accompaniment" },
        { name: "Pan-Fried Fish/Stew", price: "50,000", description: "Pan-fried fish in La roza gravy, served with rice/posho/mashed potato and vegetable garnish" },
        { name: "Kabelo", price: "50,000", description: "Fish cooked in traditional Ugandan way with matooke" },
        { name: "Stuffed Fish", price: "50,000", description: "Marinated fresh fish from Iwera lakeside with assorted vegetables, baked in oven" },
        { name: "Grilled Fish Fillet", price: "45,000", description: "Grilled fish fillet served with caramelized vegetables and fries/wedges/mashed potato and house gravy" },
        { name: "Buttered Tilapia", price: "48,000", description: "Boneless coated tilapia fillet in butter, deep fried served on ice-berg salad and fries/wedges/mashed potato" },
        { name: "Fish Fingers", price: "40,000", description: "Crispy breaded fish strips served with dips" },
      ],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "indian",
      name: "Indian Cuisine",
      icon: <ChefHat className="w-5 h-5" />,
      description: "Authentic Indian flavors and spices",
      image: "/img_74.png",
      items: [
        { name: "Butter Chicken", price: "35,000", description: "Indian traditional chicken in creamy red curry sauce, seasoned with kasori methi, served with rice/naan" },
        { name: "Chicken Curry Tikka Masala", price: "35,000", description: "Chicken strips in Indian spices, roasted and cooked in Indian Bombay flavor" },
        { name: "Butter Naan", price: "25,000", description: "A pair of Indian flat bread, served with house gravy and crudités" },
        { name: "Coconut Rice", price: "28,000", description: "Coco-flavored rice served with house gravy" },
        { name: "Korma", price: "28,000", description: "Indian cream curry with choice of fish or chicken served with naan or rice" },
        { name: "Mutton or Chicken Pillau", price: "35,000", description: "Basmati long sella rice with pillau flavoring, served with choice of meat and house gravy" },
        { name: "Biryani", price: "35,000", description: "Indian biryani rice with shan spice with choice of mutton/chicken/vegetable" },
        { name: "Palak Chicken/Paneer", price: "30,000", description: "Creamy spinach with paneer, chicken or mutton, served with rice and naan" },
        { name: "Chicken Stew/Masala", price: "35,000", description: "Onion gravy and tomato gravy with chopped masala and cream, served with naan or rice" },
      ],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      id: "burgers",
      name: "Burgers",
      icon: <Sandwich className="w-5 h-5" />,
      description: "Gourmet burgers with house-made sauces",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
      items: [
        { name: "Beef Burger", price: "36,000", description: "Traditional beef patty decker with cheese, served with fries and house salad" },
        { name: "Chicken Crunchy Burger", price: "36,000", description: "Crunchy deep fried coated chicken fillet decker with lettuce and onion rings (no cheese)" },
        { name: "Stack-Up Billy", price: "45,000", description: "Double burger with cheese, onions rings, sautéed bells and fried eggs, served with fries and beef bacon/sausage" },
        { name: "Vegan Burger", price: "30,000", description: "Pounded assorted steamed vegetables seasoned and deep fried, served with fries (no cheese)" },
        { name: "Fish Burger", price: "40,000", description: "Grilled fish patty with lettuce, tomato and tartar sauce" },
      ],
      color: "from-amber-600/20 to-yellow-500/20"
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      icon: <Sandwich className="w-5 h-5" />,
      description: "Freshly made sandwiches on artisan bread",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
      items: [
        { name: "Club Sandwich", price: "40,000", description: "Double decker with chicken, beef steak, fried egg and cheese, served with fries (avocado optional)" },
        { name: "Philly Steak/Chicken Sandwich", price: "25,000", description: "Baguette bread with chicken or beef strips, veges and gouda/cheddar cheese, served with fries" },
        { name: "Chopped Chicken Sandwich", price: "30,000", description: "Single decker of grilled diced chicken breast with BBQ mayo, celery and grated apple" },
        { name: "Sautéed Vegan Sandwich", price: "25,000", description: "Double decker vegetable sandwich served with fries and house salads" },
      ],
      color: "from-yellow-400/20 to-orange-400/20"
    },
    {
      id: "wraps",
      name: "Wraps",
      icon: <Leaf className="w-5 h-5" />,
      description: "Fresh wraps with various fillings",
      image: "/img_75.png",
      items: [
        { name: "Chicken/Beef Burrito", price: "30,000", description: "Wrap of chicken or beef in tortilla with Mexican beans, rice, avocado and cheese" },
        { name: "Quesadilla", price: "30,000", description: "Cheese on tortilla with ranchero, rustica sauce seasoned with chicken or beef, served with salsa and guacamole" },
        { name: "Chicken/Beef Wraps", price: "30,000", description: "Grilled chicken or beef strips in pita bread with chili garlic mayo, avocado and sautéed bells" },
        { name: "Vegetable Wraps", price: "25,000", description: "Assorted fresh vegetables with aubergine, zucchini and cheese in tortilla, served with fries" },
      ],
      color: "from-green-400/20 to-emerald-400/20"
    },
    {
      id: "pasta",
      name: "Pastas",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      description: "Fresh pasta dishes made daily",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
      items: [
        { name: "Alfredo Pasta", price: "35,000", description: "Creamy pasta with soft chicken breast and mushroom, served with garlic bread" },
        { name: "Spaghetti Meatballs", price: "35,000", description: "Marinara sauce with meatballs in basil pomodoro, served with garlic bread and cheese" },
        { name: "Bucatini Bolognaise", price: "35,000", description: "Minced meat cooked in pomodoro with parmesan cheese and garlic bread" },
        { name: "Penne Arrabbiata", price: "30,000", description: "Penne pasta in spiced pomodoro sauce with garlic bread and basil garnish" },
        { name: "Pollo Pasta", price: "35,000", description: "Penne pasta with chicken and cheese, served with garlic bread and cheese garnish" },
        { name: "Pasta Mushrooms/Funghi", price: "30,000", description: "Caramelized mushrooms in garlic and white sauce served with penne" },
        { name: "Sea-Food Pasta", price: "50,000", description: "Pasta with prawns or salmon in creamy pomodoro sauce with olive oil garnish and garlic bread" },
        { name: "Tuscan Pasta", price: "40,000", description: "Creamy Alfredo pasta with chicken, sundried tomatoes, sautéed spinach and cheese" },
        { name: "Carbonara", price: "20,000", description: "Classic pasta with eggs, cheese, pancetta and pepper" }, // Added Carbonara at 20,000
      ],
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      id: "salads",
      name: "Salads",
      icon: <Salad className="w-5 h-5" />,
      description: "Fresh salads with house dressings",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      items: [
        { name: "Vegetable Salads", price: "25,000", description: "Assorted fresh market vegetables in vinaigrette dressing with olive and sweet corn" },
        { name: "Greek Salads", price: "25,000", description: "Diced bells, tomatoes, onions, lettuce cucumber with olives and feta cheese, vinaigrette dressing" },
        { name: "Caesar Salads", price: "30,000", description: "Chicken breast on dressed lettuce, onions and bread croutons, parmesan cheese and Caesar dressing" },
        { name: "Cobb Salad", price: "30,000", description: "Lettuce, onion slices, cherry tomatoes, grilled chicken, boiled eggs, avocado and sausages with balsamic dressing" },
        { name: "Coleslaw Salad", price: "25,000", description: "Mayonnaise base salad with purple cabbage, grated carrots, apples and raisins" },
        { name: "Tuna Salad", price: "25,000", description: "Fresh tuna with mixed greens and vinaigrette" },
      ],
      color: "from-green-300/20 to-emerald-300/20"
    },
    {
      id: "pizza",
      name: "Pizza",
      icon: <Pizza className="w-5 h-5" />,
      description: "Wood-fired pizzas with fresh toppings",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
      items: [
        { name: "Margherita Pizza", price: "30,000", description: "Medium: Pomodoro sauce, basil leaves, cherry tomato and cheese | Large: 35,000" },
        { name: "Pollo Pizza (Nkoko)", price: "30,000", description: "Medium: Onion slices, pomodoro and cheese | Large: 35,000" },
        { name: "Africano Pizza", price: "30,000", description: "Medium: Bell peppers, pomodoro, minced meat and cheese | Large: 35,000" },
        { name: "Hawaii Pizza", price: "30,000", description: "Medium: Pineapple, BBQ sauce, chicken and cheese | Large: 35,000" },
        { name: "Vegan Pizza", price: "30,000", description: "Medium: Assorted veges, pomodoro, cheese, sweet corn and olives | Large: 35,000" },
        { name: "Funghi/Mushroom Pizza", price: "30,000", description: "Medium: Caramelized mushrooms, pomodoro or béchamel, spinach and olives and cheese | Large: 35,000" },
        { name: "Nyama Choma Pizza", price: "35,000", description: "Medium: Choice of minced meat, chicken, beef sausages, pomodoro and cheese | Large: 40,000" },
      ],
      color: "from-red-400/20 to-orange-400/20"
    },
    {
      id: "kids",
      name: "Kids Menu",
      icon: <Cookie className="w-5 h-5" />,
      description: "Special meals for our little guests",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
      items: [
        { name: "Kiddy Fingers", price: "20,000", description: "Half portion of chicken fingers served with chips and mayonnaise" },
        { name: "Toto Drumstick", price: "20,000", description: "Two pieces of coated drumstick, fries and rice and gravy" },
        { name: "Chicken Nuggets", price: "20,000", description: "Bread crumbed chicken breast, fries and mustard mayo" },
        { name: "Bato Fried Rice", price: "20,000", description: "Asian style rice with eggs, a pair of sausages and gravy" },
        { name: "Kiddy Pasta", price: "20,000", description: "Alfredo pasta with chicken and mushroom and a bread roll" },
        { name: "Tilapia Goujon", price: "20,000", description: "Battered or bread crumbed fillet, fries and crudités on lettuce with mayonnaise" },
        { name: "Kiddy Burger", price: "20,000", description: "Mini burger, fries and mayonnaise and house salads" },
        { name: "Kiddy Wings or Lollipops", price: "20,000", description: "Half portion of wings, chips and rice, served with house gravy" },
        { name: "Minced Meat Fries", price: "20,000", description: "Chips with minced meat in pomodoro with cheese" },
        { name: "Egg Sandwich", price: "20,000", description: "Mini bread stuffed with eggs and tomatoes and crudités" },
      ],
      color: "from-pink-300/20 to-purple-300/20"
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: <Cake className="w-5 h-5" />,
      description: "Sweet treats to end your meal",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
      items: [
        { name: "Cake of the Day", price: "10,000", description: "Vanilla, chocolate, strawberry, red velvet or orange" },
        { name: "Fruit Bowl", price: "10,000", description: "Assorted fruits from Ugandan garden" },
        { name: "Ice-Cream Ball", price: "5,000", description: "Dessert ice-cream with chocolate syrup/strawberry" },
        { name: "Puddings/Kulfi", price: "5,000", description: "Mango pudding with fruit garnish" },
        { name: "Tiramisu", price: "7,000", description: "Italian special dessert" },
        { name: "Red Velvet Slice", price: "20,000", description: "" },
        { name: "Black Forest Slice", price: "20,000", description: "" },
        { name: "Chocolate Brownie", price: "20,000", description: "" },
        { name: "Muffins", price: "10,000", description: "" },
        { name: "Croissants", price: "10,000", description: "" },
        { name: "Doughnuts", price: "7,000", description: "" },
        { name: "Chicken/Beef Pie", price: "10,000", description: "" },
      ],
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: "beverages",
      name: "Beverages",
      icon: <GlassWater className="w-5 h-5" />,
      description: "Hot and cold drinks",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
      items: [
        { name: "Dawa Tea", price: "12,000", description: "" },
        { name: "African Tea", price: "12,000", description: "" },
        { name: "Ginger Tea", price: "10,000", description: "" },
        { name: "Lemon Tea", price: "10,000", description: "" },
        { name: "Cocktail Juice", price: "15,000", description: "" },
        { name: "Carrot Juice", price: "12,000", description: "" },
        { name: "Watermelon Juice", price: "12,000", description: "" },
        { name: "Passion Juice", price: "12,000", description: "" },
        { name: "Mango Juice", price: "12,000", description: "" },
        { name: "Pineapple Juice", price: "12,000", description: "" },
        { name: "Beetroot, Mango & Carrot", price: "15,000", description: "Juice blend" },
      ],
      color: "from-cyan-500/20 to-teal-500/20"
    },
    {
      id: "coffee",
      name: "Coffee",
      icon: <Coffee className="w-5 h-5" />,
      description: "Freshly brewed coffee selections",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      items: [
        { name: "Black Coffee", price: "11,000", description: "" },
        { name: "Cappuccino", price: "11,000", description: "" },
        { name: "Americano", price: "10,000", description: "" },
        { name: "Espresso", price: "7,000", description: "" },
        { name: "Macchiato", price: "10,000", description: "" },
        { name: "Iced Coffee", price: "12,000", description: "" },
        { name: "Cafe Latte", price: "10,000", description: "" }, // Added at 10,000 (consolidated duplicates)
        { name: "Coffee Latte", price: "10,000", description: "" }, // Same as Cafe Latte
        { name: "Coffee Mapitao", price: "11,000", description: "" }, // Added at 11,000
        { name: "Spanish Latte", price: "14,000", description: "" },
        { name: "Vanilla Latte", price: "14,000", description: "" },
        { name: "Caramel Latte", price: "14,000", description: "" },
        { name: "Cafe Mocha", price: "15,000", description: "" },
        { name: "Caramel Mocha", price: "15,000", description: "" },
        { name: "Moka Coffee", price: "15,000", description: "" },
        { name: "MOCA", price: "10,000", description: "" }, // Added at 10,000
      ],
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      id: "mocktails",
      name: "Mocktails",
      icon: <GlassWater className="w-5 h-5" />,
      description: "Non-alcoholic refreshing drinks",
      image: "/img_76.png",
      items: [
        { name: "Virgin Pina Colada", price: "15,000", description: "" },
        { name: "Pina Colanda", price: "25,000", description: "" }, // Added at 25,000
        { name: "Virgin Mojito", price: "15,000", description: "" },
        { name: "Skin Light", price: "15,000", description: "" },
        { name: "Heavy Weight", price: "15,000", description: "" },
        { name: "Weight Loss", price: "15,000", description: "" },
        { name: "Virgin Margarita", price: "15,000", description: "" },
        { name: "Mojito Original", price: "20,000", description: "" },
        { name: "Apple Ginger Fizz", price: "15,000", description: "" },
      ],
      color: "from-blue-300/20 to-cyan-300/20"
    },
    {
      id: "alcoholic_cocktails",
      name: "Alcoholic Cocktails",
      icon: <Wine className="w-5 h-5" />,
      description: "Signature mixed drinks",
      image: "/img_77.png",
      items: [
        { name: "Long Island Iced Tea", price: "30,000", description: "Classic cocktail with vodka, gin, rum, tequila, triple sec, lemon juice and cola" }, // Added at 30,000
        { name: "Sex on the Beach", price: "25,000", description: "Vodka, peach schnapps, orange and cranberry juice" }, // Added at 25,000 (consolidated duplicates)
        { name: "Blue Lagoon", price: "30,000", description: "Vodka, Blue syrup, lemon slice, mint leaves, lemon juice, ice cubes, powdered sugar" }, // Already exists at 30,000
        { name: "Three Wise Men", price: "30,000", description: "Johnnie Walker Red Label, Jim Beam, and Jack Daniel" },
        { name: "Margarita", price: "25,000", description: "Sour cocktail comprising of Tequila, Triple sec and lime or lemon juice" },
        { name: "Cosmopolitan", price: "25,000", description: "Made of Vodka, Triple sec and Cranberry juice" },
        { name: "Screw Driver", price: "20,000", description: "Interesting drink made with vodka and orange juice" },
        { name: "Martini", price: "20,000", description: "A classy drink made with Gin vermouth and garnished olives" },
        { name: "Penicillin", price: "20,000", description: "Whisky, lemon juice, ginger and honey" },
        { name: "Painkiller", price: "25,000", description: "Dark Rum, pineapple juice, orange juice, coconut cream" },
        { name: "Trojan Horse", price: "10,000", description: "Guinness and coke" },
      ],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: "gins",
      name: "Gins",
      icon: <Wine className="w-5 h-5" />,
      description: "Botanical spirits",
      image: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [],
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      id: "vodkas",
      name: "Vodkas",
      icon: <GlassWater className="w-5 h-5" />,
      description: "Neutral grain spirits",
      image: "https://images.pexels.com/photos/1283218/pexels-photo-1283218.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Smirnoff Vodka (750ml)", price: "60,000", description: "" },
        { name: "Absolut Vodka (1L)", price: "140,000", description: "" },
        { name: "Grey Goose Vodka (750ml)", price: "230,000", description: "" },
        { name: "Ciroc Vodka (1L)", price: "170,000", description: "Shot: 7,000" },
      ],
      color: "from-gray-300/20 to-blue-300/20"
    },
    {
      id: "liqueurs",
      name: "Liqueurs",
      icon: <Wine className="w-5 h-5" />,
      description: "Sweet flavored spirits",
      image: "https://images.pexels.com/photos/5947020/pexels-photo-5947020.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "V & A (750ml)", price: "50,000", description: "" },
        { name: "Amarula (750ml)", price: "90,000", description: "" },
        { name: "Kahlua (750ml)", price: "150,000", description: "Shot: 5,000" },
        { name: "Baileys (750ml)", price: "140,000", description: "Shot: 5,000" },
      ],
      color: "from-amber-500/20 to-brown-500/20"
    },
    {
      id: "tequilas",
      name: "Tequilas",
      icon: <Flame className="w-5 h-5" />,
      description: "Mexican agave spirits",
      image: "/img_78.png",
      items: [
        { name: "Tequila Silver (1L)", price: "160,000", description: "Shot: 5,000" },
        { name: "Tequila Gold (1L)", price: "160,000", description: "Shot: 5,000" },
      ],
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: "rums",
      name: "Rums",
      icon: <Wine className="w-5 h-5" />,
      description: "Sugarcane distilled spirits",
      image: "/img_79.png",
      items: [
        { name: "Bacardi Dark (750ml)", price: "120,000", description: "Shot: 5,000" },
        { name: "Bacardi White (750ml)", price: "120,000", description: "Shot: 5,000" },
        { name: "Malibu (750ml)", price: "120,000", description: "Shot: 5,000" },
        { name: "Captain Morgan Spiced (1L)", price: "120,000", description: "Shot: 5,000" },
        { name: "Captain Morgan White (1L)", price: "120,000", description: "Shot: 5,000" },
      ],
      color: "from-brown-500/20 to-amber-500/20"
    },
    {
      id: "brandies",
      name: "Brandies",
      icon: <Wine className="w-5 h-5" />,
      description: "Fruit distilled spirits",
      image: "https://images.pexels.com/photos/3323686/pexels-photo-3323686.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Hennessy VS (1L)", price: "280,000", description: "Shot: 10,000" },
      ],
      color: "from-amber-700/20 to-brown-700/20"
    },
    {
      id: "whiskies",
      name: "Whiskies",
      icon: <Flame className="w-5 h-5" />,
      description: "Aged grain spirits",
      image: "https://images.pexels.com/photos/301692/pexels-photo-301692.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Johnnie Walker Red Label (375ml)", price: "60,000", description: "" },
        { name: "Johnnie Walker Black Label (1L)", price: "200,000", description: "Shot: 8,000" },
        { name: "Johnnie Walker Double Black Label (1L)", price: "230,000", description: "Shot: 9,000" },
        { name: "Johnnie Walker Gold Label (1L)", price: "400,000", description: "Shot: 9,000" },
        { name: "Jameson (350ml)", price: "70,000", description: "" },
        { name: "Jameson (750ml)", price: "170,000", description: "" },
        { name: "Jack Daniel's (1L)", price: "210,000", description: "Shot: 8,000" },
        { name: "J&B (750ml)", price: "150,000", description: "Shot: 5,000" },
        { name: "Singleton (750ml)", price: "230,000", description: "Shot: 9,000" },
        { name: "Chivas Regal 12yrs (1L)", price: "250,000", description: "Shot: 9,000" },
        { name: "Grant's (750ml)", price: "150,000", description: "Shot: 5,000" },
        { name: "Bond 7 (200ml)", price: "15,000", description: "" },
        { name: "Bond 7 (750ml)", price: "50,000", description: "" },
        { name: "Glenlivet 18yrs (750ml)", price: "400,000", description: "Shot: 15,000" },
        { name: "Glenfiddich 18yrs (1L)", price: "400,000", description: "Shot: 9,000" },
        { name: "Jim Beam (1L)", price: "200,000", description: "Shot: 8,000" },
        { name: "Johannisberger (1L)", price: "200,000", description: "Shot: 10,000" },
        { name: "Perdeberg Cellar (1L)", price: "250,000", description: "Shot: 10,000" },
      ],
      color: "from-amber-600/20 to-brown-600/20"
    },
    {
      id: "wines",
      name: "Wines",
      icon: <Wine className="w-5 h-5" />,
      description: "Selection of red and white wines",
      image: "https://images.pexels.com/photos/1407854/pexels-photo-1407854.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Black Mulberry (1L)", price: "170,000", description: "Glass: 7,000" },
        { name: "Four Cousins (White or Red)", price: "60,000", description: "" },
        { name: "La Roza House Wine (by glass)", price: "10,000", description: "" },
      ],
      color: "from-red-500/20 to-purple-500/20"
    },
    {
      id: "beers",
      name: "Beers",
      icon: <Wine className="w-5 h-5" />,
      description: "Refreshing beers",
      image: "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Guinness", price: "10,000", description: "With coke as Trojan Horse" },
      ],
      color: "from-amber-400/20 to-yellow-400/20"
    },
    {
      id: "soft_drinks",
      name: "Soft Drinks",
      icon: <GlassWater className="w-5 h-5" />,
      description: "Non-alcoholic beverages",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
      items: [
        { name: "Coke", price: "5,000", description: "" },
      ],
      color: "from-blue-400/20 to-cyan-400/20"
    },
    {
      id: "traditional",
      name: "Traditional",
      icon: <Leaf className="w-5 h-5" />,
      description: "Authentic Ugandan dishes",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      items: [
        { name: "Chicken Luwombo", price: "35,000", description: "Traditional food wrapped in banana leaves and steamed. Served with matooke/rice/posho/green/dry foods/mugoyo and kalo" },
        { name: "Goat Luwombo", price: "35,000", description: "" },
        { name: "Fish Luwombo", price: "35,000", description: "Fish in groundnuts sauce" },
      ],
      color: "from-green-600/20 to-lime-600/20"
    }
  ];

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuData;
    }

    const query = searchQuery.toLowerCase().trim();
    return menuData
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0);
  }, [searchQuery]);

  // Get current category for single view
  const currentCategory = menuData.find(cat => cat.id === activeCategory);
  const displayCategories = activeCategory === "all" ? filteredCategories : [currentCategory].filter(Boolean);

  // Item Preview Dialog
  const ItemPreviewDialog = ({ item, category }) => {
    if (!item) return null;

    return (
      <Dialog open={!!item} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category?.color}`}>
                  {category?.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              </div>
              <span className="text-lg font-bold text-primary">
                UGX {item.price}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Description</h4>
              <p className="text-gray-700">{item.description || "No description available"}</p>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Category</h4>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-gray-100">
                  {category?.icon}
                </div>
                <span className="text-gray-700">{category?.name}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wood-cream/10 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/img_48.png"
            alt="La Roza Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wood-dark/60" />
        </div>
        <div className="container-luxury px-4 md:px-8 relative z-10">
          <div className="text-center text-wood-cream">
            <span className="text-xs md:text-sm text-label text-secondary bg-secondary/20 px-3 md:px-4 py-1 rounded-full inline-block">
              Culinary Experience
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:heading-display font-display font-bold mt-4 md:mt-6 mb-4 md:mb-6 px-2">
              La Roza Restaurant
            </h1>
            <p className="text-sm sm:text-base md:text-body text-wood-cream/90 opacity-90 max-w-3xl mx-auto px-2 md:px-0">
              Where every dish tells a story, and every drink creates a memory
            </p>
          </div>
        </div>
      </section>

      {/* Search and Category Navigation */}
      <section className="py-8 sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Explore Our Menu</h2>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search dishes, drinks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="whitespace-nowrap"
            >
              All Categories
            </Button>
            {menuData.map((category) => (
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
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-600">
                Found {filteredCategories.reduce((total, cat) => total + cat.items.length, 0)} items matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* All Categories View */}
          {activeCategory === "all" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
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
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 group/item p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => setSelectedItem({ ...item, category })}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-gray-700 group-hover/item:text-primary transition-colors">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            UGX {item.price}
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
              {displayCategories.map((category) => (
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
                          Menu Items ({category.items.length})
                        </h4>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                          {category.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 hover:bg-white rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-primary/20"
                              onClick={() => setSelectedItem({ ...item, category })}
                            >
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                  {item.name}
                                </h5>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {item.description || "Freshly prepared with premium ingredients"}
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="font-bold text-primary">
                                  UGX {item.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                  
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Note Section */}
         
        </div>
      </section>

      {/* Item Preview Dialog */}
      <ItemPreviewDialog
        item={selectedItem}
        category={selectedItem?.category}
      />

      <Footer />
    </div>
  );
};

export default Restaurant;