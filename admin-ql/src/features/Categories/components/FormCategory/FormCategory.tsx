import { Drawer, Form, Input, DatePicker, message, Select, InputNumber } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '~/store/store'
import { setCategory, setOpenDrawer } from '~/store/slices'
import { Button } from '~/components'
import { useAppSelector } from '~/store/hooks'
import { useAddCategoryMutation, useUpdateCategoryMutation } from '~/store/services'
import { messageAlert } from '~/utils/messageAlert'
import moment from 'moment'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { provinces, districtData } from '../../data/Data.tsx'

type FormCategoryProps = {
  open: boolean
}
interface Province {
  _id: string
  name: string
}

const FormCategory = ({ open }: FormCategoryProps) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const { cateData } = useAppSelector((state: RootState) => state.categories)
  console.log(cateData, 'cateData')
  useEffect(() => {
    if (cateData._id) {
      form.setFieldsValue({
        ...cateData,
        duration: cateData?.duration ? moment(cateData.duration) : undefined // Chuyển đổi sang Moment object
      })
    }
  }, [cateData])

  /* const onFinish = async (values: any) => {
    // Kiểm tra nếu startProvince và endProvince giống nhau
    // Kiểm tra nếu startProvince và endProvince trùng nhau
    if (values.startProvince === values.endProvince) {
      form.setFields([
        {
          name: 'startProvince',
          errors: ['Tỉnh/Thành phố xuất phát và Tỉnh/Thành phố đến không thể trùng nhau!']
        },
        {
          name: 'endProvince',
          errors: ['Tỉnh/Thành phố xuất phát và Tỉnh/Thành phố đến không thể trùng nhau!']
        }
      ])
      return
    }
    console.log(values, 'ccc')
    const formattedValues = {
      ...values,
      duration: values.duration ? values.duration.toISOString() : null // Chuyển đổi thành ISO string
    }

    if (cateData._id) {
      updateCategory({ _id: cateData._id, ...formattedValues })
        .unwrap()
        .then(() => {
          messageAlert('Cập nhật Tuyến đường thành công', 'success')
          onClose()
        })
        .catch(() => messageAlert('Cập nhật Tuyến đường thất bại 1', 'error'))
      return
    }

    addCategory(formattedValues)
      .unwrap()
      .then(() => {
        message.success('Thêm Tuyến đường thành công')
        dispatch(setOpenDrawer(false))
        form.resetFields()
      })
      .catch(() => message.error('Thêm Tuyến đường thất bại 2'))
  } */
  const onFinish = async (values: any) => {
    // Kiểm tra nếu startProvince và endProvince giống nhau
    if (values.startProvince === values.endProvince) {
      form.setFields([
        {
          name: 'startProvince',
          errors: ['Tỉnh/Thành phố xuất phát và Tỉnh/Thành phố đến không thể trùng nhau!']
        },
        {
          name: 'endProvince',
          errors: ['Tỉnh/Thành phố xuất phát và Tỉnh/Thành phố đến không thể trùng nhau!']
        }
      ])
      return
    }

    console.log(values, 'ccc')

    const formattedValues = {
      ...values,
      duration: values.duration ? values.duration.toISOString() : null // Chuyển đổi thành ISO string
    }

    try {
      // Cập nhật nếu có cateData._id
      if (cateData._id) {
        await updateCategory({ _id: cateData._id, ...formattedValues }).unwrap()
        messageAlert('Cập nhật Tuyến đường thành công', 'success')
        onClose()
        return
      }

      // Thêm mới tuyến đường nếu không có cateData._id
      await addCategory(formattedValues).unwrap()
      message.success('Thêm Tuyến đường thành công')
      dispatch(setOpenDrawer(false))
      form.resetFields()
    } catch (error: any) {
      // Lấy thông báo lỗi từ backend (nếu có)
      const errorMessage = error?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau.'
      message.error(errorMessage) // Hiển thị thông báo lỗi từ backend
    }
  }

  const onClose = () => {
    dispatch(setOpenDrawer(false))
    dispatch(setCategory({ _id: '', name: '' }))
    form.resetFields()
  }
  const [dataTt, setDataTt] = useState<Province[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  // useEffect(() => {
  //   const handelFetch = async () => {
  //     try {
  //       const data = provinces
  //       /* await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1') */
  //       setDataTt(data)
  //     } catch (error) {
  //       //
  //     }
  //   }
  //   handelFetch()
  // }, [])
  useEffect(() => {
    const handelFetch = async () => {
      try {
        const data = provinces
        setDataTt(data)
      } catch (error) {
        // Handle error if needed
      }
    }
    handelFetch()
  }, [])

  // Cập nhật khi chọn tỉnh thành
  const handleProvinceChange = (value: string, field: 'startProvince' | 'endProvince') => {
    // Reset districts khi tỉnh thành thay đổi
    setDistricts(districtData[value] || [])

    // Reset trường quận/huyện nếu tỉnh thành thay đổi
    if (field === 'startProvince') {
      form.setFieldsValue({ startDistrict: undefined })
    } else if (field === 'endProvince') {
      form.setFieldsValue({ endDistrict: undefined })
    }
  }

  return (
    <Drawer
      title={cateData._id ? 'Cập nhật Tuyến đường' : 'Thêm Tuyến đường mới'}
      width={376}
      destroyOnClose
      onClose={onClose}
      getContainer={false}
      open={open}
    >
      <Form
        name='basic'
        autoComplete='off'
        layout='vertical'
        form={form}
        className='dark:text-white'
        onFinish={onFinish}
      >
        <Form.Item
          label='Tỉnh/Thành phố xuất phát'
          name='startProvince'
          rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố xuất phát!' }]}
        >
          <Select
            placeholder='Tỉnh/Thành phố xuất phát'
            onChange={(value) => handleProvinceChange(value, 'startProvince')}
          >
            {dataTt?.map((itc) => (
              <Select.Option key={itc._id} value={itc.name}>
                {itc.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Điểm xuất phát'
          name='startDistrict'
          rules={[{ required: true, message: 'Vui lòng nhập điểm xuất phát!' }]}
        >
          <Select placeholder='Điểm xuất phát'>
            {districts.map((district, index) => (
              <Select.Option key={index} value={district}>
                {district}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Tỉnh/Thành phố đến'
          name='endProvince'
          rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố đến!' }]}
        >
          <Select placeholder='Tỉnh/Thành phố đến' onChange={(value) => handleProvinceChange(value, 'endProvince')}>
            {dataTt?.map((itc) => (
              <Select.Option key={itc._id} value={itc.name}>
                {itc.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Điểm đến' name='endDistrict' rules={[{ required: true, message: 'Vui lòng nhập điểm đến!' }]}>
          <Select placeholder='Điểm đến'>
            {districts.map((district, index) => (
              <Select.Option key={index} value={district}>
                {district}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Ngày' name='duration' rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
          <DatePicker
            size='large'
            style={{ width: '100%' }}
            disabledDate={(current) => current && current.isBefore(dayjs(), 'day')} // Disable ngày quá khứ
          />
        </Form.Item>

        <Form.Item label='Trạng thái' name='status' rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}>
          {/* <Input size='large' placeholder='Trạng thái (OPEN/CLOSED)' /> */}
          <Select placeholder='Vui lòng chọn trạng thái'>
            <Select.Option value={'OPEN'}>OPEN</Select.Option>
            <Select.Option value={'CLOSED'}>CLOSED</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Khoảng cách (km)'
          name='distance'
          rules={[
            { required: true, message: 'Vui lòng nhập khoảng cách!' },
            {
              type: 'number',
              min: 1,
              message: 'Khoảng cách phải là số không âm!'
            }
          ]}
        >
          <InputNumber
            size='large'
            placeholder='Khoảng cách (km)'
            className='w-full'
            min={1} // Giá trị tối thiểu là 0
            parser={(value) => value?.replace(/[^\d]/g, '')} // Loại bỏ ký tự không phải số
          />
        </Form.Item>

        <Form.Item
          label='Giá mỗi km'
          name='pricePerKM'
          rules={[
            { required: true, message: 'Vui lòng nhập giá mỗi km!' },
            {
              type: 'number',
              min: 1,
              message: 'phải là số không âm!'
            }
          ]}
        >
          <InputNumber
            size='large'
            className='w-full'
            placeholder='Giá mỗi km (VND)'
            min={1} // Giá trị tối thiểu là 0
            parser={(value) => value?.replace(/[^\d]/g, '')} // Loại bỏ ký tự không phải số
          />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isAdding || isUpdating}
            icon={isAdding || isUpdating ? <LoadingOutlined /> : undefined}
            styleClass='!w-full mt-5 py-2'
            type='submit'
          >
            {cateData._id ? 'Cập nhật Tuyến đường' : 'Thêm Tuyến đường'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default FormCategory
