interface SaveControlsProps {
  onSave: () => void
  onTempSave: () => void
  onLoad: () => void
  onReset: () => void
}

const SaveControls = ({
  onSave,
  onTempSave,
  onLoad,
  onReset,
}: SaveControlsProps) => {
  return (
    <div className="save-controls mt-3 d-flex gap-2">
      <button className="btn btn-success" onClick={onSave}>
        저장
      </button>
      <button className="btn btn-info" onClick={onTempSave}>
        임시 저장
      </button>
      <button className="btn btn-warning" onClick={onLoad}>
        불러오기
      </button>
      <button className="btn btn-danger" onClick={onReset}>
        초기화
      </button>
    </div>
  )
}

export default SaveControls 