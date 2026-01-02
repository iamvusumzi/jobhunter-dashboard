# JobHunter Dashboard (Frontend)

The operational control plane for the JobHunter ecosystem. This React application serves as the user interface for monitoring automated job ingestion, reviewing AI-driven analysis, and managing the recruitment pipeline.

## 🚀 Tech Stack

- **Core:** React 19 (via Vite), TypeScript
- **Styling:** Tailwind CSS v4, Lucide React (Icons), CLSX
- **State Management:** Redux Toolkit (Slices + Async Thunks), Redux Persist
- **Routing:** React Router v7 (Protected Route Guards)
- **Forms:** React Hook Form
- **HTTP:** Axios (with Interceptors for JWT handling)

## 📂 Project Structure

We follow a **Feature-based** folder structure to ensure scalability:

```text
src/
├── api/                # Axios configuration and base clients
├── components/         # Shared UI (Layouts, Badges, Buttons)
├── features/           # Domain-specific logic (Slices + Components)
│   ├── auth/           # Login, Guards, Auth Slice
│   ├── dashboard/      # Home view widgets
│   ├── jobs/           # Job listing, details, and filtering
│   └── settings/       # Configuration screens
├── store/              # Global Redux store setup & hooks
└── types/              # TypeScript interfaces (DTOs)
```

## ✨ Features Implemented

- **Secure Authentication:** JWT-based login with persistent sessions and route guards (/app is protected).
- **Dual-Layout System:** Public Landing vs. Authenticated Dashboard Layout (Sidebar + Topbar).

- **Job Management:**

  - Paginated Job Listing with Recruitment Status badges.
  - Advanced Filtering (Search + Status).
  - Job Detail View with AI Rationale and split-pane layout.

- **State Management:** Normalized Redux state for caching job data and handling API lifecycles.

## 🔜 Coming Soon

- Execution Observability (Live tracking of ingestion runs).
- Search Configuration (Managing keywords/filters for the scraper).
