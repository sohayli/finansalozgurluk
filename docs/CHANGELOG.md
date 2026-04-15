# Finansal Özgürlük - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project documentation (PLAN.md, MEMORY.md)
- Technology stack decision: SvelteKit 2.0 + Supabase + VPS
- Deployment strategy: Lokal → VPS (IP-only)
- Repository structure planned (docs/ + src/)

### Changed
- Repository moved to https://github.com/sohayli/finansalozgurluk

## [0.0.1] - 2026-04-15

### Added
- Project planning phase started
- Framework comparison completed (Svelte vs Next.js)
  - Decision: SvelteKit (performance + real-time)
- Database comparison completed (Supabase vs self-hosted PostgreSQL)
  - Decision: Remote Supabase (auth + real-time built-in)
- Deployment comparison completed (VPS vs Vercel)
  - Decision: VPS (cost €3.5/mo, full control)
- Comprehensive plan created (70KB, 2464 lines)
- GitHub repository initialized

### Documentation
- PLAN.md: Detailed implementation plan (70KB)
- MEMORY.md: Project memory and decision log
- CHANGELOG.md: Version history tracking

---

## Future Milestones

### [0.1.0] - Project Setup
- SvelteKit project initialization
- Supabase configuration
- Dependencies installation
- Basic routing setup

### [0.2.0] - Authentication
- Email/Password registration
- Email/Password login
- Session management
- Protected routes

### [0.3.0] - Portfolio Management
- Portfolio CRUD operations
- Asset tracking (stocks, crypto, funds)
- Transaction recording
- Basic charts

### [0.4.0] - Market Data
- Real-time price updates
- BIST scraper
- Yahoo Finance integration
- CoinGecko API
- WebSocket subscriptions

### [1.0.0] - Production Release
- Full MVP features
- VPS deployment
- SSL certificate (optional domain)
- Performance optimization
- Complete documentation