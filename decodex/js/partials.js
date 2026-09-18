(function () {
  const inPages = location.pathname.includes('/pages/');
  const toRoot = inPages ? '../' : '';
  const toPages = inPages ? '' : 'pages/';

  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a href="${toRoot}index.html" class="logo" aria-label="DecodeX Home">
          <img src="${toRoot}assets/images/logo.png" alt="DecodeX" class="logo__mark">
          <span class="logo__text">Decode<span>X</span></span>
        </a>

        <nav class="nav-desktop" aria-label="Main">
          <a href="${toRoot}index.html" class="nav-link">Home</a>
          <a href="${toPages}about.html" class="nav-link">About</a>
          <a href="${toPages}reviews.html" class="nav-link">Reviews</a>
          <a href="${toPages}gadgets.html" class="nav-link">Gadgets</a>
          <a href="${toPages}videos.html" class="nav-link">Videos</a>
          <a href="${toPages}blog.html" class="nav-link">Blog</a>

          <div class="nav-dropdown">
            <button class="nav-link nav-dropdown__btn" aria-expanded="false">
              More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="nav-dropdown__menu">
              <a href="${toPages}achievements.html">Achievements</a>
              <a href="${toPages}giveaways.html">Giveaways</a>
              <a href="${toPages}finder.html">Phone Finder</a>
              <a href="${toPages}compare.html">Compare</a>
              <a href="${toPages}contact.html">Contact</a>
            </div>
          </div>
        </nav>

        <div class="header-actions">
          <button class="search-bar-trigger" data-search-open aria-label="Open search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span>Search anything...</span>
            <kbd>Ctrl+K</kbd>
          </button>
          <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme"></button>
          <button id="menu-toggle" class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile">
            <span class="menu-toggle__icon"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </header>

    <nav id="nav-mobile" class="nav-mobile" aria-label="Mobile">
      <ul class="nav-mobile__list">
        <li><a href="${toRoot}index.html" class="nav-mobile__link">Home</a></li>
        <li><a href="${toPages}about.html" class="nav-mobile__link">About</a></li>
        <li><a href="${toPages}videos.html" class="nav-mobile__link">Videos</a></li>
        <li><a href="${toPages}reviews.html" class="nav-mobile__link">Reviews</a></li>
        <li><a href="${toPages}finder.html" class="nav-mobile__link">Phone Finder</a></li>
        <li><a href="${toPages}gadgets.html" class="nav-mobile__link">Gadgets</a></li>
        <li><a href="${toPages}achievements.html" class="nav-mobile__link">Achievements</a></li>
        <li><a href="${toPages}giveaways.html" class="nav-mobile__link">Giveaways</a></li>
        <li><a href="${toPages}blog.html" class="nav-mobile__link">Blog</a></li>
        <li><a href="${toPages}contact.html" class="nav-mobile__link">Contact</a></li>
      </ul>
      <div class="nav-mobile__socials">
        <a href="https://www.tiktok.com/@itsdecordex" class="footer-social" target="_blank" rel="noopener" aria-label="TikTok">TT</a>
        <a href="https://www.instagram.com/itsdecordex" class="footer-social" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
        <a href="https://youtube.com/@itsdecordex" class="footer-social" target="_blank" rel="noopener" aria-label="YouTube">YT</a>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand__logo">
              <img src="${toRoot}assets/images/logo.png" alt="DecodeX" style="width:28px;height:28px;border-radius:8px">
              DecodeX
            </div>
            <p class="footer-brand__tagline">Technology, phones & creator content. Decode the future.</p>
            <div class="footer-socials">
              <a href="https://www.tiktok.com/@itsdecordex?_r=1&_t=ZS-99oCHNzu2J3" class="footer-social" target="_blank" rel="noopener" aria-label="TikTok">TT</a>
              <a href="https://www.instagram.com/itsdecordex" class="footer-social" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
              <a href="https://youtube.com/@itsdecordex?si=nItkzvrAOrkA65Is" class="footer-social" target="_blank" rel="noopener" aria-label="YouTube">YT</a>
              <a href="https://www.linkedin.com/in/muhammad-ahtisham-mukhtar-68341a3a6" class="footer-social" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div>
            <h3 class="footer-col__title">Explore</h3>
            <ul class="footer-links">
              <li><a href="${toPages}reviews.html">Reviews</a></li>
              <li><a href="${toPages}videos.html">Videos</a></li>
              <li><a href="${toPages}finder.html">Phone Finder</a></li>
              <li><a href="${toPages}gadgets.html">Gadgets</a></li>
              <li><a href="${toPages}blog.html">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-col__title">Brand</h3>
            <ul class="footer-links">
              <li><a href="${toPages}about.html">About</a></li>
              <li><a href="${toPages}achievements.html">Achievements</a></li>
              <li><a href="${toPages}giveaways.html">Giveaways</a></li>
              <li><a href="${toPages}contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-col__title">Connect</h3>
            <ul class="footer-links">
              <li><a href="mailto:itsdecordex@gmail.com">itsdecordex@gmail.com</a></li>
              <li><a href="https://www.tiktok.com/@itsdecordex" target="_blank" rel="noopener">@itsdecordex</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© <span id="year"></span> DecodeX · Muhammad Ahtisham Mukhtar. Built with HTML · CSS · JavaScript.</p>
          <div class="footer-bottom__links">
            <a href="${toPages}privacy.html">Privacy</a>
            <a href="${toPages}terms.html">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();