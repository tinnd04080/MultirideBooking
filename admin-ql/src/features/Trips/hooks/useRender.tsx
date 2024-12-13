import { AiFillEdit, AiOutlineUndo } from 'react-icons/ai'
import { Button as ButtonAntd, Input, InputRef, Popconfirm, Space, Tag, Tooltip, message } from 'antd'
import { IProduct, IRoleUser, ISizeRefProduct, IToppingRefProduct } from '~/types'
import { RootState, useAppDispatch } from '~/store/store'
import { setOpenDrawer, setProductDetail, setProductId } from '~/store/slices'
import {
  useDeleteFakeProductMutation,
  useDeleteProductMutation,
  useDeleteTripMutation,
  useEditProductMutation,
  useRestoreProductMutation
} from '~/store/services'
import { useRef, useState } from 'react'

import type { ColumnType } from 'antd/es/table'
import { DeleteIcon, Loading } from '~/components'
import { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { ICategoryRefProduct } from '~/types/Category'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import { TbBasketDiscount } from 'react-icons/tb'
import clsxm from '~/utils/clsxm'
import { formatCurrency } from '~/utils'
import { useAppSelector } from '~/store/hooks'

export const useRender = (productsList: IProduct[], deleteReal?: boolean, checkPath?: boolean) => {
  const dispatch = useAppDispatch()
  const searchInput = useRef<InputRef>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [searchedColumn, setSearchedColumn] = useState<string>('')

  const [deleteFakeProduct] = useDeleteFakeProductMutation()
  const [restoreProduct] = useRestoreProductMutation()
  const [deleteProduct] = useDeleteTripMutation()
  const [changeStatusProduct, { isLoading: isChangeStatus }] = useEditProductMutation()

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: IProduct) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex.name)
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
  const handleReset = (clearFilters: (() => void) | undefined) => {
    if (clearFilters) clearFilters() // Xoá bộ lọc
    setSearchText('') // Reset text tìm kiếm
    setSearchedColumn('') // Reset cột tìm kiếm
  }
  function formatDateTime(dateString: string): JSX.Element {
    const date = new Date(dateString)
    // Lấy các giá trị giờ, phút, ngày, tháng, năm
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0
    const year = date.getFullYear()

    // Trả về chuỗi định dạng
    return (
      <>
        {hours}:{minutes}
        <br />
        {day}/{month}/{year}
      </>
    )
  }

  /* columns staff */
  const columnsStaff: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (sizes: any, itc: any) => {
        console.log(itc, 'itcitc')
        return (
          <>
            <p
              className='cursor-pointer'
              onClick={() => {
                console.log(itc, 'itcitc')

                dispatch(setOpenDrawer(true))
                dispatch(setProductDetail(itc))
              }}
            >
              {sizes}
            </p>
          </>
        )
      }
    },
    {
      title: 'Thời gian xuất phát',
      dataIndex: 'departureTime',
      key: 'departureTime',
      width: 150,
      filterSearch: true,
      filters: Array.from(
        new Set(
          productsList?.map((item: any) => {
            const date = new Date(item.departureTime)
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}/${date.getFullYear()}`
          })
        )
      )
        .sort((a: string, b: string) => {
          const [dayA, monthA, yearA] = a.split('/').map(Number)
          const [dayB, monthB, yearB] = b.split('/').map(Number)
          const dateA = new Date(yearA, monthA - 1, dayA)
          const dateB = new Date(yearB, monthB - 1, dayB)
          return dateB.getTime() - dateA.getTime() // Ngày mới nhất trước
        })
        .map((date: string) => ({
          text: date, // Hiển thị ngày trong bộ lọc
          value: date // Giá trị của bộ lọc
        })),
      onFilter: (value: any, record: any) => {
        const recordDate = new Date(record.departureTime)
        const formattedRecordDate = `${recordDate.getDate().toString().padStart(2, '0')}/${(recordDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${recordDate.getFullYear()}`
        return formattedRecordDate === value
      },
      render: (sizes: any) => (
        <>
          <p className=''>{formatDateTime(sizes)}</p>
        </>
      )
    },
    {
      title: 'Thời gian dự kiến đến',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      width: 150,
      render: (sizes: any) => (
        <>
          <p className=''>{formatDateTime(sizes)}</p>
        </>
      )
    },

    {
      title: 'Tuyến xe',
      dataIndex: 'route',
      key: 'route',
      width: 150,
      filterSearch: true,
      filters: Array.from(
        new Set(productsList?.map((item: any) => `${item?.route?.startProvince} - ${item?.route?.endProvince}`))
      ).map((route: any) => ({
        text: route,
        value: route
      })),
      onFilter: (value: any, record: any) => {
        const route = `${record.route.startProvince} - ${record.route.endProvince}`
        return route === value
      },
      render: (sizes: any) => (
        <>
          <p className=''>
            {sizes?.startProvince} đến <br /> {sizes?.endProvince}
          </p>
        </>
      )
    },
    {
      title: 'Loại xe - biển số xe',
      width: 150,
      dataIndex: 'bus',
      key: 'bus',
      filterSearch: true, // Kích hoạt tìm kiếm
      filters: Array.from(new Set(productsList?.map((item: any) => item.bus.licensePlate))).map(
        (licensePlate: any) => ({
          text: licensePlate, // Hiển thị biển số xe trong bộ lọc
          value: licensePlate // Giá trị của bộ lọc
        })
      ),
      onFilter: (value: any, record: any) => {
        return record.bus?.licensePlate.toLowerCase().includes(value.toLowerCase()) // Kiểm tra xem giá trị biển số có chứa từ khóa tìm kiếm không
      },
      render: (seatCapacity: any) => {
        return (
          <>
            <p className=''>
              {seatCapacity?.busTypeName} <br /> {seatCapacity?.licensePlate}
            </p>
          </>
        )
      }
    },

    {
      title: 'Ghế trống',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
      width: 120,
      render: (category: ICategoryRefProduct) => <p className='capitalize'>{category}</p>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (sizes: any) => (
        <>
          <Tag color={sizes == 'OPEN' ? 'green' : 'error'} className=''>
            {sizes == 'OPEN' ? 'Hoạt động' : 'Ngừng hoạt động'}
          </Tag>
        </>
      )
    }
    // {
    //   title: 'Ghế đã bán',
    //   dataIndex: 'licensePlate',
    //   key: 'licensePlate',
    //   width: 120,
    //   render: (category: ICategoryRefProduct) => <p className='capitalize'>{category}</p>
    // }
  ]
  /* column admin */
  /* handle delete product */
  /*Xoa mem Xe đi */
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteFakeProduct({ id }).unwrap()
      if (response.message === 'success') {
        message.success('Xe đã được chuyển vào thùng rác!')
      }
    } catch (error) {
      message.error('Xóa Xe thất bại')
    }
  }

  const handleRestoreProduct = async (id: string) => {
    try {
      const response = await restoreProduct({ id })
      if ((response as any).message === 'success') {
        message.success('Khôi phục Xe thành công!')
      }
    } catch (error) {
      message.error('Khôi phục Xe thất bại')
    }
  }

  const handleDeleteProductReal = async (id: string) => {
    try {
      const response = await deleteProduct({ id })
      if ((response as any).message === 'success') {
        message.success('Xóa Xe thành công!')
      }
    } catch (error) {
      message.error('Khôi phục Xe thất bại')
    }
  }

  const handleChangeStatusProduct = async (product: IProduct) => {
    // console.log(product)
    // return

    const newProduct: any = {
      name: product.name,
      category: product.category._id,
      is_active: product.is_active ? false : true,
      description: product.description,
      sale: product.sale,
      size: product.sizes
        .filter((size) => !size.is_default)
        .map((size) => ({ _id: size._id, name: size.name, price: size.price })),
      sizeDefault: product.sizes.filter((size) => size.is_default).map((size) => size._id),
      toppings: product.toppings.map((topping) => topping._id)
    }
    changeStatusProduct({ id: product._id, product: newProduct })
      .unwrap()
      .then(() => {
        message.success('Thay đổi trạng thái thành công')
      })
      .catch(() => message.error('Thay đổi trạng thái thất bại'))
  }

  const columnsAdmin: any = [
    ...columnsStaff,
    {
      // title: 'Action',
      dataIndex: 'action',
      width: 100,
      key: 'action',
      render: (_: any, product: IProduct) => {
        if (!deleteReal && !checkPath) {
          return (
            <Space>
              {isChangeStatus && <Loading overlay />}
              <Tooltip title='Cập nhật Xe'>
                <ButtonAntd
                  size='large'
                  icon={<AiFillEdit />}
                  onClick={() => {
                    dispatch(setOpenDrawer(true))
                    dispatch(setProductId(product._id))
                  }}
                  className='bg-primary hover:text-white flex items-center justify-center text-white'
                />
              </Tooltip>
              {/* <Popconfirm
                title='Xóa Xe?'
                description={`Xe sẽ bị xóa'`}
                onConfirm={() => handleDeleteProductReal(product._id)}
                okText='Có'
                cancelText='Không'
              >
                <ButtonAntd
                  size='large'
                  icon={<SyncOutlined />}
                  danger
                  className='hover:text-white flex items-center justify-center text-white'
                />
              </Popconfirm> */}
            </Space>
          )
        } else {
          return (
            <>
              {!checkPath && (
                <Space>
                  <Tooltip title='Khôi phục Xe'>
                    <Popconfirm
                      title='Bạn có muốn khôi phục Xe này?'
                      onConfirm={() => handleRestoreProduct(product._id)}
                      okText='Đồng ý'
                      cancelText='Hủy'
                    >
                      <ButtonAntd
                        size='large'
                        icon={<AiOutlineUndo />}
                        className='bg-primary hover:text-white flex items-center justify-center text-white'
                      />
                    </Popconfirm>
                  </Tooltip>
                  <Popconfirm
                    title='Xóa Xe?'
                    onConfirm={() => handleDeleteProductReal(product._id)}
                    okText='Đồng ý'
                    cancelText='Hủy'
                  >
                    <ButtonAntd
                      size='large'
                      icon={<DeleteIcon />}
                      danger
                      className='hover:text-white flex items-center justify-center text-white'
                    />
                  </Popconfirm>
                </Space>
              )}
            </>
          )
        }
      }
    }
  ]

  // return user && user.role === IRoleUser.ADMIN ? columnsAdmin : columnsStaff
  return columnsAdmin
}
