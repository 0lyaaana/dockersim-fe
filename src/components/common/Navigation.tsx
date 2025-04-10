"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Docker Simulator
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                href="/learn"
                className={`nav-link ${pathname === '/learn' ? 'active' : ''}`}
              >
                학습
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/workspace"
                className={`nav-link ${pathname === '/workspace' ? 'active' : ''}`}
              >
                작업
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/board"
                className={`nav-link ${pathname === '/board' ? 'active' : ''}`}
              >
                게시판
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/questions"
                className={`nav-link ${pathname === '/questions' ? 'active' : ''}`}
              >
                질문
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                href="/settings"
                className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}
              >
                설정
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 