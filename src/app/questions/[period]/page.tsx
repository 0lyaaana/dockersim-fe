'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Question {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  views: number
  likes: number
  answers: number
  solved: boolean
}

// 더미 데이터 생성
const generateDummyQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Docker ${i % 2 === 0 ? '컨테이너' : '이미지'} 관련 질문입니다`,
    content: `Docker를 사용하면서 발생한 문제에 대해 질문드립니다...`,
    author: `user${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    views: Math.floor(Math.random() * 100),
    likes: Math.floor(Math.random() * 20),
    answers: Math.floor(Math.random() * 5),
    solved: Math.random() > 0.5
  }))
}

const QUESTIONS = generateDummyQuestions(50)
const ITEMS_PER_PAGE = 10

export default function QuestionsPage() {
  const params = useParams()
  const period = params.period as string
  const [currentPage, setCurrentPage] = useState(1)

  // 페이지네이션 계산
  const totalPages = Math.ceil(QUESTIONS.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuestions = QUESTIONS.slice(startIndex, endIndex)

  // 페이지 타이틀 설정
  const getPageTitle = () => {
    switch (period) {
      case 'year':
        return '연간 인기 질문'
      case 'month':
        return '월간 인기 질문'
      case 'week':
        return '주간 인기 질문'
      default:
        return '질문 목록'
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{getPageTitle()}</h2>
        <div className="btn-group">
          <Link 
            href="/questions/week" 
            className={`btn ${period === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            주간
          </Link>
          <Link 
            href="/questions/month" 
            className={`btn ${period === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            월간
          </Link>
          <Link 
            href="/questions/year" 
            className={`btn ${period === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            연간
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="list-group list-group-flush">
          {currentQuestions.map((question) => (
            <div key={question.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">
                    <Link 
                      href={`/questions/detail/${question.id}`}
                      className="text-decoration-none"
                    >
                      {question.title}
                    </Link>
                    {question.solved && (
                      <span className="badge bg-success ms-2">해결됨</span>
                    )}
                  </h5>
                  <small className="text-muted">
                    {question.author} • {new Date(question.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="d-flex gap-3 text-muted">
                  <div>
                    <i className="bi bi-eye me-1"></i>
                    {question.views}
                  </div>
                  <div>
                    <i className="bi bi-hand-thumbs-up me-1"></i>
                    {question.likes}
                  </div>
                  <div>
                    <i className="bi bi-chat-dots me-1"></i>
                    {question.answers}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                이전
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li 
                key={page} 
                className={`page-item ${currentPage === page ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                다음
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
} 