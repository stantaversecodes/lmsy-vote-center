import { supabase } from './supabase.js';

// ================================
// ADMIN ACCESS VERIFICATION
// ================================

export async function verifyAdminAccess(password) {
  const { data, error } = await supabase.functions.invoke(
    'smooth-responder',
    {
      body: {
        password,
      },
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

// ================================
// VOTING
// ================================

export async function getVotingPlatforms() {
  const { data, error } = await supabase
    .from('lmsy_platforms')
    .select('*')
    .order('priority', { ascending: true })
    .order('deadline', { ascending: true, nullsFirst: false })
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveVotingPlatforms() {
  const { data, error } = await supabase
    .from('lmsy_platforms')
    .select('*')
    .eq('active', true)
    .order('priority', { ascending: true })
    .order('deadline', { ascending: true, nullsFirst: false })
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createVotingPlatform(votingData) {
  const { data, error } = await supabase
    .from('lmsy_platforms')
    .insert(votingData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateVotingPlatform(id, votingData) {
  const { data, error } = await supabase
    .from('lmsy_platforms')
    .update(votingData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteVotingPlatform(id) {
  const { error } = await supabase
    .from('lmsy_platforms')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}


// ================================
// TUTORIALS
// ================================

export async function getTutorials() {
  const { data, error } = await supabase
    .from('lmsy_tutorials')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveTutorials() {
  const { data, error } = await supabase
    .from('lmsy_tutorials')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createTutorial(tutorialData) {
  const { data, error } = await supabase
    .from('lmsy_tutorials')
    .insert(tutorialData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateTutorial(id, tutorialData) {
  const { data, error } = await supabase
    .from('lmsy_tutorials')
    .update(tutorialData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteTutorial(id) {
  const { error } = await supabase
    .from('lmsy_tutorials')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}


// ================================
// ARTISTS
// ================================

export async function getArtists() {
  const { data, error } = await supabase
    .from('lmsy_artists')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveArtists() {
  const { data, error } = await supabase
    .from('lmsy_artists')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createArtist(artistData) {
  const { data, error } = await supabase
    .from('lmsy_artists')
    .insert(artistData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateArtist(id, artistData) {
  const { data, error } = await supabase
    .from('lmsy_artists')
    .update(artistData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteArtist(id) {
  const { error } = await supabase
    .from('lmsy_artists')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

// ================================
// ARTIST IMAGE UPLOAD
// ================================

export async function uploadArtistPhoto(file, artistSlug) {
  const fileExtension =
    file.name.split('.').pop();

  const fileName =
    `${artistSlug}-${Date.now()}.${fileExtension}`;

  const filePath =
    `artists/${fileName}`;

  const { error: uploadError } =
    await supabase.storage
      .from('lmsy-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

  if (uploadError) {
    throw uploadError;
  }

  const { data } =
    supabase.storage
      .from('lmsy-media')
      .getPublicUrl(filePath);

  return data.publicUrl;
}

// ================================
// CONTENT
// ================================

export async function getContent() {
  const { data, error } = await supabase
    .from('lmsy_content')
    .select('*')
    .order('content_key', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveContent() {
  const { data, error } = await supabase
    .from('lmsy_content')
    .select('*')
    .eq('active', true)
    .order('content_key', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createContent(contentData) {
  const { data, error } = await supabase
    .from('lmsy_content')
    .insert(contentData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateContent(id, contentData) {
  const { data, error } = await supabase
    .from('lmsy_content')
    .update(contentData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteContent(id) {
  const { error } = await supabase
    .from('lmsy_content')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

// ================================
// SET CONTENT AS MAIN
// ================================

export async function setContentAsMain(
  contentId,
  contentKey
) {
  const { error: resetError } = await supabase
    .from('lmsy_content')
    .update({ is_main: false })
    .eq('content_key', contentKey);

  if (resetError) {
    throw resetError;
  }

  const { data, error } = await supabase
    .from('lmsy_content')
    .update({ is_main: true })
    .eq('id', contentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function returnContentToBase(
  contentKey
) {
  const { error } = await supabase
    .from('lmsy_content')
    .update({
      is_main: false,
    })
    .eq('content_key', contentKey);

  if (error) throw error;
}

// ================================
// SUPPORT SETTINGS
// ================================

export async function getDonationSettings() {
  const { data, error } = await supabase
    .from('lmsy_donation_settings')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveDonationSettings() {
  const { data, error } = await supabase
    .from('lmsy_donation_settings')
    .select('*')
    .eq('active', true)
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createDonationSetting(settingData) {
  const { data, error } = await supabase
    .from('lmsy_donation_settings')
    .insert(settingData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateDonationSetting(
  id,
  settingData
) {
  const { data, error } = await supabase
    .from('lmsy_donation_settings')
    .update(settingData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteDonationSetting(id) {
  const { error } = await supabase
    .from('lmsy_donation_settings')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

// ================================
// SUPPORT QR UPLOAD
// ================================

export async function uploadSupportQr(
  file,
  fundId = 'new'
) {
  const fileExtension =
    file.name.split('.').pop();

  const fileName =
    `support-${fundId}-${Date.now()}.${fileExtension}`;

  const filePath =
    `support/${fileName}`;

  const { error: uploadError } =
    await supabase.storage
      .from('lmsy-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

  if (uploadError) {
    throw uploadError;
  }

  const { data } =
    supabase.storage
      .from('lmsy-media')
      .getPublicUrl(filePath);

  return data.publicUrl;
}

// ================================
// DONATION LINKS
// ================================

export async function getDonationLinks() {
  const { data, error } = await supabase
    .from('lmsy_donation_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveDonationLinks() {
  const { data, error } = await supabase
    .from('lmsy_donation_links')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createDonationLink(linkData) {
  const { data, error } = await supabase
    .from('lmsy_donation_links')
    .insert(linkData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateDonationLink(
  id,
  linkData
) {
  const { data, error } = await supabase
    .from('lmsy_donation_links')
    .update(linkData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteDonationLink(id) {
  const { error } = await supabase
    .from('lmsy_donation_links')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

// ================================
// WATCH & RESULTS
// ================================

export async function getWatchLinks() {
  const { data, error } = await supabase
    .from('lmsy_watch_links')
    .select('*')
    .order('sort_order', {
      ascending: true,
    })
    .order('created_at', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getActiveWatchLinks() {
  const { data, error } = await supabase
    .from('lmsy_watch_links')
    .select('*')
    .eq('active', true)
    .order('sort_order', {
      ascending: true,
    })
    .order('created_at', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createWatchLink(watchData) {
  const { data, error } = await supabase
    .from('lmsy_watch_links')
    .insert(watchData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateWatchLink(
  watchId,
  watchData
) {
  const { data, error } = await supabase
    .from('lmsy_watch_links')
    .update(watchData)
    .eq('id', watchId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteWatchLink(watchId) {
  const { error } = await supabase
    .from('lmsy_watch_links')
    .delete()
    .eq('id', watchId);

  if (error) {
    throw error;
  }
}