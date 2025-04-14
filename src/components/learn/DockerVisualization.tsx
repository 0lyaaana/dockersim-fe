'use client'

import React from 'react'

interface ContainerData {
  id: string
  name: string
  status: 'running' | 'stopped' | 'paused'
  image: string
  ports: string[]
}

interface DockerVisualizationProps {
  containers?: ContainerData[]
  onContainerClick?: (containerId: string) => void
}

export default function DockerVisualization({ 
  containers = [], 
  onContainerClick 
}: DockerVisualizationProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Docker 시각화</h5>
        <div 
          className="visualization-container" 
          style={{ 
            height: '300px', 
            position: 'relative',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            padding: '1rem'
          }}
        >
          {containers.length > 0 ? (
            <div className="container-grid">
              {containers.map((container) => (
                <div
                  key={container.id}
                  className={`container-box status-${container.status}`}
                  onClick={() => onContainerClick?.(container.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.5rem',
                    margin: '0.25rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <div className="container-name">{container.name}</div>
                  <div className="container-status">
                    <span className={`badge bg-${container.status === 'running' ? 'success' : 'secondary'}`}>
                      {container.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="text-center text-muted" 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <i className="bi bi-boxes fs-1"></i>
              <p className="mt-2">Docker 컨테이너 시각화가 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 