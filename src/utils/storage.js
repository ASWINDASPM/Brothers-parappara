import {
  INITIAL_CLUB_INFO,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_MEMBERS,
  INITIAL_GALLERY,
  INITIAL_FACILITIES
} from '../data/mockData';

const STORAGE_KEYS = {
  CLUB_INFO: 'pulse_club_info_v1',
  ANNOUNCEMENTS: 'pulse_club_announcements_v1',
  EVENTS: 'pulse_club_events_v1',
  MEMBERS: 'pulse_club_members_v1',
  GALLERY: 'pulse_club_gallery_v1',
  FACILITIES: 'pulse_club_facilities_v1',
  BOOKINGS: 'pulse_club_bookings_v1'
};

export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.warn(`Failed reading ${key} from localStorage:`, err);
  }
  return fallback;
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed writing ${key} to localStorage:`, err);
  }
};

export const loadAllClubData = () => {
  return {
    clubInfo: getStoredData(STORAGE_KEYS.CLUB_INFO, INITIAL_CLUB_INFO),
    announcements: getStoredData(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS),
    events: getStoredData(STORAGE_KEYS.EVENTS, INITIAL_EVENTS),
    members: getStoredData(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS),
    gallery: getStoredData(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
    facilities: getStoredData(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES),
    bookings: getStoredData(STORAGE_KEYS.BOOKINGS, [
      {
        id: "bkg-1",
        facilityId: "fac-1",
        facilityName: "Indoor Badminton Court A & B",
        memberName: "Elena Rostova",
        slot: "06:00 - 07:30 PM",
        date: "2026-10-21",
        purpose: "Varsity Training Session",
        status: "Confirmed"
      },
      {
        id: "bkg-2",
        facilityId: "fac-4",
        facilityName: "Acoustics Soundstage & Band Jam Room",
        memberName: "Devon Miles",
        slot: "04:30 - 06:30 PM",
        date: "2026-10-22",
        purpose: "Band Rehearsal for Open Mic",
        status: "Confirmed"
      }
    ])
  };
};

export const resetClubDataToDefaults = () => {
  Object.values(STORAGE_KEYS).forEach(k => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  });
};

export { STORAGE_KEYS };
