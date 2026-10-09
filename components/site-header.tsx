'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getProducts, bnNumber } from '@/lib/api';
import type { Category, Product } from '@/lib/types';
import toast from 'react-hot-toast';

export default function SiteHeader({ categories }: { categories: Category[] }) {
  const path = usePathname(); const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { getProducts().then(setProducts).catch(() => {}); }, []);
  const logout = async () => { await authClient.signOut(); toast.success('আপনি সাইন আউট করেছেন'); router.push('/'); router.refresh(); };
  const date = new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  return <header className="bg-white border-b border-[#e7eee7]">
    <div className="container-main flex items-center justify-between py-3 gap-3">
      <Link href="/" className="flex items-center gap-2 min-w-0"><span className="grid place-items-center rounded-xl bg-[#e4f4e8] w-11 h-11 text-2xl">🛒</span><span><strong className="block text-[21px] leading-6 text-[#176b3b]">বাজার দর</strong><small className="text-[11px] text-[#829087]">{date}</small></span></Link>
      <div className="top-auth flex items-center gap-2">{isPending ? <span className="skeleton w-20 h-8"/> : session?.user ? <><Link className="btn-outline" href="/profile">{session.user.name || 'আমার প্রোফাইল'}</Link><button className="btn-primary" onClick={logout}>সাইন আউট</button></> : <><Link className="btn-outline" href="/signin">সাইন ইন</Link><Link className="btn-primary" href="/signup">সাইন আপ</Link></>}</div>
    </div>
    <nav className="container-main nav-categories flex items-center justify-center gap-2 pb-3"> <Link className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${path === '/' ? 'bg-[#e5f4e9] text-[#147641] font-bold' : 'text-[#59675e] hover:bg-[#f3f7f3]'}`} href="/">⌂ হোম</Link>{categories.map(c => <Link key={c.slug} href={`/category/${c.slug}`} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${path === `/category/${c.slug}` ? 'bg-[#e5f4e9] text-[#147641] font-bold' : 'text-[#59675e] hover:bg-[#f3f7f3]'}`}>{c.icon} {c.nameBn}</Link>)}</nav>
    <div className="ticker-wrap overflow-hidden border-y border-[#eaf0ea] bg-[#f7faf6] py-2.5"><div className="ticker-track">{[...products,...products].map((p,i)=><span key={`${p.id}-${i}`} className="text-[12px] text-[#4b5d50]"><b>{p.image} {p.nameBn}</b> <span className="text-[#7a887d]">{bnNumber(p.today)} টাকা/{p.unit==='kg'?'কেজি':p.unit==='litre'?'লিটার':p.unit==='dozen'?'ডজন':'পিস'}</span> <b className={p.change.dir==='up'?'text-[#159451]':p.change.dir==='down'?'text-[#db5656]':'text-[#89938b]'}>{p.change.dir==='up'?'▲':p.change.dir==='down'?'▼':'—'} {bnNumber(Math.abs(p.change.pct))}%</b></span>)}</div></div>
  </header>;
}
