'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
}

const DUMMY_POSTS: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 제목 ${i + 1}`,
  content: `게시글 내용 ${i + 1}...`,
  author: `작성자${i + 1}`,
  date: '2024-03-15',
}))

export default function BoardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const filteredPosts = DUMMY_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="my-5">게시판</h2>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <div className="input-group me-3" style={{ width: '300px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색어를 입력하세요..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Link href="/board/write" className="btn btn-primary">
                    글쓰기
                  </Link>
                </div>
            </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="list-group mt-5">
            {currentPosts.map(post => (
              <button
                key={post.id}
                className="list-group-item list-group-item-action border-0 border-bottom py-4 bg-transparent"
                onClick={() => router.push(`/board/${post.id}`)}
              >
                <div className="d-flex w-100 justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-2">{post.title}</h5>
                    <p className="mb-1 text-muted">{post.content}</p>
                  </div>
                  <small className="text-muted ms-3">
                    {post.date} | {post.author}
                  </small>
                </div>
              </button>
            ))}
          </div>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  이전
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  다음
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
} 