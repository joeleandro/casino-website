import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data carefully (don't do this in production without confirmation)
    // Check if tables exist first to avoid errors
    const contentTypes = await db.select().from(schema.contentTypes);
    const authors = await db.select().from(schema.authors);
    
    // Seed content types if not already present
    if (contentTypes.length === 0) {
      console.log("Seeding content types...");
      await db.insert(schema.contentTypes).values([
        { name: "ARTICLE" },
        { name: "VIDEO" },
        { name: "PODCAST" },
        { name: "WEBINAR" }
      ]);
    } else {
      console.log("Content types already exist, skipping seeding.");
    }

    // Seed authors if not already present
    if (authors.length === 0) {
      console.log("Seeding authors...");
      await db.insert(schema.authors).values([
        { 
          name: "John Anderson", 
          avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", 
          bio: "Tech industry analyst with over 15 years of experience in emerging technologies." 
        },
        { 
          name: "Sarah Johnson", 
          avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", 
          bio: "Digital marketing expert and consultant for Fortune 500 companies." 
        },
        { 
          name: "Michael Roberts", 
          avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", 
          bio: "Podcast host and tech entrepreneur focusing on innovation and business growth." 
        }
      ]);
    } else {
      console.log("Authors already exist, skipping seeding.");
    }

    // Fetch the inserted/existing content types and authors for reference
    const typeResults = await db.select().from(schema.contentTypes);
    const authorResults = await db.select().from(schema.authors);

    // Map names to IDs for easy reference
    const contentTypeMap = typeResults.reduce((acc, type) => {
      acc[type.name] = type.id;
      return acc;
    }, {} as Record<string, number>);

    const authorMap = authorResults.reduce((acc, author) => {
      acc[author.name] = author.id;
      return acc;
    }, {} as Record<string, number>);

    // Check if content already exists to avoid duplicates
    const existingContent = await db.select().from(schema.contents);
    if (existingContent.length === 0) {
      console.log("Seeding content...");
      await db.insert(schema.contents).values([
        {
          title: "The Future of Technology in 2023",
          description: "An in-depth analysis of upcoming technology trends and their impact on businesses worldwide.",
          typeId: contentTypeMap["ARTICLE"],
          authorId: authorMap["John Anderson"],
          previewImageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/articles/tech-future-2023",
          viewCount: 4200,
          premiumOnly: true,
          createdAt: new Date("2023-03-12")
        },
        {
          title: "Master Digital Marketing Strategy",
          description: "Learn proven marketing strategies from industry experts that drive real business results.",
          typeId: contentTypeMap["VIDEO"],
          authorId: authorMap["Sarah Johnson"],
          previewImageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/videos/digital-marketing-strategy",
          viewCount: 8700,
          premiumOnly: true,
          createdAt: new Date("2023-04-05")
        },
        {
          title: "Innovation Insights: Tech Leaders Talk",
          description: "Exclusive interviews with tech leaders sharing insights on innovation and business growth.",
          typeId: contentTypeMap["PODCAST"],
          authorId: authorMap["Michael Roberts"],
          previewImageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/podcasts/innovation-insights",
          viewCount: 5900,
          premiumOnly: true,
          createdAt: new Date("2023-02-18")
        },
        {
          title: "2023 Expert Industry Analysis",
          description: "Get access to our exclusive analysis and insights that helped companies grow by 200% in 2023.",
          typeId: contentTypeMap["ARTICLE"],
          authorId: authorMap["John Anderson"],
          previewImageUrl: "https://images.unsplash.com/photo-1603824228002-13e2d0a5ffeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/articles/industry-analysis-2023",
          viewCount: 2400,
          premiumOnly: true,
          createdAt: new Date("2023-03-12")
        },
        {
          title: "Web Development Trends for 2023",
          description: "Explore the latest web development frameworks and methodologies that are shaping the industry.",
          typeId: contentTypeMap["WEBINAR"],
          authorId: authorMap["Michael Roberts"],
          previewImageUrl: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/webinars/web-dev-trends",
          viewCount: 3100,
          premiumOnly: true,
          createdAt: new Date("2023-01-25")
        },
        {
          title: "AI in Business: Practical Applications",
          description: "Learn how businesses are implementing AI to improve efficiency and drive growth.",
          typeId: contentTypeMap["VIDEO"],
          authorId: authorMap["Sarah Johnson"],
          previewImageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          fullContentUrl: "https://example.com/videos/ai-business-applications",
          viewCount: 6800,
          premiumOnly: true,
          createdAt: new Date("2023-05-10")
        }
      ]);
      console.log("Content seeding completed.");
    } else {
      console.log("Content already exists, skipping seeding.");
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seed();
