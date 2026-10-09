import Link from 'next/link';
import { Home } from 'lucide-react';
export default function NotFound(){return <div className="container-main py-20 text-center min-h-[55vh]"><div className="surface mx-auto max-w-lg p-10"><p className="text-6xl font-extrabold text-[#16834a]">404</p><h1 className="text-2xl font-bold mt-3">এই পেজটি খুঁজে পাওয়া যায়নি</h1><p className="muted mt-2">লিংকটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।</p><Link href="/" className="btn-primary mt-6"><Home size={16}/> হোম পেজে ফিরে যান</Link></div></div>}
