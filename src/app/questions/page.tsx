'use client'

import { useState } from 'react'
import QuestionList from '@/components/questions/QuestionList'
import QuestionDetail from '@/components/questions/QuestionDetail'

type Period = 'yearly' | 'monthly' | 'weekly'

interface Question {
  id: number
  title: string
  content: string
  votes: number
  answers: number
  views: number
  createdAt: string
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Docker 컨테이너에서 볼륨 마운트가 안되는 문제',
    content: '도커 컨테이너에서 볼륨 마운트를 시도하고 있는데 계속 실패합니다...',
    votes: 15,
    answers: 3,
    views: 234,
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    title: 'Docker Compose 네트워크 설정 방법',
    content: 'Docker Compose에서 여러 서비스 간의 네트워크 설정을 어떻게 하나요?',
    votes: 10,
    answers: 2,
    views: 156,
    createdAt: '2024-03-14',
  },
]

export default function QuestionsPage() {
  const [period, setPeriod] = useState<Period>('weekly')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  return (
    <div className="questions-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>자주 묻는 질문</h2>
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${period === 'weekly' ? 'active' : ''}`}
            onClick={() => setPeriod('weekly')}
          >
            주간
          </button>
          <button
            className={`btn btn-outline-primary ${period === 'monthly' ? 'active' : ''}`}
            onClick={() => setPeriod('monthly')}
          >
            월간
          </button>
          <button
            className={`btn btn-outline-primary ${period === 'yearly' ? 'active' : ''}`}
            onClick={() => setPeriod('yearly')}
          >
            연간
          </button>
        </div>
      </div>

      {selectedQuestion ? (
        <QuestionDetail
          question={selectedQuestion}
          onBack={() => setSelectedQuestion(null)}
        />
      ) : (
        <QuestionList
          questions={MOCK_QUESTIONS}
          onSelectQuestion={setSelectedQuestion}
        />
      )}
    </div>
  )
} 