// Mirrors backend/src/config/shipping.ts TAX_RATE and the "standard"
// shipping method price, used only for the cart page's estimate before
// checkout collects a real address and shipping method selection. The
// backend always recomputes the authoritative total server-side.
export const TAX_RATE = 0.18;
export const DEFAULT_SHIPPING_ESTIMATE = 50;
