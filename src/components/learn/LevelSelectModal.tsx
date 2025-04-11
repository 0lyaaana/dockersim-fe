import React from 'react'
import { Level, LEVELS } from '../../constants/levels'

interface LevelSelectModalProps {
  onClose: () => void
  onSelect: (level: Level) => void
}

const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ onClose, onSelect }) => {
  const handleSelect = (level: Level) => {
    onSelect(level)
    onClose()
  }

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">레벨 선택</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              {LEVELS.map((level: Level, index: number) => (
                <div key={index} className="col-md-6">
                  <div
                    className="card h-100 cursor-pointer"
                    onClick={() => handleSelect(level)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{level.name}</h5>
                      <p className="card-text">{level.description}</p>
                      <small className="text-muted">
                        {level.commands.length}개의 명령어
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelSelectModal 