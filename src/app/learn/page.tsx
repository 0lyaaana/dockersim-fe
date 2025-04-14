'use client'

import { useState } from 'react'
import Link from 'next/link'
import LevelModal from '@/components/learn/LevelModal'
import DockerVisualization from '@/components/learn/DockerVisualization'

interface ContainerData {
  id: string
  name: string
  status: 'running' | 'stopped' | 'paused'
  image: string
  ports: string[]
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('containers')
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [savedWorkspaces, setSavedWorkspaces] = useState<string[]>([])
  const [showCommandList, setShowCommandList] = useState(false)
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTempSaveModal, setShowTempSaveModal] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [containers, setContainers] = useState<ContainerData[]>([])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLevel) {
      alert('먼저 학습 레벨을 선택해주세요.')
      return
    }
    // TODO: 실제 Docker 명령어 실행 로직 구현
    setConsoleOutput(prev => [...prev, `$ ${command}`, '실행 결과...'])
    setCommand('')
  }

  const handleReset = () => {
    setConsoleOutput([])
    setCommand('')
  }

  const handleSave = () => {
    if (workspaceName) {
      setSavedWorkspaces(prev => [...prev, workspaceName])
      setWorkspaceName('')
      setShowSaveModal(false)
      // TODO: 실제 저장 로직 구현
    }
  }

  const handleTempSave = () => {
    if (workspaceName) {
      setSavedWorkspaces(prev => [...prev, `임시 저장: ${workspaceName}`])
      setWorkspaceName('')
      setShowTempSaveModal(false)
      // TODO: 실제 임시 저장 로직 구현
    }
  }

  const handleContainerClick = (containerId: string) => {
    // TODO: 컨테이너 상세 정보 표시 로직 구현
    console.log('Container clicked:', containerId)
  }

  const handleLevelSelect = (level: number, step: number) => {
    setSelectedLevel(level)
    // TODO: 선택된 스텝에 따른 추가 로직 구현
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* 사이드바 */}
        <div className="col-auto min-vh-100 bg-light border-end">
          <div className="d-flex flex-column p-3" style={{ width: '240px' }}>
            <button
              className="btn btn-primary text-start mb-2"
              onClick={() => setShowLevelModal(true)}
            >
              <i className="bi bi-book me-2"></i>
              레벨 선택
            </button>
            <button
              className={`btn text-start mb-2 ${activeTab === 'containers' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setActiveTab('containers')}
            >
              <i className="bi bi-box me-2"></i>
              Containers
            </button>
            <button
              className={`btn text-start mb-2 ${activeTab === 'images' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setActiveTab('images')}
            >
              <i className="bi bi-layers me-2"></i>
              Images
            </button>
            <button
              className={`btn text-start mb-2 ${activeTab === 'volumes' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setActiveTab('volumes')}
            >
              <i className="bi bi-hdd me-2"></i>
              Volumes
            </button>
            <hr />
            <div className="mb-2">도구</div>
            <button 
              className="btn btn-light text-start mb-2"
              onClick={() => setShowCommandList(!showCommandList)}
            >
              <i className="bi bi-search me-2"></i>
              명령어 찾기
            </button>
            
            <button 
              className="btn btn-light text-start mb-2"
              onClick={() => setShowSaveModal(true)}
            >
              <i className="bi bi-save me-2"></i>
              저장
            </button>
            <button 
              className="btn btn-light text-start mb-2"
              onClick={() => setShowTempSaveModal(true)}
            >
              <i className="bi bi-save2 me-2"></i>
              임시 저장
            </button>
            <button 
              className="btn btn-light text-start"
              onClick={() => setActiveTab('saved')}
            >
              <i className="bi bi-list-ul me-2"></i>
              목록
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="col p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <h2>
              {activeTab === 'saved' 
                ? '저장된 작업 공간' 
                : selectedLevel 
                  ? `Level ${selectedLevel} - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
                  : '학습 시작하기'}
            </h2>
          </div>

          {activeTab !== 'saved' ? (
            <>
              {/* Docker 시각화 */}
              <div className="mb-4">
                <DockerVisualization 
                  containers={containers}
                  onContainerClick={handleContainerClick}
                />
              </div>

              {/* 콘솔 및 명령어 입력 */}
              <div className="row">
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body bg-dark text-light">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title mb-0 text-light">Console</h6>
                        <button 
                          className="btn btn-sm btn-outline-light"
                          onClick={handleReset}
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

                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleCommand}>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-lg font-monospace"
                            placeholder={selectedLevel ? "docker command..." : "레벨을 선택해주세요"}
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            disabled={!selectedLevel}
                          />
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={!selectedLevel}
                          >
                            <i className="bi bi-arrow-return-right"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="list-group">
                  {savedWorkspaces.map((workspace, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    >
                      {workspace}
                      <div>
                        <button className="btn btn-sm btn-outline-primary me-1">
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 레벨 선택 모달 */}
      {showLevelModal && (
        <LevelModal 
          isOpen={showLevelModal}
          onClose={() => setShowLevelModal(false)}
          onSelectLevel={handleLevelSelect}
        />
      )}

      {/* 저장 모달 */}
      {showSaveModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">작업 공간 저장</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowSaveModal(false)
                    setWorkspaceName('')
                  }}
                ></button>
              </div>
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
            </div>
          </div>
        </div>
      )}

      {/* 임시 저장 모달 */}
      {showTempSaveModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">임시 저장</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowTempSaveModal(false)
                    setWorkspaceName('')
                  }}
                ></button>
              </div>
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
            </div>
          </div>
        </div>
      )}

      {/* 명령어 목록 모달 */}
      {showCommandList && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Docker 명령어 목록</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCommandList(false)}
                ></button>
              </div>
              <div className="modal-body">
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
                  {/* 추가 명령어들... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 