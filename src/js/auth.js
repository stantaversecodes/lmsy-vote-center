import { supabase } from './supabase.js';

export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data.user;

  const admin = await getAdminRecord(user.id);

  return {
    user,
    admin,
  };
}

export async function getCurrentAdminSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.user) {
    return null;
  }

  try {
    const admin = await getAdminRecord(session.user.id);

    return {
      user: session.user,
      admin,
    };
  } catch {
    await supabase.auth.signOut();
    return null;
  }
}

async function getAdminRecord(userId) {
  const { data: adminRecord, error: adminError } = await supabase
    .from('lmsy_admins')
    .select('id, user_id, display_name, active')
    .eq('user_id', userId)
    .eq('active', true)
    .single();

  if (adminError || !adminRecord) {
    throw new Error('This account does not have admin access.');
  }

  return adminRecord;
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}