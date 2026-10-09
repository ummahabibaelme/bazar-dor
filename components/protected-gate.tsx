'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function ProtectedGate({ children }: { children: React.ReactNode }) { const router=useRouter(); const {data:session,isPending}=authClient.useSession(); useEffect(()=>{if(!isPending&&!session){toast.error('এই পেজটি দেখতে আগে সাইন ইন করুন');router.replace('/signin');}},[isPending,session,router]); if(isPending||!session)return <div className="container-main py-20"><div className="surface p-8"><div className="skeleton h-6 w-48"/><div className="skeleton h-24 w-full mt-5"/></div></div>; return <>{children}</>; }
