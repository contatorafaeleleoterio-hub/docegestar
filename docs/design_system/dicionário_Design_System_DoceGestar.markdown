# Design System: Joyful Sanctuary

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Cradle"**

This design system rejects the clinical, utilitarian aesthetic common in maternal health. Instead, it adopts the philosophy of "The Ethereal Cradle"—a digital environment that feels as tactile as fine stationery and as calming as a sun-drenched nursery. 

We break the "standard app" template by leaning into **Editorial Asymmetry**. By utilizing generous whitespace (the "pearlescent cream" base) and high-contrast typography, we create an experience that feels less like a database and more like a premium lifestyle publication. We prioritize sensory depth through glassmorphism and layered tonal surfaces, ensuring every interaction feels intentional, soft, and premium.

---

2. Colors & Surface Philosophy
The palette is a balance of "vibrant but calm." We use warmth to evoke joy and deep teal to provide a grounding sense of clinical security.

### The "No-Line" Rule
**Strict Mandate:** Traditional 1px solid borders are prohibited for sectioning or containment. 
Structure is defined through:
- **Tonal Shifts:** Transitioning from `surface` (#fbf9f5) to `surface_container_low` (#f5f3ef).
- **Soft Shadows:** Utilizing ambient light instead of structural lines.
- **Negative Space:** Using the spacing scale to create mental boundaries.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials.
- **Base Level:** `surface` (#fbf9f5) – The pearlescent foundation.
- **Section Level:** `surface_container_low` (#f5f3ef) – Used for grouping related content blocks.
- **Interaction Level:** `surface_container_lowest` (#ffffff) – Used for high-priority interactive cards to provide a "lifted" feel.

### The Glass & Gradient Rule
To achieve a "Sensory" feel, floating elements (modals, navigation bars) must use **Glassmorphism**:
- **Fill:** `surface_container_lowest` at 70% opacity.
- **Effect:** Backdrop blur (20px–30px).
- **Soul Gradients:** Main CTAs should use a subtle linear gradient from `primary` (#9a442d) to `primary_container` (#e07a5f) to avoid a flat, "web 2.0" appearance.

---

3. Typography
Our typography is a dialogue between the timeless elegance of Noto Serif and the functional modernity of Manrope.

| Level | Token | Font | Weight | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Noto Serif | 700 | Large, poetic moments. |
| **Headline**| `headline-md` | Noto Serif | 600 | Editorial section starts. |
| **Title** | `title-lg` | Manrope | 600 | High-info density headers. |
| **Body** | `body-lg` | Manrope | 400 | Long-form reading. |
| **Label** | `label-md` | Manrope | 500 | Functional metadata. |

**Editorial Note:** Use `display-lg` with a slight negative letter-spacing (-0.02em) to create a high-fashion, premium feel.

---

4. Elevation & Depth
In this design system, depth is a feeling, not a calculation.

### The Layering Principle
Depth is achieved by stacking tones. 
*Example:* A `surface_container_lowest` card placed on a `surface_container_low` background creates a natural, soft elevation that mimics paper overlapping paper.

### Ambient Shadows
When a component must "float" (e.g., a FAB or a floating menu):
- **Color:** Use `on_surface` (#1b1c1a) at 6% opacity.
- **Blur:** Minimum 40px.
- **Spread:** -5px to keep the shadow tucked and sophisticated.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: 
- `outline_variant` (#dbc1ba) at **15% opacity**. 
- **Never** use 100% opaque outlines.

---

5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). `xl` (1.5rem) corner radius. White text (`on_primary`).
- **Secondary:** `surface_container_highest` fill with `primary` text. No border.
- **Tertiary:** Purely typographic using `primary` color, bold weight, with a subtle underline using `outline_variant`.

### Cards & Lists
- **No Dividers:** Prohibit the use of `horizontal-rule` lines. Use 24px–32px of vertical padding to separate list items.
- **Tactile Cards:** Use `lg` (1rem) or `xl` (1.5rem) corner radius. Cards should feel like "soft pebbles."

### Input Fields
- **Style:** Subtle `surface_container_high` background.
- **Focus State:** Transition background to `surface_container_lowest` and add a 2px `surface_tint` "Ghost Border" (20% opacity).
- **Typography:** Placeholder text in `on_surface_variant` (#55423e).

### Signature Component: The "Nurture Bubble"
A bespoke glassmorphic container used for tracking (e.g., pregnancy weeks). It uses a `tertiary_container` (#7b9baa) background with a 40% opacity, a heavy backdrop blur, and `tertiary` text.

---

6. Do's and Don'ts

#### Do:
- **Do** lean into intentional asymmetry. Place a headline on the left and a small "sensory" image offset to the right.
- **Do** use `primary_fixed_dim` (#ffb4a1) for large background washes to create warmth.
- **Do** ensure all micro-interactions use "Spring" easing (e.g., `stiffness: 100, damping: 20`) to mimic natural motion.

#### Don't:
- **Don't** use pure black (#000000) for text. Use `on_surface` (#1b1c1a) to maintain the soft, pearlescent aesthetic.
- **Don't** use sharp corners. Everything in a "Joyful Sanctuary" should feel safe and organic.
- **Don't** use traditional "Material Design" shadows. They are too aggressive for this editorial style.