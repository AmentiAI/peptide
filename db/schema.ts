import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  jsonb,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export const sites = pgTable('sites', {
  id: serial('id').primaryKey(),
  domain: text('domain').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull().default(''),
  description: text('description').notNull().default(''),
  primaryColor: text('primary_color').notNull().default('#0f4c81'),
  accentColor: text('accent_color').notNull().default('#1a73e8'),
  vendor: text('vendor').notNull().default('peptidesciences'),
  affiliateId: text('affiliate_id').notNull().default(''),
  baseUrl: text('base_url').notNull().default(''),
  logoUrl: text('logo_url'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  shortName: text('short_name').notNull().default(''),
  category: text('category').notNull().default(''),
  description: text('description').notNull().default(''),
  longDescription: text('long_description').notNull().default(''),
  benefits: text('benefits').array().notNull().default([]),
  dosage: text('dosage').notNull().default(''),
  halfLife: text('half_life').notNull().default(''),
  imageUrl: text('image_url').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  vendorUrls: jsonb('vendor_urls').notNull().default({}),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const siteProducts = pgTable(
  'site_products',
  {
    id: serial('id').primaryKey(),
    siteId: integer('site_id')
      .notNull()
      .references(() => sites.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    affiliateUrl: text('affiliate_url'),
    customImageUrl: text('custom_image_url'),
    isFeatured: boolean('is_featured').notNull().default(false),
    position: integer('position').notNull().default(0),
    isVisible: boolean('is_visible').notNull().default(true),
  },
  (t) => [uniqueIndex('site_products_unique').on(t.siteId, t.productId)]
)

export const pageSections = pgTable('page_sections', {
  id: serial('id').primaryKey(),
  siteId: integer('site_id')
    .notNull()
    .references(() => sites.id, { onDelete: 'cascade' }),
  page: text('page').notNull().default('home'),
  sectionType: text('section_type').notNull(),
  position: integer('position').notNull().default(0),
  isVisible: boolean('is_visible').notNull().default(true),
  content: jsonb('content').notNull().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const guides = pgTable('guides', {
  id: serial('id').primaryKey(),
  siteId: integer('site_id').references(() => sites.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  content: text('content').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  readTime: text('read_time').notNull().default('5 min read'),
  relatedProductSlugs: text('related_product_slugs').array().notNull().default([]),
  isPublished: boolean('is_published').notNull().default(true),
  publishedAt: timestamp('published_at').defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const clicks = pgTable('clicks', {
  id: serial('id').primaryKey(),
  siteDomain: text('site_domain').notNull(),
  affiliateId: text('affiliate_id').notNull().default(''),
  vendor: text('vendor').notNull().default(''),
  productSlug: text('product_slug').notNull().default(''),
  productName: text('product_name').notNull().default(''),
  ip: text('ip').notNull().default(''),
  userAgent: text('user_agent').notNull().default(''),
  referrer: text('referrer').notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Site = typeof sites.$inferSelect
export type NewSite = typeof sites.$inferInsert
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type SiteProduct = typeof siteProducts.$inferSelect
export type PageSection = typeof pageSections.$inferSelect
export type Guide = typeof guides.$inferSelect
export type Click = typeof clicks.$inferSelect
