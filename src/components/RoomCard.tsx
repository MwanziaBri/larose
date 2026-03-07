import { Link } from "react-router-dom";
import { Users, Maximize, Wifi, Coffee } from "lucide-react";

interface RoomCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  guests: number;
  size: string;
  amenities: string[];
}

export function RoomCard({
  name,
  description,
  price,
  image,
  guests,
  size,
  amenities,
}: RoomCardProps) {
  return (
    <article className="card-luxury group">
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wood-dark/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-label text-secondary">From</span>
          <p className="font-display text-3xl text-wood-cream">
            ${price}
            <span className="text-sm font-body text-wood-cream/70">/night</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="heading-card text-foreground">{name}</h3>
        <p className="text-body text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-secondary" />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-secondary" />
            <span>{size}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
          <Link
            to="/booking"
            className="flex-1 btn-primary text-center text-sm"
          >
            Book Now
          </Link>
          <Link
            to="/rooms"
            className="btn-outline text-sm px-4"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
