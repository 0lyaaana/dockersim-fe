import { useState } from 'react'

interface Post {
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

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    title: 'Docker 네트워크 설정 공유',
    content: '최근에 Docker 네트워크 설정에서 겪은 문제와 해결 방법을 공유합니다. 컨테이너 간 통신이 안되는 문제가 있었는데, bridge 네트워크를 사용하여 해결했습니다. 자세한 내용은 다음과 같습니다...',
    author: '김도커',
    date: '2024-03-15',
    comments: [
      {
        id: 1,
        content: '정말 유용한 정보네요! 저도 비슷한 문제가 있었는데 도움이 될 것 같습니다.',
        author: '이컨테이너',
        date: '2024-03-15'
      }
    ],
    views: 120,
    likes: 15
  },
  {
    id: 2,
    title: 'Docker Compose 파일 작성 팁',
    content: 'Docker Compose를 사용하면서 알게 된 유용한 팁들을 공유합니다. 환경 변수 설정, 볼륨 마운트, 네트워크 구성 등에 대한 베스트 프랙티스를 정리했습니다...',
    author: '박컴포즈',
    date: '2024-03-14',
    comments: [],
    views: 85,
    likes: 10
  }
]

const BoardPage = () => {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState('')
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleCommentSubmit = (postId: number) => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      author: '현재 사용자',
      date: new Date().toISOString().split('T')[0]
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        }
      }
      return post
    }))

    setNewComment('')
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const newPostObj: Post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: '현재 사용자',
      date: new Date().toISOString().split('T')[0],
      comments: [],
      views: 0,
      likes: 0
    }

    setPosts([newPostObj, ...posts])
    setNewPost({ title: '', content: '' })
    setShowWriteModal(false)
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">게시판</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowWriteModal(true)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  글쓰기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {!selectedPost ? (
          <div className="col-12">
            <div className="list-group">
              {posts.map(post => (
                <button
                  key={post.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-2">{post.title}</h5>
                      <p className="mb-2 text-muted">{post.content.substring(0, 200)}...</p>
                      <small className="text-muted">
                        작성자: {post.author} | 작성일: {post.date}
                      </small>
                    </div>
                    <div className="text-end ms-3">
                      <div className="mb-1">
                        <span className="badge bg-primary me-1">
                          <i className="bi bi-eye"></i> {post.views}
                        </span>
                        <span className="badge bg-danger me-1">
                          <i className="bi bi-heart"></i> {post.likes}
                        </span>
                        <span className="badge bg-secondary">
                          <i className="bi bi-chat"></i> {post.comments.length}
                        </span>
                      </div>
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
                  <h3 className="card-title mb-0">{selectedPost.title}</h3>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setSelectedPost(null)}
                  >
                    목록으로
                  </button>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">작성자: {selectedPost.author}</span>
                  <span className="text-muted">{selectedPost.date}</span>
                </div>
                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                  {selectedPost.content}
                </p>
                
                <div className="d-flex justify-content-end gap-2 mb-4">
                  <span className="badge bg-primary">
                    <i className="bi bi-eye"></i> {selectedPost.views}
                  </span>
                  <span className="badge bg-danger">
                    <i className="bi bi-heart"></i> {selectedPost.likes}
                  </span>
                </div>
                
                <hr />
                
                <h5 className="mb-3">댓글 ({selectedPost.comments.length})</h5>
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
                      onClick={() => handleCommentSubmit(selectedPost.id)}
                    >
                      댓글 작성
                    </button>
                  </div>
                </div>
                
                <div className="list-group">
                  {selectedPost.comments.map(comment => (
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

      {showWriteModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">글쓰기</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowWriteModal(false)}
                ></button>
              </div>
              <form onSubmit={handlePostSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="postTitle" className="form-label">제목</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="postContent" className="form-label">내용</label>
                    <textarea
                      className="form-control"
                      id="postContent"
                      rows={10}
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowWriteModal(false)}
                  >
                    취소
                  </button>
                  <button type="submit" className="btn btn-primary">
                    작성
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardPage