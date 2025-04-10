import { useState } from 'react'
import MonacoEditor from '@monaco-editor/react'

interface ComposeEditorProps {
  onClose: () => void
  onSave: (content: string) => void
  initialContent?: string
}

const DEFAULT_COMPOSE = `version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - webnet

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - webnet

networks:
  webnet:

volumes:
  db_data:`

const ComposeEditor = ({ onClose, onSave, initialContent }: ComposeEditorProps) => {
  const [content, setContent] = useState(initialContent || DEFAULT_COMPOSE)
  const [fileName, setFileName] = useState('docker-compose.yml')

  const handleSave = () => {
    onSave(content)
    onClose()
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center">
              <h5 className="modal-title me-3">Docker Compose 편집기</h5>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: '200px' }}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="파일 이름"
              />
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-0" style={{ height: '70vh' }}>
            <MonacoEditor
              height="100%"
              language="yaml"
              theme="vs-dark"
              value={content}
              onChange={(value: string | undefined) => setContent(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [],
                wordWrap: 'on',
                wrappingIndent: 'indent',
                automaticLayout: true,
              }}
            />
          </div>
          <div className="modal-footer">
            <div className="d-flex justify-content-between w-100">
              <div>
                <button type="button" className="btn btn-outline-secondary me-2">
                  템플릿 불러오기
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  문법 검사
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComposeEditor 