// src/api.js
// Módulo para interactuar con la API de NocoDB

const NOCODB_TOKEN = import.meta.env.VITE_NOCODB_TOKEN;
const NOCODB_BASE_URL = import.meta.env.VITE_NOCODB_BASE_URL;

/**
 * Realiza una petición a la API de NocoDB
 * @param {string} endpoint - Endpoint relativo de la API
 * @param {object} options - Opciones fetch adicionales
 * @returns {Promise<any>} - Respuesta de la API
 */
export async function nocodbFetch(endpoint, options = {}) {
  const url = `${NOCODB_BASE_URL}${endpoint}`;
  const headers = {
    accept: 'application/json',
    'xc-token': NOCODB_TOKEN,
    ...options.headers,
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }
  return response.json();
}
