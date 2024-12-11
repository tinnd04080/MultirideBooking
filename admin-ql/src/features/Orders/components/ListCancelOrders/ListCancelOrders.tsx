import { Button as ButtonAnt, Input, Space, Table, Tooltip, Form, Select } from 'antd'
import { EyeFilled, SearchOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '~/store/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { messageAlert } from '~/utils/messageAlert'
import { ColumnType } from 'antd/lib/table'
import { ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { IOrderDataType } from '~/types'
import type { InputRef } from 'antd'
import Loading from '~/components/Loading/Loading'
import { NotFound } from '~/pages'
import TableChildrend from '~/features/Products/utils/TableChildrend'
import UserInfoRow from '../UserInfoRow/UserInfoRow'
import { formatCurrency } from '~/utils'
import { formatDate } from '~/utils/formatDate'
import { setOpenDrawer } from '~/store/slices'
import { setOrderData } from '~/store/slices/Orders/order.slice'
import { useAppSelector } from '~/store/hooks'
import { useGetAllOrderCancelQuery, useGetAllOrderPendingQuery, useConfirmOrderMutation } from '~/store/services/Orders'
import TicketDetails from '../Ticketdetails/ticketDetails.tsx'
type DataIndex = keyof IOrderDataType
const ListCancelOrders = () => {
  const dispatch = useAppDispatch()
  const [cancelOrder, setCancelOrder] = useState<any>()
  const { orderDate } = useAppSelector((state) => state.orders)
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const [options, setoptions] = useState({
    page: 1,
    limit: 10,
    status: 'CANCELED',
    room: user._id
  })
  console.log('options = ', options)

  const memoOptions = useMemo(() => {
    setoptions((prev) => ({
      ...prev,
      page: 1,
      startDate: orderDate.startDate,
      endDate: orderDate.endDate
    }))
  }, [orderDate])

  const { data: dataTrip, isLoading, isError } = useGetAllOrderPendingQuery(options)

  console.log(dataTrip?.totalPage)

  /*Search */
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const [confirmOrder, { isLoading: isComfirming }] = useConfirmOrderMutation()
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
          {data.payment !== 'cod' && status == 'CANCELED' ? 'Vé bị hủy' : 'Chưa thanh toán'}
        </span>
      )
    }
  ]
  const ordersData = dataTrip?.data
    ?.filter((itc: any) => itc.status == 'CANCELED')
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
        startProvince: item.busRoute.startProvince,
        endProvince: item.busRoute.endProvince,
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
        code: item?.promotion?.code,
        discountAmount: item?.promotion?.discountAmount,
        price: item.trip.price
      }
    }))
  if (isLoading) return <Loading />
  if (isError) return <NotFound />
  // Khi phân trang
  const handlePageChange = (page: number, pageSize: number) => {
    setoptions((prev) => ({
      ...prev,
      page, // Cập nhật trang
      limit: pageSize // Cập nhật giới hạn số lượng bản ghi trên mỗi trang
    }))
  }
  return (
    <div className='dark:bg-graydark'>
      <Table
        columns={columns}
        dataSource={ordersData}
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
        scroll={{ y: '55vh', x: 1000 }}
        bordered
      />
    </div>
  )
}

export default ListCancelOrders
