'use client'

import { useState } from 'react'
import Link from 'next/link'

interface UserActivity {
  id: number
  type: 'post' | 'board_comment' | 'question_comment'
  title: string
  content: string
  createdAt: string
}

interface PaymentHistory {
  id: number
  plan: string
  amount: number
  status: 'active' | 'cancelled' | 'expired'
  startDate: string
  endDate: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activities] = useState<UserActivity[]>([
    {
      id: 1,
      type: 'post',
      title: 'Docker 네트워크 설정 방법',
      content: 'Docker 네트워크를 설정하는 방법에 대해 설명합니다...',
      createdAt: '2024-03-15'
    },
    {
      id: 2,
      type: 'board_comment',
      title: 'Docker 볼륨 마운트 질문',
      content: '볼륨 마운트 시 주의사항에 대해 답변드립니다...',
      createdAt: '2024-03-14'
    }
  ])
  const [paymentHistory] = useState<PaymentHistory[]>([
    {
      id: 1,
      plan: 'Professional',
      amount: 10000,
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-03-31'
    }
  ])

  const handleGithubLogin = () => {
    // TODO: GitHub OAuth 로그인 구현
    console.log('GitHub login')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    console.log('Logout')
    setIsLoggedIn(false)
  }

  const handleCancelSubscription = () => {
    // TODO: 구독 취소 로직 구현
    console.log('Cancel subscription')
  }

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">설정</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="bi bi-person-circle me-2"></i>
              프로필
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <i className="bi bi-activity me-2"></i>
              내 활동
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <i className="bi bi-credit-card me-2"></i>
              결제
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">프로필 설정</h5>
                {!isLoggedIn ? (
                  <div className="text-center py-4">
                    <i className="bi bi-github fs-1 mb-3"></i>
                    <p className="mb-4">GitHub 계정으로 로그인하여 모든 기능을 사용해보세요.</p>
                    <button
                      className="btn btn-dark"
                      onClick={handleGithubLogin}
                    >
                      <i className="bi bi-github me-2"></i>
                      GitHub로 로그인
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://github.com/identicons/user.png"
                          alt="Profile"
                          className="rounded-circle me-3"
                          width="64"
                          height="64"
                        />
                        <div>
                          <h6 className="mb-1">사용자</h6>
                          <p className="text-muted mb-0">user@example.com</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">내 활동</h5>
                {!isLoggedIn ? (
                  <div className="text-center py-4">
                    <p className="text-muted">로그인이 필요한 기능입니다.</p>
                  </div>
                ) : (
                  <div className="list-group">
                    {activities.map(activity => (
                      <div key={activity.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{activity.title}</h6>
                            <p className="mb-1 text-muted">{activity.content}</p>
                            <small className="text-muted">
                              {activity.createdAt} ·{' '}
                              {activity.type === 'post' ? '게시글' :
                               activity.type === 'board_comment' ? '게시판 댓글' : '질문 댓글'}
                            </small>
                          </div>
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">결제 설정</h5>
                {!isLoggedIn ? (
                  <div className="text-center py-4">
                    <p className="text-muted">로그인이 필요한 기능입니다.</p>
                  </div>
                ) : (
                  <>
                    <div className="row mb-4">
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">Basic</h5>
                            <h2 className="my-3">무료</h2>
                            <ul className="list-unstyled">
                              <li>기본 기능 사용</li>
                              <li>커뮤니티 참여</li>
                            </ul>
                            <button className="btn btn-outline-primary" disabled>
                              현재 플랜
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card h-100 border-primary">
                          <div className="card-body text-center">
                            <h5 className="card-title">Professional</h5>
                            <h2 className="my-3">₩10,000</h2>
                            <ul className="list-unstyled">
                              <li>모든 기본 기능</li>
                              <li>고급 시각화</li>
                              <li>우선 지원</li>
                            </ul>
                            <button className="btn btn-primary">
                              업그레이드
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">Enterprise</h5>
                            <h2 className="my-3">문의</h2>
                            <ul className="list-unstyled">
                              <li>커스텀 기능</li>
                              <li>전용 지원</li>
                              <li>API 액세스</li>
                            </ul>
                            <button className="btn btn-outline-primary">
                              문의하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h6 className="mb-3">결제 내역</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>플랜</th>
                            <th>금액</th>
                            <th>상태</th>
                            <th>시작일</th>
                            <th>종료일</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentHistory.map(payment => (
                            <tr key={payment.id}>
                              <td>{payment.plan}</td>
                              <td>₩{payment.amount.toLocaleString()}</td>
                              <td>
                                <span className={`badge bg-${
                                  payment.status === 'active' ? 'success' :
                                  payment.status === 'cancelled' ? 'danger' : 'warning'
                                }`}>
                                  {payment.status === 'active' ? '이용 중' :
                                   payment.status === 'cancelled' ? '해지됨' : '만료됨'}
                                </span>
                              </td>
                              <td>{payment.startDate}</td>
                              <td>{payment.endDate}</td>
                              <td>
                                {payment.status === 'active' && (
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={handleCancelSubscription}
                                  >
                                    해지
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}