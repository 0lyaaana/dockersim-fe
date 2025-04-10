const MOCK_MY_POSTS = [
  {
    id: 1,
    title: 'Nginx 컨테이너 설정 공유',
    content: 'Nginx 컨테이너를 사용한 로드밸런서 구성 방법을 공유합니다.',
    createdAt: '2024-03-15',
    comments: 3,
  },
  {
    id: 2,
    title: 'MongoDB 클러스터 구성',
    content: 'Docker를 이용한 MongoDB 클러스터 구성 방법입니다.',
    createdAt: '2024-03-14',
    comments: 2,
  },
]

const MyPosts = () => {
  return (
    <div className="my-posts">
      <h3 className="mb-4">내 게시글</h3>
      <div className="list-group">
        {MOCK_MY_POSTS.map(post => (
          <div key={post.id} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{post.title}</h5>
              <small className="text-muted">{post.createdAt}</small>
            </div>
            <p className="mb-1">{post.content}</p>
            <small className="text-muted">
              댓글 {post.comments}개
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPosts 