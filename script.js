const bioList = document.getElementById('bioList');

async function loadBiographies() {
  try {
    const listResponse = await fetch("index.json"); // same folder as index.html
    if (!listResponse.ok) throw new Error("Cannot load file list");

    const fileList = await listResponse.json();

    if (fileList.length === 0) {
      bioList.innerHTML = "<p>No biographies available yet.</p>";
      return;
    }

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
      bioList.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading biography list:", err);
  }
}

loadBiographies();
