// Bilingual hover — loaded via layout/theme.liquid with defer
// Handles: (1) homepage story_teaser  (2) brand-story hero  (3) chapter cards

(function () {

  // Lock an element's height to the taller of two content strings
  function lockHeight(el, content1, content2) {
    el.innerHTML = content1;
    var h1 = el.offsetHeight;
    el.innerHTML = content2;
    var h2 = el.offsetHeight;
    if (h1 > 0 || h2 > 0) {
      el.style.minHeight = Math.max(h1, h2) + 'px';
    }
  }

  // ── 1. Homepage story teaser ────────────────────────────────────────────────
  var storySection = document.querySelector('[id*="__story_teaser"]');
  if (storySection) {
    var stHeading = storySection.querySelector('.image-with-text__heading');
    var stText    = storySection.querySelector('.image-with-text__text');
    if (stHeading && stText) {
      var stJpHead = stHeading.innerHTML; // already Japanese in DOM
      var stJpText = stText.innerHTML;
      var stEnHead = 'MY STORY';
      var stEnText = '<p>We started Our Stupidity because we were tired of fitting in. Every piece is born from a place of rebellion — inspired by the characters and stories that move us.</p><p>No trends. No compromise. Just pure, raw expression.</p><p>This is for the misfits. For the dreamers. For those who refuse to follow the same path.</p>';

      lockHeight(stHeading, stJpHead, stEnHead);
      lockHeight(stText, stJpText, stEnText);

      // Restore to Japanese after measurement
      stHeading.innerHTML = stJpHead;
      stText.innerHTML    = stJpText;

      storySection.addEventListener('mouseenter', function () {
        stHeading.innerHTML = stEnHead;
        stText.innerHTML    = stEnText;
      });
      storySection.addEventListener('mouseleave', function () {
        stHeading.innerHTML = stJpHead;
        stText.innerHTML    = stJpText;
      });
    }
  }

  // ── 2. Brand-story page hero ────────────────────────────────────────────────
  var heroSection = document.querySelector('[id*="__hero"]');
  if (heroSection) {
    var hHeading = heroSection.querySelector('.image-with-text__heading');
    var hText    = heroSection.querySelector('.image-with-text__text');
    if (hHeading && hText) {
      var hEnHead = hHeading.innerHTML; // English in DOM from template
      var hEnText = hText.innerHTML;
      var hJpHead = '普通に疲れた。だから始めた。';
      var hJpText = '<p>弱点にブランド名をつけるのは愚かだと言われた。それがまさに核心だ。</p><p>アワー・スチューピディティは、現実よりも架空の世界に自分を見出す者たちのために存在する。イタチの犠牲に心を動かされ、五条悟が一人で立つ理由を理解する者のために。</p><p>私たちは商品を売らない。アイデンティティを創る。すべてのドロップにキャラクターとストーリーが宿る。世界が承認する前に、信じるものを身に纏え。</p>';

      lockHeight(hHeading, hEnHead, hJpHead);
      lockHeight(hText, hEnText, hJpText);

      // Default: show Japanese
      hHeading.innerHTML = hJpHead;
      hText.innerHTML    = hJpText;

      heroSection.addEventListener('mouseenter', function () {
        hHeading.innerHTML = hEnHead;
        hText.innerHTML    = hEnText;
      });
      heroSection.addEventListener('mouseleave', function () {
        hHeading.innerHTML = hJpHead;
        hText.innerHTML    = hJpText;
      });
    }
  }

  // ── 3. Bilingual chapter cards (brand-story page) ──────────────────────────
  var cards = document.querySelectorAll('.bilingual-card');
  cards.forEach(function (card) {
    var jaEls = Array.prototype.slice.call(card.querySelectorAll('.lang-ja'));
    var enEls = Array.prototype.slice.call(card.querySelectorAll('.lang-en'));
    jaEls.forEach(function (el) { el.style.display = 'block'; });
    enEls.forEach(function (el) { el.style.display = 'none';  });
    card.addEventListener('mouseenter', function () {
      jaEls.forEach(function (el) { el.style.display = 'none';  });
      enEls.forEach(function (el) { el.style.display = 'block'; });
    });
    card.addEventListener('mouseleave', function () {
      enEls.forEach(function (el) { el.style.display = 'none';  });
      jaEls.forEach(function (el) { el.style.display = 'block'; });
    });
  });

})();
