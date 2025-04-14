'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
}

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
  comments: Comment[]
}

export default function QuestionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true)
      try {
        // 실제 구현에서는 API 호출
        // 더미 데이터 생성
        const dummyQuestion: Question = {
          id: Number(params.id),
          title: 'Docker 컨테이너 관련 질문입니다',
          content: `Docker를 사용하면서 발생한 문제에 대해 질문드립니다.
          
컨테이너를 실행할 때 다음과 같은 에러가 발생합니다:
\`\`\`
Error: No such container: test_container
\`\`\`

어떻게 해결할 수 있을까요?`,
          author: 'user1',
          createdAt: new Date().toISOString(),
          views: 42,
          likes: 5,
          answers: 2,
          solved: false,
          comments: [
            {
              id: 1,
              author: 'expert1',
              content: '컨테이너 이름이 올바른지 확인해보세요.',
              createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: 2,
              author: 'helper2',
              content: 'docker ps -a 명령어로 모든 컨테이너 목록을 확인해보시는 건 어떨까요?',
              createdAt: new Date(Date.now() - 43200000).toISOString()
            }
          ]
        }
        setQuestion(dummyQuestion)
      } catch (error) {
        console.error('Failed to fetch questions:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchQuestion()
    }
  }, [params.id])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question || !newComment.trim()) return

    const newCommentObj: Comment = {
      id: question.comments.length + 1,
      author: 'currentUser', // 실제 구현에서는 로그인한 사용자 정보 사용
      content: newComment,
      createdAt: new Date().toISOString()
    }

    setQuestion({
      ...question,
      comments: [...question.comments, newCommentObj],
      answers: question.answers + 1
    })
    setNewComment('')
  }

  

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          질문을 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* 상단 네비게이션 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link href="/questions" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          목록으로
        </Link>
      </div>

      {/* 질문 내용 */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">{question.title}</h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 text-muted">
            </div>
          </div>
          <div className="question-content">
            {question.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            답변 {question.comments.length}개
          </h5>
        </div>
        <div className="list-group list-group-flush">
          {question.comments.map((comment) => (
            <div key={comment.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <strong>{comment.author}</strong>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
              <p className="mb-0">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 작성 폼 */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">답변 작성</h5>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="답변을 작성해주세요..."
              ></textarea>
            </div>
            <div className="text-end">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!newComment.trim()}
              >
                답변 등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 