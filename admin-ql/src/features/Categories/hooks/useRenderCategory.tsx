import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { Button as ButtonAntd, Popconfirm, Space, Tooltip, Tag, Input } from 'antd'
import { ICategory, IRoleUser } from '~/types'
import { RootState, useAppDispatch } from '~/store/store'
import { setCategory, setOpenDrawer } from '~/store/slices'
import { useDeleteFakeMutation, useDeleteRealMutation, useRestoreCategoryMutation } from '~/store/services'

import { ColumnsType } from 'antd/es/table'
import { RedoOutlined } from '@ant-design/icons'
import { cancelDelete } from '..'
import { messageAlert } from '~/utils/messageAlert'
import { pause } from '~/utils/pause'
import { useAppSelector } from '~/store/hooks'
import { useRef, useState } from 'react'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
// export const useRenderCategory = (isDeleted?: boolean) => {
export const useRenderCategory = (categories: ICategory[], isDeleted?: boolean) => {
  const searchInput = useRef<InputRef>(null)
  const [deleteFakeCategory] = useDeleteFakeMutation()
  const [restoreCategory] = useRestoreCategoryMutation()
  const [deleteRealCategory] = useDeleteRealMutation()
  const [searchText, setSearchText] = useState<string>('')
  const [searchedColumn, setSearchedColumn] = useState<string>('')
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  console.log(categories, 'categories')

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ICategory> => ({
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
          <ButtonAntd
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Tìm kiếm
          </ButtonAntd>
          <ButtonAntd onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Làm mới
          </ButtonAntd>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      // Kết hợp cả hai trường thành một chuỗi
      const combinedString = `${record.startProvince} - ${record.endProvince}`
      return combinedString.toLowerCase().includes((value as string).toLowerCase())
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text, record) => {
      const combinedString = `${record.startProvince} - ${record.endProvince}`
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={combinedString}
        />
      ) : (
        combinedString
      )
    }
  })

  const handleReset = (clearFilters: (() => void) | undefined) => {
    if (clearFilters) clearFilters() // Xoá bộ lọc
    setSearchText('') // Reset text tìm kiếm
    setSearchedColumn('') // Reset cột tìm kiếm
  }
  /* staff */
  const columnsStaff: ColumnsType<ICategory> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (text: any) => {
        return <div style={{ textAlign: 'center' }}>{text}</div>
      }
    },
    {
      title: 'Tuyến xe',
      dataIndex: 'startProvince', // Cột này vẫn giữ dữ liệu của startProvince
      key: 'startProvince',
      width: 230,
      /*  filterSearch: true,
      filters: categories?.map((item) => ({ text: item.startDistrict, value: item._id })),
      onFilter: (value: any, record: ICategory) => record._id === value, */
      ...getColumnSearchProps('startProvince'),
      render: (startProvince: any, record: ICategory) => {
        // Lấy tên tỉnh đích từ cả hai trường startProvince và endProvince
        const endProvince = record.endProvince // Giả sử endProvince là một trường có thông tin tương tự startProvince
        return (
          <span>
            {startProvince} - {endProvince}
          </span>
        )
      }
    },
    {
      title: 'Điểm xuất phát',
      dataIndex: 'startDistrict', // Trường hiển thị tên tỉnh điểm đến
      key: 'startDistrict',
      width: 250,
      filterSearch: true,
      render: (endProvince) => (
        <span>{endProvince}</span> // Hiển thị tên tỉnh điểm đến
      )
    },
    {
      title: 'Điểm đến',
      dataIndex: 'endDistrict', // Trường hiển thị tên tỉnh điểm đến
      key: 'endDistrict',
      width: 250,
      filterSearch: true,
      render: (endProvince) => (
        <span>{endProvince}</span> // Hiển thị tên tỉnh điểm đến
      )
    },
    {
      title: 'Chiều dài tuyến',
      dataIndex: 'distance',
      key: 'distance',
      render: (name: string) => (
        <span className='capitalize'>
          {name} <span className=' text-black'>Km</span>{' '}
        </span>
      )
    },
    {
      title: 'Giá mỗi km',
      dataIndex: 'pricePerKM',
      key: 'pricePerKM',
      render: (name: string) => (
        <span className='capitalize'>
          {name} <span className=' text-black'>Đ</span>{' '}
        </span>
      )
    },
    {
      title: 'Trạng thái tuyến',
      dataIndex: 'status',
      key: 'status',
      filterSearch: true,
      filters: Array.from(new Set(categories?.map((item: any) => item.status))).map((status: any) => ({
        text: status === 'OPEN' ? 'Hoạt động' : 'Ngừng hoạt động',
        value: status
      })),
      onFilter: (value: any, record: any) => {
        // So sánh trạng thái đã chuyển đổi
        const statusDisplay = record.status === 'OPEN' ? 'Hoạt động' : 'Ngừng hoạt động'
        return statusDisplay === value
      },
      render: (status: any) => {
        return (
          <Tag color={status === 'OPEN' ? 'green' : 'error'} className=''>
            {status === 'OPEN' ? 'Hoạt động' : 'Ngừng hoạt động'}
          </Tag>
        )
      }
    }
  ]

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: IProduct) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex.name)
  }
  /* admin */
  const handleDelete = async (id: string) => {
    await pause(2000)
    await deleteFakeCategory(id)
      .unwrap()
      .then(() => messageAlert('Xóa thành công', 'success'))
      .catch(() => cancelDelete())
  }

  const handleRestore = async (id: string) => {
    await pause(2000)
    await restoreCategory(id)
      .unwrap()
      .then(() => messageAlert('Khôi phục thành công', 'success'))
      .catch(() => messageAlert('Khôi phục thất bại', 'error'))
  }

  const handleDeleteReal = async (id: string) => {
    await pause(2000)
    await deleteRealCategory(id)
      .unwrap()
      .then(() => messageAlert('Xóa thành công', 'success'))
      .catch(() => messageAlert('Xóa thất bại', 'error'))
  }

  const columnsAdmin: ColumnsType<ICategory> = [
    ...columnsStaff,
    {
      title: <span className='block text-center'>Cập nhật</span>,
      key: 'action',
      width: 100,
      render: (_: string, category: ICategory) => {
        if (!isDeleted) {
          return (
            <div className='flex items-center justify-center'>
              <Space size='middle'>
                <Tooltip title='Cập nhật tuyến đường'>
                  <ButtonAntd
                    size='large'
                    className='bg-primary hover:!text-white flex items-center justify-center text-white'
                    icon={<BsFillPencilFill />}
                    onClick={() => {
                      dispatch(
                        setCategory({
                          _id: category._id,
                          startProvince: category.startProvince,
                          startDistrict: category.startDistrict,
                          endProvince: category.endProvince,
                          endDistrict: category.endDistrict,
                          duration: category.duration,
                          status: category.status,
                          distance: category.distance,
                          pricePerKM: category.pricePerKM
                        })
                      )
                      dispatch(setOpenDrawer(true))
                    }}
                  />
                </Tooltip>
                {/* <Tooltip title='Xóa Tuyến đường'>
                  <Popconfirm
                    title='Bạn có muốn xóa Tuyến đường này?'
                    description='Bạn chắc chắn muốn xóa Tuyến đường này?'
                    okButtonProps={{ style: { backgroundColor: '#3C50E0', color: '#fff' } }}
                    // onCancel={cancelDelete}
                    onConfirm={() => handleDelete(category._id)}
                  >
                    <ButtonAntd
                      size='large'
                      className='bg-meta-1 hover:!text-white flex items-center justify-center text-white'
                      icon={<BsFillTrashFill />}
                    />
                  </Popconfirm>
                </Tooltip> */}
              </Space>
            </div>
          )
        } else {
          return (
            <div className='flex items-center justify-center'>
              <Space size='middle'>
                <Tooltip title='Khôi phục Tuyến đường này'>
                  <Popconfirm
                    title='Bạn muốn khôi phục lại Tuyến đường này?'
                    description='Bạn thực sự muốn khôi phục lại Tuyến đường này?'
                    onConfirm={() => handleRestore(category._id)}
                  >
                    <ButtonAntd
                      size='large'
                      className='bg-primary hover:!text-white flex items-center justify-center text-white'
                      icon={<RedoOutlined className='text-lg' />}
                    />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title='Xóa vĩnh viễn Tuyến đường này'>
                  <Popconfirm
                    title='Bạn có muốn xóa VĨNH VIỄN Tuyến đường này?'
                    description='Hành động này sẽ không thể khôi phục lại!'
                    okButtonProps={{ style: { backgroundColor: '#3C50E0', color: '#fff' } }}
                    // onCancel={cancelDelete}
                    onConfirm={() => handleDeleteReal(category._id)}
                  >
                    <ButtonAntd
                      size='large'
                      className='bg-meta-1 hover:!text-white flex items-center justify-center text-white'
                      icon={<BsFillTrashFill />}
                    />
                  </Popconfirm>
                </Tooltip>
              </Space>
            </div>
          )
        }
      }
    }
  ]

  return columnsAdmin
}

// export default memo(useRenderCategory)
