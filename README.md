# Aero

**Aero** is a Web Component–based UI library focused on **behavior and convenience**.

👉 You control the CSS.
👉 Aero handles the behavior.

## Installation

Using a bundler (such as Vite or Webpack) is recommended.
If you are not using a bundler, you can use Aero directly via a CDN without installation.

```bash
npm install @hn250424/aero
```

## Usage

If you're using a bundler (Vite, Webpack, etc.), import Aero once at your application entry point:

```ts
import "@hn250424/aero";
```

You can then use the components in your HTML:

```html
<aero-numeric-input></aero-numeric-input>
```

If you import the component type explicitly,
you can benefit from type checking and IDE auto-completion when creating elements dynamically.

```ts
import type { AeroNumericInput } from "@hn250424/aero";
const input = document.createElement("aero-numeric-input") as AeroNumericInput;
```

For simple usage without a bundler, you can include Aero directly via CDN:

```html
<script src="https://unpkg.com/@hn250424/aero/umd"></script>
```

You can then use the components in your HTML:

```html
<aero-numeric-input></aero-numeric-input>
```

## Documentation

https://hn250424.github.io/aero/

