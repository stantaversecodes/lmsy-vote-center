import '../styles/main.css';
import '../styles/home.css';
import '../styles/admin.css';

import { translations } from './translations.js';

import {
  loginAdmin,
  getCurrentAdminSession,
  createAdminAccount,
  logoutAdmin,
  sendAdminPasswordReset,
  updateAdminPassword,
  listenForAdminPasswordRecovery,
} from './auth.js';

import { supabase } from './supabase.js';

import {
  getVotingPlatforms,
  getActiveVotingPlatforms,
  createVotingPlatform,
  updateVotingPlatform,
  deleteVotingPlatform,
  getTutorials,
  getActiveTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getArtists,
  getActiveArtists,
  createArtist,
  updateArtist,
  uploadArtistPhoto,
  getContent,
  getActiveContent,
  createContent,
  updateContent,
  deleteContent,
  setContentAsMain,
  returnContentToBase,
  getDonationSettings,
  getActiveDonationSettings,
  createDonationSetting,
  updateDonationSetting,
  deleteDonationSetting,
  uploadSupportQr,
  getDonationLinks,
  getActiveDonationLinks,
  createDonationLink,
  updateDonationLink,
  deleteDonationLink,
  verifyAdminAccess,
  getWatchLinks,
  getActiveWatchLinks,
  createWatchLink,
  updateWatchLink,
  deleteWatchLink,
  getTranslations,
  getTranslationsByType,
  saveTranslations,
  organizeTranslations,
  getFooterSettings,
  updateFooterSettings,
} from './admin.js';

// ================================
// TRANSLATIONS
// ================================

const SUPPORTED_LANGUAGES = [
  'en',
  'es',
  'th',
  'zh',
  'pt',
  'ko',
];

const DEFAULT_LANGUAGE = 'en';

let currentLanguage =
  localStorage.getItem('lmsy_language') ||
  DEFAULT_LANGUAGE;


function getTranslation(path, language = currentLanguage) {
  const keys = path.split('.');

  let value =
    translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  if (value !== undefined) {
    return value;
  }

  let fallback =
    translations[DEFAULT_LANGUAGE];

  for (const key of keys) {
    fallback = fallback?.[key];
  }

  return fallback ?? path;
}


function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  currentLanguage = language;

  localStorage.setItem(
    'lmsy_language',
    language
  );

  document.documentElement.lang =
    language;
}


function getCurrentLanguage() {
  return currentLanguage;
}

function applyTranslations() {
  const elements =
    document.querySelectorAll('[data-i18n]');

  elements.forEach((element) => {
    const translationKey =
      element.dataset.i18n;

    element.textContent =
      getTranslation(translationKey);
  });
}

setLanguage(currentLanguage);


document.querySelector('#app').innerHTML = `



  <!-- ================================
       NAVBAR
  ================================= -->

  <nav class="navbar">
    <div class="page-container navbar__inner">

      <a class="navbar__brand" href="#">
        <span class="navbar__brand-lm">LM</span>
        <span class="navbar__brand-heart">♥</span>
        <span class="navbar__brand-sy">SY</span>
        <span class="navbar__brand-name">Vote Center</span>
      </a>

      <div class="navbar__links">
  <a
    href="#vote"
    data-i18n="nav.voting"
  >
    Voting
  </a>

  <a
    href="#tutorials"
    data-i18n="nav.tutorials"
  >
    Tutorials
  </a>

  <a
    href="#artists"
    data-i18n="nav.artists"
  >
    Artists
  </a>

  <a
    href="#watch"
    data-i18n="nav.watch"
  >
    Watch & Results
  </a>

  <a
    href="#support"
    data-i18n="nav.support"
  >
    Support
  </a>
</div>

      <!-- LANGUAGE SELECTOR -->

      <div class="language-selector">

        <button
          class="language-selector__button"
          type="button"
          id="languageSelectorButton"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span id="currentLanguageLabel">EN</span>
          <span
            class="language-selector__arrow"
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        <div
          class="language-selector__menu"
          id="languageSelectorMenu"
          hidden
        >

          <button
            type="button"
            class="language-selector__option"
            data-language="en"
          >
            <span>English</span>
            <span class="language-selector__code">EN</span>
          </button>

          <button
            type="button"
            class="language-selector__option"
            data-language="es"
          >
            <span>Español</span>
            <span class="language-selector__code">ES</span>
          </button>

          <button
            type="button"
            class="language-selector__option"
            data-language="th"
          >
            <span>ไทย</span>
            <span class="language-selector__code">TH</span>
          </button>

          <button
            type="button"
            class="language-selector__option"
            data-language="zh"
          >
            <span>中文</span>
            <span class="language-selector__code">ZH</span>
          </button>

          <button
            type="button"
            class="language-selector__option"
            data-language="pt"
          >
            <span>Português</span>
            <span class="language-selector__code">PT</span>
          </button>

          <button
            type="button"
            class="language-selector__option"
            data-language="ko"
          >
            <span>한국어</span>
            <span class="language-selector__code">KO</span>
          </button>

        </div>

      </div>

    </div>
  </nav>

 <!-- ================================
     HERO
================================= -->

<header class="hero">

  <div
    class="page-container hero__content"
  >

    <div
      class="hero__main"
      id="publicHeroContent"
    >

      <span
        class="eyebrow"
        id="heroSubtitle"
        data-i18n="hero.eyebrow"
      >
        LMSY VOTE CENTER
      </span>

      <h1
        class="hero__title"
        id="heroTitle"
        data-i18n="hero.title"
      >
        Vote. Support. Celebrate.
      </h1>

      <p
        class="hero__description"
        id="heroBody"
        data-i18n="hero.description"
      >
        Your central hub for LMSY voting guides, tutorials,
        official links, results and voting support.
      </p>

      <div class="hero__actions">

        <a
          class="btn btn-primary"
          href="#vote"
          id="heroPrimaryButton"
          data-i18n="hero.primaryButton"
        >
          Start Voting
        </a>

        <a
          class="btn btn-secondary"
          href="#tutorials"
          id="heroSecondaryButton"
          data-i18n="hero.secondaryButton"
        >
          View Tutorials
        </a>

      </div>

    </div>


    <!-- ACTIVE VOTES CARD -->

    <div class="hero-votes-card">

      <div class="hero-votes-card__top">

        <span
          class="hero-votes-card__dot"
        ></span>

        <span
          data-i18n="hero.activeNow"
        >
          Active now
        </span>

      </div>

      <div
        class="hero-votes-card__count"
      >

        <strong
          class="hero-votes-card__number"
          id="activeVoteCount"
        >
          0
        </strong>

        <span
          class="hero-votes-card__label"
          data-i18n="hero.activeVotes"
        >
          active votings
        </span>

      </div>

    </div>

  </div>

</header>
  <!-- ================================
       WHERE TO VOTE
  ================================= -->

  <section
    class="section"
    id="vote"
  >

    <div class="page-container">

      <span
        class="eyebrow"
        data-i18n="voting.eyebrow"
      >
        WHERE TO VOTE
      </span>


      <h2
        class="section-title"
        data-i18n="voting.sectionTitle"
      >
        Voting Platforms
      </h2>


      <p
        class="section-description"
        data-i18n="voting.description"
      >
        Find current voting opportunities for Lookmhee, Sonya and LMSY.
      </p>


      <!-- FILTERS -->

      <div class="vote-filters">

        <button
          class="vote-filter is-active"
          type="button"
          data-filter="all"
          data-i18n="voting.all"
        >
          All
        </button>


        <button
          class="vote-filter"
          type="button"
          data-filter="ceremony"
          data-i18n="voting.ceremony"
        >
          Awards & Ceremonies
        </button>


        <button
          class="vote-filter"
          type="button"
          data-filter="poll"
          data-i18n="voting.poll"
        >
          Poll
        </button>


        <button
          class="vote-filter"
          type="button"
          data-filter="advertising"
          data-i18n="voting.advertising"
        >
          Advertising
        </button>

      </div>


      <!-- VOTING CARDS -->

      <div
        class="vote-grid"
        id="publicVotingGrid"
      >

        <p
          class="vote-empty__description"
          data-i18n="common.loading"
        >
          Loading...
        </p>

      </div>


      <!-- EMPTY STATE -->

      <div
        class="vote-empty"
        hidden
      >

        <p
          class="vote-empty__title"
          data-i18n="voting.noVotes"
        >
          No active votes in this category.
        </p>


        <p
          class="vote-empty__description"
          data-i18n="voting.checkAnother"
        >
          Check another category or come back later.
        </p>

      </div>

    </div>

  </section>

     <!-- ================================
     TUTORIALS
================================= -->

<section
  class="section tutorials-section"
  id="tutorials"
>

  <div class="page-container">

    <span
      class="eyebrow"
      id="tutorialsSubtitle"
      data-i18n="tutorials.eyebrow"
    >
      TUTORIALS
    </span>

    <h2
      class="section-title"
      id="tutorialsTitle"
      data-i18n="tutorials.title"
    >
      Learn How to Vote
    </h2>

    <p
      class="section-description"
      id="tutorialsBody"
      data-i18n="tutorials.description"
    >
      Find step-by-step voting guides, videos and external tutorials.
    </p>

    <div
      class="tutorial-grid"
      id="publicTutorialGrid"
    >

      <p
        class="vote-empty__description"
        data-i18n="tutorials.loading"
      >
        Loading tutorials...
      </p>

    </div>

  </div>
</section>

<!-- ================================
     ARTISTS
================================= -->

<section
  class="section artists-section"
  id="artists"
>

  <div class="page-container">

    <span
      class="eyebrow"
      id="artistsSubtitle"
      data-i18n="artists.eyebrow"
    >
      ARTISTS
    </span>

    <h2
      class="section-title"
      id="artistsTitle"
      data-i18n="artists.title"
    >
      Lookmhee, Sonya & LMSY
    </h2>

    <p
      class="section-description"
      id="artistsBody"
      data-i18n="artists.description"
    >
      Follow their official social media accounts and latest updates.
    </p>

    <!-- ARTIST TABS -->

    <div class="artist-tabs">

      <button
        class="artist-tab artist-tab--lookmhee is-active"
        type="button"
        data-artist="lookmhee"
      >
        💛 Lookmhee
      </button>

      <button
        class="artist-tab artist-tab--sonya"
        type="button"
        data-artist="sonya"
      >
        💙 Sonya
      </button>

      <button
        class="artist-tab artist-tab--lmsy"
        type="button"
        data-artist="lmsy"
      >
        💛💙 LMSY
      </button>

    </div>

    <!-- ARTIST CONTENT -->

    <div
      class="artist-content"
      id="publicArtistContent"
    >
      <p
        class="vote-empty__description"
        data-i18n="artists.loading"
      >
        Loading artists...
      </p>
    </div>

  </div>

</section>

  <!-- ================================
     WATCH & RESULTS
================================= -->

<section
  class="section watch-section"
  id="watch"
>

  <div class="page-container">

    <span
      class="eyebrow"
      id="watchSubtitle"
      data-i18n="watch.eyebrow"
    >
      WATCH & RESULTS
    </span>

    <h2
      class="section-title"
      id="watchTitle"
      data-i18n="watch.title"
    >
      Watch, Stream & Celebrate
    </h2>

    <p
      class="section-description"
      id="watchBody"
      data-i18n="watch.description"
    >
      Find official livestreams, broadcasts and results in one place.
    </p>

    <div
      class="watch-grid"
      id="publicWatchGrid"
    >
      <p
        class="vote-empty__description"
        data-i18n="watch.loading"
      >
        Loading...
      </p>
    </div>

  </div>
</section>


<!-- ================================
     SUPPORT
================================= -->

<section
  class="section support-section"
  id="support"
>

  <div class="page-container">

    <span
      class="eyebrow"
      id="supportSubtitle"
      data-i18n="support.eyebrow"
    >
      SUPPORT LMSY
    </span>

    <h2
      class="section-title"
      id="supportTitle"
      data-i18n="support.title"
    >
      Help Fund Voting
    </h2>

    <p
      class="section-description"
      id="supportBody"
      data-i18n="support.description"
    >
      Support active LMSY voting campaigns through the available
      donation methods below.
    </p>


    <!-- DYNAMIC SUPPORT FUNDS -->

    <div
      class="support-grid"
      id="publicSupportGrid"
    >
      <p class="vote-empty__description">
        Loading support funds...
      </p>
    </div>

  </div>
</section>

    <!-- ================================
       FOOTER
  ================================= -->

  <footer class="footer">

    <div class="page-container footer__inner">

      <div class="footer__help">

        <p
          id="footerDisclaimer"
          data-i18n="footer.disclaimer"
        >
          Unofficial fan-made tracker. Not affiliated with any agency, network or platform.
        </p>


        <p>
          <a
            id="footerSubmitLink"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdnKcrQ-gbmC_7cO0vuCva5repKWPQBondGJDk2ln0iqNd_RA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            data-i18n="footer.submit"
          >
            ➕ Submit a new vote link or report an issue
          </a>
        </p>


        <p>

          <span
            id="footerQuestionsText"
          >
            Have questions about voting? Reach out to the official LMSY voting house on
          </span>

          <span>
            &nbsp;
          </span>

          <a
            id="footerXLink"
            href="https://x.com/LMSY_VotingBase"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter ↗
          </a>

        </p>

      </div>


      <div class="footer__bottom">

        <p
          class="footer__message"
          id="footerCredit"
        >

          <span id="footerCreditPrefix">
            LMSY Vote Center — made with
          </span>

          <span class="footer__hearts">
            💛💙
          </span>

          <span>
            by
          </span>

          <span class="footer__besties-credit">

            <a
              class="footer__secret-link"
              id="footerFirstBestiesLink"
              href="https://x.com/delulushots"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="@delulushots"
              title="@delulushots"
            >
              Besties
            </a>

            <span>
              for
            </span>

            <a
              class="footer__secret-link"
              id="footerSecondBestiesLink"
              href="https://x.com/LMSY_VotingBase"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="@LMSY_VotingBase"
              title="@LMSY_VotingBase"
            >
              Besties
            </a>

          </span>

        </p>


        <a
          class="footer__admin"
          href="#"
          id="adminLoginTrigger"
          data-i18n="footer.admin"
        >
          Admin
        </a>

      </div>

    </div>

  </footer>


  <!-- ================================
     ADMIN ACCESS MODAL
================================= -->

<div class="admin-modal" id="adminModal" hidden>

  <div
    class="admin-modal__backdrop"
    data-close-admin-modal
  ></div>

  <div class="admin-modal__dialog">

    <button
      class="admin-modal__close"
      type="button"
      aria-label="Close admin access"
      data-close-admin-modal
    >
      ×
    </button>

    <div class="admin-modal__header">

      <span class="eyebrow">
        ADMIN ACCESS
      </span>

      <h2 class="admin-modal__title">
        Restricted Area
      </h2>

      <p class="admin-modal__description">
        This section is exclusively for LMSY Vote Center
        administrators. Voters do not need an account to use
        the site.
      </p>

      <p class="admin-modal__description">
        If you are an administrator, please enter the admin
        access password to continue.
      </p>

    </div>

    <div
      class="admin-auth-content"
      id="adminAuthContent"
    >

      <form
        class="admin-login-form"
        id="adminAccessForm"
      >

        <label class="admin-login-form__field">

          <span>Admin Access Password</span>

          <input
            type="password"
            id="adminAccessPassword"
            name="access-password"
            autocomplete="off"
            required
          />

        </label>

        <p
          class="admin-login-form__message"
          id="adminAccessMessage"
          aria-live="polite"
        ></p>

        <button
          class="btn btn-primary admin-login-form__submit"
          type="submit"
        >
          Continue
        </button>

      </form>

    </div>

  </div>

</div>

  <!-- ================================
       ADMIN PANEL
  ================================= -->

  <div class="admin-panel" id="adminPanel" hidden>

    <div class="admin-panel__backdrop"></div>

    <div class="admin-panel__shell">

      <aside class="admin-panel__sidebar">

        <div class="admin-panel__sidebar-header">

  <div class="admin-panel__brand">
    <span class="navbar__brand-lm">LM</span>
    <span class="navbar__brand-heart">♥</span>
    <span class="navbar__brand-sy">SY</span>
    <span class="navbar__brand-name">Admin</span>
  </div>

  <div class="admin-panel__identity">
    <span
      class="admin-panel__identity-name"
      id="adminPanelUserName"
    >
      Admin
    </span>

    <span
      class="admin-panel__role"
      id="adminPanelUserRole"
    >
      Admin
    </span>
  </div>

</div>


        <nav class="admin-panel__nav">

          <button
            class="admin-panel__nav-item is-active"
            type="button"
          >
            Voting
          </button>

          <button
            class="admin-panel__nav-item"
            type="button"
          >
            Tutorials
          </button>

          <button
            class="admin-panel__nav-item"
            type="button"
          >
            Watch & Results
          </button>

          <button
            class="admin-panel__nav-item"
            type="button"
          >
            Support
          </button>

          <button
            class="admin-panel__nav-item"
            type="button"
          >
            Artists & Content
          </button>

        </nav>

      </aside>


      <section class="admin-panel__content">

        <div class="admin-panel__topbar">

          <div>

            <span class="eyebrow">
              ADMIN PANEL
            </span>

            <h2 class="admin-panel__title">
              Voting
            </h2>

          </div>

          <button
            class="admin-panel__close"
            type="button"
            id="closeAdminPanel"
            aria-label="Close admin panel"
          >
            ×
          </button>

        </div>


        <div class="admin-panel__body">

          <p class="admin-panel__placeholder">
            Voting management will appear here.
          </p>

        </div>

      </section>

    </div>

  </div>
`;

// ================================
// LANGUAGE SELECTOR
// ================================

const LANGUAGE_LABELS = {
  en: 'EN',
  es: 'ES',
  th: 'TH',
  zh: 'ZH',
  pt: 'PT',
  ko: 'KO',
};


function updateLanguageSelectorUI() {
  const currentLanguageLabel =
    document.querySelector(
      '#currentLanguageLabel'
    );

  const languageOptions =
    document.querySelectorAll(
      '.language-selector__option'
    );

  if (currentLanguageLabel) {
    currentLanguageLabel.textContent =
      LANGUAGE_LABELS[currentLanguage] ||
      'EN';
  }

  languageOptions.forEach((option) => {
    const isActive =
      option.dataset.language ===
      currentLanguage;

    option.classList.toggle(
      'is-active',
      isActive
    );
  });
}


function setupLanguageSelector() {
  const languageSelectorButton =
    document.querySelector(
      '#languageSelectorButton'
    );

  const languageSelectorMenu =
    document.querySelector(
      '#languageSelectorMenu'
    );

  const languageOptions =
    document.querySelectorAll(
      '.language-selector__option'
    );

  if (
    !languageSelectorButton ||
    !languageSelectorMenu
  ) {
    return;
  }


  // Show saved/current language.

  updateLanguageSelectorUI();


  // Open / close dropdown.

  languageSelectorButton.addEventListener(
    'click',
    (event) => {
      event.stopPropagation();

      const isOpen =
        languageSelectorButton.getAttribute(
          'aria-expanded'
        ) === 'true';

      languageSelectorButton.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      languageSelectorMenu.hidden =
        isOpen;
    }
  );


  // Change language.

  languageOptions.forEach((option) => {
    option.addEventListener(
      'click',
      async () => {
        const language =
          option.dataset.language;

        setLanguage(language);

        applyTranslations();


        // VOTING

        renderPublicVotingPlatforms(
          currentPublicVoteFilter
        );


        // TUTORIALS

        await loadPublicTutorials();


        // WATCH & RESULTS

        await loadPublicWatchLinks();


        // ARTISTS

        if (publicArtists.length > 0) {
          renderPublicArtists(
            publicArtists
          );

          const activeArtistTab =
            document.querySelector(
              '.artist-tab.is-active'
            );

          if (activeArtistTab) {
            activateArtistTab(
              activeArtistTab.dataset.artist
            );
          }
        }


        // SUPPORT

        if (
          publicSupportFunds.length > 0
        ) {
          renderPublicSupport(
            publicSupportFunds
          );
        }


                // SITE CONTENT

        await loadPublicSiteContent();


        // FOOTER

        renderPublicFooter();


        // LANGUAGE SELECTOR UI

        updateLanguageSelectorUI();


        languageSelectorButton.setAttribute(
          'aria-expanded',
          'false'
        );

        languageSelectorMenu.hidden =
          true;
      }
    );
  });


  // Close when clicking outside.

  document.addEventListener(
    'click',
    () => {
      languageSelectorButton.setAttribute(
        'aria-expanded',
        'false'
      );

      languageSelectorMenu.hidden =
        true;
    }
  );


  // Prevent menu clicks from closing
  // before the option is processed.

  languageSelectorMenu.addEventListener(
    'click',
    (event) => {
      event.stopPropagation();
    }
  );


  // Close with Escape key.

  document.addEventListener(
    'keydown',
    (event) => {
      if (
        event.key !== 'Escape'
      ) {
        return;
      }

      languageSelectorButton.setAttribute(
        'aria-expanded',
        'false'
      );

      languageSelectorMenu.hidden =
        true;
    }
  );
}


applyTranslations();

setupLanguageSelector();

// ================================
// ADMIN MODAL
// ================================

const adminLoginTrigger = document.querySelector('#adminLoginTrigger');
const adminModal = document.querySelector('#adminModal');
const adminPanel = document.querySelector('#adminPanel');

const adminModalCloseButtons = document.querySelectorAll(
  '[data-close-admin-modal]'
);

const closeAdminPanelButton =
  document.querySelector('#closeAdminPanel');

function openAdminModal() {
  adminModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
  adminModal.hidden = true;
  document.body.style.overflow = '';
}

function openAdminPanelView() {
  adminModal.hidden = true;
  adminPanel.hidden = false;

  document.body.style.overflow = 'hidden';

  const activeAdminSection =
    document.querySelector('.admin-panel__nav-item.is-active');

  activeAdminSection?.click();
}

function closeAdminPanelView() {
  adminPanel.hidden = true;
  document.body.style.overflow = '';
}

adminLoginTrigger.addEventListener('click', (event) => {
  event.preventDefault();
  openAdminModal();
});

adminModalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeAdminModal();
  });
});

closeAdminPanelButton.addEventListener('click', () => {
  closeAdminPanelView();
});


// ================================
// ADMIN ACCESS
// ================================

const adminAccessForm =
  document.querySelector('#adminAccessForm');

const adminAccessPassword =
  document.querySelector('#adminAccessPassword');

const adminAccessMessage =
  document.querySelector('#adminAccessMessage');

const adminAuthContent =
  document.querySelector('#adminAuthContent');

const adminModalHeader =
  document.querySelector('.admin-modal__header');

let verifiedAdminAccessPassword = '';

let currentAdmin = null;

function updateAdminPanelIdentity(admin) {
  const nameElement =
    document.querySelector('#adminPanelUserName');

  const roleElement =
    document.querySelector('#adminPanelUserRole');

  if (!nameElement || !roleElement || !admin) {
    return;
  }

  nameElement.textContent =
    admin.display_name || 'Admin';

  const roleLabels = {
    developer: 'Developer',
    admin: 'Admin',
    content_manager: 'Content Manager',
  };

  roleElement.textContent =
    roleLabels[admin.role] || admin.role;
}

function showAdminWelcome(admin) {
  currentAdmin = admin;

  adminModalHeader.hidden = true;

  updateAdminPanelIdentity(admin);

  adminAuthContent.innerHTML = `
    <div class="admin-login-success">

      <span class="eyebrow">
        ADMIN ACCESS
      </span>

      <h2 class="admin-modal__title">
        Welcome, ${admin.display_name}
      </h2>

      <p class="admin-modal__description">
        You are signed in and ready to manage the LMSY Voting Center.
      </p>

      <div class="admin-login-success__actions">

        <button
          class="btn btn-primary"
          type="button"
          id="openAdminPanel"
        >
          Open Admin Panel
        </button>

        <button
          class="btn btn-secondary"
          type="button"
          id="logoutAdminButton"
        >
          Log Out
        </button>

      </div>

    </div>
  `;

  document
    .querySelector('#openAdminPanel')
    .addEventListener('click', () => {
      openAdminPanelView();
    });

  document
    .querySelector('#logoutAdminButton')
    .addEventListener('click', async () => {
      try {
        await logoutAdmin();

        verifiedAdminAccessPassword = '';

        window.location.reload();
      } catch (error) {
        console.error('Unable to log out:', error);
      }
    });
}

function showAdminLoginForm() {
  adminModalHeader.hidden = false;

  adminModalHeader.innerHTML = `
    <span class="eyebrow">
      ADMIN ACCESS
    </span>

    <h2 class="admin-modal__title">
      Welcome back
    </h2>

    <p class="admin-modal__description">
      Sign in to manage the LMSY Voting Center.
    </p>
  `;

  adminAuthContent.innerHTML = `
    <form
      class="admin-login-form"
      id="adminLoginForm"
    >

      <label class="admin-login-form__field">
        <span>Email</span>

        <input
          type="email"
          id="adminEmail"
          autocomplete="email"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Password</span>

        <input
          type="password"
          id="adminPassword"
          autocomplete="current-password"
          required
        />
      </label>

      <p
        class="admin-login-form__message"
        id="adminLoginMessage"
        aria-live="polite"
      ></p>

      <button
        class="btn btn-primary admin-login-form__submit"
        type="submit"
      >
        Log In
      </button>

      <button
        class="admin-auth-link"
        type="button"
        id="backToAdminOptions"
      >
        Back
      </button>

    </form>
  `;

  const loginForm =
    document.querySelector('#adminLoginForm');

  const loginEmail =
    document.querySelector('#adminEmail');

  const loginPassword =
    document.querySelector('#adminPassword');

  const loginMessage =
    document.querySelector('#adminLoginMessage');

  document
    .querySelector('#backToAdminOptions')
    .addEventListener(
      'click',
      showAdminLoginOptions
    );

  loginForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      loginMessage.textContent = '';

      try {
        const { admin } = await loginAdmin(
          loginEmail.value.trim(),
          loginPassword.value
        );

        showAdminWelcome(admin);

      } catch (error) {
        loginMessage.textContent =
          error.message ||
          'Unable to log in.';
      }
    }
  );
}


// ================================
// FORGOT PASSWORD
// ================================

function showAdminForgotPasswordForm() {
  adminModalHeader.hidden = false;

  adminModalHeader.innerHTML = `
    <span class="eyebrow">
      ADMIN ACCESS
    </span>

    <h2 class="admin-modal__title">
      Reset Password
    </h2>

    <p class="admin-modal__description">
      Enter your administrator email and we’ll send you a password reset link.
    </p>
  `;

  adminAuthContent.innerHTML = `
    <form
      class="admin-login-form"
      id="adminForgotPasswordForm"
    >

      <label class="admin-login-form__field">
        <span>Email</span>

        <input
          type="email"
          id="adminResetEmail"
          autocomplete="email"
          required
        />
      </label>

      <p
        class="admin-login-form__message"
        id="adminResetMessage"
        aria-live="polite"
      ></p>

      <button
        class="btn btn-primary admin-login-form__submit"
        type="submit"
      >
        Send Reset Link
      </button>

      <button
        class="admin-auth-link"
        type="button"
        id="backToAdminOptions"
      >
        Back
      </button>

    </form>
  `;

  const resetForm =
    document.querySelector('#adminForgotPasswordForm');

  const resetEmail =
    document.querySelector('#adminResetEmail');

  const resetMessage =
    document.querySelector('#adminResetMessage');

  document
    .querySelector('#backToAdminOptions')
    .addEventListener(
      'click',
      showAdminLoginOptions
    );

  resetForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      resetMessage.textContent = '';

      try {
        await sendAdminPasswordReset(
          resetEmail.value.trim()
        );

        resetMessage.textContent =
          'Password reset link sent. Please check your email.';

      } catch (error) {
        resetMessage.textContent =
          error.message ||
          'Unable to send password reset link.';
      }
    }
  );
}

function showAdminSetNewPasswordForm() {
  openAdminModal();

  adminModalHeader.hidden = false;

  adminModalHeader.innerHTML = `
    <span class="eyebrow">
      ADMIN ACCESS
    </span>

    <h2 class="admin-modal__title">
      Set New Password
    </h2>

    <p class="admin-modal__description">
      Create a new password for your administrator account.
    </p>
  `;

  adminAuthContent.innerHTML = `
    <form
      class="admin-login-form"
      id="adminSetPasswordForm"
    >

      <label class="admin-login-form__field">
        <span>New Password</span>

        <input
          type="password"
          id="adminNewPassword"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Confirm New Password</span>

        <input
          type="password"
          id="adminConfirmNewPassword"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </label>

      <p
        class="admin-login-form__message"
        id="adminSetPasswordMessage"
        aria-live="polite"
      ></p>

      <button
        class="btn btn-primary admin-login-form__submit"
        type="submit"
      >
        Update Password
      </button>

    </form>
  `;

  const passwordForm =
    document.querySelector('#adminSetPasswordForm');

  const newPassword =
    document.querySelector('#adminNewPassword');

  const confirmPassword =
    document.querySelector('#adminConfirmNewPassword');

  const passwordMessage =
    document.querySelector('#adminSetPasswordMessage');

  passwordForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      passwordMessage.textContent = '';

      if (
        newPassword.value !==
        confirmPassword.value
      ) {
        passwordMessage.textContent =
          'Passwords do not match.';

        return;
      }

      if (newPassword.value.length < 8) {
        passwordMessage.textContent =
          'Password must contain at least 8 characters.';

        return;
      }

      try {
        await updateAdminPassword(
          newPassword.value
        );

        passwordMessage.textContent =
          'Password updated successfully.';

      } catch (error) {
        passwordMessage.textContent =
          error.message ||
          'Unable to update password.';
      }
    }
  );
}


