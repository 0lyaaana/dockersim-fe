interface SavedWorkspaceListProps {
  onClose: () => void
  onSelect: (workspace: string) => void
}

const MOCK_WORKSPACES = [
  {
    id: 1,
    name: 'Nginx 로드밸런서 설정',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    name: 'MongoDB 클러스터',
    createdAt: '2024-03-14',
  },
]

const SavedWorkspaceList = ({ onClose, onSelect }: SavedWorkspaceListProps) => {
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">저장된 작업 공간</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="list-group">
              {MOCK_WORKSPACES.map(workspace => (
                <button
                  key={workspace.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => onSelect(workspace.name)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">{workspace.name}</h6>
                    <small className="text-muted">{workspace.createdAt}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedWorkspaceList 