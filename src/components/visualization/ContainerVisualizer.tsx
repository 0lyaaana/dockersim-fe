import React, { useState } from 'react';
import styles from './ContainerVisualizer.module.css';
import ContainerDetailModal from './ContainerDetailModal';

interface Container {
  id: string;
  name: string;
  image: string;
  ports: string[];
  status: string;
  createdAt: Date;
}

interface ContainerVisualizerProps {
  containers: Container[];
}

const ContainerVisualizer: React.FC<ContainerVisualizerProps> = ({ containers }) => {
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const getGridClassName = () => {
    const count = containers.length;
    if (count === 1) return styles.dockerSingleContainer;
    if (count === 2) return styles.dockerTwoContainers;
    return styles.dockerContainerGrid;
  };

  return (
    <>
      <div className={getGridClassName()}>
        {containers.map(container => (
          <div
            key={container.id}
            className={styles.dockerContainerBox}
            onClick={() => setSelectedContainer(container)}
          >
            <div className={styles.dockerContainerName}>{container.name}</div>
            {container.ports.length > 0 && (
              <div className={styles.dockerPortInfo}>
                {container.ports[0]}
                {container.ports.length > 1 && (
                  <span className={styles.dockerMorePorts}>
                    +{container.ports.length - 1}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedContainer && (
        <ContainerDetailModal
          container={selectedContainer}
          onClose={() => setSelectedContainer(null)}
        />
      )}
    </>
  );
};

export default ContainerVisualizer; 