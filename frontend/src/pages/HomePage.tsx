import { useEffect, useState } from 'react'
import { Button, Input, Modal, Select, Space, Table, Tag, message } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import dayjs from 'dayjs'
import * as api from '../api'
import type { HomeStats, MaterialItem } from '../types'

const DEPARTMENTS = ['业务部', '财务部', '人事行政部']

export default function HomePage() {
  const [stats, setStats] = useState<HomeStats | null>(null)
  const [list, setList] = useState<MaterialItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [department, setDepartment] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const loadStats = async () => {
    try {
      setStats(await api.fetchHomeStats())
    } catch (e) {
      message.error(e instanceof Error ? e.message : '加载统计失败')
    }
  }

  const loadList = async (nextPage = page, nextSize = pageSize) => {
    setLoading(true)
    try {
      const result = await api.fetchMaterials({
        keyword: keyword || undefined,
        department,
        status,
        libraryOnly: false,
        page: nextPage,
        pageSize: nextSize,
      })
      setList(result.list)
      setTotal(result.total)
      setPage(result.page)
      setPageSize(result.pageSize)
    } catch (e) {
      message.error(e instanceof Error ? e.message : '加载清单失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadStats()
    void loadList(1, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSearch = () => {
    void loadList(1, pageSize)
  }

  const onUpload = async (record: MaterialItem) => {
    try {
      await api.uploadMaterial(record.id)
      message.success('上传成功（演示：已标记为已上传并入库）')
      await Promise.all([loadStats(), loadList(page, pageSize)])
    } catch (e) {
      message.error(e instanceof Error ? e.message : '上传失败')
    }
  }

  const onView = async (record: MaterialItem) => {
    try {
      const detail = await api.fetchMaterial(record.id)
      Modal.info({
        title: detail.name,
        width: 520,
        content: (
          <div style={{ lineHeight: 1.8, marginTop: 8 }}>
            <div>关联项目：{detail.projectName}</div>
            <div>所属部门：{detail.department}</div>
            <div>资料分类：{detail.category}</div>
            <div>要求说明：{detail.requirement || '—'}</div>
            <div>状态：{detail.status === 'UPLOADED' ? '已上传' : '未上传'}</div>
            <div>文件：{detail.fileUrl || '—'}</div>
          </div>
        ),
      })
    } catch (e) {
      message.error(e instanceof Error ? e.message : '查看失败')
    }
  }

  const columns: ColumnsType<MaterialItem> = [
    {
      title: '序号',
      width: 64,
      render: (_v, _r, index) => (page - 1) * pageSize + index + 1,
    },
    { title: '资料名称', dataIndex: 'name', ellipsis: true },
    { title: '关联项目', dataIndex: 'projectName', ellipsis: true, width: 180 },
    { title: '所属部门', dataIndex: 'department', width: 110 },
    { title: '资料分类', dataIndex: 'category', width: 110 },
    { title: '要求说明', dataIndex: 'requirement', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      width: 90,
      render: (value: string) =>
        value === 'UPLOADED' ? <Tag color="success">已上传</Tag> : <Tag color="error">未上传</Tag>,
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (_v, record) => (
        <Space size="middle">
          {record.status === 'PENDING' ? (
            <Button type="link" style={{ padding: 0 }} onClick={() => void onUpload(record)}>
              上传
            </Button>
          ) : (
            <Button type="link" style={{ padding: 0 }} onClick={() => void onView(record)}>
              查看
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const onTableChange = (pagination: TablePaginationConfig) => {
    const nextPage = pagination.current ?? 1
    const nextSize = pagination.pageSize ?? 10
    void loadList(nextPage, nextSize)
  }

  return (
    <div>
      <div className="page-intro">
        <div>
          <h1>欢迎使用投标共享资料平台</h1>
          <p>集中管理企业资料，规范资料维护，提高工作效率。</p>
        </div>
        <div className="page-date">{dayjs().format('YYYY-MM-DD dddd')}</div>
      </div>

      <div className="stat-row">
        <div className="stat-item">
          <div className="stat-label">待上传文件总数</div>
          <div className="stat-value">
            {stats?.totalPending ?? '—'}
            <span>份</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">业务部待上传</div>
          <div className="stat-value">
            {stats?.businessPending ?? '—'}
            <span>份</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">财务部待上传</div>
          <div className="stat-value">
            {stats?.financePending ?? '—'}
            <span>份</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">人事行政部待上传</div>
          <div className="stat-value">
            {stats?.hrPending ?? '—'}
            <span>份</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-toolbar">
          <div className="panel-title">待上传资料清单</div>
          <div className="panel-filters">
            <Input.Search
              allowClear
              placeholder="请输入资料名称..."
              style={{ width: 220 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={onSearch}
            />
            <Select
              allowClear
              placeholder="全部部门"
              style={{ width: 140 }}
              value={department}
              onChange={(v) => setDepartment(v)}
              options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
            />
            <Select
              allowClear
              placeholder="全部状态"
              style={{ width: 120 }}
              value={status}
              onChange={(v) => setStatus(v)}
              options={[
                { value: 'PENDING', label: '未上传' },
                { value: 'UPLOADED', label: '已上传' },
              ]}
            />
            <Button type="primary" onClick={onSearch}>
              查询
            </Button>
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={list}
          scroll={{ x: 1000 }}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
            showTotal: (t) => `共 ${t} 条`,
          }}
          onChange={onTableChange}
          size="middle"
        />
      </div>
    </div>
  )
}