// ================================
// CREATE ADMIN ACCOUNT
// ================================

function showAdminSignupForm() {
  adminModalHeader.hidden = false;

  adminModalHeader.innerHTML = `
    <span class="eyebrow">
      ADMIN ACCESS
    </span>

    <h2 class="admin-modal__title">
      Create Admin Account
    </h2>

    <p class="admin-modal__description">
      Create your administrator account to manage the LMSY Voting Center.
    </p>
  `;

  adminAuthContent.innerHTML = `
    <form
      class="admin-login-form"
      id="adminSignupForm"
    >

      <label class="admin-login-form__field">
        <span>Display Name</span>

        <input
          type="text"
          id="adminSignupName"
          autocomplete="name"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Email</span>

        <input
          type="email"
          id="adminSignupEmail"
          autocomplete="email"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Password</span>

        <input
          type="password"
          id="adminSignupPassword"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Confirm Password</span>

        <input
          type="password"
          id="adminSignupConfirmPassword"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </label>

      <label class="admin-login-form__field">
        <span>Role</span>

        <select
          id="adminSignupRole"
          required
        >
          <option value="">
            Select a role
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="content_manager">
            Content Manager
          </option>
        </select>
      </label>

      <p
        class="admin-login-form__message"
        id="adminSignupMessage"
        aria-live="polite"
      ></p>

      <button
        class="btn btn-primary admin-login-form__submit"
        type="submit"
      >
        Create Account
      </button>

      <button
        class="admin-auth-link"
        type="button"
        id="backToAdminOptions"
      >
        Back
      </button>

    </form>
  `;

  const signupForm =
    document.querySelector('#adminSignupForm');

  const signupName =
    document.querySelector('#adminSignupName');

  const signupEmail =
    document.querySelector('#adminSignupEmail');

  const signupPassword =
    document.querySelector('#adminSignupPassword');

  const signupConfirmPassword =
    document.querySelector(
      '#adminSignupConfirmPassword'
    );

  const signupRole =
    document.querySelector('#adminSignupRole');

  const signupMessage =
    document.querySelector('#adminSignupMessage');

  document
    .querySelector('#backToAdminOptions')
    .addEventListener(
      'click',
      showAdminLoginOptions
    );

  signupForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      signupMessage.textContent = '';

      if (
        signupPassword.value !==
        signupConfirmPassword.value
      ) {
        signupMessage.textContent =
          'Passwords do not match.';

        return;
      }

      if (signupPassword.value.length < 8) {
        signupMessage.textContent =
          'Password must contain at least 8 characters.';

        return;
      }

      try {
        const result =
          await createAdminAccount({
            accessPassword:
              verifiedAdminAccessPassword,

            email:
              signupEmail.value.trim(),

            password:
              signupPassword.value,

            displayName:
              signupName.value.trim(),

            role:
              signupRole.value,
          });

        signupMessage.textContent =
          result.message ||
          'Administrator account created successfully.';

        setTimeout(() => {
          showAdminLoginForm();
        }, 1200);

      } catch (error) {
        signupMessage.textContent =
          error.message ||
          'Unable to create administrator account.';
      }
    }
  );
}


// ================================
// ADMIN LOGIN OPTIONS
// ================================

function showAdminLoginOptions() {
  adminModalHeader.hidden = false;

  adminModalHeader.innerHTML = `
    <span class="eyebrow">
      ADMIN ACCESS
    </span>

    <h2 class="admin-modal__title">
      Welcome
    </h2>

    <p class="admin-modal__description">
      Sign in to continue, create your administrator account
      if this is your first time, or reset your password.
    </p>
  `;

  adminAuthContent.innerHTML = `
    <div class="admin-access-options">

      <button
        class="btn btn-primary"
        type="button"
        id="showAdminLogin"
      >
        Log In
      </button>

      <button
        class="btn btn-secondary"
        type="button"
        id="showAdminSignup"
      >
        Create Admin Account
      </button>

      <button
        class="admin-auth-link"
        type="button"
        id="showAdminForgotPassword"
      >
        Forgot your password?
      </button>

    </div>
  `;

  document
    .querySelector('#showAdminLogin')
    .addEventListener(
      'click',
      showAdminLoginForm
    );

  document
    .querySelector('#showAdminSignup')
    .addEventListener(
      'click',
      showAdminSignupForm
    );

  document
    .querySelector('#showAdminForgotPassword')
    .addEventListener(
      'click',
      showAdminForgotPasswordForm
    );
}


// ================================
// VERIFY ADMIN ACCESS
// ================================

adminAccessForm.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    adminAccessMessage.textContent = '';

    const accessPassword =
      adminAccessPassword.value;

    try {
      const result =
        await verifyAdminAccess(
          accessPassword
        );

      if (!result?.success) {
        throw new Error(
          result?.message ||
          'Unable to verify admin access.'
        );
      }

      verifiedAdminAccessPassword =
        accessPassword;

      showAdminLoginOptions();

    } catch (error) {
      adminAccessMessage.textContent =
        error.message ||
        'Incorrect admin access password.';
    }
  }
);

// ================================
// PUBLIC VOTING
// ================================

const voteFilters =
  document.querySelectorAll(
    '.vote-filter'
  );

const publicVotingGrid =
  document.querySelector(
    '#publicVotingGrid'
  );

const voteEmpty =
  document.querySelector(
    '.vote-empty'
  );

const activeVoteCount =
  document.querySelector(
    '#activeVoteCount'
  );

let publicVotingPlatforms = [];

let publicVotingTranslations = {};

let currentPublicVoteFilter =
  'all';

const VOTE_COUNTDOWN_DAY =
  86400000;

const VOTE_COUNTDOWN_HOUR =
  3600000;

const VOTE_COUNTDOWN_MINUTE =
  60000;

let voteCountdownNow =
  new Date();


// ================================
// GET TRANSLATED VOTING FIELD
// ================================

function getVotingTranslatedField(
  platform,
  fieldName
) {
  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      platform[fieldName] ??
      ''
    );
  }

  const platformTranslations =
    publicVotingTranslations[
      platform.id
    ];

  return (
    platformTranslations?.[
      currentLanguage
    ]?.[fieldName] ??
    platform[fieldName] ??
    ''
  );
}


// ================================
// VOTING TRANSLATIONS
// ================================

function getVotingText(key) {
  const votingTexts = {
    en: {
      eyebrow:
        'WHERE TO VOTE',

      description:
        'Find current voting opportunities for Lookmhee, Sonya and LMSY.',

      ceremony:
        'Awards & Ceremonies',

      poll:
        'Poll',

      advertising:
        'Advertising',

      urgent:
        'Urgent',

      high:
        'High',

      normal:
        'Normal',

      starts:
        'Starts',

      deadline:
        'Deadline',

      frequency:
        'Frequency',

      day:
        'day',

      days:
        'days',

      hour:
        'hour',

      hours:
        'hours',

      minute:
        'minute',

      minutes:
        'minutes',

      closesIn:
        'Closes in',

      opensIn:
        'Opens in',

      endedLabel:
        'Ended',

      voteNow:
        'Vote Now',

      viewTutorial:
        'View Tutorial',

      noVotes:
        'No active votes in this category.',

      checkAnother:
        'Check another category or come back later.',

      unableToLoad:
        'Unable to load active votings.',
    },

    es: {
      eyebrow:
        'DÓNDE VOTAR',

      description:
        'Encuentra las votaciones actuales para Lookmhee, Sonya y LMSY.',

      ceremony:
        'Premios y Ceremonias',

      poll:
        'Encuesta',

      advertising:
        'Publicidad',

      urgent:
        'Urgente',

      high:
        'Alta',

      normal:
        'Normal',

      starts:
        'Inicio',

      deadline:
        'Cierre',

      frequency:
        'Frecuencia',

      day:
        'día',

      days:
        'días',

      hour:
        'hora',

      hours:
        'horas',

      minute:
        'minuto',

      minutes:
        'minutos',

      closesIn:
        'Cierra en',

      opensIn:
        'Abre en',

      endedLabel:
        'Finalizada',

      voteNow:
        'Votar Ahora',

      viewTutorial:
        'Ver Tutorial',

      noVotes:
        'No hay votaciones activas en esta categoría.',

      checkAnother:
        'Revisa otra categoría o vuelve más tarde.',

      unableToLoad:
        'No se pudieron cargar las votaciones activas.',
    },

    th: {
      eyebrow:
        'โหวตได้ที่ไหน',

      description:
        'ค้นหาการโหวตปัจจุบันสำหรับ Lookmhee, Sonya และ LMSY',

      ceremony:
        'รางวัลและงานประกาศรางวัล',

      poll:
        'โพล',

      advertising:
        'โฆษณา',

      urgent:
        'เร่งด่วน',

      high:
        'สำคัญ',

      normal:
        'ปกติ',

      starts:
        'เริ่ม',

      deadline:
        'สิ้นสุด',

      frequency:
        'ความถี่',

      day:
        'วัน',

      days:
        'วัน',

      hour:
        'ชั่วโมง',

      hours:
        'ชั่วโมง',

      minute:
        'นาที',

      minutes:
        'นาที',

      closesIn:
        'ปิดใน',

      opensIn:
        'เริ่มใน',

      endedLabel:
        'ปิดแล้ว',

      voteNow:
        'โหวตตอนนี้',

      viewTutorial:
        'ดูวิธีโหวต',

      noVotes:
        'ไม่มีการโหวตที่กำลังดำเนินอยู่ในหมวดนี้',

      checkAnother:
        'ลองดูหมวดอื่นหรือกลับมาใหม่ภายหลัง',

      unableToLoad:
        'ไม่สามารถโหลดการโหวตที่กำลังดำเนินอยู่ได้',
    },

    zh: {
      eyebrow:
        '在哪里投票',

      description:
        '查看 Lookmhee、Sonya 和 LMSY 当前的投票活动。',

      ceremony:
        '奖项与典礼',

      poll:
        '投票',

      advertising:
        '广告',

      urgent:
        '紧急',

      high:
        '高',

      normal:
        '普通',

      starts:
        '开始时间',

      deadline:
        '截止时间',

      frequency:
        '频率',

      day:
        '天',

      days:
        '天',

      hour:
        '小时',

      hours:
        '小时',

      minute:
        '分钟',

      minutes:
        '分钟',

      closesIn:
        '距截止',

      opensIn:
        '距开始',

      endedLabel:
        '已结束',

      voteNow:
        '立即投票',

      viewTutorial:
        '查看教程',

      noVotes:
        '此分类目前没有进行中的投票。',

      checkAnother:
        '请查看其他分类或稍后再来。',

      unableToLoad:
        '无法加载当前投票。',
    },

    pt: {
      eyebrow:
        'ONDE VOTAR',

      description:
        'Encontre as votações atuais para Lookmhee, Sonya e LMSY.',

      ceremony:
        'Prêmios e Cerimônias',

      poll:
        'Enquete',

      advertising:
        'Publicidade',

      urgent:
        'Urgente',

      high:
        'Alta',

      normal:
        'Normal',

      starts:
        'Início',

      deadline:
        'Prazo Final',

      frequency:
        'Frequência',

      day:
        'dia',

      days:
        'dias',

      hour:
        'hora',

      hours:
        'horas',

      minute:
        'minuto',

      minutes:
        'minutos',

      closesIn:
        'Fecha em',

      opensIn:
        'Abre em',

      endedLabel:
        'Encerrada',

      voteNow:
        'Votar Agora',

      viewTutorial:
        'Ver Tutorial',

      noVotes:
        'Não há votações ativas nesta categoria.',

      checkAnother:
        'Confira outra categoria ou volte mais tarde.',

      unableToLoad:
        'Não foi possível carregar as votações ativas.',
    },

    ko: {
      eyebrow:
        '투표하는 곳',

      description:
        'Lookmhee, Sonya 및 LMSY의 현재 투표를 확인하세요.',

      ceremony:
        '시상식 및 어워드',

      poll:
        '투표',

      advertising:
        '광고',

      urgent:
        '긴급',

      high:
        '높음',

      normal:
        '보통',

      starts:
        '시작',

      deadline:
        '마감',

      frequency:
        '투표 주기',

      day:
        '일',

      days:
        '일',

      hour:
        '시간',

      hours:
        '시간',

      minute:
        '분',

      minutes:
        '분',

      closesIn:
        '마감까지',

      opensIn:
        '시작까지',

      endedLabel:
        '종료됨',

      voteNow:
        '지금 투표하기',

      viewTutorial:
        '투표 방법 보기',

      noVotes:
        '이 카테고리에는 현재 진행 중인 투표가 없습니다.',

      checkAnother:
        '다른 카테고리를 확인하거나 나중에 다시 방문해 주세요.',

      unableToLoad:
        '진행 중인 투표를 불러올 수 없습니다.',
    },
  };

  const language =
    votingTexts[currentLanguage]
      ? currentLanguage
      : DEFAULT_LANGUAGE;

  return (
    votingTexts[language]?.[key] ??
    votingTexts[
      DEFAULT_LANGUAGE
    ]?.[key] ??
    key
  );
}


// ================================
// VOTING LOCALE
// ================================

function getVotingLocale() {
  const locales = {
    en: 'en-US',
    es: 'es-ES',
    th: 'th-TH',
    zh: 'zh-CN',
    pt: 'pt-BR',
    ko: 'ko-KR',
  };

  return (
    locales[currentLanguage] ||
    locales[DEFAULT_LANGUAGE]
  );
}


// ================================
// VOTING LABELS
// ================================

function getVoteTypeLabel(
  voteType
) {
  const labels = {
    ceremony:
      getVotingText(
        'ceremony'
      ),

    poll:
      getVotingText(
        'poll'
      ),

    advertising:
      getVotingText(
        'advertising'
      ),
  };

  return (
    labels[voteType] ||
    voteType
  );
}


function getPriorityLabel(
  priority
) {
  const labels = {
    1:
      getVotingText(
        'urgent'
      ),

    2:
      getVotingText(
        'high'
      ),

    3:
      getVotingText(
        'normal'
      ),
  };

  return (
    labels[priority] ||
    getVotingText(
      'normal'
    )
  );
}


function getPriorityClass(
  priority
) {
  const classes = {
    1:
      'vote-card__priority--urgent',

    2:
      'vote-card__priority--high',

    3:
      'vote-card__priority--normal',
  };

  return (
    classes[priority] ||
    'vote-card__priority--normal'
  );
}


function getAccentClass(
  accent
) {
  if (
    accent === 'lookmhee'
  ) {
    return 'vote-card--yellow';
  }

  if (
    accent === 'sonya'
  ) {
    return 'vote-card--blue';
  }

  return 'vote-card--lmsy';
}


// ================================
// ARTIST CATEGORY PILLS
// ================================

function buildVoteCategoryPills(
  accent
) {
  const labels = {
    lookmhee: 'Lookmhee',
    sonya: 'Sonya',
    lmsy: 'LMSY',
  };

  const modifier =
    labels[accent]
      ? accent
      : 'lmsy';

  return `
    <div class="vote-card__categories">
      <span
        class="
          vote-card__category-pill
          vote-card__category-pill--${modifier}
        "
      >
        ${
          labels[accent] ||
          'LMSY'
        }
      </span>
    </div>
  `;
}


// ================================
// COUNTDOWN RING
// ================================

function getVoteStatus(
  platform
) {
  const startDate =
    platform.start_date
      ? new Date(
          platform.start_date
        )
      : null;

  const deadlineDate =
    platform.deadline
      ? new Date(
          platform.deadline
        )
      : null;

  if (
    deadlineDate &&
    voteCountdownNow >
      deadlineDate
  ) {
    return 'ended';
  }

  if (
    startDate &&
    voteCountdownNow <
      startDate
  ) {
    return 'upcoming';
  }

  return 'active';
}


function getVoteCountdownParts(
  ms
) {
  if (
    ms >=
    VOTE_COUNTDOWN_DAY
  ) {
    const value = Math.ceil(
      ms / VOTE_COUNTDOWN_DAY
    );

    return {
      value,
      unit: getVotingText(
        value === 1
          ? 'day'
          : 'days'
      ),
    };
  }

  if (
    ms >=
    VOTE_COUNTDOWN_HOUR
  ) {
    const value = Math.ceil(
      ms / VOTE_COUNTDOWN_HOUR
    );

    return {
      value,
      unit: getVotingText(
        value === 1
          ? 'hour'
          : 'hours'
      ),
    };
  }

  const value = Math.max(
    1,
    Math.ceil(
      ms /
        VOTE_COUNTDOWN_MINUTE
    )
  );

  return {
    value,
    unit: getVotingText(
      value === 1
        ? 'minute'
        : 'minutes'
    ),
  };
}


function getVoteRingColor(
  accent
) {
  const colors = {
    sonya:
      'var(--color-sonya)',

    lookmhee:
      'var(--color-lookmhee)',

    lmsy:
      '#6C54B0',
  };

  return (
    colors[accent] ||
    'var(--color-sonya)'
  );
}


