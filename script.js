const bioList = document.getElementById('bioList');
const searchBar = document.getElementById('searchBar');

async function loadBiographies() {
  try {
    const listResponse = await fetch("index.json"); // same folder as index.html
    if (!listResponse.ok) throw new Error("Cannot load file list");

    const fileList = await listResponse.json();

    if (fileList.length === 0) {
      bioList.innerHTML = "<p>No biographies available yet.</p>";
      return;
    }

    // Create cards for each biography file
    for (const filename of fileList) {
      const response = await fetch(filename);
      if (!response.ok) continue;
      const text = await response.text();

      const card = document.createElement('div');
      card.className = 'bio-card';
      card.innerHTML = `
        <h3>${filename.replace('biography/', '').replace('.txt', '').toUpperCase()}</h3>
        <pre>${text}</pre>
      `;

      // Double-click event to expand and collapse the card
      card.addEventListener('dblclick', () => {
        const isExpanded = card.classList.toggle('expanded');
        document.body.classList.toggle('no-scroll', isExpanded);
      });

      bioList.appendChild(card);
    }

  } catch (err) {
    console.error("Error loading biography list:", err);
  }
}

loadBiographies();

// ===== SEARCH FUNCTIONALITY =====
searchBar.addEventListener("input", function() {
  const query = searchBar.value.toLowerCase();
  const cards = bioList.getElementsByClassName("bio-card");

  for (const card of cards) {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const content = card.querySelector("pre").textContent.toLowerCase();

    // Show card if query matches title OR text content
    if (title.includes(query) || content.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
});
