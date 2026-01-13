<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</div>

<br />

<div align="center">
  <h1>💼 FinHQ</h1>
  <p><strong>Your Finance Headquarters</strong></p>
  <p>Industrial-grade administration & finance platform with enterprise security, multi-level access control, and real-time analytics.</p>
</div>

<br />

<div align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#security">Security</a> •
  <a href="#license">License</a>
</div>

---

## ✨ Features

### 🏠 Landing Page
- Modern hero section with animated gradient backgrounds
- Feature showcase with interactive cards
- Pricing plans with monthly/yearly toggle
- Glassmorphism CTA section
- Responsive design for all devices

### 🔐 Authentication
- **Supabase Auth** integration with free 2FA
- Login, Register, Forgot Password flows
- Password strength validation
- Social login ready (Google, Microsoft)
- Secure session management with httpOnly cookies

### 📊 Executive Dashboard
- Real-time KPI cards with trend indicators
- Revenue vs Expenses line charts
- Department budget horizontal bar charts
- Expense breakdown pie charts
- Date range filtering

### 💰 Finance Module
| Feature | Description |
|---------|-------------|
| **Transactions** | Search, filter, sort with pagination (500+ entries) |
| **Invoices** | Create, track, filter by status |
| **Expenses** | Category filtering, approval workflow |
| **Budgets** | Card/table view, animated progress bars |
| **Reports** | Generate PDF/Excel/CSV reports |

### 👥 Administration
- **User Management** - Role-based cards with search/filter
- **Settings** - Profile, Security (2FA), Notifications, Preferences
- **Audit Logs** - Track all system activities with level filtering

### ⚡ Performance Optimizations
- CSS Variables for efficient theming
- GPU-accelerated animations (`will-change`)
- Memoized filtering with `useMemo`
- Lazy loading with `useInView`
- Client-side pagination (15 items/page)
- Bundle optimization via `optimizePackageImports`

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 with App Router |
| **Language** | TypeScript 5 |
| **Styling** | CSS Variables + Framer Motion |
| **Auth** | Supabase Auth (SSR) |
| **Database** | Supabase PostgreSQL |
| **Charts** | Recharts |
| **Deployment** | Vercel (recommended) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ertreiter/Fin-HQ.git
cd Fin-HQ

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── (auth)/                     # Auth pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── (dashboard)/                # Protected routes
│       ├── layout.tsx              # Sidebar layout
│       ├── page.tsx                # Dashboard home
│       └── dashboard/
│           ├── analytics/          # Charts & KPIs
│           ├── finance/            # Finance module
│           ├── users/              # User management
│           ├── settings/           # Account settings
│           └── admin/              # Audit logs
├── components/
│   ├── landing/                    # Landing page components
│   └── ui/                         # Reusable UI components
├── lib/supabase/                   # Supabase clients
├── styles/globals.css              # Design system
└── types/                          # TypeScript types
```

---

## 🔒 Security

FinHQ implements enterprise-grade security:

- **Authentication** - Supabase Auth with JWT tokens
- **Authorization** - Role-Based Access Control (RBAC)
  - Super Admin, Admin, Director, Manager, Finance, Staff
- **Session Management** - httpOnly cookies, automatic refresh
- **Route Protection** - Middleware-based auth checks
- **Security Headers** - HSTS, X-Frame-Options, CSP, X-Content-Type-Options
- **Password Policy** - Minimum 8 chars, uppercase, lowercase, number, special char
- **2FA Support** - TOTP via Supabase (free)

---

## 🎨 Theme Support

- **Light Mode** - Clean, professional design
- **Dark Mode** - Easy on the eyes with smooth transitions
- System preference detection
- LocalStorage persistence

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/Ertreiter/Fin-HQ](https://github.com/Ertreiter/Fin-HQ)

---

<div align="center">
  <p>Built with ❤️ using Next.js and Supabase</p>
</div>
