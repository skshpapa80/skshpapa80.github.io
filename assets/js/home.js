/* 홈 사이드바의 "N년 전 오늘"과 아카이브 페이지의 주제 필터 */
(function () {
  'use strict';

  // ─── N년 전 오늘 ─────────────────────────
  function initOnThisDay() {
    var box = document.getElementById('on-this-day');
    if (!box) return;

    var list = box.querySelector('.memory__list');
    var dateEl = box.querySelector('[data-today]');
    var shuffleBtn = box.querySelector('.memory__shuffle');
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    if (dateEl) dateEl.textContent = month + '월 ' + day + '일';

    function dayGap(dateStr) {
      var a = new Date(2000, month - 1, day);
      var b = new Date(2000, Number(dateStr.slice(5, 7)) - 1, Number(dateStr.slice(8, 10)));
      var diff = Math.abs(a - b) / 86400000;
      return Math.min(diff, 366 - diff);
    }

    function item(post, label) {
      var li = document.createElement('li');
      li.className = 'memory__item';
      var ago = document.createElement('span');
      ago.className = 'memory__ago';
      ago.textContent = label;
      var link = document.createElement('a');
      link.href = post.url;
      link.textContent = post.title;
      var time = document.createElement('time');
      time.textContent = post.date.replace(/-/g, '.');
      li.appendChild(ago);
      li.appendChild(link);
      li.appendChild(time);
      return li;
    }

    function message(text) {
      var li = document.createElement('li');
      li.className = 'memory__empty';
      li.textContent = text;
      return li;
    }

    function show(nodes) {
      list.innerHTML = '';
      nodes.forEach(function (n) { list.appendChild(n); });
    }

    fetch(box.getAttribute('data-src'))
      .then(function (res) { return res.json(); })
      .then(function (posts) {
        var past = posts.filter(function (p) {
          return p.date && Number(p.date.slice(0, 4)) < year;
        });

        var near = past
          .map(function (p) { return { post: p, gap: dayGap(p.date) }; })
          .filter(function (x) { return x.gap <= 7; })
          .sort(function (a, b) { return a.gap - b.gap || (a.post.date < b.post.date ? 1 : -1); })
          .slice(0, 3);

        if (near.length) {
          show(near.map(function (x) {
            return item(x.post, (year - Number(x.post.date.slice(0, 4))) + '년 전');
          }));
        } else {
          show([message('이맘때 쓴 글은 아직 없어요. 아래 버튼으로 옛 기록을 꺼내 보세요.')]);
        }

        shuffleBtn.addEventListener('click', function () {
          if (!past.length) return;
          var p = past[Math.floor(Math.random() * past.length)];
          show([item(p, (year - Number(p.date.slice(0, 4))) + '년 전')]);
        });
      })
      .catch(function () {
        show([message('추억을 불러오지 못했어요.')]);
        shuffleBtn.hidden = true;
      });
  }

  // ─── 아카이브 주제 필터 ──────────────────
  function initArchiveFilter() {
    var archive = document.querySelector('.archive');
    if (!archive) return;

    var buttons = archive.querySelectorAll('.tag-tabs [data-tag]');
    var items = archive.querySelectorAll('.archive-item');
    var sections = archive.querySelectorAll('.archive-year');
    var total = archive.querySelector('[data-archive-count]');
    var none = archive.querySelector('.archive__none');

    function apply(tag) {
      var shown = 0;
      items.forEach(function (li) {
        var match = !tag || li.getAttribute('data-tag') === tag;
        li.hidden = !match;
        if (match) shown++;
      });
      sections.forEach(function (sec) {
        var count = sec.querySelectorAll('.archive-item:not([hidden])').length;
        sec.hidden = count === 0;
        sec.querySelector('[data-year-count]').textContent = count;
        var chip = archive.querySelector('[data-year-link="' + sec.id.slice(1) + '"]');
        if (chip) chip.hidden = count === 0;
      });
      buttons.forEach(function (b) {
        var active = b.getAttribute('data-tag') === tag;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (total) total.textContent = shown;
      if (none) none.hidden = shown !== 0;
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var tag = b.getAttribute('data-tag');
        apply(tag);
        var url = new URL(window.location.href);
        if (tag) url.searchParams.set('tag', tag); else url.searchParams.delete('tag');
        url.hash = '';
        history.replaceState(null, '', url);
      });
    });

    var initial = new URLSearchParams(window.location.search).get('tag') || '';
    apply(initial);
  }

  function init() {
    initOnThisDay();
    initArchiveFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
