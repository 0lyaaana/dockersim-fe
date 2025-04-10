import { useState } from 'react'

interface CommandDictionaryProps {
  onClose: () => void
}

const COMMAND_CATEGORIES = [
  {
    id: 'basic',
    title: '기본 명령어',
    description: '도커의 기본적인 명령어들을 확인할 수 있습니다.',
    commands: [
      {
        command: 'docker run',
        description: '새 컨테이너 생성 및 실행',
        purpose: '이미지로부터 새로운 컨테이너를 생성하고 실행합니다.',
        examples: [
          {
            code: 'docker run nginx',
            description: 'Nginx 웹 서버 컨테이너를 실행합니다.'
          },
          {
            code: 'docker run -d -p 80:80 nginx',
            description: 'Nginx를 백그라운드에서 실행하고 80번 포트를 연결합니다.'
          },
        ],
        options: [
          { flag: '-d', description: '백그라운드에서 실행' },
          { flag: '-p', description: '포트 포워딩 설정' },
          { flag: '-v', description: '볼륨 마운트' },
        ]
      },
      {
        command: 'docker ps',
        description: '실행 중인 컨테이너 목록',
        purpose: '현재 실행 중인 컨테이너들의 상태를 확인합니다.',
        examples: [
          {
            code: 'docker ps',
            description: '실행 중인 컨테이너 목록을 표시합니다.'
          },
          {
            code: 'docker ps -a',
            description: '모든 컨테이너(중지된 것 포함)를 표시합니다.'
          },
        ],
        options: [
          { flag: '-a', description: '모든 컨테이너 표시' },
          { flag: '-q', description: '컨테이너 ID만 표시' },
        ]
      },
    ],
  },
  {
    id: 'image',
    title: '이미지 관리',
    description: '도커 이미지를 관리하는 명령어들을 확인할 수 있습니다.',
    commands: [
      {
        command: 'docker pull',
        description: '이미지 다운로드',
        purpose: 'Docker Hub나 다른 레지스트리에서 이미지를 다운로드합니다.',
        examples: [
          {
            code: 'docker pull ubuntu',
            description: '최신 Ubuntu 이미지를 다운로드합니다.'
          },
          {
            code: 'docker pull nginx:latest',
            description: '최신 Nginx 이미지를 다운로드합니다.'
          },
        ],
        options: [
          { flag: '-a', description: '모든 태그 다운로드' },
        ]
      },
      {
        command: 'docker build',
        description: 'Dockerfile로 이미지 빌드',
        purpose: 'Dockerfile을 사용하여 커스텀 이미지를 생성합니다.',
        examples: [
          {
            code: 'docker build -t myapp .',
            description: '현재 디렉토리의 Dockerfile로 myapp 이미지를 빌드합니다.'
          },
          {
            code: 'docker build -f Dockerfile.dev .',
            description: '개발용 Dockerfile로 이미지를 빌드합니다.'
          },
        ],
        options: [
          { flag: '-t', description: '이미지 태그 지정' },
          { flag: '-f', description: 'Dockerfile 경로 지정' },
        ]
      },
    ],
  },
]

const CommandDictionary = ({ onClose }: CommandDictionaryProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('basic')
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null)

  const filteredCommands = COMMAND_CATEGORIES.find(
    cat => cat.id === selectedCategory
  )?.commands.filter(cmd =>
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">도커 명령어 사전</h5>
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
                placeholder="명령어나 목적으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="row">
              <div className="col-md-3">
                <div className="list-group mb-3">
                  {COMMAND_CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      className={`list-group-item list-group-item-action ${
                        selectedCategory === category.id ? 'active' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedCommand(null)
                      }}
                    >
                      <h6 className="mb-1">{category.title}</h6>
                      <small className="text-muted">{category.description}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-9">
                <div className="list-group">
                  {filteredCommands?.map((cmd) => (
                    <div key={cmd.command} className="list-group-item">
                      <div 
                        className="d-flex justify-content-between align-items-start cursor-pointer"
                        onClick={() => setSelectedCommand(cmd.command === selectedCommand ? null : cmd.command)}
                      >
                        <div>
                          <h6 className="mb-1">{cmd.command}</h6>
                          <p className="mb-1">{cmd.description}</p>
                          <small className="text-muted">{cmd.purpose}</small>
                        </div>
                        <span className="ms-2">
                          <i className={`bi bi-chevron-${cmd.command === selectedCommand ? 'up' : 'down'}`}></i>
                        </span>
                      </div>
                      
                      {cmd.command === selectedCommand && (
                        <div className="mt-3">
                          <div className="mb-3">
                            <h6 className="mb-2">주요 옵션</h6>
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th>옵션</th>
                                  <th>설명</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cmd.options.map((opt, index) => (
                                  <tr key={index}>
                                    <td><code>{opt.flag}</code></td>
                                    <td>{opt.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          <div>
                            <h6 className="mb-2">사용 예시</h6>
                            {cmd.examples.map((ex, index) => (
                              <div key={index} className="mb-2">
                                <code className="d-block p-2 bg-light">{ex.code}</code>
                                <small className="text-muted">{ex.description}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandDictionary 