# UI Components (shadcn/ui)

All UI in this app is built with [shadcn/ui](https://ui.shadcn.com)
components. Do not hand-write custom components for things shadcn already
provides (buttons, inputs, dialogs, dropdowns, tables, forms, etc.).

## Rules

- Always use a component from `components/ui/` (aliased as `@/components/ui`)
  instead of writing raw HTML elements or one-off custom components for
  common UI patterns.
- If the component you need doesn't exist yet under `components/ui/`, add it
  via the shadcn CLI (`npx shadcn add <component>`) rather than writing it by
  hand from scratch.
- Configuration lives in [components.json](../components.json) — style
  `base-nova`, base color `neutral`, icon library `lucide`. Don't introduce a
  second icon library or component kit.
- Compose app-specific UI by combining shadcn primitives, not by
  reimplementing their behavior/styling.

## Non-negotiables

- Don't hand-edit generated shadcn files in `components/ui/*` beyond
  re-running the CLI to regenerate/update them (see `AGENTS.md`).
- Don't add other component libraries (MUI, Chakra, Ant Design, etc.).
