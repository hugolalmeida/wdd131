const breathingTechniques = [
  {
    name: "Box Breathing",
    goal: "stress",
    tags: ["stress", "focus", "anxiety", "calm"],
    duration: "3-5 minutes",
    benefit: "A steady four-count pattern that helps bring attention back to the present.",
    steps: ["Inhale for 4", "Hold for 4", "Exhale for 4", "Hold for 4"],
    bestFor: "Before a stressful moment or when you need a quick reset."
  },
  {
    name: "4-6 Breathing",
    goal: "sleep",
    tags: ["sleep", "rest", "anxiety", "wind down"],
    duration: "4-8 minutes",
    benefit: "A longer exhale helps reduce tension and settle your body before rest.",
    steps: ["Inhale for 4", "Exhale for 6"],
    bestFor: "At night or whenever your thoughts feel busy and overstimulated."
  },
  {
    name: "Resonant Breathing",
    goal: "focus",
    tags: ["focus", "calm", "energy", "balance"],
    duration: "5 minutes",
    benefit: "Even pacing can help you feel centered and physically steady.",
    steps: ["Inhale for 5", "Exhale for 5"],
    bestFor: "During study sessions, work blocks, or transitions between tasks."
  },
  {
    name: "Nadi Shodhana",
    goal: "energy",
    tags: ["energy", "focus", "clarity", "reset"],
    duration: "2-4 minutes",
    benefit: "Alternating nostril breathing can help clear mental fog and restore balance.",
    steps: ["Close one nostril", "Inhale gently", "Switch sides and exhale"],
    bestFor: "When you feel scattered, tired, or mentally overloaded."
  }
];

function findTechnique(goal) {
  const normalizedGoal = goal.toLowerCase();
  const match = breathingTechniques.find((technique) =>
    technique.tags.some((tag) => tag === normalizedGoal)
  );

  return match ?? breathingTechniques[0];
}

function renderTechniqueList() {
  const list = document.getElementById("technique-list");

  if (!list) {
    return;
  }

  list.innerHTML = breathingTechniques
    .map(
      (technique) => `
        <article class="technique-card">
          <header>
            <h3>${technique.name}</h3>
            <span class="technique-badge">${technique.duration}</span>
          </header>
          <p>${technique.benefit}</p>
          <ul>
            ${technique.steps.map((step) => `<li>${step}</li>`).join("")}
          </ul>
          <p><strong>Best for:</strong> ${technique.bestFor}</p>
        </article>
      `
    )
    .join("");
}

function renderMatchOutput(goal, outputElement) {
  const technique = findTechnique(goal);

  outputElement.innerHTML = `
    <h3>${technique.name}</h3>
    <p>${technique.benefit}</p>
    <p><strong>Try this pattern:</strong> ${technique.steps.join(" · ")}</p>
    <p><strong>Best for:</strong> ${technique.bestFor}</p>
  `;
}

function saveSession(event) {
  event.preventDefault();

  const form = document.getElementById("practice-form");
  const formData = new FormData(form);
  const selectedTechnique = formData.get("technique");
  const session = {
    goal: formData.get("goal"),
    technique: selectedTechnique,
    duration: Number(formData.get("minutes")),
    sessionName: formData.get("sessionName"),
    notes: formData.get("notes") ?? "",
    savedAt: new Date().toLocaleString()
  };

  localStorage.setItem("breatheWellSession", JSON.stringify(session));

  const summary = document.getElementById("session-summary");
  const techniqueDetails = findTechnique(session.goal);

  let reminder = "Breathe slowly and let your shoulders soften.";

  if (session.goal === "sleep") {
    reminder = "Keep the pace relaxed and let the exhale feel longer than the inhale.";
  } else if (session.goal === "focus") {
    reminder = "Keep the jaw soft and let your eyes rest on one point as you breathe.";
  } else if (session.goal === "energy") {
    reminder = "Keep the breath steady and use it as a mental reset before the next task.";
  }

  if (session.duration >= 8) {
    reminder = "Take this session slowly and pause if your breath feels rushed.";
  }

  summary.innerHTML = `
    <h3>${session.sessionName}</h3>
    <p><strong>Goal:</strong> ${session.goal}</p>
    <p><strong>Technique:</strong> ${session.technique}</p>
    <p><strong>Length:</strong> ${session.duration} minutes</p>
    <p><strong>Suggested pattern:</strong> ${techniqueDetails.steps.join(" · ")}</p>
    <p><strong>Reminder:</strong> ${reminder}</p>
    <p><strong>Notes:</strong> ${session.notes || "No extra note added."}</p>
    <p><small>Saved on ${session.savedAt}</small></p>
  `;
}

function loadSavedSession() {
  const summary = document.getElementById("session-summary");

  if (!summary) {
    return;
  }

  const savedSession = localStorage.getItem("breatheWellSession");

  if (!savedSession) {
    summary.innerHTML = "<p>No saved session yet. Choose your focus and save a breathing plan.</p>";
    return;
  }

  const session = JSON.parse(savedSession);
  const techniqueDetails = findTechnique(session.goal);

  summary.innerHTML = `
    <h3>${session.sessionName}</h3>
    <p><strong>Goal:</strong> ${session.goal}</p>
    <p><strong>Technique:</strong> ${session.technique}</p>
    <p><strong>Length:</strong> ${session.duration} minutes</p>
    <p><strong>Suggested pattern:</strong> ${techniqueDetails.steps.join(" · ")}</p>
    <p><strong>Last saved:</strong> ${session.savedAt}</p>
  `;
}

function initializeSite() {
  const page = document.body.dataset.page;

  if (page === "techniques") {
    renderTechniqueList();

    const matchButton = document.getElementById("technique-button");
    const goalSelect = document.getElementById("technique-goal");
    const output = document.getElementById("technique-output");

    if (matchButton && goalSelect && output) {
      matchButton.addEventListener("click", () => renderMatchOutput(goalSelect.value, output));
      renderMatchOutput(goalSelect.value, output);
    }
  }

  if (page === "home") {
    const matchButton = document.getElementById("match-button");
    const goalSelect = document.getElementById("need-select");
    const output = document.getElementById("match-output");

    if (matchButton && goalSelect && output) {
      matchButton.addEventListener("click", () => renderMatchOutput(goalSelect.value, output));
      renderMatchOutput(goalSelect.value, output);
    }
  }

  if (page === "practice") {
    const form = document.getElementById("practice-form");

    if (form) {
      form.addEventListener("submit", saveSession);
    }

    loadSavedSession();
  }

  const footerYear = document.getElementById("year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", initializeSite);
