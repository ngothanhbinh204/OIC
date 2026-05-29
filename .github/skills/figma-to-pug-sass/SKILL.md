---
name: figma-to-pug-sass
description: 'Convert Figma or design images to pixel-accurate Pug + Sass + TailwindCSS UI. Use when cutting a Figma design, implementing a new section from design, or for requests like cắt giao diện Figma, code lại UI theo thiết kế, bám thiết kế Figma, khớp thiết kế desktop, triển khai section từ ảnh thiết kế.'
argument-hint: 'Section or page name, e.g. home-banner or about-section2'
user-invocable: true
---

# Figma to Pug + Sass + TailwindCSS

Convert a design image or Figma export into a pixel-accurate implementation using this workspace's Pug, Sass, TailwindCSS, and jQuery stack.

## When to Use

- User shares a Figma screenshot, exported PNG, or design image to implement
- User requests "cắt giao diện", "code lại UI", "khớp thiết kế"
- New page section needs to be built from scratch matching a visual design
- Existing section needs to be updated to match revised design

## Pre-flight Checklist

BEFORE writing any code, ALWAYS do all of the following:

1. Read `.cursorrules` in the workspace root
2. Read `tailwind.config.js` in the workspace root
3. Read `.github/instructions/frontend-ui-design-system.instructions.md`
4. View the design image with `view_image` to understand the full layout
5. Locate the target `.pug` and `.sass` files (see [file conventions](./references/file-conventions.md))

## Implementation Procedure

### Step 1 — Analyze the Design

- Identify all sections in the image and their visual hierarchy
- Note: background colors, typography sizes, spacing, border radius, shadows
- Note: responsive breakpoints that are visible (desktop vs mobile)
- Map each visual token to a project token using [token-mapping.md](./references/token-mapping.md)
- Identify repeating patterns that should be Pug `mixin` or Sass `@apply` blocks

### Step 2 — Plan the Markup Structure

Before writing Pug, plan the HTML structure:

```
page
└── section.section-[name]          ← wrap every main block in section
    └── .container
```

Rules:
- `section.section-[name]` naming applies inside `<main>` only (not header/footer)
- Class attributes must be written as `div(class="...")` not `div.class-name` for Tailwind utilities
- Use semantic heading hierarchy: one `h1` per page, `h2` for section titles, `h3` for cards

### Step 3 — Map Design Tokens

Use project tokens from `tailwind.config.js` (not arbitrary values) wherever possible.  
Consult [token-mapping.md](./references/token-mapping.md) for spacing, font-size, color, and breakpoint references.

Key rules:
- Spacing: use scale values like `mt-10` (= 40px), `p-6` (= 24px)
- Font size: use named sizes like `text-2xl` (= 24px), `text-base` (= 16px)
- Arbitrary pixel values MUST use `rem:` prefix: `rem:text-[18px]` not `text-[18px]`
- Breakpoints order: mobile-first, use `lg:`, `xl:`, `2xl:` for desktop layout

### Step 4 — Write Pug Markup

```pug
section.section-hero
  .container
    h1.section-hero__title Welcome to Our Site
    p.section-hero__desc We provide amazing services to help you succeed.
    +PugImg(src="/img/hero-image.png" alt="Hero Image")
```

Rules:
- Use `+PugImg()` mixin for ALL images — never hardcode `img` tags with paths
- Use Font Awesome classes for icons — never inline SVG
- Tailwind utilities go inside `class=""` attribute

### Step 5 — Write Sass

```sass
.section-hero
  @apply py-20 bg-white

  &__title
    @apply text-3xl font-bold text-gray-900 mb-6

  &__desc
    @apply text-base text-gray-600 mb-8
```

Rules:
- Use BEM-style naming: `.section-hero__title`, `.section-hero__desc`
- Use `@apply` for all Tailwind utilities inside Sass blocks
- File lives alongside the `.pug` file in `src/components/[section-name]/`
- Import the sass file in `src/components/_core/index.sass` if it's a new component

### Step 6 — Add Interactions (if needed)

- General UI interactions → `src/js/main.js`
- Swiper/slider logic → `src/js/swiper.js`
- Use jQuery (`$()`) syntax
- Initialize on `$(document).ready()` or `$(window).on('load', ...)`

### Step 7 — QA Pass

Compare the rendered output to the design image:
- [ ] Desktop layout matches design (1920px baseline)
- [ ] Typography size, weight, and color are correct
- [ ] Spacing between elements matches design
- [ ] Images are in correct positions and aspect ratios
- [ ] Colors match design (check against Tailwind config custom colors)
- [ ] Responsive behavior looks appropriate on mobile
- [ ] No Sass compile errors or missing `@apply` tokens

## Common Patterns

### Card Grid

```pug
.row
  each item in [1,2,3]
    .col(class="lg:w-4/12")
      .card-item
        +PugImg()
        h3.card-item__title Tiêu đề
        p.card-item__desc Mô tả
```

### Section with Background Image

```pug
section.section-intro(style="background-image: url(...)")
  .container
    h2.section-intro__title ...
```

```sass
.section-intro
  @apply relative bg-cover bg-center
  // use tailwind class, not hardcoded CSS
```

### Marquee / Slider Section

- Wrap slides in `.swiper-wrapper > .swiper-slide`
- Initialize in `src/js/swiper.js` using `new Swiper()`

## References

- [File Conventions](./references/file-conventions.md) — where to put files
- [Token Mapping](./references/token-mapping.md) — spacing, font, color, breakpoint tokens
- [Implementation Checklist](./references/checklist.md) — pre-submit QA checklist
