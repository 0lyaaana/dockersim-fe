import React from 'react'

interface ConsoleProps {
  output: string[]
  className?: string
}

const Console: React.FC<ConsoleProps> = ({ output, className = '' }) => {
  return (
    <div className={`console ${className}`} style={{ height: '400px', overflowY: 'auto' }}>
      {output.map((line, index) => (
        <div key={index} className="console-line">
          {line}
        </div>
      ))}
    </div>
  )
}

export default Console 