// === Theme Switching ===
const lightMode = document.getElementById('lightMode');
const darkMode = document.getElementById('darkMode');

lightMode.addEventListener('click', () => {
  document.body.style.backgroundColor = "#f8f8f8";
  document.body.style.color = "rgb(50,50,50)";
});
darkMode.addEventListener('click', () => {
  document.body.style.backgroundColor = "rgb(15,37,57)";
  document.body.style.color = "rgb(231,230,230)";
});

// === Biography Files Setup ===
// Add all biography text filenames here
const biographyFiles = [
  "biography/biography.txt",
  "biography/biography1.txt",
  "biography/biography2.txt",
  "biography/biography3.txt",
  "biography/biography4.txt"
];

const bioList = document.getElementById('bioList');

// Function to load and display all .txt files
async function loadBiographies() {
  for (const file of biographyFiles) {
    try {
      const response = await fetch(file);
      if (!response.ok) continue;
      const text = await response.text();

      // Create a styled card for each biography
      const card = document.createElement('div');
      card.className = 'bio-card';
      card.innerHTML = `
        <h3>${file.split('/').pop().replace('.txt', '').toUpperCase()}</h3>
        <pre>${text}</pre>
      `;
      bioList.appendChild(card);
    } catch (err) {
      console.error('Error loading:', file, err);
    }
  }
}
loadBiographies();

// === Search Functionality ===
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.bio-card');
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(val) ? 'block' : 'none';
  });
});
