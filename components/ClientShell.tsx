'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false })
const Nav = dynamic(() => import('@/components/Nav'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const LenisProvider = dynamic(() => import('@/lib/lenis'), { ssr: false })

interface ClientShellProps {
  children: ReactNode
}

export default function ClientShell({ children }: ClientShellProps) {
  return (
    <LenisProvider>
      <Preloader />
      <CustomCursor />
      <Nav />
      {children}
    </LenisProvider>
  )
}
