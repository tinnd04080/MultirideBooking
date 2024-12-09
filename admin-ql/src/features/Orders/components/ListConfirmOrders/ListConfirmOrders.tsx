import { Button as ButtonAnt, Input, Popconfirm, Space, Table, Tooltip, Select, Form } from 'antd'
import { EyeFilled, SearchOutlined } from '@ant-design/icons'
import {
  useDoneOrderMutation,
  useGetAllOrderConfirmQuery,
  useGetAllOrderPendingQuery,
  useCancelOrderMutation,
  useConfirmOrderMutation
} from '~/store/services/Orders'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '~/components'
import { ColumnType } from 'antd/lib/table'
import { ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { IOrderDataType } from '~/types'
import type { InputRef } from 'antd'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import Loading from '~/components/Loading/Loading'
import { NotFound } from '~/pages'
import { RootState } from '~/store/store'
import TableChildrend from '~/features/Products/utils/TableChildrend'
import UserInfoRow from '../UserInfoRow/UserInfoRow'
import { formatCurrency } from '~/utils'
import { formatDate } from '~/utils/formatDate'
import { messageAlert } from '~/utils/messageAlert'
import { setOpenDrawer } from '~/store/slices'
import { setOrderData } from '~/store/slices/Orders/order.slice'
import { useAppDispatch } from '~/store/store'
import { useAppSelector } from '~/store/hooks'
import TicketDetails from '../Ticketdetails/ticketDetails.tsx'
import { faL } from '@fortawesome/free-solid-svg-icons'

type DataIndex = keyof IOrderDataType

const ListConfirmOrders = () => {
  const dispatch = useAppDispatch()
  const [confirmedOrder, setConfirmedOrder] = useState<any>()
  const { orderDate } = useAppSelector((state) => state.orders)
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const [options, setoptions] = useState({
    page: 1,
    limit: 10,
    status: 'PAID', // Đảm bảo giá trị PAID có sẵn trong code hoặc từ constants
    room: user._id // Đảm bảo user._id có giá trị hợp lệ
  })

  const memoOptions = useMemo(() => {
    setoptions((prev) => ({
      ...prev,
      page: 1,
      startDate: orderDate.startDate,
      endDate: orderDate.endDate
    }))
  }, [orderDate])

  /*Search */
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [confirmOrder, { isLoading: isComfirming }] = useConfirmOrderMutation()
  const searchInput = useRef<InputRef>(null)
  const onConfirmOrder = ({ idOrder, idUser }: { idOrder: string; idUser: string }) => {
    confirmOrder({
      idOrder,
      idUser
    })
      .unwrap()
      .then(() => {
        messageAlert('Thay đổi trạng thái thành công', 'success', 4)
      })
      .catch(() => messageAlert('Thay đổi trạng thái thất bại', 'error'))
  }
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
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IOrderDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
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
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} // Tìm kiếm
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Tìm kiếm
          </ButtonAnt>
          <ButtonAnt
            onClick={() => {
              clearFilters && handleReset(clearFilters) // Reset filter
              handleSearch([], confirm, dataIndex) // Tự động tìm kiếm lại với giá trị rỗng
            }}
            size='small'
            style={{ width: 90 }}
          >
            Làm mới
          </ButtonAnt>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      const targetValue = record[dataIndex]
      if (targetValue !== undefined && targetValue !== null) {
        if (typeof targetValue === 'object') {
          targetValue?.avatar === undefined && delete targetValue.avatar
          // Duyệt qua các giá trị trong object và kiểm tra chúng
          return Object.values(targetValue).some((val: any) => {
            if (val !== undefined && val !== null) {
              return val
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
            }
            return false // Nếu val là undefined hoặc null thì không khớp
          })
        } else {
          // Kiểm tra nếu targetValue không phải object và tránh cắt bớt chuỗi
          return targetValue
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        }
      }
      return false // Trả về false nếu targetValue là undefined hoặc null
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0, margin: '0 auto', textAlign: 'center' }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString().substring() : ''} // Đảm bảo không cắt chuỗi quá mức
        />
      ) : (
        text
      )
  })
  /*End Search */

  /* Gọi các api */
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  /* ---------------------------------------------------------- */
  /* Gửi request đến endpoint "GetAllOrderPending" với các tham số trong options 
 => trả về : 
    - data => Kết quả get được từ API (Gán tên data thành dataTrip).
    - isLoading => true khi đang gửi request, false khi hoàn tất.
    - isError => true nếu có lỗi trong request, ngược lại là false */
  const { data: dataTrip, isLoading, isError } = useGetAllOrderPendingQuery(options)
  console.log(dataTrip?.data)

  /* ---------------------------------------------------------- */
  const [doneOrder, { isLoading: isDoning }] = useDoneOrderMutation()

  const onDoneOrder = ({ idOrder, idUser }: { idOrder: string; idUser: string }) => {
    doneOrder(idOrder)
      .unwrap()
      .then(() => {
        messageAlert('Thay đổi trạng thái thành công', 'success', 4)
      })
      .catch(() => messageAlert('Thay đổi trạng thái thất bại', 'error'))
  }
  const onDoneOrderMany = () => {
    selectedRowKeys.forEach((selectItem) => {
      doneOrder(selectItem as string)
        .unwrap()
        .then(({ order }) => {
          messageAlert('Thay đổi trạng thái thành công', 'success', 4)
          // onClose()
        })
        .catch(() => messageAlert('Thay đổi trạng thái thất bại', 'error'))
    })
    setSelectedRowKeys([])
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
      width: 50,
      render: (text, record, index) => {
        // Tính toán lại số thứ tự trên từng trang
        const { page, limit } = options
        return (page - 1) * limit + index + 1 // Tính số thứ tự dựa trên trang và số lượng mỗi trang
      },
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.index - b.index
    },
    {
      title: 'Mã vé',
      dataIndex: 'code',
      key: 'code',
      width: 85,
      ...getColumnSearchProps('code')
    },
    {
      title: 'Tài khoản đặt vé',
      dataIndex: 'user',
      key: 'user',
      width: 150,
      rowScope: 'row',
      ...getColumnSearchProps('user'),
      // sorter: (a, b) => {
      //   return a.user.username.localeCompare(b.user.username)
      // },
      // sortDirections: ['descend', 'ascend'],
      render: (user: any) => <UserInfoRow user={user} />
    },
    {
      title: 'Xen chi tiết vé',
      width: 100,
      render: (text: any, record: any) => (
        <div style={{ textAlign: 'center' }}>
          <TicketDetails TicketDetail={record.TicketDetail} />
        </div>
      )
    },
    {
      title: 'Số lượng ghế',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 91,
      render: (quantity: number) => <p className='text-center'>{quantity}</p>
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 91,
      render: (paymentMethod: string) => {
        let displayText = ''
        let textColor = ''

        if (paymentMethod === 'OFFLINEPAYMENT') {
          displayText = 'Tại bến'
          textColor = 'text-green-500' // Màu xanh lá
        } else if (paymentMethod === 'ZALOPAY') {
          displayText = 'ZaloPay'
          textColor = 'text-blue-500' // Màu xanh dương
        } else {
          displayText = paymentMethod // Nếu không phải 2 giá trị trên, hiển thị paymentMethod gốc
          textColor = 'text-gray-700' // Màu mặc định
        }

        return <p className={`text-center ${textColor}`}>{displayText}</p>
      }
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 110,
      render: (totalPrice: number) => (
        <span
          className={`capitalize font-semibold
          rounded inline-block text-lg text-center py-1`}
        >
          {formatCurrency(+totalPrice)}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string, data: any) => (
        <span
          className={`text-white capitalize font-semibold bg-meta-6
          rounded inline-block px-2 py-1`}
        >
          {data.payment !== 'cod' && status == 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      )
    },

    {
      key: 'action',
      title: 'Xác nhận trạng thái vé',
      width: 200,
      render: (_: any, order) => (
        <div className='flex items-center justify-center'>
          <Space>
            {/* <Tooltip title='Xem chi tiết vé'>
              <ButtonAnt
                size='large'
                className='bg-meta-6 hover:!text-white flex items-center justify-center text-white'
                icon={<EyeFilled />}
                onClick={() => {
                  dispatch(setOpenDrawer(true))
                  dispatch(setOrderData({ ...order }))
                }}
              />
            </Tooltip> */}
            <Tooltip title='Xác nhận vé'>
              {/* <ButtonAnt
                size='large'
                className='bg-meta-5 hover:!text-white flex items-center justify-center text-white'
                icon={<CheckOutlined />}
                onClick={() => {
                  onConfirmOrder({ idOrder: order.key, idUser: order.user_order })
                }}
              /> */}
              <Form.Item style={{ width: 200 }} name='category'>
                <Select
                  onChange={(value) => {
                    console.log(order, 'value')
                    onConfirmOrder({
                      idOrder: order.key,
                      idUser: value
                    })
                  }}
                  placeholder='Hành động'
                  size='large'
                >
                  {/*  <Select.Option value={'PAID'}>
                    <span className='text-sm capitalize'>Xác nhận thanh toán</span>
                  </Select.Option> */}
                  {/* <Select.Option value={'PAYMENT_FAILED'}>
                    <span className='text-sm capitalize'>PAYMENT_FAILED</span>
                  </Select.Option> */}
                  <Select.Option value={'CANCELED'}>
                    <span className='text-sm capitalize' style={{ color: 'red', fontWeight: 500 }}>
                      Hủy vé
                    </span>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Tooltip>

            {/* <Tooltip title='Hủy vé'>
              {order && !order.user_order ? (
                <Popconfirm
                  title='Bạn muốn hủy vé này chứ ?'
                  onConfirm={() => {
                    cancelOrder({ id: order.key, reasonCancelOrder: 'hủy' })
                      .unwrap()
                      .then(() => {
                        message.success(`Hủy vé thành công`)
                      })
                      .catch(() => {
                        messageAlert('Hủy vé thất bại.Hãy thử lại! ', 'error', 5)
                      })
                    ClientSocket.cancelOrder(order.key)
                  }}
                  okText='Đồng ý'
                  cancelText='Hủy'
                >
                  <ButtonAnt
                    size='large'
                    className='bg-meta-1 hover:!text-white flex items-center justify-center text-white'
                    icon={<CloseCircleFilled />}
                  />
                </Popconfirm>
              ) : (
                <ButtonAnt
                  size='large'
                  className='bg-meta-1 hover:!text-white flex items-center justify-center text-white'
                  icon={<CloseCircleFilled />}
                  onClick={() => {
                    dispatch(setOpenModal(true))
                    dispatch(setIdOrderCancel(order.key))
                  }}
                />
              )}
            </Tooltip> */}
          </Space>
        </div>
      )
    }
  ]

  const ordersData = dataTrip?.data
    ?.filter((itc: any) => itc.status == 'PAID')
    ?.map((item: any, index: number) => ({
      user: {
        fullName: item.user?.fullName,
        phone: item.user?.phoneNumber,
        email: item.user?.email,
        cccd: item.user?.cccd,
        status: item.user?.status
      },
      code: item?.code,
      payment: '',
      user_order: item?.user?._id,
      itm: item?.items,
      quantity: item.seatNumber.length,
      totalPrice: item?.totalAmount,
      status: item.status,
      moneyPromotion: item.moneyPromotion,
      timeOrder: item.trip?.departureTime,
      key: item._id,
      index: index + 1,
      orderCode: item._id.toUpperCase(),
      paymentMethod: item.paymentMethod,
      TicketDetail: {
        /* startProvince: item.busRoute.startProvince,
        endProvince: item.busRoute.endProvince, */
        boardingPoint: item.boardingPoint,
        dropOffPoint: item.dropOffPoint,
        departureTime: item.trip.departureTime,
        arrivalTime: item.trip.arrivalTime,
        seatNumber: item.seatNumber,
        createdAt: item.createdAt,
        paymentMethod: item.paymentMethod,
        customerPhone: item.customerPhone,
        customerName: item.customerName,
        note: item.note,
        totalPrice: item?.totalAmount,
        invoiceCode: item?.invoiceCode
      }
    }))
  /* const totalItems = dataTrip?.length // tổng số item thực tế
  const totalPages = Math.ceil(totalItems / options.limit) // tổng số trang */
  /* console.log('Tổng số item get được', totalItems)
  console.log('Tổng số trang get được', totalPages) */

  if (isLoading) return <Loading />
  if (isError) return <NotFound />
  return (
    <>
      {isDoning && <Loading overlay />}
      {hasSelected && (
        <Space>
          <Popconfirm
            title='Bạn muốn hoàn thành tất cả đơn hàng này?'
            onConfirm={onDoneOrderMany}
            onCancel={() => setSelectedRowKeys([])}
          >
            <Button variant='success' styleClass='mb-4'>
              Hoàn thành tất cả
            </Button>
          </Popconfirm>
        </Space>
      )}
      {/* <>{JSON.stringify(confirmedOrder)}</> */}
      <div className='dark:bg-graydark w-full overflow-x-auto'>
        <Table
          columns={columns} // Các giá trị sẽ hiển thị trong cột
          dataSource={ordersData} // Dữ liệu hiển thị lên bảng sẽ lấy từ biến ordersData
          // expandable={{
          //   expandedRowRender: TableChildrend
          // }}

          pagination={{
            current: options.page, // Trang hiện tại
            pageSize: options.limit, // Kích thước trang (số lượng items trên mỗi trang)
            showSizeChanger: false, // Cho phép người dùng thay đổi số lượng items trên mỗi trang
            total: dataTrip?.totalPage * 10, // Tổng số bản ghi
            showQuickJumper: true, // Cho phép nhảy đến trang nhanh

            onChange(page, pageSize) {
              setoptions((prev) => ({ ...prev, page, limit: pageSize }))
            }
          }}
          scroll={{ y: '50vh', x: 1000 }}
          bordered
        />
      </div>
    </>
  )
}

export default ListConfirmOrders
