'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';
import { parseDockerRunCommand } from '@/utils/dockerCommandParser';

interface Port {
  hostPort: string;
  containerPort: string;
}

interface Container {
  id: string;
  name: string;
  image: string;
  ports: Port[];
  status: 'running' | 'stopped';
  createdAt: Date;
  volume?: {
    name: string;
    mountPath: string;
    hostPath?: string;
  };
  network?: string;
  lastCommand?: string;
}

interface Network {
  id: string;
  name: string;
  containers: Container[];
}

const Terminal: React.FC = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [showImageDetails, setShowImageDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setOutput(prev => [...prev, `$ ${command}`]);
    
    if (command.startsWith('docker network create')) {
      const networkName = command.split(' ')[3];
      if (networkName) {
        const newNetwork: Network = {
          id: Date.now().toString(),
          name: networkName,
          containers: []
        };
        setNetworks(prev => [...prev, newNetwork]);
        setActiveNetwork(newNetwork.id);
        setOutput(prev => [...prev, `네트워크 '${networkName}'가 생성되었습니다.`]);
      }
    }

    setCommand('');
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // 명령어를 출력 기록에 추가
    setOutput(prev => [...prev, `$ ${trimmedCommand}`]);

    // Docker 명령어 처리
    if (trimmedCommand.startsWith('docker')) {
      // 네트워크 생성 명령어 처리
      if (trimmedCommand.startsWith('docker network create')) {
        const networkName = trimmedCommand.split(' ')[3];
        const newTab: Network = {
          id: Date.now().toString(),
          name: networkName,
          containers: []
        };
        
        setNetworks(prev => [...prev, newTab]);
        setActiveNetwork(newTab.id);
        setOutput(prev => [...prev, `네트워크 ${networkName}가 생성되었습니다.`]);
      }
      // 컨테이너 실행 명령어 처리
      else if (trimmedCommand.startsWith('docker run')) {
        const options = parseDockerRunCommand(trimmedCommand);
        
        if (options) {
          const portMappings = options.ports.map(port => 
            `${port.host}:${port.container}`
          );

          const container: Container = {
            id: Date.now().toString(),
            name: options.name || `container_${Date.now().toString().slice(-6)}`,
            image: options.image,
            ports: portMappings.map(port => ({
              hostPort: port.split(':')[0],
              containerPort: port.split(':')[1]
            })),
            status: 'running',
            createdAt: new Date(),
            network: options.networkId
          };

          setOutput(prev => [
            ...prev,
            `컨테이너 ${container.name}(${container.image})를 실행하는 중...`
          ]);

          // 컨테이너 목록에 추가
          setNetworks(prev => prev.map(network => 
            network.id === container.network ? { ...network, containers: [...network.containers, container] } : network
          ));

          // 실행 완료 메시지
          setTimeout(() => {
            setOutput(prev => [
              ...prev,
              `컨테이너 ${container.name}가 성공적으로 실행되었습니다.`
            ]);
          }, 1000);
        }
      }
    }

    // 입력 필드 초기화
    setCommand('');
    
    // 스크롤을 아래로 이동
    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight;
      }, 100);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveNetwork(tabId);
  };

  const handleTabClose = (tabId: string) => {
    setNetworks(prev => prev.filter(network => network.id !== tabId));
    if (activeNetwork === tabId) {
      setActiveNetwork(networks[0]?.id || null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 여기에 파일 업로드 로직 추가
      setOutput(prev => [...prev, `이미지 '${file.name}'를 업로드하는 중...`]);
      
      // 실제 업로드 로직을 구현하세요
      setTimeout(() => {
        setOutput(prev => [...prev, `이미지 '${file.name}'가 성공적으로 업로드되었습니다.`]);
      }, 1000);
    }
  };

  return (
    <>
      <div className={styles.terminalContainer}>
        <div className={styles.terminalSection}>
          <div className={styles.output} ref={terminalRef}>
            {output.map((line, index) => (
              <div key={index} className={styles.commandLine}>
                {line}
              </div>
            ))}
          </div>
          <form className={styles.inputForm} onSubmit={handleCommandSubmit}>
            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <input
                type="text"
                className={styles.input}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="명령어를 입력하세요..."
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </form>
        </div>

        <div className={styles.browserSection}>
          <div className={styles.chromeToolbar}>
            <div className={styles.networkTabs}>
              {networks.map(network => (
                <div
                  key={network.id}
                  className={`${styles.chromeTab} ${activeNetwork === network.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveNetwork(network.id)}
                >
                  <span className={styles.tabIcon}>⚡</span>
                  <span className={styles.tabTitle}>{network.name}</span>
                  <button
                    className={styles.tabClose}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabClose(network.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.networkContent}>
            {networks.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🌐</span>
                <p>네트워크가 없습니다. 네트워크를 생성해주세요.</p>
                <small>예: docker network create my-network</small>
              </div>
            ) : (
              networks.map(network => (
                <div
                  key={network.id}
                  className={`${styles.networkContent} ${activeNetwork === network.id ? styles.active : ''}`}
                >
                  <div className={styles.networkContainer}>
                    {network.containers.length === 0 ? (
                      <div className={styles.emptyState}>
                        <p>이 네트워크에 연결된 컨테이너가 없습니다.</p>
                        <small>컨테이너를 생성하여 네트워크에 연결해보세요.</small>
                      </div>
                    ) : (
                      <div className={styles.containersGrid}>
                        {network.containers.map(container => (
                          <div key={container.id} className={styles.containerCard}>
                            <h3>{container.name}</h3>
                            <div className={styles.portsList}>
                              {container.ports.map((port, index) => (
                                <span key={index} className={styles.port}>
                                  {port.hostPort}:{port.containerPort}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.uploadBar}>
        <div className={styles.uploadSection}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="application/x-tar,.tar"
            style={{ display: 'none' }}
          />
          <button
            className={styles.uploadButton}
            onClick={() => fileInputRef.current?.click()}
          >
            이미지 업로드
          </button>
          <button
            className={styles.viewImagesButton}
            onClick={() => setShowImageDetails(!showImageDetails)}
          >
            이미지 목록 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default Terminal; 