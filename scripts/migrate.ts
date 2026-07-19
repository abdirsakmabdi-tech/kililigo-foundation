import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const sql = neon(url)

  await sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" varchar(255) NOT NULL UNIQUE,
      "password_hash" text NOT NULL,
      "name" varchar(255) NOT NULL,
      "role" varchar(50) DEFAULT 'admin' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "news" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "slug" varchar(255) NOT NULL UNIQUE,
      "title" varchar(500) NOT NULL,
      "excerpt" text DEFAULT '' NOT NULL,
      "body" text DEFAULT '' NOT NULL,
      "cover_image_url" text,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "published_at" timestamp with time zone,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "press_releases" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "slug" varchar(255) NOT NULL UNIQUE,
      "title" varchar(500) NOT NULL,
      "excerpt" text DEFAULT '' NOT NULL,
      "body" text DEFAULT '' NOT NULL,
      "attachment_url" text,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "published_at" timestamp with time zone,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "vacancies" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "slug" varchar(255) NOT NULL UNIQUE,
      "title" varchar(500) NOT NULL,
      "location" varchar(255) DEFAULT '' NOT NULL,
      "employment_type" varchar(100) DEFAULT 'Full-time' NOT NULL,
      "description" text DEFAULT '' NOT NULL,
      "apply_email" varchar(255) DEFAULT '' NOT NULL,
      "deadline" timestamp with time zone,
      "status" varchar(20) DEFAULT 'open' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "programs" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "slug" varchar(255) NOT NULL UNIQUE,
      "title" varchar(500) NOT NULL,
      "description" text DEFAULT '' NOT NULL,
      "category" varchar(100) DEFAULT '' NOT NULL,
      "cover_image_url" text,
      "group" varchar(50) DEFAULT 'core' NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "show_on_home" boolean DEFAULT false NOT NULL,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "about_content" (
      "id" varchar(50) PRIMARY KEY DEFAULT 'default' NOT NULL,
      "mission_text" text DEFAULT '' NOT NULL,
      "vision_text" text DEFAULT '' NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "leaders" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" varchar(255) NOT NULL,
      "role" varchar(255) DEFAULT '' NOT NULL,
      "photo_url" text,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "core_values" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "title" varchar(255) NOT NULL,
      "description" text DEFAULT '' NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "home_content" (
      "id" varchar(50) PRIMARY KEY DEFAULT 'default' NOT NULL,
      "headline_line1" varchar(500) DEFAULT '' NOT NULL,
      "headline_line2" varchar(500) DEFAULT '' NOT NULL,
      "headline_accent" varchar(255) DEFAULT '' NOT NULL,
      "subtitle" text DEFAULT '' NOT NULL,
      "cta_label" varchar(255) DEFAULT 'Our Programs' NOT NULL,
      "cta_href" varchar(500) DEFAULT '/programs' NOT NULL,
      "intro_text" text DEFAULT '' NOT NULL,
      "intro_background_url" text,
      "intro_cta_label" varchar(255) DEFAULT 'About Us' NOT NULL,
      "intro_cta_href" varchar(500) DEFAULT '/about' NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "hero_slides" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "image_url" text NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "partners" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" varchar(255) NOT NULL,
      "full_name" varchar(500) DEFAULT '' NOT NULL,
      "logo_url" text DEFAULT '' NOT NULL,
      "website_url" text,
      "tall" boolean DEFAULT false NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "status" varchar(20) DEFAULT 'draft' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS "contact_content" (
      "id" varchar(50) PRIMARY KEY DEFAULT 'default' NOT NULL,
      "location_text" text DEFAULT '' NOT NULL,
      "email" varchar(255) DEFAULT '' NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `

  console.log('Tables created successfully')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
