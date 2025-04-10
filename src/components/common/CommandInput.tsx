interface CommandInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (command: string) => void
  disabled?: boolean
}

const CommandInput = ({ value, onChange, onSubmit, disabled }: CommandInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="command-input">
      <div className="input-group">
        <span className="input-group-text">$</span>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="도커 명령어를 입력하세요..."
          disabled={disabled}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={disabled || !value.trim()}
        >
          실행
        </button>
      </div>
    </form>
  )
}

export default CommandInput 