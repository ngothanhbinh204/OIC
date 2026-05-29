# Token Mapping Guide

Use this reference to translate design values from Figma to Tailwind utility classes.

## Spacing (padding, margin, gap)

The project uses a custom scale where `1 unit = 4px` mapped via `calc(size/1920*100rem)`.

| Tailwind value | Approx px | Tailwind class pattern |
|----------------|-----------|------------------------|
| `1` | 4px | `p-1`, `mt-1`, `gap-1` |
| `2` | 8px | `p-2`, `mt-2`, `gap-2` |
| `3` | 12px | `p-3`, `mt-3`, `gap-3` |
| `4` | 16px | `p-4`, `mt-4`, `gap-4` |
| `5` | 20px | `p-5`, `mt-5`, `gap-5` |
| `6` | 24px | `p-6`, `mt-6`, `gap-6` |
| `8` | 32px | `p-8`, `mt-8`, `gap-8` |
| `10` | 40px | `p-10`, `mt-10`, `gap-10` |
| `12` | 48px | `p-12`, `mt-12`, `gap-12` |
| `16` | 64px | `p-16`, `mt-16`, `gap-16` |
| `20` | 80px | `p-20`, `mt-20`, `gap-20` |
| `25` | 100px | `p-25`, `mt-25`, `gap-25` |
| `30` | 120px | `p-30`, `pt-30` |
| `40` | 160px | `py-40` (large section padding) |

> If no token fits exactly, use `rem:` prefix: `rem:pt-[90px]`

## Font Size

| Design (px) | Tailwind class |
|-------------|----------------|
| 12px | `text-xs` |
| 14px | `text-sm` |
| 16px | `text-base` |
| 18px | `text-lg` |
| 20px | `text-xl` |
| 24px | `text-2xl` |
| 28px | `text-28` |
| 30px | `text-3xl` |
| 32px | `text-32` |
| 34px | `text-34` |
| 36px | `text-4xl` |
| 40px | `text-40` |
| 48px | `text-5xl` |
| 56px | `text-56` |
| 60px | `text-6xl` |
| 64px | `text-64` |
| 72px | `text-7xl` |

> For arbitrary sizes not in this list, use `rem:text-[22px]` (never `text-[22px]`)

## Colors

### Brand Colors
| Name | Tailwind class | Hex |
|------|----------------|-----|
| Primary main | `text-primary-700` / `bg-primary-700` | `#1d4ed8` |
| Secondary main | `text-secondary-700` / `bg-secondary-700` | `#6d28d9` |
| Neutral main | `text-neutral-500` / `bg-neutral-500` | `#818181` |
| Dark text | `text-main` | `#333333` |
| Dark bg | `bg-dark` | `#111111` |
| Light bg | `bg-light` | `#eeeeee` |
| White | `text-white` / `bg-white` | `#ffffff` |
| Black | `text-black` / `bg-black` | `#000000` |

### Background Gradients
| Name | Tailwind class |
|------|----------------|
| Main brand gradient | `bg-bg` |
| Gradient 1 (blue radial) | `bg-gradient-1` |
| Gradient 2 (green linear) | `bg-gradient-2` |
| Dark blue gradient | `bg-dark-blue-gradient` |
| Light gold gradient | `bg-light-blue-gradient` |
| Dark overlay | `bg-dark` |
| Light overlay | `bg-light` |

### Overlay / Translucent
| Name | Tailwind class |
|------|----------------|
| Dark translucent | `bg-translucentDark` |
| Light translucent | `bg-translucentLight` |

## Border Radius

| px approx | Tailwind class |
|-----------|----------------|
| 4px | `rounded-1` |
| 8px | `rounded-2` |
| 12px | `rounded-3` |
| 16px | `rounded-4` |
| 20px | `rounded-5` |
| 24px | `rounded-6` |
| full | `rounded-full` |

## Breakpoints

| Name | Min width | Usage |
|------|-----------|-------|
| `xs` | 320px | Very small mobile |
| `sm` | 576px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop start |
| `xl` | 1200px | Large desktop |
| `2xl` | 1400px | Wide screen |
| `3xl` | 1600px | Ultra-wide |

> Desktop designs are at 1920px. Layout columns typically switch at `lg:` (1024px).

## Column Widths (12-column grid)

| Columns | Tailwind class |
|---------|----------------|
| 1/12 | `lg:w-1/12` |
| 2/12 | `lg:w-2/12` |
| 3/12 = 1/4 | `lg:w-3/12` |
| 4/12 = 1/3 | `lg:w-4/12` |
| 5/12 | `lg:w-5/12` |
| 6/12 = 1/2 | `lg:w-6/12` |
| 7/12 | `lg:w-7/12` |
| 8/12 = 2/3 | `lg:w-8/12` |
| 9/12 = 3/4 | `lg:w-9/12` |
| 10/12 | `lg:w-10/12` |
| 12/12 full | `lg:w-full` |
