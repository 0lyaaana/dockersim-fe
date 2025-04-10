'use client'

import { useState } from 'react'
import Link from 'next/link'
import PostList from '@/components/board/PostList'
import SearchBar from '@/components/board/SearchBar'

interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  visualizationData?: string
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Nginx 컨테이너 설정 공유',
    content: 'Nginx 컨테이너를 사용한 로드밸런서 구성 방법을 공유합니다.',
    author: '김개발',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    title: 'MongoDB 클러스터 구성',
    content: 'Docker를 이용한 MongoDB 클러스터 구성 방법입니다.',
    author: '이도커',
    createdAt: '2024-03-14',
  },
]

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="board-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>게시판</h2>
        <Link href="/board/write" className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <PostList posts={filteredPosts} />
    </div>
  )
} 