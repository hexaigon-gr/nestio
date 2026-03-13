# Nestio - Home & Kitchen Gadgets Dropshipping Store

## Overview

Transform the existing Next.js starter into a bilingual (GR/EN) dropshipping store called **Nestio**, selling smart home and kitchen gadgets to the Greece/Cyprus market.

## Brand Identity

- **Name:** Nestio
- **Tagline GR:** "Έξυπνα gadgets για το σπίτι σου"
- **Tagline EN:** "Smart gadgets for your home"
- **Colors:** Teal primary (#0D9488), Orange accent (#F97316), Warm whites/grays
- **Tone:** Modern, trustworthy, friendly

## Products (6 items, hardcoded)

| # | Product | Price | Role |
|---|---------|-------|------|
| 1 | Silicone Stove Gap Covers | €16.90 | Hero / ad driver |
| 2 | Rotating Snack Tray | €29.90 | Hero / viral |
| 3 | Reusable Silicone Food Storage Bags | €21.90 | Cross-sell |
| 4 | Portable Blender USB | €34.90 | Higher ticket |
| 5 | Sunset Lamp Projector | €26.90 | Lifestyle add-on |
| 6 | LED Strip Lights w/ App | €22.90 | Budget entry |

## Site Structure

### Pages

1. **Homepage** (`/[locale]/`)
   - Hero section with tagline + CTA
   - Featured products grid (all 6)
   - Trust badges (Free shipping, Guarantee, Secure payments)
   - Customer reviews/testimonials
   - Newsletter signup
   - Footer

2. **Product Catalog** (`/[locale]/products`)
   - Product grid with category filters
   - Sort by price/popularity

3. **Product Detail** (`/[locale]/products/[slug]`)
   - Image gallery
   - Price + Add to Cart
   - Description + features list
   - Related products

4. **Cart** (`/[locale]/cart`)
   - Cart items list with quantity controls
   - Order summary + total
   - Checkout CTA

5. **Checkout** (`/[locale]/checkout`)
   - Shipping info form (name, address, phone)
   - Order summary
   - Stripe payment integration
   - Order confirmation

6. **Static Pages**
   - About us (`/[locale]/about`)
   - Return policy (`/[locale]/returns`)
   - Terms of use (`/[locale]/terms`)
   - Contact (`/[locale]/contact`)

### Navigation
- Logo (left) + Nav links (Products, About, Contact) + Cart icon with count (right)
- Language switcher (GR/EN)
- Mobile: hamburger menu

## Technical Decisions

### Data Layer
- **Products:** Hardcoded in `lib/data/products.ts` (no DB needed for 6 products)
- **Cart:** Zustand store with localStorage persistence (`lib/stores/cart-store.ts`)
- **Orders:** Saved to Supabase/Prisma DB after checkout

### Payments
- **Stripe Checkout Sessions** (redirect to Stripe-hosted page)
- Requires user to provide Stripe API keys in `.env.local`
- Webhook endpoint for order confirmation

### Internationalization
- Leverage existing next-intl setup (en, el)
- Add product translations in messages/en.json and messages/el.json
- All UI text bilingual

### Design System
- Existing shadcn/ui components
- New brand colors replacing current theme
- Mobile-first, responsive
- Lucide icons throughout

## Non-Goals (for now)
- User accounts / login (not needed initially)
- Search functionality (only 6 products)
- Reviews system (hardcoded testimonials)
- Inventory management
- Automated fulfillment (manual via CJ Dropshipping)
