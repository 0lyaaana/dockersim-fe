'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Comment {
  id: number
  content: string
  author: string
  date: string
}

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  views: number
  likes: number
  comments: Comment[]
}

// 더미 데이터
const DUMMY_POST: Post = {
  id: 1,
  title: '게시글 제목 1',
  content: '게시글의 상세한 내용입니다. 여러 줄의 텍스트가 들어갈 수 있습니다.\n\n두 번째 문단의 내용입니다.',
  author: '작성자1',
  date: '2024-03-15',
  views: 85,
  likes: 12,
  comments: [
    {
      id: 1,
      content: '좋은 정보 감사합니다!',
      author: '댓글작성자1',
      date: '2024-03-15'
    },
    {
      id: 2,
      content: '저도 비슷한 경험이 있었는데 도움이 되었습니다.',
      author: '댓글작성자2',
      date: '2024-03-15'
    }
  ]
}

export default function BoardDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post>(DUMMY_POST)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      author: '현재 사용자',
      date: new Date().toISOString().split('T')[0]
    }

    setPost(prev => ({
      ...prev,
      comments: [...prev.comments, newCommentObj]
    }))
    setNewComment('')
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
        <button
                  className="btn btn-outline-secondary btn-sm mb-4 d-flex justify-content-end"
                  onClick={() => router.back()}
                >
                  목록으로
                </button>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center my-4">
                <h2 className="card-title mb-0">{post.title}</h2>
              </div>

              <div className="d-flex justify-content-end align-items-center mb-3">
                <div>
                  <span className="text-muted me-3">{post.author}</span>
                  <span className="text-muted">{post.date}</span>
                </div>
              </div>

              <hr />

              <div className="card-text my-5 mx-3" style={{ whiteSpace: 'pre-line' }}>
                {post.content}
              </div>

              <hr />

              <h5 className="mb-3">댓글 {post.comments.length}개</h5>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <div className="form-group">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="댓글을 작성하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      댓글 작성
                    </button>
                  </div>
                </div>
              </form>

              <div className="list-group">
                {post.comments.map(comment => (
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
      </div>
    </div>
  )
} 