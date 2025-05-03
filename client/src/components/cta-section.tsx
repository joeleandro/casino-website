import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-16 bg-gradient-cta text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to access exclusive content?</h2>
          <p className="text-xl mb-8">
            Join thousands of subscribers who are already enjoying premium content with flexible payment options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="px-8 py-3 bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border-white w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
