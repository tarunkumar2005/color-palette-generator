# Color Palette Generator

A small color palette tool built with plain HTML, CSS, and JavaScript. Generates random 5-color palettes, copy any color to your clipboard, and lock colors you like while regenerating the rest. No frameworks, no build step, no dependencies.

Built as the second project in a 15-project revision series — continuing to refresh HTML/CSS/JS fundamentals by writing every line of code independently.

---

## What it does

- Generates 5 random HEX colors at the click of a button
- Click any color swatch or hex value to copy it to your clipboard
- Lock individual colors so they stay fixed when you generate a new palette
- The copy button shows a checkmark animation on success (2-second feedback)
- Responsive grid layout that adapts to screen size

---

## How to run it

No installation. No `npm install`. Just:

1. Clone or download the repo
2. Open `index.html` in any modern browser
3. Click **Generate Palette**

That's it.

---

## Project structure

```
color-palette-generator/
├── index.html      # Markup with 5 color boxes and action buttons
├── style.css       # Styling, responsive grid layout
└── script.js       # All the logic: generation, clipboard, lock feature
```

The whole thing is roughly 130 lines across three files.

---

## What I practised building this

- **DOM selection and traversal** — `getElementById`, `querySelector`, `querySelectorAll`, `closest`, `nextElementSibling`
- **Event delegation** — a single click listener on the container handles copy, color swatch, and lock clicks via `e.target` class checks
- **Clipboard API** — `navigator.clipboard.writeText()` with Promise-based success/error handling
- **CSS transitions** — hover lift effects on color boxes and buttons
- **CSS Grid** — `repeat(auto-fit, minmax(...))` for responsive layout
- **UI state via class swapping** — toggling between `fa-copy`/`fa-check` and `fa-lock-open`/`fa-lock` icons
- **Application state with arrays** — tracking locked colors using a parallel boolean array, indexed by color box position

---

## Things I learned the hard way

- **Event delegation means understanding `e.target`.** When a click lands on the container, `e.target` is the most nested element clicked. Checking specific classes (`copy-btn`, `color`, `lock-btn`) lets one listener handle multiple actions. But this means the event path depends on the exact HTML structure.
- **`querySelectorAll` returns a NodeList, not an Array.** You can't call `.indexOf()` on a NodeList directly. Converting with `Array.from()` first is a clean workaround.
- **`.closest()` is better than sibling traversal for finding parent elements.** `e.target.nextElementSibling.querySelector(...)` breaks if the HTML structure changes. `e.target.closest(".color-box").querySelector(...)` is structure-independent and more resilient.
- **Dead code hides in plain sight.** Writing `colors[i] = colors[i]` inside a conditional "does nothing" syntactically — but it communicates intent poorly. Replacing it with `continue` makes the logic explicit: "skip this iteration because the color is locked."
- **Identifying bugs in tutorials builds real confidence.** Spotting that the video's `showCopySuccess` had no element parameter — and that it always updated only the first copy button — was caught before the tutorial even addressed it. That's the difference between passive watching and active learning.

---

## License

MIT — do whatever you want with it.