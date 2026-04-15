# Finansal Özgürlük Projesi - Hafıza ve Kararlar

## Proje Bilgileri
- **Proje Adı:** Finansal Özgürlük
- **GitHub Repository:** https://github.com/ongonmanga-beep/finansal-ozgurluk-plans
- **Plan Dosyası:** PLAN.md (70KB, detaylı uygulama planı)
- **Başlangıç Tarihi:** 2026-04-15

---

## Teknoloji Kararları

### 2026-04-15 - Framework Seçimi
**Karar:** Svelte + SvelteKit

**Seçim Nedenleri:**
1. Performans: ~25KB bundle (Next.js ~140KB)
2. Real-time fiyat updates için built-in reactive stores
3. Development speed: Less boilerplate, faster iteration
4. Built-in transitions/animasyonlar

**Değerlendirilen Alternatifler:**
- Next.js + React: Enterprise-ready, React Native mobil future, büyük ekosistem
- Sonuç: Kişisel proje için Svelte performans ve hız avantajı sağlıyor

---

### 2026-04-15 - Veritabanı Seçimi
**Karar:** PostgreSQL (Supabase) - Remote

**Seçim Nedenleri:**
1. Auth built-in (Email/Password)
2. Real-time subscriptions built-in
3. Row Level Security (RLS) - user data isolation
4. Free tier: 500MB storage, 2GB bandwidth
5. Zero database setup required

**Değerlendirilen Alternatifler:**
- Self-hosted PostgreSQL on VPS: Full control, learning opportunity, manual setup
- MongoDB: Flexible schema, but no built-in auth/real-time
- Firebase Firestore: Built-in real-time/auth, but pricing unpredictable

**Sonuç:** MVP için Remote Supabase en hızlı ve kolay çözüm

---

### 2026-04-15 - Deployment Strategy
**Karar:** Lokal Development → VPS Deployment (IP-only)

**Workflow:**
1. Lokal development (localhost)
2. Lokal testing (unit, integration, E2E)
3. Production build (lokal)
4. VPS transfer (SCP/rsync/git clone)
5. PM2 + Nginx deployment
6. HTTP-only (IP address, no SSL)

**Seçim Nedenleri:**
1. Full server control
2. Cost: €3.5/mo (Hetzner) vs Vercel Pro $20/mo
3. Learning opportunity
4. No bandwidth/function limits
5. No vendor lock-in

**Domain Kararı:**
- IP-only deployment (domain yok)
- HTTP-only (⚠️ SSL yok, development/testing için)
- Future: Domain €10-15/year + SSL (Let's Encrypt)

**Security (IP-only):**
- UFW firewall
- Fail2Ban (brute force protection)
- Password hashing (bcrypt)
- VPN access recommended

---

### 2026-04-15 - Mobil Strateji
**Karar:** Mobil sonraya (PWA first)

**Seçim Nedenleri:**
1. Focus on web MVP first
2. PWA (Progressive Web App) - mobil-ready design
3. Future: Svelte Native (when mature) or React Native

**Timeline:**
- Phase 1 (MVP): Web only + PWA design
- Phase 2 (Production): Domain + SSL
- Phase 3 (Future): Mobil app consideration

---

## Mevcut Durum

### ✅ Tamamlanan
- [x] Teknoloji stack belirlendi (Svelte + Supabase + VPS)
- [x] Deployment strategy belirlendi (Lokal → VPS)
- [x] Veritabanı seçimi (Remote Supabase)
- [x] Plan dosyası oluşturuldu (PLAN.md, 70KB)
- [x] GitHub repo oluşturuldu
- [x] Plan ve README push edildi

### 🔄 Devam Eden
- [ ] Proje setup (npm create svelte@latest finansal-ozgurluk)
- [ ] Supabase project oluşturma
- [ ] Dependencies installation

### 📋 Sonraki Adımlar
1. **Faz 1: Setup (1 hafta)**
   - SvelteKit proje oluşturma
   - Supabase setup
   - Tailwind CSS + shadcn-svelte
   - Veritabanı migration'ları
   - Auth implementation

2. **Faz 2: Authentication (1 hafta)**
   - Email/Password registration
   - Email/Password login
   - Session management
   - Auth guard (protected routes)

3. **Faz 3-8:** Implementation (8-11 hafta)

---

## Önemli Notlar

### API Kaynakları
- **Borsa İstanbul:** BigPara scraper + Investing.com
- **Kripto:** CoinGecko API (ücretsiz tier)
- **US Markets:** Yahoo Finance API
- **TEFAS:** TEFAS.gov.tr scraper

### Cost Breakdown
- **VPS:** €3.5-6/month (Hetzner/DigitalOcean/Linode)
- **Supabase:** Free tier (500MB)
- **Domain (optional):** €10-15/year
- **Total:** €42-72/year

### Timeline
- **Total:** 9-13 hafta (Full MVP)
- **Deployment:** 1-2 gün (VPS setup)

### Security Checklist (VPS)
- [ ] UFW firewall configured
- [ ] Fail2Ban installed
- [ ] SSH key-based auth (disable password)
- [ ] Regular system updates
- [ ] Environment variables secured

---

## Değişiklik Log'u

### 2026-04-15
- İlk plan oluşturuldu
- Svelte vs Next.js karşılaştırması
- Supabase vs self-hosted PostgreSQL karşılaştırması
- VPS deployment vs Vercel deployment karşılaştırması
- IP-only deployment strategy belirlendi
- GitHub repo oluşturuldu: https://github.com/ongonmanga-beep/finansal-ozgurluk-plans

---

## İletişim ve Kaynaklar

### Dokümantasyon
- **Detaylı Plan:** PLAN.md (2464 satır, 70KB)
- **Bu Hafıza:** MEMORY.md (kararlar ve güncellemeler)
- **README:** README.md (proje özeti)

### External Resources
- **SvelteKit Docs:** https://kit.svelte.dev/docs
- **Supabase Docs:** https://supabase.com/docs
- **shadcn-svelte:** https://www.shadcn-svelte.com
- **LayerChart:** https://layerchart.com

### GitHub
- **Repo:** https://github.com/ongonmanga-beep/finansal-ozgurluk-plans
- **Branch:** main
- **Files:** README.md, PLAN.md, MEMORY.md

---

**Son Güncelleme:** 2026-04-15 13:06 (GMT+3)
**Durum:** Plan phase complete, ready for implementation