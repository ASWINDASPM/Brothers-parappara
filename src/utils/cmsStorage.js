import { 
  CLUB_DETAILS, 
  ACTIVITIES, 
  UPCOMING_EVENTS, 
  GALLERY_MOMENTS, 
  NEWS_UPDATES, 
  INITIAL_HERO_SLIDES, 
  INITIAL_MEMBERS, 
  INITIAL_MESSAGES 
} from '../data/mockData';

const CMS_STORAGE_KEY = 'bp_club_cms_state_v1';
const ADMIN_AUTH_KEY = 'bp_club_admin_logged_in_v1';
const ADMIN_PASSWORD_KEY = 'bp_club_admin_password_v1';

export const DEFAULT_CMS_DATA = {
  clubDetails: CLUB_DETAILS,
  slides: INITIAL_HERO_SLIDES,
  activities: ACTIVITIES,
  events: UPCOMING_EVENTS,
  gallery: GALLERY_MOMENTS,
  news: NEWS_UPDATES,
  members: INITIAL_MEMBERS,
  messages: INITIAL_MESSAGES,
  rsvps: [
    {
      id: "rsvp-1",
      eventId: "evt-1",
      eventTitle: "Annual Football Tournament",
      name: "Akash Nair",
      passCode: "BP-NOV15-842",
      date: "2026-10-18"
    },
    {
      id: "rsvp-2",
      eventId: "evt-2",
      eventTitle: "Cultural Evening",
      name: "Sneha Menon",
      passCode: "BP-NOV28-319",
      date: "2026-10-19"
    }
  ]
};

export function loadCmsData() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with default in case new fields were added
      return {
        ...DEFAULT_CMS_DATA,
        ...parsed,
        clubDetails: { ...DEFAULT_CMS_DATA.clubDetails, ...(parsed.clubDetails || {}) }
      };
    }
  } catch (err) {
    console.warn('Error loading CMS data from localStorage:', err);
  }
  return DEFAULT_CMS_DATA;
}

export function saveCmsData(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving CMS data to localStorage:', err);
  }
}

export function resetCmsData() {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
  } catch (err) {}
  return DEFAULT_CMS_DATA;
}

// Authentication helpers
export function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function checkAdminPassword(enteredPassword) {
  const currentPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || 'admin123';
  if (enteredPassword === currentPassword) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function setAdminPassword(newPassword) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}
