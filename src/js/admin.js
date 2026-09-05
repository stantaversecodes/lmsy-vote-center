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
  // Delete any translations connected
  // to this voting first.

  const {
    error: translationError,
  } = await supabase
    .from('lmsy_translations')
    .delete()
    .eq(
      'content_type',
      'voting'
    )
    .eq(
      'content_id',
      id
    );

  if (translationError) {
    throw translationError;
  }


  // Delete the voting platform.

  const { error } =
    await supabase
      .from('lmsy_platforms')
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
  // Delete artist translations first.

  const {
    error: translationError,
  } = await supabase
    .from('lmsy_translations')
    .delete()
    .eq(
      'content_type',
      'artist'
    )
    .eq(
      'content_id',
      id
    );

  if (translationError) {
    throw translationError;
  }


  // Delete the artist.

  const { error } =
    await supabase
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

// ================================
// TRANSLATIONS
// ================================

export async function getTranslations(
  contentType,
  contentId
) {
  const { data, error } = await supabase
    .from('lmsy_translations')
    .select('*')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .order('language', {
      ascending: true,
    })
    .order('field_name', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getTranslationsByType(
  contentType
) {
  const { data, error } = await supabase
    .from('lmsy_translations')
    .select('*')
    .eq('content_type', contentType)
    .order('content_id', {
      ascending: true,
    })
    .order('language', {
      ascending: true,
    })
    .order('field_name', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function upsertTranslation({
  contentType,
  contentId,
  fieldName,
  language,
  translatedText,
}) {
  const cleanText =
    translatedText?.trim() || '';

  if (!cleanText) {
    return deleteTranslation(
      contentType,
      contentId,
      fieldName,
      language
    );
  }

  const { data, error } = await supabase
    .from('lmsy_translations')
    .upsert(
      {
        content_type: contentType,
        content_id: contentId,
        field_name: fieldName,
        language,
        translated_text: cleanText,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict:
          'content_type,content_id,field_name,language',
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveTranslations(
  contentType,
  contentId,
  translations
) {
  const operations = [];

  Object.entries(translations).forEach(
    ([language, fields]) => {
      Object.entries(fields).forEach(
        ([fieldName, translatedText]) => {
          operations.push(
            upsertTranslation({
              contentType,
              contentId,
              fieldName,
              language,
              translatedText,
            })
          );
        }
      );
    }
  );

  return Promise.all(operations);
}

export async function deleteTranslation(
  contentType,
  contentId,
  fieldName,
  language
) {
  const { error } = await supabase
    .from('lmsy_translations')
    .delete()
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('field_name', fieldName)
    .eq('language', language);

  if (error) {
    throw error;
  }
}

export async function deleteContentTranslations(
  contentType,
  contentId
) {
  const { error } = await supabase
    .from('lmsy_translations')
    .delete()
    .eq('content_type', contentType)
    .eq('content_id', contentId);

  if (error) {
    throw error;
  }
}

export function organizeTranslations(
  rows = []
) {
  return rows.reduce(
    (result, row) => {
      if (!result[row.language]) {
        result[row.language] = {};
      }

      result[row.language][row.field_name] =
        row.translated_text;

      return result;
    },
    {}
  );
}

// ================================
// FOOTER SETTINGS
// ================================

export async function getFooterSettings() {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_footer_settings')
      .select('*')
      .order('id', {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();


  if (error) {
    console.error(
      'Unable to load footer settings:',
      error
    );

    throw error;
  }


  return data;
}

export async function updateFooterSettings(
  footerId,
  footerData
) {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_footer_settings')
      .update({
        ...footerData,

        updated_at:
          new Date().toISOString(),
      })
      .eq('id', footerId)
      .select()
      .single();


  if (error) {
    console.error(
      'Unable to update footer settings:',
      error
    );

    throw error;
  }


  return data;
}

// ================================
// VOTING SETTINGS
// ================================

export async function getVotingSettings() {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_settings')
      .select('*')
      .order('id', {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();


  if (error) {
    console.error(
      'Unable to load voting settings:',
      error
    );

    throw error;
  }


  return data;
}


export async function updateVotingSettings(
  votingSettingsId,
  votingSettingsData
) {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_settings')
      .update({
        ...votingSettingsData,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        'id',
        votingSettingsId
      )
      .select()
      .single();


  if (error) {
    console.error(
      'Unable to update voting settings:',
      error
    );

    throw error;
  }


  return data;
}

// ================================
// DYNAMIC VOTING TABS
// ================================

export async function getVotingTabs() {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_tabs')
      .select('*')
      .order('sort_order', {
        ascending: true,
      })
      .order('id', {
        ascending: true,
      });


  if (error) {
    console.error(
      'Unable to load voting tabs:',
      error
    );

    throw error;
  }


  return data ?? [];
}


export async function getActiveVotingTabs() {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_tabs')
      .select('*')
      .eq(
        'active',
        true
      )
      .order('sort_order', {
        ascending: true,
      })
      .order('id', {
        ascending: true,
      });


  if (error) {
    console.error(
      'Unable to load active voting tabs:',
      error
    );

    throw error;
  }


  return data ?? [];
}


export async function createVotingTab(
  votingTabData
) {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_tabs')
      .insert({
        ...votingTabData,

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),
      })
      .select()
      .single();


  if (error) {
    console.error(
      'Unable to create voting tab:',
      error
    );

    throw error;
  }


  return data;
}


export async function updateVotingTab(
  votingTabId,
  votingTabData
) {
  const {
    data,
    error,
  } =
    await supabase
      .from('lmsy_voting_tabs')
      .update({
        ...votingTabData,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        'id',
        votingTabId
      )
      .select()
      .single();


  if (error) {
    console.error(
      'Unable to update voting tab:',
      error
    );

    throw error;
  }


  return data;
}


export async function deleteVotingTab(
  votingTabId
) {
  const {
    error,
  } =
    await supabase
      .from('lmsy_voting_tabs')
      .delete()
      .eq(
        'id',
        votingTabId
      );


  if (error) {
    console.error(
      'Unable to delete voting tab:',
      error
    );

    throw error;
  }


  return true;
}


// ================================
// VOTING TAB ASSIGNMENTS
// ================================

export async function getVotingTabAssignments() {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        'lmsy_voting_tab_assignments'
      )
      .select('*');


  if (error) {
    console.error(
      'Unable to load voting tab assignments:',
      error
    );

    throw error;
  }


  return data ?? [];
}


export async function getVotingTabAssignmentsByVotingId(
  votingId
) {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        'lmsy_voting_tab_assignments'
      )
      .select('*')
      .eq(
        'voting_id',
        votingId
      );


  if (error) {
    console.error(
      'Unable to load voting tab assignments for voting:',
      error
    );

    throw error;
  }


  return data ?? [];
}


export async function replaceVotingTabAssignments(
  votingId,
  tabIds = []
) {
  const {
    error: deleteError,
  } =
    await supabase
      .from(
        'lmsy_voting_tab_assignments'
      )
      .delete()
      .eq(
        'voting_id',
        votingId
      );


  if (deleteError) {
    console.error(
      'Unable to clear voting tab assignments:',
      deleteError
    );

    throw deleteError;
  }


  if (
    !Array.isArray(tabIds) ||
    tabIds.length === 0
  ) {
    return [];
  }


  const assignments =
    tabIds.map(
      (tabId) => ({
        voting_id:
          votingId,

        tab_id:
          Number(tabId),
      })
    );


  const {
    data,
    error,
  } =
    await supabase
      .from(
        'lmsy_voting_tab_assignments'
      )
      .insert(assignments)
      .select();


  if (error) {
    console.error(
      'Unable to save voting tab assignments:',
      error
    );

    throw error;
  }


  return data ?? [];
}