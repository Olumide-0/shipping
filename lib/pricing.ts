// Single source of truth for money maths, shared by the cart UI and the Convex
// Stripe action so the two can never disagree on what a total should be.
// Everything here is integer CENTS in, integer CENTS out.
//
// Imported by convex/stripe.ts, so keep this file dependency-free — anything
// added here ends up in the Convex function bundle.

// Flat estimate shown pre-checkout. A real deployment should replace this with
// Stripe Tax (`automatic_tax: { enabled: true }`) so the rate follows the
// customer's shipping address instead of assuming one jurisdiction.
export const TAX_RATE = 0.0825;

export const TAX_LABEL = "Estimated Sales Tax (8.25%)";

export function calculateTax(subtotal: number) {
  return Math.round(subtotal * TAX_RATE);
}

// The totals a cart is worth. `subtotal` is the sum of line prices × quantity.
export function calculateTotals(subtotal: number) {
  const tax = calculateTax(subtotal);
  return { subtotal, tax, total: subtotal + tax };
}
