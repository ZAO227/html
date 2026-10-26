import { useEffect, useState } from 'react'
import { Button, Input, Modal, Select, Table, message } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import * as api from '../api'
import type { MaterialItem } from '../types'

const DEPARTMENTS = ['业务部', '财务部', '人事行政部']

export default function LibraryPage() {
  const [list, setList] = useState<MaterialItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [department, setDepartment] = useState<string | undefined>()
  const [category, setCategory] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const loadList = async (nextPage = page, nextSize = pageSize) => {
    setLoading(true)
    try {
      const result = await api.fetchMaterials({
        keyword: keyword || undefined,
        department,
        libraryOnly: true,
        page: nextPage,
        pageSize: nextSize,
      })
      const filtered = category
        ? result.list.filter((item) => item.category === category)
        : result.list
      setList(filtered)
      setTotal(category ? filtered.length : result.total)
      setPage(result.page)
      setPageSize(result.pageSize)
    } catch (e) {
      message.error(e instanceof Error ? e.message : '加载资料库失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadList(1, pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    { title: '关联项目', dataIndex: 'projectName', ellipsis: true },
    { title: '所属部门', dataIndex: 'department', width: 120 },
    { title: '资料分类', dataIndex: 'category', width: 120 },
    {
      title: '操作',
      width: 100,
      render: (_v, record) => (
        <Button type="link" style={{ padding: 0 }} onClick={() => void onView(record)}>
          查看
        </Button>
      ),
    },
  ]

  return (
    <div>
      <div className="page-intro">
        <div>
          <h1>资料库</h1>
          <p>浏览已入库的企业投标共享资料。</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-toolbar">
          <div className="panel-title">已入库资料</div>
          <div className="panel-filters">
            <Input.Search
              allowClear
              placeholder="搜索资料或项目..."
              style={{ width: 220 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={() => void loadList(1, pageSize)}
            />
            <Select
              allowClear
              placeholder="全部部门"
              style={{ width: 140 }}
              value={department}
              onChange={setDepartment}
              options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
            />
            <Select
              allowClear
              placeholder="全部分类"
              style={{ width: 140 }}
              value={category}
              onChange={setCategory}
              options={[
                '项目合同',
                '发票',
                '项目业绩',
                '企业资质',
                '投标文件',
                '财务资料',
                '人事证明',
              ].map((c) => ({ value: c, label: c }))}
            />
            <Button type="primary" onClick={() => void loadList(1, pageSize)}>
              查询
            </Button>
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
            showTotal: (t) => `共 ${t} 条`,
          }}
          onChange={(pagination: TablePaginationConfig) => {
            void loadList(pagination.current ?? 1, pagination.pageSize ?? 10)
          }}
          size="middle"
        />
      </div>
    </div>
  )
}
