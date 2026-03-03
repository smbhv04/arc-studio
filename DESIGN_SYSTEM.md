# ARC Studio Design System

## 1. Typography System

**Primary Font:** `Inter` (Sans-serif)
*Reasoning:* Clean, neutral, highly legible at all sizes, and widely available. Fits the "calm confidence" brand personality.
**Secondary Font:** `Playfair Display` (Serif - Headlines only)
*Reasoning:* Adds a touch of editorial elegance and premium feel for high-impact headings.

### Fluid Type Scale
Using a `clamp()` based approach for responsiveness.

| Role | Mobile (min) | Desktop (max) | Line Height | Letter Spacing | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (H1)** | 3.5rem (56px) | 6rem (96px) | 1.1 | -0.02em | Playfair Display |
| **H2** | 2.25rem (36px) | 3.75rem (60px) | 1.2 | -0.02em | Playfair Display |
| **H3** | 1.5rem (24px) | 2rem (32px) | 1.3 | -0.01em | Inter / Playfair |
| **Body Large** | 1.125rem (18px) | 1.25rem (20px) | 1.6 | 0 | Inter |
| **Body** | 1rem (16px) | 1rem (16px) | 1.65 | 0 | Inter |
| **Caption** | 0.875rem (14px) | 0.875rem (14px) | 1.4 | 0.05em (caps) | Inter |

**Safety Rules:**
- Containers must scale height with text.
- No `height` on text elements, use `min-height` if alignment needed.
- Interactive text (links/buttons) min-height: 44px.

## 2. Color System

| Token | Hex | Role | Contrast on White |
| :--- | :--- | :--- | :--- |
| `arc-white` | `#fafafa` | Primary Background | N/A |
| `arc-charcoal` | `#1a1a1a` | Primary Text / Elements | 16.5:1 (AAA) |
| `arc-gray` | `#f4f4f5` | Secondary Background | 1.2:1 (Low - Bg only) |
| `arc-text-sec` | `#71717a` | Secondary Text | 4.6:1 (AA) |
| `arc-border` | `rgba(26,26,26,0.1)` | Dividers / Borders | N/A |

**Usage Rules:**
- **Text:** Always `arc-charcoal` for headings/body. `arc-text-sec` for supporting text only.
- **Backgrounds:** `arc-white` is default. `arc-gray` for cards/sections.
- **Micro-interactions:** Hover states darken by 10% or increase opacity.

## 3. Spacing & Layout System

**Base Unit:** `4px` (0.25rem)

### Spacing Scale
| Token | Value | Rem | Usage |
| :--- | :--- | :--- | :--- |
| 1 | 4px | 0.25 | Tight grouping |
| 2 | 8px | 0.5 | Item spacing |
| 3 | 12px | 0.75 | Icon spacing |
| 4 | 16px | 1.0 | Component padding |
| 6 | 24px | 1.5 | Card padding |
| 8 | 32px | 2.0 | Section subsections |
| 12 | 48px | 3.0 | Section gaps (Mobile) |
| 20 | 80px | 5.0 | Section gaps (Desktop) |

### Grid System
- **Container Max:** `1280px` (plus padding)
- **Gutters:**
    - Mobile: `16px`
    - Tablet: `24px`
    - Desktop: `32px` or `48px`
- **Columns:**
    - Mobile: 4 cols
    - Tablet: 6 cols
    - Desktop: 12 cols

## 4. Responsive Rules

**Breakpoints:**
- **sm (Mobile):** 640px
- **md (Tablet):** 768px
- **lg (Desktop):** 1024px
- **xl (Wide):** 1280px

**Behavior Rules:**
1. **Stacking:** Grid columns stack to 1 col on `sm` by default.
2. **Typography:** Smooth scaling via `clamp()` or `md:` prefixes.
3. **Motion:** Reduce parallax/heavy transitions on touch devices (`@media (hover: none)`).

## 5. Component Guidelines

### Buttons
- **Height:** 48px+ for primary actions.
- **Padding:** X: 24px, Y: 12px.
- **Radius:** 4px or Sharp (0px) for "System" feel.
- **Hover:** Slight generic ease transition (200ms).

### Cards (Service/Project)
- **Padding:**
    - Mobile: 24px
    - Desktop: 40px
- **Hover:** Subtle border darken or slight lift (-2px Y).
- **Mobile:** Full width, stacked.

### Navigation
- **Mobile:** Hamburger/Hidden menu or simplified links.
- **Desktop:** Hardware-accelerated sticky header or static.

## 6. Optimization & Safety

- **Images:** Always define `aspect-ratio` in CSS or `width/height` attributes to prevent CLS (Cumulative Layout Shift).
- **Touch:** All tap targets must include at least 8px spacing from neighbors.
- **Forms:** Input fields font-size 16px to prevent iOS zoom.

## 7. Tailwind Configuration Reference

```javascript
// tailwind.config.js snippet
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    colors: {
      'arc-white': '#fafafa',
      'arc-charcoal': '#1a1a1a',
      'arc-gray': '#f4f4f5',
    },
    spacing: {
      '128': '32rem', // Extended scale
    }
  }
}
```
