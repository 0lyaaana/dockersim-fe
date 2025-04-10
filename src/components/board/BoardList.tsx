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
    content: '최근에 Docker 네트워크 설정에서 겪은 문제와 해결 방법을 공유합니다...',
    author: '김도커',
    date: '2024-03-15',
    comments: [
      {
        id: 1,
        content: '정말 유용한 정보네요!',
        author: '이컨테이너',
        date: '2024-03-15'
      }
    ],
    views: 120,
    likes: 15
  },
  // 더미 데이터 추가...
]

const BoardList = () => {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>게시판</h2>
            <button className="btn btn-primary">글쓰기</button>
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="제목이나 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="list-group">
            {filteredPosts.map(post => (
              <button
                key={post.id}
                className={`list-group-item list-group-item-action ${
                  selectedPost?.id === post.id ? 'active' : ''
                }`}
                onClick={() => handlePostClick(post)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{post.title}</h5>
                  <small>{post.date}</small>
                </div>
                <p className="mb-1">{post.content.substring(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">작성자: {post.author}</small>
                  <div>
                    <small className="me-2">
                      <i className="bi bi-eye"></i> {post.views}
                    </small>
                    <small>
                      <i className="bi bi-heart"></i> {post.likes}
                    </small>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          {selectedPost ? (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{selectedPost.title}</h3>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">작성자: {selectedPost.author}</span>
                  <span className="text-muted">{selectedPost.date}</span>
                </div>
                <p className="card-text">{selectedPost.content}</p>
                
                <hr />
                
                <h5>댓글 ({selectedPost.comments.length})</h5>
                <div className="mb-3">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="댓글을 작성하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCommentSubmit(selectedPost.id)}
                  >
                    댓글 작성
                  </button>
                </div>
                
                <div className="list-group">
                  {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">{comment.author}</h6>
                        <small className="text-muted">{comment.date}</small>
                      </div>
                      <p className="mb-1">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted">
              <p>게시글을 선택해주세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BoardList 