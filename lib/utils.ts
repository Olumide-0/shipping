import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ConvexError } from "convex/values"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convex functions throw ConvexError for conditions a customer should actually
// read ("Out of stock: ..."). Everything else is an internal fault, so it gets
// the generic fallback rather than leaking a stack trace into the UI.
export function errorMessage(err: unknown, fallback: string) {
  if (err instanceof ConvexError) return String(err.data)
  return fallback
}

// Convert integer cents from the DB to a display string, e.g. 49900 -> "$499.00"
export function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
