const bioList = document.getElementById('bioList');

async function loadBiographies() {
  try {
    const listResponse = await fetch("biography/index.json");
    if (!listResponse.ok) throw new Error("Cannot load file list");

    const fileList = await listResponse.json();

    for (const filename of fileList) {
      const filePath = `biography/${filename}`;
      const response = await fetch(filePath);
      if (!response.ok) continue;
      const text = await response.text();

      const card = document.createElement('div');
      card.className = 'bio-card';
      card.innerHTML = `
        <h3>${filename.replace('.txt', '').toUpperCase()}</h3>
        <pre>${text}</pre>
      `;
      bioList.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading biography list:", err);
  }
}
loadBiographies();
