const MOCK_MY_COMMENTS = [
  {
    id: 1,
    postTitle: 'Docker 컨테이너에서 볼륨 마운트가 안되는 문제',
    content: '볼륨 마운트 경로를 확인해보세요.',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    postTitle: 'Docker Compose 네트워크 설정 방법',
    content: '네트워크 드라이버 설정을 확인해보시면 좋을 것 같습니다.',
    createdAt: '2024-03-14',
  },
]

const MyComments = () => {
  return (
    <div className="my-comments">
      <h3 className="mb-4">내 댓글</h3>
      <div className="list-group">
        {MOCK_MY_COMMENTS.map(comment => (
          <div key={comment.id} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">게시글: {comment.postTitle}</h6>
              <small className="text-muted">{comment.createdAt}</small>
            </div>
            <p className="mb-1">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyComments 