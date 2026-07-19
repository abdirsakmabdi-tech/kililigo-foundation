import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  excerpt: text('excerpt').notNull().default(''),
  body: text('body').notNull().default(''),
  coverImageUrl: text('cover_image_url'),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const pressReleases = pgTable('press_releases', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  excerpt: text('excerpt').notNull().default(''),
  body: text('body').notNull().default(''),
  attachmentUrl: text('attachment_url'),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const vacancies = pgTable('vacancies', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  location: varchar('location', { length: 255 }).notNull().default(''),
  employmentType: varchar('employment_type', { length: 100 }).notNull().default('Full-time'),
  description: text('description').notNull().default(''),
  applyEmail: varchar('apply_email', { length: 255 }).notNull().default(''),
  deadline: timestamp('deadline', { withTimezone: true }),
  status: varchar('status', { length: 20 }).notNull().default('open'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const programs = pgTable('programs', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description').notNull().default(''),
  category: varchar('category', { length: 100 }).notNull().default(''),
  coverImageUrl: text('cover_image_url'),
  programGroup: varchar('group', { length: 50 }).notNull().default('core'),
  sortOrder: integer('sort_order').notNull().default(0),
  showOnHome: boolean('show_on_home').notNull().default(false),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const aboutContent = pgTable('about_content', {
  id: varchar('id', { length: 50 }).primaryKey().default('default'),
  missionText: text('mission_text').notNull().default(''),
  visionText: text('vision_text').notNull().default(''),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const leaders = pgTable('leaders', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull().default(''),
  photoUrl: text('photo_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const coreValues = pgTable('core_values', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const homeContent = pgTable('home_content', {
  id: varchar('id', { length: 50 }).primaryKey().default('default'),
  headlineLine1: varchar('headline_line1', { length: 500 }).notNull().default(''),
  headlineLine2: varchar('headline_line2', { length: 500 }).notNull().default(''),
  headlineAccent: varchar('headline_accent', { length: 255 }).notNull().default(''),
  subtitle: text('subtitle').notNull().default(''),
  ctaLabel: varchar('cta_label', { length: 255 }).notNull().default('Our Programs'),
  ctaHref: varchar('cta_href', { length: 500 }).notNull().default('/programs'),
  introText: text('intro_text').notNull().default(''),
  introBackgroundUrl: text('intro_background_url'),
  introCtaLabel: varchar('intro_cta_label', { length: 255 }).notNull().default('About Us'),
  introCtaHref: varchar('intro_cta_href', { length: 500 }).notNull().default('/about'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const heroSlides = pgTable('hero_slides', {
  id: uuid('id').defaultRandom().primaryKey(),
  imageUrl: text('image_url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const partners = pgTable('partners', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 500 }).notNull().default(''),
  logoUrl: text('logo_url').notNull().default(''),
  websiteUrl: text('website_url'),
  tall: boolean('tall').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const contactContent = pgTable('contact_content', {
  id: varchar('id', { length: 50 }).primaryKey().default('default'),
  locationText: text('location_text').notNull().default(''),
  email: varchar('email', { length: 255 }).notNull().default(''),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
