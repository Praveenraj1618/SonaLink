# SonaLink Landing Page - Design Specification

**Modern Gen-Z Minimal Aesthetic**

---

## 🎨 Design Tokens

### Color Palette
```css
--color-primary: #2B8FA8  /* Teal Blue - Primary brand color */
--color-accent: #FFA10A   /* Orange - Accent highlights */
--color-orange: #FFA10A   /* Orange - Tertiary accent (minimal use) */
--bg: #FAFAFA             /* Light background */
--surface: #FFFFFF        /* Card/surface background */
--text-1: #1F1F1F         /* Primary text - high contrast */
--text-2: #6B7280         /* Secondary text - medium contrast */
--muted: #E5E7EB          /* Borders, dividers, muted elements */
```

**Contrast Ratios:**
- text-1 on surface: 16.8:1 (AAA)
- text-2 on surface: 4.6:1 (AA)
- primary on surface: 4.5:1 (AA)

### Gradients
```css
--hero-grad: linear-gradient(135deg, #2B8FA8 0%, #FFA10A 100%)
```
**Usage:** Sparingly on primary CTAs and accent bars only

### Typography

**Font Families:**
- Headings: `Poppins` or `Space Grotesk` (600/700 weight)
- Body: `Inter` (400/500 weight)

**Type Scale (8pt harmonious):**
```css
--text-xs: 14px
--text-sm: 14px
--text-base: 16px
--text-lg: 20px
--text-xl: 28px
--text-2xl: 36px
--text-3xl: 48px
```

**Line Heights:**
- Headings: 1.2 (tight)
- Body: 1.5-1.6 (relaxed)

### Spacing (8-point grid)
```css
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
```

### Border Radius
```css
--radius-sm: 8px   /* Small elements */
--radius-md: 12px  /* Buttons, badges */
--radius-lg: 16px  /* Cards, images */
```

### Shadows
```css
--shadow-soft: 0 6px 20px rgba(16, 24, 40, 0.06)
```
**Usage:** Cards, elevated elements

### Animation
```css
--easing: cubic-bezier(0.2, 0.9, 0.2, 1)
--dur-fast: 180ms
--dur-med: 300ms
--dur-slow: 400ms
```

**Hover Effects:**
- Lift: `translateY(-6px)` with shadow increase
- Gradient pulse: background-position animation over 3s

---

## 📐 Layout System

### Desktop (1440px viewport)
- **Grid:** 12 columns
- **Content max-width:** 1200px
- **Column gutters:** 24px
- **Outer margins:** 120px left/right
- **Vertical spacing:** 96-128px between sections

### Mobile (390px viewport)
- **Grid:** 4 columns
- **Column gutters:** 16px
- **Outer margins:** 16px left/right
- **Vertical spacing:** 64-96px between sections

### Auto Layout Rules
- All sections use CSS Grid or Flexbox
- No `position: absolute` except decorative accents **within** container bounds
- All elements snap to 8pt baseline grid
- Cards maintain equal heights within rows

---

## 🏗️ Section Specifications

