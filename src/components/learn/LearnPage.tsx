import React, { useState } from 'react'
import { Level, LEVELS } from '../../constants/levels'
import LevelSelectModal from './LevelSelectModal'
import CommandDictionary from './CommandDictionary'
import Console from '../common/Console'

const LearnPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [showCommandDictionary, setShowCommandDictionary] = useState(false)
  const [showLevelSelect, setShowLevelSelect] = useState(true)

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level)
    setShowLevelSelect(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim() && selectedLevel) {
      handleExecute()
    }
  }

  const handleExecute = () => {
    if (!command.trim() || !selectedLevel) return

    // 명령어 실행 로직
    setOutput(prev => [...prev, `$ ${command}`, '실행 결과...'])
    setCommand('')
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">도커 학습</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowLevelSelect(true)}
              >
                레벨 선택
              </button>
            </div>
          </div>

          {/* 명령어 입력 및 실행 영역 */}
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="도커 명령어를 입력하세요..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!selectedLevel}
              />
              <button
                className="btn btn-primary"
                onClick={handleExecute}
                disabled={!selectedLevel || !command.trim()}
              >
                실행
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowCommandDictionary(true)}
              >
                명령어 사전
              </button>
            </div>
          </div>

          {/* 콘솔 출력 */}
          <Console output={output} />
        </div>
      </div>

      {/* 레벨 선택 모달 */}
      {showLevelSelect && (
        <LevelSelectModal
          onClose={() => setShowLevelSelect(false)}
          onSelect={handleLevelSelect}
        />
      )}

      {/* 명령어 사전 모달 */}
      {showCommandDictionary && (
        <CommandDictionary onClose={() => setShowCommandDictionary(false)} />
      )}
    </div>
  )
}

export default LearnPage 