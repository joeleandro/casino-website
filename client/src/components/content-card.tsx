import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Author {
  id?: number;
  name: string;
  avatarUrl: string;
}

interface Content {
  id: number;
  title: string;
  description: string;
  type: "ARTICLE" | "VIDEO" | "PODCAST" | "WEBINAR";
  previewImageUrl: string;
  viewCount: number;
  author: Author;
  createdAt?: string;
}

export default function ContentCard({ content }: { content: Content }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "ARTICLE":
        return "bg-blue-100 text-primary";
      case "VIDEO":
        return "bg-indigo-100 text-secondary";
      case "PODCAST":
        return "bg-pink-100 text-accent";
      case "WEBINAR":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPreviewButtonText = (type: string) => {
    switch (type) {
      case "ARTICLE":
        return "Read Preview";
      case "VIDEO":
        return "Watch Preview";
      case "PODCAST":
        return "Listen Preview";
      case "WEBINAR":
        return "View Preview";
      default:
        return "View Preview";
    }
  };

  const showPlayButton = content.type === "VIDEO" || content.type === "PODCAST";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200" />
        <div className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full" style={{
          backgroundColor: getTypeColor(content.type).split(' ')[0],
          color: getTypeColor(content.type).split(' ')[1]
        }}>
          {content.type}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
          <div className="p-4 text-white">
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg">
              {getPreviewButtonText(content.type)}
            </Button>
          </div>
        </div>
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{content.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
            <span className="font-medium text-sm">{content.author.name}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="h-4 w-4 mr-1" />
            {content.viewCount > 1000 
              ? `${(content.viewCount / 1000).toFixed(1)}k` 
              : content.viewCount}
          </div>
        </div>
      </div>
    </div>
  );
}
