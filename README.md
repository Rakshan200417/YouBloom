# YouBloom React Demo App

A modern, responsive, and robust React web application built for the YouBloom Technical Assessment.

---

## 🚀 Features

### 1. **Authentication (Login Page)**
- **Country code validation**: Requires phone numbers to include country code (e.g. `+254` for Kenya).
- **Format validation**: Validates proper mobile phone formatting.
- **Mock Authentication**: Built with mock validation logic that accepts `+254712345678` as the valid demo evaluator account.
- **1-Click Autofill**: Quick button to autofill the demo credentials for rapid testing.
- **User session persistence**: Uses React Context API + `localStorage` to persist login state across browser refreshes.
- **Protected Routing**: Unauthenticated visits to `/` or `/users/:id` automatically redirect to `/login`.

### 2. **Member Directory (Main Page)**
- **Public REST API Integration**: Fetches user data asynchronously from `https://jsonplaceholder.typicode.com/users`.
- **Dynamic Real-Time Search**: Filters users on the fly across multiple fields:
  - Full Name
  - Username
  - Email Address
  - Company Name
  - City / Location
- **State Handling**:
  - Shimmer skeleton loaders while fetching data.
  - Informative error banners with a **"Try Again"** retry handler.
  - Friendly empty state when no matching results are found, with a one-click reset.
  - Active result counter (`Showing X of Y members`).

### 3. **Profile Detail View (Detail Page)**
- **Comprehensive Profile**: Displays full member data:
  - Header with custom initials avatar and verified badge.
  - Contact Information (clickable `mailto:`, `tel:`, and external website links).
  - Company details (company name, catchphrase, industry sector).
  - Full address with street, suite, city, zip code, and coordinates.
  - User publications / posts fetched from `https://jsonplaceholder.typicode.com/users/:id/posts`.
- **Navigation**: Dedicated "Back to Main Directory" button with seamless routing.

---

## 🛠️ Tech Stack & Architecture

- **React 18** (Functional components with modern Hooks: `useState`, `useEffect`, `useMemo`, `useContext`)
- **React Router DOM v6** (Client-side routing with nested routes & route guards)
- **State Management**: React Context API (`AuthContext`) + `localStorage`
- **Styling**: Custom CSS design system with CSS custom properties, responsive grid, glassmorphism, and sleek micro-interactions
- **Icons**: [Lucide React](https://lucide.dev)
- **Testing**: Vitest + React Testing Library + `@testing-library/jest-dom`
- **Build Tool**: Vite 6

---

## 📁 Project Structure

```
YouBloom/
├── src/
│   ├── __tests__/            # Unit and integration test suites
│   │   ├── LoginPage.test.jsx
│   │   ├── MainPage.test.jsx
│   │   └── api.test.js
│   ├── components/           # Reusable UI components
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── UserCard.jsx
│   ├── context/              # Context API providers
│   │   └── AuthContext.jsx
│   ├── pages/                # Top-level view pages
│   │   ├── DetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MainPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/             # REST API service layer
│   │   └── api.js
│   ├── App.jsx               # Route definitions
│   ├── index.css             # Design system & styles
│   ├── main.jsx              # App entry point
│   └── setupTests.js         # Jest-DOM matchers setup
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📦 Setup & Installation

### Prerequisites
- Node.js (v18.x or newer, tested on Node v24.x)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to the displayed local URL (typically `http://localhost:5173`).

### 3. Run Unit Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔑 Demo Credentials

To test the application login:
- **Phone Number**: `+254712345678`
- Alternatively, click the **"Fill Demo Number"** button on the Login page.
