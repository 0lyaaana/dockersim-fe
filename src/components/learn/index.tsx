import React, { useState, useEffect } from 'react';
import { SavedData, TempSavedData } from '../common/Sidebar';
import { saveProgress, saveTempProgress } from '../../utils/storage';
import Console from '../common/Console';
import CommandInput from '../common/CommandInput';
import Visualization from '../common/Visualization';
import CommandDictionary from './CommandDictionary';
import LevelModal from './LevelModal';
import SavedListModal from './SavedListModal';
import './Learn.css';

interface ContainerInfo {
    id: string;
    name: string;
    image: string;
    status: 'running' | 'stopped';
    created: Date;
}

const LearnPage = () => {
    const [savedData, setSavedData] = useState<SavedData[]>([]);
    const [tempSavedData, setTempSavedData] = useState<TempSavedData[]>([]);
    const [command, setCommand] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [showCharts, setShowCharts] = useState(true);
    const [showLevelModal, setShowLevelModal] = useState(true);
    const [showCommandDict, setShowCommandDict] = useState(false);
    const [currentLevel, setCurrentLevel] = useState<number | null>(null);
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [containers, setContainers] = useState<ContainerInfo[]>([]);
    const [showSavedListModal, setShowSavedListModal] = useState(false);
    const [isTemporary, setIsTemporary] = useState(false);

    const handleLevelSelect = (level: number, step: number) => {
        setCurrentLevel(level);
        setCurrentStep(step);
        setShowLevelModal(false);
        localStorage.setItem('selectedLevel', JSON.stringify({ level, step }));
    };

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
        if (currentLevel && currentStep) {
            const data: SavedData = {
                id: Date.now().toString(),
                level: currentLevel,
                step: currentStep,
                content: consoleOutput.join('\n'),
                timestamp: new Date()
            };
            await saveProgress(data);
            setSavedData(prev => [...prev, data]);
        }
    };

    const handleTempSave = async () => {
        if (currentLevel && currentStep) {
            const baseData = {
                id: Date.now().toString(),
                level: currentLevel,
                step: currentStep,
                content: consoleOutput.join('\n'),
                timestamp: new Date()
            };
            await saveTempProgress(baseData);
            const tempSaved = JSON.parse(localStorage.getItem('tempSavedProgress') || '[]');
            setTempSavedData(tempSaved);
        }
    };

    useEffect(() => {
        // 저장된 레벨 정보 불러오기
        const savedLevel = localStorage.getItem('selectedLevel');
        if (savedLevel) {
            const { level, step } = JSON.parse(savedLevel);
            setCurrentLevel(level);
            setCurrentStep(step);
            setShowLevelModal(false);
        }

        // 저장된 데이터 불러오기
        const saved = JSON.parse(localStorage.getItem('savedProgress') || '[]');
        const tempSaved = JSON.parse(localStorage.getItem('tempSavedProgress') || '[]');
        setSavedData(saved);
        setTempSavedData(tempSaved);
    }, []);

    // 명령어 초기화 핸들러 추가
    const handleClearConsole = () => {
        setConsoleOutput([]);
        setContainers([]);
    };

    return (
        <div className="learn-container p-4">
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setShowLevelModal(true)}
                    >
                        레벨 선택
                    </button>
                    <button
                        className="btn btn-secondary me-2"
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
                        className="btn btn-outline-info"
                        onClick={() => setShowSavedListModal(true)}
                    >
                        목록
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="dashboard-card">
                    <h4>이미지 및 볼륨</h4>
                    <div className="mt-3">
                        {/* 이미지와 볼륨 정보를 표시할 컴포넌트 */}
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 mb-3">
                        <Console output={consoleOutput} className="bg-white text-dark" />
                    </div>
                    <div className="bg-white rounded p-3">
                        <CommandInput
                            value={command}
                            onChange={setCommand}
                            onSubmit={handleCommandSubmit}
                            disabled={!currentLevel}
                            className="bg-white text-dark"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="visualization-container bg-white rounded p-3">
                        <h4 className="mb-3">도커 시각화</h4>
                        <Visualization 
                            containers={containers}
                            commands={consoleOutput}
                        />
                    </div>
                </div>
            </div>

            {showLevelModal && (
                <LevelModal
                    onClose={() => setShowLevelModal(false)}
                    onSelectLevel={handleLevelSelect}
                />
            )}

            {showCommandDict && (
                <CommandDictionary onClose={() => setShowCommandDict(false)} />
            )}

            {showSavedListModal && (
                <SavedListModal
                    savedData={isTemporary ? tempSavedData : savedData}
                    onClose={() => setShowSavedListModal(false)}
                    onToggleType={() => setIsTemporary(!isTemporary)}
                    isTemporary={isTemporary}
                />
            )}
        </div>
    );
};

export default LearnPage; 