import React from 'react';

interface ContainerInfo {
    id: string;
    name: string;
    image: string;
    status: 'running' | 'stopped';
    created: Date;
    ports?: string;
    cpu?: number;
    memory?: number;
    networks?: string[];
    volumes?: string[];
    links?: string[];
}

interface VisualizationProps {
    containers: ContainerInfo[];
    commands: string[];
}

const Visualization: React.FC<VisualizationProps> = ({ containers, commands }) => {
    // 마지막 docker 명령어 찾기
    const lastDockerCommand = commands
        .filter(cmd => cmd.startsWith('$ docker'))
        .pop();

    // Docker 명령어 파싱
    const parseDockerCommand = (command: string) => {
        if (!command) return null;
        const parts = command.split(' ');
        
        // docker run 명령어 파싱
        if (command.includes('docker run')) {
            const runIndex = parts.indexOf('run');
            const imageIndex = runIndex + 1;
            const imageName = parts[imageIndex];
            const containerName = parts.includes('--name') ? 
                parts[parts.indexOf('--name') + 1] : 
                `${imageName}-${Date.now()}`;

            return {
                type: 'run',
                image: imageName,
                name: containerName,
                ports: parts.includes('-p') ? parts[parts.indexOf('-p') + 1] : undefined,
                volumes: parts.includes('-v') ? parts[parts.indexOf('-v') + 1] : undefined,
                networks: parts.includes('--network') ? [parts[parts.indexOf('--network') + 1]] : undefined
            };
        }
        
        // docker stop/start/restart 명령어 파싱
        if (['stop', 'start', 'restart'].some(cmd => command.includes(`docker ${cmd}`))) {
            const action = parts[1];
            const containerName = parts[2];
            return {
                type: action,
                name: containerName
            };
        }

        // docker network 명령어 파싱
        if (command.includes('docker network')) {
            const action = parts[2];
            const networkName = parts[3];
            return {
                type: 'network',
                action,
                name: networkName
            };
        }

        return null;
    };

    return (
        <div className="visualization">
            {/* 명령어 표시 */}
            {lastDockerCommand && (
                <div className="command-box text-center p-2 mb-3 border rounded">
                    <code>{lastDockerCommand.substring(2)}</code>
                </div>
            )}

            {/* 컨테이너 시각화 */}
            <div className="container-visualization">
                {containers.length > 0 ? (
                    <div className="container-network">
                        {containers.map(container => (
                            <div key={container.id} className="container-node">
                                <div className={`container-box p-3 ${
                                    container.status === 'running' ? 'border-success' : 'border-secondary'
                                }`}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0">{container.name}</h6>
                                        <span className={`badge ${
                                            container.status === 'running' ? 'bg-success' : 'bg-secondary'
                                        }`}>
                                            {container.status}
                                        </span>
                                    </div>
                                    <div className="small">
                                        <div>이미지: {container.image}</div>
                                        {container.ports && <div>포트: {container.ports}</div>}
                                        {container.cpu && <div>CPU: {container.cpu.toFixed(1)}%</div>}
                                        {container.memory && <div>메모리: {container.memory}MB</div>}
                                        {container.networks && (
                                            <div>네트워크: {container.networks.join(', ')}</div>
                                        )}
                                        {container.volumes && (
                                            <div>볼륨: {container.volumes.join(', ')}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted">
                        <p>컨테이너가 없습니다.</p>
                        <p className="small">docker run 명령어를 사용하여 컨테이너를 생성하세요.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .visualization {
                    min-height: 400px;
                }
                .command-box {
                    background-color: #f8f9fa;
                }
                .container-visualization {
                    padding: 20px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }
                .container-network {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    position: relative;
                }
                .container-node {
                    position: relative;
                }
                .container-box {
                    background-color: white;
                    border-radius: 8px;
                    border: 2px solid;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .container-box:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
};

export default Visualization; 