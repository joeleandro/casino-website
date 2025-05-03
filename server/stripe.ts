import { Express } from "express";
// Estamos removendo Stripe já que não será usado nesse projeto
// import Stripe from "stripe";
import { storage } from "./storage";
import { db } from "@db";
import { products } from "@shared/schema";
import { eq } from "drizzle-orm";

// Mock do stripe para evitar erros no projeto
const stripe = {
  customers: { create: async () => ({ id: 'mock-customer-id' }) },
  paymentIntents: { create: async () => ({ client_secret: 'mock-secret' }) },
  webhooks: { constructEvent: () => ({}) }
};

export function setupStripeRoutes(app: Express) {
  // Este é um mock simples já que não usaremos Stripe para este projeto
  // mas mantendo a interface para evitar erros
  
  app.post("/api/create-subscription", async (req, res) => {
    // Retornando resposta de sucesso simulada
    res.json({
      clientSecret: "mock_client_secret",
    });
  });

  // Webhook mock
  app.post("/api/webhook", async (req, res) => {
    res.json({ received: true });
  });
  
  // Nova rota para produtos em destaque - isso será usado no nosso site
  app.get("/api/featured-products", async (req, res) => {
    try {
      const featuredProducts = await db.select()
        .from(products)
        .where(
          eq(products.featured, true) && eq(products.active, true)
        )
        .limit(3);
      
      res.json(featuredProducts);
    } catch (error: any) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: error.message });
    }
  });
}
