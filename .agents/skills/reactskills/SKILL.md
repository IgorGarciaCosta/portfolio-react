---
name: reactskills
description: "Use when: developing React components, writing TypeScript with React, styling with Tailwind CSS, applying SOLID principles, clean code, performance optimization, hooks best practices, component architecture, accessibility, responsive design, state management, and code review."
---

# React + Tailwind CSS — Complete Best Practices Guide

This skill defines best practices for web development with **React**, **TypeScript**, and **Tailwind CSS**, applying SOLID principles, clean code, and modern patterns.

---

## 1. SOLID Principles Applied to React

### S — Single Responsibility Principle

Each component should have **one single responsibility**. If a component fetches data, handles business logic, and renders UI, it needs to be split.

```tsx
// ❌ BAD — component does everything
function UserProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser);
  }, []);
  if (!user) return <p>Loading...</p>;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

// ✅ GOOD — separation of concerns
function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser);
  }, []);
  return user;
}

function UserProfile() {
  const user = useUser();
  if (!user) return <Loading />;
  return <UserCard user={user} />;
}
```

**Rules:**

- Custom hooks for data logic and side effects
- Pure presentational components that receive data via props
- One file = one default-exported component (except internal sub-components)

### O — Open/Closed Principle

Components should be extensible without modifying their source code. Use **composition** and **render props**.

```tsx
// ✅ GOOD — extensible via children and className
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      className={`rounded-lg px-4 py-2 font-medium ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Rules:**

- Spread `...rest` props to allow native HTML extension
- Use `children` for composition instead of complex props
- Variants via typed props, not hardcoded internal conditionals

### L — Liskov Substitution Principle

Child components should be able to replace base components without breaking the application. In React, this applies to **component polymorphism**.

```tsx
// ✅ GOOD — substitutable base component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function TextInput({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className="mt-1 block w-full rounded-md border-gray-300"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// PasswordInput replaces TextInput without breaking interfaces
function PasswordInput(props: Omit<InputProps, "type">) {
  return <TextInput type="password" {...props} />;
}
```

### I — Interface Segregation Principle

Components should not depend on props they don't use. Define **lean and specific** interfaces.

```tsx
// ❌ BAD — bloated interface
interface UserProps {
  name: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
  bio: string;
}

// ✅ GOOD — segregated interfaces
interface UserAvatarProps {
  name: string;
  avatar: string;
}

interface UserContactProps {
  email: string;
  phone: string;
}

function UserAvatar({ name, avatar }: UserAvatarProps) {
  return <img src={avatar} alt={name} className="h-12 w-12 rounded-full" />;
}
```

**Rules:**

- Minimal props focused on what the component actually needs
- Use `Pick<T, K>` and `Omit<T, K>` to derive types
- Avoid passing entire objects when you only need 2-3 fields

### D — Dependency Inversion Principle

High-level components should not depend on concrete implementations. Use **Context API**, **dependency injection via props**, and **custom hooks** as abstractions.

```tsx
// ✅ GOOD — inversion via Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Component depends on the abstraction (hook), not the implementation
function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }
    >
      <button onClick={toggleTheme}>Toggle</button>
    </header>
  );
}
```

---

## 2. React Component Architecture

### Folder Structure

```
src/
  components/       # Reusable components (Button, Card, Modal)
  pages/            # Page components (Home, About, Contact)
  hooks/            # Custom hooks
  contexts/         # Context providers and types
  utils/            # Pure utility functions
  types/            # Shared TypeScript types
  assets/           # Images, fonts, icons
```

### Component Rules

1. **Pure components**: Same props = same output. No side effects during render.
2. **Naming**: PascalCase for components, camelCase for hooks (`useSomething`).
3. **Size**: If a component exceeds ~150 lines, consider splitting it.
4. **Export**: One main component per file with `export default`.
5. **Typing**: Always type props with TypeScript interfaces.

### Composition over Inheritance

