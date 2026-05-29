# Implementation Checklist

Use this before submitting any Figma-to-Pug implementation.

## Pre-flight
- [ ] Read `.cursorrules`
- [ ] Read `tailwind.config.js`
- [ ] Read `frontend-ui-design-system.instructions.md`
- [ ] Viewed the design image with `view_image`

## Markup
- [ ] Each content block wrapped in `section.section-[name]`
- [ ] `.container` used inside every section
- [ ] Correct heading hierarchy (h1 → h2 → h3)
- [ ] All Tailwind classes are in `class=""` attribute, not chained with `.`
- [ ] `+PugImg()` mixin used for all images
- [ ] Font Awesome used for all icons (no inline SVG)
- [ ] No bare `select` element unless it's a real form control

## Styling
- [ ] All Sass uses `@apply` for Tailwind utilities
- [ ] BEM naming: `.section-[name]__[element]`
- [ ] New `.sass` file imported in `src/components/_core/index.sass`
- [ ] Arbitrary px values use `rem:` prefix (`rem:text-[18px]`)
- [ ] Color tokens from `tailwind.config.js` used (not hardcoded hex)
- [ ] Spacing tokens from scale used (not arbitrary where avoidable)

## Visual QA
- [ ] Desktop layout matches design (check at 1920px baseline)
- [ ] Typography: size, weight, line-height, color match
- [ ] Spacing between sections and elements match
- [ ] Background colors and gradients correct
- [ ] Images visible and in correct position/ratio
- [ ] Hover/interactive states implemented if visible in design
- [ ] Mobile layout looks reasonable (layout doesn't break)

## Code Quality
- [ ] No Sass compile errors
- [ ] No missing `@apply` class errors
- [ ] No unused Pug variables or blocks
- [ ] jQuery interactions work on page load and after DOM ready
- [ ] No console errors in browser

## Output Summary
After completing implementation, report:
1. Files changed
2. What was adjusted to match the design
3. Any assumptions or unresolved ambiguities
4. Whether image-by-image QA is still needed
