import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, X } from "lucide-react";

interface PricingFeature {
  included: boolean;
  text: string;
}

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
  ctaLink: string;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  badge,
  ctaText,
  ctaLink
}: PricingCardProps) {
  return (
    <div className={`
      bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow 
      ${highlighted 
        ? 'border-2 border-primary relative transform md:scale-105' 
        : 'border border-gray-100'
      }
    `}>
      {badge && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 uppercase">
          {badge}
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-end mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/{period}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-start ${feature.included ? '' : 'text-gray-400'}`}>
              {feature.included ? (
                <Check className="text-green-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
              ) : (
                <X className="mt-1 mr-3 h-5 w-5 flex-shrink-0" />
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          variant={highlighted ? "default" : "outline"} 
          className={`w-full ${!highlighted && 'text-primary border-primary'}`}
        >
          <Link href={ctaLink}>
            {ctaText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