```tsx
// ✅ Always prefer composition
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-white p-6 shadow-md ${className ?? ""}`}>
      {children}
    </div>
  );
}

function ProjectCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </Card>
  );
}
```

---

## 3. Hooks — Best Practices

### Fundamental Rules (Rules of Hooks)

- Hooks **only at the top level** — never inside loops, conditionals, or nested functions
- Hooks **only in React components or custom hooks** — never in regular JS functions

### useState

```tsx
// ✅ Minimal state, derive via calculation
const [items, setItems] = useState<Item[]>([]);
const activeCount = items.filter((i) => i.active).length; // derived, NOT state

// ✅ Updater function when depending on previous state
setItems((prev) => [...prev, newItem]);
```

### useEffect

```tsx
// ✅ Cleanup whenever necessary
useEffect(() => {
  const controller = new AbortController();
  fetch("/api/data", { signal: controller.signal })
    .then((r) => r.json())
    .then(setData);
  return () => controller.abort();
}, []);

// ❌ BAD — effect without correct dependencies or cleanup
```

**useEffect Rules:**

- Dependency array must always be explicit and correct
- Cleanup for subscriptions, timers, event listeners, and fetch requests
- Don't use useEffect to derive state — calculate during render
- Move objects/functions inside the Effect when possible to reduce dependencies

### useMemo and useCallback

Use **only when necessary** for performance optimization:

```tsx
// ✅ useMemo for expensive calculations with large lists
const filteredItems = useMemo(
  () => items.filter((item) => item.name.includes(query)),
  [items, query],
);

// ✅ useCallback when passing a function to a memoized component
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);

// ❌ DON'T use useMemo/useCallback for everything — unnecessary overhead
```

**When to use:**

- `useMemo`: Calculations with large arrays/objects, values passed to components with `memo`
- `useCallback`: Functions passed as props to components wrapped by `React.memo`
- **Don't use** for trivial calculations or primitive values

### Custom Hooks

```tsx
// ✅ Extract reusable logic into hooks
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

---

## 4. TypeScript — Best Practices

### Component Typing

```tsx
// ✅ Interface for props (prefer interface over type for objects)
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

function ProjectCard({ title, description, tags, href }: ProjectCardProps) {
  // ...
}
```

### Typing Tips

- Use `React.ReactNode` for generic children
- Use `React.ComponentPropsWithoutRef<'button'>` to extend native elements
- Avoid `any` — use `unknown` when the type is uncertain and do type narrowing
- Use literal types and union types: `variant: 'primary' | 'secondary'`
- Prefer `interface` for objects (extendable) and `type` for unions/intersections

```tsx
// ✅ TypeScript utility types
type PartialUser = Partial<User>;
type UserName = Pick<User, "firstName" | "lastName">;
type WithoutEmail = Omit<User, "email">;
```

---

## 5. Tailwind CSS — Best Practices

### Core Principles

1. **Utility-first**: Style directly in markup with utility classes
2. **Design system**: Use theme tokens (`text-sm`, `gap-4`, `bg-blue-500`) instead of arbitrary values
3. **Responsive**: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` prefixes
4. **Dark mode**: Use the `dark:` prefix for dark theme variants

### Organized Classes

Follow a **consistent ordering** of classes:

```tsx
// ✅ Recommended order: layout → sizing → spacing → typography → visual → states
<div className="flex items-center gap-4 w-full max-w-lg p-6 text-sm font-medium text-gray-900 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white">
```

**Suggested order:**

1. Layout: `flex`, `grid`, `block`, `relative`, `absolute`
2. Flex/Grid: `items-center`, `justify-between`, `gap-4`, `grid-cols-3`
3. Sizing: `w-full`, `h-12`, `max-w-lg`, `min-h-screen`
4. Spacing: `p-4`, `m-2`, `px-6`, `mt-8`
5. Typography: `text-lg`, `font-bold`, `leading-relaxed`, `tracking-wide`
6. Colors: `text-gray-900`, `bg-white`, `border-blue-500`
7. Borders/Radius: `border`, `rounded-lg`, `ring-2`
8. Effects: `shadow-md`, `opacity-75`, `blur-sm`
9. Transitions: `transition-all`, `duration-300`, `ease-in-out`
10. States: `hover:`, `focus:`, `active:`, `disabled:`
11. Responsive: `sm:`, `md:`, `lg:`, `xl:`
12. Dark mode: `dark:`

### Avoiding Class Duplication

```tsx
// ✅ Use loops for repeated lists
{
  items.map((item) => (
    <div key={item.id} className="rounded-lg bg-white p-4 shadow-sm">
      {item.name}
    </div>
  ));
}

