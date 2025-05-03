import { eq } from "drizzle-orm";
import { db } from "@db";
import { users, subscriptions, contents, contentTypes, authors, favorites, User } from "@shared/schema";
import { InsertUser } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";

const PostgresSessionStore = connectPg(session);

declare module "express-session" {
  interface SessionStore {}
}

export interface IStorage {
  getUser(id: number): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, { customerId, subscriptionId }: { customerId: string, subscriptionId: string }): Promise<User>;
  sessionStore: session.Store; // Corrigido: usando session.Store em vez de session.SessionStore
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store; // Corrigido: usando session.Store em vez de session.SessionStore

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  async getUser(id: number): Promise<User> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!result.length) {
      throw new Error(`User with id ${id} not found`);
    }
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const result = await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  async updateUserStripeInfo(
    userId: number, 
    { customerId, subscriptionId }: { customerId: string, subscriptionId: string }
  ): Promise<User> {
    const result = await db
      .update(users)
      .set({ 
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
