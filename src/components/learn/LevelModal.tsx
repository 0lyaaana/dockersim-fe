import { useState } from 'react'

interface Step {
  id: number
  title: string
  description: string
  instructions: string[]
  commands: {
    command: string
    explanation: string
  }[]
}

interface Level {
  id: number
  title: string
  description: string
  steps: Step[]
}

const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Docker 기초',
    description: 'Docker의 기본 개념과 명령어를 학습합니다.',
    steps: [
      {
        id: 1,
        title: 'Docker 설치하기',
        description: 'Docker Desktop을 설치하고 기본 설정을 진행합니다.',
        instructions: [
          'Docker Desktop 설치 파일을 다운로드합니다.',
          '설치 프로그램을 실행하고 지시에 따라 설치를 완료합니다.',
          'WSL 2 설치가 필요한 경우 안내에 따라 설치합니다.',
          'Docker Desktop을 실행하고 정상 작동을 확인합니다.'
        ],
        commands: [
          {
            command: 'docker --version',
            explanation: 'Docker 버전을 확인합니다.'
          },
          {
            command: 'docker info',
            explanation: 'Docker 시스템 정보를 확인합니다.'
          }
        ]
      },
      {
        id: 2,
        title: '첫 번째 컨테이너 실행하기',
        description: 'Docker Hub에서 이미지를 받아 첫 컨테이너를 실행해봅니다.',
        instructions: [
          'Docker Hub에서 Nginx 이미지를 다운로드합니다.',
          '다운로드한 이미지로 컨테이너를 실행합니다.',
          '웹 브라우저에서 실행된 Nginx 서버에 접속해봅니다.'
        ],
        commands: [
          {
            command: 'docker pull nginx',
            explanation: 'Nginx 이미지를 다운로드합니다.'
          },
          {
            command: 'docker run -d -p 80:80 nginx',
            explanation: 'Nginx 컨테이너를 백그라운드에서 실행하고 80번 포트를 연결합니다.'
          },
          {
            command: 'docker ps',
            explanation: '실행 중인 컨테이너 목록을 확인합니다.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Docker 이미지와 컨테이너',
    description: 'Docker 이미지 생성과 컨테이너 관리를 학습합니다.',
    steps: [
      {
        id: 1,
        title: 'Dockerfile 작성하기',
        description: '나만의 Docker 이미지를 만들기 위한 Dockerfile을 작성합니다.',
        instructions: [
          '작업 디렉토리를 생성하고 이동합니다.',
          'Dockerfile을 생성하고 기본 구조를 작성합니다.',
          '애플리케이션 코드와 필요한 파일들을 준비합니다.'
        ],
        commands: [
          {
            command: 'mkdir myapp && cd myapp',
            explanation: '프로젝트 디렉토리를 만들고 이동합니다.'
          },
          {
            command: 'touch Dockerfile',
            explanation: 'Dockerfile을 생성합니다.'
          }
        ]
      },
      {
        id: 2,
        title: '이미지 빌드하고 실행하기',
        description: 'Dockerfile로 이미지를 빌드하고 컨테이너를 실행합니다.',
        instructions: [
          'Docker 이미지를 빌드합니다.',
          '빌드된 이미지로 컨테이너를 실행합니다.',
          '컨테이너 로그를 확인하고 동작을 테스트합니다.'
        ],
        commands: [
          {
            command: 'docker build -t myapp .',
            explanation: '현재 디렉토리의 Dockerfile로 myapp 이미지를 빌드합니다.'
          },
          {
            command: 'docker run -d -p 3000:3000 myapp',
            explanation: 'myapp 이미지로 컨테이너를 실행하고 3000번 포트를 연결합니다.'
          }
        ]
      }
    ]
  }
]

interface LevelModalProps {
  onClose: () => void
  onSelectLevel: (level: number, step: number) => void
}

const LevelModal = ({ onClose, onSelectLevel }: LevelModalProps) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [selectedStep, setSelectedStep] = useState<Step | null>(null)

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Docker 학습 레벨</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 border-end">
                <div className="list-group">
                  {LEVELS.map(level => (
                    <button
                      key={level.id}
                      className={`list-group-item list-group-item-action ${
                        selectedLevel?.id === level.id ? 'active' : ''
                      }`}
                      onClick={() => {
                        setSelectedLevel(level)
                        setSelectedStep(null)
                      }}
                    >
                      <h6 className="mb-1">Level {level.id}: {level.title}</h6>
                      <small className="text-muted">{level.description}</small>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="col-md-8">
                {selectedLevel ? (
                  <div>
                    <h4 className="mb-3">Level {selectedLevel.id}: {selectedLevel.title}</h4>
                    <p className="text-muted mb-4">{selectedLevel.description}</p>
                    
                    <div className="list-group mb-4">
                      {selectedLevel.steps.map(step => (
                        <button
                          key={step.id}
                          className={`list-group-item list-group-item-action ${
                            selectedStep?.id === step.id ? 'active' : ''
                          }`}
                          onClick={() => setSelectedStep(step)}
                        >
                          <h6 className="mb-1">Step {step.id}: {step.title}</h6>
                          <small className="text-muted">{step.description}</small>
                        </button>
                      ))}
                    </div>

                    {selectedStep && (
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-3">
                            Step {selectedStep.id}: {selectedStep.title}
                          </h5>
                          <p className="text-muted mb-4">{selectedStep.description}</p>

                          <h6 className="mb-3">학습 순서</h6>
                          <ol className="mb-4">
                            {selectedStep.instructions.map((instruction, index) => (
                              <li key={index} className="mb-2">{instruction}</li>
                            ))}
                          </ol>

                          <h6 className="mb-3">실습 명령어</h6>
                          <div className="list-group">
                            {selectedStep.commands.map((cmd, index) => (
                              <div key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <code className="bg-light px-2 py-1 rounded">
                                    {cmd.command}
                                  </code>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                      navigator.clipboard.writeText(cmd.command)
                                    }}
                                  >
                                    복사
                                  </button>
                                </div>
                                <small className="text-muted">{cmd.explanation}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted">
                    <p>학습할 레벨을 선택해주세요.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelModal 