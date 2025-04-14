'use client'

import React, { useState } from 'react'

interface ContainerData {
  id: string
  name: string
  status: 'running' | 'stopped' | 'paused'
  image: string
  created: string
}

interface ImageData {
  id: string
  repository: string
  tag: string
  size: string
}

interface VolumeData {
  id: string
  name: string
  driver: string
  mountpoint: string
}

interface DockerVisualizationProps {
  containers?: ContainerData[]
  images?: ImageData[]
  volumes?: VolumeData[]
  onContainerClick?: (containerId: string) => void
  onImageClick?: (imageId: string) => void
  onVolumeClick?: (volumeId: string) => void
}

export default function DockerVisualization({ 
  containers = [], 
  images = [],
  volumes = [],
  onContainerClick,
  onImageClick,
  onVolumeClick
}: DockerVisualizationProps) {
  const [activeTab, setActiveTab] = useState<'containers' | 'images' | 'volumes'>('containers')

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Docker 시각화</h5>
          <div className="btn-group">
            <button
              className={`btn ${activeTab === 'containers' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('containers')}
            >
              <i className="bi bi-box me-1"></i>
              컨테이너
            </button>
            <button
              className={`btn ${activeTab === 'images' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('images')}
            >
              <i className="bi bi-layers me-1"></i>
              이미지
            </button>
            <button
              className={`btn ${activeTab === 'volumes' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('volumes')}
            >
              <i className="bi bi-hdd me-1"></i>
              볼륨
            </button>
          </div>
        </div>

        {activeTab === 'containers' && (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>이름</th>
                  <th>상태</th>
                  <th>이미지</th>
                  <th>생성일</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {containers.length > 0 ? (
                  containers.map((container) => (
                    <tr key={container.id} onClick={() => onContainerClick?.(container.id)} style={{ cursor: 'pointer' }}>
                      <td>{container.name}</td>
                      <td>
                        <span className={`badge bg-${
                          container.status === 'running' ? 'success' :
                          container.status === 'paused' ? 'warning' : 'secondary'
                        }`}>
                          {container.status}
                        </span>
                      </td>
                      <td>{container.image}</td>
                      <td>{container.created}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success me-1" title="시작">
                          <i className="bi bi-play-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-warning me-1" title="정지">
                          <i className="bi bi-stop-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="삭제">
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      <i className="bi bi-box fs-1 d-block mb-2"></i>
                      실행 중인 컨테이너가 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>저장소</th>
                  <th>태그</th>
                  <th>크기</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {images.length > 0 ? (
                  images.map((image) => (
                    <tr key={image.id} onClick={() => onImageClick?.(image.id)} style={{ cursor: 'pointer' }}>
                      <td>{image.repository}</td>
                      <td>{image.tag}</td>
                      <td>{image.size}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success me-1" title="실행">
                          <i className="bi bi-play-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="삭제">
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      <i className="bi bi-layers fs-1 d-block mb-2"></i>
                      다운로드된 이미지가 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'volumes' && (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>이름</th>
                  <th>드라이버</th>
                  <th>마운트 포인트</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {volumes.length > 0 ? (
                  volumes.map((volume) => (
                    <tr key={volume.id} onClick={() => onVolumeClick?.(volume.id)} style={{ cursor: 'pointer' }}>
                      <td>{volume.name}</td>
                      <td>{volume.driver}</td>
                      <td>{volume.mountpoint}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" title="검사">
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="삭제">
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      <i className="bi bi-hdd fs-1 d-block mb-2"></i>
                      생성된 볼륨이 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 