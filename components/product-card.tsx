'use client';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { bnNumber, unitBn } from '@/lib/api';
export default function ProductCard({ product }: { product: Product }) {
 const c = product.change.dir === 'up' ? 'text-[#13884a] bg-[#e6f7eb]' : product.change.dir === 'down' ? 'text-[#d64e4e] bg-[#fff0ed]' : 'text-[#7d887f] bg-[#f0f3f0]';
 return <Link href={`/product/${product.slug}`} className="product-card block"><div className="flex items-start justify-between gap-2"><span className="product-emoji">{product.image}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${c}`}>{product.change.dir==='up'?'▲':product.change.dir==='down'?'▼':'—'} {bnNumber(Math.abs(product.change.pct))}%</span></div><div className="mt-3"><h3 className="font-bold text-[15px] leading-6 truncate">{product.nameBn}</h3><p className="muted text-xs mt-0.5">{unitBn(product.unit)}</p></div><div className="mt-4 border-t border-[#eff3ef] pt-3 flex items-end justify-between gap-2"><div><p className="text-[11px] text-[#8a958d]">আজকের দাম</p><p className="font-bold text-[16px] text-[#1e3526]">{bnNumber(product.today)} <small className="font-medium text-xs">টাকা</small></p></div><span className="text-[#8c998f] text-xs">দেখুন ↗</span></div></Link>;
}
