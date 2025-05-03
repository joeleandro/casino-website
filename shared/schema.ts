import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Content Types
export const contentTypes = pgTable("content_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// Authors
export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  bio: text("bio"),
});

// Content
export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  typeId: integer("type_id").references(() => contentTypes.id).notNull(),
  authorId: integer("author_id").references(() => authors.id).notNull(),
  previewImageUrl: text("preview_image_url").notNull(),
  fullContentUrl: text("full_content_url"),
  viewCount: integer("view_count").default(0).notNull(),
  premiumOnly: boolean("premium_only").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  plan: text("plan").notNull(), // 'basic', 'pro', 'premium'
  status: text("status").notNull(), // 'active', 'canceled', 'past_due'
  amount: integer("amount").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Favorites
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  contentId: integer("content_id").references(() => contents.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  favorites: many(favorites),
}));

export const contentsRelations = relations(contents, ({ one, many }) => ({
  type: one(contentTypes, {
    fields: [contents.typeId],
    references: [contentTypes.id],
  }),
  author: one(authors, {
    fields: [contents.authorId],
    references: [authors.id],
  }),
  favorites: many(favorites),
}));

export const contentTypesRelations = relations(contentTypes, ({ many }) => ({
  contents: many(contents),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  contents: many(contents),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  content: one(contents, {
    fields: [favorites.contentId],
    references: [contents.id],
  }),
}));

// Create schemas for validation
export const contentTypesInsertSchema = createInsertSchema(contentTypes);
export const authorsInsertSchema = createInsertSchema(authors);
export const contentsInsertSchema = createInsertSchema(contents);
export const subscriptionsInsertSchema = createInsertSchema(subscriptions);
export const favoritesInsertSchema = createInsertSchema(favorites);

// Products (Bots)
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'casino', 'sports', etc.
  featured: boolean("featured").default(false).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products validation schema
export const productsInsertSchema = createInsertSchema(products);
export type Product = typeof products.$inferSelect;

// Export types
export type ContentType = typeof contentTypes.$inferSelect;
export type Author = typeof authors.$inferSelect;
export type Content = typeof contents.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