function buildVoteCountdownRing(
  platform
) {
  const startDate =
    platform.start_date
      ? new Date(
          platform.start_date
        )
      : null;

  const deadlineDate =
    platform.deadline
      ? new Date(
          platform.deadline
        )
      : null;

  if (!deadlineDate) {
    return '';
  }

  const status =
    getVoteStatus(platform);

  const ringColor =
    getVoteRingColor(
      platform.accent
    );

  let progress = 0;
  let value = null;
  let unit = '';
  let statusLabel =
    getVotingText(
      'endedLabel'
    );
  let statusColor =
    'var(--color-text-light)';

  if (status === 'active') {
    const totalMs =
      startDate
        ? deadlineDate -
          startDate
        : null;

    progress = totalMs
      ? Math.min(
          1,
          Math.max(
            0,
            (voteCountdownNow -
              startDate) /
              totalMs
          )
        )
      : 0.5;

    const parts =
      getVoteCountdownParts(
        deadlineDate -
          voteCountdownNow
      );

    value = parts.value;
    unit = parts.unit;
    statusLabel =
      getVotingText(
        'closesIn'
      );
    statusColor = ringColor;

  } else if (
    status === 'upcoming'
  ) {
    progress = 0;

    const parts =
      getVoteCountdownParts(
        startDate -
          voteCountdownNow
      );

    value = parts.value;
    unit = parts.unit;
    statusLabel =
      getVotingText(
        'opensIn'
      );
    statusColor = ringColor;

  } else {
    progress = 1;
  }

  const percent = Math.round(
    progress * 100
  );

  const ringDisplayColor =
    status === 'ended'
      ? 'var(--color-text-light)'
      : ringColor;

  return `
    <div
      class="
        vote-card__countdown
      "
    >
      <div
        class="
          vote-card__ring
          ${
            status === 'ended'
              ? 'vote-card__ring--ended'
              : ''
          }
        "
        style="
          --vote-card-ring-progress: ${percent}%;
          --vote-card-ring-color: ${ringDisplayColor};
        "
      >
        <div
          class="
            vote-card__ring-inner
          "
        >
          ${
            value !== null
              ? `
                <span class="vote-card__ring-value">${value}</span>
                <span class="vote-card__ring-unit">${unit}</span>
              `
              : `<span class="vote-card__ring-ended-icon">&#10003;</span>`
          }
        </div>
      </div>
      <span
        class="
          vote-card__ring-status
        "
        style="color: ${statusColor};"
      >
        ${statusLabel}
      </span>
    </div>
  `;
}


// ================================
// VOTING DATES
// ================================

function formatVoteDate(
  dateValue
) {
  if (!dateValue) {
    return null;
  }

  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    getVotingLocale(),
    {
      month: 'short',
      day: 'numeric',
    }
  ).format(date);
}


// ================================
// STATIC VOTING TEXT
// ================================

function updatePublicVotingStaticText() {
  const voteSection =
    document.querySelector(
      '#vote'
    );

  if (!voteSection) {
    return;
  }

  const eyebrow =
    voteSection.querySelector(
      '.eyebrow'
    );

  const description =
    voteSection.querySelector(
      '.section-description'
    );

  const emptyTitle =
    voteEmpty?.querySelector(
      '.vote-empty__title'
    );

  const emptyDescription =
    voteEmpty?.querySelector(
      '.vote-empty__description'
    );

  if (eyebrow) {
    eyebrow.textContent =
      getVotingText(
        'eyebrow'
      );
  }

  if (description) {
    description.textContent =
      getVotingText(
        'description'
      );
  }

  if (emptyTitle) {
    emptyTitle.textContent =
      getVotingText(
        'noVotes'
      );
  }

  if (emptyDescription) {
    emptyDescription.textContent =
      getVotingText(
        'checkAnother'
      );
  }
}


// ================================
// RENDER PUBLIC VOTING
// ================================

function renderPublicVotingPlatforms(
  selectedFilter =
    currentPublicVoteFilter
) {
  if (!publicVotingGrid) {
    return;
  }

  currentPublicVoteFilter =
    selectedFilter;

  updatePublicVotingStaticText();

  const filteredPlatforms =
    selectedFilter === 'all'
      ? publicVotingPlatforms
      : publicVotingPlatforms.filter(
          (platform) =>
            platform.vote_type ===
            selectedFilter
        );

  if (voteEmpty) {
    voteEmpty.hidden =
      filteredPlatforms.length !==
      0;
  }

  if (
    filteredPlatforms.length ===
    0
  ) {
    publicVotingGrid.innerHTML =
      '';

    return;
  }

  publicVotingGrid.innerHTML =
    filteredPlatforms
      .map((platform) => {
        const startDate =
          formatVoteDate(
            platform.start_date
          );

        const deadline =
          formatVoteDate(
            platform.deadline
          );

        const translatedFrequency =
  getVotingTranslatedField(
    platform,
    'frequency'
  );

        const countdownRing =
          buildVoteCountdownRing(
            platform
          );

        const categoryPills =
          buildVoteCategoryPills(
            platform.accent
          );

        return `
          <article
            class="
              vote-card
              ${getAccentClass(
                platform.accent
              )}
            "
            data-vote-type="${
              platform.vote_type
            }"
            data-priority="${
              platform.priority
            }"
          >

            <div
              class="vote-card__top"
            >

              <span
                class="
                  vote-card__priority
                  ${getPriorityClass(
                    platform.priority
                  )}
                "
              >
                ${getPriorityLabel(
                  platform.priority
                )}
              </span>

            </div>


            <div
              class="
                vote-card__body
              "
            >

              ${countdownRing}

              <div
                class="
                  vote-card__content
                "
              >

                <div
                  class="
                    vote-card__title-row
                  "
                >

                  <h3
                    class="
                      vote-card__title
                    "
                  >
                    ${platform.event}
                  </h3>

                  <span
                    class="
                      vote-card__category
                    "
                  >
                    ${getVoteTypeLabel(
                      platform.vote_type
                    )}
                  </span>

                </div>

                <p
                  class="
                    vote-card__platform
                  "
                >
                  ${platform.platform}
                </p>

                ${categoryPills}


              <div
                class="
                  vote-card__details
                "
              >

                ${
                  startDate
                    ? `
                      <span>
                        ${getVotingText(
                          'starts'
                        )}: ${startDate}
                      </span>
                    `
                    : ''
                }

                ${
                  deadline
                    ? `
                      <span>
                        ${getVotingText(
                          'deadline'
                        )}: ${deadline}
                      </span>
                    `
                    : ''
                }

                ${
                  translatedFrequency
                    ? `
                      <span>
                        ${getVotingText(
                          'frequency'
                        )}: ${translatedFrequency}
                      </span>
                    `
                    : ''
                }

                </div>

              </div>

            </div>


            <div
              class="
                vote-card__actions
              "
            >

              <a
                class="
                  btn
                  btn-primary
                "
                href="${platform.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${getVotingText(
                  'voteNow'
                )}
              </a>

              ${
                platform.tutorial_url
                  ? `
                    <a
                      class="
                        btn
                        btn-secondary
                      "
                      href="${platform.tutorial_url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${getVotingText(
                        'viewTutorial'
                      )}
                    </a>
                  `
                  : ''
              }

            </div>

          </article>
        `;
      })
      .join('');
}


// ================================
// LOAD PUBLIC VOTING
// ================================

async function loadPublicVotingPlatforms() {
  if (!publicVotingGrid) {
    return;
  }

  try {
    publicVotingPlatforms =
      await getActiveVotingPlatforms();

    const translationRows =
      await getTranslationsByType(
        'voting'
      );

    publicVotingTranslations =
      translationRows.reduce(
        (result, row) => {
          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }

          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][row.language] = {};
          }

          result[
            row.content_id
          ][row.language][
            row.field_name
          ] =
            row.translated_text;

          return result;
        },
        {}
      );

    if (activeVoteCount) {
      activeVoteCount.textContent =
        publicVotingPlatforms.length;
    }

    renderPublicVotingPlatforms(
      currentPublicVoteFilter
    );

  } catch (error) {
    publicVotingGrid.innerHTML = `
      <p
        class="
          vote-empty__description
        "
      >
        ${getVotingText(
          'unableToLoad'
        )}
      </p>
    `;

    if (activeVoteCount) {
      activeVoteCount.textContent =
        '0';
    }

    console.error(
      'Unable to load public voting platforms:',
      error
    );
  }
}


// ================================
// VOTING FILTERS
// ================================

voteFilters.forEach(
  (filterButton) => {
    filterButton.addEventListener(
      'click',
      () => {
        const selectedFilter =
          filterButton.dataset.filter;

        currentPublicVoteFilter =
          selectedFilter;

        voteFilters.forEach(
          (button) => {
            button.classList.remove(
              'is-active'
            );
          }
        );

        filterButton.classList.add(
          'is-active'
        );

        renderPublicVotingPlatforms(
          selectedFilter
        );
      }
    );
  }
);


updatePublicVotingStaticText();

loadPublicVotingPlatforms();

setInterval(() => {
  voteCountdownNow =
    new Date();

  renderPublicVotingPlatforms(
    currentPublicVoteFilter
  );
}, VOTE_COUNTDOWN_MINUTE);
// ================================
// PUBLIC TUTORIALS
// ================================

const publicTutorialGrid =
  document.querySelector(
    '#publicTutorialGrid'
  );

const publicWatchGrid =
  document.querySelector(
    '#publicWatchGrid'
  );


// ================================
// TUTORIAL TYPE DETECTION
// ================================

function detectTutorialType(url) {
  if (!url) {
    return 'external';
  }

  try {
    const hostname =
      new URL(url)
        .hostname
        .toLowerCase();

    if (
      hostname.includes(
        'youtube.com'
      ) ||
      hostname.includes(
        'youtu.be'
      )
    ) {
      return 'youtube';
    }

    if (
      hostname.includes(
        'twitter.com'
      ) ||
      hostname.includes(
        'x.com'
      )
    ) {
      return 'x';
    }

    if (
      hostname.includes(
        'drive.google.com'
      )
    ) {
      return 'drive';
    }

    if (
      hostname.includes(
        'instagram.com'
      )
    ) {
      return 'instagram';
    }

    if (
      hostname.includes(
        'tiktok.com'
      )
    ) {
      return 'tiktok';
    }

    return 'external';

  } catch {
    return 'external';
  }
}


// ================================
// TUTORIAL TRANSLATIONS
// ================================

function getTutorialText(key) {
  const tutorialTexts = {
    en: {
      externalGuide:
        'External Guide',

      tutorial:
        'Tutorial',

      watchTutorial:
        'Watch Tutorial',

      viewThread:
        'View Thread',

      openGuide:
        'Open Guide',

      viewTutorial:
        'View Tutorial',

      openTutorial:
        'Open Tutorial',

      fromVoting:
        'From Voting',

      manual:
        'Manual',

      noTutorials:
        'No tutorials available yet.',

      unableToLoad:
        'Unable to load tutorials.',

      votingGuideFor:
        'Voting guide for',
    },

    es: {
      externalGuide:
        'Guía Externa',

      tutorial:
        'Tutorial',

      watchTutorial:
        'Ver Tutorial',

      viewThread:
        'Ver Hilo',

      openGuide:
        'Abrir Guía',

      viewTutorial:
        'Ver Tutorial',

      openTutorial:
        'Abrir Tutorial',

      fromVoting:
        'Desde Votaciones',

      manual:
        'Manual',

      noTutorials:
        'Aún no hay tutoriales disponibles.',

      unableToLoad:
        'No se pudieron cargar los tutoriales.',

      votingGuideFor:
        'Guía de votación para',
    },

    th: {
      externalGuide:
        'คู่มือภายนอก',

      tutorial:
        'วิธีโหวต',

      watchTutorial:
        'ดูวิธีโหวต',

      viewThread:
        'ดูกระทู้',

      openGuide:
        'เปิดคู่มือ',

      viewTutorial:
        'ดูวิธีโหวต',

      openTutorial:
        'เปิดวิธีโหวต',

      fromVoting:
        'จากหน้าการโหวต',

      manual:
        'เพิ่มด้วยตนเอง',

      noTutorials:
        'ยังไม่มีวิธีโหวตในขณะนี้',

      unableToLoad:
        'ไม่สามารถโหลดวิธีโหวตได้',

      votingGuideFor:
        'คู่มือการโหวตสำหรับ',
    },

    zh: {
      externalGuide:
        '外部指南',

      tutorial:
        '教程',

      watchTutorial:
        '观看教程',

      viewThread:
        '查看帖子',

      openGuide:
        '打开指南',

      viewTutorial:
        '查看教程',

      openTutorial:
        '打开教程',

      fromVoting:
        '来自投票',

      manual:
        '手动添加',

      noTutorials:
        '暂无可用教程。',

      unableToLoad:
        '无法加载教程。',

      votingGuideFor:
        '投票指南：',
    },

    pt: {
      externalGuide:
        'Guia Externo',

      tutorial:
        'Tutorial',

      watchTutorial:
        'Assistir Tutorial',

      viewThread:
        'Ver Thread',

      openGuide:
        'Abrir Guia',

      viewTutorial:
        'Ver Tutorial',

      openTutorial:
        'Abrir Tutorial',

      fromVoting:
        'Das Votações',

      manual:
        'Manual',

      noTutorials:
        'Ainda não há tutoriais disponíveis.',

      unableToLoad:
        'Não foi possível carregar os tutoriais.',

      votingGuideFor:
        'Guia de votação para',
    },

    ko: {
      externalGuide:
        '외부 가이드',

      tutorial:
        '투표 방법',

      watchTutorial:
        '투표 방법 보기',

      viewThread:
        '게시물 보기',

      openGuide:
        '가이드 열기',

      viewTutorial:
        '투표 방법 보기',

      openTutorial:
        '투표 방법 열기',

      fromVoting:
        '투표에서 가져옴',

      manual:
        '직접 추가',

      noTutorials:
        '아직 등록된 투표 방법이 없습니다.',

      unableToLoad:
        '투표 방법을 불러올 수 없습니다.',

      votingGuideFor:
        '투표 가이드:',
    },
  };

  const language =
    tutorialTexts[currentLanguage]
      ? currentLanguage
      : DEFAULT_LANGUAGE;

  return (
    tutorialTexts[language]?.[key] ??
    tutorialTexts[
      DEFAULT_LANGUAGE
    ]?.[key] ??
    key
  );
}


// ================================
// TUTORIAL LABELS
// ================================

function getTutorialTypeLabel(type) {
  const labels = {
    youtube:
      'YouTube',

    x:
      'X / Twitter',

    drive:
      'Google Drive',

    instagram:
      'Instagram',

    tiktok:
      'TikTok',

    external:
      getTutorialText(
        'externalGuide'
      ),
  };

  return (
    labels[type] ||
    getTutorialText('tutorial')
  );
}


function getTutorialButtonLabel(type) {
  const labels = {
    youtube:
      getTutorialText(
        'watchTutorial'
      ),

    x:
      getTutorialText(
        'viewThread'
      ),

    drive:
      getTutorialText(
        'openGuide'
      ),

    instagram:
      getTutorialText(
        'viewTutorial'
      ),

    tiktok:
      getTutorialText(
        'watchTutorial'
      ),

    external:
      getTutorialText(
        'openGuide'
      ),
  };

  return (
    labels[type] ||
    getTutorialText(
      'openTutorial'
    )
  );
}


// ================================
// YOUTUBE EMBED
// ================================

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl =
      new URL(url);

    if (
      parsedUrl.hostname.includes(
        'youtu.be'
      )
    ) {
      const videoId =
        parsedUrl.pathname.replace(
          '/',
          ''
        );

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (
      parsedUrl.hostname.includes(
        'youtube.com'
      )
    ) {
      if (
        parsedUrl.pathname.startsWith(
          '/embed/'
        )
      ) {
        return url;
      }

      const videoId =
        parsedUrl.searchParams.get(
          'v'
        );

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    return null;

  } catch {
    return null;
  }
}


// ================================
// RENDER PUBLIC TUTORIALS
// ================================

function renderPublicTutorials(
  tutorials
) {
  if (!publicTutorialGrid) {
    return;
  }

  if (tutorials.length === 0) {
    publicTutorialGrid.innerHTML = `
      <p class="vote-empty__description">
        ${getTutorialText(
          'noTutorials'
        )}
      </p>
    `;

    return;
  }

  publicTutorialGrid.innerHTML =
    tutorials
      .map((tutorial) => {
        const youtubeEmbedUrl =
          tutorial.tutorial_type ===
          'youtube'
            ? getYouTubeEmbedUrl(
                tutorial.tutorial_url
              )
            : null;

        const tutorialTypeLabel =
          getTutorialTypeLabel(
            tutorial.tutorial_type
          );

        const sourceLabel =
          tutorial.source ===
          'voting'
            ? getTutorialText(
                'fromVoting'
              )
            : getTutorialText(
                'manual'
              );

        const buttonLabel =
          getTutorialButtonLabel(
            tutorial.tutorial_type
          );

        return `
          <article
            class="tutorial-card"
          >

            ${
              youtubeEmbedUrl
                ? `
                  <div
                    class="tutorial-card__video"
                  >

                    <iframe
                      src="${youtubeEmbedUrl}"
                      title="${tutorial.title}"
                      loading="lazy"
                      allowfullscreen
                    ></iframe>

                  </div>
                `
                : `
                  <div
                    class="
                      tutorial-card__resource
                      tutorial-card__resource--${tutorial.tutorial_type}
                    "
                  >

                    <span
                      class="
                        tutorial-card__resource-icon
                      "
                    >
                      ${
                        tutorial.tutorial_type ===
                        'x'
                          ? '𝕏'
                          : tutorial.tutorial_type ===
                              'drive'
                            ? '↗'
                            : tutorial.tutorial_type ===
                                'instagram'
                              ? '◎'
                              : tutorial.tutorial_type ===
                                  'tiktok'
                                ? '♪'
                                : '↗'
                      }
                    </span>

                    <span
                      class="
                        tutorial-card__resource-label
                      "
                    >
                      ${tutorialTypeLabel}
                    </span>

                  </div>
                `
            }


            <div
              class="tutorial-card__content"
            >

              <span
                class="
                  admin-voting-item__platform
                "
              >
                ${tutorialTypeLabel}
              </span>

              <span
                class="
                  admin-voting-item__meta
                "
              >
                ${sourceLabel}
              </span>


              <h3
                class="
                  tutorial-card__title
                "
              >
                ${tutorial.title}
              </h3>


              ${
                tutorial.description
                  ? `
                    <p
                      class="
                        tutorial-card__description
                      "
                    >
                      ${tutorial.description}
                    </p>
                  `
                  : ''
              }


              ${
                tutorial.tutorial_url
                  ? `
                    <a
                      class="
                        btn
                        btn-secondary
                      "
                      href="${tutorial.tutorial_url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${buttonLabel}
                    </a>
                  `
                  : ''
              }

            </div>

          </article>
        `;
      })
      .join('');
}


// ================================
// LOAD PUBLIC TUTORIALS
// ================================

async function loadPublicTutorials() {
  if (!publicTutorialGrid) {
    return;
  }

  try {
    const tutorials =
      await getActiveTutorials();

    const votingPlatforms =
      await getActiveVotingPlatforms();

    const translationRows =
      await getTranslationsByType(
        'tutorial'
      );


    // ================================
    // ORGANIZE TUTORIAL TRANSLATIONS
    // ================================

    const tutorialTranslations =
      translationRows.reduce(
        (
          translations,
          row
        ) => {

          const {
            content_id,
            language,
            field_name,
            translated_text,
          } = row;


          if (
            !translations[
              content_id
            ]
          ) {
            translations[
              content_id
            ] = {};
          }


          if (
            !translations[
              content_id
            ][language]
          ) {
            translations[
              content_id
            ][language] = {};
          }


          translations[
            content_id
          ][language][
            field_name
          ] =
            translated_text;


          return translations;
        },
        {}
      );


    // ================================
    // MANUAL TUTORIALS
    // ================================

    const manualTutorials =
      tutorials.map(
        (tutorial) => {

          const translations =
            tutorialTranslations[
              tutorial.id
            ]?.[
              currentLanguage
            ];


          return {
            ...tutorial,

            title:
              currentLanguage ===
              DEFAULT_LANGUAGE
                ? tutorial.title
                : (
                    translations
                      ?.title ??
                    tutorial.title
                  ),

            description:
              currentLanguage ===
              DEFAULT_LANGUAGE
                ? tutorial.description
                : (
                    translations
                      ?.description ??
                    tutorial.description
                  ),

            source:
              tutorial.source ||
              'manual',
          };
        }
      );


    // ================================
    // TUTORIALS FROM VOTING
    // ================================

    const votingTutorials =
      votingPlatforms
        .filter(
          (platform) =>
            platform.tutorial_url
        )
        .map((platform) => {
          return {
            id:
              `voting-${platform.id}`,

            title:
              platform.event,

            description:
              `${getTutorialText(
                'votingGuideFor'
              )} ${platform.platform}.`,

            tutorial_url:
              platform.tutorial_url,

            tutorial_type:
              detectTutorialType(
                platform.tutorial_url
              ),

            sort_order:
              platform.sort_order ??
              0,

            source:
              'voting',
          };
        });


    // ================================
    // COMBINE TUTORIALS
    // ================================

    const combinedTutorials = [
      ...manualTutorials,
      ...votingTutorials,
    ];


    combinedTutorials.sort(
      (a, b) =>
        (a.sort_order ?? 0) -
        (b.sort_order ?? 0)
    );


    // ================================
    // RENDER
    // ================================

    renderPublicTutorials(
      combinedTutorials
    );


  } catch (error) {
    publicTutorialGrid.innerHTML = `
      <p class="vote-empty__description">
        ${getTutorialText(
          'unableToLoad'
        )}
      </p>
    `;


    console.error(
      'Unable to load public tutorials:',
      error
    );
  }
}


loadPublicTutorials();


// ================================
// PUBLIC WATCH & RESULTS
// ================================

let publicWatchTranslations = {};

// ================================
// GET TRANSLATED WATCH FIELD
// ================================

function getWatchTranslatedField(
  item,
  fieldName
) {
  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      item[fieldName] ??
      ''
    );
  }


  const itemTranslations =
    publicWatchTranslations[
      item.id
    ];


  return (
    itemTranslations?.[
      currentLanguage
    ]?.[fieldName] ??
    item[fieldName] ??
    ''
  );
}


// ================================
// WATCH FIXED TEXT
// ================================

function getWatchText(key) {
  const watchTexts = {
    en: {
      liveStream:
        'Live Stream',

      results:
        'Results',

      thailandTime:
        'Thailand Time',

      yourTime:
        'Your Time',

      watchLive:
        'Watch Live',

      viewResults:
        'View Results',

      unableToLoad:
        'Unable to load Watch & Results.',
    },

    es: {
      liveStream:
        'Transmisión en Vivo',

      results:
        'Resultados',

      thailandTime:
        'Hora de Tailandia',

      yourTime:
        'Tu Hora',

      watchLive:
        'Ver en Vivo',

      viewResults:
        'Ver Resultados',

      unableToLoad:
        'No se pudo cargar Ver y Resultados.',
    },

    th: {
      liveStream:
        'ถ่ายทอดสด',

      results:
        'ผลลัพธ์',

      thailandTime:
        'เวลาไทย',

      yourTime:
        'เวลาของคุณ',

      watchLive:
        'รับชมสด',

      viewResults:
        'ดูผลลัพธ์',

      unableToLoad:
        'ไม่สามารถโหลดการรับชมและผลลัพธ์ได้',
    },

    zh: {
      liveStream:
        '直播',

      results:
        '结果',

      thailandTime:
        '泰国时间',

      yourTime:
        '你的时间',

      watchLive:
        '观看直播',

      viewResults:
        '查看结果',

      unableToLoad:
        '无法加载观看与结果。',
    },

    pt: {
      liveStream:
        'Transmissão ao Vivo',

      results:
        'Resultados',

      thailandTime:
        'Horário da Tailândia',

      yourTime:
        'Seu Horário',

      watchLive:
        'Assistir ao Vivo',

      viewResults:
        'Ver Resultados',

      unableToLoad:
        'Não foi possível carregar Assistir e Resultados.',
    },

    ko: {
      liveStream:
        '라이브 스트리밍',

      results:
        '결과',

      thailandTime:
        '태국 시간',

      yourTime:
        '현지 시간',

      watchLive:
        '라이브 보기',

      viewResults:
        '결과 보기',

      unableToLoad:
        '시청 및 결과를 불러올 수 없습니다.',
    },
  };


  const language =
    watchTexts[currentLanguage]
      ? currentLanguage
      : DEFAULT_LANGUAGE;


  return (
    watchTexts[language]?.[key] ??
    watchTexts[
      DEFAULT_LANGUAGE
    ]?.[key] ??
    key
  );
}


// ================================
// WATCH LOCALE
// ================================

function getWatchLocale() {
  const locales = {
    en: 'en-US',
    es: 'es-ES',
    th: 'th-TH',
    zh: 'zh-CN',
    pt: 'pt-BR',
    ko: 'ko-KR',
  };


  return (
    locales[currentLanguage] ||
    locales[DEFAULT_LANGUAGE]
  );
}


// ================================
// WATCH THUMBNAIL
// ================================

function getWatchThumbnailUrl(
  thumbnailUrl
) {
  if (!thumbnailUrl) {
    return null;
  }


  if (
    !thumbnailUrl.includes(
      'youtube.com'
    ) &&
    !thumbnailUrl.includes(
      'youtu.be'
    )
  ) {
    return thumbnailUrl;
  }


  try {
    const url =
      new URL(
        thumbnailUrl
      );


    let videoId =
      null;


    if (
      url.hostname.includes(
        'youtu.be'
      )
    ) {
      videoId =
        url.pathname
          .split('/')
          .filter(
            Boolean
          )[0] ||
        null;
    }


    if (
      url.hostname.includes(
        'youtube.com'
      )
    ) {
      videoId =
        url.searchParams.get(
          'v'
        );


      if (
        !videoId &&
        (
          url.pathname.startsWith(
            '/shorts/'
          ) ||
          url.pathname.startsWith(
            '/embed/'
          )
        )
      ) {
        videoId =
          url.pathname
            .split('/')
            .filter(
              Boolean
            )[1] ||
          null;
      }
    }


    if (!videoId) {
      return null;
    }


    return (
      `https://img.youtube.com/vi/` +
      `${videoId}/hqdefault.jpg`
    );


  } catch {
    return null;
  }
}


// ================================
// FORMAT WATCH DATE
// ================================

function formatWatchDate(
  scheduledDate,
  timeZone = undefined
) {
  if (!scheduledDate) {
    return null;
  }


  const locale =
    getWatchLocale();


  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };


  if (timeZone) {
    options.timeZone =
      timeZone;

    options.timeZoneName =
      'short';
  }


  return scheduledDate.toLocaleString(
    locale,
    options
  );
}


// ================================
// LOAD PUBLIC WATCH & RESULTS
// ================================

async function loadPublicWatchLinks() {
  const watchSection =
    document.querySelector(
      '#watch'
    );


  const watchNavLink =
    document.querySelector(
      '.navbar__links a[href="#watch"]'
    );


  if (!publicWatchGrid) {
    return;
  }


  try {
    const watchLinks =
      await getActiveWatchLinks();


    // ================================
    // LOAD WATCH TRANSLATIONS
    // ================================

    const translationRows =
      await getTranslationsByType(
        'watch'
      );


    publicWatchTranslations =
      translationRows.reduce(
        (
          result,
          row
        ) => {

          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }


          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][
              row.language
            ] = {};
          }


          result[
            row.content_id
          ][
            row.language
          ][
            row.field_name
          ] =
            row.translated_text;


          return result;
        },
        {}
      );


    // ================================
    // HIDE WHEN EMPTY
    // ================================

    if (
      watchLinks.length === 0
    ) {
      publicWatchGrid.innerHTML =
        '';


      if (watchSection) {
        watchSection.hidden =
          true;
      }


      if (watchNavLink) {
        watchNavLink.hidden =
          true;
      }


      return;
    }


    // ================================
    // SHOW SECTION
    // ================================

    if (watchSection) {
      watchSection.hidden =
        false;
    }


    if (watchNavLink) {
      watchNavLink.hidden =
        false;
    }


    // ================================
    // RENDER WATCH CARDS
    // ================================

    publicWatchGrid.innerHTML =
      watchLinks
        .map(
          (item) => {

            const isLive =
              item.type ===
              'live';


            const thumbnailUrl =
              getWatchThumbnailUrl(
                item.thumbnail_url
              );


            const scheduledDate =
              item.scheduled_at
                ? new Date(
                    item.scheduled_at
                  )
                : null;


            const thailandTime =
              scheduledDate
                ? formatWatchDate(
                    scheduledDate,
                    'Asia/Bangkok'
                  )
                : null;


            const localTime =
              scheduledDate
                ? formatWatchDate(
                    scheduledDate
                  )
                : null;


            const typeLabel =
              isLive
                ? getWatchText(
                    'liveStream'
                  )
                : getWatchText(
                    'results'
                  );


            const defaultButtonLabel =
              isLive
                ? getWatchText(
                    'watchLive'
                  )
                : getWatchText(
                    'viewResults'
                  );


            // ================================
            // DYNAMIC TRANSLATED FIELDS
            // ================================

            const translatedDescription =
              getWatchTranslatedField(
                item,
                'description'
              );


            const translatedButtonLabel =
              getWatchTranslatedField(
                item,
                'button_label'
              );


            return `
              <article
                class="watch-card"
              >

                ${
                  thumbnailUrl
                    ? `
                      <div
                        class="watch-card__media"
                      >

                        <img
                          src="${thumbnailUrl}"
                          alt="${item.title}"
                          loading="lazy"
                        />

                      </div>
                    `
                    : `
                      <div
                        class="
                          watch-card__placeholder
                        "
                      >

                        <span
                          class="
                            watch-card__placeholder-icon
                          "
                        >
                          ${
                            isLive
                              ? '▶'
                              : '★'
                          }
                        </span>

                        <span
                          class="
                            watch-card__placeholder-label
                          "
                        >
                          ${typeLabel}
                        </span>

                      </div>
                    `
                }


                <div
                  class="watch-card__content"
                >

                  <span
                    class="watch-card__type"
                  >
                    ${typeLabel}
                  </span>


                  <h3
                    class="watch-card__title"
                  >
                    ${item.title}
                  </h3>


                  ${
                    item.platform
                      ? `
                        <span
                          class="
                            watch-card__platform
                          "
                        >
                          ${item.platform}
                        </span>
                      `
                      : ''
                  }


                  ${
                    translatedDescription
                      ? `
                        <p
                          class="
                            watch-card__description
                          "
                        >
                          ${translatedDescription}
                        </p>
                      `
                      : ''
                  }


                  ${
                    thailandTime
                      ? `
                        <div
                          class="watch-card__time"
                        >

                          <div
                            class="
                              watch-card__time-row
                            "
                          >

                            <span
                              class="
                                watch-card__time-label
                              "
                            >
                              ${getWatchText(
                                'thailandTime'
                              )}
                            </span>

                            <span
                              class="
                                watch-card__time-value
                              "
                            >
                              ${thailandTime}
                            </span>

                          </div>


                          <div
                            class="
                              watch-card__time-row
                            "
                          >

                            <span
                              class="
                                watch-card__time-label
                              "
                            >
                              ${getWatchText(
                                'yourTime'
                              )}
                            </span>

                            <span
                              class="
                                watch-card__time-value
                              "
                            >
                              ${localTime}
                            </span>

                          </div>

                        </div>
                      `
                      : ''
                  }


                  <a
                    class="
                      btn
                      ${
                        isLive
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }
                    "
                    href="${item.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${
                      translatedButtonLabel ||
                      defaultButtonLabel
                    }
                  </a>

                </div>

              </article>
            `;
          }
        )
        .join('');


  } catch (error) {
    publicWatchGrid.innerHTML = `
      <p
        class="
          vote-empty__description
        "
      >
        ${getWatchText(
          'unableToLoad'
        )}
      </p>
    `;


    console.error(
      'Unable to load public Watch & Results:',
      error
    );
  }
}

// ================================
// PUBLIC ARTISTS
// ================================

const publicArtistContent =
  document.querySelector(
    '#publicArtistContent'
  );

const artistTabs =
  document.querySelectorAll(
    '.artist-tab'
  );

let publicArtists = [];

let publicArtistTranslations = {};


// ================================
// GET TRANSLATED ARTIST FIELD
// ================================

function getArtistTranslatedField(
  artist,
  fieldName
) {
  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      artist[fieldName] ??
      ''
    );
  }

  const artistTranslations =
    publicArtistTranslations[
      artist.id
    ];

  return (
    artistTranslations?.[
      currentLanguage
    ]?.[fieldName] ??
    artist[fieldName] ??
    ''
  );
}


// ================================
// ARTIST TRANSLATIONS
// ================================

function getArtistText(key) {
  const artistTexts = {
    en: {
      eyebrow:
        'ARTISTS',

      title:
        'Lookmhee, Sonya & LMSY',

      description:
        'Follow their official social media accounts and latest updates.',

      latestUpdates:
        'Latest Updates',

      loading:
        'Loading artists...',

      noArtists:
        'No artist information available yet.',

      unableToLoad:
        'Unable to load artists.',
    },

    es: {
      eyebrow:
        'ARTISTAS',

      title:
        'Lookmhee, Sonya y LMSY',

      description:
        'Sigue sus cuentas oficiales en redes sociales y sus últimas actualizaciones.',

      latestUpdates:
        'Últimas Actualizaciones',

      loading:
        'Cargando artistas...',

      noArtists:
        'Aún no hay información de artistas disponible.',

      unableToLoad:
        'No se pudieron cargar los artistas.',
    },

    th: {
      eyebrow:
        'ศิลปิน',

      title:
        'Lookmhee, Sonya และ LMSY',

      description:
        'ติดตามบัญชีโซเชียลมีเดียอย่างเป็นทางการและอัปเดตล่าสุดของพวกเธอ',

      latestUpdates:
        'อัปเดตล่าสุด',

      loading:
        'กำลังโหลดข้อมูลศิลปิน...',

      noArtists:
        'ยังไม่มีข้อมูลศิลปินในขณะนี้',

      unableToLoad:
        'ไม่สามารถโหลดข้อมูลศิลปินได้',
    },

    zh: {
      eyebrow:
        '艺人',

      title:
        'Lookmhee、Sonya 与 LMSY',

      description:
        '关注她们的官方社交媒体账号和最新动态。',

      latestUpdates:
        '最新动态',

      loading:
        '正在加载艺人信息...',

      noArtists:
        '暂无艺人信息。',

      unableToLoad:
        '无法加载艺人信息。',
    },

    pt: {
      eyebrow:
        'ARTISTAS',

      title:
        'Lookmhee, Sonya e LMSY',

      description:
        'Siga suas contas oficiais nas redes sociais e acompanhe as últimas atualizações.',

      latestUpdates:
        'Últimas Atualizações',

      loading:
        'Carregando artistas...',

      noArtists:
        'Ainda não há informações sobre artistas disponíveis.',

      unableToLoad:
        'Não foi possível carregar os artistas.',
    },

    ko: {
      eyebrow:
        '아티스트',

      title:
        'Lookmhee, Sonya & LMSY',

      description:
        '공식 소셜 미디어 계정과 최신 소식을 확인하세요.',

      latestUpdates:
        '최신 소식',

      loading:
        '아티스트 정보를 불러오는 중...',

      noArtists:
        '아직 등록된 아티스트 정보가 없습니다.',

      unableToLoad:
        '아티스트 정보를 불러올 수 없습니다.',
    },
  };

  const language =
    artistTexts[currentLanguage]
      ? currentLanguage
      : DEFAULT_LANGUAGE;

  return (
    artistTexts[language]?.[key] ??
    artistTexts[
      DEFAULT_LANGUAGE
    ]?.[key] ??
    key
  );
}


// ================================
// STATIC ARTIST TEXT
// ================================

function updatePublicArtistStaticText() {
  const artistsSubtitle =
    document.querySelector(
      '#artistsSubtitle'
    );

  const artistsTitle =
    document.querySelector(
      '#artistsTitle'
    );

  const artistsBody =
    document.querySelector(
      '#artistsBody'
    );


  if (artistsSubtitle) {
    artistsSubtitle.textContent =
      getArtistText(
        'eyebrow'
      );
  }


  if (artistsTitle) {
    artistsTitle.textContent =
      getArtistText(
        'title'
      );
  }


  if (artistsBody) {
    artistsBody.textContent =
      getArtistText(
        'description'
      );
  }
}


// ================================
// RENDER PUBLIC ARTISTS
// ================================

function renderPublicArtists(
  artists
) {
  if (!publicArtistContent) {
    return;
  }


  updatePublicArtistStaticText();


  if (artists.length === 0) {
    publicArtistContent.innerHTML = `
      <p class="vote-empty__description">
        ${getArtistText(
          'noArtists'
        )}
      </p>
    `;

    return;
  }


  publicArtistContent.innerHTML =
    artists
      .map(
        (artist, index) => {
          const isFirstArtist =
            index === 0;

          const translatedDescription =
            getArtistTranslatedField(
              artist,
              'description'
            );


          return `
            <article
              class="
                artist-panel
                ${
                  isFirstArtist
                    ? 'is-active'
                    : ''
                }
              "
              data-artist-panel="${
                artist.slug
              }"
              ${
                isFirstArtist
                  ? ''
                  : 'hidden'
              }
            >

              <div
                class="
                  artist-panel__image
                "
              >

                ${
                  artist.image_url
                    ? `
                      <img
                        src="${artist.image_url}"
                        alt="${artist.name}"
                      />
                    `
                    : `
                      <span>
                        ${artist.name}
                      </span>
                    `
                }

              </div>


              <div
                class="
                  artist-panel__info
                "
              >

                <span
                  class="
                    artist-panel__label
                  "
                >
                  ${artist.slug.toUpperCase()}
                </span>


                <h3
                  class="
                    artist-panel__name
                  "
                >
                  ${artist.name}
                </h3>


                ${
                  translatedDescription
                    ? `
                      <p
                        class="
                          artist-panel__description
                        "
                      >
                        ${translatedDescription}
                      </p>
                    `
                    : ''
                }


                <div
                  class="
                    artist-panel__links
                  "
                >

                  ${
                    artist.instagram_url
                      ? `
                        <a
                          class="
                            btn
                            btn-secondary
                          "
                          href="${artist.instagram_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram
                        </a>
                      `
                      : ''
                  }


                  ${
                    artist.x_url
                      ? `
                        <a
                          class="
                            btn
                            btn-secondary
                          "
                          href="${artist.x_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          X / Twitter
                        </a>
                      `
                      : ''
                  }


                  ${
                    artist.tiktok_url
                      ? `
                        <a
                          class="
                            btn
                            btn-secondary
                          "
                          href="${artist.tiktok_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TikTok
                        </a>
                      `
                      : ''
                  }


                  ${
                    artist.updates_url
                      ? `
                        <a
                          class="
                            btn
                            btn-secondary
                          "
                          href="${artist.updates_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ${getArtistText(
                            'latestUpdates'
                          )}
                        </a>
                      `
                      : ''
                  }

                </div>

              </div>

            </article>
          `;
        }
      )
      .join('');
}


// ================================
// ACTIVATE ARTIST TAB
// ================================

function activateArtistTab(
  selectedArtist
) {
  const artistPanels =
    document.querySelectorAll(
      '.artist-panel'
    );


  artistTabs.forEach(
    (tab) => {
      const isSelected =
        tab.dataset.artist ===
        selectedArtist;

      tab.classList.toggle(
        'is-active',
        isSelected
      );
    }
  );


  artistPanels.forEach(
    (panel) => {
      const isSelected =
        panel.dataset.artistPanel ===
        selectedArtist;

      panel.hidden =
        !isSelected;

      panel.classList.toggle(
        'is-active',
        isSelected
      );
    }
  );
}


// ================================
// ARTIST TAB EVENTS
// ================================

artistTabs.forEach(
  (tab) => {
    tab.addEventListener(
      'click',
      () => {
        activateArtistTab(
          tab.dataset.artist
        );
      }
    );
  }
);


// ================================
// LOAD PUBLIC ARTISTS
// ================================

async function loadPublicArtists() {
  if (!publicArtistContent) {
    return;
  }


  updatePublicArtistStaticText();


  publicArtistContent.innerHTML = `
    <p class="vote-empty__description">
      ${getArtistText(
        'loading'
      )}
    </p>
  `;


  try {
    publicArtists =
      await getActiveArtists();


    const translationRows =
      await getTranslationsByType(
        'artist'
      );


    publicArtistTranslations =
      translationRows.reduce(
        (result, row) => {

          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }


          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][row.language] = {};
          }


          result[
            row.content_id
          ][row.language][
            row.field_name
          ] =
            row.translated_text;


          return result;

        },
        {}
      );


    renderPublicArtists(
      publicArtists
    );


    const preferredArtist =
      publicArtists.find(
        (artist) =>
          artist.slug ===
          'lookmhee'
      ) ||
      publicArtists[0];


    if (preferredArtist) {
      activateArtistTab(
        preferredArtist.slug
      );
    }


  } catch (error) {
    publicArtistContent.innerHTML = `
      <p class="vote-empty__description">
        ${getArtistText(
          'unableToLoad'
        )}
      </p>
    `;


    console.error(
      'Unable to load public artists:',
      error
    );
  }
}


updatePublicArtistStaticText();

loadPublicArtists();

// ================================
// PUBLIC SITE CONTENT
// ================================

