const MOCK_PAYMENTS = [
  {
    id: 1,
    plan: '프리미엄 플랜',
    amount: 99000,
    paymentMethod: '신용카드',
    status: '결제 완료',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    plan: '기본 플랜',
    amount: 49000,
    paymentMethod: '계좌이체',
    status: '결제 완료',
    createdAt: '2024-02-15',
  },
]

const PaymentHistory = () => {
  return (
    <div className="payment-history">
      <h3 className="mb-4">결제 내역</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>결제일</th>
              <th>플랜</th>
              <th>금액</th>
              <th>결제 수단</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(payment => (
              <tr key={payment.id}>
                <td>{payment.createdAt}</td>
                <td>{payment.plan}</td>
                <td>{payment.amount.toLocaleString()}원</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <span className="badge bg-success">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory 