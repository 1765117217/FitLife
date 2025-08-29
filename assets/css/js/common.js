// common.js

(function () {
  var page = (document.body.getAttribute('data-page') || '').toLowerCase();

  var map = {
    index: 'index（首页）.htm',
    exercises: 'list_image（健身动作页）.htm',
    equipment: 'list_article（健身器械页）.htm',
    features: 'list_article（产品特色页）.htm',
    nutrition: '健身补给页.htm',
    contact: 'contact（联系方式）.htm'
  };

  // 导航高亮
  document.querySelectorAll('nav a.nav-link').forEach(function(a){
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === (map[page] || '').toLowerCase()) {
      a.classList.add('active');
      if (a.parentElement) a.parentElement.classList.add('active');
    }
  });

  // URL 参数解析
  window.getQuery = function (key) {
    var u = new URL(window.location.href);
    return u.searchParams.get(key);
  };
})();

// 简单的关键词 → 页面映射（演示用）
(function () {
  const map = {
    squat: "exercises.html",
    pushup: "exercises.html",
    push: "exercises.html",
    exercise: "exercises.html",
    exercises: "exercises.html",

    treadmill: "equipment.html",
    dumbbell: "equipment.html",
    dumbbells: "equipment.html",
    equipment: "equipment.html",

    heart: "features.html",
    feature: "features.html",
    features: "features.html",

    nutrition: "nutrition.html",
    protein: "nutrition.html",
    carbs: "nutrition.html",
  };

  const $input = document.getElementById("searchInput");
  const $btn = document.getElementById("searchBtn");

  function go() {
    const key = ($input?.value || "").trim().toLowerCase();
    if (!key) return;

    // 找到第一个包含该关键字的映射
    const hit = Object.keys(map).find((k) => key.includes(k));
    if (hit) {
      location.href = map[hit];
    } else {
      alert("No matching page for: " + key);
    }
  }

  $btn && $btn.addEventListener("click", go);
  $input && $input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") go();
  });

  // 可选：导航高亮（依赖 <body data-page="...">）
  try {
    const page = document.body.getAttribute("data-page");
    if (page) {
      document
        .querySelectorAll(".navbar .nav-link")
        .forEach((a) => {
          if (a.getAttribute("href")?.includes(page)) {
            a.classList.add("active");
          }
        });
    }
  } catch {}
})();

(function(){
  const root = document.querySelector('.navbar-elite');
  function onScroll(){ if(root) root.classList.toggle('scrolled', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll);
})();


/* ======================
   Storage Features
   ====================== */

// 1. localStorage：主题切换（暗黑 / 亮色）
(function(){
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;

  const btn = document.querySelector('#themeToggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      // 切换主题并保存到 localStorage
      const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }
})();

// 2. sessionStorage：记录本次会话访问次数
(function(){
  let visits = +(sessionStorage.getItem('visits')||0)+1;
  sessionStorage.setItem('visits', visits);
  console.log("This session visit count:", visits); // 控制台打印访问次数
})();

// 3. Cookies：记录用户是否同意 Cookie 提示
(function(){
  function setCookie(name,val,days){
    const d = new Date();
    d.setDate(d.getDate()+days);
    document.cookie = `${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/`;
  }
  function getCookie(name){
    return document.cookie.split('; ').find(r=>r.startsWith(name+'='))?.split('=')[1];
  }
  if(!getCookie('consent')){
    const banner = document.createElement('div');
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <div class="p-3 bg-dark text-white text-center">
        This site uses cookies to enhance your experience.
        <button class="btn btn-sm btn-outline-light ms-2" id="consentBtn">Accept</button>
      </div>`;
    document.body.appendChild(banner);

    // 点击按钮 -> 写入 Cookie 并关闭提示
    document.querySelector('#consentBtn').onclick = ()=>{
      setCookie('consent','yes',7);
      banner.remove();
    };
  }
})();
