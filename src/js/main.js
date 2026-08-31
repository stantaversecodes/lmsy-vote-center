import '../styles/main.css';
import '../styles/home.css';
import '../styles/admin.css';

import {
  loginAdmin,
  getCurrentAdminSession,
  createAdminAccount,
  logoutAdmin,
  sendAdminPasswordReset,
  updateAdminPassword,
  listenForAdminPasswordRecovery,
} from './auth.js';

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
} from './admin.js';


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
        <a href="#vote">Vote</a>
        <a href="#tutorials">Tutorials</a>
        <a href="#artists">Artists</a>
        <a href="#watch">Watch & Results</a>
        <a href="#support">Support</a>
      </div>

    </div>
  </nav>


 <!-- ================================
     HERO
================================= -->

<header class="hero">
  <div class="page-container hero__content">

    <div
      class="hero__main"
      id="publicHeroContent"
    >

      <span
        class="eyebrow"
        id="heroSubtitle"
      >
        LMSY VOTE CENTER
      </span>

      <h1
        class="hero__title"
        id="heroTitle"
      >
        Vote. Support.<br />
        Celebrate.
      </h1>

      <p
        class="hero__description"
        id="heroBody"
      >
        Your central hub for LMSY voting guides, tutorials,
        official links, results and voting support.
      </p>

      <div class="hero__actions">
  <a
    class="btn btn-primary"
    href="#vote"
    id="heroPrimaryButton"
  >
    Start Voting
  </a>

  <a
    class="btn btn-secondary"
    href="#tutorials"
    id="heroSecondaryButton"
  >
    View Tutorials
  </a>
</div>

    </div>


    <!-- ACTIVE VOTES CARD -->

    <div class="hero-votes-card">

      <div class="hero-votes-card__top">
        <span class="hero-votes-card__dot"></span>
        <span>Active now</span>
      </div>

      <div class="hero-votes-card__count">

        <strong
          class="hero-votes-card__number"
          id="activeVoteCount"
        >
          0
        </strong>

        <span class="hero-votes-card__label">
          active votings
        </span>

      </div>

    </div>

  </div>
</header>


<main>

    <!-- ================================
         WHERE TO VOTE
    ================================= -->

    <section class="section" id="vote">
      <div class="page-container">

        <span class="eyebrow">
          WHERE TO VOTE
        </span>

        <h2 class="section-title">
          Active Voting
        </h2>

        <p class="section-description">
          Find current voting opportunities for Lookmhee, Sonya and LMSY.
        </p>


        <!-- FILTERS -->

        <div class="vote-filters">

          <button
            class="vote-filter is-active"
            type="button"
            data-filter="all"
          >
            All
          </button>

          <button
            class="vote-filter"
            type="button"
            data-filter="ceremony"
          >
            Awards & Ceremonies
          </button>

          <button
            class="vote-filter"
            type="button"
            data-filter="poll"
          >
            Polls
          </button>

          <button
            class="vote-filter"
            type="button"
            data-filter="advertising"
          >
            Advertising
          </button>

        </div>


        <!-- VOTING CARDS -->

        <div
          class="vote-grid"
          id="publicVotingGrid"
        >

          <p class="vote-empty__description">
            Loading active votings...
          </p>

        </div>


        <!-- EMPTY STATE -->

        <div class="vote-empty" hidden>

          <p class="vote-empty__title">
            No active votes in this category.
          </p>

          <p class="vote-empty__description">
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
    >
      TUTORIALS
    </span>

    <h2
      class="section-title"
      id="tutorialsTitle"
    >
      Learn How to Vote
    </h2>

    <p
      class="section-description"
      id="tutorialsBody"
    >
      Find step-by-step voting guides, videos and external tutorials.
    </p>


    <div
      class="tutorial-grid"
      id="publicTutorialGrid"
    >

      <p class="vote-empty__description">
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
    >
      ARTISTS
    </span>

    <h2
      class="section-title"
      id="artistsTitle"
    >
      Lookmhee, Sonya & LMSY
    </h2>

    <p
      class="section-description"
      id="artistsBody"
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
      <p class="vote-empty__description">
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
    >
      WATCH & RESULTS
    </span>

    <h2
      class="section-title"
      id="watchTitle"
    >
      Watch, Stream & Celebrate
    </h2>

    <p
      class="section-description"
      id="watchBody"
    >
      Find official streams, performances, appearances and voting results in one place.
    </p>

    <div
      class="watch-grid"
      id="publicWatchGrid"
    >
      <p class="vote-empty__description">
        Loading Watch & Results...
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
    >
      SUPPORT LMSY
    </span>

    <h2
      class="section-title"
      id="supportTitle"
    >
      Help Fund Voting
    </h2>

    <p
      class="section-description"
      id="supportBody"
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

</main>

  <!-- ================================
       FOOTER
  ================================= -->

  <footer class="footer">

    <div class="page-container footer__inner">

      <p class="footer__help">
        Have questions about voting?
        Reach out to the official LMSY voting house on
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter ↗
        </a>
      </p>


      <div class="footer__bottom">

        <p class="footer__message">
          LMSY Vote Center — made with
          <span class="footer__hearts">💛💙</span>
          for the fans x
          <a
            class="footer__creator"
            href="https://x.com/delulushots"
            target="_blank"
            rel="noopener noreferrer"
          >
            @delulushots 🤠
          </a>
        </p>

        <a
          class="footer__admin"
          href="#"
          id="adminLoginTrigger"
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
  document.querySelectorAll('.vote-filter');

const publicVotingGrid =
  document.querySelector('#publicVotingGrid');

const voteEmpty =
  document.querySelector('.vote-empty');

const activeVoteCount =
  document.querySelector('#activeVoteCount');

let publicVotingPlatforms = [];

function getVoteTypeLabel(voteType) {
  const labels = {
    ceremony: 'Awards & Ceremonies',
    poll: 'Poll',
    advertising: 'Advertising',
  };

  return labels[voteType] || voteType;
}

function getPriorityLabel(priority) {
  const labels = {
    1: 'Urgent',
    2: 'High',
    3: 'Normal',
  };

  return labels[priority] || 'Normal';
}

function getPriorityClass(priority) {
  const classes = {
    1: 'vote-card__priority--urgent',
    2: 'vote-card__priority--high',
    3: 'vote-card__priority--normal',
  };

  return classes[priority] || 'vote-card__priority--normal';
}

function getAccentClass(accent) {
  if (accent === 'lookmhee') {
    return 'vote-card--yellow';
  }

  if (accent === 'sonya') {
    return 'vote-card--blue';
  }

  return 'vote-card--lmsy';
}

