import { createClient } from '@supabase/supabase-js';
import { UPCOMING_EVENTS, NEWS_UPDATES, GALLERY_MOMENTS } from '../data/mockData';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// Strip trailing /rest/v1 or /rest/v1/ or trailing slash
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project') && 
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ========================================================
// Member Registration API
// ========================================================
export async function registerMemberToSupabase(member) {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Demo Mode] Member registered locally:', member);
    return { data: member, error: null };
  }

  const { data, error } = await supabase
    .from('members')
    .insert([
      {
        name: member.name,
        phone: member.phone,
        email: member.email || null,
        wing: member.wing,
        age_group: member.ageGroup,
        address: member.address,
        member_id: member.memberId
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase register error:', error);
  }
  return { data, error };
}

// ========================================================
// Events & RSVPs API
// ========================================================
export async function getEventsFromSupabase() {
  if (!isSupabaseConfigured()) {
    return { data: UPCOMING_EVENTS, error: null };
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data || data.length === 0) {
    return { data: UPCOMING_EVENTS, error };
  }
  return { data, error: null };
}

export async function rsvpEventToSupabase(eventId, name, passCode) {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Demo Mode] Event RSVP registered:', { eventId, name, passCode });
    return { data: { eventId, name, passCode }, error: null };
  }

  const { data, error } = await supabase
    .from('event_rsvps')
    .insert([
      {
        event_id: eventId,
        participant_name: name,
        pass_code: passCode
      }
    ])
    .select()
    .single();

  return { data, error };
}

// ========================================================
// Contact Messages API
// ========================================================
export async function sendContactMessageToSupabase(message) {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Demo Mode] Contact message received:', message);
    return { data: message, error: null };
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: message.name,
        phone_or_email: message.phone,
        message: message.message
      }
    ])
    .select()
    .single();

  return { data, error };
}

// ========================================================
// News & Notices API
// ========================================================
export async function getNewsFromSupabase() {
  if (!isSupabaseConfigured()) {
    return { data: NEWS_UPDATES, error: null };
  }

  const { data, error } = await supabase
    .from('news_updates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return { data: NEWS_UPDATES, error };
  }
  return { data, error: null };
}
