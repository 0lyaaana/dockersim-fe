'use client'

import { useState } from 'react'
import Console from '@/components/common/Console'
import CommandInput from '@/components/common/CommandInput'
import Visualization from '@/components/common/Visualization'
import SaveControls from '@/components/common/SaveControls'
import SaveWorkspaceModal from '@/components/workspace/SaveWorkspaceModal'

export default function WorkspacePage() {
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [showSaveModal, setShowSaveModal] = useState(false)

  const handleCommandSubmit = (cmd: string) => {
    setCommand('')
    setConsoleOutput(prev => [...prev, `$ ${cmd}`, '실행 결과...'])
    // 여기에 명령어 처리 로직 추가
  }

  return (
    <div className="workspace-page">
      <h2 className="mb-4">도커 작업 공간</h2>

      <div className="row">
        <div className="col-md-6">
          <Console output={consoleOutput} />
          <CommandInput
            value={command}
            onChange={setCommand}
            onSubmit={handleCommandSubmit}
          />
        </div>
        <div className="col-md-6">
          <Visualization commands={consoleOutput} />
        </div>
      </div>

      <SaveControls
        onSave={() => setShowSaveModal(true)}
        onTempSave={() => {/* 임시 저장 로직 */}}
        onLoad={() => {/* 불러오기 로직 */}}
        onReset={() => {
          setConsoleOutput([])
          setCommand('')
        }}
      />

      {showSaveModal && (
        <SaveWorkspaceModal
          onClose={() => setShowSaveModal(false)}
          onSave={(name) => {
            // 저장 로직
            setShowSaveModal(false)
          }}
        />
      )}
    </div>
  )
} 