'use client'

import React, { useState, useEffect } from 'react'
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

const ITEMS_PER_PAGE = 10

export default function QuestionsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // 질문 데이터 로드 (실제로는 API 호출)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        // 실제 구현에서는 API 호출
        const dummyData = generateDummyQuestions(50)
        setQuestions(dummyData)
      } catch (error) {
        console.error('Failed to fetch questions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [period])

  // 페이지네이션 계산
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuestions = questions.slice(startIndex, endIndex)

  const handlePeriodChange = (newPeriod: 'week' | 'month' | 'year') => {
    setPeriod(newPeriod)
    setCurrentPage(1)
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>질문 목록</h2>
        <div className="btn-group">
          <Link 
            href="/questions/week" 
            className={`btn ${period === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={(e) => {
              e.preventDefault()
              handlePeriodChange('week')
            }}
          >
            주간
          </Link>
          <Link 
            href="/questions/month" 
            className={`btn ${period === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={(e) => {
              e.preventDefault()
              handlePeriodChange('month')
            }}
          >
            월간
          </Link>
          <Link 
            href="/questions/year" 
            className={`btn ${period === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={(e) => {
              e.preventDefault()
              handlePeriodChange('year')
            }}
          >
            연간
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
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
                        
                      </h5>
                      <small className="text-muted">
                        {question.content}
                      </small>
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
        </>
      )}
    </div>
  )
} 