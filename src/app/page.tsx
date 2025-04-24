'use client';

import Console from '@/components/console/Console';
import BottomBar from '@/components/BottomBar';

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* 왼쪽 콘솔 영역 */}
        <div className="col-md-6">
          <div className="mt-4">
            <Console />
          </div>
        </div>
        
        {/* 오른쪽 시각화 영역 */}
        <div className="col-md-6">
          <div className="mt-4">
            <div className="visualization-area">
              {/* 도커 시각화 컴포넌트가 여기에 들어갈 예정 */}
            </div>
          </div>
        </div>

{/* {하단 고정 바바} */}
        <div>
      <h1>Hello, world!</h1>
      {/* 다른 내용들 */}
      <BottomBar />
    </div>

      </div>
    </div>
  );
}
