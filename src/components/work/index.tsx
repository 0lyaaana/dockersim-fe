import React, { useState, useEffect } from 'react';
import { SavedData, TempSavedData } from '../common/Sidebar';
import { saveProgress, saveTempProgress } from '../../utils/storage';
import Console from '../common/Console';
import CommandInput from '../common/CommandInput';
import Visualization from '../common/Visualization';
import CommandDictionary from '../learn/CommandDictionary';
import './Work.css';

interface ContainerInfo {
    id: string;
    name: string;
    image: string;
    status: 'running' | 'stopped';
    created: Date;
    ports?: string;
    cpu?: number;
    memory?: number;
}

interface ImageInfo {
    name: string;
    tag: string;
    size: string;
}

interface VolumeInfo {
    name: string;
    mountpoint: string;
}

const WorkPage = () => {
    const [savedData, setSavedData] = useState<SavedData[]>([]);
    const [tempSavedData, setTempSavedData] = useState<TempSavedData[]>([]);
    const [command, setCommand] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [showCommandDict, setShowCommandDict] = useState(false);
    const [showSavedListModal, setShowSavedListModal] = useState(false);
    const [isTemporary, setIsTemporary] = useState(false);
    const [containers, setContainers] = useState<ContainerInfo[]>([]);
    const [images] = useState<ImageInfo[]>([
        { name: 'nginx', tag: 'latest', size: '133MB' },
        { name: 'mysql', tag: '8', size: '546MB' }
    ]);
    const [volumes] = useState<VolumeInfo[]>([
        { name: 'mysql-data', mountpoint: '/var/lib/mysql' },
        { name: 'nginx-conf', mountpoint: '/etc/nginx' }
    ]);

    const handleCommandSubmit = (cmd: string) => {
        if (!cmd.trim()) return;
        
        // 명령어를 콘솔에 추가
        setConsoleOutput(prev => [...prev, `$ ${cmd}`]);
        
        // docker run 명령어인 경우 컨테이너 정보 추가
        if (cmd.startsWith('docker run')) {
            const containerName = cmd.split(' ').pop() || 'container';
            const newContainer: ContainerInfo = {
                id: Date.now().toString(),
                name: containerName,
                image: containerName,
                status: 'running',
                created: new Date()
            };
            setContainers(prev => [...prev, newContainer]);
            setConsoleOutput(prev => [...prev, `Container ${containerName} is running...`]);
        }
        
        setCommand('');
    };

    const handleSave = async () => {
        const data: SavedData = {
            id: Date.now().toString(),
            level: 0,
            step: 0,
            content: consoleOutput.join('\n'),
            timestamp: new Date()
        };
        await saveProgress(data);
        setSavedData(prev => [...prev, data]);
    };

    const handleTempSave = async () => {
        const baseData = {
            id: Date.now().toString(),
            level: 0,
            step: 0,
            content: consoleOutput.join('\n'),
            timestamp: new Date()
        };
        await saveTempProgress(baseData);
        const tempSaved = JSON.parse(localStorage.getItem('tempSavedProgress') || '[]');
        setTempSavedData(tempSaved);
    };

    const handleExportCompose = () => {
        // Compose 파일 생성 로직
        const composeContent = `version: '3'
services:
  ${containers.map(container => `
  ${container.name}:
    image: ${container.image}
    ports:
      - "${container.ports}"`).join('\n')}`;
        
        const blob = new Blob([composeContent], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'docker-compose.yml';
        a.click();
        URL.revokeObjectURL(url);
    };

    // 명령어 초기화 핸들러 추가
    const handleClearConsole = () => {
        setConsoleOutput([]);
        setContainers([]);
    };

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedProgress') || '[]');
        const tempSaved = JSON.parse(localStorage.getItem('tempSavedProgress') || '[]');
        setSavedData(saved);
        setTempSavedData(tempSaved);
    }, []);

    return (
        <div className="work-container p-4">
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => setShowCommandDict(true)}
                    >
                        명령어 찾기
                    </button>
                    <button 
                        className="btn btn-warning"
                        onClick={handleClearConsole}
                    >
                        초기화
                    </button>
                </div>
                <div>
                    <button 
                        className="btn btn-outline-primary me-2"
                        onClick={handleSave}
                    >
                        저장
                    </button>
                    <button 
                        className="btn btn-outline-secondary me-2"
                        onClick={handleTempSave}
                    >
                        임시 저장
                    </button>
                    <button 
                        className="btn btn-outline-info me-2"
                        onClick={() => setShowSavedListModal(true)}
                    >
                        목록
                    </button>
                    <button 
                        className="btn btn-success"
                        onClick={handleExportCompose}
                    >
                        Compose 파일 생성
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h4>컨테이너 상태</h4>
                    <div className="table-responsive mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>상태</th>
                                    <th>이름</th>
                                    <th>이미지</th>
                                    <th>포트</th>
                                    <th>CPU</th>
                                    <th>메모리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {containers.map(container => (
                                    <tr key={container.id}>
                                        <td>
                                            <span className={`status-indicator status-${container.status}`}></span>
                                            {container.status}
                                        </td>
                                        <td>{container.name}</td>
                                        <td>{container.image}</td>
                                        <td>{container.ports}</td>
                                        <td>{container.cpu?.toFixed(1) || 'N/A'}%</td>
                                        <td>{container.memory || 'N/A'}MB</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h4>이미지 및 볼륨</h4>
                    <div className="mt-3">
                        <h5 className="mb-3">이미지</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>태그</th>
                                    <th>크기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images.map((image, index) => (
                                    <tr key={index}>
                                        <td>{image.name}</td>
                                        <td>{image.tag}</td>
                                        <td>{image.size}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h5 className="mb-3 mt-4">볼륨</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>마운트 포인트</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volumes.map((volume, index) => (
                                    <tr key={index}>
                                        <td>{volume.name}</td>
                                        <td>{volume.mountpoint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <Console output={consoleOutput} className="bg-white text-dark" />
                    <CommandInput
                        value={command}
                        onChange={setCommand}
                        onSubmit={handleCommandSubmit}
                        className="bg-white text-dark"
                    />
                </div>
                <div className="col-md-6">
                    <Visualization 
                        containers={containers} 
                        commands={consoleOutput} 
                    />
                </div>
            </div>

            {showCommandDict && (
                <CommandDictionary onClose={() => setShowCommandDict(false)} />
            )}

            {showSavedListModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isTemporary ? '임시 저장 목록' : '저장 목록'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowSavedListModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setIsTemporary(!isTemporary)}
                                    >
                                        {isTemporary ? '저장 목록 보기' : '임시저장 목록 보기'}
                                    </button>
                                </div>
                                {(isTemporary ? tempSavedData : savedData).map(data => (
                                    <div key={data.id} className="saved-item mb-2 p-2 border rounded">
                                        <div>{data.title || new Date(data.timestamp).toLocaleString()}</div>
                                        <button 
                                            className="btn btn-sm btn-primary mt-1"
                                            onClick={() => {
                                                setConsoleOutput(data.content.split('\n'));
                                                setShowSavedListModal(false);
                                            }}
                                        >
                                            불러오기
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkPage; 