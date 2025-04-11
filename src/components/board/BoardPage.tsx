import { useState } from 'react'
import './BoardPage.css'

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  comments: Comment[]
  views: number
  likes: number
  tags?: string[]
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
    likes: 15,
    tags: ['네트워크', 'Docker', '트러블슈팅']
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
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

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
    setNewPost({ title: '', content: '', tags: '' })
    setShowWriteModal(false)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])))

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="write-button"
            onClick={() => setShowWriteModal(true)}
          >
            <i className="bi bi-pencil-square"></i>
            글쓰기
          </button>
        </div>
        <div className="tags-section">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="board-content">
        {!selectedPost ? (
          <div className="posts-list">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="post-card"
                onClick={() => handlePostClick(post)}
              >
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <div className="post-meta">
                    <span><i className="bi bi-person"></i> {post.author}</span>
                    <span><i className="bi bi-calendar"></i> {post.date}</span>
                  </div>
                </div>
                <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                <div className="post-footer">
                  <div className="post-tags">
                    {post.tags?.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="post-stats">
                    <span><i className="bi bi-eye"></i> {post.views}</span>
                    <span><i className="bi bi-heart"></i> {post.likes}</span>
                    <span><i className="bi bi-chat"></i> {post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="post-detail">
            <div className="post-detail-header">
              <button
                className="back-button"
                onClick={() => setSelectedPost(null)}
              >
                <i className="bi bi-arrow-left"></i> 목록으로
              </button>
              <h2>{selectedPost.title}</h2>
              <div className="post-meta">
                <span><i className="bi bi-person"></i> {selectedPost.author}</span>
                <span><i className="bi bi-calendar"></i> {selectedPost.date}</span>
                <span><i className="bi bi-eye"></i> {selectedPost.views}</span>
                <span><i className="bi bi-heart"></i> {selectedPost.likes}</span>
              </div>
              {selectedPost.tags && (
                <div className="post-tags">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="post-content">
              {selectedPost.content}
            </div>
            
            <div className="comments-section">
              <h3>댓글 {selectedPost.comments.length}개</h3>
              <div className="comment-form">
                <textarea
                  className="comment-input"
                  placeholder="댓글을 작성하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                  className="comment-submit"
                  onClick={() => handleCommentSubmit(selectedPost.id)}
                >
                  댓글 작성
                </button>
              </div>
              
              <div className="comments-list">
                {selectedPost.comments.map(comment => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">{comment.date}</span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showWriteModal && (
        <div className="modal-overlay">
          <div className="write-modal">
            <div className="modal-header">
              <h3>새 글 작성</h3>
              <button
                className="close-button"
                onClick={() => setShowWriteModal(false)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <form onSubmit={handlePostSubmit} className="write-form">
              <div className="form-group">
                <label>제목</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label>내용</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="내용을 입력하세요"
                  rows={10}
                ></textarea>
              </div>
              <div className="form-group">
                <label>태그</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  placeholder="태그를 입력하세요 (쉼표로 구분)"
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="submit-button">
                  작성 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardPage