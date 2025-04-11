import React, { useState } from 'react'

interface CommandDictionaryProps {
  onClose: () => void
}

interface Command {
  command: string
  description: string
  example: string
}

interface Category {
  name: string
  description: string
  commands: Command[]
}

const DOCKER_COMMANDS: Category[] = [
  {
    name: '컨테이너 관리',
    description: '컨테이너 생성, 실행, 중지 등을 관리하는 명령어',
    commands: [
      {
        command: 'docker run',
        description: '새 컨테이너를 생성하고 실행합니다.',
        example: 'docker run nginx'
      },
      {
        command: 'docker ps',
        description: '실행 중인 컨테이너 목록을 표시합니다.',
        example: 'docker ps'
      },
      {
        command: 'docker stop',
        description: '실행 중인 컨테이너를 중지합니다.',
        example: 'docker stop container_id'
      },
      {
        command: 'docker rm',
        description: '컨테이너를 삭제합니다.',
        example: 'docker rm container_id'
      }
    ]
  },
  {
    name: '이미지 관리',
    description: '도커 이미지 관련 명령어',
    commands: [
      {
        command: 'docker images',
        description: '로컬에 저장된 이미지 목록을 표시합니다.',
        example: 'docker images'
      },
      {
        command: 'docker build',
        description: 'Dockerfile로부터 이미지를 빌드합니다.',
        example: 'docker build -t myapp .'
      },
      {
        command: 'docker pull',
        description: '레지스트리에서 이미지를 다운로드합니다.',
        example: 'docker pull ubuntu:latest'
      }
    ]
  },
  {
    name: '네트워크',
    description: '도커 네트워크 관련 명령어',
    commands: [
      {
        command: 'docker network create',
        description: '새로운 도커 네트워크를 생성합니다.',
        example: 'docker network create mynetwork'
      },
      {
        command: 'docker network ls',
        description: '도커 네트워크 목록을 표시합니다.',
        example: 'docker network ls'
      }
    ]
  },
  {
    name: '볼륨',
    description: '데이터 저장 및 공유를 위한 볼륨 관련 명령어',
    commands: [
      {
        command: 'docker volume create',
        description: '새로운 볼륨을 생성합니다.',
        example: 'docker volume create myvolume'
      },
      {
        command: 'docker volume ls',
        description: '볼륨 목록을 표시합니다.',
        example: 'docker volume ls'
      }
    ]
  }
]

const CommandDictionary: React.FC<CommandDictionaryProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
  }

  const handleBack = () => {
    setSelectedCategory(null)
    setSearchTerm('')
  }

  const filteredCommands = selectedCategory?.commands.filter(cmd =>
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedCategory ? selectedCategory.name : '도커 명령어 사전'}
            </h5>
            <div className="ms-auto">
              {selectedCategory && (
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={handleBack}
                >
                  뒤로가기
                </button>
              )}
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
          </div>
          <div className="modal-body">
            {selectedCategory ? (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-white"
                    placeholder="명령어 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>명령어</th>
                        <th>설명</th>
                        <th>예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommands?.map((cmd, index) => (
                        <tr key={index}>
                          <td><code>{cmd.command}</code></td>
                          <td>{cmd.description}</td>
                          <td><code>{cmd.example}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="row g-4">
                {DOCKER_COMMANDS.map((category, index) => (
                  <div key={index} className="col-md-6">
                    <div
                      className="card h-100 cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                        <p className="card-text">{category.description}</p>
                        <small className="text-muted">
                          {category.commands.length}개의 명령어
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandDictionary 