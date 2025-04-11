import React, { KeyboardEvent } from 'react';

interface CommandInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (command: string) => void
  disabled?: boolean
  className?: string
}

const CommandInput: React.FC<CommandInputProps> = ({ 
  value, 
  onChange, 
  onSubmit,
  disabled = false,
  className = ''
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && !disabled) {
      onSubmit(value.trim());
    }
  }

  return (
    <div className="input-group">
      <span className="input-group-text">$</span>
      <input
        type="text"
        className={`form-control ${className}`}
        placeholder="도커 명령어를 입력하세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button
        className="btn btn-primary"
        onClick={() => value.trim() && !disabled && onSubmit(value.trim())}
        disabled={!value.trim() || disabled}
      >
        실행
      </button>
    </div>
  )
}

export default CommandInput 