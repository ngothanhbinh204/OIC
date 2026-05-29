---
applyTo: "src/**/*.{pug,sass,js}"
description: "Apply when editing frontend UI files in this workspace that use Pug, Sass, TailwindCSS, and jQuery."
---

# Frontend UI Design System Conventions

Apply these conventions when editing frontend UI in this workspace.

## Before Coding

- Re-read the design before implementing UI.
- Re-read `.cursorrules` before editing UI.
- Re-read `tailwind.config.js` before editing UI.
- Treat the actual `tailwind.config.js` in the current project as the source of truth.
- Reuse existing component and section patterns already present in the repo.

## Markup Rules

- Wrap each main content block in a `section` tag.
- For sections inside `main`, use naming in the form `section.section-[name]`. Do not apply this rule to header or footer.
- Write Tailwind utilities directly in the `class` attribute.
- Keep semantic HTML optimized for SEO, especially heading hierarchy.

## Layout Rules

- Prioritize grid and flexbox for layout.
- If using flexbox columns, prefer the project pattern below:

```pug
div.row
  div.col(class="lg:w-6/12")
  div.col(class="lg:w-6/12")
```

## Styling Rules

- Prefer using `@apply` inside Sass for reusable styling.
- Reuse project tokens from `tailwind.config.js` for spacing, font sizes, colors, radius, shadows, and breakpoints.
- Prefer arbitrary text utilities only when the current project actually supports that pattern.

## Asset Rules

- Put images in the project's image folder.
- If the project provides a Pug image mixin such as `+PugImg()`, use it instead of hardcoding image tags.
- Do not use SVG icons when the project convention is Font Awesome.

## JavaScript Rules

- Use jQuery when the project is already built around jQuery.
- Put general UI JavaScript in `src/js/main.js`.
- Put slider or carousel logic in `src/js/swiper.js` when that file exists for the project.

## Form Rules

- Do not use `select` unless it is required for a real form control.

## Working Style

- Start from structure and content first.
- Keep changes focused and minimal.
- Follow the existing repo naming, spacing, and file organization instead of introducing a new pattern.