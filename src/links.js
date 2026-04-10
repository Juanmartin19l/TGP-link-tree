// src/links.js

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export async function loadLinksFromNocoDB() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/links`);
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    const links = await response.json();
    const linksData = links.map((item) => {
      let cleanDescription = item.description;
      if (typeof cleanDescription === 'string') {
        if (/[A-Za-z0-9\-_]{32,}/.test(cleanDescription)) {
          cleanDescription = '';
        }
      }
      return {
        title: item.title,
        url: item.url,
        description: cleanDescription,
      };
    });
    window.linksData = linksData;
    document.dispatchEvent(new CustomEvent('linksDataLoaded'));
  } catch (err) {
    console.error('Error al cargar links:', err);
    window.linksData = [];
    document.dispatchEvent(new CustomEvent('linksDataLoaded'));
  }
}

// Assets locales
window.assets = [
  { name: 'CLAVES dic2025.xlsx', file: 'assets/CLAVES dic2025.xlsx' },
  { name: 'Cuenta de Gmail.txt', file: 'assets/gmail.txt' },
];

// Cargar links automáticamente al iniciar
loadLinksFromNocoDB();
