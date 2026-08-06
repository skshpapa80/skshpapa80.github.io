(function () {
  'use strict';

  let postsData = null;
  let isLoading = false;
  let selectedIndex = -1;

  const overlay = document.getElementById('search-modal-overlay');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchInitial = document.getElementById('search-initial');
  const triggerBtn = document.getElementById('search-trigger');
  const closeBtn = document.getElementById('search-close-btn');

  if (!overlay || !searchInput || !searchResults) return;

  // Base URL resolution
  const getSearchJsonUrl = () => {
    const baseUrl = window.siteBaseUrl || '';
    return baseUrl.endsWith('/') ? baseUrl + 'search.json' : baseUrl + '/search.json';
  };

  // Fetch search data
  const loadSearchData = async () => {
    if (postsData || isLoading) return;
    isLoading = true;
    try {
      const res = await fetch(getSearchJsonUrl());
      if (!res.ok) throw new Error('Search index load failed');
      postsData = await res.json();
    } catch (err) {
      console.error('[Search Error]', err);
    } finally {
      isLoading = false;
    }
  };

  // Open modal
  const openSearch = async () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    await loadSearchData();
    setTimeout(() => searchInput.focus(), 50);
  };

  // Close modal
  const closeSearch = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInitial.style.display = 'block';
    searchInitial.textContent = '검색어를 입력하시면 게시글을 찾을 수 있습니다.';
    selectedIndex = -1;
  };

  // Perform search
  const performSearch = (query) => {
    const trimmed = query.trim().toLowerCase();
    searchResults.innerHTML = '';
    selectedIndex = -1;

    if (!trimmed) {
      searchInitial.style.display = 'block';
      searchInitial.textContent = '검색어를 입력하시면 게시글을 찾을 수 있습니다.';
      return;
    }

    if (!postsData) {
      searchInitial.style.display = 'block';
      searchInitial.textContent = '검색 데이터를 로딩 중입니다...';
      return;
    }

    const terms = trimmed.split(/\s+/);
    const results = postsData.filter((post) => {
      const title = (post.title || '').toLowerCase();
      const tags = (post.tags || '').toLowerCase();
      const excerpt = (post.excerpt || '').toLowerCase();
      const fullText = `${title} ${tags} ${excerpt}`;

      return terms.every((term) => fullText.includes(term));
    });

    if (results.length === 0) {
      searchInitial.style.display = 'block';
      searchInitial.textContent = `"${query}"에 대한 검색 결과가 없습니다.`;
      return;
    }

    searchInitial.style.display = 'none';

    // Render max 20 results for speed
    const fragment = document.createDocumentFragment();
    results.slice(0, 20).forEach((post, idx) => {
      const li = document.createElement('li');
      li.className = 'search-result-item';

      const tagHtml = post.tags
        ? `<span class="search-result-tag">${escapeHtml(post.tags)}</span>`
        : '';
      const dateHtml = post.date
        ? `<span class="search-result-date">${escapeHtml(post.date)}</span>`
        : '';

      li.innerHTML = `
        <a href="${escapeHtml(post.url)}" data-index="${idx}">
          <div class="search-result-header">
            <span class="search-result-title">${highlightText(post.title, trimmed)}</span>
          </div>
          <div class="search-result-meta">
            ${dateHtml}
            ${tagHtml}
          </div>
          ${post.excerpt ? `<div class="search-result-excerpt">${highlightText(post.excerpt, trimmed)}</div>` : ''}
        </a>
      `;
      fragment.appendChild(li);
    });

    searchResults.appendChild(fragment);
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const highlightText = (text, query) => {
    if (!text) return '';
    const safeText = escapeHtml(text);
    if (!query) return safeText;
    const terms = query.split(/\s+/).filter(Boolean);
    if (!terms.length) return safeText;

    const regex = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
    return safeText.replace(regex, '<mark style="background: rgba(200, 96, 42, 0.2); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Keyboard navigation
  const updateSelection = (items) => {
    items.forEach((item, i) => {
      const link = item.querySelector('a');
      if (i === selectedIndex) {
        link.classList.add('is-selected');
        link.scrollIntoView({ block: 'nearest' });
      } else {
        link.classList.remove('is-selected');
      }
    });
  };

  // Event Listeners
  if (triggerBtn) {
    triggerBtn.addEventListener('click', openSearch);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        const link = items[selectedIndex].querySelector('a');
        if (link) window.location.href = link.href;
      } else if (items[0]) {
        const link = items[0].querySelector('a');
        if (link) window.location.href = link.href;
      }
    }
  });

  // Global Shortcuts: Ctrl+K, Cmd+K, or '/' key
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    } else if (
      e.key === '/' &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) &&
      !document.activeElement.isContentEditable
    ) {
      e.preventDefault();
      openSearch();
    }
  });
})();
