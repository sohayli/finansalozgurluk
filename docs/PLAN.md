# Finansal Özgürlük Projesi - Final Plan

## Proje Özeti
Portföy takibi ve finansal özgürlük hedeflerini yönetmek için **Svelte + SvelteKit** web uygulaması. **PostgreSQL (Supabase)** veritabanı ile real-time fiyat updates, finansal hedef takibi ve kapsamlı raporlama.

## GitHub Repository
- **Repository:** https://github.com/sohayli/finansalozgurluk
- **Owner:** sohayli
- **Status:** Empty (sadece README + LICENSE)
- **Decision:** Plan + Implementation code merge (tek repo)

### Repository Structure (Plan + Code)
```
finansalozgurluk/
├── docs/                          # 📋 Plan dosyaları
│   ├── PLAN.md                    # Detaylı uygulama planı (70KB)
│   ├── MEMORY.md                  # Proje hafızası ve kararlar
│   ├── ARCHITECTURE.md            # Teknik mimari dokümantasyon
│   └── CHANGELOG.md               # Değişiklik log'u
├── src/                           # 🚀 Implementation code (SvelteKit)
│   ├── lib/
│   ├── routes/
│   └── app.html
├── README.md                      # Proje özeti
└── LICENSE                        # MIT License (existing)
```

### Workflow
1. **Phase 1 (Now):** Push plan dosyalarını docs/ folder'a
2. **Phase 2 (Implementation):** SvelteKit proje oluşturup src/ folder'a
3. **Phase 3 (VPS):** Production deployment

### CHANGELOG.md Template
```markdown
# Finansal Özgürlük - Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Initial project documentation (PLAN.md, MEMORY.md, ARCHITECTURE.md)
- GitHub repository setup: https://github.com/sohayli/finansalozgurluk
- Technology stack decision: SvelteKit + Supabase + VPS

## [0.0.1] - 2026-04-15

### Added
- Project planning phase started
- Framework comparison (Svelte vs Next.js)
- Database comparison (Supabase vs self-hosted PostgreSQL)
- Deployment strategy (VPS vs Vercel)
- Documentation files created
```

---

## Implementation Workflow (After Plan Mode)

### Step 1: Clone and Setup Docs
```bash
git clone https://github.com/sohayli/finansalozgurluk.git
cd finansalozgurluk

mkdir docs

# Copy plan files from local
cp ~/.local/share/kilo/plans/1776245358223-cosmic-forest.md docs/PLAN.md
cp ~/finansal-ozgurluk-plans/MEMORY.md docs/MEMORY.md

# Create CHANGELOG
cat > docs/CHANGELOG.md << 'EOF'
# Finansal Özgürlük - Changelog

## [Unreleased]
- Initial documentation added

## [0.0.1] - 2026-04-15
- Project planning completed
EOF

git add docs/
git commit -m "Add project documentation (PLAN, MEMORY, CHANGELOG)"
git push origin main
```

### Step 2: Create SvelteKit Project
```bash
# In the same repository
cd finansalozgurluk

# Create SvelteKit app in src/
npm create svelte@latest src
# Template: Skeleton project
# Type: TypeScript
# Addons: ESLint, Prettier, Playwright, Vitest

# Install dependencies
cd src
npm install
npm install -D tailwindcss postcss autoprefixer
npx shadcn-svelte@latest init
npm install @supabase/supabase-js layerchart d3 zod date-fns clsx tailwind-merge

# Test setup
npm run dev
```

### Step 3: Commit Project Structure
```bash
cd finansalozgurluk
git add src/
git commit -m "Initialize SvelteKit project structure"
git push origin main
```

---

## Repository Final Structure

After implementation, the repository will look like:

```
finansalozgurluk/
├── docs/
│   ├── PLAN.md (70KB, 2464 lines)
│   ├── MEMORY.md (5KB, decisions log)
│   ├── ARCHITECTURE.md (technical summary)
│   └── CHANGELOG.md (version history)
├── src/
│   ├── lib/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── server/
│   │   ├── utils/
│   │   └── types/
│   ├── routes/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   └── api/
│   ├── static/
│   ├── app.html
│   ├── app.css
│   └── hooks.server.ts
├── supabase/
│   ├── migrations/
│   ├── seeds/
│   └── config.toml
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── price-fetcher.ts
│   └── deploy.sh
├── README.md
├── LICENSE
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── .env.example
```

---

## Cost Analysis (Updated)

### Repository Hosting
- **GitHub:** Free (public repository)
- **Pages:** Free optional (for static docs)

### Development Cost
- **Lokal:** Free (all tools open source)
- **Supabase:** Free tier (500MB)

### Production Cost (Monthly)
- **VPS:** €3.5-6/month
- **Supabase:** Free → $25/mo (if scale)
- **Domain:** €10-15/year (optional)

**Total:** €42-72/year + optional domain

---

## Timeline (Updated)

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Phase 1: Setup Docs** | 1 day | Push plan files to GitHub |
| **Phase 2: Project Setup** | 1 week | SvelteKit + Supabase setup |
| **Phase 3: Auth** | 1 week | Email/Password authentication |
| **Phase 4: Portfolio** | 2-3 weeks | Portfolio CRUD + assets |
| **Phase 5: Market Data** | 2-3 weeks | Real-time prices + scrapers |
| **Phase 6: Goals** | 1-2 weeks | Financial goals tracking |
| **Phase 7: Budget** | 1-2 weeks | Budget management |
| **Phase 8: Reports + PWA** | 1-2 weeks | Reporting + PDF export |
| **Phase 9: Testing + Deploy** | 1 week | VPS deployment |
| **Total** | **10-14 weeks** | **Full MVP + Production** |

---

## Next Steps (After Plan Mode Exit)

### Immediate Actions (Implementation Phase)
1. **Clone Repository**
   ```bash
   git clone https://github.com/sohayli/finansalozgurluk.git
   ```

2. **Push Plan Files**
   - Create docs/ folder
   - Copy PLAN.md, MEMORY.md from local
   - Create CHANGELOG.md
   - Commit and push

3. **Initialize SvelteKit**
   - Create src/ folder
   - npm create svelte@latest src
   - Install dependencies
   - Test setup

4. **Supabase Setup**
   - Create Supabase project (EU-West-1)
   - Run migrations
   - Configure auth

5. **First Feature: Auth**
   - Email/Password login
   - Protected routes
   - Session management

---

---

## Final Teknoloji Stack

### Frontend
- **Framework:** SvelteKit 2.0 (Latest)
- **Dil:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State:** Svelte Stores (writable, derived, readable)
- **UI Components:** shadcn-svelte
- **Charts:** LayerChart + D3.js
- **Animations:** Built-in Svelte transitions

### Backend & Database
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (Email/Password)
- **Real-time:** Supabase Realtime subscriptions
- **API:** SvelteKit server routes + Supabase Edge Functions
- **Security:** Row Level Security (RLS)

### Deployment
- **Hosting:** Vercel
- **Region:** EU-West-1 (Supabase)
- **PWA:** Progressive Web App (mobil-first design)

