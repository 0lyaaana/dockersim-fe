'use client'

import { useState } from 'react'
import LearnPage from '@/components/learn'
import LevelModal from '@/components/learn/LevelModal'
import Console from '@/components/common/Console'
import CommandInput from '@/components/common/CommandInput'
import Visualization from '@/components/common/Visualization'
import CommandDictionary from '@/components/learn/CommandDictionary'
import SaveControls from '@/components/common/SaveControls'

export default function Learn() {
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
    <>
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
      <LearnPage />
    </>
  )
} 