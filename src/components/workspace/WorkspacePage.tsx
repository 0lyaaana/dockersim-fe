import { useState } from 'react'
import CommandDictionary from '../learn/CommandDictionary'
import ComposeEditor from './ComposeEditor'
import SaveModal from '../common/SaveModal'
import LoadModal from '../common/LoadModal'

const WorkspacePage = () => {
  const [showCommandDictionary, setShowCommandDictionary] = useState(false)
  const [showComposeEditor, setShowComposeEditor] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [isTemporarySave, setIsTemporarySave] = useState(false)

  const handleSave = (name: string) => {
    // TODO: 저장 로직 구현
    console.log('Saving workspace with name:', name)
  }

  const handleLoad = (data: any) => {
    // TODO: 불러오기 로직 구현
    console.log('Loading workspace data:', data)
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Docker 작업 공간</h2>
                <div>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowCommandDictionary(true)}
                  >
                    <i className="bi bi-book me-2"></i>
                    명령어 사전
                  </button>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowComposeEditor(true)}
                  >
                    <i className="bi bi-file-earmark-text me-2"></i>
                    Compose 파일 편집
                  </button>
                  <div className="btn-group">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsTemporarySave(false)
                        setShowSaveModal(true)
                      }}
                    >
                      <i className="bi bi-save me-2"></i>
                      저장
                    </button>
                    <button
                      className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                    ></button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setIsTemporarySave(true)
                            setShowSaveModal(true)
                          }}
                        >
                          임시 저장
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setShowLoadModal(true)}
                        >
                          불러오기
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">명령어 입력</h5>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Docker 명령어를 입력하세요..."
                />
                <button className="btn btn-primary">실행</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">실행 결과</h5>
              <div
                className="bg-dark text-light p-3 rounded"
                style={{ minHeight: '300px', fontFamily: 'monospace' }}
              >
                <div className="mb-2">$ docker ps</div>
                <div className="text-muted">실행 중인 컨테이너가 없습니다.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">컨테이너 상태</h5>
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">실행 중</h6>
                      <small className="text-muted">0개의 컨테이너</small>
                    </div>
                    <span className="badge bg-success rounded-pill">0</span>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">중지됨</h6>
                      <small className="text-muted">0개의 컨테이너</small>
                    </div>
                    <span className="badge bg-secondary rounded-pill">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCommandDictionary && (
        <CommandDictionary onClose={() => setShowCommandDictionary(false)} />
      )}

      {showComposeEditor && (
        <ComposeEditor
          onClose={() => setShowComposeEditor(false)}
          onSave={(content) => {
            console.log('Compose file content:', content)
            setShowComposeEditor(false)
          }}
        />
      )}

      {showSaveModal && (
        <SaveModal
          type="workspace"
          isTemporary={isTemporarySave}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSave}
        />
      )}

      {showLoadModal && (
        <LoadModal
          type="workspace"
          savedItems={[]} // TODO: 저장된 항목 목록 추가
          onClose={() => setShowLoadModal(false)}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}

export default WorkspacePage 