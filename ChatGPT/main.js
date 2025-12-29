// --- Mock database (v1) ---
const database = {
  youtube: ["dQw4w9WgXcQ"],
  tiktok: []
};

// --- Elements ---
const linkInput = document.getElementById("linkInput");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const addSection = document.getElementById("addSection");
const submitBtn = document.getElementById("submitBtn");

// --- Helpers ---
function normalizeLink(url) {
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes("youtube.com")) {
      return { platform: "youtube", id: u.searchParams.get("v") };
    }
    if (u.hostname.includes("youtu.be")) {
      return { platform: "youtube", id: u.pathname.slice(1) };
    }

    // TikTok (basic)
    if (u.hostname.includes("tiktok.com")) {
      const parts = u.pathname.split("/");
      return { platform: "tiktok", id: parts.at(-1) };
    }

    return null;
  } catch {
    return null;
  }
}

// --- Main logic ---
checkBtn.addEventListener("click", () => {
  const link = linkInput.value.trim();
  addSection.classList.add("hidden");

  if (!link) return;

  const data = normalizeLink(link);

  result.className = "";
  result.classList.remove("hidden");

  if (!data || !data.id) {
    result.textContent = "🟨 Unknown link format";
    result.classList.add("unknown");
    showAddOption();
    return;
  }

  const known = database[data.platform]?.includes(data.id);

  if (known) {
    result.textContent = "🟥 Rickroll detected";
    result.classList.add("danger");
  } else {
    result.textContent = "🟩 Safe (probably)";
    result.classList.add("safe");
    showAddOption();
  }
});

function showAddOption() {
  checkBtn.textContent = "Wrong? Add to database";
  checkBtn.onclick = () => {
    addSection.classList.remove("hidden");
    checkBtn.style.display = "none";
  };
}

// --- Submit (placeholder) ---
submitBtn.addEventListener("click", () => {
  alert("Submitted! (backend coming later)");
});