const siteContentMap = {
  hero_main: {
    subtitle: '#heroSubtitle',
    title: '#heroTitle',
    body: '#heroBody',
    button: '#heroPrimaryButton',
    secondaryButton: '#heroSecondaryButton',
  },

  tutorials_intro: {
    subtitle: '#tutorialsSubtitle',
    title: '#tutorialsTitle',
    body: '#tutorialsBody',
  },

  artists_intro: {
    subtitle: '#artistsSubtitle',
    title: '#artistsTitle',
    body: '#artistsBody',
  },

  watch_intro: {
    subtitle: '#watchSubtitle',
    title: '#watchTitle',
    body: '#watchBody',
  },

  support_intro: {
    subtitle: '#supportSubtitle',
    title: '#supportTitle',
    body: '#supportBody',
  },
};


// ================================
// SITE CONTENT TRANSLATIONS
// ================================

let publicSiteContentTranslations = {};

function getSiteContentTranslatedField(
  content,
  fieldName
) {
  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      content[fieldName] ??
      ''
    );
  }

  const contentTranslations =
    publicSiteContentTranslations[
      content.id
    ];

  return (
    contentTranslations?.[
      currentLanguage
    ]?.[fieldName] ??
    content[fieldName] ??
    ''
  );
}


// ================================
// SAVE ORIGINAL BASE CONTENT
// ================================

const baseSiteContent = {};

Object.entries(siteContentMap).forEach(
  ([contentKey, config]) => {

    baseSiteContent[contentKey] = {};


    // SUBTITLE

    if (config.subtitle) {
      const element =
        document.querySelector(
          config.subtitle
        );

      if (element) {
        baseSiteContent[
          contentKey
        ].subtitle =
          element.textContent.trim();
      }
    }


    // TITLE

    if (config.title) {
      const element =
        document.querySelector(
          config.title
        );

      if (element) {
        baseSiteContent[
          contentKey
        ].title =
          element.textContent.trim();
      }
    }


    // BODY

    if (config.body) {
      const element =
        document.querySelector(
          config.body
        );

      if (element) {
        baseSiteContent[
          contentKey
        ].body =
          element.textContent.trim();
      }
    }


    // PRIMARY BUTTON

    if (config.button) {
      const element =
        document.querySelector(
          config.button
        );

      if (element) {
        baseSiteContent[
          contentKey
        ].button_label =
          element.textContent.trim();

        baseSiteContent[
          contentKey
        ].button_url =
          element.getAttribute(
            'href'
          );
      }
    }


    // SECONDARY BUTTON

    if (config.secondaryButton) {
      const element =
        document.querySelector(
          config.secondaryButton
        );

      if (element) {
        baseSiteContent[
          contentKey
        ].secondary_button_label =
          element.textContent.trim();

        baseSiteContent[
          contentKey
        ].secondary_button_url =
          element.getAttribute(
            'href'
          );
      }
    }

  }
);


// ================================
// HERO BUTTON VISIBILITY
// ================================

function setHeroButtonsVisibility(
  showButtons = true
) {
  const primaryButton =
    document.querySelector(
      '#heroPrimaryButton'
    );

  const secondaryButton =
    document.querySelector(
      '#heroSecondaryButton'
    );

  const heroActions =
    primaryButton?.closest(
      '.hero__actions'
    ) ||
    secondaryButton?.closest(
      '.hero__actions'
    );

  const heroContent =
    document.querySelector(
      '.hero__content'
    );

  if (heroActions) {
    heroActions.style.display =
      showButtons
        ? ''
        : 'none';
  }

  if (heroContent) {
    heroContent.classList.toggle(
      'hero__content--buttons-hidden',
      !showButtons
    );
  }
}


// ================================
// RESTORE BASE CONTENT
// ================================

function restoreBaseSiteContent() {
  Object.entries(siteContentMap).forEach(
    ([contentKey, config]) => {

      const base =
        baseSiteContent[
          contentKey
        ];

      if (!base) {
        return;
      }


      // SUBTITLE

      if (
        config.subtitle &&
        base.subtitle !== undefined
      ) {
        const element =
          document.querySelector(
            config.subtitle
          );

        if (element) {
          element.textContent =
            base.subtitle;
        }
      }


      // TITLE

      if (
        config.title &&
        base.title !== undefined
      ) {
        const element =
          document.querySelector(
            config.title
          );

        if (element) {
          element.textContent =
            base.title;
        }
      }


      // BODY

      if (
        config.body &&
        base.body !== undefined
      ) {
        const element =
          document.querySelector(
            config.body
          );

        if (element) {
          element.textContent =
            base.body;
        }
      }


      // PRIMARY BUTTON LABEL

      if (
        config.button &&
        base.button_label !== undefined
      ) {
        const element =
          document.querySelector(
            config.button
          );

        if (element) {
          element.textContent =
            base.button_label;
        }
      }


      // PRIMARY BUTTON URL

      if (
        config.button &&
        base.button_url !== undefined
      ) {
        const element =
          document.querySelector(
            config.button
          );

        if (element) {
          element.href =
            base.button_url;
        }
      }


      // SECONDARY BUTTON LABEL

      if (
        config.secondaryButton &&
        base.secondary_button_label !==
          undefined
      ) {
        const element =
          document.querySelector(
            config.secondaryButton
          );

        if (element) {
          element.textContent =
            base.secondary_button_label;
        }
      }


      // SECONDARY BUTTON URL

      if (
        config.secondaryButton &&
        base.secondary_button_url !==
          undefined
      ) {
        const element =
          document.querySelector(
            config.secondaryButton
          );

        if (element) {
          element.href =
            base.secondary_button_url;
        }
      }

    }
  );


  setHeroButtonsVisibility(
    true
  );
}


// ================================
// APPLY CUSTOM CONTENT
// ================================

function applySiteContent(content) {
  const sectionConfig =
    siteContentMap[
      content.content_key
    ];

  if (!sectionConfig) {
    return;
  }


  const translatedSubtitle =
    getSiteContentTranslatedField(
      content,
      'subtitle'
    );


  const translatedTitle =
    getSiteContentTranslatedField(
      content,
      'title'
    );


  const translatedBody =
    getSiteContentTranslatedField(
      content,
      'body'
    );


  const translatedButtonLabel =
    getSiteContentTranslatedField(
      content,
      'button_label'
    );


  const translatedSecondaryButtonLabel =
    getSiteContentTranslatedField(
      content,
      'secondary_button_label'
    );


  // SUBTITLE

  if (
    translatedSubtitle &&
    sectionConfig.subtitle
  ) {
    const element =
      document.querySelector(
        sectionConfig.subtitle
      );

    if (element) {
      element.textContent =
        translatedSubtitle;
    }
  }


  // TITLE

  if (
    translatedTitle &&
    sectionConfig.title
  ) {
    const element =
      document.querySelector(
        sectionConfig.title
      );

    if (element) {
      element.textContent =
        translatedTitle;
    }
  }


  // BODY

  if (
    translatedBody &&
    sectionConfig.body
  ) {
    const element =
      document.querySelector(
        sectionConfig.body
      );

    if (element) {
      element.textContent =
        translatedBody;
    }
  }


  // PRIMARY BUTTON LABEL

  if (
    sectionConfig.button &&
    translatedButtonLabel
  ) {
    const element =
      document.querySelector(
        sectionConfig.button
      );

    if (element) {
      element.textContent =
        translatedButtonLabel;
    }
  }


  // PRIMARY BUTTON URL

  if (
    sectionConfig.button &&
    content.button_url
  ) {
    const element =
      document.querySelector(
        sectionConfig.button
      );

    if (element) {
      element.href =
        content.button_url;
    }
  }


  // SECONDARY BUTTON LABEL

  if (
    sectionConfig.secondaryButton &&
    translatedSecondaryButtonLabel
  ) {
    const element =
      document.querySelector(
        sectionConfig.secondaryButton
      );

    if (element) {
      element.textContent =
        translatedSecondaryButtonLabel;
    }
  }


  // SECONDARY BUTTON URL

  if (
    sectionConfig.secondaryButton &&
    content.secondary_button_url
  ) {
    const element =
      document.querySelector(
        sectionConfig.secondaryButton
      );

    if (element) {
      element.href =
        content.secondary_button_url;
    }
  }


  // HERO BUTTON VISIBILITY

  if (
    content.content_key ===
    'hero_main'
  ) {
    setHeroButtonsVisibility(
      content.show_buttons !==
        false
    );
  }
}


// ================================
// LOAD PUBLIC SITE CONTENT
// ================================

async function loadPublicSiteContent() {
  try {

    restoreBaseSiteContent();

    applyTranslations();


    const contentItems =
      await getActiveContent();


    const translationRows =
      await getTranslationsByType(
        'content'
      );


    publicSiteContentTranslations =
      translationRows.reduce(
        (
          result,
          row
        ) => {

          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }


          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][
              row.language
            ] = {};
          }


          result[
            row.content_id
          ][
            row.language
          ][
            row.field_name
          ] =
            row.translated_text;


          return result;
        },
        {}
      );


    const mainContentItems =
      contentItems.filter(
        (content) =>
          content.is_main === true
      );


    mainContentItems.forEach(
      (content) => {
        applySiteContent(
          content
        );
      }
    );


  } catch (error) {
    console.error(
      'Unable to load public site content:',
      error
    );
  }
}


loadPublicSiteContent();

// ================================
// PUBLIC SUPPORT
// ================================

const publicSupportGrid =
  document.querySelector(
    '#publicSupportGrid'
  );


function formatSupportAmount(amount) {
  const numericAmount =
    Number(amount) || 0;

  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }
  ).format(numericAmount);
}


let publicSupportFunds = [];
let publicSupportTranslations = {};


// ================================
// SUPPORT TRANSLATION HELPER
// ================================

function getSupportTranslatedField(
  support,
  fieldName
) {
  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      support[fieldName] ??
      ''
    );
  }


  const supportTranslations =
    publicSupportTranslations[
      support.id
    ];


  return (
    supportTranslations?.[
      currentLanguage
    ]?.[fieldName] ??
    support[fieldName] ??
    ''
  );
}


// ================================
// RENDER PUBLIC SUPPORT
// ================================

function renderPublicSupport(settings) {
  if (settings.length === 0) {
    publicSupportGrid.innerHTML = `
      <p class="vote-empty__description">
        ${getTranslation(
          'support.noFunds'
        )}
      </p>
    `;

    return;
  }


  publicSupportGrid.innerHTML =
    settings
      .map((support) => {

        const translatedTitle =
          getSupportTranslatedField(
            support,
            'title'
          );


        const translatedDescription =
          getSupportTranslatedField(
            support,
            'description'
          );


        const displayTitle =
          translatedTitle ||
          getTranslation(
            'support.defaultFundTitle'
          );


        const raisedAmount =
          Number(
            support.raised_amount
          ) || 0;


        const goalAmount =
          Number(
            support.goal_amount
          ) || 0;


        const percentage =
          goalAmount > 0
            ? Math.min(
                Math.round(
                  (
                    raisedAmount /
                    goalAmount
                  ) * 100
                ),
                100
              )
            : 0;


        return `
          <article class="support-card">

            <div class="support-card__header">

              <div>

                <span class="support-card__type">
                  ${getTranslation(
                    'support.activeVotingFund'
                  )}
                </span>

                <h3 class="support-card__title">
                  ${displayTitle}
                </h3>

              </div>

              <span class="support-card__status">
                ${getTranslation(
                  'support.active'
                )}
              </span>

            </div>


            <!-- FUNDRAISING PROGRESS -->

            <div class="support-card__fundraising">

              <div class="support-card__amounts">

                <div>

                  <span class="support-card__amount-label">
                    ${getTranslation(
                      'support.raisedSoFar'
                    )}
                  </span>

                  <strong class="support-card__amount">
                    ${formatSupportAmount(
                      raisedAmount
                    )}
                  </strong>

                </div>

                <div class="support-card__goal">
                  ${getTranslation(
                    'support.goal'
                  )}:
                  ${formatSupportAmount(
                    goalAmount
                  )}
                </div>

              </div>


              <div
                class="support-card__progress"
                role="progressbar"
                aria-label="${getTranslation(
                  'support.progressLabel'
                )}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${percentage}"
              >

                <div
                  class="support-card__progress-bar"
                  style="width: ${percentage}%;"
                ></div>

              </div>


              <span class="support-card__percentage">
                ${percentage}% ${getTranslation(
                  'support.funded'
                )}
              </span>

            </div>


            ${
              translatedDescription ||
              support.qr_image_url ||
              support.donation_links
                ?.length > 0
                ? `
                  <div class="support-card__donation">

                    ${
                      support.qr_image_url
                        ? `
                          <div class="support-card__qr">

                            <img
                              src="${support.qr_image_url}"
                              alt="${displayTitle} ${getTranslation(
                                'support.donationQrCode'
                              )}"
                            />

                          </div>
                        `
                        : ''
                    }


                    <div class="support-card__donation-info">

                      ${
                        translatedDescription
                          ? `
                            <h4 class="support-card__donation-title">
                              ${getTranslation(
                                'support.supportThisVotingFund'
                              )}
                            </h4>

                            <p class="support-card__description">
                              ${translatedDescription}
                            </p>
                          `
                          : ''
                      }


                      ${
                        support.donation_links
                          ?.length > 0
                          ? `
                            <div class="support-card__actions">

                              ${support.donation_links
                                .map(
                                  (
                                    link
                                  ) => {
                                    return `
                                      <a
                                        class="btn btn-primary"
                                        href="${link.url}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${link.label}
                                      </a>
                                    `;
                                  }
                                )
                                .join(
                                  ''
                                )}

                            </div>
                          `
                          : ''
                      }

                    </div>

                  </div>
                `
                : ''
            }

          </article>
        `;
      })
      .join('');
}


// ================================
// LOAD PUBLIC SUPPORT
// ================================

async function loadPublicSupport() {
  try {
    const settings =
      await getActiveDonationSettings();


    const donationLinks =
      await getActiveDonationLinks();


    const translationRows =
      await getTranslationsByType(
        'support'
      );


    publicSupportTranslations =
      translationRows.reduce(
        (
          result,
          row
        ) => {

          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }


          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][
              row.language
            ] = {};
          }


          result[
            row.content_id
          ][
            row.language
          ][
            row.field_name
          ] =
            row.translated_text;


          return result;
        },
        {}
      );


    publicSupportFunds =
      settings.map(
        (fund) => {
          return {
            ...fund,

            donation_links:
              donationLinks.filter(
                (link) =>
                  link.fund_id ===
                  fund.id
              ),
          };
        }
      );


    renderPublicSupport(
      publicSupportFunds
    );

  } catch (error) {
    publicSupportGrid.innerHTML = `
      <p class="vote-empty__description">
        ${getTranslation(
          'support.unableToLoad'
        )}
      </p>
    `;


    console.error(
      'Unable to load public support:',
      error
    );
  }
}


loadPublicSupport();

// ================================
// PUBLIC FOOTER SETTINGS
// ================================

let publicFooterSettings = null;

let publicFooterTranslations = {};


// ================================
// GET TRANSLATED FOOTER FIELD
// ================================

function getFooterTranslatedField(
  footerSettings,
  fieldName
) {
  // ================================
  // ENGLISH BASE
  // ================================

  if (
    currentLanguage ===
    DEFAULT_LANGUAGE
  ) {
    return (
      footerSettings[fieldName] ??
      ''
    );
  }


  // ================================
  // DYNAMIC SUPABASE TRANSLATIONS
  // ================================

  const translations =
    publicFooterTranslations[
      footerSettings.id
    ];


  const dynamicTranslation =
    translations?.[
      currentLanguage
    ]?.[fieldName];


  if (dynamicTranslation) {
    return dynamicTranslation;
  }


  // ================================
  // FIXED TRANSLATION FALLBACK
  // ================================

  if (
    fieldName ===
    'disclaimer'
  ) {
    return (
      getTranslation(
        'footer.disclaimer'
      ) ||
      footerSettings.disclaimer ||
      ''
    );
  }


  if (
    fieldName ===
    'submit_text'
  ) {
    return (
      getTranslation(
        'footer.submit'
      ) ||
      footerSettings.submit_text ||
      ''
    );
  }


  if (
    fieldName ===
    'questions_text'
  ) {
    const questions =
      getTranslation(
        'footer.questions'
      );


    const contact =
      getTranslation(
        'footer.contact'
      );


    const fixedTranslation =
      [
        questions,
        contact,
      ]
        .filter(Boolean)
        .join(' ');


    return (
      fixedTranslation ||
      footerSettings.questions_text ||
      ''
    );
  }


  // ================================
  // FINAL FALLBACK
  // ================================

  return (
    footerSettings[fieldName] ??
    ''
  );
}


// ================================
// RENDER PUBLIC FOOTER
// ================================

function renderPublicFooter() {
  if (!publicFooterSettings) {
    return;
  }


  const footerDisclaimer =
    document.querySelector(
      '#footerDisclaimer'
    );


  const footerSubmitLink =
    document.querySelector(
      '#footerSubmitLink'
    );


  const footerQuestionsText =
    document.querySelector(
      '#footerQuestionsText'
    );


  const footerXLink =
    document.querySelector(
      '#footerXLink'
    );


  const footerCredit =
    document.querySelector(
      '#footerCredit'
    );


  const footerFirstBestiesLink =
    document.querySelector(
      '#footerFirstBestiesLink'
    );


  const footerSecondBestiesLink =
    document.querySelector(
      '#footerSecondBestiesLink'
    );


  const translatedDisclaimer =
    getFooterTranslatedField(
      publicFooterSettings,
      'disclaimer'
    );


  const translatedSubmitText =
    getFooterTranslatedField(
      publicFooterSettings,
      'submit_text'
    );


  const translatedQuestionsText =
    getFooterTranslatedField(
      publicFooterSettings,
      'questions_text'
    );


  // ================================
  // DISCLAIMER
  // ================================

  if (footerDisclaimer) {
    footerDisclaimer.textContent =
      translatedDisclaimer;
  }


  // ================================
  // SUBMIT / REPORT
  // ================================

  if (footerSubmitLink) {
    footerSubmitLink.textContent =
      translatedSubmitText;

    footerSubmitLink.href =
      publicFooterSettings.submit_url ||
      '#';
  }


  // ================================
  // QUESTIONS / CONTACT
  // ================================

  if (footerQuestionsText) {
    footerQuestionsText.textContent =
      translatedQuestionsText;
  }


  // ================================
  // X / TWITTER
  // ================================

  if (footerXLink) {
    footerXLink.textContent =
      publicFooterSettings.x_label ||
      'X / Twitter ↗';

    footerXLink.href =
      publicFooterSettings.x_url ||
      '#';
  }


  // ================================
  // CREDIT
  // ================================

  if (footerCredit) {
    const creditText =
      publicFooterSettings.credit_text ||
      'LMSY Vote Center — made with 💛💙 by Besties for Besties';


    const bestiesParts =
      creditText.split('Besties');


    footerCredit.innerHTML = '';


    // ================================
    // CREDIT PREFIX
    // ================================

    const creditPrefix =
      bestiesParts[0] || '';


    const heartParts =
      creditPrefix.split('💛💙');


    footerCredit.append(
      document.createTextNode(
        heartParts[0] || ''
      )
    );


    if (
      heartParts.length >
      1
    ) {
      const hearts =
        document.createElement(
          'span'
        );

      hearts.className =
        'footer__hearts';

      hearts.textContent =
        '💛💙';

      footerCredit.append(
        hearts
      );


      footerCredit.append(
        document.createTextNode(
          heartParts
            .slice(1)
            .join('💛💙')
        )
      );
    }


    // ================================
    // BESTIES LINKS
    // ================================

    if (
      bestiesParts.length >=
      3
    ) {
      const bestiesCredit =
        document.createElement(
          'span'
        );

      bestiesCredit.className =
        'footer__besties-credit';


      const firstBestiesLink =
        document.createElement(
          'a'
        );

      firstBestiesLink.className =
        'footer__secret-link';

      firstBestiesLink.href =
        publicFooterSettings.first_besties_url ||
        'https://x.com/delulushots';

      firstBestiesLink.target =
        '_blank';

      firstBestiesLink.rel =
        'noopener noreferrer';

      firstBestiesLink.setAttribute(
        'aria-label',
        '@delulushots'
      );

      firstBestiesLink.title =
        '@delulushots';

      firstBestiesLink.textContent =
        'Besties';


      const secondBestiesLink =
        document.createElement(
          'a'
        );

      secondBestiesLink.className =
        'footer__secret-link';

      secondBestiesLink.href =
        publicFooterSettings.second_besties_url ||
        'https://x.com/LMSY_VotingBase';

      secondBestiesLink.target =
        '_blank';

      secondBestiesLink.rel =
        'noopener noreferrer';

      secondBestiesLink.setAttribute(
        'aria-label',
        '@LMSY_VotingBase'
      );

      secondBestiesLink.title =
        '@LMSY_VotingBase';

      secondBestiesLink.textContent =
        'Besties';


      bestiesCredit.append(
        firstBestiesLink
      );


      bestiesCredit.append(
        document.createTextNode(
          bestiesParts[1] || ' for '
        )
      );


      bestiesCredit.append(
        secondBestiesLink
      );


      footerCredit.append(
        bestiesCredit
      );


      const remainingCreditText =
        bestiesParts
          .slice(2)
          .join('Besties');


      if (remainingCreditText) {
        footerCredit.append(
          document.createTextNode(
            remainingCreditText
          )
        );
      }


    } else {
      footerCredit.textContent =
        creditText;
    }
  }
}


// ================================
// LOAD PUBLIC FOOTER SETTINGS
// ================================

async function loadPublicFooterSettings() {
  try {
    publicFooterSettings =
      await getFooterSettings();


    if (!publicFooterSettings) {
      return;
    }


    const translationRows =
      await getTranslationsByType(
        'footer'
      );


    publicFooterTranslations =
      translationRows.reduce(
        (
          result,
          row
        ) => {

          if (
            !result[
              row.content_id
            ]
          ) {
            result[
              row.content_id
            ] = {};
          }


          if (
            !result[
              row.content_id
            ][row.language]
          ) {
            result[
              row.content_id
            ][
              row.language
            ] = {};
          }


          result[
            row.content_id
          ][
            row.language
          ][
            row.field_name
          ] =
            row.translated_text;


          return result;
        },
        {}
      );


    renderPublicFooter();


  } catch (error) {
    console.error(
      'Unable to load public footer settings:',
      error
    );
  }
}


loadPublicFooterSettings();

// ================================
// ARTISTS ADMIN
// ================================

