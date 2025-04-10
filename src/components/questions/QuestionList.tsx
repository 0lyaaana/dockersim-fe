import { useState } from 'react'

interface Question {
  id: number
  title: string
  content: string
  author: string
  date: string
  comments: Comment[]
  views: number
  likes: number
}

interface Comment {
  id: number
  content: string
  author: string
  date: string
}

const DUMMY_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Docker 볼륨 마운트 문제',
    content: 'Windows 환경에서 Docker 볼륨 마운트가 제대로 동작하지 않습니다. 권한 설정을 어떻게 해야 하나요?',
    author: '박도커',
    date: '2024-03-15',
    comments: [
      {
        id: 1,
        content: '권한 설정을 확인해보세요. Windows에서는 특히 경로 설정이 중요합니다.',
        author: '이컨테이너',
        date: '2024-03-15'
      }
    ],
    views: 85,
    likes: 12
  },
  {
    id: 2,
    title: 'Docker 네트워크 설정 문제',
    content: '컨테이너 간 통신이 안되는 문제가 있습니다. 네트워크 설정을 어떻게 해야 하나요?',
    author: '김도커',
    date: '2024-03-14',
    comments: [],
    views: 65,
    likes: 8
  }
]

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>(DUMMY_QUESTIONS)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [newComment, setNewComment] = useState('')
  const [period, setPeriod] = useState<'year' | 'month' | 'week'>('week')

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleCommentSubmit = (questionId: number) => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      author: '현재 사용자',
      date: new Date().toISOString().split('T')[0]
    }

    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          comments: [...question.comments, newCommentObj]
        }
      }
      return question
    }))

    setNewComment('')
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">인기 질문</h2>
                <div className="btn-group">
                  <button
                    className={`btn btn-outline-primary ${period === 'year' ? 'active' : ''}`}
                    onClick={() => setPeriod('year')}
                  >
                    연간
                  </button>
                  <button
                    className={`btn btn-outline-primary ${period === 'month' ? 'active' : ''}`}
                    onClick={() => setPeriod('month')}
                  >
                    월간
                  </button>
                  <button
                    className={`btn btn-outline-primary ${period === 'week' ? 'active' : ''}`}
                    onClick={() => setPeriod('week')}
                  >
                    주간
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {!selectedQuestion ? (
          <div className="col-12">
            <div className="list-group">
              {questions.map(question => (
                <button
                  key={question.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleQuestionClick(question)}
                >
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-2">{question.title}</h5>
                      <p className="mb-2 text-muted">{question.content.substring(0, 150)}...</p>
                      <small className="text-muted">
                        작성자: {question.author} | 작성일: {question.date}
                      </small>
                    </div>
                    <div className="text-end ms-3">
                      <div className="mb-1">
                        <span className="badge bg-primary me-1">
                          <i className="bi bi-eye"></i> {question.views}
                        </span>
                        <span className="badge bg-danger">
                          <i className="bi bi-heart"></i> {question.likes}
                        </span>
                      </div>
                      <small className="text-muted">
                        댓글 {question.comments.length}개
                      </small>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="card-title mb-0">{selectedQuestion.title}</h3>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setSelectedQuestion(null)}
                  >
                    목록으로
                  </button>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">작성자: {selectedQuestion.author}</span>
                  <span className="text-muted">{selectedQuestion.date}</span>
                </div>
                <p className="card-text">{selectedQuestion.content}</p>
                
                <div className="d-flex justify-content-end gap-2 mb-4">
                  <span className="badge bg-primary">
                    <i className="bi bi-eye"></i> {selectedQuestion.views}
                  </span>
                  <span className="badge bg-danger">
                    <i className="bi bi-heart"></i> {selectedQuestion.likes}
                  </span>
                </div>
                
                <hr />
                
                <h5 className="mb-3">댓글 ({selectedQuestion.comments.length})</h5>
                <div className="mb-4">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="댓글을 작성하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <div className="text-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCommentSubmit(selectedQuestion.id)}
                    >
                      댓글 작성
                    </button>
                  </div>
                </div>
                
                <div className="list-group">
                  {selectedQuestion.comments.map(comment => (
                    <div key={comment.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{comment.author}</h6>
                        <small className="text-muted">{comment.date}</small>
                      </div>
                      <p className="mb-0">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionList 