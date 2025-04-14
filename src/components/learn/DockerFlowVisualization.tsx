'use client'

import React from 'react'
import { FaDocker, FaNetworkWired, FaHdd } from 'react-icons/fa'
import { BsBox } from 'react-icons/bs'

interface ContainerData {
  id: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'created'
  createdAt: string
  ports: { internal: number; external: number }[]
  volumes: { source: string; target: string }[]
  networks: string[]
}

interface DockerFlowVisualizationProps {
  selectedContainer: ContainerData | null
}

export default function DockerFlowVisualization({ selectedContainer }: DockerFlowVisualizationProps) {
  if (!selectedContainer) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <p className="text-muted">컨테이너를 선택하면 자세한 정보를 확인할 수 있습니다.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-success'
      case 'stopped':
        return 'text-danger'
      default:
        return 'text-warning'
    }
  }

  return (
    <div className="container p-4">
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <FaDocker className="me-2" />
                컨테이너 정보
              </h5>
              <div className="mt-3">
                <p><strong>ID:</strong> {selectedContainer.id}</p>
                <p><strong>이름:</strong> {selectedContainer.name}</p>
                <p><strong>이미지:</strong> {selectedContainer.image}</p>
                <p>
                  <strong>상태:</strong> 
                  <span className={getStatusColor(selectedContainer.status)}>
                    {selectedContainer.status}
                  </span>
                </p>
                <p><strong>생성일:</strong> {selectedContainer.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center">
                <BsBox className="me-2" />
                포트 매핑
              </h6>
              <ul className="list-unstyled">
                {selectedContainer.ports.map((port, index) => (
                  <li key={index}>
                    {port.internal} → {port.external}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center">
                <FaHdd className="me-2" />
                볼륨 마운트
              </h6>
              <ul className="list-unstyled">
                {selectedContainer.volumes.map((volume, index) => (
                  <li key={index}>
                    {volume.source} → {volume.target}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center">
                <FaNetworkWired className="me-2" />
                네트워크
              </h6>
              <ul className="list-unstyled">
                {selectedContainer.networks.map((network, index) => (
                  <li key={index}>{network}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 