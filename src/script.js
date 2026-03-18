// src/script.js
function renderLinks() {
  const container = document.getElementById('links-container');
  container.innerHTML = '';
  const linksData = window.linksData || [];
  linksData.forEach((link) => {
    const card = document.createElement('a');
    card.href = link.url;
    card.target = '_blank';
    card.className = 'link-item';
    let iconHtml =
      '<span class="link-icon"><i class="fa-solid fa-link"></i></span>';
    card.innerHTML = `
      ${iconHtml}
      <div>
        <div class="link-title">${link.title || link.name || 'Sin nombre'}</div>
        ${link.description ? `<div class=\"link-desc\">${link.description}</div>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAssets() {
  const assetsContainer = document.getElementById('assets-container');
  if (!assetsContainer) return;
  assetsContainer.innerHTML = '';
  (window.assets || []).forEach((asset) => {
    const assetLink = document.createElement('a');
    assetLink.href = asset.file;
    assetLink.download = asset.name;
    assetLink.className = 'asset-item';
    assetLink.innerHTML = `
      <span class="asset-icon"><i class="fa-solid fa-file-arrow-down"></i></span>
      <span class="text-base font-medium">${asset.name}</span>
    `;
    assetsContainer.appendChild(assetLink);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAssets();
  document.addEventListener('linksDataLoaded', renderLinks);
  if (window.linksData) renderLinks();
});
