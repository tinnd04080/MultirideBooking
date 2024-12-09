import { Button as ButtonAntd, Table, Tooltip } from 'antd'

import { useState } from 'react'
import { useAppSelector } from '~/store/hooks'
import { useGetAllProductActiveQuery, useGetAllProductsQuery } from '~/store/services'
import { RootState } from '~/store/store'
import { IRoleUser } from '~/types'
import { useRender } from '../../hooks'

export const ProductListActive = ({ checkPath }: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const [options, setoptions] = useState({
    page: 1,
    limit: 10
  })
  console.log('Giá trị người dùng thay đổi:', options)
  /* api */
  const {
    data: dataProducts,
    isLoading: loadingProduct,
    isError: errorProduct
  } = useGetAllProductsQuery({
    page: options.page, // Trang hiện tại
    limit: options.limit, // Số lượng item trên mỗi trang
    query: '' // Nếu bạn có thể sử dụng query cho lọc dữ liệu, hãy thêm ở đây
  })

  console.log('data', dataProducts) // Kiểm tra dữ liệu trả về từ API
  console.log('totalPage nè: ', dataProducts?.totalPage) // Kiểm tra tổng số trang
  console.log('currentPage', dataProducts?.currentPage) // Kiểm tra trang hiện tại

  const products = dataProducts?.data?.map((product: any, index: number) => ({
    ...product,
    key: product._id,
    index: index + 1
  }))

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 1

  const columnsData = useRender(dataProducts?.data || [], false, checkPath)

  return (
    <div>
      <div style={{ marginBottom: 16 }} className='flex items-center gap-3'>
        {hasSelected && (
          <Tooltip title={hasSelected ? `Đang chọn ${selectedRowKeys?.length} Phòng` : ''}>
            <ButtonAntd
              size='large'
              danger
              type='primary'
              className='text-sm font-semibold capitalize'
              onClick={start}
              loading={loading}
            >
              Xóa tất cả
            </ButtonAntd>
          </Tooltip>
        )}
        {/* <ButtonAntd
          icon={<HiDocumentDownload />}
          size='large'
          className='bg-[#209E62] text-white hover:!text-white text-sm font-semibold capitalize flex items-center'
          onClick={() => {
            if (data?.docs?.length === 0) {
              message.warning('Không có Khách sạn nào để xuất')
              return
            }
            exportDataToExcel(data?.docs, 'products-active')
          }}
        >
          Xuất excel
        </ButtonAntd> */}
      </div>
      <Table
        rowSelection={user.role === IRoleUser.ADMIN ? rowSelection : undefined}
        columns={columnsData}
        dataSource={products}
        scroll={{ x: 1300 }}
        pagination={{
          current: options.page, // Trang hiện tại
          pageSize: options.limit, // Kích thước trang (số lượng items trên mỗi trang)
          showSizeChanger: false,
          /* total: dataProducts?.totalPage * 10, // Tổng số bản ghi */
          total: dataProducts?.totalPage ? dataProducts?.totalPage * options.limit : 0,
          showQuickJumper: true, // Cho phép nhảy đến trang
          onChange(page, pageSize) {
            setoptions((prev) => ({ ...prev, page, limit: pageSize }))
          }
        }}
        bordered={true}
      />
    </div>
  )
}
