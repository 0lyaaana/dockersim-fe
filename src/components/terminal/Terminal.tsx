'use client';

import React, { useState, useRef } from 'react';
import styles from './Terminal.module.css';
import { parseDockerRunCommand } from '@/utils/dockerCommandParser';
import ContainerVisualizer from '../visualization/ContainerVisualizer';

interface Container {
  id: string;
  name: string;
  image: string;
  ports: string[];
  status: 'running' | 'stopped';
  createdAt: Date;
}

const Terminal: React.FC = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [containers, setContainers] = useState<Container[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // 명령어를 출력 기록에 추가
    setOutput(prev => [...prev, `$ ${trimmedCommand}`]);

    // Docker 명령어 처리
    if (trimmedCommand.startsWith('docker')) {
      const options = parseDockerRunCommand(trimmedCommand);
      
      if (options) {
        // 포트 매핑을 문자열 배열로 변환
        const portMappings = options.ports.map(port => 
          `${port.host}:${port.container}`
        );

        const container: Container = {
          id: Date.now().toString(),
          name: options.name || `container_${Date.now().toString().slice(-6)}`,
          image: options.image,
          ports: portMappings,
          status: 'running',
          createdAt: new Date()
        };

        setOutput(prev => [
          ...prev,
          `컨테이너 ${container.name}(${container.image})를 실행하는 중...`
        ]);

        // 컨테이너 목록에 추가
        setContainers(prev => [...prev, container]);

        // 실행 완료 메시지
        setTimeout(() => {
          setOutput(prev => [
            ...prev,
            `컨테이너 ${container.name}가 성공적으로 실행되었습니다.`
          ]);
        }, 1000);
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

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.splitView}>
        <div className={styles.terminalSection}>
          <div className={styles.output} ref={terminalRef}>
            {output.map((line, index) => (
              <div key={index} className={styles.commandLine}>
                {line}
              </div>
            ))}
          </div>
          <form onSubmit={handleCommandSubmit} className={styles.inputForm}>
            <span className={styles.prompt}>$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className={styles.input}
              placeholder="docker 명령어를 입력하세요..."
              spellCheck={false}
              autoFocus
            />
          </form>
        </div>
        <div className={styles.visualSection}>
          <div className={styles.containerVisualizer}>
            {containers.length === 0 ? (
              <div className={styles.emptyState}>
                <div>실행 중인 컨테이너가 없습니다</div>
                <div className={styles.hint}>docker run 명령어로 컨테이너를 실행해보세요</div>
              </div>
            ) : (
              <ContainerVisualizer containers={containers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 