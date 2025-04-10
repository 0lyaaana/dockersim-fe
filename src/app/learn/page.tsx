'use client'

import { useState } from 'react'
import LevelModal from '@/components/learn/LevelModal'
import Console from '@/components/common/Console'
import CommandInput from '@/components/common/CommandInput'
import Visualization from '@/components/common/Visualization'
import CommandDictionary from '@/components/learn/CommandDictionary'
import SaveControls from '@/components/common/SaveControls'

export default function LearnPage() {
  const [showLevelModal, setShowLevelModal] = useState(true)
  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [showCommandDict, setShowCommandDict] = useState(false)
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  const handleCommandSubmit = (cmd: string) => {
    setCommand('')
    setConsoleOutput(prev => [...prev, `$ ${cmd}`, '실행 결과...'])
    // 여기에 명령어 처리 로직 추가
  }

  return (
    <div className="learn-page">
      {showLevelModal && !currentLevel && (
        <LevelModal
          onClose={() => setShowLevelModal(false)}
          onSelectLevel={(level, step) => {
            setCurrentLevel(level)
            setCurrentStep(step)
            setShowLevelModal(false)
          }}
        />
      )}

      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowLevelModal(true)}
        >
          레벨 선택
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowCommandDict(true)}
        >
          명령어 찾기
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Console output={consoleOutput} />
          <CommandInput
            value={command}
            onChange={setCommand}
            onSubmit={handleCommandSubmit}
            disabled={!currentLevel && !showLevelModal}
          />
        </div>
        <div className="col-md-6">
          <Visualization commands={consoleOutput} />
        </div>
      </div>

      <SaveControls
        onSave={() => {/* 저장 로직 */}}
        onTempSave={() => {/* 임시 저장 로직 */}}
        onLoad={() => {/* 불러오기 로직 */}}
        onReset={() => {
          setConsoleOutput([])
          setCommand('')
        }}
      />

      {showCommandDict && (
        <CommandDictionary onClose={() => setShowCommandDict(false)} />
      )}
    </div>
  )
} 