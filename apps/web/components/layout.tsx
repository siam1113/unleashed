import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='bg-slate-50 w-screen h-screen p-3'>{children}</main>
  )
}