import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  visualizationData?: string
}

interface PostListProps {
  posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="post-list">
      <div className="list-group">
        {posts.length === 0 ? (
          <div className="text-center p-4">
            게시글이 없습니다.
          </div>
        ) : (
          posts.map(post => (
            <Link
              key={post.id}
              href={`/board/${post.id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small className="text-muted">{post.createdAt}</small>
              </div>
              <p className="mb-1">{post.content}</p>
              <small className="text-muted">작성자: {post.author}</small>
              {post.visualizationData && (
                <span className="badge bg-info ms-2">시각화 데이터 포함</span>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default PostList 