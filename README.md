# RegEx Visual Tester

An interactive, high-contrast, document-style regular expression development tool built using **Angular** and **Tailwind CSS v4**.

- **Live Demo:** [https://regex-visual-tester.vercel.app/](https://regex-visual-tester.vercel.app/)

---

## 🛠️ Tech Stack & Key Features

* **Angular (v22+)** – Robust reactive state management powered entirely by Angular Signals.
* **Tailwind CSS v4** – Modern CSS-first design setup with stark, high-contrast, documentation-style aesthetic.
* **Atomic & DDD Structure** – Separation of globally reusable UI primitives from rich, isolated feature domains.
* **Precompiled RegEx Engine** – Real-time validation, syntax parsing, matches offset detection, and capture group mapping.
* **Interactive Presets** – Instant mock testing using production-ready presets (emails, dates, HTML tags).

---

## 📂 Architecture Structure

The workspace follows a strict modular separation matching Atomic and Domain-Driven design paradigms:

```text
src/
└── app/
    ├── core/                          # Global Singletons (Models, Configs, Services)
    │   └── models/
    │       └── regex.model.ts         # Base contracts for capture groups & matches
    ├── shared/                        # Atomic Layout Primitives
    │   └── components/
    │       └── ui/
    │           ├── badge/             # Atomic high-contrast badge
    │           ├── button/            # Flat offset-shadow interactive button
    │           └── card/              # Structured container layout cards
    └── features/                      # Domain Feature Workspace
        └── tester/                    # Main RegEx Tester Dashboard
            ├── components/            # Isolated components (Input, Editor, Highlights)
            ├── services/
            │   └── tester-state.service.ts # Core evaluation state & Signals manager
            └── tester.component.ts    # Dashboard root container
```

---

## 💻 Local Workspace Management

### Local Development Server

Run the development server locally:

```bash
npm run start
# Or using the global CLI: ng serve
```

Navigate to `http://localhost:4200/`. The workspace compiles in memory and reloads on changes.

### Production Build

Compile the production artifacts:

```bash
npm run build
```

This optimizes code, runs compilation hooks, and stores static assets inside the `dist/regex-visual-tester/browser` folder.

### Testing

Run tests through Vitest:

```bash
npm run test
```

---

## 🚀 Cloud Deployment

The project is preconfigured to deploy directly onto Vercel. 

### Custom Fallback Routing
To enable deep-linking routing and prevent MIME-type static asset blocking on direct refreshes, the project utilizes a optimized fallback rewrite structure:

```json
{
  "version": 2,
  "outputDirectory": "dist/regex-visual-tester/browser",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
