'use client'

import { useState } from 'react'
import MyPosts from '@/components/settings/MyPosts'
import MyComments from '@/components/settings/MyComments'
import PaymentHistory from '@/components/settings/PaymentHistory'

type SettingsTab = 'posts' | 'comments' | 'payment'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('posts')

  return (
    <div className="settings-page">
      <h2 className="mb-4">설정</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === 'posts' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('posts')}
            >
              내 게시글
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === 'comments' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('comments')}
            >
              내 댓글
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === 'payment' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('payment')}
            >
              결제 내역
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {activeTab === 'posts' && <MyPosts />}
          {activeTab === 'comments' && <MyComments />}
          {activeTab === 'payment' && <PaymentHistory />}
        </div>
      </div>
    </div>
  )
} 