async function loadArtistsAdminSection() {
  adminPanelBody.innerHTML = `
    <div class="admin-section-header">

      <div>
        <h3 class="admin-section-header__title">
          Artists & Content
        </h3>

        <p class="admin-section-header__description">
          Manage artist profiles, public site content and footer settings.
        </p>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        id="addArtistButton"
      >
        + Add Artist
      </button>

    </div>


    <!-- ================================
         ARTISTS
    ================================= -->

    <div class="admin-content-group">

      <div class="admin-content-group__header">

        <div>

          <span class="eyebrow">
            ARTISTS
          </span>

          <h4>
            Artist Profiles
          </h4>

        </div>

      </div>


      <div id="adminArtistList">

        <p class="admin-panel__placeholder">
          Loading artists...
        </p>

      </div>

    </div>


    <!-- ================================
         SITE CONTENT
    ================================= -->

    <div class="admin-content-group">

      <div class="admin-content-group__header">

        <div>

          <span class="eyebrow">
            CONTENT
          </span>

          <h4>
            Site Content
          </h4>

          <p class="admin-section-header__description">
            Manage reusable text and content shown across the website.
          </p>

        </div>


        <button
          class="btn btn-secondary"
          type="button"
          id="addContentButton"
        >
          + Add Content
        </button>

      </div>


      <div id="adminContentList">

        <p class="admin-panel__placeholder">
          Loading content...
        </p>

      </div>

    </div>


    <!-- ================================
         FOOTER SETTINGS
    ================================= -->

    <div class="admin-content-group">

      <div class="admin-content-group__header">

        <div>

          <span class="eyebrow">
            FOOTER
          </span>

          <h4>
            Footer Settings
          </h4>

          <p class="admin-section-header__description">
            Manage the text and links shown in the website footer.
          </p>

        </div>

      </div>


      <div id="adminFooterSettings">

        <p class="admin-panel__placeholder">
          Loading footer settings...
        </p>

      </div>

    </div>
  `;


  const adminArtistList =
    document.querySelector(
      '#adminArtistList'
    );


  const adminContentList =
    document.querySelector(
      '#adminContentList'
    );


  const adminFooterSettings =
    document.querySelector(
      '#adminFooterSettings'
    );


  const addArtistButton =
    document.querySelector(
      '#addArtistButton'
    );


    const addContentButton =
    document.querySelector(
      '#addContentButton'
    );


// ================================
// FOOTER SETTINGS
// ================================

try {
  const footerSettings =
    await getFooterSettings();


  if (!footerSettings) {
    adminFooterSettings.innerHTML = `
      <p class="admin-panel__placeholder">
        Footer settings could not be found.
      </p>
    `;

  } else {
    const isDeveloper =
      currentAdmin?.role ===
      'developer';


    const canEditFooter =
      currentAdmin?.role ===
        'developer' ||
      currentAdmin?.role ===
        'admin';


    if (!canEditFooter) {
      adminFooterSettings.innerHTML = `
        <p class="admin-panel__placeholder">
          You do not have permission to edit footer settings.
        </p>
      `;

    } else {
      adminFooterSettings.innerHTML = `
        <details class="admin-footer-details">

          <summary class="admin-footer-details__summary">

            <div>

              <strong>
                Edit Footer Settings
              </strong>

              <span>
                Click to expand
              </span>

            </div>

          </summary>


          <div class="admin-footer-details__content">

            <form
              class="admin-voting-form"
              id="adminFooterSettingsForm"
            >

              <!-- ================================
                   ADMIN TEXT SETTINGS
              ================================= -->

              <div
                style="
                  grid-column: 1 / -1;
                "
              >
                <span class="eyebrow">
                  PUBLIC TEXT
                </span>

                <p
                  class="admin-section-header__description"
                  style="
                    margin-top: 6px;
                    margin-bottom: 0;
                  "
                >
                  These texts are written in English and automatically translated when saved.
                </p>
              </div>


              <label
                style="
                  grid-column: 1 / -1;
                "
              >
                <span>
                  Disclaimer — English
                </span>

                <textarea
                  name="disclaimer"
                  rows="3"
                  required
                >${footerSettings.disclaimer ?? ''}</textarea>
              </label>


              <label
                style="
                  grid-column: 1 / -1;
                "
              >
                <span>
                  Submit / Report Text — English
                </span>

                <textarea
                  name="submit_text"
                  rows="2"
                  required
                >${footerSettings.submit_text ?? ''}</textarea>
              </label>


              <label
                style="
                  grid-column: 1 / -1;
                "
              >
                <span>
                  Questions / Contact Text — English
                </span>

                <textarea
                  name="questions_text"
                  rows="3"
                  required
                >${footerSettings.questions_text ?? ''}</textarea>
              </label>


              ${
                isDeveloper
                  ? `
                    <!-- ================================
                         DEVELOPER SETTINGS
                    ================================= -->

                    <div
                      style="
                        grid-column: 1 / -1;
                        margin-top: 14px;
                      "
                    >
                      <span class="eyebrow">
                        DEVELOPER SETTINGS
                      </span>

                      <p
                        class="admin-section-header__description"
                        style="
                          margin-top: 6px;
                          margin-bottom: 0;
                        "
                      >
                        Developer-only links, labels and footer credits.
                      </p>
                    </div>


                    <label
                      style="
                        grid-column: 1 / -1;
                      "
                    >
                      <span>
                        Submit / Report URL
                      </span>

                      <input
                        type="url"
                        name="submit_url"
                        value="${footerSettings.submit_url ?? ''}"
                      />
                    </label>


                    <label>
                      <span>
                        X / Twitter Label
                      </span>

                      <input
                        type="text"
                        name="x_label"
                        value="${footerSettings.x_label ?? ''}"
                      />
                    </label>


                    <label>
                      <span>
                        X / Twitter URL
                      </span>

                      <input
                        type="url"
                        name="x_url"
                        value="${footerSettings.x_url ?? ''}"
                      />
                    </label>


                    <label
                      style="
                        grid-column: 1 / -1;
                      "
                    >
                      <span>
                        Credit Text
                      </span>

                      <textarea
                        name="credit_text"
                        rows="3"
                      >${footerSettings.credit_text ?? ''}</textarea>

                      <small>
                        This credit remains in English and is not translated.
                      </small>
                    </label>


                    <label>
                      <span>
                        First Besties Secret URL
                      </span>

                      <input
                        type="url"
                        name="first_besties_url"
                        value="${footerSettings.first_besties_url ?? ''}"
                      />

                      <small>
                        Currently linked to @delulushots.
                      </small>
                    </label>


                    <label>
                      <span>
                        Second Besties Secret URL
                      </span>

                      <input
                        type="url"
                        name="second_besties_url"
                        value="${footerSettings.second_besties_url ?? ''}"
                      />

                      <small>
                        Currently linked to @LMSY_VotingBase.
                      </small>
                    </label>
                  `
                  : ''
              }


              <p
                class="admin-login-form__message"
                id="footerSettingsMessage"
                aria-live="polite"
                style="
                  grid-column: 1 / -1;
                "
              ></p>


              <button
                class="btn btn-primary"
                type="submit"
              >
                Save & Translate
              </button>

            </form>

          </div>

        </details>
      `;


      const adminFooterSettingsForm =
        document.querySelector(
          '#adminFooterSettingsForm'
        );


      const footerSettingsMessage =
        document.querySelector(
          '#footerSettingsMessage'
        );


      adminFooterSettingsForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();


          const formData =
            new FormData(
              adminFooterSettingsForm
            );


          const saveFooterButton =
            adminFooterSettingsForm.querySelector(
              'button[type="submit"]'
            );


          const baseFooterData = {
            disclaimer:
              formData
                .get('disclaimer')
                .trim(),

            submit_text:
              formData
                .get('submit_text')
                .trim(),

            questions_text:
              formData
                .get('questions_text')
                .trim(),
          };


          if (isDeveloper) {
            baseFooterData.submit_url =
              formData
                .get('submit_url')
                .trim();

            baseFooterData.x_label =
              formData
                .get('x_label')
                .trim();

            baseFooterData.x_url =
              formData
                .get('x_url')
                .trim();

            baseFooterData.credit_text =
              formData
                .get('credit_text')
                .trim();

            baseFooterData.first_besties_url =
              formData
                .get(
                  'first_besties_url'
                )
                .trim();

            baseFooterData.second_besties_url =
              formData
                .get(
                  'second_besties_url'
                )
                .trim();
          }


          try {
            saveFooterButton.disabled =
              true;

            saveFooterButton.textContent =
              'Saving & Translating...';

            footerSettingsMessage.textContent =
              '';


            // ================================
            // UPDATE FOOTER SETTINGS
            // ================================

            await updateFooterSettings(
              footerSettings.id,
              baseFooterData
            );


            // ================================
            // AUTO TRANSLATE PUBLIC TEXT
            // ================================

            saveFooterButton.textContent =
              'Translating...';


            const {
              data:
                translationData,

              error:
                translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        disclaimer:
                          baseFooterData.disclaimer,

                        submit_text:
                          baseFooterData.submit_text,

                        questions_text:
                          baseFooterData.questions_text,
                      },
                    },
                  }
                );


            if (translationError) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            // ================================
            // NORMALIZE TRANSLATIONS
            // ================================

            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  (
                    [
                      language,
                      fields,
                    ]
                  ) => [
                    language,
                    {
                      disclaimer:
                        fields.disclaimer ??
                        '',

                      submit_text:
                        fields.submit_text ??
                        '',

                      questions_text:
                        fields.questions_text ??
                        '',
                    },
                  ]
                )
              );


            // ================================
            // SAVE FOOTER TRANSLATIONS
            // ================================

            await saveTranslations(
              'footer',
              footerSettings.id,
              normalizedTranslations
            );


            saveFooterButton.textContent =
              'Saved ✓';

            footerSettingsMessage.textContent =
              'Footer settings saved successfully.';


            setTimeout(
              async () => {
                await loadArtistsAdminSection();
              },
              700
            );


          } catch (error) {
            saveFooterButton.disabled =
              false;

            saveFooterButton.textContent =
              'Save & Translate';

            footerSettingsMessage.textContent =
              error.message ||
              'Unable to save footer settings.';


            console.error(
              'Unable to update footer settings:',
              error
            );
          }
        }
      );
    }
  }


} catch (error) {
  adminFooterSettings.innerHTML = `
    <p class="admin-panel__placeholder">
      Unable to load footer settings.
    </p>
  `;


  console.error(
    'Unable to load footer settings:',
    error
  );
}

  // ================================
  // ADD ARTIST
  // ================================

  addArtistButton.addEventListener('click', () => {
    adminPanelBody.innerHTML = `
      <div class="admin-form-view">

        <div class="admin-form-view__header">

          <div>
            <span class="eyebrow">
              ARTIST
            </span>

            <h3 class="admin-section-header__title">
              Add Artist
            </h3>

            <p class="admin-section-header__description">
              Create a new artist profile.
            </p>
          </div>

          <button
            class="btn btn-secondary"
            type="button"
            id="cancelAddArtist"
          >
            ← Cancel
          </button>

        </div>

        <form
          class="admin-voting-form"
          id="adminArtistForm"
        >

          <label>
            <span>Name</span>

            <input
              type="text"
              name="name"
              required
            />
          </label>

          <label>
            <span>Slug</span>

            <select
              name="slug"
              required
            >
              <option value="lookmhee">
                Lookmhee
              </option>

              <option value="sonya">
                Sonya
              </option>

              <option value="lmsy">
                LMSY
              </option>
            </select>
          </label>

          <label style="grid-column: 1 / -1;">
            <span>Description</span>

            <textarea
              name="description"
              rows="4"
            ></textarea>
          </label>

          <label style="grid-column: 1 / -1;">
            <span>Artist Photo</span>

            <input
              type="file"
              name="artist_photo"
              id="artistPhotoInput"
              accept="image/png, image/jpeg, image/webp"
            />

            <small>
              PNG, JPG or WebP.
            </small>
          </label>

          <label>
            <span>Instagram URL</span>

            <input
              type="url"
              name="instagram_url"
            />
          </label>

          <label>
            <span>X / Twitter URL</span>

            <input
              type="url"
              name="x_url"
            />
          </label>

          <label>
            <span>TikTok URL</span>

            <input
              type="url"
              name="tiktok_url"
            />
          </label>

          <label>
            <span>Updates URL</span>

            <input
              type="url"
              name="updates_url"
            />
          </label>

          <label>
            <span>Sort order</span>

            <input
              type="number"
              name="sort_order"
              value="0"
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="active"
              checked
            />

            <span>Active</span>
          </label>

          <button
            class="btn btn-primary"
            type="submit"
          >
            Save Artist
          </button>

        </form>

      </div>
    `;


    const cancelAddArtist =
      document.querySelector('#cancelAddArtist');

    cancelAddArtist.addEventListener('click', () => {
      loadArtistsAdminSection();
    });


    const adminArtistForm =
      document.querySelector('#adminArtistForm');

    adminArtistForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const formData =
          new FormData(adminArtistForm);

        const artistSlug =
          formData.get('slug');

        const artistPhoto =
          formData.get('artist_photo');

        const saveArtistButton =
          adminArtistForm.querySelector(
            'button[type="submit"]'
          );

        try {
          saveArtistButton.disabled = true;
          saveArtistButton.textContent =
            'Saving...';

          let imageUrl = null;

          if (
            artistPhoto &&
            artistPhoto.size > 0
          ) {
            saveArtistButton.textContent =
              'Uploading photo...';

            imageUrl =
              await uploadArtistPhoto(
                artistPhoto,
                artistSlug
              );
          }

          saveArtistButton.textContent =
            'Saving artist...';

          const artistData = {
            name:
              formData.get('name').trim(),

            slug:
              artistSlug,

            description:
              formData.get('description').trim() || null,

            image_url:
              imageUrl,

            instagram_url:
              formData.get('instagram_url').trim() || null,

            x_url:
              formData.get('x_url').trim() || null,

            tiktok_url:
              formData.get('tiktok_url').trim() || null,

            updates_url:
              formData.get('updates_url').trim() || null,

            sort_order:
              Number(formData.get('sort_order')) || 0,

            active:
              formData.get('active') === 'on',
          };

          await createArtist(artistData);

          await loadArtistsAdminSection();
          await loadPublicArtists();

        } catch (error) {
          saveArtistButton.disabled = false;
          saveArtistButton.textContent =
            'Save Artist';

          console.error(
            'Unable to create artist:',
            error
          );
        }
      }
    );
  });


  // ================================
  // ADD CONTENT
  // ================================

  addContentButton.addEventListener(
    'click',
    () => {
      adminPanelBody.innerHTML = `
        <div class="admin-form-view">

          <div class="admin-form-view__header">

            <div>
              <span class="eyebrow">
                CONTENT
              </span>

              <h3 class="admin-section-header__title">
                Add Site Content
              </h3>

              <p class="admin-section-header__description">
                Create reusable content for the public website. Text translations are generated automatically from English.
              </p>
            </div>

            <button
              class="btn btn-secondary"
              type="button"
              id="cancelAddContent"
            >
              ← Cancel
            </button>

          </div>

          <form
            class="admin-voting-form"
            id="adminContentForm"
          >

            <label>
              <span>Content Area</span>

              <select
                name="content_key"
                id="addContentArea"
                required
              >
                <option value="hero_main">
                  Hero
                </option>

                <option value="artists_intro">
                  Artists Section Intro
                </option>

                <option value="tutorials_intro">
                  Tutorials Section Intro
                </option>

                <option value="watch_intro">
                  Watch & Results Intro
                </option>

                <option value="support_intro">
                  Support Section Intro
                </option>
              </select>
            </label>

            <label>
              <span>
                Title — English
              </span>

              <input
                type="text"
                name="title"
              />
            </label>

            <label style="grid-column: 1 / -1;">
              <span>
                Subtitle — English
              </span>

              <input
                type="text"
                name="subtitle"
              />
            </label>

            <label style="grid-column: 1 / -1;">
              <span>
                Body — English
              </span>

              <textarea
                name="body"
                rows="5"
              ></textarea>
            </label>

            <div
              id="addContentButtonFields"
              style="
                display: none;
                grid-column: 1 / -1;
              "
            >

              <label style="grid-column: 1 / -1;">
                <input
                  type="checkbox"
                  name="show_buttons"
                  checked
                />

                <span>
                  Show Hero Buttons
                </span>
              </label>

              <label>
                <span>
                  Primary Button Label — English
                </span>

                <input
                  type="text"
                  name="button_label"
                  placeholder="Start Voting"
                />
              </label>

              <label>
                <span>
                  Primary Button URL
                </span>

                <input
                  type="text"
                  name="button_url"
                  placeholder="#vote"
                />
              </label>

              <label>
                <span>
                  Secondary Button Label — English
                </span>

                <input
                  type="text"
                  name="secondary_button_label"
                  placeholder="View Tutorials"
                />
              </label>

              <label>
                <span>
                  Secondary Button URL
                </span>

                <input
                  type="text"
                  name="secondary_button_url"
                  placeholder="#tutorials"
                />
              </label>

            </div>

            <label>
              <input
                type="checkbox"
                name="active"
                checked
              />

              <span>
                Active
              </span>
            </label>

            <button
              class="btn btn-primary"
              type="submit"
            >
              Save & Translate
            </button>

          </form>

        </div>
      `;


      // ================================
      // SHOW BUTTON FIELDS ONLY FOR HERO
      // ================================

      const addContentArea =
        document.querySelector(
          '#addContentArea'
        );

      const addContentButtonFields =
        document.querySelector(
          '#addContentButtonFields'
        );


      function updateAddContentFields() {
        const isHero =
          addContentArea.value ===
          'hero_main';

        addContentButtonFields.style.display =
          isHero
            ? 'grid'
            : 'none';
      }


      updateAddContentFields();


      addContentArea.addEventListener(
        'change',
        updateAddContentFields
      );


      // ================================
      // CANCEL
      // ================================

      const cancelAddContent =
        document.querySelector(
          '#cancelAddContent'
        );


      cancelAddContent.addEventListener(
        'click',
        () => {
          loadArtistsAdminSection();
        }
      );


      // ================================
      // SAVE CONTENT
      // ================================

      const adminContentForm =
        document.querySelector(
          '#adminContentForm'
        );


      adminContentForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();


          const formData =
            new FormData(
              adminContentForm
            );


          const contentKey =
            formData
              .get(
                'content_key'
              )
              .trim();


          const isHero =
            contentKey ===
            'hero_main';


          const contentData = {
            content_key:
              contentKey,

            title:
              formData
                .get('title')
                .trim() ||
              null,

            subtitle:
              formData
                .get('subtitle')
                .trim() ||
              null,

            body:
              formData
                .get('body')
                .trim() ||
              null,

            button_label:
              isHero
                ? (
                    formData
                      .get(
                        'button_label'
                      )
                      .trim() ||
                    null
                  )
                : null,

            button_url:
              isHero
                ? (
                    formData
                      .get(
                        'button_url'
                      )
                      .trim() ||
                    null
                  )
                : null,

            secondary_button_label:
              isHero
                ? (
                    formData
                      .get(
                        'secondary_button_label'
                      )
                      .trim() ||
                    null
                  )
                : null,

            secondary_button_url:
              isHero
                ? (
                    formData
                      .get(
                        'secondary_button_url'
                      )
                      .trim() ||
                    null
                  )
                : null,

            show_buttons:
              isHero
                ? (
                    formData.get(
                      'show_buttons'
                    ) === 'on'
                  )
                : true,

            image_url:
              null,

            active:
              formData.get(
                'active'
              ) === 'on',
          };


          const saveContentButton =
            adminContentForm.querySelector(
              'button[type="submit"]'
            );


          try {
            saveContentButton.disabled =
              true;

            saveContentButton.textContent =
              'Saving & Translating...';


            // ================================
            // CREATE CONTENT
            // ================================

            const createdContent =
              await createContent(
                contentData
              );


            // ================================
            // AUTO TRANSLATE
            // ================================

            saveContentButton.textContent =
              'Translating...';


            const {
              data:
                translationData,

              error:
                translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        title:
                          contentData.title ??
                          '',

                        subtitle:
                          contentData.subtitle ??
                          '',

                        body:
                          contentData.body ??
                          '',

                        button_label:
                          contentData.button_label ??
                          '',

                        secondary_button_label:
                          contentData.secondary_button_label ??
                          '',
                      },
                    },
                  }
                );


            if (
              translationError
            ) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            // ================================
            // NORMALIZE TRANSLATIONS
            // ================================

            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  (
                    [
                      language,
                      fields,
                    ]
                  ) => [
                    language,
                    {
                      title:
                        contentData.title
                          ? (
                              fields.title ??
                              ''
                            )
                          : '',

                      subtitle:
                        contentData.subtitle
                          ? (
                              fields.subtitle ??
                              ''
                            )
                          : '',

                      body:
                        contentData.body
                          ? (
                              fields.body ??
                              ''
                            )
                          : '',

                      button_label:
                        contentData.button_label
                          ? (
                              fields.button_label ??
                              ''
                            )
                          : '',

                      secondary_button_label:
                        contentData.secondary_button_label
                          ? (
                              fields.secondary_button_label ??
                              ''
                            )
                          : '',
                    },
                  ]
                )
              );


            // ================================
            // SAVE TRANSLATIONS
            // ================================

            await saveTranslations(
              'content',
              createdContent.id,
              normalizedTranslations
            );


            // ================================
            // REFRESH
            // ================================

            await loadPublicSiteContent();


            saveContentButton.textContent =
              'Saved ✓';


            setTimeout(
              async () => {
                await loadArtistsAdminSection();
              },
              700
            );


          } catch (error) {
            saveContentButton.disabled =
              false;

            saveContentButton.textContent =
              'Save & Translate';


            console.error(
              'Unable to create site content:',
              error
            );
          }
        }
      );
    }
  );


  // ================================
  // LOAD ARTISTS
  // ================================

  try {
    const artists =
      await getArtists();

    if (artists.length === 0) {
      adminArtistList.innerHTML = `
        <p class="admin-panel__placeholder">
          No artists yet.
        </p>
      `;
    } else {
      adminArtistList.innerHTML = artists
        .map((artist) => {
          return `
            <article
              class="admin-voting-item"
              data-artist-id="${artist.id}"
            >

              <div class="admin-voting-item__info">

                <div class="admin-voting-item__top">

                  <strong class="admin-voting-item__event">
                    ${artist.name}
                  </strong>

                  <span
                    class="admin-voting-item__status ${
                      artist.active ? '' : 'is-inactive'
                    }"
                  >
                    ${artist.active ? 'Active' : 'Inactive'}
                  </span>

                </div>

                <span class="admin-voting-item__platform">
                  ${artist.slug}
                </span>

                ${
                  artist.description
                    ? `
                      <span class="admin-voting-item__meta">
                        ${artist.description}
                      </span>
                    `
                    : ''
                }

              </div>

              <div class="admin-voting-item__actions">

                <button
                  class="btn btn-secondary"
                  type="button"
                  data-edit-artist="${artist.id}"
                >
                  Edit
                </button>

              </div>

            </article>
          `;
        })
        .join('');
    }


    // ================================
    // EDIT ARTIST
    // ================================

    const editArtistButtons =
      document.querySelectorAll(
        '[data-edit-artist]'
      );

    editArtistButtons.forEach((button) => {
      button.addEventListener(
        'click',
        async () => {
          const artistId =
            Number(
              button.dataset.editArtist
            );

          const artist =
            artists.find(
              (item) =>
                item.id === artistId
            );

          if (!artist) {
            return;
          }


          // ================================
          // LOAD ARTIST TRANSLATIONS
          // ================================

          let artistTranslations = {};

          try {
            const translationRows =
              await getTranslations(
                'artist',
                artistId
              );

            artistTranslations =
              organizeTranslations(
                translationRows
              );

          } catch (error) {
            console.error(
              'Unable to load artist translations:',
              error
            );
          }


          adminPanelBody.innerHTML = `
            <div class="admin-form-view">

              <div class="admin-form-view__header">

                <div>

                  <span class="eyebrow">
                    ARTIST
                  </span>

                  <h3 class="admin-section-header__title">
                    Edit ${artist.name}
                  </h3>

                  <p class="admin-section-header__description">
                    Update artist information and translations shown on the website.
                  </p>

                </div>

                <button
                  class="btn btn-secondary"
                  type="button"
                  id="cancelEditArtist"
                >
                  ← Cancel
                </button>

              </div>


              <form
                class="admin-voting-form"
                id="adminEditArtistForm"
              >

                <label>
                  <span>Name</span>

                  <input
                    type="text"
                    name="name"
                    value="${artist.name ?? ''}"
                    required
                  />
                </label>


                <label>
                  <span>Slug</span>

                  <select
                    name="slug"
                    required
                  >

                    <option
                      value="lookmhee"
                      ${
                        artist.slug ===
                        'lookmhee'
                          ? 'selected'
                          : ''
                      }
                    >
                      Lookmhee
                    </option>

                    <option
                      value="sonya"
                      ${
                        artist.slug ===
                        'sonya'
                          ? 'selected'
                          : ''
                      }
                    >
                      Sonya
                    </option>

                    <option
                      value="lmsy"
                      ${
                        artist.slug ===
                        'lmsy'
                          ? 'selected'
                          : ''
                      }
                    >
                      LMSY
                    </option>

                  </select>
                </label>


                <!-- ENGLISH -->

                <div
                  style="
                    grid-column: 1 / -1;
                    margin-top: 8px;
                  "
                >
                  <span class="eyebrow">
                    ENGLISH — BASE CONTENT
                  </span>
                </div>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    Description — English
                  </span>

                  <textarea
                    name="description"
                    rows="4"
                  >${artist.description ?? ''}</textarea>
                </label>


                <!-- TRANSLATIONS -->

                <div
                  style="
                    grid-column: 1 / -1;
                    margin-top: 12px;
                  "
                >
                  <span class="eyebrow">
                    TRANSLATIONS
                  </span>

                  <p
                    class="admin-section-header__description"
                    style="
                      margin-top: 6px;
                      margin-bottom: 0;
                    "
                  >
                    Leave a translation empty to use the English version as fallback.
                  </p>
                </div>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    🇪🇸 Description — Español
                  </span>

                  <textarea
                    name="description_es"
                    rows="4"
                  >${
                    artistTranslations
                      .es
                      ?.description ??
                    ''
                  }</textarea>
                </label>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    🇹🇭 Description — ไทย
                  </span>

                  <textarea
                    name="description_th"
                    rows="4"
                  >${
                    artistTranslations
                      .th
                      ?.description ??
                    ''
                  }</textarea>
                </label>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    🇨🇳 Description — 中文
                  </span>

                  <textarea
                    name="description_zh"
                    rows="4"
                  >${
                    artistTranslations
                      .zh
                      ?.description ??
                    ''
                  }</textarea>
                </label>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    🇧🇷 Description — Português
                  </span>

                  <textarea
                    name="description_pt"
                    rows="4"
                  >${
                    artistTranslations
                      .pt
                      ?.description ??
                    ''
                  }</textarea>
                </label>


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    🇰🇷 Description — 한국어
                  </span>

                  <textarea
                    name="description_ko"
                    rows="4"
                  >${
                    artistTranslations
                      .ko
                      ?.description ??
                    ''
                  }</textarea>
                </label>


                <!-- PHOTO -->

                ${
                  artist.image_url
                    ? `
                      <div
                        style="
                          grid-column: 1 / -1;
                        "
                      >

                        <span
                          style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 600;
                          "
                        >
                          Current Photo
                        </span>

                        <img
                          src="${artist.image_url}"
                          alt="${artist.name}"
                          style="
                            width: 140px;
                            height: 140px;
                            object-fit: cover;
                            border-radius: 16px;
                            display: block;
                          "
                        />

                      </div>
                    `
                    : ''
                }


                <label
                  style="
                    grid-column: 1 / -1;
                  "
                >
                  <span>
                    Upload New Photo
                  </span>

                  <input
                    type="file"
                    name="artist_photo"
                    accept="image/png, image/jpeg, image/webp"
                  />

                  <small>
                    Leave empty to keep the current photo.
                  </small>
                </label>


                <!-- LINKS -->

                <label>
                  <span>Instagram URL</span>

                  <input
                    type="url"
                    name="instagram_url"
                    value="${artist.instagram_url ?? ''}"
                  />
                </label>


                <label>
                  <span>X / Twitter URL</span>

                  <input
                    type="url"
                    name="x_url"
                    value="${artist.x_url ?? ''}"
                  />
                </label>


                <label>
                  <span>TikTok URL</span>

                  <input
                    type="url"
                    name="tiktok_url"
                    value="${artist.tiktok_url ?? ''}"
                  />
                </label>


                <label>
                  <span>Updates URL</span>

                  <input
                    type="url"
                    name="updates_url"
                    value="${artist.updates_url ?? ''}"
                  />
                </label>


                <label>
                  <span>Sort order</span>

                  <input
                    type="number"
                    name="sort_order"
                    value="${artist.sort_order ?? 0}"
                  />
                </label>


                <label>

                  <input
                    type="checkbox"
                    name="active"
                    ${
                      artist.active
                        ? 'checked'
                        : ''
                    }
                  />

                  <span>Active</span>

                </label>


                <button
                  class="btn btn-primary"
                  type="submit"
                >
                  Save Changes
                </button>

              </form>

            </div>
          `;


          // ================================
          // CANCEL
          // ================================

          const cancelEditArtist =
            document.querySelector(
              '#cancelEditArtist'
            );

          cancelEditArtist.addEventListener(
            'click',
            () => {
              loadArtistsAdminSection();
            }
          );


          // ================================
          // SAVE ARTIST
          // ================================

          const adminEditArtistForm =
            document.querySelector(
              '#adminEditArtistForm'
            );

          adminEditArtistForm.addEventListener(
            'submit',
            async (event) => {
              event.preventDefault();


              const formData =
                new FormData(
                  adminEditArtistForm
                );

              const artistSlug =
                formData.get(
                  'slug'
                );

              const newArtistPhoto =
                formData.get(
                  'artist_photo'
                );

              const saveChangesButton =
                adminEditArtistForm.querySelector(
                  'button[type="submit"]'
                );


              try {
                saveChangesButton.disabled =
                  true;

                saveChangesButton.textContent =
                  'Saving...';


                let imageUrl =
                  artist.image_url ||
                  null;


                if (
                  newArtistPhoto &&
                  newArtistPhoto.size > 0
                ) {
                  saveChangesButton.textContent =
                    'Uploading photo...';

                  imageUrl =
                    await uploadArtistPhoto(
                      newArtistPhoto,
                      artistSlug
                    );
                }


                // ================================
                // SAVE BASE ARTIST
                // ================================

                saveChangesButton.textContent =
                  'Saving artist...';


                const artistData = {
                  name:
                    formData
                      .get('name')
                      .trim(),

                  slug:
                    artistSlug,

                  description:
                    formData
                      .get('description')
                      .trim() ||
                    null,

                  image_url:
                    imageUrl,

                  instagram_url:
                    formData
                      .get(
                        'instagram_url'
                      )
                      .trim() ||
                    null,

                  x_url:
                    formData
                      .get('x_url')
                      .trim() ||
                    null,

                  tiktok_url:
                    formData
                      .get(
                        'tiktok_url'
                      )
                      .trim() ||
                    null,

                  updates_url:
                    formData
                      .get(
                        'updates_url'
                      )
                      .trim() ||
                    null,

                  sort_order:
                    Number(
                      formData.get(
                        'sort_order'
                      )
                    ) || 0,

                  active:
                    formData.get(
                      'active'
                    ) === 'on',
                };


                await updateArtist(
                  artistId,
                  artistData
                );


                // ================================
                // SAVE TRANSLATIONS
                // ================================

                saveChangesButton.textContent =
                  'Saving translations...';


                await saveTranslations(
                  'artist',
                  artistId,
                  {
                    es: {
                      description:
                        formData
                          .get(
                            'description_es'
                          )
                          .trim(),
                    },

                    th: {
                      description:
                        formData
                          .get(
                            'description_th'
                          )
                          .trim(),
                    },

                    zh: {
                      description:
                        formData
                          .get(
                            'description_zh'
                          )
                          .trim(),
                    },

                    pt: {
                      description:
                        formData
                          .get(
                            'description_pt'
                          )
                          .trim(),
                    },

                    ko: {
                      description:
                        formData
                          .get(
                            'description_ko'
                          )
                          .trim(),
                    },
                  }
                );


                await loadPublicArtists();


                saveChangesButton.textContent =
                  'Saved ✓';


                setTimeout(
                  async () => {
                    await loadArtistsAdminSection();
                  },
                  700
                );

              } catch (error) {
                saveChangesButton.disabled =
                  false;

                saveChangesButton.textContent =
                  'Save Changes';

                console.error(
                  'Unable to update artist:',
                  error
                );
              }
            }
          );
        }
      );
    });

  } catch (error) {
    adminArtistList.innerHTML = `
      <p class="admin-panel__placeholder">
        Unable to load artists.
      </p>
    `;

    console.error(
      'Unable to load artists:',
      error
    );
  }


  // ================================
  // LOAD SITE CONTENT
  // ================================

  try {
    const contentItems =
      await getContent();


    if (
      contentItems.length ===
      0
    ) {
      adminContentList.innerHTML = `
        <p class="admin-panel__placeholder">
          No site content yet.
        </p>
      `;

    } else {
      adminContentList.innerHTML =
        contentItems
          .map(
            (content) => {
              return `
                <article
                  class="admin-voting-item"
                  data-content-id="${content.id}"
                >

                  <div class="admin-voting-item__info">

                    <div class="admin-voting-item__top">

                      <strong class="admin-voting-item__event">
                        ${
                          content.title ||
                          content.content_key
                        }
                      </strong>

                      <div
                        style="
                          display: flex;
                          gap: 8px;
                          align-items: center;
                        "
                      >

                        ${
                          content.is_main
                            ? `
                              <span class="admin-voting-item__status">
                                Main
                              </span>
                            `
                            : ''
                        }

                        <span
                          class="admin-voting-item__status ${
                            content.active
                              ? ''
                              : 'is-inactive'
                          }"
                        >
                          ${
                            content.active
                              ? 'Active'
                              : 'Inactive'
                          }
                        </span>

                      </div>

                    </div>


                    <span class="admin-voting-item__platform">
                      ${content.content_key}
                    </span>


                    ${
                      content.subtitle
                        ? `
                          <span class="admin-voting-item__meta">
                            ${content.subtitle}
                          </span>
                        `
                        : ''
                    }

                  </div>


                  <div class="admin-voting-item__actions">

                    ${
                      content.is_main
                        ? `
                          <button
                            class="btn btn-secondary"
                            type="button"
                            data-return-base-content="${content.id}"
                          >
                            Return to Base
                          </button>
                        `
                        : `
                          <button
                            class="btn btn-secondary"
                            type="button"
                            data-set-main-content="${content.id}"
                          >
                            Set as Main
                          </button>
                        `
                    }

                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-edit-content="${content.id}"
                    >
                      Edit
                    </button>

                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-delete-content="${content.id}"
                    >
                      Delete
                    </button>

                  </div>

                </article>
              `;
            }
          )
          .join('');
    }


    // ================================
    // SET CONTENT AS MAIN
    // ================================

    const setMainContentButtons =
      document.querySelectorAll(
        '[data-set-main-content]'
      );


    setMainContentButtons.forEach(
      (button) => {
        button.addEventListener(
          'click',
          async () => {

            const contentId =
              Number(
                button.dataset
                  .setMainContent
              );


            const content =
              contentItems.find(
                (item) =>
                  item.id ===
                  contentId
              );


            if (!content) {
              return;
            }


            try {
              button.disabled =
                true;

              button.textContent =
                'Setting...';


              await setContentAsMain(
                contentId,
                content.content_key
              );


              await loadPublicSiteContent();

              await loadArtistsAdminSection();


            } catch (error) {
              button.disabled =
                false;

              button.textContent =
                'Set as Main';


              console.error(
                'Unable to set content as main:',
                error
              );
            }
          }
        );
      }
    );


    // ================================
    // RETURN CONTENT TO BASE
    // ================================

    const returnBaseContentButtons =
      document.querySelectorAll(
        '[data-return-base-content]'
      );


    returnBaseContentButtons.forEach(
      (button) => {
        button.addEventListener(
          'click',
          async () => {

            const contentId =
              Number(
                button.dataset
                  .returnBaseContent
              );


            const content =
              contentItems.find(
                (item) =>
                  item.id ===
                  contentId
              );


            if (!content) {
              return;
            }


            try {
              button.disabled =
                true;

              button.textContent =
                'Returning...';


              await returnContentToBase(
                content.content_key
              );


              await loadPublicSiteContent();

              await loadArtistsAdminSection();


            } catch (error) {
              button.disabled =
                false;

              button.textContent =
                'Return to Base';


              console.error(
                'Unable to return content to base:',
                error
              );
            }
          }
        );
      }
    );


    // ================================
    // EDIT CONTENT
    // ================================

    const editContentButtons =
      document.querySelectorAll(
        '[data-edit-content]'
      );


    editContentButtons.forEach(
      (button) => {
        button.addEventListener(
          'click',
          () => {

            const contentId =
              Number(
                button.dataset
                  .editContent
              );


            const content =
              contentItems.find(
                (item) =>
                  item.id ===
                  contentId
              );


            if (!content) {
              return;
            }


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      CONTENT
                    </span>

                    <h3 class="admin-section-header__title">
                      Edit Site Content
                    </h3>

                    <p class="admin-section-header__description">
                      Update this public website content. Text translations are generated automatically from English.
                    </p>

                  </div>

                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelEditContent"
                  >
                    ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminEditContentForm"
                >

                  <label>
                    <span>
                      Content Area
                    </span>

                    <select
                      name="content_key"
                      id="editContentArea"
                      required
                    >

                      <option
                        value="hero_main"
                        ${
                          content.content_key ===
                          'hero_main'
                            ? 'selected'
                            : ''
                        }
                      >
                        Hero
                      </option>

                      <option
                        value="artists_intro"
                        ${
                          content.content_key ===
                          'artists_intro'
                            ? 'selected'
                            : ''
                        }
                      >
                        Artists Section Intro
                      </option>

                      <option
                        value="tutorials_intro"
                        ${
                          content.content_key ===
                          'tutorials_intro'
                            ? 'selected'
                            : ''
                        }
                      >
                        Tutorials Section Intro
                      </option>

                      <option
                        value="watch_intro"
                        ${
                          content.content_key ===
                          'watch_intro'
                            ? 'selected'
                            : ''
                        }
                      >
                        Watch & Results Intro
                      </option>

                      <option
                        value="support_intro"
                        ${
                          content.content_key ===
                          'support_intro'
                            ? 'selected'
                            : ''
                        }
                      >
                        Support Section Intro
                      </option>

                    </select>
                  </label>


                  <label>
                    <span>
                      Title — English
                    </span>

                    <input
                      type="text"
                      name="title"
                      value="${
                        content.title ??
                        ''
                      }"
                    />
                  </label>


                  <label
                    style="
                      grid-column: 1 / -1;
                    "
                  >
                    <span>
                      Subtitle — English
                    </span>

                    <input
                      type="text"
                      name="subtitle"
                      value="${
                        content.subtitle ??
                        ''
                      }"
                    />
                  </label>


                  <label
                    style="
                      grid-column: 1 / -1;
                    "
                  >
                    <span>
                      Body — English
                    </span>

                    <textarea
                      name="body"
                      rows="5"
                    >${content.body ?? ''}</textarea>
                  </label>


                  <div
                    id="editContentButtonFields"
                    style="
                      display: none;
                      grid-column: 1 / -1;
                    "
                  >

                    <label
                      style="
                        grid-column: 1 / -1;
                      "
                    >
                      <input
                        type="checkbox"
                        name="show_buttons"
                        ${
                          content.show_buttons !==
                          false
                            ? 'checked'
                            : ''
                        }
                      />

                      <span>
                        Show Hero Buttons
                      </span>
                    </label>


                    <label>
                      <span>
                        Primary Button Label — English
                      </span>

                      <input
                        type="text"
                        name="button_label"
                        value="${
                          content.button_label ??
                          ''
                        }"
                        placeholder="Start Voting"
                      />
                    </label>


                    <label>
                      <span>
                        Primary Button URL
                      </span>

                      <input
                        type="text"
                        name="button_url"
                        value="${
                          content.button_url ??
                          ''
                        }"
                        placeholder="#vote"
                      />
                    </label>


                    <label>
                      <span>
                        Secondary Button Label — English
                      </span>

                      <input
                        type="text"
                        name="secondary_button_label"
                        value="${
                          content.secondary_button_label ??
                          ''
                        }"
                        placeholder="View Tutorials"
                      />
                    </label>


                    <label>
                      <span>
                        Secondary Button URL
                      </span>

                      <input
                        type="text"
                        name="secondary_button_url"
                        value="${
                          content.secondary_button_url ??
                          ''
                        }"
                        placeholder="#tutorials"
                      />
                    </label>

                  </div>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      ${
                        content.active
                          ? 'checked'
                          : ''
                      }
                    />

                    <span>
                      Active
                    </span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save & Translate
                  </button>

                </form>

              </div>
            `;


            // ================================
            // SHOW BUTTON FIELDS ONLY FOR HERO
            // ================================

            const editContentArea =
              document.querySelector(
                '#editContentArea'
              );


            const editContentButtonFields =
              document.querySelector(
                '#editContentButtonFields'
              );


            function updateEditContentFields() {
              const isHero =
                editContentArea.value ===
                'hero_main';


              editContentButtonFields.style.display =
                isHero
                  ? 'grid'
                  : 'none';
            }


            updateEditContentFields();


            editContentArea.addEventListener(
              'change',
              updateEditContentFields
            );


            // ================================
            // CANCEL
            // ================================

            const cancelEditContent =
              document.querySelector(
                '#cancelEditContent'
              );


            cancelEditContent.addEventListener(
              'click',
              () => {
                loadArtistsAdminSection();
              }
            );


            // ================================
            // SAVE EDIT
            // ================================

            const adminEditContentForm =
              document.querySelector(
                '#adminEditContentForm'
              );


            adminEditContentForm.addEventListener(
              'submit',
              async (event) => {
                event.preventDefault();


                const formData =
                  new FormData(
                    adminEditContentForm
                  );


                const contentKey =
                  formData
                    .get(
                      'content_key'
                    )
                    .trim();


                const isHero =
                  contentKey ===
                  'hero_main';


                const contentData = {
                  content_key:
                    contentKey,

                  title:
                    formData
                      .get('title')
                      .trim() ||
                    null,

                  subtitle:
                    formData
                      .get('subtitle')
                      .trim() ||
                    null,

                  body:
                    formData
                      .get('body')
                      .trim() ||
                    null,

                  button_label:
                    isHero
                      ? (
                          formData
                            .get(
                              'button_label'
                            )
                            .trim() ||
                          null
                        )
                      : null,

                  button_url:
                    isHero
                      ? (
                          formData
                            .get(
                              'button_url'
                            )
                            .trim() ||
                          null
                        )
                      : null,

                  secondary_button_label:
                    isHero
                      ? (
                          formData
                            .get(
                              'secondary_button_label'
                            )
                            .trim() ||
                          null
                        )
                      : null,

                  secondary_button_url:
                    isHero
                      ? (
                          formData
                            .get(
                              'secondary_button_url'
                            )
                            .trim() ||
                          null
                        )
                      : null,

                  show_buttons:
                    isHero
                      ? (
                          formData.get(
                            'show_buttons'
                          ) === 'on'
                        )
                      : (
                          content.show_buttons ??
                          true
                        ),

                  image_url:
                    null,

                  active:
                    formData.get(
                      'active'
                    ) === 'on',
                };


                const saveChangesButton =
                  adminEditContentForm.querySelector(
                    'button[type="submit"]'
                  );


                try {
                  saveChangesButton.disabled =
                    true;

                  saveChangesButton.textContent =
                    'Saving & Translating...';


                  // ================================
                  // UPDATE CONTENT
                  // ================================

                  await updateContent(
                    contentId,
                    contentData
                  );


                  // ================================
                  // AUTO TRANSLATE
                  // ================================

                  saveChangesButton.textContent =
                    'Translating...';


                  const {
                    data:
                      translationData,

                    error:
                      translationError,
                  } =
                    await supabase
                      .functions
                      .invoke(
                        'translate-content',
                        {
                          body: {
                            fields: {
                              title:
                                contentData.title ??
                                '',

                              subtitle:
                                contentData.subtitle ??
                                '',

                              body:
                                contentData.body ??
                                '',

                              button_label:
                                contentData.button_label ??
                                '',

                              secondary_button_label:
                                contentData.secondary_button_label ??
                                '',
                            },
                          },
                        }
                      );


                  if (
                    translationError
                  ) {
                    throw translationError;
                  }


                  if (
                    !translationData
                      ?.translations
                  ) {
                    throw new Error(
                      'Translation service returned no translations.'
                    );
                  }


                  // ================================
                  // NORMALIZE TRANSLATIONS
                  // ================================

                  const normalizedTranslations =
                    Object.fromEntries(
                      Object.entries(
                        translationData.translations
                      ).map(
                        (
                          [
                            language,
                            fields,
                          ]
                        ) => [
                          language,
                          {
                            title:
                              contentData.title
                                ? (
                                    fields.title ??
                                    ''
                                  )
                                : '',

                            subtitle:
                              contentData.subtitle
                                ? (
                                    fields.subtitle ??
                                    ''
                                  )
                                : '',

                            body:
                              contentData.body
                                ? (
                                    fields.body ??
                                    ''
                                  )
                                : '',

                            button_label:
                              contentData.button_label
                                ? (
                                    fields.button_label ??
                                    ''
                                  )
                                : '',

                            secondary_button_label:
                              contentData.secondary_button_label
                                ? (
                                    fields.secondary_button_label ??
                                    ''
                                  )
                                : '',
                          },
                        ]
                      )
                    );


                  // ================================
                  // SAVE TRANSLATIONS
                  // ================================

                  await saveTranslations(
                    'content',
                    contentId,
                    normalizedTranslations
                  );


                  // ================================
                  // REFRESH
                  // ================================

                  await loadPublicSiteContent();


                  saveChangesButton.textContent =
                    'Saved ✓';


                  setTimeout(
                    async () => {
                      await loadArtistsAdminSection();
                    },
                    700
                  );


                } catch (error) {
                  saveChangesButton.disabled =
                    false;

                  saveChangesButton.textContent =
                    'Save & Translate';


                  console.error(
                    'Unable to update site content:',
                    error
                  );
                }
              }
            );
          }
        );
      }
    );


    // ================================
    // DELETE CONTENT
    // ================================

    const deleteContentButtons =
      document.querySelectorAll(
        '[data-delete-content]'
      );


    deleteContentButtons.forEach(
      (button) => {
        button.addEventListener(
          'click',
          async () => {

            const contentId =
              Number(
                button.dataset
                  .deleteContent
              );


            const content =
              contentItems.find(
                (item) =>
                  item.id ===
                  contentId
              );


            if (!content) {
              return;
            }


            const confirmed =
              window.confirm(
                `Delete "${content.title || content.content_key}"? This action cannot be undone.`
              );


            if (!confirmed) {
              return;
            }


            try {
              button.disabled =
                true;

              button.textContent =
                'Deleting...';


              // ================================
              // DELETE CONTENT TRANSLATIONS
              // ================================

              const {
                error:
                  translationsDeleteError,
              } =
                await supabase
                  .from(
                    'lmsy_translations'
                  )
                  .delete()
                  .eq(
                    'content_type',
                    'content'
                  )
                  .eq(
                    'content_id',
                    contentId
                  );


              if (
                translationsDeleteError
              ) {
                throw translationsDeleteError;
              }


              // ================================
              // DELETE CONTENT
              // ================================

              await deleteContent(
                contentId
              );


              // ================================
              // REFRESH
              // ================================

              await loadPublicSiteContent();

              await loadArtistsAdminSection();


            } catch (error) {
              button.disabled =
                false;

              button.textContent =
                'Delete';


              console.error(
                'Unable to delete site content:',
                error
              );
            }
          }
        );
      }
    );


  } catch (error) {
    adminContentList.innerHTML = `
      <p class="admin-panel__placeholder">
        Unable to load site content.
      </p>
    `;


    console.error(
      'Unable to load site content:',
      error
    );
  }
}
// ================================
// ADMIN PANEL SETUP
// ================================

const adminNavItems =
  document.querySelectorAll('.admin-panel__nav-item');

const adminPanelTitle =
  document.querySelector('.admin-panel__title');

const adminPanelBody =
  document.querySelector('.admin-panel__body');

const adminSections = {
  'Watch & Results':
    'Watch & Results management will appear here.',

  Support:
    'Support management will appear here.',

  'Artists & Content':
    'Artists & Content management will appear here.',
};


// ================================
// VOTING ADMIN
// ================================

async function loadVotingAdminSection() {
  adminPanelBody.innerHTML = `
    <div class="admin-section-header">

      <div>

        <h3 class="admin-section-header__title">
          Voting Platforms
        </h3>

        <p class="admin-section-header__description">
          Manage active voting opportunities shown on the website.
        </p>

      </div>

      <button
        class="btn btn-primary"
        type="button"
        id="addVotingButton"
      >
        + Add Voting
      </button>

    </div>

    <div id="adminVotingList">

      <p class="admin-panel__placeholder">
        Loading voting platforms...
      </p>

    </div>
  `;

  const adminVotingList =
    document.querySelector('#adminVotingList');

  const addVotingButton =
    document.querySelector('#addVotingButton');


    // ================================
  // ADD VOTING
  // ================================

  addVotingButton.addEventListener(
    'click',
    () => {
      adminPanelBody.innerHTML = `
        <div class="admin-form-view">

          <div class="admin-form-view__header">

            <div>

              <span class="eyebrow">
                VOTING
              </span>

              <h3 class="admin-section-header__title">
                Add Voting
              </h3>

              <p class="admin-section-header__description">
                Create a new voting opportunity. Frequency translations are generated automatically from English.
              </p>

            </div>

            <button
              class="btn btn-secondary"
              type="button"
              id="cancelAddVoting"
            >
              ← Cancel
            </button>

          </div>


          <form
            class="admin-voting-form"
            id="adminVotingForm"
          >

            <label>
              <span>
                Event name — English
              </span>

              <input
                type="text"
                name="event"
                required
              />
            </label>


            <label>
              <span>
                Platform
              </span>

              <input
                type="text"
                name="platform"
                required
              />
            </label>


            <label>
              <span>
                Voting URL
              </span>

              <input
                type="url"
                name="url"
                required
              />
            </label>


            <label>
              <span>
                Voting type
              </span>

              <select
                name="vote_type"
                required
              >

                <option value="ceremony">
                  Awards & Ceremonies
                </option>

                <option value="poll">
                  Poll
                </option>

                <option value="advertising">
                  Advertising
                </option>

              </select>
            </label>


            <label>
              <span>
                Priority
              </span>

              <select
                name="priority"
                required
              >

                <option value="1">
                  Urgent
                </option>

                <option value="2">
                  High
                </option>

                <option
                  value="3"
                  selected
                >
                  Normal
                </option>

              </select>
            </label>


            <label>
              <span>
                Accent
              </span>

              <select
                name="accent"
              >

                <option value="lmsy">
                  LMSY
                </option>

                <option value="lookmhee">
                  Lookmhee
                </option>

                <option value="sonya">
                  Sonya
                </option>

              </select>
            </label>


            <label>
              <span>
                Start Date
              </span>

              <input
                type="datetime-local"
                name="start_date"
              />
            </label>


            <label>
              <span>
                Deadline
              </span>

              <input
                type="datetime-local"
                name="deadline"
              />
            </label>


            <label>
              <span>
                Frequency — English
              </span>

              <input
                type="text"
                name="frequency"
                placeholder="Example: Daily Voting"
              />
            </label>


            <label>
              <span>
                Tutorial URL
              </span>

              <input
                type="url"
                name="tutorial_url"
              />
            </label>


            <label>
              <span>
                Sort order
              </span>

              <input
                type="number"
                name="sort_order"
                value="0"
              />
            </label>


            <label>

              <input
                type="checkbox"
                name="active"
                checked
              />

              <span>
                Active
              </span>

            </label>


            <button
              class="btn btn-primary"
              type="submit"
            >
              Save & Translate
            </button>

          </form>

        </div>
      `;


      const cancelAddVoting =
        document.querySelector(
          '#cancelAddVoting'
        );


      cancelAddVoting.addEventListener(
        'click',
        () => {
          loadVotingAdminSection();
        }
      );


      const adminVotingForm =
        document.querySelector(
          '#adminVotingForm'
        );


      adminVotingForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();


          const formData =
            new FormData(
              adminVotingForm
            );


          const votingData = {
            event:
              formData
                .get('event')
                .trim(),

            platform:
              formData
                .get('platform')
                .trim(),

            url:
              formData
                .get('url')
                .trim(),

            vote_type:
              formData.get(
                'vote_type'
              ),

            priority:
              Number(
                formData.get(
                  'priority'
                )
              ),

            accent:
              formData.get(
                'accent'
              ),

            start_date:
              formData.get(
                'start_date'
              ) || null,

            deadline:
              formData.get(
                'deadline'
              ) || null,

            frequency:
              formData
                .get(
                  'frequency'
                )
                .trim() ||
              null,

            tutorial_url:
              formData
                .get(
                  'tutorial_url'
                )
                .trim() ||
              null,

            sort_order:
              Number(
                formData.get(
                  'sort_order'
                )
              ) || 0,

            active:
              formData.get(
                'active'
              ) === 'on',
          };


          const saveButton =
            adminVotingForm.querySelector(
              'button[type="submit"]'
            );


          try {
            saveButton.disabled =
              true;

            saveButton.textContent =
              'Saving & Translating...';


            const createdVoting =
              await createVotingPlatform(
                votingData
              );


            const {
              data:
                translationData,

              error:
                translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        frequency:
                          votingData.frequency ??
                          '',
                      },
                    },
                  }
                );


            if (
              translationError
            ) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  ([language, fields]) => [
                    language,
                    {
                      frequency:
                        votingData.frequency
                          ? fields.frequency ?? ''
                          : '',
                    },
                  ]
                )
              );


            await saveTranslations(
              'voting',
              createdVoting.id,
              normalizedTranslations
            );


            await loadPublicVotingPlatforms();

            await loadPublicTutorials();


            saveButton.textContent =
              'Saved ✓';


            setTimeout(
              async () => {
                await loadVotingAdminSection();
              },
              700
            );

          } catch (error) {
            saveButton.disabled =
              false;

            saveButton.textContent =
              'Save & Translate';


            console.error(
              'Unable to create voting platform:',
              error
            );
          }
        }
      );
    }
  );


  // ================================
  // LOAD VOTING PLATFORMS
  // ================================

  try {
    const platforms =
      await getVotingPlatforms();

    if (platforms.length === 0) {
      adminVotingList.innerHTML = `
        <p class="admin-panel__placeholder">
          No voting platforms yet.
        </p>
      `;

      return;
    }

    adminVotingList.innerHTML = platforms
      .map((platform) => {
        return `
          <article
            class="admin-voting-item"
            data-voting-id="${platform.id}"
          >

            <div class="admin-voting-item__info">

              <div class="admin-voting-item__top">

                <strong class="admin-voting-item__event">
                  ${platform.event}
                </strong>

                <span class="admin-voting-item__status">
                  ${platform.active ? 'Active' : 'Inactive'}
                </span>

              </div>

              <span class="admin-voting-item__platform">
                ${platform.platform}
              </span>

              <span class="admin-voting-item__meta">
                ${platform.vote_type} · Priority ${platform.priority}
              </span>

            </div>

            <div class="admin-voting-item__actions">

              <button
                class="btn btn-secondary"
                type="button"
                data-edit-voting="${platform.id}"
              >
                Edit
              </button>

              <button
                class="btn btn-secondary"
                type="button"
                data-delete-voting="${platform.id}"
              >
                Delete
              </button>

            </div>

          </article>
        `;
      })
      .join('');


    // ================================
    // EDIT VOTING
    // ================================

    const editVotingButtons =
      document.querySelectorAll(
        '[data-edit-voting]'
      );


    editVotingButtons.forEach(
      (button) => {
        button.addEventListener(
          'click',
          async () => {
            const votingId =
              Number(
                button.dataset
                  .editVoting
              );


            const platform =
              platforms.find(
                (item) =>
                  item.id ===
                  votingId
              );


            if (!platform) {
              return;
            }


            const startDateValue =
              platform.start_date
                ? new Date(
                    platform.start_date
                  )
                    .toISOString()
                    .slice(0, 16)
                : '';


            const deadlineValue =
              platform.deadline
                ? new Date(
                    platform.deadline
                  )
                    .toISOString()
                    .slice(0, 16)
                : '';


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      VOTING
                    </span>

                    <h3 class="admin-section-header__title">
                      Edit Voting
                    </h3>

                    <p class="admin-section-header__description">
                      Update this voting opportunity. Translations are generated automatically from English.
                    </p>

                  </div>

                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelEditVoting"
                  >
                    ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminEditVotingForm"
                >

                  <label>
                    <span>
                      Event name — English
                    </span>

                    <input
                      type="text"
                      name="event"
                      value="${
                        platform.event ??
                        ''
                      }"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Platform
                    </span>

                    <input
                      type="text"
                      name="platform"
                      value="${
                        platform.platform ??
                        ''
                      }"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Voting URL
                    </span>

                    <input
                      type="url"
                      name="url"
                      value="${
                        platform.url ??
                        ''
                      }"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Voting type
                    </span>

                    <select
                      name="vote_type"
                      required
                    >

                      <option
                        value="ceremony"
                        ${
                          platform.vote_type ===
                          'ceremony'
                            ? 'selected'
                            : ''
                        }
                      >
                        Awards & Ceremonies
                      </option>

                      <option
                        value="poll"
                        ${
                          platform.vote_type ===
                          'poll'
                            ? 'selected'
                            : ''
                        }
                      >
                        Poll
                      </option>

                      <option
                        value="advertising"
                        ${
                          platform.vote_type ===
                          'advertising'
                            ? 'selected'
                            : ''
                        }
                      >
                        Advertising
                      </option>

                    </select>
                  </label>


                  <label>
                    <span>
                      Priority
                    </span>

                    <select
                      name="priority"
                      required
                    >

                      <option
                        value="1"
                        ${
                          platform.priority ===
                          1
                            ? 'selected'
                            : ''
                        }
                      >
                        Urgent
                      </option>

                      <option
                        value="2"
                        ${
                          platform.priority ===
                          2
                            ? 'selected'
                            : ''
                        }
                      >
                        High
                      </option>

                      <option
                        value="3"
                        ${
                          platform.priority ===
                          3
                            ? 'selected'
                            : ''
                        }
                      >
                        Normal
                      </option>

                    </select>
                  </label>


                  <label>
                    <span>
                      Accent
                    </span>

                    <select
                      name="accent"
                    >

                      <option
                        value="lmsy"
                        ${
                          platform.accent ===
                          'lmsy'
                            ? 'selected'
                            : ''
                        }
                      >
                        LMSY
                      </option>

                      <option
                        value="lookmhee"
                        ${
                          platform.accent ===
                          'lookmhee'
                            ? 'selected'
                            : ''
                        }
                      >
                        Lookmhee
                      </option>

                      <option
                        value="sonya"
                        ${
                          platform.accent ===
                          'sonya'
                            ? 'selected'
                            : ''
                        }
                      >
                        Sonya
                      </option>

                    </select>
                  </label>


                  <label>
                    <span>
                      Start Date
                    </span>

                    <input
                      type="datetime-local"
                      name="start_date"
                      value="${startDateValue}"
                    />
                  </label>


                  <label>
                    <span>
                      Deadline
                    </span>

                    <input
                      type="datetime-local"
                      name="deadline"
                      value="${deadlineValue}"
                    />
                  </label>


                  <label>
                    <span>
                      Frequency — English
                    </span>

                    <input
                      type="text"
                      name="frequency"
                      value="${
                        platform.frequency ??
                        ''
                      }"
                    />
                  </label>


                  <label>
                    <span>
                      Tutorial URL
                    </span>

                    <input
                      type="url"
                      name="tutorial_url"
                      value="${
                        platform.tutorial_url ??
                        ''
                      }"
                    />
                  </label>


                  <label>
                    <span>
                      Sort order
                    </span>

                    <input
                      type="number"
                      name="sort_order"
                      value="${
                        platform.sort_order ??
                        0
                      }"
                    />
                  </label>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      ${
                        platform.active
                          ? 'checked'
                          : ''
                      }
                    />

                    <span>
                      Active
                    </span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save & Translate
                  </button>

                </form>

              </div>
            `;


            const cancelEditVoting =
              document.querySelector(
                '#cancelEditVoting'
              );


            cancelEditVoting
              .addEventListener(
                'click',
                () => {
                  loadVotingAdminSection();
                }
              );


            const adminEditVotingForm =
              document.querySelector(
                '#adminEditVotingForm'
              );


            adminEditVotingForm
              .addEventListener(
                'submit',
                async (event) => {
                  event.preventDefault();


                  const formData =
                    new FormData(
                      adminEditVotingForm
                    );


                  const votingData = {
                    event:
                      formData
                        .get('event')
                        .trim(),

                    platform:
                      formData
                        .get('platform')
                        .trim(),

                    url:
                      formData
                        .get('url')
                        .trim(),

                    vote_type:
                      formData.get(
                        'vote_type'
                      ),

                    priority:
                      Number(
                        formData.get(
                          'priority'
                        )
                      ),

                    accent:
                      formData.get(
                        'accent'
                      ),

                    start_date:
                      formData.get(
                        'start_date'
                      ) || null,

                    deadline:
                      formData.get(
                        'deadline'
                      ) || null,

                    frequency:
                      formData
                        .get(
                          'frequency'
                        )
                        .trim() ||
                      null,

                    tutorial_url:
                      formData
                        .get(
                          'tutorial_url'
                        )
                        .trim() ||
                      null,

                    sort_order:
                      Number(
                        formData.get(
                          'sort_order'
                        )
                      ) || 0,

                    active:
                      formData.get(
                        'active'
                      ) === 'on',
                  };


                  const saveChangesButton =
                    adminEditVotingForm
                      .querySelector(
                        'button[type="submit"]'
                      );


                  try {
                    saveChangesButton.disabled =
                      true;


                    saveChangesButton.textContent =
                      'Saving & Translating...';


                    await updateVotingPlatform(
                      votingId,
                      votingData
                    );


                    const {
                      data:
                        translationData,

                      error:
                        translationError,
                    } =
                      await supabase
                        .functions
                        .invoke(
                          'translate-content',
                          {
                            body: {
  fields: {
    frequency:
      votingData.frequency ??
      '',
  },
},
                          }
                        );


                    if (
                      translationError
                    ) {
                      throw translationError;
                    }


                    if (
                      !translationData
                        ?.translations
                    ) {
                      throw new Error(
                        'Translation service returned no translations.'
                      );
                    }

                    const normalizedTranslations =
                      Object.fromEntries(
                        Object.entries(
                          translationData.translations
                        ).map(
                          ([language, fields]) => [
                            language,
                            {
                              frequency:
                                votingData.frequency
                                  ? fields.frequency ?? ''
                                  : '',
                            },
                          ]
                        )
                      );


                    await saveTranslations(
  'voting',
  votingId,
  normalizedTranslations
);


                    await loadPublicVotingPlatforms();


                    await loadPublicTutorials();


                    saveChangesButton.textContent =
                      'Saved ✓';


                    setTimeout(
                      async () => {
                        await loadVotingAdminSection();
                      },
                      700
                    );

                  } catch (error) {
                    saveChangesButton.disabled =
                      false;


                    saveChangesButton.textContent =
                      'Save & Translate';


                    console.error(
                      'Unable to update voting platform:',
                      error
                    );
                  }
                }
              );
          }
        );
      }
    );

        // ================================
    // DELETE VOTING
    // ================================

    const deleteVotingButtons =
      document.querySelectorAll(
        '[data-delete-voting]'
      );


    deleteVotingButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const votingId =
              Number(
                button.dataset.deleteVoting
              );


            const platform =
              platforms.find(
                (item) =>
                  item.id === votingId
              );


            if (!platform) {
              return;
            }


            const confirmed =
              window.confirm(
                `Delete "${platform.event}"?\n\nThis action cannot be undone.`
              );


            if (!confirmed) {
              return;
            }


            try {
              button.disabled =
                true;

              button.textContent =
                'Deleting...';


              // ================================
              // DELETE VOTING TRANSLATIONS
              // ================================

              const {
                error:
                  translationsDeleteError,
              } =
                await supabase
                  .from(
                    'lmsy_translations'
                  )
                  .delete()
                  .eq(
                    'content_type',
                    'voting'
                  )
                  .eq(
                    'content_id',
                    votingId
                  );


              if (
                translationsDeleteError
              ) {
                throw translationsDeleteError;
              }


              // ================================
              // DELETE VOTING
              // ================================

              await deleteVotingPlatform(
                votingId
              );


              // ================================
              // REFRESH
              // ================================

              await loadVotingAdminSection();

              await loadPublicVotingPlatforms();

              await loadPublicTutorials();


            } catch (error) {
              button.disabled =
                false;

              button.textContent =
                'Delete';


              console.error(
                'Unable to delete voting platform:',
                error
              );
            }
          }
        );
      }
    );


  } catch (error) {

    adminVotingList.innerHTML = `
      <p class="admin-panel__placeholder">
        Unable to load voting platforms.
      </p>
    `;


    console.error(
      'Unable to load voting platforms:',
      error
    );
  }
}

