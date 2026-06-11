// Prevent browser from fighting Lenis on reload mid-page
history.scrollRestoration = 'manual';

// ── Smooth scroll (Lenis) ────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
});

// Drive ScrollTrigger from Lenis instead of native scroll
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Register plugin ──────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── Custom cursor ────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

const interactiveSelector = 'a, button, .partner-item, .tribute-item, .speaker-item, .cta-btn, .dot';
document.querySelectorAll(interactiveSelector).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

// ── Parallax background images (GPU-batched via GSAP) ────────────────────────
gsap.utils.toArray('.bg-img').forEach(bg => {
  const section = bg.closest('section');
  gsap.fromTo(bg,
    { y: '-6%' },
    {
      y: '6%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});

// ── Reveal on scroll (ScrollTrigger replaces IntersectionObserver) ────────────
gsap.utils.toArray('.reveal').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => el.classList.add('visible'),
    once: true,
  });
});

// ── Dot navigation ───────────────────────────────────────────────────────────
const sectionIds = ['que-es','comunicado','destacados','cali','porque','cta'];
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    lenis.scrollTo('#' + dot.dataset.target, { duration: 1.4 });
  });
});

sectionIds.forEach((id, idx) => {
  const el = document.getElementById(id);
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 55%',
    end: 'bottom 45%',
    onEnter:      () => dots.forEach((d, i) => d.classList.toggle('active', i === idx)),
    onEnterBack:  () => dots.forEach((d, i) => d.classList.toggle('active', i === idx)),
  });
});

// ── Ticket Widget ────────────────────────────────────────────────────────────
(function () {
  const widget = document.getElementById('twWidget');
  const tab    = document.getElementById('twTab');
  const panel  = document.getElementById('twPanel');
  const closeBtn = document.getElementById('twClose');
  if (!widget) return;

  function openWidget() {
    widget.classList.add('tw-open');
    tab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
  }
  function closeWidget() {
    widget.classList.remove('tw-open');
    tab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  tab.addEventListener('click', () =>
    widget.classList.contains('tw-open') ? closeWidget() : openWidget()
  );
  closeBtn.addEventListener('click', e => { e.stopPropagation(); closeWidget(); });
  document.addEventListener('click', e => {
    if (widget.classList.contains('tw-open') && !widget.contains(e.target)) closeWidget();
  });
})();
