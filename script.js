/* ============================================================
   FTHS GAME HUB — script.js
   ============================================================
   TO ADD A NEW GAME: just add an object to the GAMES array below.
   Required fields: name, creator, description, link
   ============================================================ */

   const GAMES = [
    {
      name: "Crossy Road",
      creator: "Justin M.",
      description: "Just basically a copy of Crossy Road — dodge traffic and hop your way to a high score.",
      link: "https://jzapdos.github.io/Crossy-Road/"
    },
    {
      name: "Shape Escape",
      creator: "Michael V.",
      description: "Don't hit the ceiling! A twitchy survival game where your geometry skills are tested. Devs got lazy though.",
      link: "https://michael-volpe.github.io/Shape-Escape-V2/"
    },
    {
      name: "Pac Man",
      creator: "Michael U.",
      description: "A faithful remake of the classic — eat pellets and avoid the ghosts!",
      link: "https://mikeyarm.github.io/pacman/"
    },
    {
      name: "Pong",
      creator: "Justin M.",
      description: "Classic two-player Pong. One uses WASD, the other uses arrow keys.",
      link: "https://jzapdos.github.io/pong-game/"
    },
    {
      name: "Mario",
      creator: "Jesus M.",
      description: "A faithful recreation of World 1-1 from the original Super Mario Bros.",
      link: "https://jmartinez2905.github.io/mario/"
    },
    {
      name: "Snake",
      creator: "Justin M.",
      description: "The timeless snake game — eat, grow, and don't bite yourself.",
      link: "https://jzapdos22.github.io/snake-game1/"
    },
    {
      name: "Escape Room",
      creator: "Charlie D.",
      description: "Escape from the room before it's too late! A text-adventure puzzle experience.",
      link: "https://charliedelprete.github.io/Choice-Project/"
    },
    {
      name: "Stick Hero",
      creator: "Justin M.",
      description: "Stretch the stick to bridge the gap — a satisfying and addictive platformer.",
      link: "https://jzapdos.github.io/Stick-Hero/"
    },
    {
      name: "Path Finder",
      creator: "Justin M.",
      description: "Connect the dots to find the path. Satisfying puzzle gameplay.",
      link: "https://jzapdos.github.io/Path-Finder/"
    },
    {
      name: "Space Invaders",
      creator: "Justin M.",
      description: "Blast the alien fleet before they reach the ground. A classic reimagined.",
      link: "https://jzapdos.github.io/ai/"
    },
    {
      name: "Tetris",
      creator: "Justin M.",
      description: "The classic game of Tetris, but made by a student.",
      link: "https://jzapdos.github.io/tetris/"
    }
  ];
  
  /* ============================================================
     Below this line you don't need to edit anything.
     ============================================================ */
  
  function getUniqueDevCount(games) {
    return new Set(games.map(g => g.creator)).size;
  }
  
  function buildCard(game, index) {
    const card = document.createElement("div");
    card.className = "gameCard";
    card.style.animationDelay = `${index * 0.05}s`;
    card.dataset.name = game.name.toLowerCase();
    card.dataset.creator = game.creator.toLowerCase();
  
    card.innerHTML = `
      <div class="card-badge">Student Project</div>
      <h3>${game.name}</h3>
      <p>${game.description}<br><strong style="color:#94a3b8;font-size:12px">By ${game.creator}</strong></p>
      <a class="playBtn" href="${game.link}" target="_blank" rel="noopener">Play</a>
    `;
    return card;
  }
  
  function buildSidebar(games) {
    const nav = document.getElementById("sidebarLinks");
    if (!nav) return;
  
    // Home link first
    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.textContent = "🏠 Home";
    homeLink.className = "home-link";
    nav.appendChild(homeLink);
  
    // One link per game
    games.forEach(game => {
      const a = document.createElement("a");
      a.href = game.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = game.name;
      nav.appendChild(a);
    });
  }
  
  function renderGames(games) {
    const container = document.getElementById("games");
    const empty = document.getElementById("emptyState");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (games.length === 0) {
      empty && (empty.hidden = false);
      return;
    }
    empty && (empty.hidden = true);
  
    games.forEach((game, i) => {
      container.appendChild(buildCard(game, i));
    });
  }
  
  function animateCount(el, target, duration = 800) {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  
  function initSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;
  
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase().trim();
      if (!q) { renderGames(GAMES); return; }
      const filtered = GAMES.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.creator.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
      );
      renderGames(filtered);
    });
  }
  
  function initHamburger() {
    const btn = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    if (!btn || !sidebar) return;
  
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", e => {
      if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    buildSidebar(GAMES);
    renderGames(GAMES);
    initSearch();
    initHamburger();
  
    // Animate stats
    const countEl = document.getElementById("statCount");
    const devEl   = document.getElementById("statDevs");
    if (countEl) animateCount(countEl, GAMES.length);
    if (devEl)   animateCount(devEl, getUniqueDevCount(GAMES));
  });