// ================================
// TUTORIALS ADMIN
// ================================

async function loadTutorialAdminSection() {
  adminPanelBody.innerHTML = `
    <div class="admin-section-header">

      <div>
        <h3 class="admin-section-header__title">
          Tutorials
        </h3>

        <p class="admin-section-header__description">
          Manage video and external voting tutorials.
        </p>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        id="addTutorialButton"
      >
        + Add Tutorial
      </button>

    </div>

    <div id="adminTutorialList">

      <p class="admin-panel__placeholder">
        Loading tutorials...
      </p>

    </div>
  `;

  const adminTutorialList =
    document.querySelector('#adminTutorialList');

  const addTutorialButton =
    document.querySelector('#addTutorialButton');

    // ================================
  // ADD TUTORIAL
  // ================================

  addTutorialButton.addEventListener('click', () => {
    adminPanelBody.innerHTML = `
      <div class="admin-form-view">

        <div class="admin-form-view__header">

          <div>
            <span class="eyebrow">
              TUTORIALS
            </span>

            <h2 class="section-title">
              Learn How to Vote
            </h2>

            <p class="section-description">
              Find step-by-step voting guides, videos and external tutorials.
            </p>
          </div>

          <button
            class="btn btn-secondary"
            type="button"
            id="cancelAddTutorial"
          >
            ← Cancel
          </button>

        </div>

        <form
          class="admin-voting-form"
          id="adminTutorialForm"
        >

          <label>
            <span>Title — English</span>

            <input
              type="text"
              name="title"
              required
            />
          </label>

          <label>
            <span>Tutorial type</span>

            <select
              name="tutorial_type"
              required
            >
              <option value="youtube">
                YouTube
              </option>

              <option value="x">
                X / Twitter
              </option>

              <option value="drive">
                Google Drive
              </option>

              <option value="instagram">
                Instagram
              </option>

              <option value="tiktok">
                TikTok
              </option>

              <option value="external">
                Other / External
              </option>
            </select>
          </label>

          <label>
            <span>Tutorial URL</span>

            <input
              type="url"
              name="tutorial_url"
              required
            />
          </label>

          <label>
            <span>Sort order</span>

            <input
              type="number"
              name="sort_order"
              value="0"
            />
          </label>

          <label style="grid-column: 1 / -1;">
            <span>Description — English</span>

            <textarea
              name="description"
              rows="4"
            ></textarea>
          </label>

          <label>
            <input
              type="checkbox"
              name="active"
              checked
            />

            <span>Active</span>
          </label>

          <button
            class="btn btn-primary"
            type="submit"
          >
            Save & Translate
          </button>

        </form>

      </div>
    `;

    const cancelAddTutorial =
      document.querySelector('#cancelAddTutorial');

    cancelAddTutorial.addEventListener('click', () => {
      loadTutorialAdminSection();
    });


    const adminTutorialForm =
      document.querySelector('#adminTutorialForm');

    adminTutorialForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const formData =
          new FormData(adminTutorialForm);

        const tutorialData = {
          title:
            formData.get('title').trim(),

          tutorial_type:
            formData.get('tutorial_type'),

          tutorial_url:
            formData.get('tutorial_url').trim(),

          description:
            formData.get('description').trim() || null,

          sort_order:
            Number(formData.get('sort_order')) || 0,

          active:
            formData.get('active') === 'on',
        };


        const saveTutorialButton =
          adminTutorialForm.querySelector(
            'button[type="submit"]'
          );


        try {
          saveTutorialButton.disabled = true;

          saveTutorialButton.textContent =
            'Saving & Translating...';


          // ================================
          // CREATE TUTORIAL
          // ================================

          const createdTutorial =
            await createTutorial(
              tutorialData
            );


          // ================================
          // AUTO TRANSLATE
          // ================================

          saveTutorialButton.textContent =
            'Translating...';


          const {
            data:
              translationData,

            error:
              translationError,
          } =
            await supabase
              .functions
              .invoke(
                'translate-content',
                {
                  body: {
                    fields: {
                      title:
                        tutorialData.title,

                      description:
                        tutorialData.description ??
                        '',
                    },
                  },
                }
              );


          if (translationError) {
            throw translationError;
          }


          if (
            !translationData
              ?.translations
          ) {
            throw new Error(
              'Translation service returned no translations.'
            );
          }


          // ================================
          // NORMALIZE TRANSLATIONS
          // ================================

          const normalizedTranslations =
            Object.fromEntries(
              Object.entries(
                translationData.translations
              ).map(
                (
                  [
                    language,
                    fields,
                  ]
                ) => [
                  language,
                  {
                    title:
                      fields.title ??
                      '',

                    description:
                      tutorialData.description
                        ? (
                            fields.description ??
                            ''
                          )
                        : '',
                  },
                ]
              )
            );


          // ================================
          // SAVE TRANSLATIONS
          // ================================

          await saveTranslations(
            'tutorial',
            createdTutorial.id,
            normalizedTranslations
          );


          // ================================
          // REFRESH ADMIN + PUBLIC
          // ================================

          saveTutorialButton.textContent =
            'Saved ✓';


          await loadTutorialAdminSection();

          await loadPublicTutorials();


        } catch (error) {
          saveTutorialButton.disabled =
            false;

          saveTutorialButton.textContent =
            'Save & Translate';


          console.error(
            'Unable to create tutorial:',
            error
          );
        }
      }
    );
  });


