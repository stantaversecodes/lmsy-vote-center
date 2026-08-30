import { supabase } from './supabase.js';


// ================================
// ADMIN LOGIN
// ================================

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


// ================================
// CREATE ADMIN ACCOUNT
// ================================

export async function createAdminAccount({
  accessPassword,
  email,
  password,
  displayName,
  role,
}) {
  const allowedRoles = [
    'admin',
    'content_manager',
  ];

  if (!allowedRoles.includes(role)) {
    throw new Error('Please select a valid admin role.');
  }

  const { data, error } = await supabase.functions.invoke(
    'create-admin-account',
    {
      body: {
        accessPassword,
        email: email.trim(),
        password,
        displayName: displayName.trim(),
        role,
      },
    }
  );

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error(
      data?.message ||
      'Unable to create administrator account.'
    );
  }

  return data;
}

// ================================
// CURRENT ADMIN SESSION
// ================================

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


// ================================
// ADMIN RECORD
// ================================

async function getAdminRecord(userId) {
  const { data: adminRecord, error: adminError } = await supabase
    .from('lmsy_admins')
    .select(
      'id, user_id, display_name, role, active'
    )
    .eq('user_id', userId)
    .eq('active', true)
    .single();

  if (adminError || !adminRecord) {
    throw new Error(
      'This account does not have admin access.'
    );
  }

  return adminRecord;
}


// ================================
// FORGOT PASSWORD
// ================================

export async function sendAdminPasswordReset(email) {
  const redirectTo =
    `${window.location.origin}/`;

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo,
      }
    );

  if (error) {
    throw error;
  }
}


// ================================
// LOGOUT
// ================================

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function updateAdminPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}

export function listenForAdminPasswordRecovery(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        callback();
      }
    }
  );

  return subscription;
}