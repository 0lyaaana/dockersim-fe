          {/* 명령어 입력 및 실행 영역 */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="도커 명령어를 입력하세요..."
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleExecute}
                  disabled={!command.trim()}
                >
                  실행
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowCommandDictionary(true)}
                >
                  명령어 사전
                </button>
              </div>
            </div>
          </div>

          {/* 콘솔 출력 영역 */}
          <div className="card">
            <div className="card-body bg-white">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {output.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </pre>
            </div>
          </div> 