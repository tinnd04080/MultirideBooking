import { SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Button as ButtonAnt, Image, Input, Modal, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { ColumnType } from 'antd/lib/table'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import Loading from '~/components/Loading/Loading'
import { cancelDelete } from '~/features/Toppings'
import { NotFound } from '~/pages'
import { useDeleteUserMutation, useGetAllUserByRoleQuery } from '~/store/services/Users'
import { setOpenDrawer } from '~/store/slices'
import { setUser } from '~/store/slices/User/user.slice'
import { useAppDispatch } from '~/store/store'
import { IUser, IUserDataType } from '~/types'
import { messageAlert } from '~/utils/messageAlert'
import { pause } from '~/utils/pause'

// type Props = {}
type DataIndex = keyof IUserDataType
export const ListCustomers = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteUser] = useDeleteUserMutation()
  const [options, setoptions] = useState({
    page: 1,
    limit: 100,
    roleName: 'customer' as 'customer' | 'staff'
  })

  /*Search */
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUserDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          size='middle'
          ref={searchInput}
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <ButtonAnt
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Tìm kiếm
          </ButtonAnt>
          <ButtonAnt onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Làm mới
          </ButtonAnt>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  /*End Search */

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { data: customersData, isLoading, isError } = useGetAllUserByRoleQuery(options)

  console.log('totalPage get được', customersData?.totalPage)
  console.log('Người dùng chọn', options)
  console.log('Dữ liệu trả về', customersData)

  const handleDeleteMany = () => {
    selectedRowKeys.forEach((selectItem) => {
      deleteUser(selectItem as string)
        .unwrap()
        .then(() => {
          messageAlert('Xóa thành công', 'success')
        })
        .catch(() => messageAlert('Xóa thất bại!', 'error'))
    })
    setSelectedRowKeys([])
  }
  const handleDelete = async (id: string) => {
    await pause(1000)
    deleteUser(id)
      .unwrap()
      .then(() => {
        messageAlert('Xóa thành công', 'success')
      })
      .catch(() => messageAlert('Xóa thất bại!', 'error'))
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 1
  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 60,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.index - b.index
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      render: (name: string) => <span className='capitalize'>{name}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ...getColumnSearchProps('email'),
      render: (email: string) => <span>{email}</span>
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      filterSearch: true,
      filters: Array.from(new Set(customersData?.data?.map((item: any) => item.role))).map((role: any) => ({
        text: role === 'ADMIN' ? 'Quản trị viên' : role === 'STAFF' ? 'Nhân viên' : 'Khách hàng',
        value: role
      })),
      onFilter: (value: any, record: any) => record.role === value,
      render: (role: string) => (
        <Tag
          color={role === 'ADMIN' ? '#D70000' : role === 'STAFF' ? '#FFE6A9' : '#005C78'}
          style={{
            color: role === 'ADMIN' ? 'white' : role === 'CUSTOMER' ? 'white' : role === 'STAFF' ? 'black' : '',
            borderRadius: '12px',
            padding: '5px 10px',
            fontWeight: '500',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center', // Đảm bảo văn bản căn giữa
            minWidth: '100px' // Đảm bảo tag có chiều rộng đủ để căn giữa
          }}
        >
          {role === 'ADMIN' ? 'Quản trị viên' : role === 'STAFF' ? 'Nhân viên' : 'Khách hàng'}
        </Tag>
      )
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      /* filterSearch: true,
      filters: customersData?.data?.map((item: any) => ({ text: item.phoneNumber, value: item._id })),
      onFilter: (value: any, record: any) => record._id === value, */
      render: (phoneNumber: string) => <span>{phoneNumber}</span>,
      ...getColumnSearchProps('phoneNumber')
    },
    {
      title: 'Trạng thái tài khoản',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      filterSearch: true,
      filters: Array.from(new Set(customersData?.data?.map((item: any) => item.status))).map((status: any) => ({
        text: status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động', // Chuyển đổi trạng thái thành văn bản
        value: status
      })),
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            maxWidth: '150px', // Đảm bảo chiều rộng cố định cho ô
            overflow: 'hidden', // Tránh trường hợp nội dung vượt quá chiều rộng
            textOverflow: 'ellipsis' // Thêm dấu ba chấm nếu nội dung quá dài
          }}
        >
          <Tag
            color={status === 'ACTIVE' ? '#9ABF80' : '#D91656'}
            style={{
              color: 'white',
              borderRadius: '12px',
              padding: '5px 10px',
              fontWeight: '500',
              width: '100%', // Cố định chiều rộng của Tag
              textAlign: 'center' // Căn giữa nội dung trong Tag
            }}
          >
            {status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}
          </Tag>
        </div>
      )
    },
    {
      title: 'Trạng thái xác minh',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: string) => (
        <Tag color={isVerified ? 'green' : 'error'}>{isVerified ? 'Đã xác minh' : 'Chưa xác minh'}</Tag>
      )
    },
    {
      title: <span className='block text-center'>Cập nhật</span>,
      key: 'action',
      render: (_: any, customer: IUser) => (
        <div className='flex items-center justify-center'>
          <Tooltip title='Cập nhật thông tin khách hàng này'>
            <ButtonAnt
              size='large'
              className='bg-primary hover:!text-white flex items-center justify-center text-white'
              icon={<BsFillPencilFill />}
              onClick={() => {
                dispatch(setUser({ ...customer }))
                dispatch(setOpenDrawer(true))
              }}
            />
          </Tooltip>
          {/* <Tooltip title='Xóa người dùng này'>
            <Popconfirm
              title='Bạn có muốn xóa khách hàng này?'
              okButtonProps={{ style: { backgroundColor: '#3C50E0', color: '#fff' } }}
              onCancel={cancelDelete}
              onConfirm={() => handleDelete(customer._id!)}
            >
              <ButtonAnt
                size='large'
                className='bg-meta-1 hover:!text-white flex items-center justify-center text-white'
                icon={<BsFillTrashFill />}
              />
            </Popconfirm>
          </Tooltip> */}
        </div>
      )
    }
  ]

  const customers = customersData?.data?.map((customer: any, index: number) => ({
    ...customer,
    key: customer._id,
    index: index + 1
  }))

  if (isLoading) return <Loading />
  if (isError) return <NotFound />
  return (
    <>
      <div className='dark:bg-graydark'>
        <Table
          columns={columns}
          dataSource={customers}
          bordered
          pagination={{
            current: options.page, // Trang hiện tại
            pageSize: options.limit, // Kích thước trang (số lượng items trên mỗi trang)
            showSizeChanger: false,
            showQuickJumper: true, // Cho phép nhảy đến trang
            total: customersData?.totalPage * 10,
            onChange(page, pageSize) {
              setoptions((prev) => ({ ...prev, page, limit: pageSize }))
            }
          }}
          scroll={{ y: '50vh', x: 1000 }}
          rowSelection={rowSelection}
        />
      </div>
    </>
  )
}