function formatVoteDeadline(deadline) {
  if (!deadline) {
    return null;
  }

  const date = new Date(deadline);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function renderPublicVotingPlatforms(
  selectedFilter = 'all'
) {
  const filteredPlatforms =
    selectedFilter === 'all'
      ? publicVotingPlatforms
      : publicVotingPlatforms.filter(
          (platform) =>
            platform.vote_type === selectedFilter
        );

  voteEmpty.hidden =
    filteredPlatforms.length !== 0;

  if (filteredPlatforms.length === 0) {
    publicVotingGrid.innerHTML = '';
    return;
  }

  publicVotingGrid.innerHTML =
    filteredPlatforms
      .map((platform) => {
        const deadline =
          formatVoteDeadline(platform.deadline);

        return `
          <article
            class="vote-card ${getAccentClass(platform.accent)}"
            data-vote-type="${platform.vote_type}"
            data-priority="${platform.priority}"
          >

            <div class="vote-card__top">

              <span class="vote-card__category">
                ${getVoteTypeLabel(platform.vote_type)}
              </span>

              <span
                class="
                  vote-card__priority
                  ${getPriorityClass(platform.priority)}
                "
              >
                ${getPriorityLabel(platform.priority)}
              </span>

            </div>

            <div class="vote-card__content">

              <h3 class="vote-card__title">
                ${platform.event}
              </h3>

              <p class="vote-card__platform">
                ${platform.platform}
              </p>

              <div class="vote-card__details">

                ${
                  deadline
                    ? `<span>Deadline: ${deadline}</span>`
                    : ''
                }

                ${
                  platform.frequency
                    ? `<span>${platform.frequency}</span>`
                    : ''
                }

              </div>

            </div>

            <div class="vote-card__actions">

              <a
                class="btn btn-primary"
                href="${platform.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vote
              </a>

              ${
                platform.tutorial_url
                  ? `
                    <a
                      class="btn btn-secondary"
                      href="${platform.tutorial_url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tutorial
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

async function loadPublicVotingPlatforms() {
  try {
    publicVotingPlatforms =
      await getActiveVotingPlatforms();

    activeVoteCount.textContent =
      publicVotingPlatforms.length;

    renderPublicVotingPlatforms();

  } catch (error) {
    publicVotingGrid.innerHTML = `
      <p class="vote-empty__description">
        Unable to load active votings.
      </p>
    `;

    activeVoteCount.textContent = '0';

    console.error(
      'Unable to load public voting platforms:',
      error
    );
  }
}

voteFilters.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    const selectedFilter =
      filterButton.dataset.filter;

    voteFilters.forEach((button) => {
      button.classList.remove('is-active');
    });

    filterButton.classList.add('is-active');

    renderPublicVotingPlatforms(selectedFilter);
  });
});

loadPublicVotingPlatforms();

// ================================
// PUBLIC TUTORIALS
// ================================

const publicTutorialGrid =
  document.querySelector('#publicTutorialGrid');
  const publicWatchGrid =
  document.querySelector('#publicWatchGrid');

  function detectTutorialType(url) {
  if (!url) {
    return 'external';
  }

  try {
    const hostname =
      new URL(url).hostname.toLowerCase();

    if (
      hostname.includes('youtube.com') ||
      hostname.includes('youtu.be')
    ) {
      return 'youtube';
    }

    if (
      hostname.includes('twitter.com') ||
      hostname.includes('x.com')
    ) {
      return 'x';
    }

    if (hostname.includes('drive.google.com')) {
      return 'drive';
    }

    if (hostname.includes('instagram.com')) {
      return 'instagram';
    }

    if (hostname.includes('tiktok.com')) {
      return 'tiktok';
    }

    return 'external';

  } catch {
    return 'external';
  }
}

function getTutorialTypeLabel(type) {
  const labels = {
    youtube: 'YouTube',
    x: 'X / Twitter',
    drive: 'Google Drive',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    external: 'External Guide',
  };

  return labels[type] || 'Tutorial';
}

function getTutorialButtonLabel(type) {
  const labels = {
    youtube: 'Watch Tutorial',
    x: 'View Thread',
    drive: 'Open Guide',
    instagram: 'View Tutorial',
    tiktok: 'Watch Tutorial',
    external: 'Open Guide',
  };

  return labels[type] || 'Open Tutorial';
}

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes('youtu.be')) {
      const videoId =
        parsedUrl.pathname.replace('/', '');

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      if (parsedUrl.pathname.startsWith('/embed/')) {
        return url;
      }

      const videoId =
        parsedUrl.searchParams.get('v');

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    return null;

  } catch {
    return null;
  }
}

