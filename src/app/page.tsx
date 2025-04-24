'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Terminal from '@/components/terminal/Terminal';
import LevelSelectModal from '@/components/learn/LevelSelectModal';
import ContainerListModal from '@/components/learn/ContainerListModal';
import CommandDictionaryModal from '@/components/learn/CommandDictionaryModal';
import styles from './page.module.css';

export default function Home() {
  const [isLevelModalOpen, setIsLevelModalOpen] = React.useState(false);
  const [isContainerListModalOpen, setIsContainerListModalOpen] = React.useState(false);
  const [isCommandDictModalOpen, setIsCommandDictModalOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.actionButton}
            onClick={() => setIsLevelModalOpen(true)}
          >
            레벨 선택
          </button>
          <button 
            className={styles.actionButton}
            onClick={() => setIsContainerListModalOpen(true)}
          >
            컨테이너 리스트
          </button>
          <button 
            className={styles.actionButton}
            onClick={() => setIsCommandDictModalOpen(true)}
          >
            명령어 사전
          </button>
        </div>
        <Terminal />
      </main>

      <LevelSelectModal 
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
      />
      <ContainerListModal 
        isOpen={isContainerListModalOpen}
        onClose={() => setIsContainerListModalOpen(false)}
      />
      <CommandDictionaryModal 
        isOpen={isCommandDictModalOpen}
        onClose={() => setIsCommandDictModalOpen(false)}
      />
    </div>
  );
}
