'use client'

import React, { useState } from 'react'
import Modal from '@/components/common/Modal'

interface CommandInputProps {
  level: number
  step: number
  onCommand: (command: string) => void
}

export default function CommandInput({ level, step, onCommand }: CommandInputProps) {
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [showCommandList, setShowCommandList] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTempSaveModal, setShowTempSaveModal] = useState(false)
  const [showWorkspaceList, setShowWorkspaceList] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [savedWorkspaces, setSavedWorkspaces] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    setConsoleOutput(prev => [...prev, `$ ${command}`])
    onCommand(command)
    setCommand('')
  }

  const handleSave = () => {
    if (!workspaceName.trim()) return
    setSavedWorkspaces(prev => [...prev, workspaceName])
    setWorkspaceName('')
    setShowSaveModal(false)
  }

  const handleTempSave = () => {
    if (!workspaceName.trim()) return
    setSavedWorkspaces(prev => [...prev, `임시: ${workspaceName}`])
    setWorkspaceName('')
    setShowTempSaveModal(false)
  }

  return (
    <div>
      {/* 도구 버튼 */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowCommandList(true)}
            >
              <i className="bi bi-search me-2"></i>
              명령어 찾기
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowSaveModal(true)}
            >
              <i className="bi bi-save me-2"></i>
              저장
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowTempSaveModal(true)}
            >
              <i className="bi bi-save2 me-2"></i>
              임시 저장
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowWorkspaceList(true)}
            >
              <i className="bi bi-list-ul me-2"></i>
              목록
            </button>
          </div>
        </div>
      </div>

      {/* 콘솔 */}
      <div className="card mb-3">
        <div className="card-body bg-dark text-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-title mb-0 text-light">Console</h6>
            <button 
              className="btn btn-sm btn-outline-light"
              onClick={() => setConsoleOutput([])}
            >
              Clear
            </button>
          </div>
          <div 
            className="console-output font-monospace"
            style={{ 
              height: '400px', 
              overflowY: 'auto',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {consoleOutput.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 명령어 입력 */}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg font-monospace"
                placeholder="docker command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <i className="bi bi-arrow-return-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 명령어 목록 모달 */}
      {showCommandList && (
        <Modal title="Docker 명령어 목록" onClose={() => setShowCommandList(false)}>
          <div className="list-group">
            <button 
              className="list-group-item list-group-item-action"
              onClick={() => {
                setCommand('docker ps')
                setShowCommandList(false)
              }}
            >
              <code>docker ps</code>
              <small className="d-block text-muted">실행 중인 컨테이너 목록 조회</small>
            </button>
            <button 
              className="list-group-item list-group-item-action"
              onClick={() => {
                setCommand('docker images')
                setShowCommandList(false)
              }}
            >
              <code>docker images</code>
              <small className="d-block text-muted">이미지 목록 조회</small>
            </button>
            <button 
              className="list-group-item list-group-item-action"
              onClick={() => {
                setCommand('docker run -d -p 80:80 nginx')
                setShowCommandList(false)
              }}
            >
              <code>docker run -d -p 80:80 nginx</code>
              <small className="d-block text-muted">Nginx 컨테이너 실행</small>
            </button>
          </div>
        </Modal>
      )}

      {/* 저장 모달 */}
      {showSaveModal && (
        <Modal title="작업 공간 저장" onClose={() => setShowSaveModal(false)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">작업 공간 이름</label>
              <input
                type="text"
                className="form-control"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="작업 공간 이름을 입력하세요"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowSaveModal(false)
                setWorkspaceName('')
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!workspaceName}
            >
              저장
            </button>
          </div>
        </Modal>
      )}

      {/* 임시 저장 모달 */}
      {showTempSaveModal && (
        <Modal title="임시 저장" onClose={() => setShowTempSaveModal(false)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">임시 저장 이름</label>
              <input
                type="text"
                className="form-control"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="임시 저장 이름을 입력하세요"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowTempSaveModal(false)
                setWorkspaceName('')
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleTempSave}
              disabled={!workspaceName}
            >
              저장
            </button>
          </div>
        </Modal>
      )}

      {/* 작업 공간 목록 모달 */}
      {showWorkspaceList && (
        <Modal title="작업 공간 목록" onClose={() => setShowWorkspaceList(false)}>
          <div className="list-group">
            {savedWorkspaces.map((workspace, index) => (
              <div 
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {workspace}
                <div>
                  <button className="btn btn-sm btn-outline-primary me-1">
                    <i className="bi bi-box-arrow-up-right"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setSavedWorkspaces(prev => prev.filter((_, i) => i !== index))
                    }}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))}
            {savedWorkspaces.length === 0 && (
              <div className="text-center text-muted py-4">
                저장된 작업 공간이 없습니다.
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
} 