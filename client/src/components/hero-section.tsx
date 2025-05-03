import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-header">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Premium Content <span className="text-primary">Just For You</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Subscribe to exclusive content with flexible payment options. 
              Join thousands of satisfied subscribers and unlock premium content today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/pricing">
                <Button className="w-full sm:w-auto px-8">See Plans</Button>
              </Link>
              <Link href="/content">
                <Button variant="outline" className="w-full sm:w-auto px-8 text-primary border-primary">
                  Browse Content
                </Button>
              </Link>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="flex -space-x-2 mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-400" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-400" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-green-400" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-400" />
              </div>
              <p>Trusted by <span className="font-semibold">10,000+</span> satisfied subscribers</p>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-primary text-xs font-semibold px-3 py-1 rounded-full">PREMIUM</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  2.4k views
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">2023 Expert Industry Analysis</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">Get access to our exclusive analysis and insights that helped companies grow by 200% in 2023.</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                  <span className="font-medium text-sm">John Anderson</span>
                </div>
                <span className="text-gray-500 text-sm">Mar 12, 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
