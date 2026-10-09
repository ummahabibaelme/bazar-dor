'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronDown, Home } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/api';
import type { Category, Product } from '@/lib/types';
import ProductCard from '@/components/product-card';
import ProductSkeleton from '@/components/product-skeleton';
export default function CategoryPage(){const params=useParams<{slug:string}>();const slug=params.slug;const [products,setProducts]=useState<Product[]>([]);const [category,setCategory]=useState<Category|null>(null);const [loading,setLoading]=useState(true);const [sort,setSort]=useState('default');const [error,setError]=useState(false);
 useEffect(()=>{let live=true;Promise.all([getProducts(),getCategories()]).then(([ps,cs])=>{if(!live)return;setProducts(ps.filter(p=>p.category===slug));setCategory(cs.find(c=>c.slug===slug)||null)}).catch(()=>setError(true)).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[slug]);
 const sorted=useMemo(()=>{const list=[...products];if(sort==='asc')list.sort((a,b)=>a.today-b.today);if(sort==='desc')list.sort((a,b)=>b.today-a.today);return list},[products,sort]);
 if(!loading&&(!category||products.length===0))return <div className="container-main py-20 text-center"><div className="surface mx-auto max-w-lg p-10"><div className="text-5xl">🔎</div><h1 className="text-2xl font-bold mt-4">ক্যাটাগরি পাওয়া যায়নি</h1><p className="muted mt-2">এই নামে কোনো ক্যাটাগরি বা পণ্য নেই।</p><Link href="/" className="btn-primary mt-5"> <Home size={16}/> হোম পেজে ফিরে যান</Link></div></div>;
 return <div className="container-main py-8 min-h-[55vh]"><div className="flex flex-wrap justify-between items-end gap-4 mb-6"><div><p className="text-xs text-[#829087] mb-2">হোম / ক্যাটাগরি</p><h1 className="text-3xl font-bold">{category?.icon||'🛍️'} {category?.nameBn||'পণ্য'}</h1><p className="muted text-sm mt-2">এই ক্যাটাগরির পণ্যের আজকের দাম</p></div><label className="relative flex items-center gap-2 text-sm"><span className="muted">সাজান:</span><select value={sort} onChange={e=>setSort(e.target.value)} className="appearance-none rounded-lg border border-[#dce6dc] bg-white py-2 pl-3 pr-9 outline-none focus:border-[#16834a]"><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3"/></label></div>{error?<div className="surface p-8 text-center">পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।</div>:loading?<ProductSkeleton count={6}/>:<><div className="product-grid">{sorted.map(p=><ProductCard key={p.id} product={p}/>)}</div><p className="text-xs muted mt-5">মোট {sorted.length}টি পণ্য</p></>}</div>
}
