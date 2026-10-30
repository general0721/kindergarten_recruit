// そらいろ幼稚園 採用サイト 共通スクリプト
(() => {
  const hd = document.querySelector('.hd');
  const onScroll = () => hd && hd.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // メニュー
  document.querySelectorAll('.menu-btn').forEach(b => b.addEventListener('click', () => {
    document.body.classList.toggle('is-menu');
  }));
  document.querySelectorAll('.gnav a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('is-menu');
  }));

  // リンク先未設定は何もしない
  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  // ふわっと表示
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // 下部バナー
  const fb = document.querySelector('.fbanner');
  if (fb) fb.querySelector('.fbanner__close').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation(); fb.classList.add('is-hide');
  });

  // スライダー
  document.querySelectorAll('[data-slider]').forEach(wrap => {
    const track = wrap.querySelector('.slider__track');
    const step = () => track.firstElementChild.getBoundingClientRect().width + 32;
    wrap.querySelector('.slider__prev')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    wrap.querySelector('.slider__next')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });

  // 数字カウントアップ
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min(1, (t - t0) / 1400), v = to * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
})();
