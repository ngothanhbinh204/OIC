# File Conventions

## Component Files

New section/component files live in `src/components/[section-name]/`:

```
src/components/
└── hero/
    ├── hero.pug       ← markup
    └── hero.sass      ← styles
```

After creating a new `.sass` file, import it in:
- `src/components/_core/index.sass` (add `@use '../[name]/[name]'`)

## Pages

Page-level Pug files live in `src/pages/`:
- `src/pages/index.pug` → homepage
- `src/pages/about.pug` → about page
- etc.

Pages use the layout from `src/pages/_layout/` and include component mixins.

## Images

All images go in `src/img/`.  
Always use the `+PugImg()` mixin — never hardcode `<img src="...">` paths.

## JavaScript

| Type | File |
|------|------|
| General UI interactions | `src/js/main.js` |
| Swiper / slider init | `src/js/swiper.js` |
| Map controls | `src/js/mapControll.js` |
| Specific page logic | `src/js/[pagename].js` |

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Section tag | `section.section-[name]` | `section.section-about` |
| Component block | `.section-[name]__[element]` | `.section-about__title` |
| Modifier | `.section-[name]--[modifier]` | `.section-about--dark` |
