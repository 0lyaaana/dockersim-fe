'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SavedWorkspaceList from '@/components/board/SavedWorkspaceList'

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null)
  const [showWorkspaceList, setShowWorkspaceList] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 게시글 작성 로직
    router.push('/board')
  }

  return (
    <div className="write-page">
      <h2 className="mb-4">게시글 작성</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea
            className="form-control"
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowWorkspaceList(true)}
          >
            작업 공간 불러오기
          </button>
          {selectedWorkspace && (
            <div className="mt-2">
              <span className="badge bg-info">
                선택된 작업 공간: {selectedWorkspace}
              </span>
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!title.trim() || !content.trim()}
          >
            작성
          </button>
        </div>
      </form>

      {showWorkspaceList && (
        <SavedWorkspaceList
          onClose={() => setShowWorkspaceList(false)}
          onSelect={(workspace) => {
            setSelectedWorkspace(workspace)
            setShowWorkspaceList(false)
          }}
        />
      )}
    </div>
  )
} 