import { Button as ButtonAntd, Popconfirm, Space, Table } from 'antd'
import { useDeleteVoucherMutation, useGetAllVouchersActiveQuery, useGetAllVouchersQuery } from '~/store/services'

import { IRoleUser } from '~/types'
import { Loading } from '~/components'
import { NotFound } from '~/pages'
import { RootState } from '~/store/store'
import { messageAlert } from '~/utils/messageAlert'
import { pause } from '~/utils/pause'
import { useAppSelector } from '~/store/hooks'
import { useRenderVoucher } from '../../hooks'
import { useState } from 'react'

const ListVoucherActive = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [options, setoptions] = useState({
    page: 1,
    limit: 100
  })

  const {
    data: VoucherActive,
    isLoading,
    isError
  } = useGetAllVouchersQuery({
    page: options.page, // Trang hiện tại
    limit: options.limit // Số lượng item trên mỗi trang
  })

  console.log('totalPage:', VoucherActive?.data?.totalPage)

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const [deleteVoucher] = useDeleteVoucherMutation()

  const handleDeleteMany = async () => {
    await pause(700)
    selectedRowKeys.forEach((selectedItem) => {
      deleteVoucher({ id: selectedItem as string })
        .unwrap()
        .then(() => {
          messageAlert('Xóa thành công', 'success')
          setSelectedRowKeys([])
        })
    })
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const hasSelected = selectedRowKeys.length > 1
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const vouchers = VoucherActive?.data?.map((voucher, index) => ({
    ...voucher,
    key: voucher._id,
    index: index + 1
  }))

  // const voucherDataColumns = useRenderVoucher(VoucherActive?.data?.docs || [])
  const voucherDataColumns = useRenderVoucher()

  if (isLoading) return <Loading />
  if (isError) return <NotFound />
  return (
    <div>
      {/* {user.role === IRoleUser.ADMIN && hasSelected && (
        <Space>
          <Popconfirm
            title='Bạn thực sự muốn xóa những mã này?'
            description='Hành động này sẽ xóa những mã đang được chọn!'
            onConfirm={handleDeleteMany}
            className='ml-[10px]'
          >
            <ButtonAntd size='large' type='primary' danger className='text-sm font-semibold capitalize'>
              Xóa tất cả
            </ButtonAntd>
          </Popconfirm>
        </Space>
      )} */}
      <Table
        className='dark:bg-graydark mt-3'
        // columns={columns}
        columns={voucherDataColumns}
        dataSource={vouchers}
        pagination={{
          current: options.page, // Trang hiện tại
          pageSize: options.limit, // Kích thước trang (số lượng items trên mỗi trang)
          showSizeChanger: false,
          /* total: dataProducts?.totalPage * 10, // Tổng số bản ghi */
          total: VoucherActive?.totalPage ? VoucherActive?.totalPage * options.limit : 0,
          showQuickJumper: true, // Cho phép nhảy đến trang
          onChange(page, pageSize) {
            setoptions((prev) => ({ ...prev, page, limit: pageSize }))
          }
        }}
        scroll={{ x: 'max-content', y: '50vh' }} // Cấu hình cuộn ngang
        rowSelection={user.role === IRoleUser.ADMIN ? rowSelection : undefined}
        bordered
      />
    </div>
  )
}

export default ListVoucherActive
