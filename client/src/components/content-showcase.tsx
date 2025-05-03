import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/content-card";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: "ARTICLE" | "VIDEO" | "PODCAST";
  previewImageUrl: string;
  viewCount: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export default function ContentShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: "The Future of Technology in 2023",
      description: "An in-depth analysis of upcoming technology trends and their impact on businesses worldwide.",
      type: "ARTICLE",
      previewImageUrl: "",
      viewCount: 4200,
      author: {
        name: "John Anderson",
        avatarUrl: ""
      }
    },
    {
      id: 2,
      title: "Master Digital Marketing Strategy",
      description: "Learn proven marketing strategies from industry experts that drive real business results.",
      type: "VIDEO",
      previewImageUrl: "",
      viewCount: 8700,
      author: {
        name: "Sarah Johnson",
        avatarUrl: ""
      }
    },
    {
      id: 3,
      title: "Innovation Insights: Tech Leaders Talk",
      description: "Exclusive interviews with tech leaders sharing insights on innovation and business growth.",
      type: "PODCAST",
      previewImageUrl: "",
      viewCount: 5900,
      author: {
        name: "Michael Roberts",
        avatarUrl: ""
      }
    }
  ];

  const filters = ["All", "Articles", "Videos", "Podcasts", "Webinars"];

  return (
    <section id="content" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Content Preview</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get a glimpse of the premium content available to our subscribers. Subscribe to unlock full access.
          </p>
        </div>
        
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for content..." 
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentItems.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8 py-3 text-primary border-primary">
            View All Content
          </Button>
        </div>
      </div>
    </section>
  );
}
