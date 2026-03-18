// src/links.js
import { nocodbFetch } from './api.js';

const NOCODB_SOURCE_ID = import.meta.env.VITE_NOCODB_SOURCE_ID;
const NOCODB_BASE_ID = import.meta.env.VITE_NOCODB_BASE_ID;
const NOCODB_TABLE_ID = import.meta.env.VITE_NOCODB_TABLE_ID;

// Endpoint para obtener los links desde NocoDB usando los IDs
const ENDPOINT = `/api/v1/db/data/${NOCODB_SOURCE_ID}/${NOCODB_BASE_ID}/${NOCODB_TABLE_ID}`;

// Carga los links desde la API de NocoDB y los expone en window.linksData
export async function loadLinksFromNocoDB() {
  try {
    const response = await nocodbFetch(ENDPOINT);
    // NocoDB devuelve los registros en response.list
    const linksData = response.list.map((item) => {
      let cleanDescription = item.description;
      if (typeof cleanDescription === 'string') {
        // Si contiene un token (32+ caracteres alfanuméricos), no mostrar descripción
        if (/[A-Za-z0-9\-_]{32,}/.test(cleanDescription)) {
          cleanDescription = '';
        }
      }
      return {
        title: item.name,
        url: item.url,
        description: cleanDescription,
      };
    });
    window.linksData = linksData;
    document.dispatchEvent(new CustomEvent('linksDataLoaded'));
  } catch (err) {
    console.error('Error al cargar links desde NocoDB:', err);
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
