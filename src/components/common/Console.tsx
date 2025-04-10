interface ConsoleProps {
  output: string[]
}

const Console = ({ output }: ConsoleProps) => {
  return (
    <div className="console bg-dark text-light p-3 mb-3" style={{ height: '400px', overflowY: 'auto' }}>
      {output.map((line, index) => (
        <div key={index} className="console-line">
          {line}
        </div>
      ))}
    </div>
  )
}

export default Console 