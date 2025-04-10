import { useState } from 'react'

interface SaveWorkspaceModalProps {
  onClose: () => void
  onSave: (name: string) => void
}

const SaveWorkspaceModal = ({ onClose, onSave }: SaveWorkspaceModalProps) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim())
    }
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">작업 공간 저장</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="workspace-name" className="form-label">
                  작업 공간 이름
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workspace-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="작업 공간 이름을 입력하세요"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                취소
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!name.trim()}
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SaveWorkspaceModal 