### API Sources
- **Borsa İstanbul:** BigPara scraper + Investing.com API
- **Kripto:** CoinGecko API (ücretsiz tier)
- **US Markets:** Yahoo Finance API
- **TEFAS:** TEFAS.gov.tr scraper (mevcut crawler'dan)

---

## Neden Bu Stack?

### Svelte Seçimi
1. **Performans:** ~25KB bundle (Next.js ~140KB)
2. **Real-time:** Built-in reactive stores ideal for live prices
3. **Development:** Less boilerplate, faster iteration
4. **Animations:** Built-in transitions for smooth UX

### Supabase Seçimi
1. **Real-time:** WebSocket subscriptions for live prices
2. **Auth:** Built-in Email/Password authentication
3. **Security:** RLS ensures user data isolation
4. **SQL:** Complex queries for financial calculations
5. **Integration:** @supabase/supabase-js + Svelte stores
6. **Free Tier:** 500MB storage, perfect for MVP

### Svelte + SvelteKit Avantajları
| Özellik | Değer |
|---------|-------|
| **Performans** | ⭐⭐⭐⭐⭐ Compile-time optimization, minimal runtime (~10KB) |
| **Reactivity** | ⭐⭐⭐⭐⭐ Built-in reactive declarations, ideal for real-time prices |
| **Bundle Size** | ⭐⭐⭐⭐⭐ En küçük bundle, fastest initial load |
| **Development Speed** | ⭐⭐⭐⭐⭐ Less boilerplate, intuitive syntax |
| **Transitions** | ⭐⭐⭐⭐⭐ Built-in animations, no external libraries |
| **Learning Curve** | ⭐⭐⭐⭐⭐ Simple, easy to learn |
| **SSR/SSG** | ⭐⭐⭐⭐ Excellent with SvelteKit |

### Svelte Dezavantajları
| Özellik | Değer |
|---------|-------|
| **Ecosystem** | ⭐⭐⭐ Growing but smaller than React |
| **UI Libraries** | ⭐⭐⭐ Fewer options (shadcn-svelte exists) |
| **Enterprise Adoption** | ⭐⭐⭐ Increasing but not mainstream |
| **Job Market** | ⭐⭐ Smaller demand |
| **Community Size** | ⭐⭐⭐ Active but smaller |

### Next.js + React Avantajları
| Özellik | Değer |
|---------|-------|
| **Ecosystem** | ⭐⭐⭐⭐⭐ Massive ecosystem, tons of libraries |
| **Enterprise Adoption** | ⭐⭐⭐⭐⭐ Widely adopted, many case studies |
| **Job Market** | ⭐⭐⭐⭐⭐ Most demanded skill |
| **UI Libraries** | ⭐⭐⭐⭐⭐ shadcn/ui, MUI, Chakra, Ant Design |
| **Server Components** | ⭐⭐⭐⭐⭐ Revolutionary paradigm |
| **React Native** | ⭐⭐⭐⭐⭐ Same codebase for mobile (future) |
| **Community Size** | ⭐⭐⭐⭐⭐ Largest community |

### Next.js Dezavantajları
| Özellik | Değer |
|---------|-------|
| **Bundle Size** | ⭐⭐⭐ Larger (~80KB+ React runtime) |
| **Complexity** | ⭐⭐⭐ Server/Client component confusion |
| **Reactivity** | ⭐⭐⭐ useState, useEffect hooks |
| **Learning Curve** | ⭐⭐⭐ More concepts to learn |

### Finansal Uygulama İçin Öneri
- **Svelte** → Real-time fiyatlar, grafikler, hızlı UI updates için **ideal**
- **Next.js** → Enterprise-ready, mobile future (React Native), **production stability**

---

## Teknoloji Stack Seçenekleri

### Option A: Svelte + SvelteKit (Performans Odaklı)

#### Web & Backend
- **Framework:** SvelteKit 2.0
- **Dil:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State:** Svelte Stores (built-in)
- **UI Components:** shadcn-svelte (https://www.shadcn-svelte.com)
- **Charts:** LayerChart (Svelte-native) + D3.js integration
- **Animations:** Built-in Svelte transitions

#### Backend & Database
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (Email/Password)
- **Real-time:** Supabase Realtime + Svelte stores
- **API:** SvelteKit server routes + Supabase Edge Functions

#### Avantajları
- En yüksek performans ve en küçük bundle
- Real-time fiyat updates için built-in reactivity
- Daha hızlı development (less boilerplate)
- Smooth animasyonlar (built-in)

#### Dezavantajları
- Küçük ekosistem, daha az third-party library
- shadcn-svelte daha yeni ve az mature
- Mobil için Svelte Native (deneysel) veya PWA

---

### Option B: Next.js 15 + React (Enterprise Odaklı)

#### Web & Backend
- **Framework:** Next.js 15 (App Router)
- **Dil:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State:** Zustand + TanStack Query
- **UI Components:** Shadcn/ui (React)
- **Charts:** Recharts + D3.js

#### Backend & Database
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (Email/Password)
- **Real-time:** Supabase Realtime + TanStack Query
- **API:** Next.js API Routes + Supabase Edge Functions

#### Avantajları
- Büyük ekosistem, production-ready
- shadcn/ui mature ve stabil
- React Native ile mobil (future)
- Enterprise adoption, job market

#### Dezavantajları
- Büyük bundle size
- Server/Client component complexity
- Daha fazla boilerplate

---

### Ortak Teknolojiler (Both Options)
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (Email/Password)
- **Real-time:** Supabase Realtime subscriptions
- **Deployment:** Vercel
- **API Sources:** Same for both

### API Kaynakları
- **Borsa İstanbul:** BigPara, Investing.com scraper
- **Kripto:** CoinGecko API (ücretsiz)
- **US Piyasaları:** Yahoo Finance API
- **TEFAS:** TEFAS.gov.tr (mevcut crawler'dan)

### Mobil Strateji (Future Phase)
- **Option A:** PWA (Progressive Web App) → Svelte Native
- **Option B:** React Native + Expo → Code sharing with web

---

## Proje Yapısı

```
finansal-ozgurluk/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn-svelte components
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   ├── table/
│   │   │   │   ├── dialog/
│   │   │   │   └── progress/
│   │   │   ├── portfolio/
│   │   │   │   ├── PortfolioCard.svelte
│   │   │   │   ├── AssetList.svelte
│   │   │   │   ├── AssetTable.svelte
│   │   │   │   ├── TransactionForm.svelte
│   │   │   │   ├── AddAssetModal.svelte
│   │   │   │   └── PortfolioSummary.svelte
│   │   │   ├── charts/
│   │   │   │   ├── PieChart.svelte    # Varlık dağılımı
│   │   │   │   ├── LineChart.svelte   # Fiyat geçmişi
│   │   │   │   ├── TreeMap.svelte     # Portföy görselleştirme
│   │   │   │   ├── Sparkline.svelte   # Mini fiyat chart
│   │   │   │   └── BarChart.svelte    # Bütçe analizi
│   │   │   ├── goals/
│   │   │   │   ├── GoalProgress.svelte
│   │   │   │   ├── MilestoneTracker.svelte
│   │   │   │   ├── GoalCard.svelte
│   │   │   │   └── GoalTimeline.svelte
│   │   │   ├── budget/
│   │   │   │   ├── BudgetOverview.svelte
│   │   │   │   ├── ExpenseChart.svelte
│   │   │   │   ├── TransactionList.svelte
│   │   │   │   └── CategoryManager.svelte
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.svelte
│   │   │   │   ├── Sidebar.svelte
│   │   │   │   └── Header.svelte
│   │   │   └── shared/
│   │   │       ├── Loading.svelte
│   │   │       ├── Error.svelte
│   │   │       └── EmptyState.svelte
│   │   ├── stores/
│   │   │   ├── portfolio.ts          # Portfolio state
│   │   │   ├── prices.ts             # Real-time prices store
│   │   │   ├── goals.ts              # Financial goals
│   │   │   ├── budget.ts             # Budget tracking
│   │   │   ├── user.ts               # User authentication
│   │   │   ├── ui.ts                 # UI state (modal, sidebar)
│   │   │   └── notifications.ts      # Toast notifications
│   │   ├── server/
│   │   │   ├── supabase.ts           # Server-side Supabase client
│   │   │   ├── admin.ts              # Admin Supabase client
│   │   │   ├── api/
│   │   │   │   ├── portfolio.ts      # Portfolio CRUD
│   │   │   │   ├── assets.ts         # Asset CRUD
│   │   │   │   ├── prices.ts         # Price fetching
│   │   │   │   ├── goals.ts          # Goals CRUD
│   │   │   │   ├── budget.ts         # Budget CRUD
│   │   │   │   └── auth.ts           # Auth helpers
│   │   │   └── scraper/
│   │   │       ├── bist.ts           # Borsa İstanbul scraper
│   │   │       ├── yahoo.ts          # Yahoo Finance
│   │   │       ├── coingecko.ts      # CoinGecko API
│   │   │       └── tefas.ts          # TEFAS crawler
│   │   ├── utils/
│   │   │   ├── calculations.ts       # Financial calculations
│   │   │   ├── formatters.ts         # Currency, percentage format
│   │   │   ├── validators.ts         # Input validation (Zod)
│   │   │   ├── helpers.ts            # Generic helpers
│   │   │   └── animations.ts         # Svelte animation configs
│   │   ├── types/
│   │   │   ├── portfolio.ts          # Portfolio types
│   │   │   ├── asset.ts              # Asset types
│   │   │   ├── goal.ts               # Goal types
│   │   │   ├── budget.ts             # Budget types
│   │   │   ├── api.ts                # API response types
│   │   │   └── market.ts             # Market data types
│   │   └── constants/
│   │   │   ├── markets.ts            # Market configs (BIST, NASDAQ, etc)
│   │   │   ├── currencies.ts         # Currency list (TRY, USD, EUR)
│   │   │   ├── categories.ts         # Budget categories
│   │   │   └── colors.ts             # Chart colors
│   │   └── hooks/
│   │   │   ├── index.ts              # Shared hooks
│   │   └── styles/
│   │   │   ├── globals.css           # Global styles
│   │   │   └── animations.css        # Animation utilities
│   ├── routes/
│   │   ├── +layout.svelte            # Root layout (Navbar, Sidebar)
│   │   ├── +layout.ts                # Layout load function (auth check)
│   │   ├── +page.svelte              # Dashboard (overview)
│   │   ├── +page.ts                  # Dashboard data loading
│   │   ├── (auth)/
│   │   │   ├── +layout.svelte        # Auth layout (minimal)
│   │   │   ├── login/+page.svelte    # Login page
│   │   │   ├── login/+page.ts        # Login server logic
│   │   │   ├── register/+page.svelte # Register page
│   │   │   ├── register/+page.ts     # Register server logic
│   │   │   └── forgot-password/+page.svelte
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── +layout.svelte        # Dashboard layout
│   │   │   ├── +layout.ts            # Auth guard
│   │   │   ├── portfolio/
│   │   │   │   ├── +page.svelte      # Portföy listesi
│   │   │   │   ├── +page.ts          # Load portfolios
│   │   │   │   ├── [id]/+page.svelte # Portföy detay
│   │   │   │   └── [id]/+page.ts     # Load single portfolio
│   │   │   ├── assets/
│   │   │   │   ├── stocks/+page.svelte    # Hisse senetleri
│   │   │   │   ├── crypto/+page.svelte    # Kripto paralar
│   │   │   │   ├── funds/+page.svelte     # Yatırım fonları
│   │   │   │   └── forex/+page.svelte     # Döviz
│   │   │   ├── goals/
│   │   │   │   ├── +page.svelte      # Hedefler listesi
│   │   │   │   ├── +page.ts          # Load goals
│   │   │   │   └── [id]/+page.svelte # Hedef detay
│   │   │   ├── budget/
│   │   │   │   ├── +page.svelte      # Bütçe overview
│   │   │   │   ├── +page.ts          # Load budget data
│   │   │   │   ├── transactions/+page.svelte  # İşlem listesi
│   │   │   │   └── categories/+page.svelte    # Kategori yönetimi
│   │   │   ├── reports/
│   │   │   │   ├── +page.svelte      # Raporlar
│   │   │   │   ├── portfolio/+page.svelte    # Portföy raporu
│   │   │   │   ├── performance/+page.svelte  # Performans raporu
│   │   │   │   └── export/+page.svelte        # PDF/Excel export
│   │   │   ├── settings/
│   │   │   │   ├── +page.svelte      # Ayarlar
│   │   │   │   ├── profile/+page.svelte       # Profil ayarları
│   │   │   │   ├── notifications/+page.svelte # Bildirim ayarları
│   │   │   │   └── theme/+page.svelte         # Tema ayarları
│   │   │   └── market/
│   │   │   │   ├── +page.svelte      # Piyasa overview
│   │   │   │   ├── stocks/+page.svelte       # BIST hisseleri
│   │   │   │   ├── crypto/+page.svelte       # Kripto piyasası
│   │   │   │   └── forex/+page.svelte        # Döviz kurları
│   │   ├── api/
│   │   │   ├── portfolio/
│   │   │   │   ├── +server.ts        # GET (list), POST (create)
│   │   │   │   └── [id]/+server.ts   # GET, PATCH, DELETE
│   │   │   ├── assets/
│   │   │   │   ├── +server.ts        # GET, POST
│   │   │   │   └── [id]/+server.ts   # GET, PATCH, DELETE
│   │   │   ├── transactions/
│   │   │   │   ├── +server.ts        # GET, POST
│   │   │   │   └── [id]/+server.ts   # DELETE
│   │   │   ├── prices/
│   │   │   │   ├── stock/[symbol]/+server.ts   # Tek hisse fiyatı
│   │   │   │   ├── crypto/[symbol]/+server.ts  # Tek kripto fiyatı
│   │   │   │   ├── live/+server.ts              # WebSocket real-time
│   │   │   │   ├── sync/+server.ts              # Batch price update
│   │   │   │   └── history/[symbol]/+server.ts  # Fiyat geçmişi
│   │   │   ├── goals/
│   │   │   │   ├── +server.ts        # GET, POST
│   │   │   │   ├── [id]/+server.ts   # GET, PATCH, DELETE
│   │   │   │   └── [id]/progress/+server.ts  # Update progress
│   │   │   ├── budget/
│   │   │   │   ├── transactions/+server.ts    # GET, POST
│   │   │   │   ├── categories/+server.ts      # GET, POST
│   │   │   │   └── summary/+server.ts         # Monthly summary
│   │   │   └── auth/
│   │   │   │   ├── login/+server.ts           # POST login
│   │   │   │   ├── register/+server.ts        # POST register
│   │   │   │   └── logout/+server.ts          # POST logout
│   │   ├── +error.svelte             # Global error boundary
│   │   └── +error.ts                 # Error handling
│   ├── app.html                      # HTML template
│   ├── app.css                       # Global CSS (Tailwind)
│   └── hooks.server.ts               # Server hooks (auth guard)
├── static/
│   ├── favicon.png
│   ├── logo.svg
│   ├── manifest.json                 # PWA manifest
│   └── icons/                        # PWA icons
│   │   ├── icon-192.png
│   │   └── icon-512.png
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_add_goals.sql
│   │   ├── 003_add_budget.sql
│   │   └── 004_add_indexes.sql
│   ├── seeds/
│   │   ├── default_categories.sql
│   │   └── demo_data.sql
│   ├── config.toml                   # Supabase config
│   └── functions/                    # Edge Functions
│   │   ├── price-fetcher/
│   │   │   └── index.ts              # Background price updates
│   │   └── calculate-summary/
│   │   │   └── index.ts              # Portfolio summary calculation
├── scripts/
│   ├── price-fetcher.ts              # Dev price scraper
│   ├── data-migration.ts             # Migration helper
│   ├── seed-demo.ts                  # Demo data generator
│   └── supabase-setup.ts             # Supabase init script
├── tests/
│   ├── unit/
│   │   ├── calculations.test.ts
│   │   ├── formatters.test.ts
│   │   └── validators.test.ts
│   ├── integration/
│   │   ├── portfolio.test.ts
│   │   ├── assets.test.ts
│   │   └── goals.test.ts
│   └── e2e/
│   │   ├── auth.test.ts
│   │   ├── portfolio-crud.test.ts
│   │   └── budget-flow.test.ts
├── .env                              # Local env (gitignored)
├── .env.example                      # Example env
├── package.json
├── svelte.config.js                  # SvelteKit config
├── vite.config.ts                    # Vite config
├── tailwind.config.js                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── playwright.config.ts              # E2E test config
└── README.md                         # Project docs
```
finansal-ozgurluk/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn-svelte components
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   └── table/
│   │   │   ├── portfolio/
│   │   │   │   ├── PortfolioCard.svelte
│   │   │   │   ├── AssetList.svelte
│   │   │   │   └── TransactionForm.svelte
│   │   │   ├── charts/
│   │   │   │   ├── PieChart.svelte
│   │   │   │   ├── LineChart.svelte
│   │   │   │   └── TreeMap.svelte
│   │   │   ├── goals/
│   │   │   │   ├── GoalProgress.svelte
│   │   │   │   └── MilestoneTracker.svelte
│   │   │   └── budget/
│   │   │       ├── BudgetOverview.svelte
│   │   │       └── ExpenseChart.svelte
│   │   ├── stores/
│   │   │   ├── portfolio.ts          # Svelte store
│   │   │   ├── prices.ts             # Real-time prices store
│   │   │   ├── goals.ts
│   │   │   ├── budget.ts
│   │   │   └── user.ts
│   │   ├── server/
│   │   │   ├── supabase.ts           # Server-side Supabase
│   │   │   ├── api/
│   │   │   │   ├── portfolio.ts
│   │   │   │   ├── assets.ts
│   │   │   │   ├── prices.ts
│   │   │   │   └── goals.ts
│   │   │   └── scraper/
│   │   │       ├── bist.ts           # Borsa İstanbul scraper
│   │   │       ├── yahoo.ts          # Yahoo Finance
│   │   │       └── coingecko.ts      # CoinGecko
│   │   ├── utils/
│   │   │   ├── calculations.ts
│   │   │   ├── formatters.ts
│   │   │   └── validators.ts
│   │   └── types/
│   │   │   ├── portfolio.ts
│   │   │   ├── asset.ts
│   │   │   ├── goal.ts
│   │   │   └── api.ts
│   │   └── constants/
│   │       ├── markets.ts
│   │       ├── currencies.ts
│   │       └── categories.ts
│   ├── routes/
│   │   ├── +layout.svelte            # Root layout
│   │   ├── +page.svelte              # Dashboard
│   │   ├── (auth)/
│   │   │   ├── login/+page.svelte
│   │   │   └── register/+page.svelte
│   │   ├── (dashboard)/
│   │   │   ├── +layout.svelte
│   │   │   ├── portfolio/
│   │   │   │   ├── +page.svelte      # Portföy listesi
│   │   │   │   └── [id]/+page.svelte # Portföy detay
│   │   │   ├── assets/
│   │   │   │   ├── stocks/+page.svelte
│   │   │   │   ├── crypto/+page.svelte
│   │   │   │   └── funds/+page.svelte
│   │   │   ├── goals/+page.svelte
│   │   │   ├── budget/+page.svelte
│   │   │   ├── reports/+page.svelte
│   │   │   └── settings/+page.svelte
│   │   └── api/
│   │   │   ├── portfolio/
│   │   │   │   ├── +server.ts        # GET/POST
│   │   │   │   └── [id]/+server.ts   # GET/PATCH/DELETE
│   │   │   ├── assets/
│   │   │   │   ├── +server.ts
│   │   │   │   └── [id]/+server.ts
│   │   │   ├── prices/
│   │   │   │   ├── stock/[symbol]/+server.ts
│   │   │   │   ├── crypto/[symbol]/+server.ts
│   │   │   │   └── live/+server.ts    # WebSocket
│   │   │   └── goals/
│   │   │       ├── +server.ts
│   │   │       └── [id]/+server.ts
│   │   └── +error.svelte             # Error boundary
│   ├── app.html
│   └── app.css
├── static/
│   ├── favicon.png
│   └── manifest.json                  # PWA manifest
├── supabase/
│   ├── migrations/
│   ├── seeds/
│   └── config.toml
├── scripts/
│   ├── price-fetcher.ts               # Background price updates
│   └── data-migration.ts              # Initial data
├── package.json
├── svelte.config.js
├── vite.config.ts
└── tsconfig.json
```

---

### Option B: Next.js 15 Structure

```
finansal-ozgurluk/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Dashboard layout
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── portfolio/
│   │   │   ├── page.tsx              # Portföy listesi
│   │   │   └── [id]/page.tsx         # Portföy detay
│   │   ├── assets/
│   │   │   ├── stocks/page.tsx
│   │   │   ├── crypto/page.tsx
│   │   │   └── funds/page.tsx
│   │   ├── goals/page.tsx
│   │   ├── budget/page.tsx
│   │   ├── reports/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── portfolio/
│   │   │   ├── route.ts              # GET/POST
│   │   │   └── [id]/route.ts         # GET/PATCH/DELETE
│   │   ├── assets/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── prices/
│   │   │   ├── stock/[symbol]/route.ts
│   │   │   ├── crypto/[symbol]/route.ts
│   │   │   └── live/route.ts         # WebSocket
│   │   ├── goals/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── budget/
│   │   │   ├── transactions/route.ts
│   │   │   └── summary/route.ts
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   ├── error.tsx                     # Error boundary
│   ├── loading.tsx                   # Loading state
│   └── globals.css
├── components/
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── dialog.tsx
│   ├── portfolio/
│   │   ├── PortfolioCard.tsx
│   │   ├── AssetList.tsx
│   │   ├── TransactionForm.tsx
│   │   └── AssetTable.tsx
│   ├── charts/
│   │   ├── PieChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── TreeMap.tsx
│   │   └── Sparkline.tsx
│   ├── goals/
│   │   ├── GoalProgress.tsx
│   │   ├── MilestoneTracker.tsx
│   │   └── GoalCard.tsx
│   ├── budget/
│   │   ├── BudgetOverview.tsx
│   │   ├── ExpenseChart.tsx
│   │   └── TransactionList.tsx
│   └── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client
│   │   └── admin.ts                  # Admin client
│   ├── api/
│   │   ├── portfolio.ts
│   │   ├── assets.ts
│   │   ├── prices.ts
│   │   └── goals.ts
│   ├── scraper/
│   │   ├── bist.ts
│   │   ├── yahoo.ts
│   │   └── coingecko.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── constants/
│   │   ├── markets.ts
│   │   ├── currencies.ts
│   │   └── categories.ts
├── hooks/
│   ├── useAuth.ts
│   ├── usePortfolio.ts
│   ├── useAssets.ts
│   ├── usePrices.ts                  # Real-time prices
│   ├── useGoals.ts
│   └── useBudget.ts
├── stores/
│   ├── portfolioStore.ts             # Zustand store
│   ├── priceStore.ts
│   ├── goalStore.ts
│   └── budgetStore.ts
├── types/
│   ├── portfolio.ts
│   ├── asset.ts
│   ├── goal.ts
│   ├── budget.ts
│   └── api.ts
├── supabase/
│   ├── migrations/
│   ├── seeds/
│   └── config.toml
├── scripts/
│   ├── price-fetcher.ts
│   └── data-migration.ts
├── public/
│   ├── favicon.ico
│   └── manifest.json                  # PWA manifest
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Veritabanı Şeması

```sql
-- Kullanıcılar (Supabase Auth)
-- auth.users tablosu kullanılacak

-- Portföyler
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT DEFAULT 'TRY',
  target_value DECIMAL(15,2),
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Varlıklar
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('stock', 'crypto', 'fund', 'cash', 'gold', 'forex')),
  market TEXT CHECK (market IN ('bist', 'nasdaq', 'nyse', 'crypto', 'forex')),
  quantity DECIMAL(15,6) NOT NULL DEFAULT 0,
  buy_price DECIMAL(15,4) NOT NULL DEFAULT 0,
  buy_currency TEXT DEFAULT 'TRY',
  current_price DECIMAL(15,4),
  current_currency TEXT DEFAULT 'TRY',
  sector TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- İşlemler
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('buy', 'sell', 'dividend', 'split')) NOT NULL,
  quantity DECIMAL(15,6) NOT NULL,
  price DECIMAL(15,4) NOT NULL,
  currency TEXT DEFAULT 'TRY',
  date DATE NOT NULL,
  fee DECIMAL(15,4) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fiyat Geçmişi
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  market TEXT NOT NULL,
  price DECIMAL(15,4) NOT NULL,
  currency TEXT DEFAULT 'TRY',
  change_percent DECIMAL(8,4),
  volume BIGINT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finansal Hedefler
CREATE TABLE financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('savings', 'investment', 'passive_income', 'debt_free', 'custom')),
  target_amount DECIMAL(15,2) NOT NULL,
  current_amount DECIMAL(15,2) DEFAULT 0,
  target_date DATE,
  priority INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hedef Kilometre Taşları
CREATE TABLE goal_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES financial_goals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount DECIMAL(15,2),
  target_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gelir/Gider Takibi (Bütçe)
CREATE TABLE transactions_budget (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'TRY',
  date DATE NOT NULL,
  description TEXT,
  recurring BOOLEAN DEFAULT FALSE,
  recurring_frequency TEXT CHECK (recurring_frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bütçe Kategorileri
CREATE TABLE budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  budget_limit DECIMAL(15,2),
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Piyasa Verileri Cache
CREATE TABLE market_cache (
  symbol TEXT PRIMARY KEY,
  market TEXT NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(15,4) NOT NULL,
  currency TEXT DEFAULT 'TRY',
  change_percent DECIMAL(8,4),
  volume BIGINT,
  high_24h DECIMAL(15,4),
  low_24h DECIMAL(15,4),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- İndeksler
CREATE INDEX idx_assets_portfolio ON assets(portfolio_id);
CREATE INDEX idx_transactions_asset ON transactions(asset_id);
CREATE INDEX idx_price_history_symbol ON price_history(symbol, market);
CREATE INDEX idx_price_history_recorded ON price_history(recorded_at);
CREATE INDEX idx_goals_user ON financial_goals(user_id);
CREATE INDEX idx_budget_user ON transactions_budget(user_id, date);

-- RLS Politikaları
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions_budget ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own portfolios" ON portfolios
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own assets" ON assets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can manage own transactions" ON transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM assets a JOIN portfolios p ON a.portfolio_id = p.id WHERE a.id = asset_id AND p.user_id = auth.uid())
  );

CREATE POLICY "Users can manage own goals" ON financial_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own budget" ON transactions_budget
  FOR ALL USING (auth.uid() = user_id);
```

---

## Özellikler

### 1. Portföy Takibi
- [ ] Çoklu portföy oluşturma
- [ ] Hisse senedi, kripto, fon, altın, döviz takibi
- [ ] Alım-satım işlemi kaydetme
- [ ] Portföy performans grafiği
- [ ] Varlık dağılımı (pie chart, treemap)
- [ ] Kar/zarar analizi

### 2. Finansal Özgürlük Hedefleri
- [ ] Hedef oluşturma (birikim, yatırım, pasif gelir, borçsuzluk)
- [ ] İlerleme takibi (progress bar, grafik)
- [ ] Kilometre taşları
- [ ] Tahmini varış tarihi hesaplama
- [ ] Hedef kategorileri ve önceliklendirme

### 3. Bütçe Yönetimi
- [ ] Gelir/gider kaydetme
- [ ] Kategori bazlı bütçe limitleri
- [ ] Aylık/yıllık özet raporlar
- [ ] Harcama analizi
- [ ] Tekrarlayan işlemler

### 4. Canlı Piyasa Verileri
- [ ] Borsa İstanbul hisseleri (real-time)
- [ ] US piyasalar (Nasdaq, NYSE)
- [ ] Kripto paralar (CoinGecko)
- [ ] Altın ve döviz kurları
- [ ] Fiyat grafikleri (1G, 1H, 1A, 1Y)
- [ ] Fiyat alarmı

### 5. Raporlama
- [ ] Portföy özet raporu
- [ ] Performans grafiği
- [ ] Kar/zarar raporu
- [ ] Varlık dağılımı raporu
- [ ] PDF/Excel export
- [ ] E-posta raporları

### 6. Diğer
- [ ] Email/Password authentication
- [ ] Dark/Light theme
- [ ] Mobil bildirimler
- [ ] Offline mod (mobil)
- [ ] Veri export/import

---

## API Endpoints

### Authentication
```
POST   /api/auth/register        # Kayıt ol
POST   /api/auth/login           # Giriş yap
POST   /api/auth/logout          # Çıkış yap
POST   /api/auth/forgot-password # Şifre sıfırlama
```

### Portföy
```
GET    /api/portfolios           # Tüm portföyleri listele
POST   /api/portfolios           # Yeni portföy oluştur
GET    /api/portfolios/:id       # Portföy detay
PATCH  /api/portfolios/:id       # Portföy güncelle
DELETE /api/portfolios/:id       # Portföy sil
GET    /api/portfolios/:id/summary # Portföy özet
```

### Varlıklar
```
GET    /api/assets              # Varlıkları listele
POST   /api/assets              # Yeni varlık ekle
GET    /api/assets/:id          # Varlık detay
PATCH  /api/assets/:id          # Varlık güncelle
DELETE /api/assets/:id          # Varlık sil
POST   /api/assets/:id/transaction # İşlem ekle
```

### Fiyatlar
```
GET    /api/prices/stock/:symbol      # Hisse fiyatı
GET    /api/prices/crypto/:symbol      # Kripto fiyatı
GET    /api/prices/fund/:symbol        # Fon fiyatı
GET    /api/prices/live                # Canlı fiyatlar (WebSocket)
POST   /api/prices/sync                # Fiyatları güncelle
```

### Hedefler
```
GET    /api/goals                 # Hedefleri listele
POST   /api/goals                 # Yeni hedef oluştur
GET    /api/goals/:id             # Hedef detay
PATCH  /api/goals/:id             # Hedef güncelle
DELETE /api/goals/:id             # Hedef sil
POST   /api/goals/:id/progress    # İlerleme ekle
```

### Bütçe
```
GET    /api/budget/transactions   # İşlemleri listele
POST   /api/budget/transactions   # Yeni işlem ekle
GET    /api/budget/summary        # Aylık özet
GET    /api/budget/categories     # Kategoriler
```

---

## Geliştirme Aşamaları

### Faz 1: Proje Setup (1 hafta)

#### SvelteKit Proje Oluşturma
```bash
# Proje oluştur
npm create svelte@latest finansal-ozgurluk

# Seçimler:
# - Template: Skeleton project
# - Type: TypeScript
# - Addons: ESLint, Prettier, Playwright, Vitest
```

#### Dependencies
```bash
cd finansal-ozgurluk

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# UI Components
npx shadcn-svelte@latest init

# Supabase
npm install @supabase/supabase-js

# Charts
npm install layerchart d3

# Utilities
npm install zod date-fns clsx tailwind-merge

# Dev Dependencies
npm install -D @types/d3
```

#### Supabase Setup
1. Supabase project oluştur (https://supabase.com)
2. Region: EU-West-1
3. Auth: Email/Password enabled
4. Connection string'leri `.env`'e ekleyin:
   ```env
   PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```

#### Veritabanı Migration
1. `supabase/migrations/001_initial_schema.sql` çalıştır
2. RLS policies aktifleştir
3. Seed data oluştur

#### Temel Yapı
1. Root layout (`+layout.svelte`)
2. Auth layout (`(auth)/+layout.svelte`)
3. Dashboard layout (`(dashboard)/+layout.svelte`)
4. Auth guard (`hooks.server.ts`)
5. Svelte stores setup

---

### Faz 2: Authentication (1 hafta)

#### Features
- Email/Password registration
- Email/Password login
- Session management
- Auth guard (protected routes)
- Password reset

#### Svelte Implementation
```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);

// src/hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import { supabase } from '$lib/server/supabase';

export const handle = sequence(
  async ({ event, resolve }) => {
    const session = event.cookies.get('session');
    if (session) {
      const { data } = await supabase.auth.getSession();
      event.locals.user = data.user;
    }
    return resolve(event);
  }
);
```

---

### Faz 3: Portföy Yönetimi (2-3 hafta)

#### Core Features
1. Portföy CRUD (Create, Read, Update, Delete)
2. Asset CRUD (stocks, crypto, funds, forex)
3. Transaction recording (buy, sell, dividend)
4. Portfolio summary calculation
5. Asset distribution charts

#### Svelte Stores (Reactive)
```typescript
// src/lib/stores/portfolio.ts
import { writable, derived } from 'svelte/store';
import type { Portfolio, Asset } from '$lib/types';

export const portfolios = writable<Portfolio[]>([]);
export const selectedPortfolio = writable<Portfolio | null>(null);

// Derived store: Total portfolio value
export const totalValue = derived(
  [portfolios],
  ($portfolios) => {
    return $portfolios.reduce((sum, p) => sum + p.total_value, 0);
  }
);

// Derived store: Profit/Loss
export const profitLoss = derived(
  [portfolios],
  ($portfolios) => {
    return $portfolios.reduce((sum, p) => sum + (p.current_value - p.invested), 0);
  }
);
```

#### Real-time Updates
```typescript
// src/lib/stores/prices.ts
import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const prices = writable<Record<string, number>>({});

// Subscribe to price updates
supabase
  .channel('price-updates')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'market_cache' },
    (payload) => {
      prices.update(p => ({
        ...p,
        [payload.new.symbol]: payload.new.price
      }));
    }
  )
  .subscribe();
```

#### Components
- **PortfolioCard.svelte:** Portföy kartı
- **AssetTable.svelte:** Varlık listesi tablosu
- **TransactionForm.svelte:** Alım-satım formu
- **AddAssetModal.svelte:** Varlık ekleme modal

---

### Faz 4: Piyasa Verileri (2-3 hafta)

#### Features
1. Borsa İstanbul scraper (BigPara)
2. Yahoo Finance API (US markets)
3. CoinGecko API (crypto)
4. TEFAS crawler (investment funds)
5. Real-time price updates
6. Price history charts
7. Price alerts

#### Background Price Fetcher
```typescript
// supabase/functions/price-fetcher/index.ts
import { createClient } from '@supabase/supabase-js';

export default async function fetchPrices() {
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  
  // BIST stocks
  const bistPrices = await fetchBIST();
  
  // Yahoo Finance
  const usPrices = await fetchYahoo();
  
  // CoinGecko
  const cryptoPrices = await fetchCoinGecko();
  
  // Update market_cache table
  await supabase.from('market_cache').upsert([
    ...bistPrices,
    ...usPrices,
    ...cryptoPrices
  ]);
}
```

#### WebSocket Real-time
```typescript
// src/routes/api/prices/live/+server.ts
import { supabase } from '$lib/server/supabase';

export async function GET({ request }) {
  const stream = new ReadableStream({
    start(controller) {
      supabase
        .channel('prices')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'market_cache' },
          (payload) => {
            controller.enqueue(JSON.stringify(payload.new));
          }
        )
        .subscribe();
    }
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
```

---

### Faz 5: Finansal Hedefler (1-2 hafta)

#### Features
1. Goal CRUD (savings, investment, passive_income, debt_free)
2. Progress tracking
3. Milestone management
4. Goal timeline visualization
5. Estimated completion date

#### Reactive Progress
```svelte
<!-- src/lib/components/goals/GoalProgress.svelte -->
<script>
  import { goals } from '$lib/stores/goals';
  import { Progress } from '$lib/components/ui/progress';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  $: progressPercentages = $goals.map(g => ({
    ...g,
    percentage: (g.current_amount / g.target_amount) * 100
  }));
</script>

{#each progressPercentages as goal (goal.id)}
  <div class="goal-card" transition:fly={{ y: 20, duration: 300 }}>
    <h3>{goal.name}</h3>
    <p>{goal.current_amount} / {goal.target_amount}</p>
    <Progress value={goal.percentage} />
    <small>Estimated: {goal.estimated_date}</small>
  </div>
{/each}
```

---

### Faz 6: Bütçe Yönetimi (1-2 hafta)

#### Features
1. Income/Expense recording
2. Category management
3. Monthly/yearly summaries
4. Spending analysis charts
5. Recurring transactions

#### Components
- **BudgetOverview.svelte:** Aylık özet
- **ExpenseChart.svelte:** Harcama grafiği
- **TransactionList.svelte:** İşlem listesi
- **CategoryManager.svelte:** Kategori yönetimi

---

### Faz 7: Raporlama ve PWA (1-2 hafta)

#### Features
1. Portfolio reports
2. Performance reports
3. PDF/Excel export
4. Email reports (future)
5. PWA setup
6. Offline support

#### PWA Setup
```json
// static/manifest.json
{
  "name": "Finansal Özgürlük",
  "short_name": "FinApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192" },
    { "src": "/icons/icon-512.png", "sizes": "512x512" }
  ]
}
```

#### PDF Export
```typescript
// src/routes/api/reports/export/+server.ts
import PDFDocument from 'pdfkit';

export async function POST({ request, locals }) {
  const { portfolioId } = await request.json();
  const portfolio = await getPortfolio(portfolioId);
  
  const doc = new PDFDocument();
  doc.text(`Portfolio Report - ${portfolio.name}`);
  doc.text(`Total Value: ${portfolio.total_value}`);
  
  return new Response(doc.read(), {
    headers: { 'Content-Type': 'application/pdf' }
  });
}
```

---

### Faz 8: Testing & VPS Deployment (1-2 hafta)

#### Lokal Testing
```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage

# Production build test
npm run build
npm run preview
```

#### VPS Deployment Preparation

**Pre-deployment Checklist:**
- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables ready
- [ ] Domain purchased (optional)
- [ ] VPS provisioned
- [ ] SSL certificate prepared

**Deployment Script (deploy.sh)**
```bash
#!/bin/bash
# Deployment automation script

# Build locally
npm run build

# Transfer to VPS
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . user@your-vps-ip:/var/www/finansal-ozgurluk/

# SSH to VPS and restart
ssh user@your-vps-ip << 'ENDSSH'
cd /var/www/finansal-ozgurluk
npm install --production
pm2 restart finansal-ozgurluk
ENDSSH

echo "Deployment complete!"
```

**Make deploy script executable:**
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Post-deployment Verification
```bash
# Check application status
pm2 status

# Check logs
pm2 logs finansal-ozgurluk

# Check Nginx
sudo nginx -t
sudo systemctl status nginx

# Check SSL
curl -I https://yourdomain.com

# Monitor application
pm2 monit
```

---

## Timeline Summary

| Faz | Süre | Özellikler |
|-----|------|------------|
| Faz 1 | 1 hafta | Setup, Auth, DB |
| Faz 2 | 1 hafta | Authentication |
| Faz 3 | 2-3 hafta | Portfolio CRUD |
| Faz 4 | 2-3 hafta | Market Data, Real-time |
| Faz 5 | 1-2 hafta | Financial Goals |
| Faz 6 | 1-2 hafta | Budget Management |
| Faz 7 | 1-2 hafta | Reporting, PWA |
| Faz 8 | 1 hafta | Testing, Deploy |
| **Total** | **9-13 hafta** | **Full MVP** |

---

## Dış Kaynaklar

### API'ler
- **CoinGecko API:** https://www.coingecko.com/api (Free: 10-50 calls/min)
- **Yahoo Finance:** https://query1.finance.yahoo.com (Free, unofficial)
- **BigPara:** https://bigpara.hurriyet.com.tr/borsa/canli-borsa/ (Scraping)
- **TEFAS:** https://www.tefas.gov.tr (Official, scraping)

### UI Libraries
- **shadcn-svelte:** https://www.shadcn-svelte.com (UI components)
- **LayerChart:** https://layerchart.com (Svelte-native charts)

### Docs & Tutorials
- **SvelteKit Docs:** https://kit.svelte.dev/docs
- **Supabase Docs:** https://supabase.com/docs
- **Svelte Stores:** https://svelte.dev/tutorial/writable-stores

---

## Deployment Strategy

### Lokal Development → VPS Deployment

**Workflow:**
1. **Lokal Development:** localhost'ta development ve testing
2. **Production Build:** Lokal'de production build al
3. **VPS Transfer:** Build dosyalarını VPS'e transfer
4. **Self-hosted:** VPS'te Node.js ile serve

---

### Lokal Development Setup

#### Development Workflow
```bash
# Lokal development
npm run dev

# Test locally
npm run test
npm run test:e2e

# Production build (lokal)
npm run build

# Preview production build (lokal)
npm run preview
```

#### Environment Variables (.env)
```env
# Lokal development
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=postgresql://xxx
```

---

### VPS Deployment Setup

#### 1. VPS Requirements
- **OS:** Ubuntu 20.04+ or Debian 11+
- **RAM:** Minimum 1GB (2GB recommended)
- **CPU:** 1 core minimum
- **Node.js:** v18+ LTS
- **PM2:** Process manager
- **Nginx:** Reverse proxy
- **SSL:** Let's Encrypt (Certbot)

#### 2. Initial VPS Setup
```bash
# SSH to VPS
ssh user@your-vps-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx

# Create app directory
mkdir -p /var/www/finansal-ozgurluk
cd /var/www/finansal-ozgurluk
```

#### 3. Transfer Build to VPS

**Option A: SCP (Manual Transfer)**
```bash
# Lokal machine'den VPS'e transfer
scp -r .svelte-kit/build user@your-vps-ip:/var/www/finansal-ozgurluk/
scp -r package.json package-lock.json user@your-vps-ip:/var/www/finansal-ozgurluk/
scp -r static user@your-vps-ip:/var/www/finansal-ozgurluk/

# VPS'te
cd /var/www/finansal-ozgurluk
npm install --production
```

**Option B: Git Clone (Recommended)**
```bash
# VPS'te
cd /var/www/finansal-ozgurluk
git clone https://github.com/yourusername/finansal-ozgurluk.git .
npm install
npm run build
```

**Option C: rsync (Automated)**
```bash
# Lokal machine'den
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./ finansal-ozgurluk user@your-vps-ip:/var/www/finansal-ozgurluk/
```

#### 4. PM2 Configuration

**pm2.config.js**
```javascript
module.exports = {
  apps: [{
    name: 'finansal-ozgurluk',
    script: 'node',
    args: '.svelte-kit/output/server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      PUBLIC_SUPABASE_URL: 'https://xxx.supabase.co',
      PUBLIC_SUPABASE_ANON_KEY: 'xxx',
      SUPABASE_SERVICE_ROLE_KEY: 'xxx'
    }
  }]
};
```

**Start with PM2**
```bash
# Start application
pm2 start pm2.config.js

# Save PM2 configuration
pm2 save

# Start PM2 on system boot
pm2 startup systemd
```

#### 5. Nginx Configuration

**/etc/nginx/sites-available/finansal-ozgurluk.conf**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /_app/ {
        alias /var/www/finansal-ozgurluk/.svelte-kit/output/client/_app/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # WebSocket support (for real-time prices)
    location /api/prices/live {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

**Enable Nginx Site**
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/finansal-ozgurluk.conf /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 6. SSL Certificate (Let's Encrypt)
```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

### Environment Variables on VPS

**Method 1: PM2 Environment (Recommended)**
```javascript
// pm2.config.js
env: {
  NODE_ENV: 'production',
  PORT: 3000,
  PUBLIC_SUPABASE_URL: 'https://xxx.supabase.co',
  PUBLIC_SUPABASE_ANON_KEY: 'xxx',
  SUPABASE_SERVICE_ROLE_KEY: 'xxx'
}
```

**Method 2: .env File**
```bash
# VPS'te .env dosyası oluştur
nano /var/www/finansal-ozgurluk/.env

# Add variables
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

---

## Database Options: Remote Supabase vs Self-hosted PostgreSQL

### Option A: Remote Supabase (Cloud) - Recommended for MVP

#### Advantages
| Özellik | Açıklama |
|---------|----------|
| **Auth Built-in** | Email/Password, OAuth, Magic Link hazır |
| **Real-time** | WebSocket subscriptions built-in |
| **RLS** | Row Level Security built-in (user data isolation) |
| **Auto Backups** | Daily backups automatic |
| **Migrations** | Supabase CLI ile easy migration |
| **Dashboard** | GUI dashboard for database management |
| **Free Tier** | 500MB storage, 2GB bandwidth, 50K monthly users |
| **Zero Setup** | No VPS database setup needed |

#### Disadvantages
| Özellik | Açıklama |
|---------|----------|
| **Dependency** | Third-party service dependency |
| **Limits** | Free tier limits (upgrade needed for scale) |
| **Data Location** | Data in Supabase servers (EU-West-1) |
| **Cost** | Pro tier $25/mo (if exceed free tier) |

#### Setup (Easy)
```bash
# Create Supabase project
supabase projects create finansal-ozgurluk --region eu-west-1

# Get credentials from dashboard
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Run migrations
supabase db push

# Enable Auth
# Dashboard → Authentication → Enable Email/Password
```

#### Connection
```typescript
// src/lib/server/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
```

---

### Option B: Self-hosted PostgreSQL on VPS - For Learning/Control

#### Advantages
| Özellik | Açıklama |
|---------|----------|
| **Full Control** | Complete database control |
| **No Limits** | No storage/bandwidth limits |
| **Data Location** | Data on your VPS (privacy) |
| **Learning** | Learn PostgreSQL administration |
| **Cost** | No extra cost (included in VPS) |
| **Performance** | Database on same server (fast queries) |

#### Disadvantages
| Özellik | Açıklama |
|---------|----------|
| **Manual Auth** | Custom authentication implementation needed |
| **No Real-time** | Manual WebSocket setup required |
| **Manual Backups** | Setup cron jobs for backups |
| **Complex Setup** | PostgreSQL installation + configuration |
| **Maintenance** | Regular maintenance required |
| **Security** | Manual security configuration |

#### Setup (Complex)
```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres createuser finansal
sudo -u postgres createdb finansal_ozgurluk
sudo -u postgres psql
ALTER USER finansal WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE finansal_ozgurluk TO finansal;

# Configure remote connections (if needed)
sudo nano /etc/postgresql/12/main/postgresql.conf
# listen_addresses = 'localhost'  # Only local (recommended)

sudo nano /etc/postgresql/12/main/pg_hba.conf
# local all finansal md5  # Allow local connections

# Restart PostgreSQL
sudo systemctl restart postgresql
sudo systemctl enable postgresql
```

#### Custom Auth Implementation
```typescript
// src/lib/server/auth.ts
import bcrypt from 'bcrypt';
import { db } from './database';

// Register user
export async function register(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
    [email, hashedPassword]
  );
}

// Login user
export async function login(email: string, password: string) {
  const result = await db.query(
    'SELECT id, password_hash FROM users WHERE email = $1',
    [email]
  );
  
  if (result.rows.length === 0) return null;
  
  const valid = await bcrypt.compare(password, result.rows[0].password_hash);
  if (!valid) return null;
  
  return { userId: result.rows[0].id };
}
```

#### Manual Real-time Setup
```typescript
// src/routes/api/prices/live/+server.ts
import { EventEmitter } from 'events';

const priceEmitter = new EventEmitter();

// WebSocket server
export async function GET({ request }) {
  const stream = new ReadableStream({
    start(controller) {
      priceEmitter.on('update', (price) => {
        controller.enqueue(JSON.stringify(price));
      });
    }
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
```

#### Manual Backups
```bash
# Backup script
nano ~/backup.sh
#!/bin/bash
pg_dump finansal_ozgurluk > ~/backups/db-$(date +%Y%m%d).sql

# Cron job (daily backup at 2 AM)
crontab -e
0 2 * * * /home/user/backup.sh

# Manual restore
psql finansal_ozgurluk < ~/backups/db-20240101.sql
```

---

### Comparison Summary

| Feature | Remote Supabase | Self-hosted PostgreSQL |
|---------|-----------------|------------------------|
| **Setup Time** | 5 minutes | 2-3 hours |
| **Auth** | Built-in | Custom (days of work) |
| **Real-time** | Built-in | Manual (complex) |
| **Backups** | Automatic | Manual cron jobs |
| **Security** | Managed (RLS) | Manual configuration |
| **Cost** | Free → $25/mo | Included in VPS |
| **Maintenance** | Zero | Regular maintenance |
| **Learning** | Low | High (DB admin skills) |
| **Control** | Limited | Full control |
| **Performance** | Remote latency | Local (fast) |
| **Recommended For** | MVP, Quick Start | Learning, Production Scale |

---

### Recommendation

**For MVP (1-2 months):**
- **Use Remote Supabase**
  - Zero setup time
  - Auth/Real-time built-in
  - Focus on app development
  - Free tier sufficient

**For Production (after MVP):**
- **Option 1:** Continue with Supabase Pro ($25/mo)
- **Option 2:** Migrate to self-hosted PostgreSQL (if scale)

**Decision Strategy:**
1. Start with **Remote Supabase** (fastest)
2. Build MVP in 2-3 months
3. Evaluate performance/scale needs
4. Decide: Stay on Supabase OR migrate to self-hosted

**Migration Path (Supabase → Self-hosted):**
```bash
# Export data from Supabase
pg_dump supabase_db > supabase-export.sql

# Import to self-hosted PostgreSQL
psql finansal_ozgurluk < supabase-export.sql

# Update connection string
# .env: DATABASE_URL=postgresql://finansal:password@localhost:5432/finansal_ozgurluk
```

---

## Deployment Without Domain (IP Address Only)

### Nginx Configuration (IP Only)

**/etc/nginx/sites-available/finansal.conf**
```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;  # Example: 123.45.67.89

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files (SvelteKit assets)
    location /_app/ {
        alias /var/www/finansal/.svelte-kit/output/client/_app/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # WebSocket for real-time prices
    location /api/prices/live {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;  # 24 hours
    }
}
```

**Enable Config:**
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/finansal.conf /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check if running
sudo systemctl status nginx
```

### Access Application

**URL:** `http://YOUR_VPS_IP`

**Example:** `http://123.45.67.89`

**Test:**
```bash
# Lokal machine'den test
curl http://123.45.67.89

# Browser'dan test
http://123.45.67.89
```

### No SSL Certificate (HTTP Only)

**Important:** IP-only deployment cannot use SSL (HTTPS)

**Security Implications:**
- **⚠️ HTTP (unencrypted):** Passwords sent in plaintext
- **⚠️ Not recommended for production**
- **⚠️ Use only for development/testing**

**Mitigation:**
1. **Use VPN:** Connect via VPN to VPS
2. **Firewall:** Restrict access to specific IPs
   ```bash
   sudo ufw allow from YOUR_HOME_IP to any port 80
   sudo ufw deny 80
   ```
3. **Password Hashing:** Even if intercepted, passwords hashed (bcrypt)
4. **Future:** Purchase domain ($10-15/year) + SSL

### Future Domain Setup (When Available)

**Step 1:** Purchase domain (Namecheap, GoDaddy, etc.)
**Step 2:** Configure DNS A record → YOUR_VPS_IP
**Step 3:** Update Nginx config with domain
**Step 4:** Install SSL certificate (Let's Encrypt)

```bash
# Domain Nginx config
server_name yourdomain.com www.yourdomain.com;

# SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

**Cost:** Domain €10-15/year + SSL Free (Let's Encrypt)

---

## Security Recommendations (IP-only)

### Firewall (UFW)
```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP
sudo ufw allow 80

# Optional: Restrict HTTP to your IP
sudo ufw allow from YOUR_HOME_IP to any port 80

# Check status
sudo ufw status
```

### Fail2Ban (Brute Force Protection)
```bash
# Install
sudo apt install -y fail2ban

# Configure
sudo nano /etc/fail2ban/jail.local
[sshd]
enabled = true
maxretry = 3
bantime = 3600

# Enable
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Application Security
- **Password Hashing:** bcrypt (built-in if Supabase, manual if self-hosted)
- **Session Management:** Cookie-based sessions
- **Input Validation:** Zod schemas
- **Rate Limiting:** Limit API calls per user

### Monitoring
```bash
# PM2 monitoring
pm2 monit

# Logs
pm2 logs finansal

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Final Recommendation

### Phase 1: MVP Development (Start Here)
- **Database:** Remote Supabase (free, easy)
- **Deployment:** IP-only (http://YOUR_VPS_IP)
- **Security:** Basic (UFW, Fail2Ban)
- **Cost:** Free (Supabase free tier) + VPS €3.5/mo

### Phase 2: Production Ready (After MVP)
- **Database:** Evaluate scale → Stay Supabase OR migrate self-hosted
- **Domain:** Purchase domain €10-15/year
- **SSL:** HTTPS with Let's Encrypt
- **Cost:** €3.5/mo (VPS) + €10-15/year (domain)

---

**Decision: Remote Supabase + IP-only deployment (Phase 1)**

---

## Performans Optimizasyonları

### Bundle Size
| Metric | SvelteKit | Next.js |
|--------|-----------|---------|
| Initial JS | ~30KB | ~85KB |
| Runtime | ~10KB | ~80KB |
| Total Bundle | ~25KB | ~140KB |

### Lighthouse Scores (Expected)
| Category | Target |
|----------|--------|
| Performance | 95-100 |
| Accessibility | 90-95 |
| Best Practices | 95-100 |
| SEO | 90-95 |

### Optimization Techniques

#### Svelte-Specific
1. **Compile-time optimization:** Svelte compiles to vanilla JS
2. **No virtual DOM:** Direct DOM updates
3. **Built-in transitions:** No external animation libraries
4. **Derived stores:** Computed values without re-render

#### General
1. **Code splitting:** SvelteKit auto-splits per route
2. **Lazy loading:** Load charts on demand
3. **Image optimization:** Use `sveltekit:image`
4. **Caching:** Supabase query caching
5. **Edge functions:** Run price fetcher close to user

---

## Başlangıç Komutları

### Lokal Development Setup

```bash
# 1. Proje oluştur
npm create svelte@latest finansal-ozgurluk
cd finansal-ozgurluk

# 2. Dependencies
npm install

# 3. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. shadcn-svelte
npx shadcn-svelte@latest init

# 5. Supabase
npm install @supabase/supabase-js

# 6. Charts
npm install layerchart d3

# 7. Utilities
npm install zod date-fns clsx tailwind-merge

# 8. Dev Dependencies
npm install -D @types/d3

# 9. Git init
git init
git add .
git commit -m "Initial commit"

# 10. Dev server
npm run dev
```

### Supabase Setup (Remote)

```bash
# Login to Supabase
supabase login

# Create project (or use dashboard)
supabase projects create finansal-ozgurluk --region eu-west-1

# Link project
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push

# Seed data
supabase db seed

# Deploy Edge Functions
supabase functions deploy price-fetcher
```

---

### VPS Deployment Commands

#### Initial VPS Setup
```bash
# SSH to VPS
ssh user@your-vps-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Create app directory
mkdir -p /var/www/finansal-ozgurluk
```

#### Deploy Application
```bash
# Option 1: Git clone
cd /var/www/finansal-ozgurluk
git clone https://github.com/yourusername/finansal-ozgurluk.git .
npm install --production
npm run build

# Option 2: SCP transfer (from local machine)
scp -r .svelte-kit/build package.json static user@your-vps-ip:/var/www/finansal-ozgurluk/

# Start with PM2
pm2 start pm2.config.js
pm2 save
pm2 startup systemd
```

#### Configure Nginx
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/finansal-ozgurluk.conf

# Enable site
sudo ln -s /etc/nginx/sites-available/finansal-ozgurluk.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL certificate
sudo certbot --nginx -d yourdomain.com
```

#### Monitor & Maintain
```bash
# Check status
pm2 status
pm2 logs finansal-ozgurluk
pm2 monit

# Restart application
pm2 restart finansal-ozgurluk

# Update application
cd /var/www/finansal-ozgurluk
git pull
npm install --production
npm run build
pm2 restart finansal-ozgurluk

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

### Development Workflow Summary

**Lokal Development:**
```bash
npm run dev          # Development server
npm run test         # Run tests
npm run build        # Production build
npm run preview      # Preview production build
```

**VPS Deployment:**
```bash
# Lokal → VPS transfer
./deploy.sh

# VPS monitoring
pm2 status
pm2 logs
```

**Database:**
```bash
# Supabase migrations
supabase db push

# Supabase functions
supabase functions deploy price-fetcher
```

---

## Maintenance & Monitoring

### PM2 Commands
```bash
# Application management
pm2 start finansal-ozgurluk       # Start app
pm2 stop finansal-ozgurluk        # Stop app
pm2 restart finansal-ozgurluk     # Restart app
pm2 delete finansal-ozgurluk      # Delete app

# Monitoring
pm2 status                        # List all apps
pm2 logs finansal-ozgurluk        # View logs
pm2 monit                         # Real-time monitoring
pm2 describe finansal-ozgurluk    # App details

# Startup script
pm2 startup systemd               # Generate startup script
pm2 save                          # Save current process list
```

### Nginx Commands
```bash
# Service management
sudo systemctl start nginx        # Start Nginx
sudo systemctl stop nginx         # Stop Nginx
sudo systemctl restart nginx      # Restart Nginx
sudo systemctl reload nginx       # Reload config (no downtime)
sudo systemctl status nginx       # Check status

# Configuration
sudo nginx -t                     # Test configuration
sudo nginx -s reload              # Reload configuration
```

### SSL Management
```bash
# Certbot commands
sudo certbot certificates         # List certificates
sudo certbot renew                # Renew all certificates
sudo certbot revoke --cert-path /path/to/cert.pem  # Revoke certificate

# Dry run renewal test
sudo certbot renew --dry-run
```

### Backup Strategy
```bash
# Application backup
tar -czf finansal-backup-$(date +%Y%m%d).tar.gz \
  /var/www/finansal-ozgurluk \
  /etc/nginx/sites-available/finansal-ozgurluk.conf

# Database backup (if self-hosted PostgreSQL)
pg_dump finansal_ozgurluk > backup-$(date +%Y%m%d).sql

# Supabase backup (managed automatically)
```

---

## Security Checklist

### VPS Security
- [ ] Firewall configured (UFW)
  ```bash
  sudo ufw allow ssh
  sudo ufw allow 'Nginx Full'
  sudo ufw enable
  ```
- [ ] SSH key-based authentication (disable password login)
- [ ] Fail2Ban installed (prevent brute force)
  ```bash
  sudo apt install -y fail2ban
  sudo systemctl enable fail2ban
  ```
- [ ] Regular system updates
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- [ ] SSL certificate active (HTTPS)
- [ ] Environment variables secured (not in .env file on server)

### Application Security
- [ ] Supabase RLS policies enabled
- [ ] Input validation (Zod schemas)
- [ ] Rate limiting on API routes
- [ ] CORS configured properly
- [ ] Session management (cookie-based)
- [ ] Password hashing (Supabase handles)
- [ ] HTTPS only

---

## Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
pm2 logs finansal-ozgurluk

# Check Node.js version
node -v  # Should be v18+

# Check environment variables
pm2 describe finansal-ozgurluk

# Restart manually
pm2 restart finansal-ozgurluk
```

**502 Bad Gateway:**
```bash
# Check if app is running
pm2 status

# Check Nginx config
sudo nginx -t

# Check port 3000
sudo netstat -tulpn | grep :3000

# Restart both
pm2 restart finansal-ozgurluk
sudo systemctl restart nginx
```

**Database connection failed:**
```bash
# Check Supabase credentials
cat .env | grep SUPABASE

# Test connection
node -e "const { createClient } = require('@supabase/supabase-js'); \
  const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY); \
  supabase.from('portfolios').select('*').limit(1).then(console.log);"
```

**SSL certificate issues:**
```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates

# Force renew
sudo certbot renew --force-renewal
```

---

## Sonraki Adımlar

### Development Phase (Lokal)
1. **Onay:** Bu planı review edin
2. **Setup:** SvelteKit + Supabase proje oluşturun (lokal)
3. **Database:** Migration'ları çalıştırın (Supabase remote)
4. **Auth:** Email/Password authentication
5. **Portfolio:** CRUD operations
6. **Real-time:** Price subscriptions
7. **Testing:** Lokal'de tüm testleri yapın

### Deployment Phase (VPS)
1. **Build:** Lokal'de production build al
2. **VPS Setup:** Node.js + PM2 + Nginx kur
3. **Transfer:** Build dosyalarını VPS'e aktar
4. **PM2:** Application'ı PM2 ile başlat
5. **Nginx:** Reverse proxy configuration
6. **SSL:** Let's Encrypt certificate
7. **Monitor:** PM2 monitoring active

### Timeline
- **Lokal Development:** 9-13 hafta
- **VPS Deployment:** 1-2 gün
- **Maintenance:** Sürekli

---

## Cost Analysis

### Lokal Development (Free)
- SvelteKit: Free (open source)
- Supabase Free Tier: Free (500MB storage, 2GB bandwidth)
- Node.js: Free
- npm packages: Free

### VPS Hosting (Monthly)
| Provider | Plan | Cost | Specs |
|----------|------|------|-------|
| DigitalOcean | Basic | $6/mo | 1GB RAM, 1 CPU |
| Linode | Nanode | $5/mo | 1GB RAM, 1 CPU |
| Hetzner | CX11 | €3.5/mo | 2GB RAM, 1 CPU |
| AWS Lightsail | $3.50 | $3.50/mo | 512MB RAM |

**Recommended:** Hetzner CX11 (€3.5/mo) - En uygun fiyat/performans

### Total Cost
- **Development:** Free
- **Hosting:** €3.5-6/mo
- **Supabase:** Free tier (yeterli)
- **Domain:** €10-15/year (optional)
- **SSL:** Free (Let's Encrypt)

**Total Monthly:** €3.5-6
**Total Yearly:** €42-72 + domain (€10-15)

---

## Advantages of VPS vs Vercel

### VPS Advantages
1. **Full Control:** Complete server control
2. **Cost:** €3.5/mo vs Vercel Pro $20/mo
3. **No Limits:** No bandwidth/function limits
4. **Custom Setup:** Any configuration possible
5. **Learning:** Learn server management
6. **Privacy:** Data on your own server
7. **No Vendor Lock-in:** Easy to migrate

### Vercel Advantages (Not Using)
1. **Easy Deploy:** Automatic deployment
2. **Edge Functions:** Global CDN
3. **Zero Management:** No server management
4. **CI/CD:** Built-in Git integration
5. **Analytics:** Built-in analytics

### Trade-offs
- **VPS:** More control, lower cost, manual setup
- **Vercel:** Less control, higher cost, automatic setup

**Decision:** VPS更适合 kişisel proje ve learning için.

---

**Plan hazır (VPS Deployment). Lokal development → VPS deployment workflow.**