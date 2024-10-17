import { Label } from '@/components/ui/label';
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});



export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
})


export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", {length:255}).notNull(),
  instagramUrl: varchar("instagramUrl", {length: 255}),
  facebookUrl: varchar("facebookUrl", {length: 255}),
  description: varchar("description", {length: 255}),
  userId: integer("user_id").notNull().references(() => users.id)
})


export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 255}).notNull(),
  description: varchar("description", {length: 255}),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  price: integer("price").default(0),
})


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type DomainSchema = typeof domains.$inferSelect;


export type ProfileSchema = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert

export type PostSchema = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert




export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
