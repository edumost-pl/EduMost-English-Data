let allWords = [];
let allPhrases = [];
let allGrammar = [];
let allLessons = [];

let allRecords = [];
let currentType = "all";
let currentLevel = "all";
let currentCategory = "all";

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase();

    const filtered = allRecords.filter(item =>

        (item.english || "").toLowerCase().includes(query) ||
        (item.ukrainian || "").toLowerCase().includes(query) ||
        (item.polish || "").toLowerCase().includes(query) ||
        (item.code || "").toLowerCase().includes(query)

    );

    renderTable(filtered);

});

// Функция загрузки слов
async function loadVocabulary() {
  const index = await fetch("./vocabulary/index.json").then((r) => r.json());

  const data = await Promise.all(
    index.map((file) => fetch(`./vocabulary/${file}`).then((r) => r.json())),
  );

  allWords = data.flat();
}
// Фразы
async function loadPhrases() {
  const index = await fetch("./phrases/index.json").then((r) => r.json());

  const data = await Promise.all(
    index.map((file) => fetch(`./phrases/${file}`).then((r) => r.json())),
  );

  allPhrases = data.flat();
}
// Грамматика
async function loadGrammar() {
  const index = await fetch("./grammar/index.json").then((r) => r.json());

  const data = await Promise.all(
    index.map((file) => fetch(`./grammar/${file}`).then((r) => r.json())),
  );

  allGrammar = data.flat();
}
// Уроки
async function loadLessons() {
  const index = await fetch("./lessons/index.json").then((r) => r.json());

  const data = await Promise.all(
    index.map((file) => fetch(`./lessons/${file}`).then((r) => r.json())),
  );

  allLessons = data.flat();
}
// Общая загрузка
async function loadDatabase() {
  await Promise.all([
    loadVocabulary(),
    loadPhrases(),
    loadGrammar(),
    loadLessons(),
  ]);

  console.log("Words:", allWords.length);
  console.log("Phrases:", allPhrases.length);
  console.log("Grammar:", allGrammar.length);
  console.log("Lessons:", allLessons.length);
}
loadDatabase();

// allRecords
function buildRecords() {

allRecords = [];

// WORDS
allWords.forEach((item) => {
    allRecords.push({
        type: "Word",
        code: item.code,
        level: item.level,
        category: item.category,
        english: item.english,
        ukrainian: item.ukrainian,
        polish: item.polish,
    });
});

// PHRASES
allPhrases.forEach((item) => {
    allRecords.push({
        type: "Phrase",
        code: item.code,
        level: item.level,
        category: item.category,
        english: item.english,
        ukrainian: item.ukrainian,
        polish: item.polish,
    });
});

// GRAMMAR
allGrammar.forEach((item) => {
    allRecords.push({
        type: "Grammar",
        code: item.code,
        level: item.level,
        category: item.category,
        english: item.english,
        ukrainian: item.ukrainian,
        polish: item.polish,
    });
});

// LESSONS
allLessons.forEach((item) => {
    allRecords.push({
        type: "Lesson",
        code: item.code,
        level: item.level,
        category: item.category || item.unit || "",
        english: item.title || item.english || "",
        ukrainian: "",
        polish: "",
    });
});

}
// Обновляем loadDatabase()
async function loadDatabase() {
  await Promise.all([
    loadVocabulary(),
    loadPhrases(),
    loadGrammar(),
    loadLessons(),
  ]);

  buildRecords();

  renderTable(allRecords);
}
//
function renderTable(records) {
  const content = document.getElementById("content");

  content.innerHTML = `
    
    <table class="db-table">

        <thead>

            <tr>
                <th>Type</th>
                <th>Code</th>
                <th>Level</th>
                <th>Category</th>
                <th>English</th>
                <th>Ukrainian</th>
                <th>Polish</th>
            </tr>

        </thead>

        <tbody>

            ${records
              .map(
                (item) => `

                <tr>

                    <td>${item.type || ""}</td>

                    <td>${item.code || ""}</td>

                    <td>${item.level || ""}</td>

                    <td>${item.category || item.unit || ""}</td>

                    <td>${item.english || item.title || ""}</td>

                    <td>${item.ukrainian || ""}</td>

                    <td>${item.polish || ""}</td>

                </tr>

            `,
              )
              .join("")}

        </tbody>

    </table>

    `;
}

//
function loadCategory(category) {

if (category === "vocabulary") {
    currentType = "Word";
}
else if (category === "phrases") {
    currentType = "Phrase";
}
else if (category === "grammar") {
    currentType = "Grammar";
}
else if (category === "lessons") {
    currentType = "Lesson";
}
else {
    currentType = "all";
}

applyFilters();

}

//  уровни
function loadLevel(level) {
  currentLevel = level;
  if (level === "all") {
    renderTable(allRecords);
    return;
  }

  const filtered = allRecords.filter((item) => item.level === level);

  renderTable(filtered);
  applyFilters();
}

function setCategory(category) {
  currentCategory = category;

  applyFilters();
}
// категории
function applyFilters() {
  let filtered = [...allRecords];

  // TYPE
  if (currentType !== "all") {
    filtered = filtered.filter((item) => item.type === currentType);
  }

  // LEVEL
  if (currentLevel !== "all") {
    filtered = filtered.filter((item) => item.level === currentLevel);
  }

  // CATEGORY
  if (currentCategory !== "all") {
    filtered = filtered.filter((item) => item.category === currentCategory);
  }

  renderTable(filtered);
}
