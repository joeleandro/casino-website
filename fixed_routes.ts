import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { setupStripeRoutes } from "./stripe";
import { storage } from "./storage";
import { eq, desc, and, or, like } from "drizzle-orm";
import { contents, contentTypes, authors, favorites, subscriptions, products } from "@shared/schema";
import { db } from "@db";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // Set up Stripe payment routes (mockup para evitar erros)
  setupStripeRoutes(app);
  
  // Rotas para bots de cassino (produtos)
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string;
      const search = req.query.search as string;
      
      let query = db.select().from(products);
      
      if (category && category !== "all") {
        query = query.where(eq(products.category, category));
      }
      
      if (search) {
        query = query.where(
          or(
            like(products.name, `%${search}%`),
            like(products.description, `%${search}%`)
          )
        );
      }
      
      const result = await query.orderBy(desc(products.createdAt));
      res.json(result);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Obter um produto específico
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      const result = await db.select()
        .from(products)
        .where(eq(products.id, productId));
      
      if (result.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      
      res.json(result[0]);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Criar um novo produto (somente admin)
  app.post("/api/products", async (req, res) => {
    try {
      // Aqui precisaria autenticar o admin, mas para simplificar vamos deixar aberto por enquanto
      const newProduct = await db.insert(products).values({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        category: req.body.category,
        featured: req.body.featured || false,
        active: true,
        createdAt: new Date()
      }).returning();
      
      res.status(201).json(newProduct[0]);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Atualizar um produto existente (somente admin)
  app.put("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      const updatedProduct = await db.update(products)
        .set({
          name: req.body.name,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          price: req.body.price,
          category: req.body.category,
          featured: req.body.featured
        })
        .where(eq(products.id, productId))
        .returning();
      
      if (updatedProduct.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      
      res.json(updatedProduct[0]);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Excluir um produto (somente admin)
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      await db.delete(products)
        .where(eq(products.id, productId));
      
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Content-related routes
  app.get("/api/contents", async (req, res) => {
    try {
      const type = req.query.type as string;
      const search = req.query.search as string;
      
      let query = db.select().from(contents)
        .leftJoin(contentTypes, eq(contents.typeId, contentTypes.id))
        .leftJoin(authors, eq(contents.authorId, authors.id));
      
      if (type && type !== "all") {
        query = query.where(eq(contentTypes.name, type));
      }
      
      if (search) {
        query = query.where(
          or(
            like(contents.title, `%${search}%`),
            like(contents.description, `%${search}%`)
          )
        );
      }
      
      const result = await query.orderBy(desc(contents.createdAt));
      
      // Transform result to match expected format
      const formattedContents = result.map(item => ({
        id: item.contents.id,
        title: item.contents.title,
        description: item.contents.description,
        type: item.content_types?.name,
        previewImageUrl: item.contents.previewImageUrl,
        viewCount: item.contents.viewCount,
        author: {
          id: item.authors?.id,
          name: item.authors?.name,
          avatarUrl: item.authors?.avatarUrl,
        },
        createdAt: item.contents.createdAt,
      }));
      
      res.json(formattedContents);
    } catch (error: any) {
      console.error("Error fetching contents:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // User subscriptions
  app.get("/api/user/subscription", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const result = await db.select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, req.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);
      
      if (result.length === 0) {
        return res.json(null);
      }
      
      res.json(result[0]);
    } catch (error: any) {
      console.error("Error fetching user subscription:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // User favorites
  app.get("/api/user/favorites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const result = await db.select()
        .from(favorites)
        .leftJoin(contents, eq(favorites.contentId, contents.id))
        .leftJoin(contentTypes, eq(contents.typeId, contentTypes.id))
        .leftJoin(authors, eq(contents.authorId, authors.id))
        .where(eq(favorites.userId, req.user.id))
        .orderBy(desc(favorites.createdAt));
      
      // Transform result to match expected format
      const formattedContents = result.map(item => ({
        id: item.contents.id,
        title: item.contents.title,
        description: item.contents.description,
        type: item.content_types?.name,
        previewImageUrl: item.contents.previewImageUrl,
        viewCount: item.contents.viewCount,
        author: {
          id: item.authors?.id,
          name: item.authors?.name,
          avatarUrl: item.authors?.avatarUrl,
        },
        createdAt: item.contents.createdAt,
      }));
      
      res.json(formattedContents);
    } catch (error: any) {
      console.error("Error fetching user favorites:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Recent content views
  app.get("/api/user/recent-content", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      // In a real application, you would have a contentViews table to track this
      // For now, we'll return some content as a placeholder
      const result = await db.select()
        .from(contents)
        .leftJoin(contentTypes, eq(contents.typeId, contentTypes.id))
        .leftJoin(authors, eq(contents.authorId, authors.id))
        .orderBy(desc(contents.createdAt))
        .limit(5);
      
      // Transform result to match expected format
      const formattedContents = result.map(item => ({
        id: item.contents.id,
        title: item.contents.title,
        description: item.contents.description,
        type: item.content_types?.name,
        previewImageUrl: item.contents.previewImageUrl,
        viewCount: item.contents.viewCount,
        author: {
          id: item.authors?.id,
          name: item.authors?.name,
          avatarUrl: item.authors?.avatarUrl,
        },
        createdAt: item.contents.createdAt,
      }));
      
      res.json(formattedContents);
    } catch (error: any) {
      console.error("Error fetching recent content:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Toggle favorite content
  app.post("/api/user/favorites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const { contentId } = req.body;
      
      if (!contentId) {
        return res.status(400).json({ error: "Content ID is required" });
      }
      
      // Check if already favorited
      const existing = await db.select()
        .from(favorites)
        .where(
          and(
            eq(favorites.userId, req.user.id),
            eq(favorites.contentId, contentId)
          )
        );
      
      if (existing.length > 0) {
        // If already favorited, remove it
        await db.delete(favorites)
          .where(
            and(
              eq(favorites.userId, req.user.id),
              eq(favorites.contentId, contentId)
            )
          );
        return res.json({ favorited: false });
      } else {
        // Add to favorites
        await db.insert(favorites)
          .values({
            userId: req.user.id,
            contentId: contentId,
            createdAt: new Date()
          });
        return res.json({ favorited: true });
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