function renderPublicTutorials(tutorials) {
  if (tutorials.length === 0) {
    publicTutorialGrid.innerHTML = `
      <p class="vote-empty__description">
        No tutorials available yet.
      </p>
    `;

    return;
  }

  publicTutorialGrid.innerHTML = tutorials
    .map((tutorial) => {
      const youtubeEmbedUrl =
        tutorial.tutorial_type === 'youtube'
          ? getYouTubeEmbedUrl(tutorial.tutorial_url)
          : null;

      return `
        <article class="tutorial-card">

                    ${
            youtubeEmbedUrl
              ? `
                <div class="tutorial-card__video">

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

                  <span class="tutorial-card__resource-icon">
                    ${
                      tutorial.tutorial_type === 'x'
                        ? '𝕏'
                        : tutorial.tutorial_type === 'drive'
                          ? '↗'
                          : tutorial.tutorial_type === 'instagram'
                            ? '◎'
                            : tutorial.tutorial_type === 'tiktok'
                              ? '♪'
                              : '↗'
                    }
                  </span>

                  <span class="tutorial-card__resource-label">
                    ${getTutorialTypeLabel(
                      tutorial.tutorial_type
                    )}
                  </span>

                </div>
              `
          }

          <div class="tutorial-card__content">

            <span class="admin-voting-item__platform">
  ${getTutorialTypeLabel(tutorial.tutorial_type)}
</span>

<span class="admin-voting-item__meta">
  ${
    tutorial.source === 'voting'
      ? 'From Voting'
      : 'Manual'
  }
</span>

            <h3 class="tutorial-card__title">
              ${tutorial.title}
            </h3>

            ${
              tutorial.description
                ? `
                  <p class="tutorial-card__description">
                    ${tutorial.description}
                  </p>
                `
                : ''
            }

                        ${
              tutorial.tutorial_url
                ? `
                  <a
                    class="btn btn-secondary"
                    href="${tutorial.tutorial_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${getTutorialButtonLabel(
                      tutorial.tutorial_type
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

async function loadPublicTutorials() {
  try {
    const tutorials =
      await getActiveTutorials();

    const votingPlatforms =
      await getActiveVotingPlatforms();

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

            source:
              'voting',
          };
        });

    const combinedTutorials = [
      ...tutorials,
      ...votingTutorials,
    ];

    renderPublicTutorials(
      combinedTutorials
    );

  } catch (error) {
    publicTutorialGrid.innerHTML = `
      <p class="vote-empty__description">
        Unable to load tutorials.
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

async function loadPublicWatchLinks() {
  try {
    const watchSection =
      document.querySelector('#watch');

    const watchNavLink =
      document.querySelector(
        '.navbar__links a[href="#watch"]'
      );

    const watchLinks =
      await getActiveWatchLinks();

    if (watchLinks.length === 0) {
      publicWatchGrid.innerHTML = '';

      if (watchSection) {
        watchSection.hidden = true;
      }

      if (watchNavLink) {
        watchNavLink.hidden = true;
      }

      return;
    }

    if (watchSection) {
      watchSection.hidden = false;
    }

    if (watchNavLink) {
      watchNavLink.hidden = false;
    }

    publicWatchGrid.innerHTML = watchLinks
      .map((item) => {
        const isLive =
          item.type === 'live';

        let thumbnailUrl =
          item.thumbnail_url;

        if (
          thumbnailUrl &&
          (
            thumbnailUrl.includes('youtube.com') ||
            thumbnailUrl.includes('youtu.be')
          )
        ) {
          try {
            const url =
              new URL(thumbnailUrl);

            let videoId = null;

            if (url.hostname.includes('youtu.be')) {
              videoId =
                url.pathname.slice(1);
            } else {
              videoId =
                url.searchParams.get('v');
            }

            if (videoId) {
              thumbnailUrl =
                `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          } catch {
            thumbnailUrl = null;
          }
        }

        const scheduledDate =
          item.scheduled_at
            ? new Date(item.scheduled_at)
            : null;

        const thailandTime =
          scheduledDate
            ? scheduledDate.toLocaleString(
                'en-US',
                {
                  timeZone: 'Asia/Bangkok',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZoneName: 'short',
                }
              )
            : null;

        const localTime =
          scheduledDate
            ? scheduledDate.toLocaleString(
                undefined,
                {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }
              )
            : null;

        return `
          <article class="watch-card">

            ${
              thumbnailUrl
                ? `
                  <div class="watch-card__media">
                    <img
                      src="${thumbnailUrl}"
                      alt="${item.title}"
                      loading="lazy"
                    />
                  </div>
                `
                : `
                  <div class="watch-card__placeholder">

                    <span class="watch-card__placeholder-icon">
                      ${
                        isLive
                          ? '▶'
                          : '★'
                      }
                    </span>

                    <span class="watch-card__placeholder-label">
                      ${
                        isLive
                          ? 'Live Stream'
                          : 'Results'
                      }
                    </span>

                  </div>
                `
            }

            <div class="watch-card__content">

              <span class="watch-card__type">
                ${isLive ? 'Live Stream' : 'Results'}
              </span>

              <h3 class="watch-card__title">
                ${item.title}
              </h3>

              ${
                item.platform
                  ? `
                    <span class="watch-card__platform">
                      ${item.platform}
                    </span>
                  `
                  : ''
              }

              ${
                item.description
                  ? `
                    <p class="watch-card__description">
                      ${item.description}
                    </p>
                  `
                  : ''
              }

              ${
                thailandTime
                  ? `
                    <div class="watch-card__time">

                      <div class="watch-card__time-row">
                        <span class="watch-card__time-label">
                          Thailand
                        </span>

                        <span class="watch-card__time-value">
                          ${thailandTime}
                        </span>
                      </div>

                      <div class="watch-card__time-row">
                        <span class="watch-card__time-label">
                          Your Time
                        </span>

                        <span class="watch-card__time-value">
                          ${localTime}
                        </span>
                      </div>

                    </div>
                  `
                  : ''
              }

              <a
                class="btn ${
                  isLive
                    ? 'btn-primary'
                    : 'btn-secondary'
                }"
                href="${item.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${
                  item.button_label ||
                  (
                    isLive
                      ? 'Watch Live'
                      : 'View Results'
                  )
                }
              </a>

            </div>

          </article>
        `;
      })
      .join('');

  } catch (error) {
    publicWatchGrid.innerHTML = `
      <p class="vote-empty__description">
        Unable to load Watch & Results.
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
  document.querySelector('#publicArtistContent');

const artistTabs =
  document.querySelectorAll('.artist-tab');


function renderPublicArtists(artists) {
  if (artists.length === 0) {
    publicArtistContent.innerHTML = `
      <p class="vote-empty__description">
        No artist information available yet.
      </p>
    `;

    return;
  }

  publicArtistContent.innerHTML = artists
    .map((artist, index) => {
      const isFirstArtist =
        index === 0;

      return `
        <article
          class="artist-panel ${isFirstArtist ? 'is-active' : ''}"
          data-artist-panel="${artist.slug}"
          ${isFirstArtist ? '' : 'hidden'}
        >

          <div class="artist-panel__image">

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

          <div class="artist-panel__info">

            <span class="artist-panel__label">
              ${artist.slug.toUpperCase()}
            </span>

            <h3 class="artist-panel__name">
              ${artist.name}
            </h3>

            ${
              artist.description
                ? `
                  <p class="artist-panel__description">
                    ${artist.description}
                  </p>
                `
                : ''
            }

            <div class="artist-panel__links">

              ${
                artist.instagram_url
                  ? `
                    <a
                      class="btn btn-secondary"
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
                      class="btn btn-secondary"
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
                      class="btn btn-secondary"
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
                      class="btn btn-secondary"
                      href="${artist.updates_url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Latest Updates
                    </a>
                  `
                  : ''
              }

            </div>

          </div>

        </article>
      `;
    })
    .join('');
}


function activateArtistTab(selectedArtist) {
  const artistPanels =
    document.querySelectorAll('.artist-panel');

  artistTabs.forEach((tab) => {
    const isSelected =
      tab.dataset.artist === selectedArtist;

    tab.classList.toggle(
      'is-active',
      isSelected
    );
  });

  artistPanels.forEach((panel) => {
    const isSelected =
      panel.dataset.artistPanel === selectedArtist;

    panel.hidden =
      !isSelected;

    panel.classList.toggle(
      'is-active',
      isSelected
    );
  });
}


artistTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activateArtistTab(
      tab.dataset.artist
    );
  });
});


async function loadPublicArtists() {
  try {
    const artists =
      await getActiveArtists();

    renderPublicArtists(artists);

    const preferredArtist =
      artists.find(
        (artist) => artist.slug === 'lookmhee'
      ) || artists[0];

    if (preferredArtist) {
      activateArtistTab(
        preferredArtist.slug
      );
    }

  } catch (error) {
    publicArtistContent.innerHTML = `
      <p class="vote-empty__description">
        Unable to load artists.
      </p>
    `;

    console.error(
      'Unable to load public artists:',
      error
    );
  }
}


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
        baseSiteContent[contentKey].subtitle =
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
        baseSiteContent[contentKey].title =
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
        baseSiteContent[contentKey].body =
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
        baseSiteContent[contentKey].button_label =
          element.textContent.trim();

        baseSiteContent[contentKey].button_url =
          element.getAttribute('href');
      }
    }


    // SECONDARY BUTTON

    if (config.secondaryButton) {
      const element =
        document.querySelector(
          config.secondaryButton
        );

      if (element) {
        baseSiteContent[contentKey].secondary_button_label =
          element.textContent.trim();

        baseSiteContent[contentKey].secondary_button_url =
          element.getAttribute('href');
      }
    }

  }
);


// ================================
// HERO BUTTON VISIBILITY
// ================================

function setHeroButtonsVisibility(showButtons = true) {
  const primaryButton =
    document.querySelector(
      '#heroPrimaryButton'
    );

  const secondaryButton =
    document.querySelector(
      '#heroSecondaryButton'
    );

  const heroActions =
    primaryButton?.closest('.hero__actions') ||
    secondaryButton?.closest('.hero__actions');

  const heroContent =
    document.querySelector(
      '.hero__content'
    );

  if (heroActions) {
    heroActions.style.display =
      showButtons ? '' : 'none';
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
        baseSiteContent[contentKey];

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
        base.secondary_button_label !== undefined
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
        base.secondary_button_url !== undefined
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


  // Restore Hero buttons by default.

  setHeroButtonsVisibility(true);
}


// ================================
// APPLY CUSTOM CONTENT
// ================================

function applySiteContent(content) {
  const sectionConfig =
    siteContentMap[content.content_key];

  if (!sectionConfig) {
    return;
  }


  // SUBTITLE

  if (
    content.subtitle &&
    sectionConfig.subtitle
  ) {
    const element =
      document.querySelector(
        sectionConfig.subtitle
      );

    if (element) {
      element.textContent =
        content.subtitle;
    }
  }


  // TITLE

  if (
    content.title &&
    sectionConfig.title
  ) {
    const element =
      document.querySelector(
        sectionConfig.title
      );

    if (element) {
      element.textContent =
        content.title;
    }
  }


  // BODY

  if (
    content.body &&
    sectionConfig.body
  ) {
    const element =
      document.querySelector(
        sectionConfig.body
      );

    if (element) {
      element.textContent =
        content.body;
    }
  }


  // PRIMARY BUTTON LABEL

  if (
    sectionConfig.button &&
    content.button_label
  ) {
    const element =
      document.querySelector(
        sectionConfig.button
      );

    if (element) {
      element.textContent =
        content.button_label;
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
    content.secondary_button_label
  ) {
    const element =
      document.querySelector(
        sectionConfig.secondaryButton
      );

    if (element) {
      element.textContent =
        content.secondary_button_label;
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
    content.content_key === 'hero_main'
  ) {
    setHeroButtonsVisibility(
      content.show_buttons !== false
    );
  }
}


// ================================
// LOAD PUBLIC SITE CONTENT
// ================================

async function loadPublicSiteContent() {
  try {

    // Restore original website first.
    restoreBaseSiteContent();

    const contentItems =
      await getActiveContent();

    const mainContentItems =
      contentItems.filter(
        (content) =>
          content.is_main === true
      );

    mainContentItems.forEach((content) => {
      applySiteContent(content);
    });

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
  document.querySelector('#publicSupportGrid');


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


function renderPublicSupport(settings) {
  if (settings.length === 0) {
    publicSupportGrid.innerHTML = `
      <p class="vote-empty__description">
        No active support funds available right now.
      </p>
    `;

    return;
  }


  publicSupportGrid.innerHTML = settings
    .map((support) => {

      const raisedAmount =
        Number(support.raised_amount) || 0;

      const goalAmount =
        Number(support.goal_amount) || 0;

      const percentage =
        goalAmount > 0
          ? Math.min(
              Math.round(
                (raisedAmount / goalAmount) * 100
              ),
              100
            )
          : 0;


      return `
        <article class="support-card">

          <div class="support-card__header">

            <div>

              <span class="support-card__type">
                Active Voting Fund
              </span>

              <h3 class="support-card__title">
                ${support.title || 'Voting Fund'}
              </h3>

            </div>

            <span class="support-card__status">
              Active
            </span>

          </div>


          <!-- FUNDRAISING PROGRESS -->

          <div class="support-card__fundraising">

            <div class="support-card__amounts">

              <div>

                <span class="support-card__amount-label">
                  Raised so far
                </span>

                <strong class="support-card__amount">
                  ${formatSupportAmount(
                    raisedAmount
                  )}
                </strong>

              </div>

              <div class="support-card__goal">
                Goal:
                ${formatSupportAmount(
                  goalAmount
                )}
              </div>

            </div>


            <div
              class="support-card__progress"
              role="progressbar"
              aria-label="Voting fund progress"
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
              ${percentage}% funded
            </span>

          </div>


          ${
  support.description ||
  support.qr_image_url ||
  support.donation_links?.length > 0
    ? `
      <div class="support-card__donation">

        ${
          support.qr_image_url
            ? `
              <div class="support-card__qr">

                <img
                  src="${support.qr_image_url}"
                  alt="${support.title || 'Voting Fund'} donation QR code"
                />

              </div>
            `
            : ''
        }


        <div class="support-card__donation-info">

          ${
            support.description
              ? `
                <h4 class="support-card__donation-title">
                  Support this voting fund
                </h4>

                <p class="support-card__description">
                  ${support.description}
                </p>
              `
              : ''
          }


          ${
            support.donation_links?.length > 0
              ? `
                <div class="support-card__actions">

                  ${support.donation_links
                    .map((link) => {
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
                    })
                    .join('')}

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


async function loadPublicSupport() {
  try {
    const settings =
      await getActiveDonationSettings();

    const donationLinks =
      await getActiveDonationLinks();

    const fundsWithLinks =
      settings.map((fund) => {
        return {
          ...fund,

          donation_links:
            donationLinks.filter(
              (link) =>
                link.fund_id === fund.id
            ),
        };
      });

    renderPublicSupport(
      fundsWithLinks
    );

  } catch (error) {
    publicSupportGrid.innerHTML = `
      <p class="vote-empty__description">
        Unable to load support funds.
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
          Manage artist profiles and public site content.
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
  `;


  const adminArtistList =
    document.querySelector('#adminArtistList');

  const adminContentList =
    document.querySelector('#adminContentList');

  const addArtistButton =
    document.querySelector('#addArtistButton');

  const addContentButton =
    document.querySelector('#addContentButton');


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

  addContentButton.addEventListener('click', () => {
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
              Create reusable content for the public website.
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
            <span>Title</span>

            <input
              type="text"
              name="title"
            />
          </label>

          <label style="grid-column: 1 / -1;">
            <span>Subtitle</span>

            <input
              type="text"
              name="subtitle"
            />
          </label>

          <label style="grid-column: 1 / -1;">
            <span>Body</span>

            <textarea
              name="body"
              rows="5"
            ></textarea>
          </label>

          <div
            id="addContentButtonFields"
            style="display: none; grid-column: 1 / -1;"
          >

            <label style="grid-column: 1 / -1;">
              <input
                type="checkbox"
                name="show_buttons"
                checked
              />

              <span>Show Hero Buttons</span>
            </label>

            <label>
              <span>Primary Button Label</span>

              <input
                type="text"
                name="button_label"
                placeholder="Start Voting"
              />
            </label>

            <label>
              <span>Primary Button URL</span>

              <input
                type="text"
                name="button_url"
                placeholder="#vote"
              />
            </label>

            <label>
              <span>Secondary Button Label</span>

              <input
                type="text"
                name="secondary_button_label"
                placeholder="View Tutorials"
              />
            </label>

            <label>
              <span>Secondary Button URL</span>

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

            <span>Active</span>
          </label>

          <button
            class="btn btn-primary"
            type="submit"
          >
            Save Content
          </button>

        </form>

      </div>
    `;


    // ================================
    // SHOW BUTTON FIELDS ONLY FOR HERO
    // ================================

    const addContentArea =
      document.querySelector('#addContentArea');

    const addContentButtonFields =
      document.querySelector(
        '#addContentButtonFields'
      );

    function updateAddContentFields() {
      const isHero =
        addContentArea.value === 'hero_main';

      addContentButtonFields.style.display =
        isHero ? 'grid' : 'none';
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
      document.querySelector('#cancelAddContent');

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
      document.querySelector('#adminContentForm');

    adminContentForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const formData =
          new FormData(adminContentForm);

        const contentKey =
          formData.get('content_key').trim();

        const isHero =
          contentKey === 'hero_main';

        const contentData = {
          content_key: contentKey,

          title:
            formData.get('title').trim() ||
            null,

          subtitle:
            formData.get('subtitle').trim() ||
            null,

          body:
            formData.get('body').trim() ||
            null,

          button_label:
            isHero
              ? formData.get('button_label').trim() ||
                null
              : null,

          button_url:
            isHero
              ? formData.get('button_url').trim() ||
                null
              : null,

          secondary_button_label:
            isHero
              ? formData.get('secondary_button_label').trim() ||
                null
              : null,

          secondary_button_url:
            isHero
              ? formData.get('secondary_button_url').trim() ||
                null
              : null,

          show_buttons:
            isHero
              ? formData.get('show_buttons') === 'on'
              : true,

          image_url: null,

          active:
            formData.get('active') === 'on',
        };

        const saveContentButton =
          adminContentForm.querySelector(
            'button[type="submit"]'
          );

        try {
          saveContentButton.disabled = true;
          saveContentButton.textContent =
            'Saving...';

          await createContent(contentData);

          await loadArtistsAdminSection();

        } catch (error) {
          saveContentButton.disabled = false;
          saveContentButton.textContent =
            'Save Content';

          console.error(
            'Unable to create site content:',
            error
          );
        }
      }
    );
  });


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
      button.addEventListener('click', () => {
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
                  Update artist information shown on the website.
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
                    ${artist.slug === 'lookmhee' ? 'selected' : ''}
                  >
                    Lookmhee
                  </option>

                  <option
                    value="sonya"
                    ${artist.slug === 'sonya' ? 'selected' : ''}
                  >
                    Sonya
                  </option>

                  <option
                    value="lmsy"
                    ${artist.slug === 'lmsy' ? 'selected' : ''}
                  >
                    LMSY
                  </option>
                </select>
              </label>

              <label style="grid-column: 1 / -1;">
                <span>Description</span>

                <textarea
                  name="description"
                  rows="4"
                >${artist.description ?? ''}</textarea>
              </label>

              ${
                artist.image_url
                  ? `
                    <div style="grid-column: 1 / -1;">

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

              <label style="grid-column: 1 / -1;">
                <span>Upload New Photo</span>

                <input
                  type="file"
                  name="artist_photo"
                  accept="image/png, image/jpeg, image/webp"
                />

                <small>
                  Leave empty to keep the current photo.
                </small>
              </label>

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
                  ${artist.active ? 'checked' : ''}
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
              formData.get('slug');

            const newArtistPhoto =
              formData.get('artist_photo');

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
                artist.image_url || null;

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

              saveChangesButton.textContent =
                'Saving changes...';

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
                    .trim() || null,

                image_url:
                  imageUrl,

                instagram_url:
                  formData
                    .get('instagram_url')
                    .trim() || null,

                x_url:
                  formData
                    .get('x_url')
                    .trim() || null,

                tiktok_url:
                  formData
                    .get('tiktok_url')
                    .trim() || null,

                updates_url:
                  formData
                    .get('updates_url')
                    .trim() || null,

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
      });
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

    if (contentItems.length === 0) {
      adminContentList.innerHTML = `
        <p class="admin-panel__placeholder">
          No site content yet.
        </p>
      `;
    } else {
      adminContentList.innerHTML = contentItems
        .map((content) => {
          return `
            <article
              class="admin-voting-item"
              data-content-id="${content.id}"
            >

              <div class="admin-voting-item__info">

                <div class="admin-voting-item__top">

                  <strong class="admin-voting-item__event">
                    ${content.title || content.content_key}
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
        })
        .join('');
    }


    // ================================
    // SET CONTENT AS MAIN
    // ================================

    const setMainContentButtons =
      document.querySelectorAll(
        '[data-set-main-content]'
      );

    setMainContentButtons.forEach((button) => {
      button.addEventListener(
        'click',
        async () => {
          const contentId =
            Number(
              button.dataset.setMainContent
            );

          const content =
            contentItems.find(
              (item) =>
                item.id === contentId
            );

          if (!content) {
            return;
          }

          try {
            button.disabled = true;
            button.textContent =
              'Setting...';

            await setContentAsMain(
              contentId,
              content.content_key
            );

            await loadPublicSiteContent();
            await loadArtistsAdminSection();

          } catch (error) {
            button.disabled = false;
            button.textContent =
              'Set as Main';

            console.error(
              'Unable to set content as main:',
              error
            );
          }
        }
      );
    });


    // ================================
    // RETURN CONTENT TO BASE
    // ================================

    const returnBaseContentButtons =
      document.querySelectorAll(
        '[data-return-base-content]'
      );

    returnBaseContentButtons.forEach((button) => {
      button.addEventListener(
        'click',
        async () => {
          const contentId =
            Number(
              button.dataset.returnBaseContent
            );

          const content =
            contentItems.find(
              (item) =>
                item.id === contentId
            );

          if (!content) {
            return;
          }

          try {
            button.disabled = true;
            button.textContent =
              'Returning...';

            await returnContentToBase(
              content.content_key
            );

            await loadPublicSiteContent();
            await loadArtistsAdminSection();

          } catch (error) {
            button.disabled = false;
            button.textContent =
              'Return to Base';

            console.error(
              'Unable to return content to base:',
              error
            );
          }
        }
      );
    });


    // ================================
    // EDIT CONTENT
    // ================================

    const editContentButtons =
      document.querySelectorAll(
        '[data-edit-content]'
      );

    editContentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const contentId =
          Number(
            button.dataset.editContent
          );

        const content =
          contentItems.find(
            (item) =>
              item.id === contentId
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
                  Update this public website content.
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
                <span>Content Area</span>

                <select
                  name="content_key"
                  id="editContentArea"
                  required
                >
                  <option
                    value="hero_main"
                    ${content.content_key === 'hero_main' ? 'selected' : ''}
                  >
                    Hero
                  </option>

                  <option
                    value="artists_intro"
                    ${content.content_key === 'artists_intro' ? 'selected' : ''}
                  >
                    Artists Section Intro
                  </option>

                  <option
                    value="tutorials_intro"
                    ${content.content_key === 'tutorials_intro' ? 'selected' : ''}
                  >
                    Tutorials Section Intro
                  </option>

                  <option
                    value="watch_intro"
                    ${content.content_key === 'watch_intro' ? 'selected' : ''}
                  >
                    Watch & Results Intro
                  </option>

                  <option
                    value="support_intro"
                    ${content.content_key === 'support_intro' ? 'selected' : ''}
                  >
                    Support Section Intro
                  </option>

                </select>
              </label>

              <label>
                <span>Title</span>

                <input
                  type="text"
                  name="title"
                  value="${content.title ?? ''}"
                />
              </label>

              <label style="grid-column: 1 / -1;">
                <span>Subtitle</span>

                <input
                  type="text"
                  name="subtitle"
                  value="${content.subtitle ?? ''}"
                />
              </label>

              <label style="grid-column: 1 / -1;">
                <span>Body</span>

                <textarea
                  name="body"
                  rows="5"
                >${content.body ?? ''}</textarea>
              </label>

              <div
                id="editContentButtonFields"
                style="display: none; grid-column: 1 / -1;"
              >

                <label style="grid-column: 1 / -1;">
                  <input
                    type="checkbox"
                    name="show_buttons"
                    ${content.show_buttons !== false ? 'checked' : ''}
                  />

                  <span>Show Hero Buttons</span>
                </label>

                <label>
                  <span>Primary Button Label</span>

                  <input
                    type="text"
                    name="button_label"
                    value="${content.button_label ?? ''}"
                    placeholder="Start Voting"
                  />
                </label>

                <label>
                  <span>Primary Button URL</span>

                  <input
                    type="text"
                    name="button_url"
                    value="${content.button_url ?? ''}"
                    placeholder="#vote"
                  />
                </label>

                <label>
                  <span>Secondary Button Label</span>

                  <input
                    type="text"
                    name="secondary_button_label"
                    value="${content.secondary_button_label ?? ''}"
                    placeholder="View Tutorials"
                  />
                </label>

                <label>
                  <span>Secondary Button URL</span>

                  <input
                    type="text"
                    name="secondary_button_url"
                    value="${content.secondary_button_url ?? ''}"
                    placeholder="#tutorials"
                  />
                </label>

              </div>

              <label>

                <input
                  type="checkbox"
                  name="active"
                  ${content.active ? 'checked' : ''}
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
            editContentArea.value === 'hero_main';

          editContentButtonFields.style.display =
            isHero ? 'grid' : 'none';
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
                .get('content_key')
                .trim();

            const isHero =
              contentKey === 'hero_main';

            const contentData = {
              content_key:
                contentKey,

              title:
                formData
                  .get('title')
                  .trim() || null,

              subtitle:
                formData
                  .get('subtitle')
                  .trim() || null,

              body:
                formData
                  .get('body')
                  .trim() || null,

              button_label:
                isHero
                  ? formData
                      .get('button_label')
                      .trim() || null
                  : null,

              button_url:
                isHero
                  ? formData
                      .get('button_url')
                      .trim() || null
                  : null,

              secondary_button_label:
                isHero
                  ? formData
                      .get(
                        'secondary_button_label'
                      )
                      .trim() || null
                  : null,

              secondary_button_url:
                isHero
                  ? formData
                      .get(
                        'secondary_button_url'
                      )
                      .trim() || null
                  : null,

              show_buttons:
                isHero
                  ? formData.get('show_buttons') === 'on'
                  : content.show_buttons ?? true,

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
                'Saving...';

              await updateContent(
                contentId,
                contentData
              );

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
                'Save Changes';

              console.error(
                'Unable to update site content:',
                error
              );
            }
          }
        );
      });
    });


    // ================================
    // DELETE CONTENT
    // ================================

    const deleteContentButtons =
      document.querySelectorAll(
        '[data-delete-content]'
      );

    deleteContentButtons.forEach((button) => {
      button.addEventListener(
        'click',
        async () => {
          const contentId =
            Number(
              button.dataset.deleteContent
            );

          const content =
            contentItems.find(
              (item) =>
                item.id === contentId
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
            button.disabled = true;
            button.textContent =
              'Deleting...';

            await deleteContent(
              contentId
            );

            await loadPublicSiteContent();
            await loadArtistsAdminSection();

          } catch (error) {
            button.disabled = false;
            button.textContent =
              'Delete';

            console.error(
              'Unable to delete site content:',
              error
            );
          }
        }
      );
    });

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

  addVotingButton.addEventListener('click', () => {
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
              Create a new voting opportunity for the website.
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
            <span>Event name</span>

            <input
              type="text"
              name="event"
              required
            />
          </label>

          <label>
            <span>Platform</span>

            <input
              type="text"
              name="platform"
              required
            />
          </label>

          <label>
            <span>Voting URL</span>

            <input
              type="url"
              name="url"
              required
            />
          </label>

          <label>
            <span>Voting type</span>

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
            <span>Priority</span>

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
            <span>Accent</span>

            <select name="accent">

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
            <span>Deadline</span>

            <input
              type="datetime-local"
              name="deadline"
            />
          </label>

          <label>
            <span>Frequency</span>

            <input
              type="text"
              name="frequency"
              placeholder="Example: Daily Voting"
            />
          </label>

          <label>
            <span>Tutorial URL</span>

            <input
              type="url"
              name="tutorial_url"
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
            Save Voting
          </button>

        </form>

      </div>
    `;


    const cancelAddVoting =
      document.querySelector('#cancelAddVoting');

    cancelAddVoting.addEventListener('click', () => {
      loadVotingAdminSection();
    });


    const adminVotingForm =
      document.querySelector('#adminVotingForm');

    adminVotingForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const formData =
          new FormData(adminVotingForm);

        const votingData = {
          event:
            formData.get('event').trim(),

          platform:
            formData.get('platform').trim(),

          url:
            formData.get('url').trim(),

          vote_type:
            formData.get('vote_type'),

          priority:
            Number(formData.get('priority')),

          accent:
            formData.get('accent'),

          deadline:
            formData.get('deadline') || null,

          frequency:
            formData.get('frequency').trim() || null,

          tutorial_url:
            formData.get('tutorial_url').trim() || null,

          sort_order:
            Number(formData.get('sort_order')) || 0,

          active:
            formData.get('active') === 'on',
        };

        try {
          await createVotingPlatform(votingData);

await loadVotingAdminSection();
await loadPublicVotingPlatforms();
await loadPublicTutorials();

        } catch (error) {
          console.error(
            'Unable to create voting platform:',
            error
          );
        }
      }
    );
  });
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
  document.querySelectorAll('[data-edit-voting]');

editVotingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const votingId =
      Number(button.dataset.editVoting);

    const platform =
      platforms.find((item) => item.id === votingId);

    if (!platform) {
      return;
    }

    const deadlineValue =
      platform.deadline
        ? new Date(platform.deadline)
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
              Update this voting opportunity.
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
            <span>Event name</span>

            <input
              type="text"
              name="event"
              value="${platform.event ?? ''}"
              required
            />
          </label>

          <label>
            <span>Platform</span>

            <input
              type="text"
              name="platform"
              value="${platform.platform ?? ''}"
              required
            />
          </label>

          <label>
            <span>Voting URL</span>

            <input
              type="url"
              name="url"
              value="${platform.url ?? ''}"
              required
            />
          </label>

          <label>
            <span>Voting type</span>

            <select
              name="vote_type"
              required
            >

              <option
                value="ceremony"
                ${platform.vote_type === 'ceremony' ? 'selected' : ''}
              >
                Awards & Ceremonies
              </option>

              <option
                value="poll"
                ${platform.vote_type === 'poll' ? 'selected' : ''}
              >
                Poll
              </option>

              <option
                value="advertising"
                ${platform.vote_type === 'advertising' ? 'selected' : ''}
              >
                Advertising
              </option>

            </select>
          </label>

          <label>
            <span>Priority</span>

            <select
              name="priority"
              required
            >

              <option
                value="1"
                ${platform.priority === 1 ? 'selected' : ''}
              >
                Urgent
              </option>

              <option
                value="2"
                ${platform.priority === 2 ? 'selected' : ''}
              >
                High
              </option>

              <option
                value="3"
                ${platform.priority === 3 ? 'selected' : ''}
              >
                Normal
              </option>

            </select>
          </label>

          <label>
            <span>Accent</span>

            <select name="accent">

              <option
                value="lmsy"
                ${platform.accent === 'lmsy' ? 'selected' : ''}
              >
                LMSY
              </option>

              <option
                value="lookmhee"
                ${platform.accent === 'lookmhee' ? 'selected' : ''}
              >
                Lookmhee
              </option>

              <option
                value="sonya"
                ${platform.accent === 'sonya' ? 'selected' : ''}
              >
                Sonya
              </option>

            </select>
          </label>

          <label>
            <span>Deadline</span>

            <input
              type="datetime-local"
              name="deadline"
              value="${deadlineValue}"
            />
          </label>

          <label>
            <span>Frequency</span>

            <input
              type="text"
              name="frequency"
              value="${platform.frequency ?? ''}"
            />
          </label>

          <label>
            <span>Tutorial URL</span>

            <input
              type="url"
              name="tutorial_url"
              value="${platform.tutorial_url ?? ''}"
            />
          </label>

          <label>
            <span>Sort order</span>

            <input
              type="number"
              name="sort_order"
              value="${platform.sort_order ?? 0}"
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="active"
              ${platform.active ? 'checked' : ''}
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

    const cancelEditVoting =
      document.querySelector('#cancelEditVoting');

    cancelEditVoting.addEventListener('click', () => {
      loadVotingAdminSection();
    });

    const adminEditVotingForm =
      document.querySelector('#adminEditVotingForm');

    adminEditVotingForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const formData =
          new FormData(adminEditVotingForm);

        const votingData = {
          event:
            formData.get('event').trim(),

          platform:
            formData.get('platform').trim(),

          url:
            formData.get('url').trim(),

          vote_type:
            formData.get('vote_type'),

          priority:
            Number(formData.get('priority')),

          accent:
            formData.get('accent'),

          deadline:
            formData.get('deadline') || null,

          frequency:
            formData.get('frequency').trim() || null,

          tutorial_url:
            formData.get('tutorial_url').trim() || null,

          sort_order:
            Number(formData.get('sort_order')) || 0,

          active:
            formData.get('active') === 'on',
        };

        const saveChangesButton =
          adminEditVotingForm.querySelector(
            'button[type="submit"]'
          );

        try {
          saveChangesButton.disabled = true;
          saveChangesButton.textContent = 'Saving...';

          await updateVotingPlatform(
  votingId,
  votingData
);

await loadPublicVotingPlatforms();
await loadPublicTutorials();

          saveChangesButton.textContent = 'Saved ✓';

          setTimeout(async () => {
            await loadVotingAdminSection();
          }, 700);

        } catch (error) {
          saveChangesButton.disabled = false;
          saveChangesButton.textContent = 'Save Changes';

          console.error(
            'Unable to update voting platform:',
            error
          );
        }
      }
    );
  });
});