// ================================
// LOAD TUTORIALS
// ================================

try {
  const tutorials =
    await getTutorials();

  const votingPlatforms =
    await getVotingPlatforms();

  const votingTutorials =
    votingPlatforms
      .filter(
        (platform) =>
          platform.tutorial_url
      )
      .map((platform) => {
        return {
          id: `voting-${platform.id}`,

          title:
            platform.event,

          description:
            `Voting guide for ${platform.platform}.`,

          tutorial_url:
            platform.tutorial_url,

          tutorial_type:
            detectTutorialType(
              platform.tutorial_url
            ),

          sort_order:
            platform.sort_order ?? 0,

          active:
            platform.active,

          source:
            'voting',

          voting_id:
            platform.id,
        };
      });

  const combinedTutorials = [
    ...tutorials.map((tutorial) => ({
      ...tutorial,
      source: 'manual',
    })),
    ...votingTutorials,
  ];

  if (combinedTutorials.length === 0) {
  adminTutorialList.innerHTML = `
    <p class="admin-panel__placeholder">
      No tutorials yet.
    </p>
  `;

  return;
}

adminTutorialList.innerHTML = combinedTutorials
  .map((tutorial) => {
      return `
        <article
          class="admin-voting-item"
          data-tutorial-id="${tutorial.id}"
        >

          <div class="admin-voting-item__info">

            <div class="admin-voting-item__top">

              <strong class="admin-voting-item__event">
                ${tutorial.title}
              </strong>

              <span class="admin-voting-item__status">
                ${tutorial.active ? 'Active' : 'Inactive'}
              </span>

            </div>

            <span class="admin-voting-item__platform">
              ${getTutorialTypeLabel(tutorial.tutorial_type)}
            </span>

            ${
              tutorial.description
                ? `
                  <span class="admin-voting-item__meta">
                    ${tutorial.description}
                  </span>
                `
                : ''
            }

          </div>

          <div class="admin-voting-item__actions">

  ${
    tutorial.source === 'voting'
      ? `
        <button
          class="btn btn-secondary"
          type="button"
          data-edit-voting-from-tutorial="${tutorial.voting_id}"
        >
          Edit Voting
        </button>
      `
      : `
        <button
          class="btn btn-secondary"
          type="button"
          data-edit-tutorial="${tutorial.id}"
        >
          Edit
        </button>

        <button
          class="btn btn-secondary"
          type="button"
          data-delete-tutorial="${tutorial.id}"
        >
          Delete
        </button>
      `
  }

</div>

        </article>
      `;
    })
    .join('');


    // ================================
  // EDIT TUTORIAL
  // ================================

  const editTutorialButtons =
    document.querySelectorAll('[data-edit-tutorial]');

  editTutorialButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tutorialId =
        Number(button.dataset.editTutorial);

      const tutorial =
        tutorials.find((item) => item.id === tutorialId);

      if (!tutorial) {
        return;
      }

      adminPanelBody.innerHTML = `
        <div class="admin-form-view">

          <div class="admin-form-view__header">

            <div>
              <span class="eyebrow">
                TUTORIALS
              </span>

              <h3 class="admin-section-header__title">
                Edit Tutorial
              </h3>

              <p class="admin-section-header__description">
                Update this tutorial. Title and description translations are generated automatically from English.
              </p>
            </div>

            <button
              class="btn btn-secondary"
              type="button"
              id="cancelEditTutorial"
            >
              ← Cancel
            </button>

          </div>

          <form
            class="admin-voting-form"
            id="adminEditTutorialForm"
          >

            <label>
              <span>Title — English</span>

              <input
                type="text"
                name="title"
                value="${tutorial.title ?? ''}"
                required
              />
            </label>

            <label>
              <span>Tutorial type</span>

              <select
                name="tutorial_type"
                required
              >

                <option
                  value="youtube"
                  ${tutorial.tutorial_type === 'youtube' ? 'selected' : ''}
                >
                  YouTube
                </option>

                <option
                  value="x"
                  ${tutorial.tutorial_type === 'x' ? 'selected' : ''}
                >
                  X / Twitter
                </option>

                <option
                  value="drive"
                  ${tutorial.tutorial_type === 'drive' ? 'selected' : ''}
                >
                  Google Drive
                </option>

                <option
                  value="instagram"
                  ${tutorial.tutorial_type === 'instagram' ? 'selected' : ''}
                >
                  Instagram
                </option>

                <option
                  value="tiktok"
                  ${tutorial.tutorial_type === 'tiktok' ? 'selected' : ''}
                >
                  TikTok
                </option>

                <option
                  value="external"
                  ${tutorial.tutorial_type === 'external' ? 'selected' : ''}
                >
                  Other / External
                </option>

              </select>
            </label>

            <label>
              <span>Tutorial URL</span>

              <input
                type="url"
                name="tutorial_url"
                value="${tutorial.tutorial_url ?? ''}"
                required
              />
            </label>

            <label>
              <span>Sort order</span>

              <input
                type="number"
                name="sort_order"
                value="${tutorial.sort_order ?? 0}"
              />
            </label>

            <label style="grid-column: 1 / -1;">
              <span>Description — English</span>

              <textarea
                name="description"
                rows="4"
              >${tutorial.description ?? ''}</textarea>
            </label>

            <label>
              <input
                type="checkbox"
                name="active"
                ${tutorial.active ? 'checked' : ''}
              />

              <span>Active</span>
            </label>

            <button
              class="btn btn-primary"
              type="submit"
            >
              Save & Translate
            </button>

          </form>

        </div>
      `;

      const cancelEditTutorial =
        document.querySelector('#cancelEditTutorial');

      cancelEditTutorial.addEventListener('click', () => {
        loadTutorialAdminSection();
      });


      const adminEditTutorialForm =
        document.querySelector('#adminEditTutorialForm');

      adminEditTutorialForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();

          const formData =
            new FormData(adminEditTutorialForm);

          const tutorialData = {
            title:
              formData.get('title').trim(),

            tutorial_type:
              formData.get('tutorial_type'),

            tutorial_url:
              formData.get('tutorial_url').trim(),

            description:
              formData.get('description').trim() || null,

            sort_order:
              Number(formData.get('sort_order')) || 0,

            active:
              formData.get('active') === 'on',
          };

          const saveChangesButton =
            adminEditTutorialForm.querySelector(
              'button[type="submit"]'
            );

          try {
            saveChangesButton.disabled = true;
            saveChangesButton.textContent =
              'Saving & Translating...';


            // ================================
            // UPDATE TUTORIAL
            // ================================

            await updateTutorial(
              tutorialId,
              tutorialData
            );


            // ================================
            // AUTO TRANSLATE
            // ================================

            saveChangesButton.textContent =
              'Translating...';


            const {
              data: translationData,
              error: translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        title:
                          tutorialData.title,

                        description:
                          tutorialData.description ??
                          '',
                      },
                    },
                  }
                );


            if (translationError) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            // ================================
            // NORMALIZE TRANSLATIONS
            // ================================

            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  (
                    [
                      language,
                      fields,
                    ]
                  ) => [
                    language,
                    {
                      title:
                        fields.title ??
                        '',

                      description:
                        tutorialData.description
                          ? (
                              fields.description ??
                              ''
                            )
                          : '',
                    },
                  ]
                )
              );


            // ================================
            // SAVE TRANSLATIONS
            // ================================

            await saveTranslations(
              'tutorial',
              tutorialId,
              normalizedTranslations
            );


            // ================================
            // REFRESH PUBLIC
            // ================================

            await loadPublicTutorials();


            saveChangesButton.textContent =
              'Saved ✓';


            setTimeout(
              async () => {
                await loadTutorialAdminSection();
              },
              700
            );


          } catch (error) {
            saveChangesButton.disabled =
              false;

            saveChangesButton.textContent =
              'Save & Translate';

            console.error(
              'Unable to update tutorial:',
              error
            );
          }
        }
      );
    });
  });


// ================================
// DELETE TUTORIAL
// ================================

const deleteTutorialButtons =
  document.querySelectorAll(
    '[data-delete-tutorial]'
  );


deleteTutorialButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      async () => {

        const tutorialId =
          Number(
            button.dataset
              .deleteTutorial
          );


        const tutorial =
          tutorials.find(
            (item) =>
              item.id === tutorialId
          );


        if (!tutorial) {
          return;
        }


        const confirmed =
          window.confirm(
            `Delete "${tutorial.title}"?\n\nThis action cannot be undone.`
          );


        if (!confirmed) {
          return;
        }


        try {
          button.disabled =
            true;

          button.textContent =
            'Deleting...';


          // ================================
          // DELETE TUTORIAL TRANSLATIONS
          // ================================

          const {
            error:
              translationsDeleteError,
          } =
            await supabase
              .from(
                'lmsy_translations'
              )
              .delete()
              .eq(
                'content_type',
                'tutorial'
              )
              .eq(
                'content_id',
                tutorialId
              );


          if (
            translationsDeleteError
          ) {
            throw translationsDeleteError;
          }


          // ================================
          // DELETE TUTORIAL
          // ================================

          await deleteTutorial(
            tutorialId
          );


          // ================================
          // REFRESH ADMIN + PUBLIC
          // ================================

          await loadTutorialAdminSection();

          await loadPublicTutorials();


        } catch (error) {
          button.disabled =
            false;

          button.textContent =
            'Delete';


          console.error(
            'Unable to delete tutorial:',
            error
          );
        }
      }
    );
  }
);


// ================================
// EDIT VOTING FROM TUTORIAL
// ================================

const editVotingFromTutorialButtons =
  document.querySelectorAll(
    '[data-edit-voting-from-tutorial]'
  );


editVotingFromTutorialButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      async () => {

        const votingId =
          Number(
            button.dataset
              .editVotingFromTutorial
          );


        const platforms =
          await getVotingPlatforms();


        const platform =
          platforms.find(
            (item) =>
              item.id === votingId
          );


        if (!platform) {
          return;
        }


        await loadVotingAdminSection();


        const editVotingButton =
          document.querySelector(
            `[data-edit-voting="${votingId}"]`
          );


        editVotingButton?.click();
      }
    );
  }
);


} catch (error) {
  adminTutorialList.innerHTML = `
    <p class="admin-panel__placeholder">
      Unable to load tutorials.
    </p>
  `;


  console.error(
    'Unable to load tutorials:',
    error
  );
}
}

// ================================
// SUPPORT ADMIN
// ================================

