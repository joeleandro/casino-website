import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PricingCard from "@/components/pricing-card";

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(false);
  
  const pricingPlans = [
    {
      name: "Basic",
      price: annualBilling ? 81 : 9,
      period: annualBilling ? 'year' : 'month',
      description: "Perfect for individuals looking for essential content access.",
      features: [
        { included: true, text: "Access to standard content" },
        { included: true, text: "Basic dashboard features" },
        { included: true, text: "Email support" },
        { included: false, text: "Premium content access" },
        { included: false, text: "Live chat support" },
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: annualBilling ? 171 : 19,
      period: annualBilling ? 'year' : 'month',
      description: "Our most popular plan for enthusiasts and professionals.",
      features: [
        { included: true, text: "All Basic features" },
        { included: true, text: "Premium content access" },
        { included: true, text: "Live chat support" },
        { included: true, text: "Advanced dashboard features" },
        { included: false, text: "Exclusive webinars" },
      ],
      highlighted: true,
      badge: "Popular"
    },
    {
      name: "Premium",
      price: annualBilling ? 351 : 39,
      period: annualBilling ? 'year' : 'month',
      description: "Complete access to all exclusive content and premium features.",
      features: [
        { included: true, text: "All Pro features" },
        { included: true, text: "Exclusive webinars" },
        { included: true, text: "Priority support" },
        { included: true, text: "Early access to new content" },
        { included: true, text: "Custom content requests" },
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Subscription Plans</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include access to our platform features.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-600 mr-3">Monthly</span>
            <Switch 
              checked={annualBilling} 
              onCheckedChange={setAnnualBilling}
              id="billing-toggle"
            />
            <span className="text-gray-600 ml-3">
              Annual <span className="text-xs text-green-500 font-medium">Save 25%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index} 
              {...plan}
              ctaText={`Choose ${plan.name}`}
              ctaLink="/subscription"
            />
          ))}
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-center">Flexible Payment Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center p-4 border rounded-lg hover:border-primary transition-colors">
              <svg viewBox="0 0 60 25" height="40" width="90" xmlns="http://www.w3.org/2000/svg">
                <path fill="#635BFF" d="M59.64 14.28h-8.06v-1.4h8.06v1.4zm-8.06 2.1h8.06v-1.4h-8.06v1.4zm-8.44-5.53v5.19c0 1.33-.8 2.14-2.09 2.14-1.06 0-1.74-.66-1.77-1.75h-1.42c.03 1.92 1.4 3.1 3.2 3.1 1.92 0 3.5-1.33 3.5-3.46V10.9h-1.42v-.05zm-6.83 7.33c1.3 0 2.3-.7 2.5-1.89h-1.42c-.14.47-.56.77-1.05.77-.77 0-1.28-.64-1.28-1.56 0-.91.5-1.53 1.28-1.53.52 0 .91.26 1.05.75h1.42c-.2-1.17-1.17-1.89-2.5-1.89-1.7 0-2.8 1.27-2.8 2.8.03 1.4 1.2 2.55 2.8 2.55zm-5.3-6c-.88 0-1.64.38-2.14.97V11.1h-1.42v6.7h1.42v-3.82c0-1.02.61-1.61 1.5-1.61.83 0 1.36.5 1.36 1.3v4.13h1.42v-4.13c.05-1.42-.8-2.55-2.14-2.55zm-8.91 0c-1.92 0-3.2 1.45-3.2 3.52 0 2.05 1.3 3.5 3.2 3.5 1.4 0 2.62-.84 2.94-2.2h-1.53c-.2.55-.7.88-1.4.88-.85 0-1.55-.59-1.7-1.52h4.77v-.64c0-2.08-1.4-3.55-3.08-3.55zm-1.64 2.88c.2-.86.83-1.42 1.63-1.42.77 0 1.4.59 1.56 1.42h-3.2zm-4.35 2.5V11.1h-1.42v1.19c-.47-.83-1.33-1.36-2.36-1.36-1.95 0-3.5 1.6-3.5 3.52 0 1.95 1.53 3.5 3.5 3.5 1.06 0 1.92-.52 2.36-1.36v1.2h1.42v-.05zm-3.53-.3c-1.22 0-2.16-.94-2.16-2.22 0-1.27.94-2.22 2.16-2.22 1.22 0 2.16.94 2.16 2.22 0 1.27-.94 2.22-2.16 2.22zM13.54 11c-1.95 0-3.5 1.6-3.5 3.52 0 1.92 1.53 3.5 3.5 3.5 1.95 0 3.5-1.6 3.5-3.5-.02-1.92-1.55-3.52-3.5-3.52zm0 5.43c-1.22 0-2.16-.94-2.16-2.22 0-1.27.94-2.22 2.16-2.22 1.22 0 2.16.94 2.16 2.22 0 1.27-.94 2.22-2.16 2.22zm-6.7-4.13h-2.34V9.75h-1.42v2.55H1.5v1.33h1.56v3.06c0 1.42.75 2.14 2.14 2.14h2.5v-1.33h-2.31c-.63 0-.91-.28-.91-.94v-2.94h3.22V12.3z"></path>
              </svg>
            </div>
            <div className="flex items-center justify-center p-4 border rounded-lg hover:border-primary transition-colors">
              <svg viewBox="0 0 100 32" height="40" width="100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 12.237 2.445 L 3.56 2.445 C 1.593 2.445 0 4.023 0 6.005 L 0 26.005 C 0 27.987 1.593 29.55 3.56 29.55 L 12.237 29.55 C 14.204 29.55 15.797 27.987 15.797 26.005 L 15.797 6.005 C 15.797 4.023 14.204 2.445 12.237 2.445 Z" fill="#253B80"></path><path d="M 25.083 2.445 L 70.613 2.445 L 70.613 15.005 L 25.083 15.005 Z" fill="#179BD7"></path><path d="M 25.083 29.55 L 56.958 29.55 L 56.958 19.5 L 25.083 19.5 Z" fill="#222D65"></path><path d="M 59.693 29.55 L 70.613 29.55 L 70.613 19.5 L 59.693 19.5 Z" fill="#253B80"></path><path d="M 96.43 2.445 L 87.753 2.445 C 85.786 2.445 84.193 4.023 84.193 6.005 L 84.193 26.005 C 84.193 27.987 85.786 29.55 87.753 29.55 L 96.43 29.55 C 98.397 29.55 100 27.987 100 26.005 L 100 6.005 C 100 4.023 98.407 2.445 96.43 2.445 Z" fill="#179BD7"></path>
              </svg>
            </div>
            <div className="flex items-center justify-center p-4 border rounded-lg hover:border-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="32" viewBox="0 0 1000.008 323.7">
                <path fill="#00579F" d="M651.19 10.46h-89.348v303.478h89.348V10.46z"></path>
                <path fill="#FAA61A" d="M605.688 161.199c0-59.281 27.959-111.999 71.275-145.573-31.738-24.958-71.844-39.836-115.447-39.836-103.596 0-187.541 83.94-187.541 185.409 0 101.467 83.945 185.41 187.541 185.41 43.604 0 83.709-14.883 115.447-39.836-43.316-33.574-71.275-86.292-71.275-145.574z"></path>
                <path fill="#00579F" d="M989.836 10.46h-82.688c-12.36 0-22.9 7.037-27.73 17.939l-97.967 235.196h94.453l13.618-37.742h89.232l13.668 37.742h83.586L989.836 10.46zm-81.661 166.732l26.936-75.076c3.631-10.341 14.739-10.341 18.384 0l27.002 75.076h-72.322z"></path>
                <path d="M810.893 10.46L736.139 190.095l-7.972-39.722c-16.553-54.376-63.073-97.049-115.465-108.401l68.937 271.966h94.951L893.32 10.46h-82.427z" fill="#00579F"></path>
              </svg>
            </div>
            <div className="flex items-center justify-center p-4 border rounded-lg hover:border-primary transition-colors">
              <svg viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg" width="100" height="40">
                <path d="M48.37 15.14h34.66v56.61H48.37z" fill="#FF5F00"></path>
                <path d="M51.94 43.45c0-11.5 5.39-21.72 13.77-28.3-6.14-4.86-13.87-7.76-22.28-7.76-19.78 0-35.88 16.1-35.88 35.88s16.1 35.88 35.88 35.88c8.4 0 16.14-2.9 22.28-7.76-8.38-6.4-13.77-16.62-13.77-28.12z" fill="#EB001B"></path>
                <path d="M123.94 43.45c0 19.78-16.1 35.88-35.88 35.88-8.4 0-16.14-2.9-22.28-7.76 8.38-6.4 13.77-16.62 13.77-28.12s-5.39-21.72-13.77-28.3c6.14-4.86 13.87-7.76 22.28-7.76 19.78 0 35.88 16.1 35.88 35.88z" fill="#F79E1B"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
