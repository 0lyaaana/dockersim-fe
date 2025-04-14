'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import LevelModal from '@/components/learn/LevelModal'
import DockerVisualization from '@/components/learn/DockerVisualization'
import DockerFlowVisualization from '@/components/learn/DockerFlowVisualization'
import CommandInput from '@/components/learn/CommandInput'
import Modal from '@/components/common/Modal'

interface ContainerData {
  id: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'paused'
  ports: string[]
  volumes: string[]
  networks: string[]
}

export default function LearnPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [containers, setContainers] = useState<ContainerData[]>([])
  const [selectedContainer, setSelectedContainer] = useState<ContainerData | null>(null)
  const [command, setCommand] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [showCommandList, setShowCommandList] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTempSaveModal, setShowTempSaveModal] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [savedWorkspaces, setSavedWorkspaces] = useState<string[]>([])
  const [showWorkspaceList, setShowWorkspaceList] = useState(false)

  useEffect(() => {
    const level = searchParams.get('level')
    const step = searchParams.get('step')

    if (!level || !step) {
      setShowLevelModal(true)
    } else {
      setSelectedLevel(parseInt(level))
      setSelectedStep(parseInt(step))
    }
  }, [searchParams])

  const handleLevelSelect = (level: number, step: number) => {
    setSelectedLevel(level)
    setSelectedStep(step)
    setShowLevelModal(false)
    router.push(`/learn?level=${level}&step=${step}`)
  }

  const handleCommand = (command: string) => {
    if (command.startsWith('docker run')) {
      // 명령어에서 컨테이너 정보 파싱
      const parts = command.split(' ')
      const name = parts.includes('--name') ? 
        parts[parts.indexOf('--name') + 1] : 
        `container_${Math.random().toString(36).substr(2, 9)}`
      
      const ports: string[] = []
      const volumes: string[] = []
      const networks: string[] = []
      
      // 포트 매핑 파싱
      const portIndex = parts.indexOf('-p')
      if (portIndex !== -1) {
        ports.push(parts[portIndex + 1])
      }

      // 볼륨 매핑 파싱
      const volumeIndex = parts.indexOf('-v')
      if (volumeIndex !== -1) {
        volumes.push(parts[volumeIndex + 1])
      }

      // 네트워크 파싱
      const networkIndex = parts.indexOf('--network')
      if (networkIndex !== -1) {
        networks.push(parts[networkIndex + 1])
      }

      // 이미지는 마지막 인자
      const image = parts[parts.length - 1]

      const newContainer: ContainerData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        image,
        status: 'running',
        ports,
        volumes,
        networks
      }

      setContainers(prev => [...prev, newContainer])
      setSelectedContainer(newContainer)
    }
  }

  // 레벨이나 스텝이 선택되지 않은 경우 레벨 선택 모달 표시
  if (!selectedLevel || !selectedStep) {
    return (
      <div className="container py-4">
        <LevelModal 
          show={showLevelModal}
          onClose={() => setShowLevelModal(false)}
          onSelect={handleLevelSelect}
        />
      </div>
    )
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Docker 학습하기</h2>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowLevelModal(true)}
            >
              레벨 변경
            </button>
          </div>
        </div>
        
        {/* Docker 리소스 대시보드 */}
        <div className="col-12 mb-4">
          <DockerVisualization 
            containers={containers}
            images={[]}
            volumes={[]}
            onContainerClick={(id) => {
              const container = containers.find(c => c.id === id)
              if (container) {
                setSelectedContainer(container)
              }
            }}
          />
        </div>

        <div className="col-md-6">
          {/* 명령어 입력 및 실행 결과 */}
          <div className="card">
            <div className="card-body">
              <CommandInput 
                level={selectedLevel}
                step={selectedStep}
                onCommand={handleCommand}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* Docker 실행 과정 시각화 */}
          <DockerFlowVisualization 
            containers={containers}
            selectedContainer={selectedContainer}
          />
        </div>
      </div>

      {/* 레벨 선택 모달 */}
      <LevelModal 
        show={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        onSelect={handleLevelSelect}
      />
    </div>
  )
} 