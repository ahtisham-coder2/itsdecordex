/**
 * DecodeX — Core Application
 * Theme, navigation, search, toasts, scroll, accessibility
 */

(function () {
  'use strict';

  // Path helper: works from root or /pages/
  function getPath(path) {
    const inPages = /\/pages\//.test(window.location.pathname);
    if (path.startsWith('http') || path.startsWith('#')) return path;
    if (inPages) {
      if (path.startsWith('pages/')) return path.replace(/^pages\//, '');
      if (path === 'index.html' || path === './') return '../index.html';
      return '../' + path;
    }
    return path;
  }

  // ---------- Theme ----------
  const THEME_KEY = 'decodex-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  function initTheme() {
    setTheme(getPreferredTheme());
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
  function initNavDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;
    const btn = dropdown.querySelector('.nav-dropdown__btn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // ---------- Mobile Nav ----------
  function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-mobile');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ---------- Header scroll ----------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Scroll progress ----------
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ---------- Back to top ----------
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Toast ----------
  function showToast(message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  window.showToast = showToast;

  // ---------- Global Search ----------
  function initSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const openBtns = document.querySelectorAll('[data-search-open]');
    const closeBtn = document.getElementById('search-close');

    if (!overlay || !input) return;

    function openSearch() {
      overlay.classList.add('open');
      input.value = '';
      results.innerHTML = '<div class="search-empty">Type to search phones, videos, reviews…</div>';
      setTimeout(() => input.focus(), 100);
      document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    openBtns.forEach((btn) => btn.addEventListener('click', openSearch));
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        results.innerHTML = '<div class="search-empty">Type at least 2 characters…</div>';
        return;
      }
      const items = [];
      if (window.PHONES_DATA) {
        window.PHONES_DATA.forEach((p) => {
          const hay = `${p.name} ${p.brand} ${p.chipset} ${p.tags?.join(' ') || ''}`.toLowerCase();
          if (hay.includes(q)) {
            items.push({
              type: 'Phone',
              title: p.name,
              subtitle: `${p.brand} · PKR ${p.pricePKR.toLocaleString()}`,
              href: getPath(`pages/reviews.html#${p.id}`)
            });
          }
        });
      }
      if (window.VIDEOS_DATA) {
        window.VIDEOS_DATA.forEach((v) => {
          if (v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)) {
            items.push({
              type: 'Video',
              title: v.title,
              subtitle: v.category,
              href: v.url
            });
          }
        });
      }
      // Static pages
      const pages = [
        { type: 'Page', title: 'About DecodeX', subtitle: 'Brand & creator', href: getPath('pages/about.html') },
        { type: 'Page', title: 'Phone Finder', subtitle: 'Find your next phone', href: getPath('pages/finder.html') },
        { type: 'Page', title: 'Contact', subtitle: 'Get in touch', href: getPath('pages/contact.html') },
        { type: 'Page', title: 'Gadgets', subtitle: 'Accessories & more', href: getPath('pages/gadgets.html') },
        { type: 'Page', title: 'Blog', subtitle: 'Tips & guides', href: getPath('pages/blog.html') }
      ];
      pages.forEach((p) => {
        if (p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)) {
          items.push(p);
        }
      });

      if (items.length === 0) {
        results.innerHTML = '<div class="search-empty">No results found. Try a different term.</div>';
        return;
      }
      results.innerHTML = items.slice(0, 12).map((item) => `
        <a href="${item.href}" class="search-result-item" ${item.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
          <span class="badge badge--neutral">${item.type}</span>
          <div>
            <div style="font-weight:600;color:var(--color-text-primary)">${item.title}</div>
            <div style="font-size:var(--fs-xs);color:var(--color-text-muted)">${item.subtitle}</div>
          </div>
        </a>
      `).join('');
    });
  }

  // ---------- Video carousel ----------
  function initVideoCarousel() {
    const track = document.getElementById('video-track');
    const prev = document.getElementById('video-prev');
    const next = document.getElementById('video-next');
    if (!track) return;

    function scrollByCard(dir) {
      const card = track.querySelector('.video-card');
      if (!card) return;
      const amount = card.offsetWidth + 16;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    if (prev) prev.addEventListener('click', () => scrollByCard(-1));
    if (next) next.addEventListener('click', () => scrollByCard(1));
  }

  // ---------- Render videos ----------
  function renderVideos() {
    const track = document.getElementById('video-track');
    if (!track || !window.VIDEOS_DATA) return;
    track.innerHTML = window.VIDEOS_DATA.map((v) => `
      <article class="video-card">
        <div class="video-card__thumb">
          <img src="${v.thumbnail}" alt="${v.title}" loading="lazy" width="260" height="460">
          <span class="video-card__platform">${v.platform}</span>
          <a href="${v.url}" class="video-card__play" target="_blank" rel="noopener" aria-label="Watch ${v.title}">
            <span class="video-card__play-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
          </a>
        </div>
        <div class="video-card__body">
          <h3 class="video-card__title">${v.title}</h3>
          <p class="video-card__meta">${v.category} · ${v.date}</p>
        </div>
      </article>
    `).join('');
  }

  // ---------- Render featured phones ----------
  function renderFeaturedPhones() {
    const grid = document.getElementById('featured-phones');
    if (!grid || !window.PHONES_DATA) return;
    const featured = window.PHONES_DATA.slice(0, 4);
    grid.innerHTML = featured.map((p) => `
      <article class="phone-card">
        <div class="phone-card__img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="200" height="200">
        </div>
        <div class="phone-card__body">
          <span class="phone-card__brand">${p.brand}</span>
          <h3 class="phone-card__name">${p.name}</h3>
          <div class="phone-card__rating">
            <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
            <span style="font-size:var(--fs-xs);color:var(--color-text-muted)">${p.rating}</span>
          </div>
          <div class="phone-card__price">PKR ${p.pricePKR.toLocaleString()}</div>
          <p class="phone-card__price-note">Price may vary</p>
          <div class="phone-card__specs">
            <span class="tag">${p.display.size}</span>
            <span class="tag">${p.ram}</span>
            <span class="tag">${p.battery}</span>
          </div>
          <div class="phone-card__actions">
            <a href="pages/reviews.html#${p.id}" class="btn btn--primary btn--sm">View Review</a>
            <button class="btn btn--ghost btn--sm" data-fav="${p.id}" aria-label="Save ${p.name}">♡</button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-fav');
        let favs = JSON.parse(localStorage.getItem('decodex-favs') || '[]');
        if (favs.includes(id)) {
          favs = favs.filter((x) => x !== id);
          btn.textContent = '♡';
          showToast('Removed from favourites');
        } else {
          favs.push(id);
          btn.textContent = '♥';
          showToast('Saved to favourites');
        }
        localStorage.setItem('decodex-favs', JSON.stringify(favs));
      });
    });
  }

  // ---------- Phone Finder ----------
  function initPhoneFinder() {
    const form = document.getElementById('finder-form');
    const resultsEl = document.getElementById('finder-results');
    if (!form || !resultsEl || !window.PHONES_DATA) return;

    const chips = form.querySelectorAll('.criteria-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        const input = chip.querySelector('input');
        if (input) input.checked = chip.classList.contains('active');
      });
    });

    const budgetSlider = form.querySelector('#budget-slider');
    const budgetDisplay = form.querySelector('#budget-display');
    if (budgetSlider && budgetDisplay) {
      budgetSlider.addEventListener('input', () => {
        budgetDisplay.textContent = 'Up to PKR ' + Number(budgetSlider.value).toLocaleString();
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const selected = Array.from(form.querySelectorAll('.criteria-chip.active')).map((c) => c.dataset.criteria);
      const maxBudget = budgetSlider ? Number(budgetSlider.value) : 500000;

      const scored = window.PHONES_DATA
        .filter((p) => p.pricePKR <= maxBudget)
        .map((p) => {
          let score = 0;
          const reasons = [];
          if (selected.includes('gaming') && (p.categories.includes('gaming') || p.categories.includes('performance'))) {
            score += 25;
            reasons.push('Strong performance for gaming');
          }
          if (selected.includes('camera') && p.categories.includes('camera')) {
            score += 25;
            reasons.push('Excellent camera system');
          }
          if (selected.includes('battery') && (p.categories.includes('battery') || parseInt(p.battery) >= 5000)) {
            score += 20;
            reasons.push('Solid battery capacity');
          }
          if (selected.includes('performance') && (p.categories.includes('performance') || p.categories.includes('flagship'))) {
            score += 25;
            reasons.push('High-end chipset');
          }
          if (selected.includes('display') && p.categories.includes('display')) {
            score += 15;
            reasons.push('Premium display');
          }
          if (selected.includes('budget') && p.pricePKR < 80000) {
            score += 20;
            reasons.push('Budget-friendly');
          }
          if (selected.includes('content-creation') && (p.categories.includes('content-creation') || p.categories.includes('camera'))) {
            score += 20;
            reasons.push('Great for content creation');
          }
          if (selected.includes('daily-use')) {
            score += 10;
            reasons.push('Reliable for daily use');
          }
          if (selected.length === 0) score = 50 + (p.rating * 5);
          score = Math.min(100, Math.round(score + p.rating * 5));
          return { phone: p, score, reasons };
        })
        .filter((x) => x.score > 30)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      if (scored.length === 0) {
        resultsEl.innerHTML = '<div class="empty-state"><p class="empty-state__title">No matches</p><p class="empty-state__desc">Try adjusting budget or criteria.</p></div>';
        return;
      }

      resultsEl.innerHTML = `
        <h3 style="margin-bottom:var(--space-4)">Recommended for you</h3>
        <p style="font-size:var(--fs-sm);color:var(--color-text-muted);margin-bottom:var(--space-6)">Matches are based on your selected priorities. Scores are indicative, not absolute rankings.</p>
        ${scored.map(({ phone: p, score, reasons }) => `
          <div class="match-card">
            <div class="match-score">${score}%</div>
            <div>
              <strong style="color:var(--color-text-primary)">${p.name}</strong>
              <div style="font-size:var(--fs-sm);color:var(--color-text-muted)">${p.brand} · PKR ${p.pricePKR.toLocaleString()} (may vary)</div>
              <div style="font-size:var(--fs-xs);margin-top:var(--space-2);color:var(--color-text-secondary)">${reasons.slice(0, 3).join(' · ') || 'Good overall match'}</div>
            </div>
            <a href="${getPath('pages/reviews.html#' + p.id)}" class="btn btn--outline btn--sm">View</a>
          </div>
        `).join('')}
      `;
    });
  }

  // ---------- Contact form ----------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'category', 'subject', 'message'];
      let valid = true;
      fields.forEach((id) => {
        const el = form.querySelector(`#${id}`);
        const group = el?.closest('.form-group');
        if (!el || !el.value.trim()) {
          group?.classList.add('has-error');
          valid = false;
        } else {
          group?.classList.remove('has-error');
        }
      });
      const email = form.querySelector('#email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
      if (!valid) {
        showToast('Please fill all required fields correctly.', 'error');
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Integration point: replace with your email service (Formspree, EmailJS, custom backend)
      // Example: await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(form) })
      // For now we simulate and offer mailto fallback.
      await new Promise((r) => setTimeout(r, 800));

      const data = new FormData(form);
      const mailto = `mailto:itsdecordex@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCategory: ${data.get('category')}\n\n${data.get('message')}`
      )}`;

      showToast('Message prepared! Opening your email client…', 'success');
      window.location.href = mailto;
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
  }

  // ---------- Announcement banner ----------
  function initAnnouncement() {
    const banner = document.getElementById('announcement-banner');
    if (!banner) return;
    if (localStorage.getItem('decodex-announcement-dismissed') === '1') {
      banner.remove();
      return;
    }
    const close = banner.querySelector('.announcement-banner__close');
    if (close) {
      close.addEventListener('click', () => {
        banner.remove();
        localStorage.setItem('decodex-announcement-dismissed', '1');
      });
    }
  }

  // ---------- Active nav ----------
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .nav-mobile__link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === 'index.html' || href === '/' || href === './') {
        if (path.endsWith('/') || path.endsWith('index.html') || path.endsWith('decodex')) {
          link.classList.add('active');
        }
      } else if (path.includes(href.replace('../', '').replace('pages/', ''))) {
        link.classList.add('active');
      }
    });
  }

  // ---------- Easter egg ----------
  function initEasterEgg() {
    let keys = [];
    const code = ['d', 'e', 'c', 'o', 'd', 'e', 'x'];
    document.addEventListener('keydown', (e) => {
      keys.push(e.key.toLowerCase());
      keys = keys.slice(-7);
      if (keys.join('') === code.join('')) {
        showToast('🔓 DecodeX secret unlocked — stay curious!', 'success', 5000);
        const char = document.querySelector('.hero-character__img');
        if (char) {
          char.style.transition = 'transform 0.5s';
          char.style.transform = 'scale(1.08) rotate(3deg)';
          setTimeout(() => { char.style.transform = ''; }, 800);
        }
      }
    });
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
       initNavDropdown();
    initHeaderScroll();
    initScrollProgress();
    initBackToTop();
    initSearch();
    initVideoCarousel();
    renderVideos();
    renderFeaturedPhones();
    initPhoneFinder();
    initContactForm();
    initAnnouncement();
    setActiveNav();
    initEasterEgg();
  });
})();
