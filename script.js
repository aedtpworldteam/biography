const bioList = document.getElementById('bioList');

async function loadBiographies() {
  try {
    const listResponse = await fetch("index.json");  // main folder
    if (!listResponse.ok) throw new Error("Cannot load file list");

    const fileList = await listResponse.json(); // ["biography/buddydml]()
