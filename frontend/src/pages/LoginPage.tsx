import { useState } from 'react'
import { Alert, Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const { token, login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (token) {
    return <Navigate to="/" replace />
  }

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true)
    setError(null)
    try {
      await login(values.username.trim(), values.password)
      message.success('登录成功')
      navigate('/', { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand">
          <div className="brand-mark">Y</div>
          <h1>投标共享资料平台</h1>
        </div>
        <p className="login-sub">湖北云龙服饰有限公司</p>
        {error ? <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} /> : null}
        <Form layout="vertical" onFinish={onFinish} initialValues={{ username: 'zhangsan', password: '123456' }}>
          <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
            <Input prefix={<UserOutlined />} placeholder="账号" size="large" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            登录
          </Button>
        </Form>
        <div className="login-hint">
          默认账号：zhangsan / 123456（张三 · 业务部）
          <br />
          亦可：lisi、wangwu / 123456
        </div>
      </div>
    </div>
  )
}
