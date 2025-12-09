// ---------------------------------------------------------
// YEAR IN FOOTER
// ---------------------------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// =========================================================
// YOUTUBE BACKGROUND VIDEO
// =========================================================
const VIDEO_ID = "XX2gZTGwZWc";
const YT_START = 12;
const YT_END = 19;
let player;
let loopTick = null;

function onYouTubeIframeAPIReady() {
  const holder = document.getElementById("yt-bg");
  if (!holder) return;

  const iframeWrapper = document.createElement("div");
  iframeWrapper.className = "yt-wrapper";
  holder.appendChild(iframeWrapper);

  player = new YT.Player(iframeWrapper, {
    width: "1920",
    height: "1080",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 0,
      mute: 1,
      start: YT_START,
      end: YT_END,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: (e) => {
        e.target.mute();
        e.target.seekTo(YT_START);
        e.target.playVideo();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          document.body.classList.add("loaded");
        }

        if (e.data === YT.PlayerState.PLAYING && !loopTick) {
          loopTick = setInterval(() => {
            if (player.getCurrentTime() >= YT_END - 0.08) {
              player.seekTo(YT_START, true);
            }
          }, 100);
        }
      }
    }
  });
}


// =========================================================
// CONTACT EMAIL + PHONE
// =========================================================
const EMAIL = "marie.surovcakova@domena.cz";
const TEL = "+420123456789";

const footerEmail = document.getElementById("footer-email");
const footerTel = document.getElementById("footer-tel");

if (footerEmail) {
  footerEmail.href = `mailto:${EMAIL}`;
  footerEmail.textContent = EMAIL;
}

if (footerTel) {
  footerTel.href = `tel:${TEL}`;
  footerTel.textContent = "+420 123 456 789";
}


// =========================================================
// SMOOTH SCROLL
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// =========================================================
// HERO SCROLL BUTTON
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll");
  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#intro").scrollIntoView({ behavior: "smooth" });
    });
  }
});

// =========================================================
// HEADER HIDE/SHOW (2s delay, but NOT before half of hero)
// =========================================================
const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");

let lastScrollY = window.scrollY;
let hideTimeout = null;
let currentDirection = null;
let headerHidden = false;

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  const heroHalf = hero ? hero.offsetHeight / 2 : 0;

  if (current === 0) {
    header.classList.add("show");
    header.classList.remove("hidden");
    headerHidden = false;
    clearTimeout(hideTimeout);
    return;
  }

  if (current < heroHalf) {
    header.classList.add("show");
    header.classList.remove("hidden");
    headerHidden = false;
    clearTimeout(hideTimeout);
    return;
  }

  const newDirection =
    current > lastScrollY ? "down" :
    current < lastScrollY ? "up" :
    currentDirection;

  if (newDirection !== currentDirection) {
    currentDirection = newDirection;

    header.classList.add("show");
    header.classList.remove("hidden");
    headerHidden = false;

    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
      header.classList.add("hidden");
      header.classList.remove("show");
      headerHidden = true;
    }, 2000);
  }

  lastScrollY = current;
});

header.addEventListener("mouseenter", () => {
  header.classList.add("show");
  header.classList.remove("hidden");
  headerHidden = false;
  clearTimeout(hideTimeout);
});

// =========================================================
// HIDE HEADER ON HEADER LINK CLICK
// =========================================================
const headerLinks = document.querySelectorAll('.site-header a[href^="#"]');

headerLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.add("hidden");
    header.classList.remove("show");
  });
});


// =========================================================
// LOGO SCROLL TO TOP
// =========================================================
const topBtn = document.getElementById("top");
if (topBtn) {
  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// =========================================================
// TIMELINE LINE ANIMATION
// =========================================================
function animateTimelineLine() {
  const svg = document.querySelector(".timeline-line-svg");
  const line = document.querySelector(".timeline-line");
  const firstItem = document.querySelector(".tl-item");

  if (!svg || !line || !firstItem) return;

  const svgRect = svg.getBoundingClientRect();
  const itemRect = firstItem.getBoundingClientRect();

  const startY = itemRect.top - svgRect.top + itemRect.height * 0.2;

  line.setAttribute("y1", startY);
  line.setAttribute("y2", svgRect.height);

  const length = line.getTotalLength();
  line.style.strokeDasharray = length;

  const windowH = window.innerHeight;
  const visible = Math.min(
    1,
    Math.max(0, (windowH - svgRect.top) / (windowH + svgRect.height))
  );

  line.style.strokeDashoffset = length * (1 - visible);
}

document.addEventListener("DOMContentLoaded", animateTimelineLine);
window.addEventListener("scroll", animateTimelineLine);
window.addEventListener("resize", animateTimelineLine);

// =========================================================
// UNIVERSAL REVEAL – stejné chování jako timeline (po částech)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

  // Vše, co má fade-in / slide reveal
  const revealItems = document.querySelectorAll(
    ".reveal-section, .reveal-center, .tl-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {

          // Přidáme "visible" až když element opravdu vstoupí do view
          entry.target.classList.add("visible");

          // přestat pozorovat – animace se nespouští znovu
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10%"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
});



// =========================================================
// HAMBURGER MENU (pouze do 400px
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__list a");

  if (hamburger && navList) {

    hamburger.addEventListener("click", () => {
      navList.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("open");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav__list");

  let isOpen = false;

  hamburger.addEventListener("click", () => {
    if (!isOpen) {
      navList.classList.remove("closing");
      navList.classList.add("open");
      isOpen = true;
    } else {
      navList.classList.remove("open");
      navList.classList.add("closing");
      isOpen = false;
    }
  });
});
