
import type { Category, Product } from './types';

export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api.api-store.workers.dev/api/bazardor'
).replace(/\/$/, '');

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  return readJson<Product[]>(`${API_BASE}/products`);
}

export async function getProduct(
  slugOrId: string
): Promise<Product | null> {
  const all = await getProducts();

  return (
    all.find(
      (p) => p.slug === slugOrId || String(p.id) === slugOrId
    ) ?? null
  );
}

export async function getCategories(): Promise<Category[]> {
  return readJson<Category[]>(`${API_BASE}/categories`);
}

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const categories = await getCategories();

  return categories.find((c) => c.slug === slug) ?? null;
}

export const unitBn = (unit: Product['unit']) =>
  ({
    kg: 'প্রতি কেজি',
    litre: 'প্রতি লিটার',
    dozen: 'প্রতি ডজন',
    piece: 'প্রতি পিস',
  })[unit];

export const bnNumber = (value: number) =>
  new Intl.NumberFormat('bn-BD', {
    maximumFractionDigits: 1,
  }).format(value);