"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Docker Simulator
        </Link>
        <div className="navbar-nav">
          <Link 
            href="/learn" 
            className={`nav-link ${pathname === '/learn' ? 'active' : ''}`}
          >
            학습
          </Link>
          <Link 
            href="/workspace" 
            className={`nav-link ${pathname === '/workspace' ? 'active' : ''}`}
          >
            작업
          </Link>
          <Link 
            href="/board" 
            className={`nav-link ${pathname === '/board' ? 'active' : ''}`}
          >
            게시판
          </Link>
          <Link 
            href="/questions" 
            className={`nav-link ${pathname === '/questions' ? 'active' : ''}`}
          >
            질문
          </Link>
          <Link 
            href="/settings" 
            className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}
          >
            설정
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 