document.addEventListener('click', async (event) => {
  const buyNowButton = event.target.closest('[data-card-buy-now]');
  if (!buyNowButton || buyNowButton.getAttribute('aria-busy') === 'true') return;

  event.preventDefault();
  buyNowButton.setAttribute('aria-busy', 'true');

  const root = window.Shopify?.routes?.root || '/';
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  try {
    const clearResponse = await fetch(`${root}cart/clear.js`, { method: 'POST', headers });
    if (!clearResponse.ok) throw new Error('Unable to prepare checkout.');

    const addResponse = await fetch(`${root}cart/add.js`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        items: [
          {
            id: Number(buyNowButton.dataset.variantId),
            quantity: Number(buyNowButton.dataset.quantity || 1),
          },
        ],
      }),
    });
    if (!addResponse.ok) throw new Error('Unable to add product for checkout.');

    window.location.assign(`${root}checkout`);
  } catch (error) {
    console.error(error);
    buyNowButton.removeAttribute('aria-busy');
  }
});
