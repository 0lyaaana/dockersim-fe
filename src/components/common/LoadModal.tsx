import { useState } from 'react'

interface SavedItem {
  id: string
  name: string
  type: 'learn' | 'workspace'
  isTemporary: boolean
  date: string
  data: any
}

interface LoadModalProps {
  onClose: () => void
  onLoad: (data: any) => void
  type: 'learn' | 'workspace'
  savedItems: SavedItem[]
}

const LoadModal = ({ onClose, onLoad, type, savedItems }: LoadModalProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = savedItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.type === type
  )

  const handleLoad = (item: SavedItem) => {
    onLoad(item.data)
    onClose()
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {type === 'learn' ? '학습' : '작업'}공간 불러오기
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="저장된 항목 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="list-group">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleLoad(item)}
                >
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">저장일: {item.date}</small>
                    </div>
                    {item.isTemporary && (
                      <span className="badge bg-warning">임시</span>
                    )}
                  </div>
                </button>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center text-muted py-3">
                  저장된 항목이 없습니다.
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadModal 