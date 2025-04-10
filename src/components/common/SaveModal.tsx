import { useState } from 'react'

interface SaveModalProps {
  onClose: () => void
  onSave: (name: string) => void
  type: 'learn' | 'workspace'
  isTemporary?: boolean
}

const SaveModal = ({ onClose, onSave, type, isTemporary = false }: SaveModalProps) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name)
    onClose()
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isTemporary ? '임시 저장' : '저장하기'} - {type === 'learn' ? '학습' : '작업'}공간
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="saveName" className="form-label">저장 이름</label>
                <input
                  type="text"
                  className="form-control"
                  id="saveName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="저장할 이름을 입력하세요"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SaveModal 