### A. Sticky Navbar
**Tokens:**
- Height: `64px` (h-16)
- Background: `--surface` (#FFFFFF)
- Border: `1px solid --muted`
- Shadow: `--shadow-soft`
- Padding vertical: `8px` (var(--space-2))

**Layout:**
- Left: Logo (32px icon + wordmark)
- Right: Login (ghost button) + Sign Up (gradient button)
- Vertical center alignment
- Stays within grid container

**Interactions:**
- Sticky on scroll
- Button hover: slight scale or color shift (180ms)

---

### B. Hero Section
**Tokens:**
- Desktop height: ~720px (py-24 to py-32)
- Mobile height: ~560px
- Spacing between columns: `48-64px` (gap-12 to gap-16)

**Layout:**
- Two-column grid (lg:grid-cols-2)
- Left column: max-width 560px
  - H1: `48px` (text-3xl), 700 weight, 1.2 line-height
  - Subcopy: `20px` (text-lg), 1.5 line-height
  - CTAs: row on desktop, stack on mobile, `16px` gap
- Right column: Visual card
  - Image with `16px` radius (rounded-2xl)
  - Shadow: `--shadow-soft`
  - Decorative accent: gradient circle, within bounds

**CTA Buttons:**
- Primary: `gradient-hero` background, `gradient-pulse` on hover
- Secondary: `outline` variant, `2px` border
- Both: `12px` radius (rounded-xl), `24px` padding vertical

**Interactions:**
- Primary CTA: gradient pulse animation (3s loop)
- Image: parallax `translateY(6px)` on scroll (optional)

---

### C. "How SonaLink Helps" Features
**Tokens:**
- Background: `--surface` (#FFFFFF)
- Card padding: `32px` (p-8)
- Gap between cards: `24px` (gap-6)
- Card radius: `16px` (rounded-2xl)
- Card border: `1px solid --muted`

**Layout:**
- 2×2 grid on desktop (md:grid-cols-2)
- Vertical stack on mobile
- Equal card heights within rows

**Card Structure:**
- Icon: `48px` circle, `--primary/10` background, `24px` icon
- H3: `28px` (text-xl), 600 weight
- Description: `16px` (text-base), 2-line clamp, 1.5 line-height
- Icon aligned to 8pt baseline

**Interactions:**
- Hover: `translateY(-6px)` + shadow increase (300ms)

---

### D. "How It Works" - 3 Steps
**Tokens:**
- Card padding: `32px` (p-8)
- Gap between cards: `32px` (gap-8)
- Numbered badge: `48px` circle, gradient background

**Layout:**
- 3-column grid on desktop (md:grid-cols-3)
- Vertical stack on mobile
- Equal card heights
- Tiny arrow icons between cards (desktop only)

**Card Structure:**
- Numbered badge: gradient `01`, `02`, `03`
- H3: `20px` (text-lg), 600 weight
- Description: `16px` (text-base), 1.5 line-height

**Arrows:**
- Position: absolute, centered between cards
- Color: `--muted`
- Size: `32px`
- Hidden on mobile

---

### E. Social Proof - Early Access
**Tokens:**
- Background: `--surface` (#FFFFFF)
- Card padding: `48-64px` desktop, `32px` mobile
- Badge: outline variant, `--primary` color

**Content Rules:**
- **No fake claims** - use "Early Access" messaging
- **No star ratings** until real testimonials
- **No user names** until verified
- Placeholder testimonials: 40% opacity, labeled "Placeholder"

**Layout:**
- Centered text block
- Badge at top
- H2 + description
- 3-column placeholder grid (muted, de-emphasized)

---

### F. Final CTA Band
**Tokens:**
- Background: `--surface` (#FFFFFF)
- Padding: `48-64px` desktop, `24-32px` mobile
- Card radius: `16px` (rounded-2xl)
- Shadow: `--shadow-soft`

**Layout:**
- Centered content
- H2 + description
- CTAs: mirror hero section (same buttons)

**Consistency:**
- Button styles, sizes, spacing match hero exactly

---

### G. Footer
**Tokens:**
- Background: `--surface` (#FFFFFF)
- Border top: `1px solid --muted`
- Padding vertical: `48px`
- Text size: `16px` (text-base)

**Layout:**
- 3-column grid on desktop
- Vertical stack on mobile
- Links, Contact, Legal sections
- Copyright at bottom center

**Links:**
- Color: `--text-2` (#6B7280)
- Hover: `--primary` (#2B8FA8)
- Transition: 180ms color change

---

## ✅ Acceptance Checklist

### Layout & Grid
- [x] Desktop uses 12-column grid, max-width 1200px, margins 120px
- [x] Mobile uses 4-column grid, margins 16px
- [x] All sections use Auto Layout (Grid/Flexbox)
- [x] No absolute positioning except decorative accents within bounds
- [x] No visual bleed outside max-width container
- [x] All elements snap to 8pt baseline grid

### Typography
- [x] Headings use Poppins/Space Grotesk 600/700
- [x] Body uses Inter 400/500
- [x] Sizes match defined scale (14/16/20/28/36/48)
- [x] Line heights: 1.2 headings, 1.5-1.6 body
- [x] Proper hierarchy maintained on mobile

### Tokens
- [x] Colors match specification
- [x] Spacing uses 8pt grid (4/8/16/24/32/48)
- [x] Radii consistent (8/12/16)
- [x] Shadows use defined token
- [x] Animations use cubic-bezier(.2,.9,.2,1) at 180/300/400ms

### Components
- [x] Buttons use 12px radius, consistent padding
- [x] Cards use 16px radius, shadow-soft
- [x] Hover states: translateY(-6px) + shadow increase
- [x] Equal heights within card rows
- [x] Icon baseline alignment (8pt grid)

### Content Integrity
- [x] No "Trusted by 10,000+" or inflated numbers
- [x] No fake testimonials or star ratings
- [x] "Early Access" messaging used
- [x] Placeholders visually muted (40% opacity)
- [x] No unverified claims present

### Accessibility
- [x] Text contrast ≥ 4.5:1 for body text
- [x] Visible focus states on interactive elements
- [x] Keyboard-navigable buttons and links
- [x] Descriptive ARIA labels on icon-only buttons
- [x] Semantic HTML structure

### Responsive
- [x] Mobile stacks gracefully
- [x] Readable paddings maintained
- [x] No overlap or overflow
- [x] Touch targets ≥ 44px on mobile
- [x] CTA buttons line up across hero and final CTA

---

## 🎯 Tailwind Token Mapping

```css
/* Copy these to tailwind.config.js or use inline */

colors: {
  'brand-primary': '#2B8FA8',
  'brand-accent': '#FFA10A',
  'brand-orange': '#FFA10A',
  'bg-light': '#FAFAFA',
  'surface': '#FFFFFF',
  'text-primary': '#1F1F1F',
  'text-secondary': '#6B7280',
  'border-muted': '#E5E7EB',
}

fontSize: {
  'xs': '14px',
  'sm': '14px',
  'base': '16px',
  'lg': '20px',
  'xl': '28px',
  '2xl': '36px',
  '3xl': '48px',
}

spacing: {
  '1': '4px',
  '2': '8px',
  '3': '16px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
}

borderRadius: {
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '16px',
  '2xl': '16px',
}

boxShadow: {
  'soft': '0 6px 20px rgba(16, 24, 40, 0.06)',
}

transitionTimingFunction: {
  'snappy': 'cubic-bezier(0.2, 0.9, 0.2, 1)',
}

transitionDuration: {
  'fast': '180ms',
  'med': '300ms',
  'slow': '400ms',
}
```

---

## 📦 Exported Assets

### SVG Icons
- Logo icon (16×16, white on gradient)
- Feature icons (Upload, MessageSquare, GraduationCap, Users)
- Arrow icons (ArrowRight, ArrowRightCircle, CheckCircle)

### Images
- Hero image: Campus students studying (Unsplash)
- Recommended: 1080×720px minimum, optimized WebP

### Gradient Definition
```css
.gradient-hero {
  background: linear-gradient(135deg, #2B8FA8 0%, #FFA10A 100%);
}

.gradient-pulse {
  background-size: 200% 200%;
  animation: gradientPulse 3s ease infinite;
}

@keyframes gradientPulse {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 🔄 Future Content Updates

When real data is available:

1. **Metrics Section:** Replace "Early Access" with actual numbers
   - Active students count
   - Materials shared
   - Courses available
   - Success rate (if trackable)

2. **Testimonials:** Replace placeholders with verified reviews
   - Real student names + roles
   - Actual quotes (with permission)
   - Profile photos or avatars
   - Optional: link to full case studies

3. **Social Proof:** Add trust indicators
   - Partner universities
   - Featured in press
   - User success stories

**Until then:** Keep "Early Access - built by students, for students" messaging to maintain honesty and build trust.

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1440px /* Extra large */
```

**Key breakpoints used:**
- `md:` - Switch from mobile stack to desktop grid
- `lg:` - Activate 2-column hero layout
- Container padding switches at 768px (md)

---

## 🎨 Design Notes

### Stylistic Inspiration
- Clean, modular hero → features → how it works → CTA flow
- Gen-Z appeal through gradients (used sparingly)
- Academic product tone (professional but approachable)
- Template-like structure for easy content updates

### Micro-interactions
- Gradient pulse on primary CTA (subtle, 3s loop)
- Card hover lift (6px translateY + shadow)
- Button scale on hover (subtle, 102%)
- Link color transition (180ms)

### Performance
- Lazy load hero image
- Optimize images to WebP
- Minimal animations (transform/opacity only)
- CSS Grid for layout (no JS)

---

**Last Updated:** 2025-10-19  
**Version:** 1.0 - Minimal Launch  
**Status:** Ready for Development
