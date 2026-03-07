import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export function TestimonialCard({
  name,
  location,
  text,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-card p-8 rounded-lg shadow-card relative">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "text-secondary fill-secondary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-body text-muted-foreground mb-6 italic">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-display text-lg text-primary">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  );
}
