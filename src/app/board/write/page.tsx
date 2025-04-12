'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import '@toast-ui/editor/dist/toastui-editor.css'

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div>로딩중...</div>
})

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const editorRef = useRef<any>(null)
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const content = editorRef.current?.getInstance().getMarkdown()
    // TODO: API 연동 후 게시글 저장 로직 구현
    console.log({ title, content, workspaceData: selectedWorkspace })
    router.push('/board')
  }

  const handleWorkspaceSelect = (workspace: string) => {
    setSelectedWorkspace(workspace)
    setShowWorkspaceModal(false)
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="my-5">작성하기</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            className="form-control border-0 border-bottom rounded-0 px-0 fs-4"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-5" style={{ minHeight: '400px' }}>
          <Editor
            ref={editorRef}
            initialValue=""
            placeholder="내용을 입력하세요..."
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            useCommandShortcut={true}
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setShowWorkspaceModal(true)}
          >
            작업물 불러오기
          </button>
          {selectedWorkspace && (
            <div className="mt-2">
              <span className="badge bg-primary">
                <i className="bi bi-check-circle me-1"></i>
                선택된 작업 공간: {selectedWorkspace}
              </span>
            </div>
          )}
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button type="submit" className="btn btn-primary px-4">
            등록
          </button>
        </div>
      </form>

      {showWorkspaceModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">작업물 불러오기</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowWorkspaceModal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {/* TODO: 실제 작업 공간 목록을 API로 불러와서 표시 */}
                <div className="list-group">
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => handleWorkspaceSelect('학습 공간')}
                  >
                    작업 공간 1
                  </button>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => handleWorkspaceSelect('작업 공간')}
                  >
                    작업 공간 2
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 