'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface Question {
  id: number
  title: string
  content: string
  date: string
  views: number
  answers: number
}

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const questionsPerPage = 10
  const router = useRouter()
  const pathname = usePathname()

  const getPeriodFromPath = () => {
    if (pathname.includes('year')) return 'year'
    if (pathname.includes('month')) return 'month'
    return 'week'
  }

  const [period, setPeriod] = useState(getPeriodFromPath())

  useEffect(() => {
    const fetchQuestions = async () => {
      // TODO: API 연동 후 실제 데이터로 교체
      const mockData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `자주 묻는 질문 ${i + 1}`,
        content: `자주 묻는 질문 내용 ${i + 1}`,
        date: '2024-03-15',
        views: Math.floor(Math.random() * 100),
        answers: Math.floor(Math.random() * 10)
      }))

      // 기간별 필터링 로직 (실제 API에서는 서버에서 처리)
      const filteredData = mockData.filter(q => {
        const date = new Date(q.date)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (period) {
          case 'week':
            return diffDays <= 7
          case 'month':
            return diffDays <= 30
          case 'year':
            return diffDays <= 365
          default:
            return true
        }
      })

      setQuestions(filteredData)
      setTotalPages(Math.ceil(filteredData.length / questionsPerPage))
    }

    fetchQuestions()
  }, [period])

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod)
    router.push(`/questions/${newPeriod}`)
  }

  const getCurrentQuestions = () => {
    const indexOfLastQuestion = currentPage * questionsPerPage
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
    return questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">자주 묻는 질문</h2>
          
          <div className="d-flex justify-content-center mb-4 nav-tabs border-0">
            <Link 
              href="/questions/year" 
              className={`nav-link border-0 ${period === 'year' ? 'active fw-bold' : ''}`}
              onClick={() => handlePeriodChange('year')}
            >
              연간
            </Link>
            <Link 
              href="/questions/month" 
              className={`nav-link border-0 mx-5 ${period === 'month' ? 'active fw-bold' : ''}`}
              onClick={() => handlePeriodChange('month')}
            >
              월간
            </Link>
            <Link 
              href="/questions/week" 
              className={`nav-link border-0 ${period === 'week' ? 'active fw-bold' : ''}`}
              onClick={() => handlePeriodChange('week')}
            >
              주간
            </Link>
          </div>

          <div className="list-group mb-4">
            {getCurrentQuestions().map((question) => (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
                className="list-group-item list-group-item-action border-0 border-bottom py-3"
              >
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5 className="mb-1">{question.title}</h5>
                  <small className="text-muted">{question.date}</small>
                </div>
                <p className="mb-1 text-muted">{question.content}</p>
                <div className="d-flex gap-3">
                  <small className="text-muted">
                    <i className="bi bi-eye me-1"></i>
                    {question.views}
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-chat me-1"></i>
                    {question.answers}
                  </small>
                </div>
              </Link>
            ))}
          </div>

          <nav aria-label="Questions pagination" className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
} 