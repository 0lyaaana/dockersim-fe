import { useState } from 'react'

interface Question {
  id: number
  title: string
  content: string
  votes: number
  answers: number
  views: number
  createdAt: string
}

interface QuestionDetailProps {
  question: Question
  onBack: () => void
}

const MOCK_COMMENTS = [
  {
    id: 1,
    content: '볼륨 마운트 경로를 확인해보세요.',
    author: '김도커',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    content: '권한 설정도 체크해보시면 좋을 것 같습니다.',
    author: '이컨테이너',
    createdAt: '2024-03-15',
  },
]

const QuestionDetail = ({ question, onBack }: QuestionDetailProps) => {
  const [comment, setComment] = useState('')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // 댓글 작성 로직
    setComment('')
  }

  return (
    <div className="question-detail">
      <button
        className="btn btn-link mb-3 ps-0"
        onClick={onBack}
      >
        ← 목록으로
      </button>

      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">{question.title}</h4>
          <p className="card-text">{question.content}</p>
          <div className="d-flex gap-3">
            <small className="text-muted">
              <i className="bi bi-arrow-up-circle"></i> {question.votes} 추천
            </small>
            <small className="text-muted">
              <i className="bi bi-chat"></i> {question.answers} 답변
            </small>
            <small className="text-muted">
              <i className="bi bi-eye"></i> {question.views} 조회
            </small>
            <small className="text-muted">
              작성일: {question.createdAt}
            </small>
          </div>
        </div>
      </div>

      <h5 className="mb-3">답변</h5>
      <div className="list-group mb-4">
        {MOCK_COMMENTS.map(comment => (
          <div key={comment.id} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">{comment.author}</h6>
              <small className="text-muted">{comment.createdAt}</small>
            </div>
            <p className="mb-1">{comment.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">답변 작성</label>
          <textarea
            className="form-control"
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!comment.trim()}
        >
          답변 등록
        </button>
      </form>
    </div>
  )
}

export default QuestionDetail 