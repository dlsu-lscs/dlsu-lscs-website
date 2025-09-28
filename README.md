# DLSU LSCS Websitee

## 1. 🚀 Development Setup

- Organized folder structure
- Prettier + ESLint (with Prettier rules)
- Placeholder feature folder structure (\`[feature-name]\`)
- Global styles moved into \`src/styles/globals.css\`

### Scripts

- \`npm run dev\` → Start dev server
- \`npm run build\` → Build production bundle
- \`npm run start\` → Run production build
- \`npm run lint\` → Run ESLint
- \`npm run test\` → Run Vitest

---

## 2. ⚡ Creating a New Feature

You can create a new feature module easily using the CLI command:

\`\`\`bash
npx create-lscs-next-app feature <feature-name>
\`\`\`

This will generate a new folder under \`src/features/<feature-name>\` with the following structure:

- components/
- containers/
- hooks/
- services/
- queries/
- types/
- data/
- README.md

The generated README explains the purpose of each folder.

---

## 3. 🛠️ Tech Stack (Recommended)

This scaffold does **not auto-install** feature libraries, so devs learn to set them up manually.  
Recommended libraries for future installs:

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/) + (optional: [shadcn/ui](https://ui.shadcn.com/))
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://zustand-bear.github.io/zustand/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) + [Cypress](https://www.cypress.io/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)

---

## 4. 🏛️ Architecture

We employ a **Feature-Driven Architecture** in Next.js, organizing code by domain features for scalability and collaboration.  
Each feature starts from the \`src/features/[feature-name]\` template, which includes:

- components/
- containers/
- hooks/
- services/
- queries/
- types/
- data/

Inside features, we follow the **Container/Presentational pattern**.

### File Structure

\`\`\`
src/
├── app/ # Next.js App Router
│ ├── layout.tsx
│ ├── page.tsx
│ └── providers.tsx
│
├── components/ # Global shared UI components
│
├── features/ # Domain-specific feature modules
│ ├── [feature-name]/ # Copy + rename this folder for new features
│ │ ├── components/
│ │ ├── containers/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── queries/
│ │ ├── types/
│ │ └── data/
│ └── shared/
│
├── lib/ # Utilities and global helpers
├── queries/ # Global TanStack Query configs
├── store/ # Zustand stores
├── providers/ # Global providers (Auth, Theme, Query, etc.)
├── config/ # Env, constants, query defaults
├── styles/ # Global & theme styles
├── types/ # Global TypeScript types
└── tests/ # Unit + E2E tests
\`\`\`

---

## 5. 📝 Coding Standards

- Use **functional React components** with hooks.
- **Type everything** with TypeScript.
- **Zustand** for client state, **TanStack Query** for server data.
- Gracefully handle **loading & error states**.
- Use **Prettier** + **ESLint** for formatting and linting.
- Tests: **Vitest** for unit, **Cypress** for e2e.
- Comments: explain _why_, not _what_.

---

## 6. 🤝 Code Contribution Guide

### Branch Model

- \`main\` → production only
- \`staging\` → pre-release testing
- \`dev\` → integration branch

### Workflow

1. Create a branch: \`feature/<issue-no-desc>\`, \`fix/<issue-no-desc>\`
2. Commit using **Conventional Commits**:
   - \`feat(auth): add JWT authentication\`
   - \`fix(api): correct null pointer\`
3. Open a PR → target \`dev\` (or \`main\` for hotfix).
4. Get at least **1 approval** before merge.
5. Use **Squash and Merge** into \`dev\`.

### Commit Message Quick Reference

| Type     | Description            |
| -------- | ---------------------- |
| feat     | New feature            |
| fix      | Bug fix                |
| docs     | Documentation change   |
| style    | Code style (no logic)  |
| refactor | Refactor (no behavior) |
| test     | Add/update tests       |
| chore    | Maintenance            |

---

✅ Following this guide ensures our projects remain **scalable, maintainable, and collaborative**.