// ✅ Use components for reusable patterns
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
      {children}
    </span>
  );
}
```

### Responsiveness

```tsx
// ✅ Mobile-first: base styles are mobile, prefixes for larger screens
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
  <img
    className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
    src={avatar}
    alt=""
  />
  <div className="space-y-2 text-center sm:text-left">
    <p className="text-lg font-semibold">{name}</p>
    <p className="font-medium text-gray-500">{role}</p>
  </div>
</div>
```

### Dark Mode

```tsx
// ✅ Always define both light AND dark variants
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  <h1 className="text-gray-900 dark:text-white">{title}</h1>
  <p className="text-gray-500 dark:text-gray-400">{description}</p>
</div>
```

### Arbitrary Values — Use Sparingly

```tsx
// ✅ Prefer theme tokens
<div className="max-w-lg p-4">...</div>

// ⚠️ Arbitrary values only when necessary
<div className="top-[117px] grid-cols-[1fr_500px_2fr]">...</div>

// ✅ For dynamic values, use inline styles
<div style={{ backgroundColor: brandColor }} className="rounded-lg p-4">...</div>
```

### Class Conflicts

```tsx
// ❌ BAD — conflicting classes (both define display)
<div className="grid flex">...</div>

// ✅ GOOD — clear conditional logic
<div className={gridLayout ? "grid grid-cols-3" : "flex flex-col"}>...</div>
```

### Theme Customization

Prefer customizing via `@theme` in CSS instead of repeated arbitrary values:

```css
/* index.css */
@theme {
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-500: oklch(0.55 0.18 250);
  --color-brand-900: oklch(0.25 0.1 250);
  --font-display: "Inter", sans-serif;
}
```

---

## 6. Performance

### Optimization Rules

1. **Don't optimize prematurely** — measure first with React DevTools Profiler
2. **Lazy loading** for heavy components and routes:

```tsx
const Projects = lazy(() => import("./pages/Projects"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Projects />
    </Suspense>
  );
}
```

3. **React.memo** for components that re-render with the same props:

```tsx
const ProjectCard = memo(function ProjectCard({ title, description }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
});
```

4. **Stable keys** in lists — never use array index for items that change position
5. **Avoid creating objects/arrays/functions** inline in JSX when passed to memoized components
6. **Code splitting** per route with `React.lazy` + `Suspense`

### Images

```tsx
// ✅ Always use width, height, and lazy loading
<img
  src="/hero.webp"
  alt="Accessible description"
  width={800}
  height={600}
  loading="lazy"
  className="h-auto w-full rounded-lg object-cover"
