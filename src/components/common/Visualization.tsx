interface VisualizationProps {
  commands: string[]
}

const Visualization = ({ commands }: VisualizationProps) => {
  return (
    <div className="visualization bg-light p-3" style={{ height: '400px', overflowY: 'auto' }}>
      <div className="visualization-container">
        {/* 여기에 D3.js나 다른 시각화 라이브러리를 사용하여 도커 컨테이너와 이미지를 시각화 */}
        <div className="text-center text-muted">
          <p>도커 컨테이너 시각화</p>
          {commands.length === 0 && (
            <p>명령어를 입력하면 실행 결과가 시각화됩니다.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Visualization 