// ================================
// DELETE VOTING
// ================================

const deleteVotingButtons =
  document.querySelectorAll('[data-delete-voting]');

deleteVotingButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const votingId =
      Number(button.dataset.deleteVoting);

    const platform =
      platforms.find((item) => item.id === votingId);

    if (!platform) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${platform.event}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      button.disabled = true;
      button.textContent = 'Deleting...';

      await deleteVotingPlatform(votingId);

await loadVotingAdminSection();
await loadPublicVotingPlatforms();
await loadPublicTutorials();

    } catch (error) {
      button.disabled = false;
      button.textContent = 'Delete';

      console.error(
        'Unable to delete voting platform:',
        error
      );
    }
  });
});

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
            <span>Title</span>

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
            <span>Description</span>

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
            Save Tutorial
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

        try {
          await createTutorial(tutorialData);

          await loadTutorialAdminSection();
          await loadPublicTutorials();

        } catch (error) {
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
                Update this tutorial.
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
              <span>Title</span>

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
              <span>Description</span>

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
              Save Changes
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
            saveChangesButton.textContent = 'Saving...';

            await updateTutorial(
              tutorialId,
              tutorialData
            );

            await loadPublicTutorials();

            saveChangesButton.textContent = 'Saved ✓';

            setTimeout(async () => {
              await loadTutorialAdminSection();
            }, 700);

          } catch (error) {
            saveChangesButton.disabled = false;
            saveChangesButton.textContent =
              'Save Changes';

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
  document.querySelectorAll('[data-delete-tutorial]');

deleteTutorialButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const tutorialId =
      Number(button.dataset.deleteTutorial);

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
        `Delete "${tutorial.title}"? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      button.disabled = true;
      button.textContent = 'Deleting...';

      await deleteTutorial(
        tutorialId
      );

      await loadTutorialAdminSection();
      await loadPublicTutorials();

    } catch (error) {
      button.disabled = false;
      button.textContent = 'Delete';

      console.error(
        'Unable to delete tutorial:',
        error
      );
    }
  });
});


// ================================
// EDIT VOTING FROM TUTORIAL
// ================================

const editVotingFromTutorialButtons =
  document.querySelectorAll(
    '[data-edit-voting-from-tutorial]'
  );

editVotingFromTutorialButtons.forEach((button) => {
  button.addEventListener(
    'click',
    async () => {
      const votingId =
        Number(
          button.dataset.editVotingFromTutorial
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
});

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

  addSupportButton.addEventListener('click', () => {
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
              Create a new support fund for the public website.
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
            <span>Fund Title</span>

            <input
              type="text"
              name="title"
              placeholder="LMSY Voting Fund"
              required
            />
          </label>


          <label style="grid-column: 1 / -1;">
            <span>Description</span>

            <textarea
              name="description"
              rows="4"
              placeholder="Explain what this voting fund will be used for."
            ></textarea>
          </label>


          <label>
            <span>Raised Amount</span>

            <input
              type="number"
              name="raised_amount"
              min="0"
              step="0.01"
              value="0"
            />
          </label>


          <label>
            <span>Goal Amount</span>

            <input
              type="number"
              name="goal_amount"
              min="0"
              step="0.01"
              value="0"
            />
          </label>


          <label style="grid-column: 1 / -1;">
            <span>Donation QR</span>

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

            <span>Active</span>

          </label>


          <button
            class="btn btn-primary"
            type="submit"
          >
            Save Fund
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
          formData.get('qr_image');

        const saveSupportButton =
          adminSupportForm.querySelector(
            'button[type="submit"]'
          );


        try {
          saveSupportButton.disabled = true;
          saveSupportButton.textContent =
            'Saving...';


          let qrImageUrl = null;

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
              formData.get('active') ===
              'on',
          };


          saveSupportButton.textContent =
            'Saving fund...';

          await createDonationSetting(
            supportData
          );

          await loadPublicSupport();
          await loadSupportAdminSection();

        } catch (error) {
          saveSupportButton.disabled =
            false;

          saveSupportButton.textContent =
            'Save Fund';

          console.error(
            'Unable to create support fund:',
            error
          );
        }
      }
    );
  });


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
                      Update this support fund.
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
                    <span>Fund Title</span>

                    <input
                      type="text"
                      name="title"
                      value="${support.title ?? ''}"
                      required
                    />
                  </label>


                  <label style="grid-column: 1 / -1;">
                    <span>Description</span>

                    <textarea
                      name="description"
                      rows="4"
                    >${support.description ?? ''}</textarea>
                  </label>


                  <label>
                    <span>Raised Amount</span>

                    <input
                      type="number"
                      name="raised_amount"
                      min="0"
                      step="0.01"
                      value="${support.raised_amount ?? 0}"
                    />
                  </label>


                  <label>
                    <span>Goal Amount</span>

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


            const cancelEditSupport =
              document.querySelector(
                '#cancelEditSupport'
              );


            cancelEditSupport
              .addEventListener(
                'click',
                () => {
                  loadSupportAdminSection();
                }
              );


            const adminEditSupportForm =
              document.querySelector(
                '#adminEditSupportForm'
              );


            adminEditSupportForm
              .addEventListener(
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
                    adminEditSupportForm
                      .querySelector(
                        'button[type="submit"]'
                      );


                  try {
                    saveChangesButton.disabled =
                      true;

                    saveChangesButton.textContent =
                      'Saving...';


                    let qrImageUrl =
                      support.qr_image_url ||
                      null;


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


                    saveChangesButton.textContent =
                      'Saving changes...';


                    await updateDonationSetting(
                      supportId,
                      supportData
                    );


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
                      'Save Changes';

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


              await deleteDonationSetting(
                supportId
              );


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
    document.querySelector('#adminWatchList');

  const addWatchButton =
    document.querySelector('#addWatchButton');

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
      adminWatchList.innerHTML = watchLinks
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
                    ${item.active ? 'Active' : 'Inactive'}
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


      // ================================
      // EDIT WATCH / RESULT
      // ================================

      const editWatchButtons =
        document.querySelectorAll(
          '[data-edit-watch]'
        );

      editWatchButtons.forEach((button) => {
        button.addEventListener('click', () => {
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
                    timeZone: 'Asia/Bangkok',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: 'h23',
                  }
                )
                  .formatToParts(
                    new Date(
                      item.scheduled_at
                    )
                  )
                  .reduce(
                    (parts, part) => {
                      parts[part.type] =
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
                    Update this live stream or results page.
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
                  <span>Type</span>

                  <select
                    name="type"
                    required
                  >
                    <option
                      value="live"
                      ${item.type === 'live' ? 'selected' : ''}
                    >
                      Live / Watch
                    </option>

                    <option
                      value="result"
                      ${item.type === 'result' ? 'selected' : ''}
                    >
                      Results
                    </option>
                  </select>
                </label>

                <label>
                  <span>Title</span>

                  <input
                    type="text"
                    name="title"
                    value="${item.title ?? ''}"
                    required
                  />
                </label>

                <label>
                  <span>Description</span>

                  <textarea
                    name="description"
                    rows="3"
                  >${item.description ?? ''}</textarea>
                </label>

                <label>
                  <span>Platform</span>

                  <input
                    type="text"
                    name="platform"
                    value="${item.platform ?? ''}"
                  />
                </label>

                <label>
                  <span>Link</span>

                  <input
                    type="url"
                    name="url"
                    value="${item.url ?? ''}"
                    required
                  />
                </label>

                <label>
                  <span>Date & Time — Thailand</span>

                  <input
                    type="datetime-local"
                    name="scheduled_at"
                    value="${scheduledValue}"
                  />
                </label>

                <label>
                  <span>Thumbnail URL</span>

                  <input
                    type="url"
                    name="thumbnail_url"
                    value="${item.thumbnail_url ?? ''}"
                  />
                </label>

                <label>
                  <span>Button label</span>

                  <input
                    type="text"
                    name="button_label"
                    value="${item.button_label ?? ''}"
                  />
                </label>

                <label>
                  <span>Sort order</span>

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
                    ${item.active ? 'checked' : ''}
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
                formData.get('type');

              const thailandDateTime =
                formData.get(
                  'scheduled_at'
                );

              let scheduledAt = null;

              if (thailandDateTime) {
                scheduledAt = new Date(
                  `${thailandDateTime}:00+07:00`
                ).toISOString();
              }

              const watchData = {
                type,

                title:
                  formData
                    .get('title')
                    .trim(),

                description:
                  formData
                    .get('description')
                    .trim() || null,

                platform:
                  formData
                    .get('platform')
                    .trim() || null,

                url:
                  formData
                    .get('url')
                    .trim(),

                scheduled_at:
                  scheduledAt,

                thumbnail_url:
                  formData
                    .get('thumbnail_url')
                    .trim() || null,

                button_label:
                  formData
                    .get('button_label')
                    .trim() ||
                  (
                    type === 'live'
                      ? 'Watch Live'
                      : 'View Results'
                  ),

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
                  'Saving...';

                await updateWatchLink(
                  watchId,
                  watchData
                );

                await loadPublicWatchLinks();

                saveChangesButton.textContent =
                  'Saved ✓';

                setTimeout(
                  async () => {
                    await loadWatchAdminSection();
                  },
                  600
                );

              } catch (error) {
                saveChangesButton.disabled =
                  false;

                saveChangesButton.textContent =
                  'Save Changes';

                console.error(
                  'Unable to update Watch & Results entry:',
                  error
                );
              }
            }
          );
        });
      });


      // ================================
      // DELETE WATCH / RESULT
      // ================================

      const deleteWatchButtons =
        document.querySelectorAll(
          '[data-delete-watch]'
        );

      deleteWatchButtons.forEach((button) => {
        button.addEventListener(
          'click',
          async () => {
            const watchId =
              Number(
                button.dataset.deleteWatch
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
              button.disabled = true;
              button.textContent =
                'Deleting...';

              await deleteWatchLink(
                watchId
              );

              await loadPublicWatchLinks();
              await loadWatchAdminSection();

            } catch (error) {
              button.disabled = false;
              button.textContent =
                'Delete';

              console.error(
                'Unable to delete Watch & Results entry:',
                error
              );
            }
          }
        );
      });
    }

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

  addWatchButton.addEventListener('click', () => {
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
              Add a live stream or an official results page.
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
            <span>Type</span>

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
            <span>Title</span>

            <input
              type="text"
              name="title"
              placeholder="Example: LMSY Live at Y Entertain Awards"
              required
            />
          </label>

          <label>
            <span>Description</span>

            <textarea
              name="description"
              rows="3"
              placeholder="Optional short description"
            ></textarea>
          </label>

          <label>
            <span>Platform</span>

            <input
              type="text"
              name="platform"
              placeholder="YouTube, Facebook, Instagram, Website..."
            />
          </label>

          <label>
            <span>Link</span>

            <input
              type="url"
              name="url"
              required
            />
          </label>

          <label>
            <span>Date & Time — Thailand</span>

            <input
              type="datetime-local"
              name="scheduled_at"
            />
          </label>

          <label>
            <span>Thumbnail URL</span>

            <input
              type="url"
              name="thumbnail_url"
              placeholder="Optional"
            />
          </label>

          <label>
            <span>Button label</span>

            <input
              type="text"
              name="button_label"
              placeholder="Example: Watch Live"
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
            Save
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
          formData.get('type');

        const thailandDateTime =
          formData.get(
            'scheduled_at'
          );

        let scheduledAt = null;

        if (thailandDateTime) {
          scheduledAt = new Date(
            `${thailandDateTime}:00+07:00`
          ).toISOString();
        }

        const watchData = {
          type,

          title:
            formData
              .get('title')
              .trim(),

          description:
            formData
              .get('description')
              .trim() || null,

          platform:
            formData
              .get('platform')
              .trim() || null,

          url:
            formData
              .get('url')
              .trim(),

          scheduled_at:
            scheduledAt,

          thumbnail_url:
            formData
              .get('thumbnail_url')
              .trim() || null,

          button_label:
            formData
              .get('button_label')
              .trim() ||
            (
              type === 'live'
                ? 'Watch Live'
                : 'View Results'
            ),

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
          adminWatchForm.querySelector(
            'button[type="submit"]'
          );

        try {
          saveButton.disabled = true;
          saveButton.textContent =
            'Saving...';

          await createWatchLink(
            watchData
          );

          await loadPublicWatchLinks();

          saveButton.textContent =
            'Saved ✓';

          setTimeout(
            async () => {
              await loadWatchAdminSection();
            },
            600
          );

        } catch (error) {
          saveButton.disabled = false;
          saveButton.textContent =
            'Save';

          console.error(
            'Unable to create Watch & Results entry:',
            error
          );
        }
      }
    );
  });
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