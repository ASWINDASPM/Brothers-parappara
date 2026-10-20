# PULSE — Arts & Sports Club Portal ⚡🎨🏆

A modern web application tailored for student, collegiate, and community **Arts and Sports Clubs**. It unites creative arts (fine arts, music, theatre, photography, and literature) and athletic sports (football, badminton, basketball, track & field, and esports) into a unified digital headquarters.

---

## 🌟 Key Features

### 1. Dual-Wing Architecture (Creative Arts & Athletic Sports)
- **Unified Brand & Identity**: Supports individual wings or dual-wing cross-participation.
- **Dynamic Wing Filters**: Filter events, member rosters, photo showcases, notices, and spaces by **Creative Arts**, **Athletic Sports**, or **All Activities** with one click.

### 2. Events, Matches & RSVP System
- Browse upcoming matches, workshops, open mics, auditions, and tournaments.
- Interactive **RSVP & Pass Generator**: Members register their seat with live capacity tracking and an instant digital pass code.
- **Host / Add Event**: Easy modal form for club captains and directors to publish new events.

### 3. Member Directory & Leadership Roster
- View executive board members, sport captains, and art curators.
- Filter by discipline (e.g. Badminton, Oil Painting, Acoustic Guitar, Track) or role.
- Member achievement badges and direct email links.
- Interactive **Member Registration**: Add new profiles or register as a newcomer.

### 4. Interactive Digital Membership Card (`Join Modal`)
- Students apply online by selecting their primary wing (Arts, Sports, or Dual Wing!).
- Instant generation of a personalized **Digital Membership Card** with a unique Club ID (e.g., `PULSE-2026-XXXX`).

### 5. Facility, Studio & Equipment Reservation System
- Book indoor badminton courts, FIFA-grade turf pitch, art studios, and band jam rooms.
- Equipment checkout for professional photography cameras and sound gear.
- Interactive date & time slot picker with instant confirmation and a live list of active reservations.

### 6. Creative Showcase & Sports Hall of Fame
- Gallery for original paintings, backstage captures, and championship moments.
- Interactive **Like Button** with live counters.
- Modal photo viewer with full story and author attribution.
- Member submission form for new highlights.

### 7. Notice Board & Announcements
- High-priority urgent alerts, trial notifications, and schedule updates.
- Priority tags: *Urgent*, *Notice*, and *Upcoming*.
- Bulletin submission tool for leads.

### 8. Persistence & Portability
- Persists all additions, bookings, RSVPs, and likes directly to browser `localStorage`.
- Includes a **"Reset Demo Seed Data"** button to restore sample state at any time.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
Dependencies are already installed. If running on a new machine:
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the portal.

### Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, GitHub Pages, or any static hosting service.

---

## 📁 Project Structure

```
d:/club/
├── index.html                   # HTML template with Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite config (port 3000)
├── tailwind.config.js           # Custom Arts & Sports color themes
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Root layout, navigation & state sync
│   ├── index.css                # Tailwind directives & custom utilities
│   ├── data/
│   │   └── mockData.js          # Realistic seed data for Arts & Sports
│   ├── utils/
│   │   └── storage.js           # LocalStorage persistence & reset handlers
│   └── components/
│       ├── Navbar.jsx           # Top navbar with quick wing switcher
│       ├── HeroBanner.jsx       # Dual-wing hero showcase & live metrics
│       ├── OverviewSection.jsx  # Main dashboard uniting all modules
│       ├── EventsSection.jsx    # Fixtures, auditions, RSVP & pass cards
│       ├── MembersSection.jsx   # Directory, captains, and profile cards
│       ├── GallerySection.jsx   # Arts showcase & Sports Hall of Fame
│       ├── FacilityBookingSection.jsx # Court, turf, and studio booking
│       ├── AnnouncementsSection.jsx   # Priority notice board
│       ├── JoinModal.jsx        # Membership onboarding & virtual card
│       └── Footer.jsx           # Schedules, contacts, and reset button
```

---

## 🎨 Customizing for Your Club

1. **Rebranding / Renaming**:
   - Change the club name, motto, and tagline in `src/data/mockData.js` (`INITIAL_CLUB_INFO`).
2. **Adding Disciplines**:
   - Add sports (e.g. Volleyball, Swimming, Table Tennis) or arts (e.g. Pottery, Dance, Creative Writing) in `INITIAL_CLUB_INFO.wings`.
3. **Updating Facilities & Gear**:
   - Modify or add facilities and available time slots in `INITIAL_FACILITIES` within `src/data/mockData.js`.
