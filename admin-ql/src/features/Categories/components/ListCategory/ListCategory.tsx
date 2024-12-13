import { Button as ButtonAntd, Popconfirm, Space, Table } from 'antd'
import { useDeleteFakeMutation, useGetAllCategoryQuery } from '~/store/services'
import { ICategory, IRoleUser } from '~/types'

import { useState } from 'react'
import { useAppSelector } from '~/store/hooks'
import { RootState } from '~/store/store'
import { messageAlert } from '~/utils/messageAlert'
import { cancelDelete } from '../..'
import { useRenderCategory } from '../../hooks'

const ListCategory = () => {
  const [options, setoptions] = useState({
    page: 1,
    limit: 100
  })
  console.log('Sau khi chọn', options)

  const {
    data: categories,
    isLoading: loadingProduct,
    isError: errorProduct
  } = useGetAllCategoryQuery({
    page: options.page, // Trang hiện tại
    limit: options.limit // Số lượng item trên mỗi trang
  })

  console.log(`dữ liệu sau khi get về `, categories)

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteFakeCategory] = useDeleteFakeMutation()

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const handleDeleteMany = () => {
    selectedRowKeys.forEach((selectedItem) => {
      deleteFakeCategory(selectedItem as string)
        .unwrap()
        .then(() => {
          messageAlert('Xóa thành công', 'success')
          setSelectedRowKeys([])
        })
        .catch(() => cancelDelete())
    })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 1

  const categorriesData = categories?.data.map((item: ICategory, index: number) => ({
    ...item,
    key: item._id,
    index: index + 1
  }))

  // const columnsData = useRenderCategory()
  const columnsData = useRenderCategory(categories?.data || [])

  return (
    <>
      <Space>
        {user && user.role === IRoleUser.ADMIN && hasSelected && (
          <Popconfirm
            title='Bạn muốn xóa những danh mục này?'
            description='Hành động này sẽ xóa những danh mục đang được chọn!'
            onConfirm={handleDeleteMany}
            onCancel={() => setSelectedRowKeys([])}
          >
            <ButtonAntd size='large' type='primary' danger className='text-sm font-semibold capitalize'>
              Xóa tất cả
            </ButtonAntd>
          </Popconfirm>
        )}
        {/* <ButtonAntd
          icon={<HiDocumentDownload />}
          size='large'
          className='bg-[#209E62] text-white hover:!text-white text-sm font-semibold capitalize flex items-center'
          onClick={() => {
            if (categories?.docs?.length === 0) {
              message.warning('Không có danh mục nào để xuất')
              return
            }
            exportDataToExcel(categories?.docs, 'Category')
          }}
        >
          Xuất excel
        </ButtonAntd> */}
      </Space>
      <div className='dark:bg-graydark mt-3'>
        <Table
          // columns={columns}
          columns={columnsData}
          dataSource={categorriesData}
          pagination={{
            current: options.page, // Trang hiện tại
            pageSize: options.limit, // Kích thước trang (số lượng items trên mỗi trang)
            showSizeChanger: false,
            /* total: dataProducts?.totalPage * 10, // Tổng số bản ghi */
            total: categories?.totalPage ? categories?.totalPage * options.limit : 0,
            showQuickJumper: true, // Cho phép nhảy đến trang
            onChange(page, pageSize) {
              setoptions((prev) => ({ ...prev, page, limit: pageSize }))
            }
          }}
          scroll={{ y: '50vh', x: 'max-content' }} // chỉnh sửa cuộn ngang
          bordered
        />
      </div>
    </>
  )
}

export default ListCategory
