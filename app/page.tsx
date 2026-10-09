import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import { getProducts, bnNumber } from '@/lib/api';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';
import ProductSkeleton from '@/components/product-skeleton';

export default async function HomePage(){ let products:Product[]=[]; let failed=false; try{products=await getProducts()}catch{failed=true}
 const risers=[...products].filter(p=>p.change.dir==='up').sort((a,b)=>b.change.pct-a.change.pct).slice(0,6);
 const fallers=[...products].filter(p=>p.change.dir==='down').sort((a,b)=>a.change.pct-b.change.pct).slice(0,6);
 return <div className="container-main pb-8">
  <section className="surface mt-6 sm:mt-8 px-6 py-7 sm:px-10 sm:py-9 overflow-hidden"><div className="hero-layout grid grid-cols-[1fr_260px] items-center gap-8"><div><span className="inline-flex rounded-full bg-[#e6f5e9] text-[#147641] px-3 py-1 text-xs font-semibold">বাংলাদেশের বাজারদর, এক জায়গায়</span><h1 className="hero-title mt-4 text-[36px] leading-tight font-bold tracking-tight">আজকের বাজারের দাম <span className="text-[#16834a]">এক নজরে</span></h1><p className="mt-3 max-w-xl leading-7 text-[#718076]">চাল, ডাল, তেল, সবজি থেকে মাছ-মাংস, নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন এবং বাজার বুঝে কেনাকাটার সিদ্ধান্ত নিন।</p><a href="#সব-পণ্য" className="btn-primary mt-5">সব পণ্য দেখুন <ArrowRight size={17}/></a></div><div className="hero-art flex justify-center"><div className="relative grid place-items-center rounded-[32px] bg-[#eff7ee] w-[220px] h-[190px]"><span className="text-[100px] drop-shadow-sm">🧺</span><span className="absolute top-5 right-8 text-4xl">🍅</span><span className="absolute top-10 left-5 text-3xl">🥬</span><span className="absolute bottom-7 right-5 text-3xl">🥕</span></div></div></div></section>
  {failed?<div className="surface mt-6 p-5 text-sm text-[#b64c36]">পণ্যের তথ্য আনা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করে পেজটি রিফ্রেশ করুন।</div>:<>
  <section className="mt-8"><div className="flex items-center justify-between mb-4"><div><h2 className="section-title flex items-center gap-2"><ArrowUpRight className="text-[#169451]"/>আজ দাম বেড়েছে <span className="text-[#169451]">▲</span></h2><p className="text-xs muted mt-1">আজকের হিসাবে সবচেয়ে বেশি দাম বেড়েছে</p></div></div><div className="product-grid">{risers.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  <section className="mt-8"><div className="mb-4"><h2 className="section-title flex items-center gap-2"><ArrowDownRight className="text-[#dc5555]"/>আজ দাম কমেছে <span className="text-[#dc5555]">▼</span></h2><p className="text-xs muted mt-1">যেসব পণ্যের দামে স্বস্তি এসেছে</p></div><div className="product-grid">{fallers.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  <section id="সব-পণ্য" className="mt-10 scroll-mt-5"><div className="mb-4"><h2 className="section-title">সব পণ্য</h2><p className="muted text-sm mt-1">বিভিন্ন পণ্যের বর্তমান দাম এবং দৈনিক পরিবর্তন দেখুন।</p></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div><p className="mt-5 text-center text-xs text-[#89958c]">মোট {bnNumber(products.length)}টি পণ্য</p></section>
  </>}
 </div>;
}
