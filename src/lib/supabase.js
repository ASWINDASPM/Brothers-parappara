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
// Supabase Authentication API (Admin Panel)
// ========================================================

/**
 * Sign in admin user using Supabase Auth (email + password)
 */
export async function signInAdminWithSupabase(email, password) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: { message: 'Supabase is not configured in .env' } };
  }
  return await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });
}

/**
 * Sign out current admin user from Supabase
 */
export async function signOutAdminFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  return await supabase.auth.signOut();
}

/**
 * Retrieve current active session and user from Supabase
 */
export async function getAdminSession() {
  if (!isSupabaseConfigured() || !supabase) {
    return { session: null, user: null, error: null };
  }
  try {
    const { data, error } = await supabase.auth.getSession();
    return {
      session: data?.session || null,
      user: data?.session?.user || null,
      error
    };
  } catch (err) {
    return { session: null, user: null, error: err };
  }
}

/**
 * Subscribe to auth state changes (login, logout, token refresh)
 */
export function onAdminAuthStateChange(callback) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
}

// ========================================================
// Member Registration & Roster API
// ========================================================
export async function registerMemberToSupabase(member) {
  if (!isSupabaseConfigured() || !supabase) {
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
        member_id: member.memberId,
        status: member.status || 'Active'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase register error:', error);
  }
  return { data, error };
}

export async function getMembersFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateMemberStatusInSupabase(id, status) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('members')
      .update({ status })
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}

export async function deleteMemberFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('members')
      .delete()
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}

// ========================================================
// Events & RSVPs API
// ========================================================
export async function getEventsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: UPCOMING_EVENTS, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: UPCOMING_EVENTS, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: UPCOMING_EVENTS, error: err };
  }
}

export async function createEventInSupabase(event) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: event, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          month: event.month,
          day: event.day,
          title: event.title,
          location: event.location,
          time: event.time,
          image: event.image,
          category: event.category || 'Sports',
          description: event.description || ''
        }
      ])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteEventFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('events')
      .delete()
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}

export async function rsvpEventToSupabase(eventId, name, passCode) {
  if (!isSupabaseConfigured() || !supabase) {
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

export async function getRsvpsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('event_rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ========================================================
// Contact Messages API
// ========================================================
export async function sendContactMessageToSupabase(message) {
  if (!isSupabaseConfigured() || !supabase) {
    console.log('[Supabase Demo Mode] Contact message received:', message);
    return { data: message, error: null };
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: message.name,
        phone_or_email: message.phone || message.phone_or_email,
        message: message.message
      }
    ])
    .select()
    .single();

  return { data, error };
}

export async function getContactMessagesFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteContactMessageFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}

// ========================================================
// News & Notices API
// ========================================================
export async function getNewsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: NEWS_UPDATES, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('news_updates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { data: NEWS_UPDATES, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: NEWS_UPDATES, error: err };
  }
}

export async function createNewsInSupabase(news) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: news, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('news_updates')
      .insert([
        {
          tag: news.tag || 'NEWS',
          title: news.title,
          date: news.date,
          content: news.content,
          author: news.author || 'Club Secretary'
        }
      ])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteNewsFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('news_updates')
      .delete()
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}

// ========================================================
// Gallery Media API
// ========================================================
export async function getGalleryFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: GALLERY_MOMENTS, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return { data: GALLERY_MOMENTS, error };
    }
    return { data, error: null };
  } catch (err) {
    return { data: GALLERY_MOMENTS, error: err };
  }
}

export async function createGalleryInSupabase(item) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: item, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([
        {
          title: item.title,
          category: item.category,
          image: item.image,
          is_video: Boolean(item.isVideo),
          description: item.description || ''
        }
      ])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteGalleryFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }
  try {
    return await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
  } catch (err) {
    return { error: err };
  }
}
