// Pricing management system for static hosting
(function() {
  'use strict';

  // Default prices (fallback)
  const DEFAULT_PRICES = {
    single1: 800,
    single2: 700,
    double1: 1300,
    double2: 1100,
    triple1: 1800,
    triple2: 1500
  };

  // Get current prices from JSON file or localStorage fallback
  async function getCurrentPrices() {
    try {
      // Zkusíme načíst z JSON souboru
      const response = await fetch('/pricing.json');
      if (response.ok) {
        const data = await response.json();
        // Uložíme do localStorage jako cache
        localStorage.setItem('pricing', JSON.stringify(data));
        return { ...DEFAULT_PRICES, ...data };
      }
    } catch (e) {
      console.warn('JSON soubor nedostupný, používáme localStorage:', e);
    }

    // Fallback na localStorage
    try {
      const stored = localStorage.getItem('pricing');
      if (stored) {
        const prices = JSON.parse(stored);
        return { ...DEFAULT_PRICES, ...prices };
      }
    } catch (e) {
      console.warn('Failed to load pricing from localStorage:', e);
    }
    return DEFAULT_PRICES;
  }

  // Update price elements on the page
  async function updatePriceElements() {
    const prices = await getCurrentPrices();
    console.log('💰 Aktuální ceny:', prices);
    
    // Update price elements by data attributes
    const priceElements = document.querySelectorAll('[data-price]');
    priceElements.forEach(element => {
      const priceKey = element.getAttribute('data-price');
      if (prices[priceKey]) {
        element.textContent = `${prices[priceKey]} Kč/noc`;
      }
    });

    // Update table cells specifically by data-i18n attributes
    const tableCells = document.querySelectorAll('td[data-i18n]');
    tableCells.forEach(cell => {
      const i18nKey = cell.getAttribute('data-i18n');
      if (i18nKey === 'rooms.table.p1a') {
        cell.textContent = `${prices.single1} Kč/noc`;
      } else if (i18nKey === 'rooms.table.p1b') {
        cell.textContent = `${prices.single2} Kč/noc`;
      } else if (i18nKey === 'rooms.table.p2a') {
        cell.textContent = `${prices.double1} Kč/noc`;
      } else if (i18nKey === 'rooms.table.p2b') {
        cell.textContent = `${prices.double2} Kč/noc`;
      } else if (i18nKey === 'rooms.table.p3a') {
        cell.textContent = `${prices.triple1} Kč/noc`;
      } else if (i18nKey === 'rooms.table.p3b') {
        cell.textContent = `${prices.triple2} Kč/noc`;
      }
    });

    // Update all table cells that contain price patterns (for pages without data-i18n)
    const allTableCells = document.querySelectorAll('td');
    allTableCells.forEach(cell => {
      const text = cell.textContent;
      
      // Check if cell contains price pattern like "800 Kč/noc"
      if (text.includes('Kč/noc')) {
        // Find which price this cell should show based on position or content
        const row = cell.closest('tr');
        if (row) {
          const cells = Array.from(row.cells);
          const cellIndex = cells.indexOf(cell);
          const rowText = row.textContent.toLowerCase();
          
          // Determine price type based on row content and cell position
          if (rowText.includes('1 osoba') || rowText.includes('single')) {
            if (cellIndex === 1) { // First price column
              cell.textContent = `${prices.single1} Kč/noc`;
            } else if (cellIndex === 2) { // Second price column
              cell.textContent = `${prices.single2} Kč/noc`;
            }
          } else if (rowText.includes('dvoulůžkový') || rowText.includes('double')) {
            if (cellIndex === 1) {
              cell.textContent = `${prices.double1} Kč/noc`;
            } else if (cellIndex === 2) {
              cell.textContent = `${prices.double2} Kč/noc`;
            }
          } else if (rowText.includes('třílůžkový') || rowText.includes('triple')) {
            if (cellIndex === 1) {
              cell.textContent = `${prices.triple1} Kč/noc`;
            } else if (cellIndex === 2) {
              cell.textContent = `${prices.triple2} Kč/noc`;
            }
          }
        }
      }
    });
  }

  // Initialize pricing system
  function initPricing() {
    console.log('🔄 Inicializuji systém cen...');
    updatePriceElements();
    
    // Listen for storage changes (if admin updates prices in another tab)
    window.addEventListener('storage', function(e) {
      if (e.key === 'pricing') {
        console.log('🔄 Detekována změna cen, aktualizuji...');
        updatePriceElements();
      }
    });
  }

  // Export functions for global use
  window.PricingManager = {
    getCurrentPrices,
    updatePriceElements,
    initPricing
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricing);
  } else {
    initPricing();
  }

})();