/>
```

---

## 7. Clean Code

### Naming Conventions

- **Components**: PascalCase — `ProjectCard`, `ThemeToggle`
- **Hooks**: camelCase with `use` prefix — `useTheme`, `useLocalStorage`
- **Handlers**: `handle` prefix — `handleClick`, `handleSubmit`
- **Booleans**: `is`/`has`/`should` prefix — `isLoading`, `hasError`
- **Constants**: UPPER_SNAKE_CASE — `MAX_RETRIES`, `API_BASE_URL`

### Principles

1. **DRY** (Don't Repeat Yourself): Extract repeated logic into hooks or components
2. **KISS** (Keep It Simple, Stupid): Prefer simple and straightforward approaches
3. **YAGNI** (You Aren't Gonna Need It): Don't implement speculative features
4. **Early return**: Return early to reduce nesting

```tsx
// ✅ Early returns for clarity
function UserProfile({ user }: { user: User | null }) {
  if (!user) return <NotFound />;
  if (user.banned) return <BannedMessage />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.bio}</p>
    </div>
  );
}
```

### JSX Conditionals

```tsx
// ✅ Ternary for simple conditional rendering
{
  isLoading ? <Spinner /> : <Content />;
}

// ✅ && for conditional rendering (beware of 0 and "")
{
  items.length > 0 && <ItemList items={items} />;
}

// ❌ BAD — avoid && with numbers that can be 0
{
  count && <Badge count={count} />;
} // renders "0" when count = 0
// ✅ GOOD
{
  count > 0 && <Badge count={count} />;
}
```

### Destructuring

```tsx
// ✅ Destructure props in the function parameter
function Card({ title, description, children }: CardProps) { ... }

// ✅ Destructure with default values
function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) { ... }
```

---

## 8. Accessibility (a11y)

### Essential Rules

1. **Semantic HTML**: Use `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<a>` correctly
2. **Alt text**: Every `<img>` needs a descriptive `alt` (or `alt=""` for decorative images)
3. **Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
4. **Focus visible**: Never remove `outline` without an alternative — use `focus-visible:ring-2`
5. **Keyboard navigation**: Every interactive element must be keyboard accessible
6. **ARIA**: Use ARIA attributes when semantic HTML is not sufficient

```tsx
// ✅ Accessible button with Tailwind
<button
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>

// ✅ Accessible link — correct usage of <a> vs <button>
// <a> for navigation, <button> for actions
<a href="/projects" className="text-blue-600 underline hover:text-blue-800">
  View projects
</a>
```

---

## 9. State Management

### State Decision Table

| Scope                 | Solution                          |
| --------------------- | --------------------------------- |
| Local (1 component)   | `useState`                        |
| Shared (parent-child) | Props drilling (up to 2-3 levels) |
| Shared (tree)         | Context API                       |
| Complex global        | Zustand, Jotai, or Redux Toolkit  |
| Server state          | TanStack Query (React Query)      |

### Rules

- **Minimal state**: Store only what's necessary, derive the rest
- **Colocate state**: Place state close to where it's used — don't lift state unnecessarily
- **Immutability**: Never mutate state directly — use spread or updater functions
- **Context split**: Separate contexts by domain to avoid unnecessary re-renders

```tsx
// ❌ BAD — one giant context
const AppContext = createContext({ user, theme, cart, notifications });

// ✅ GOOD — separate contexts
const UserContext = createContext<UserContextType | undefined>(undefined);
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const CartContext = createContext<CartContextType | undefined>(undefined);
```

---

## 10. Security

1. **Never use `dangerouslySetInnerHTML`** without sanitization
2. **Validate inputs** on both client AND server
3. **Don't expose secrets** in client-side environment variables (use `VITE_` prefix carefully)
4. **Sanitize URLs**: Check protocols before using in `href` (avoid `javascript:`)
5. **CSP headers** for XSS protection
6. **Dependencies**: Keep updated and audit with `npm audit`

---

## Quick Checklist

Before committing, verify:

- [ ] Components with single responsibility
- [ ] Props typed with TypeScript
- [ ] No `any` in the code
- [ ] Hooks follow the Rules of Hooks
- [ ] useEffect with cleanup and correct dependencies
- [ ] Tailwind: mobile-first, dark mode, organized classes
- [ ] Accessibility: alt texts, semantics, focus visible
- [ ] No console.log in production
- [ ] Stable keys in lists
- [ ] Minimal state with computed derivations