async function loadSupportAdminSection() {
  adminPanelBody.innerHTML = `
    <div class="admin-section-header">

      <div>
        <h3 class="admin-section-header__title">
          Support
        </h3>

        <p class="admin-section-header__description">
          Manage voting funds, progress and donation information.
        </p>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        id="addSupportButton"
      >
        + Add Fund
      </button>

    </div>

    <div id="adminSupportList">
      <p class="admin-panel__placeholder">
        Loading support funds...
      </p>
    </div>
  `;


  const adminSupportList =
    document.querySelector('#adminSupportList');

  const addSupportButton =
    document.querySelector('#addSupportButton');


    // ================================
  // ADD SUPPORT FUND
  // ================================

  addSupportButton.addEventListener(
    'click',
    () => {
      adminPanelBody.innerHTML = `
        <div class="admin-form-view">

          <div class="admin-form-view__header">

            <div>

              <span class="eyebrow">
                SUPPORT
              </span>

              <h3 class="admin-section-header__title">
                Add Voting Fund
              </h3>

              <p class="admin-section-header__description">
                Create a new support fund. Title and description translations are generated automatically from English.
              </p>

            </div>

            <button
              class="btn btn-secondary"
              type="button"
              id="cancelAddSupport"
            >
              ← Cancel
            </button>

          </div>


          <form
            class="admin-voting-form"
            id="adminSupportForm"
          >

            <label>
              <span>
                Fund Title — English
              </span>

              <input
                type="text"
                name="title"
                placeholder="LMSY Voting Fund"
                required
              />
            </label>


            <label
              style="
                grid-column: 1 / -1;
              "
            >
              <span>
                Description — English
              </span>

              <textarea
                name="description"
                rows="4"
                placeholder="Explain what this voting fund will be used for."
              ></textarea>
            </label>


            <label>
              <span>
                Raised Amount
              </span>

              <input
                type="number"
                name="raised_amount"
                min="0"
                step="0.01"
                value="0"
              />
            </label>


            <label>
              <span>
                Goal Amount
              </span>

              <input
                type="number"
                name="goal_amount"
                min="0"
                step="0.01"
                value="0"
              />
            </label>


            <label
              style="
                grid-column: 1 / -1;
              "
            >
              <span>
                Donation QR
              </span>

              <input
                type="file"
                name="qr_image"
                accept="image/png, image/jpeg, image/webp"
              />

              <small>
                Optional. Upload a PNG, JPG or WebP QR image.
              </small>
            </label>


            <label>

              <input
                type="checkbox"
                name="active"
                checked
              />

              <span>
                Active
              </span>

            </label>


            <button
              class="btn btn-primary"
              type="submit"
            >
              Save & Translate
            </button>

          </form>

        </div>
      `;


      const cancelAddSupport =
        document.querySelector(
          '#cancelAddSupport'
        );


      cancelAddSupport.addEventListener(
        'click',
        () => {
          loadSupportAdminSection();
        }
      );


      const adminSupportForm =
        document.querySelector(
          '#adminSupportForm'
        );


      adminSupportForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();


          const formData =
            new FormData(
              adminSupportForm
            );


          const qrImage =
            formData.get(
              'qr_image'
            );


          const saveSupportButton =
            adminSupportForm.querySelector(
              'button[type="submit"]'
            );


          try {
            saveSupportButton.disabled =
              true;

            saveSupportButton.textContent =
              'Saving & Translating...';


            let qrImageUrl =
              null;


            // ================================
            // UPLOAD QR
            // ================================

            if (
              qrImage &&
              qrImage.size > 0
            ) {
              saveSupportButton.textContent =
                'Uploading QR...';


              qrImageUrl =
                await uploadSupportQr(
                  qrImage
                );
            }


            // ================================
            // BASE FUND DATA
            // ================================

            const supportData = {
              title:
                formData
                  .get('title')
                  .trim(),

              description:
                formData
                  .get('description')
                  .trim() ||
                null,

              raised_amount:
                Number(
                  formData.get(
                    'raised_amount'
                  )
                ) || 0,

              goal_amount:
                Number(
                  formData.get(
                    'goal_amount'
                  )
                ) || 0,

              qr_image_url:
                qrImageUrl,

              active:
                formData.get(
                  'active'
                ) === 'on',
            };


            // ================================
            // CREATE FUND
            // ================================

            saveSupportButton.textContent =
              'Saving fund...';


            const createdSupport =
              await createDonationSetting(
                supportData
              );


            // ================================
            // AUTO TRANSLATE
            // ================================

            saveSupportButton.textContent =
              'Translating...';


            const {
              data:
                translationData,

              error:
                translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        title:
                          supportData.title,

                        description:
                          supportData.description ??
                          '',
                      },
                    },
                  }
                );


            if (
              translationError
            ) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            // ================================
            // NORMALIZE TRANSLATIONS
            // ================================

            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  (
                    [
                      language,
                      fields,
                    ]
                  ) => [
                    language,
                    {
                      title:
                        fields.title ??
                        '',

                      description:
                        supportData.description
                          ? (
                              fields.description ??
                              ''
                            )
                          : '',
                    },
                  ]
                )
              );


            // ================================
            // SAVE TRANSLATIONS
            // ================================

            await saveTranslations(
              'support',
              createdSupport.id,
              normalizedTranslations
            );


            // ================================
            // REFRESH
            // ================================

            await loadPublicSupport();


            saveSupportButton.textContent =
              'Saved ✓';


            setTimeout(
              async () => {
                await loadSupportAdminSection();
              },
              700
            );


          } catch (error) {
            saveSupportButton.disabled =
              false;

            saveSupportButton.textContent =
              'Save & Translate';


            console.error(
              'Unable to create support fund:',
              error
            );
          }
        }
      );
    }
  );

  // ================================
  // LOAD SUPPORT DATA
  // ================================

  try {
    const settings =
      await getDonationSettings();

    const donationLinks =
      await getDonationLinks();


    if (settings.length === 0) {
      adminSupportList.innerHTML = `
        <p class="admin-panel__placeholder">
          No support funds created yet.
        </p>
      `;

      return;
    }


    // ================================
// RENDER SUPPORT FUNDS
// ================================

adminSupportList.innerHTML = settings
  .map((support) => {

    const fundLinks =
      donationLinks.filter(
        (link) =>
          link.fund_id === support.id
      );


    return `
      <div class="admin-support-fund">

        <article
          class="admin-voting-item admin-support-fund__main"
          data-support-id="${support.id}"
        >

          <div class="admin-voting-item__info">

            <div class="admin-voting-item__top">

              <strong class="admin-voting-item__event">
                ${support.title || 'Voting Fund'}
              </strong>

              <span class="admin-voting-item__status">
                ${support.active ? 'Active' : 'Inactive'}
              </span>

            </div>


            <span class="admin-voting-item__platform">
              Raised:
              ${formatSupportAmount(
                support.raised_amount
              )}
            </span>


            <span class="admin-voting-item__meta">
              Goal:
              ${formatSupportAmount(
                support.goal_amount
              )}
            </span>

          </div>


          <div class="admin-voting-item__actions">

            <button
              class="btn btn-secondary"
              type="button"
              data-add-donation-link="${support.id}"
            >
              + Donation Link
            </button>

            <button
              class="btn btn-secondary"
              type="button"
              data-edit-support="${support.id}"
            >
              Edit
            </button>

            <button
              class="btn btn-secondary"
              type="button"
              data-delete-support="${support.id}"
            >
              Delete
            </button>

          </div>

        </article>


        <div class="admin-support-links">

          <span class="admin-support-links__title">
            DONATION LINKS
          </span>

          ${
            fundLinks.length > 0
              ? fundLinks
                  .map((link) => {
                    return `
                      <article
                        class="admin-voting-item admin-support-link"
                        data-donation-link-id="${link.id}"
                      >

                        <div class="admin-voting-item__info">

                          <div class="admin-voting-item__top">

                            <strong class="admin-voting-item__event">
                              ${link.label}
                            </strong>

                            <span class="admin-voting-item__status">
                              ${link.active ? 'Active' : 'Inactive'}
                            </span>

                          </div>

                          <span class="admin-voting-item__platform">
                            ${link.url}
                          </span>

                          <span class="admin-voting-item__meta">
                            Sort order: ${link.sort_order ?? 0}
                          </span>

                        </div>


                        <div class="admin-voting-item__actions">

                          <button
                            class="btn btn-secondary"
                            type="button"
                            data-edit-donation-link="${link.id}"
                          >
                            Edit
                          </button>

                          <button
                            class="btn btn-secondary"
                            type="button"
                            data-delete-donation-link="${link.id}"
                          >
                            Delete
                          </button>

                        </div>

                      </article>
                    `;
                  })
                  .join('')
              : `
                  <p class="admin-support-links__empty">
                    No donation links for this fund.
                  </p>
                `
          }

        </div>

      </div>
    `;
  })
  .join('');

    // ================================
    // ADD DONATION LINK
    // ================================

    const addDonationLinkButtons =
      document.querySelectorAll(
        '[data-add-donation-link]'
      );


    addDonationLinkButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const fundId =
              Number(
                button.dataset
                  .addDonationLink
              );

            const fund =
              settings.find(
                (item) =>
                  item.id === fundId
              );


            if (!fund) {
              return;
            }


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      SUPPORT
                    </span>

                    <h3 class="admin-section-header__title">
                      Add Donation Link
                    </h3>

                    <p class="admin-section-header__description">
                      Add a donation option for ${fund.title || 'this fund'}.
                    </p>

                  </div>


                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelAddDonationLink"
                  >
                  ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminDonationLinkForm"
                >

                  <label>
                    <span>Button Label</span>

                    <input
                      type="text"
                      name="label"
                      placeholder="Donate via PayPal"
                      required
                    />
                  </label>


                  <label>
                    <span>Donation URL</span>

                    <input
                      type="url"
                      name="url"
                      placeholder="https://..."
                      required
                    />
                  </label>


                  <label>
                    <span>Sort order</span>

                    <input
                      type="number"
                      name="sort_order"
                      value="0"
                    />
                  </label>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      checked
                    />

                    <span>Active</span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save Donation Link
                  </button>

                </form>

              </div>
            `;


            const cancelAddDonationLink =
              document.querySelector(
                '#cancelAddDonationLink'
              );

            cancelAddDonationLink
              .addEventListener(
                'click',
                () => {
                  loadSupportAdminSection();
                }
              );


            const adminDonationLinkForm =
              document.querySelector(
                '#adminDonationLinkForm'
              );


            adminDonationLinkForm
              .addEventListener(
                'submit',
                async (event) => {
                  event.preventDefault();


                  const formData =
                    new FormData(
                      adminDonationLinkForm
                    );


                  const linkData = {
                    fund_id:
                      fundId,

                    label:
                      formData
                        .get('label')
                        .trim(),

                    url:
                      formData
                        .get('url')
                        .trim(),

                    sort_order:
                      Number(
                        formData.get(
                          'sort_order'
                        )
                      ) || 0,

                    active:
                      formData.get(
                        'active'
                      ) === 'on',
                  };


                  const saveButton =
                    adminDonationLinkForm
                      .querySelector(
                        'button[type="submit"]'
                      );


                  try {
                    saveButton.disabled =
                      true;

                    saveButton.textContent =
                      'Saving...';


                    await createDonationLink(
                      linkData
                    );


                    await loadPublicSupport();
                    await loadSupportAdminSection();

                  } catch (error) {
                    saveButton.disabled =
                      false;

                    saveButton.textContent =
                      'Save Donation Link';

                    console.error(
                      'Unable to create donation link:',
                      error
                    );
                  }
                }
              );
          }
        );
      }
    );


    // ================================
    // EDIT DONATION LINK
    // ================================

    const editDonationLinkButtons =
      document.querySelectorAll(
        '[data-edit-donation-link]'
      );


    editDonationLinkButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const linkId =
              Number(
                button.dataset
                  .editDonationLink
              );


            const link =
              donationLinks.find(
                (item) =>
                  item.id === linkId
              );


            if (!link) {
              return;
            }


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      SUPPORT
                    </span>

                    <h3 class="admin-section-header__title">
                      Edit Donation Link
                    </h3>

                    <p class="admin-section-header__description">
                      Update this donation option.
                    </p>

                  </div>


                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelEditDonationLink"
                  >
                  ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminEditDonationLinkForm"
                >

                  <label>
                    <span>Button Label</span>

                    <input
                      type="text"
                      name="label"
                      value="${link.label ?? ''}"
                      required
                    />
                  </label>


                  <label>
                    <span>Donation URL</span>

                    <input
                      type="url"
                      name="url"
                      value="${link.url ?? ''}"
                      required
                    />
                  </label>


                  <label>
                    <span>Sort order</span>

                    <input
                      type="number"
                      name="sort_order"
                      value="${link.sort_order ?? 0}"
                    />
                  </label>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      ${link.active ? 'checked' : ''}
                    />

                    <span>Active</span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save Changes
                  </button>

                </form>

              </div>
            `;


            const cancelEditDonationLink =
              document.querySelector(
                '#cancelEditDonationLink'
              );

            cancelEditDonationLink
              .addEventListener(
                'click',
                () => {
                  loadSupportAdminSection();
                }
              );


            const adminEditDonationLinkForm =
              document.querySelector(
                '#adminEditDonationLinkForm'
              );


            adminEditDonationLinkForm
              .addEventListener(
                'submit',
                async (event) => {
                  event.preventDefault();


                  const formData =
                    new FormData(
                      adminEditDonationLinkForm
                    );


                  const linkData = {
                    label:
                      formData
                        .get('label')
                        .trim(),

                    url:
                      formData
                        .get('url')
                        .trim(),

                    sort_order:
                      Number(
                        formData.get(
                          'sort_order'
                        )
                      ) || 0,

                    active:
                      formData.get(
                        'active'
                      ) === 'on',
                  };


                  const saveButton =
                    adminEditDonationLinkForm
                      .querySelector(
                        'button[type="submit"]'
                      );


                  try {
                    saveButton.disabled =
                      true;

                    saveButton.textContent =
                      'Saving...';


                    await updateDonationLink(
                      linkId,
                      linkData
                    );


                    await loadPublicSupport();


                    saveButton.textContent =
                      'Saved ✓';


                    setTimeout(
                      async () => {
                        await loadSupportAdminSection();
                      },
                      700
                    );

                  } catch (error) {
                    saveButton.disabled =
                      false;

                    saveButton.textContent =
                      'Save Changes';

                    console.error(
                      'Unable to update donation link:',
                      error
                    );
                  }
                }
              );
          }
        );
      }
    );


    // ================================
    // DELETE DONATION LINK
    // ================================

    const deleteDonationLinkButtons =
      document.querySelectorAll(
        '[data-delete-donation-link]'
      );


    deleteDonationLinkButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const linkId =
              Number(
                button.dataset
                  .deleteDonationLink
              );


            const link =
              donationLinks.find(
                (item) =>
                  item.id === linkId
              );


            if (!link) {
              return;
            }


            const confirmed =
              window.confirm(
                `Delete "${link.label}"? This action cannot be undone.`
              );


            if (!confirmed) {
              return;
            }


            try {
              button.disabled = true;
              button.textContent =
                'Deleting...';


              await deleteDonationLink(
                linkId
              );


              await loadPublicSupport();
              await loadSupportAdminSection();

            } catch (error) {
              button.disabled = false;
              button.textContent =
                'Delete';

              console.error(
                'Unable to delete donation link:',
                error
              );
            }
          }
        );
      }
    );


        // ================================
    // EDIT SUPPORT FUND
    // ================================

    const editSupportButtons =
      document.querySelectorAll(
        '[data-edit-support]'
      );


    editSupportButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const supportId =
              Number(
                button.dataset.editSupport
              );


            const support =
              settings.find(
                (item) =>
                  item.id === supportId
              );


            if (!support) {
              return;
            }


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      SUPPORT
                    </span>

                    <h3 class="admin-section-header__title">
                      Edit Voting Fund
                    </h3>

                    <p class="admin-section-header__description">
                      Update this support fund. Title and description translations are generated automatically from English.
                    </p>

                  </div>


                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelEditSupport"
                  >
                    ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminEditSupportForm"
                >

                  <label>
                    <span>
                      Fund Title — English
                    </span>

                    <input
                      type="text"
                      name="title"
                      value="${support.title ?? ''}"
                      required
                    />
                  </label>


                  <label style="grid-column: 1 / -1;">
                    <span>
                      Description — English
                    </span>

                    <textarea
                      name="description"
                      rows="4"
                    >${support.description ?? ''}</textarea>
                  </label>


                  <label>
                    <span>
                      Raised Amount
                    </span>

                    <input
                      type="number"
                      name="raised_amount"
                      min="0"
                      step="0.01"
                      value="${support.raised_amount ?? 0}"
                    />
                  </label>


                  <label>
                    <span>
                      Goal Amount
                    </span>

                    <input
                      type="number"
                      name="goal_amount"
                      min="0"
                      step="0.01"
                      value="${support.goal_amount ?? 0}"
                    />
                  </label>


                  ${
                    support.qr_image_url
                      ? `
                        <div
                          style="
                            grid-column: 1 / -1;
                          "
                        >

                          <span
                            style="
                              display: block;
                              margin-bottom: 8px;
                              font-weight: 600;
                            "
                          >
                            Current QR
                          </span>

                          <img
                            src="${support.qr_image_url}"
                            alt="${support.title || 'Voting Fund'} QR"
                            style="
                              width: 150px;
                              height: 150px;
                              object-fit: contain;
                              padding: 8px;
                              background: #ffffff;
                              border: 1px solid var(--color-border);
                              border-radius: 16px;
                              display: block;
                            "
                          />

                        </div>
                      `
                      : ''
                  }


                  <label style="grid-column: 1 / -1;">

                    <span>
                      ${
                        support.qr_image_url
                          ? 'Upload New QR'
                          : 'Donation QR'
                      }
                    </span>

                    <input
                      type="file"
                      name="qr_image"
                      accept="image/png, image/jpeg, image/webp"
                    />

                    <small>
                      ${
                        support.qr_image_url
                          ? 'Leave empty to keep the current QR.'
                          : 'Optional. Upload a PNG, JPG or WebP QR image.'
                      }
                    </small>

                  </label>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      ${support.active ? 'checked' : ''}
                    />

                    <span>
                      Active
                    </span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save & Translate
                  </button>

                </form>

              </div>
            `;


            const cancelEditSupport =
              document.querySelector(
                '#cancelEditSupport'
              );


            cancelEditSupport.addEventListener(
              'click',
              () => {
                loadSupportAdminSection();
              }
            );


            const adminEditSupportForm =
              document.querySelector(
                '#adminEditSupportForm'
              );


            adminEditSupportForm.addEventListener(
              'submit',
              async (event) => {
                event.preventDefault();


                const formData =
                  new FormData(
                    adminEditSupportForm
                  );


                const newQrImage =
                  formData.get(
                    'qr_image'
                  );


                const saveChangesButton =
                  adminEditSupportForm.querySelector(
                    'button[type="submit"]'
                  );


                try {
                  saveChangesButton.disabled =
                    true;

                  saveChangesButton.textContent =
                    'Saving & Translating...';


                  let qrImageUrl =
                    support.qr_image_url ||
                    null;


                  // ================================
                  // UPLOAD NEW QR
                  // ================================

                  if (
                    newQrImage &&
                    newQrImage.size > 0
                  ) {
                    saveChangesButton.textContent =
                      'Uploading QR...';


                    qrImageUrl =
                      await uploadSupportQr(
                        newQrImage,
                        supportId
                      );
                  }


                  // ================================
                  // BASE FUND DATA
                  // ================================

                  const supportData = {
                    title:
                      formData
                        .get('title')
                        .trim(),

                    description:
                      formData
                        .get('description')
                        .trim() ||
                      null,

                    raised_amount:
                      Number(
                        formData.get(
                          'raised_amount'
                        )
                      ) || 0,

                    goal_amount:
                      Number(
                        formData.get(
                          'goal_amount'
                        )
                      ) || 0,

                    qr_image_url:
                      qrImageUrl,

                    active:
                      formData.get(
                        'active'
                      ) === 'on',
                  };


                  // ================================
                  // UPDATE FUND
                  // ================================

                  saveChangesButton.textContent =
                    'Saving changes...';


                  await updateDonationSetting(
                    supportId,
                    supportData
                  );


                  // ================================
                  // AUTO TRANSLATE
                  // ================================

                  saveChangesButton.textContent =
                    'Translating...';


                  const {
                    data:
                      translationData,

                    error:
                      translationError,
                  } =
                    await supabase
                      .functions
                      .invoke(
                        'translate-content',
                        {
                          body: {
                            fields: {
                              title:
                                supportData.title,

                              description:
                                supportData.description ??
                                '',
                            },
                          },
                        }
                      );


                  if (
                    translationError
                  ) {
                    throw translationError;
                  }


                  if (
                    !translationData
                      ?.translations
                  ) {
                    throw new Error(
                      'Translation service returned no translations.'
                    );
                  }


                  // ================================
                  // NORMALIZE TRANSLATIONS
                  // ================================

                  const normalizedTranslations =
                    Object.fromEntries(
                      Object.entries(
                        translationData.translations
                      ).map(
                        (
                          [
                            language,
                            fields,
                          ]
                        ) => [
                          language,
                          {
                            title:
                              fields.title ??
                              '',

                            description:
                              supportData.description
                                ? (
                                    fields.description ??
                                    ''
                                  )
                                : '',
                          },
                        ]
                      )
                    );


                  // ================================
                  // SAVE TRANSLATIONS
                  // ================================

                  await saveTranslations(
                    'support',
                    supportId,
                    normalizedTranslations
                  );


                  // ================================
                  // REFRESH
                  // ================================

                  await loadPublicSupport();


                  saveChangesButton.textContent =
                    'Saved ✓';


                  setTimeout(
                    async () => {
                      await loadSupportAdminSection();
                    },
                    700
                  );


                } catch (error) {
                  saveChangesButton.disabled =
                    false;

                  saveChangesButton.textContent =
                    'Save & Translate';


                  console.error(
                    'Unable to update support fund:',
                    error
                  );
                }
              }
            );
          }
        );
      }
    );


    // ================================
    // DELETE SUPPORT FUND
    // ================================

    const deleteSupportButtons =
      document.querySelectorAll(
        '[data-delete-support]'
      );


    deleteSupportButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const supportId =
              Number(
                button.dataset
                  .deleteSupport
              );


            const support =
              settings.find(
                (item) =>
                  item.id === supportId
              );


            if (!support) {
              return;
            }


            const confirmed =
              window.confirm(
                `Delete "${support.title || 'Voting Fund'}"? This will also delete its donation links.`
              );


            if (!confirmed) {
              return;
            }


            try {
              button.disabled = true;

              button.textContent =
                'Deleting...';


              // ================================
              // DELETE SUPPORT TRANSLATIONS
              // ================================

              const {
                error:
                  translationDeleteError,
              } =
                await supabase
                  .from(
                    'lmsy_translations'
                  )
                  .delete()
                  .eq(
                    'content_type',
                    'support'
                  )
                  .eq(
                    'content_id',
                    supportId
                  );


              if (
                translationDeleteError
              ) {
                throw translationDeleteError;
              }


              // ================================
              // DELETE SUPPORT FUND
              // ================================

              await deleteDonationSetting(
                supportId
              );


              // ================================
              // REFRESH
              // ================================

              await loadPublicSupport();

              await loadSupportAdminSection();


            } catch (error) {
              button.disabled = false;

              button.textContent =
                'Delete';


              console.error(
                'Unable to delete support fund:',
                error
              );
            }
          }
        );
      }
    );


  } catch (error) {
    adminSupportList.innerHTML = `
      <p class="admin-panel__placeholder">
        Unable to load support funds.
      </p>
    `;

    console.error(
      'Unable to load support funds:',
      error
    );
  }
}


// ================================
// WATCH & RESULTS ADMIN
// ================================

async function loadWatchAdminSection() {
  adminPanelBody.innerHTML = `
    <div class="admin-section-header">

      <div>

        <h3 class="admin-section-header__title">
          Watch & Results
        </h3>

        <p class="admin-section-header__description">
          Manage live stream links and official result pages.
        </p>

      </div>

      <button
        class="btn btn-primary"
        type="button"
        id="addWatchButton"
      >
        + Add Watch / Result
      </button>

    </div>

    <div id="adminWatchList">

      <p class="admin-panel__placeholder">
        Loading Watch & Results...
      </p>

    </div>
  `;


  const adminWatchList =
    document.querySelector(
      '#adminWatchList'
    );


  const addWatchButton =
    document.querySelector(
      '#addWatchButton'
    );


  // ================================
  // LOAD WATCH & RESULTS
  // ================================

  try {
    const watchLinks =
      await getWatchLinks();


    if (watchLinks.length === 0) {
      adminWatchList.innerHTML = `
        <p class="admin-panel__placeholder">
          No Watch & Results entries yet.
        </p>
      `;
    } else {
      adminWatchList.innerHTML =
        watchLinks
          .map((item) => {
            return `
              <article
                class="admin-voting-item"
                data-watch-id="${item.id}"
              >

                <div class="admin-voting-item__info">

                  <div class="admin-voting-item__top">

                    <strong class="admin-voting-item__event">
                      ${item.title}
                    </strong>

                    <span class="admin-voting-item__status">
                      ${
                        item.active
                          ? 'Active'
                          : 'Inactive'
                      }
                    </span>

                  </div>


                  <span class="admin-voting-item__platform">
                    ${
                      item.type === 'live'
                        ? 'Live'
                        : 'Results'
                    }

                    ${
                      item.platform
                        ? ` · ${item.platform}`
                        : ''
                    }
                  </span>


                  ${
                    item.scheduled_at
                      ? `
                        <span class="admin-voting-item__meta">
                          ${new Date(
                            item.scheduled_at
                          ).toLocaleString()}
                        </span>
                      `
                      : ''
                  }

                </div>


                <div class="admin-voting-item__actions">

                  <button
                    class="btn btn-secondary"
                    type="button"
                    data-edit-watch="${item.id}"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-secondary"
                    type="button"
                    data-delete-watch="${item.id}"
                  >
                    Delete
                  </button>

                </div>

              </article>
            `;
          })
          .join('');
    }


        // ================================
    // EDIT WATCH / RESULT
    // ================================

    const editWatchButtons =
      document.querySelectorAll(
        '[data-edit-watch]'
      );


    editWatchButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const watchId =
              Number(
                button.dataset.editWatch
              );


            const item =
              watchLinks.find(
                (entry) =>
                  entry.id === watchId
              );


            if (!item) {
              return;
            }


            const dateParts =
              item.scheduled_at
                ? new Intl.DateTimeFormat(
                    'en-CA',
                    {
                      timeZone:
                        'Asia/Bangkok',

                      year:
                        'numeric',

                      month:
                        '2-digit',

                      day:
                        '2-digit',

                      hour:
                        '2-digit',

                      minute:
                        '2-digit',

                      hourCycle:
                        'h23',
                    }
                  )
                    .formatToParts(
                      new Date(
                        item.scheduled_at
                      )
                    )
                    .reduce(
                      (
                        parts,
                        part
                      ) => {
                        parts[
                          part.type
                        ] =
                          part.value;

                        return parts;
                      },
                      {}
                    )
                : null;


            const scheduledValue =
              dateParts
                ? `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}`
                : '';


            adminPanelBody.innerHTML = `
              <div class="admin-form-view">

                <div class="admin-form-view__header">

                  <div>

                    <span class="eyebrow">
                      WATCH & RESULTS
                    </span>

                    <h3 class="admin-section-header__title">
                      Edit Watch / Result
                    </h3>

                    <p class="admin-section-header__description">
                      Update this live stream or results page. Description and button label translations are generated automatically from English.
                    </p>

                  </div>


                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="cancelEditWatch"
                  >
                    ← Cancel
                  </button>

                </div>


                <form
                  class="admin-voting-form"
                  id="adminEditWatchForm"
                >

                  <label>
                    <span>
                      Type
                    </span>

                    <select
                      name="type"
                      required
                    >

                      <option
                        value="live"
                        ${
                          item.type ===
                          'live'
                            ? 'selected'
                            : ''
                        }
                      >
                        Live / Watch
                      </option>

                      <option
                        value="result"
                        ${
                          item.type ===
                          'result'
                            ? 'selected'
                            : ''
                        }
                      >
                        Results
                      </option>

                    </select>
                  </label>


                  <label>
                    <span>
                      Title
                    </span>

                    <input
                      type="text"
                      name="title"
                      value="${item.title ?? ''}"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Description — English
                    </span>

                    <textarea
                      name="description"
                      rows="3"
                    >${item.description ?? ''}</textarea>
                  </label>


                  <label>
                    <span>
                      Platform
                    </span>

                    <input
                      type="text"
                      name="platform"
                      value="${item.platform ?? ''}"
                    />
                  </label>


                  <label>
                    <span>
                      Link
                    </span>

                    <input
                      type="url"
                      name="url"
                      value="${item.url ?? ''}"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Date & Time — Thailand
                    </span>

                    <input
                      type="datetime-local"
                      name="scheduled_at"
                      value="${scheduledValue}"
                    />
                  </label>


                  <label>
                    <span>
                      Thumbnail URL
                    </span>

                    <input
                      type="url"
                      name="thumbnail_url"
                      value="${item.thumbnail_url ?? ''}"
                    />
                  </label>


                  <label>
                    <span>
                      Button label — English
                    </span>

                    <input
                      type="text"
                      name="button_label"
                      value="${item.button_label ?? ''}"
                    />
                  </label>


                  <label>
                    <span>
                      Sort order
                    </span>

                    <input
                      type="number"
                      name="sort_order"
                      value="${item.sort_order ?? 0}"
                    />
                  </label>


                  <label>

                    <input
                      type="checkbox"
                      name="active"
                      ${
                        item.active
                          ? 'checked'
                          : ''
                      }
                    />

                    <span>
                      Active
                    </span>

                  </label>


                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Save & Translate
                  </button>

                </form>

              </div>
            `;


            const cancelEditWatch =
              document.querySelector(
                '#cancelEditWatch'
              );


            cancelEditWatch.addEventListener(
              'click',
              () => {
                loadWatchAdminSection();
              }
            );


            const adminEditWatchForm =
              document.querySelector(
                '#adminEditWatchForm'
              );


            adminEditWatchForm.addEventListener(
              'submit',
              async (event) => {
                event.preventDefault();


                const formData =
                  new FormData(
                    adminEditWatchForm
                  );


                const type =
                  formData.get(
                    'type'
                  );


                const thailandDateTime =
                  formData.get(
                    'scheduled_at'
                  );


                let scheduledAt =
                  null;


                if (
                  thailandDateTime
                ) {
                  scheduledAt =
                    new Date(
                      `${thailandDateTime}:00+07:00`
                    ).toISOString();
                }


                const defaultButtonLabel =
                  type === 'live'
                    ? 'Watch Live'
                    : 'View Results';


                const watchData = {
                  type,

                  title:
                    formData
                      .get('title')
                      .trim(),

                  description:
                    formData
                      .get(
                        'description'
                      )
                      .trim() ||
                    null,

                  platform:
                    formData
                      .get(
                        'platform'
                      )
                      .trim() ||
                    null,

                  url:
                    formData
                      .get('url')
                      .trim(),

                  scheduled_at:
                    scheduledAt,

                  thumbnail_url:
                    formData
                      .get(
                        'thumbnail_url'
                      )
                      .trim() ||
                    null,

                  button_label:
                    formData
                      .get(
                        'button_label'
                      )
                      .trim() ||
                    defaultButtonLabel,

                  sort_order:
                    Number(
                      formData.get(
                        'sort_order'
                      )
                    ) || 0,

                  active:
                    formData.get(
                      'active'
                    ) === 'on',
                };


                const saveChangesButton =
                  adminEditWatchForm
                    .querySelector(
                      'button[type="submit"]'
                    );


                try {
                  saveChangesButton.disabled =
                    true;

                  saveChangesButton.textContent =
                    'Saving & Translating...';


                  // ================================
                  // UPDATE WATCH / RESULT
                  // ================================

                  await updateWatchLink(
                    watchId,
                    watchData
                  );


                  // ================================
                  // AUTO TRANSLATE
                  // ================================

                  saveChangesButton.textContent =
                    'Translating...';


                  const {
                    data:
                      translationData,

                    error:
                      translationError,
                  } =
                    await supabase
                      .functions
                      .invoke(
                        'translate-content',
                        {
                          body: {
                            fields: {
                              description:
                                watchData.description ??
                                '',

                              button_label:
                                watchData.button_label,
                            },
                          },
                        }
                      );


                  if (
                    translationError
                  ) {
                    throw translationError;
                  }


                  if (
                    !translationData
                      ?.translations
                  ) {
                    throw new Error(
                      'Translation service returned no translations.'
                    );
                  }


                  // ================================
                  // NORMALIZE TRANSLATIONS
                  // ================================

                  const normalizedTranslations =
                    Object.fromEntries(
                      Object.entries(
                        translationData.translations
                      ).map(
                        (
                          [
                            language,
                            fields,
                          ]
                        ) => [
                          language,
                          {
                            description:
                              watchData.description
                                ? (
                                    fields.description ??
                                    ''
                                  )
                                : '',

                            button_label:
                              fields.button_label ??
                              '',
                          },
                        ]
                      )
                    );


                  // ================================
                  // SAVE TRANSLATIONS
                  // ================================

                  await saveTranslations(
                    'watch',
                    watchId,
                    normalizedTranslations
                  );


                  // ================================
                  // REFRESH PUBLIC WATCH
                  // ================================

                  await loadPublicWatchLinks();


                  saveChangesButton.textContent =
                    'Saved ✓';


                  setTimeout(
                    async () => {
                      await loadWatchAdminSection();
                    },
                    700
                  );


                } catch (error) {
                  saveChangesButton.disabled =
                    false;

                  saveChangesButton.textContent =
                    'Save & Translate';


                  console.error(
                    'Unable to update Watch & Results entry:',
                    error
                  );
                }
              }
            );
          }
        );
      }
    );


        // ================================
    // DELETE WATCH / RESULT
    // ================================

    const deleteWatchButtons =
      document.querySelectorAll(
        '[data-delete-watch]'
      );


    deleteWatchButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const watchId =
              Number(
                button.dataset
                  .deleteWatch
              );


            const item =
              watchLinks.find(
                (entry) =>
                  entry.id === watchId
              );


            if (!item) {
              return;
            }


            const confirmed =
              window.confirm(
                `Delete "${item.title}"?\n\nThis action cannot be undone.`
              );


            if (!confirmed) {
              return;
            }


            try {
              button.disabled =
                true;

              button.textContent =
                'Deleting...';


              // ================================
              // DELETE WATCH TRANSLATIONS
              // ================================

              const {
                error:
                  translationsDeleteError,
              } =
                await supabase
                  .from(
                    'lmsy_translations'
                  )
                  .delete()
                  .eq(
                    'content_type',
                    'watch'
                  )
                  .eq(
                    'content_id',
                    watchId
                  );


              if (
                translationsDeleteError
              ) {
                throw translationsDeleteError;
              }


              // ================================
              // DELETE WATCH / RESULT
              // ================================

              await deleteWatchLink(
                watchId
              );


              // ================================
              // REFRESH PUBLIC + ADMIN
              // ================================

              await loadPublicWatchLinks();

              await loadWatchAdminSection();


            } catch (error) {
              button.disabled =
                false;

              button.textContent =
                'Delete';


              console.error(
                'Unable to delete Watch & Results entry:',
                error
              );
            }
          }
        );
      }
    );


  } catch (error) {
    adminWatchList.innerHTML = `
      <p class="admin-panel__placeholder">
        Unable to load Watch & Results.
      </p>
    `;


    console.error(
      'Unable to load Watch & Results:',
      error
    );
  }


    // ================================
  // ADD WATCH / RESULT
  // ================================

  addWatchButton.addEventListener(
    'click',
    () => {

      adminPanelBody.innerHTML = `
        <div class="admin-form-view">

          <div class="admin-form-view__header">

            <div>

              <span class="eyebrow">
                WATCH & RESULTS
              </span>

              <h3 class="admin-section-header__title">
                Add Watch / Result
              </h3>

              <p class="admin-section-header__description">
                Add a live stream or an official results page. Description and button label translations are generated automatically from English.
              </p>

            </div>


            <button
              class="btn btn-secondary"
              type="button"
              id="cancelAddWatch"
            >
              ← Cancel
            </button>

          </div>


          <form
            class="admin-voting-form"
            id="adminWatchForm"
          >

            <label>
              <span>
                Type
              </span>

              <select
                name="type"
                required
              >

                <option value="live">
                  Live / Watch
                </option>

                <option value="result">
                  Results
                </option>

              </select>
            </label>


            <label>
              <span>
                Title
              </span>

              <input
                type="text"
                name="title"
                placeholder="Example: LMSY Live at Y Entertain Awards"
                required
              />
            </label>


            <label>
              <span>
                Description — English
              </span>

              <textarea
                name="description"
                rows="3"
                placeholder="Optional short description"
              ></textarea>
            </label>


            <label>
              <span>
                Platform
              </span>

              <input
                type="text"
                name="platform"
                placeholder="YouTube, Facebook, Instagram, Website..."
              />
            </label>


            <label>
              <span>
                Link
              </span>

              <input
                type="url"
                name="url"
                required
              />
            </label>


            <label>
              <span>
                Date & Time — Thailand
              </span>

              <input
                type="datetime-local"
                name="scheduled_at"
              />
            </label>


            <label>
              <span>
                Thumbnail URL
              </span>

              <input
                type="url"
                name="thumbnail_url"
                placeholder="Optional"
              />
            </label>


            <label>
              <span>
                Button label — English
              </span>

              <input
                type="text"
                name="button_label"
                placeholder="Example: Watch Live"
              />
            </label>


            <label>
              <span>
                Sort order
              </span>

              <input
                type="number"
                name="sort_order"
                value="0"
              />
            </label>


            <label>

              <input
                type="checkbox"
                name="active"
                checked
              />

              <span>
                Active
              </span>

            </label>


            <button
              class="btn btn-primary"
              type="submit"
            >
              Save & Translate
            </button>

          </form>

        </div>
      `;


      const cancelAddWatch =
        document.querySelector(
          '#cancelAddWatch'
        );


      cancelAddWatch.addEventListener(
        'click',
        () => {
          loadWatchAdminSection();
        }
      );


      const adminWatchForm =
        document.querySelector(
          '#adminWatchForm'
        );


      adminWatchForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();


          const formData =
            new FormData(
              adminWatchForm
            );


          const type =
            formData.get(
              'type'
            );


          const thailandDateTime =
            formData.get(
              'scheduled_at'
            );


          let scheduledAt =
            null;


          if (
            thailandDateTime
          ) {
            scheduledAt =
              new Date(
                `${thailandDateTime}:00+07:00`
              ).toISOString();
          }


          const defaultButtonLabel =
            type === 'live'
              ? 'Watch Live'
              : 'View Results';


          const watchData = {
            type,

            title:
              formData
                .get('title')
                .trim(),

            description:
              formData
                .get(
                  'description'
                )
                .trim() ||
              null,

            platform:
              formData
                .get(
                  'platform'
                )
                .trim() ||
              null,

            url:
              formData
                .get('url')
                .trim(),

            scheduled_at:
              scheduledAt,

            thumbnail_url:
              formData
                .get(
                  'thumbnail_url'
                )
                .trim() ||
              null,

            button_label:
              formData
                .get(
                  'button_label'
                )
                .trim() ||
              defaultButtonLabel,

            sort_order:
              Number(
                formData.get(
                  'sort_order'
                )
              ) || 0,

            active:
              formData.get(
                'active'
              ) === 'on',
          };


          const saveButton =
            adminWatchForm
              .querySelector(
                'button[type="submit"]'
              );


          try {
            saveButton.disabled =
              true;

            saveButton.textContent =
              'Saving & Translating...';


            // ================================
            // CREATE WATCH / RESULT
            // ================================

            const createdWatch =
              await createWatchLink(
                watchData
              );


            // ================================
            // AUTO TRANSLATE
            // ================================

            saveButton.textContent =
              'Translating...';


            const {
              data:
                translationData,

              error:
                translationError,
            } =
              await supabase
                .functions
                .invoke(
                  'translate-content',
                  {
                    body: {
                      fields: {
                        description:
                          watchData.description ??
                          '',

                        button_label:
                          watchData.button_label,
                      },
                    },
                  }
                );


            if (
              translationError
            ) {
              throw translationError;
            }


            if (
              !translationData
                ?.translations
            ) {
              throw new Error(
                'Translation service returned no translations.'
              );
            }


            // ================================
            // NORMALIZE TRANSLATIONS
            // ================================

            const normalizedTranslations =
              Object.fromEntries(
                Object.entries(
                  translationData.translations
                ).map(
                  (
                    [
                      language,
                      fields,
                    ]
                  ) => [
                    language,
                    {
                      description:
                        watchData.description
                          ? (
                              fields.description ??
                              ''
                            )
                          : '',

                      button_label:
                        fields.button_label ??
                        '',
                    },
                  ]
                )
              );


            // ================================
            // SAVE TRANSLATIONS
            // ================================

            await saveTranslations(
              'watch',
              createdWatch.id,
              normalizedTranslations
            );


            // ================================
            // REFRESH PUBLIC WATCH
            // ================================

            await loadPublicWatchLinks();


            saveButton.textContent =
              'Saved ✓';


            setTimeout(
              async () => {
                await loadWatchAdminSection();
              },
              700
            );


          } catch (error) {
            saveButton.disabled =
              false;

            saveButton.textContent =
              'Save & Translate';


            console.error(
              'Unable to create Watch & Results entry:',
              error
            );
          }
        }
      );
    }
  );
}


// ================================
// ADMIN PANEL NAVIGATION
// ================================

adminNavItems.forEach((item) => {
  item.addEventListener('click', async () => {
    const sectionName =
      item.textContent.trim();

    adminNavItems.forEach((navItem) => {
      navItem.classList.remove('is-active');
    });

    item.classList.add('is-active');

    adminPanelTitle.textContent =
      sectionName;

    if (sectionName === 'Voting') {
      await loadVotingAdminSection();
      return;
    }

    if (sectionName === 'Tutorials') {
      await loadTutorialAdminSection();
      return;
    }

    if (sectionName === 'Watch & Results') {
      await loadWatchAdminSection();
      return;
    }

    if (sectionName === 'Support') {
      await loadSupportAdminSection();
      return;
    }

    if (sectionName === 'Artists & Content') {
      await loadArtistsAdminSection();
      return;
    }

    adminPanelBody.innerHTML = `
      <p class="admin-panel__placeholder">
        ${adminSections[sectionName]}
      </p>
    `;
  });
});


loadPublicWatchLinks();


// ================================
// RESTORE ADMIN SESSION
// ================================

let isAdminPasswordRecovery = false;

listenForAdminPasswordRecovery(() => {
  isAdminPasswordRecovery = true;

  showAdminSetNewPasswordForm();
});

async function restoreAdminSession() {
  try {
    const sessionData =
      await getCurrentAdminSession();

    if (!sessionData) {
      return;
    }

    if (isAdminPasswordRecovery) {
      return;
    }

    const { admin } =
      sessionData;

    showAdminWelcome(admin);

  } catch (error) {
    console.error(
      'Unable to restore admin session:',
      error
    );
  }
}

restoreAdminSession();