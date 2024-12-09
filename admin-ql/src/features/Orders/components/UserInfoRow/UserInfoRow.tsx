import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserInfoRow.css'

type UserInfoRowProps = {
  user: {
    fullName?: string
    phone?: string | number
    avatar?: string
    email?: string
    status: string
    address?: string
    cccd?: string
  }
}

const UserInfoRow = ({ user }: UserInfoRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hàm để mở Modal
  const openModal = () => setIsModalOpen(true)

  // Hàm để đóng Modal
  const closeModal = () => setIsModalOpen(false)

  // Hàm render trạng thái
  const renderStatus = (status: string) => {
    if (status === 'ACTIVE') {
      return <span className='status-active'>Hoạt Động</span>
    }
    if (status === 'INACTIVE') {
      return <span className='status-inactive'>Ngừng Hoạt Động</span>
    }
    return <span className='status-unknown'>Không xác định</span>
  }

  return (
    <>
      {/* Phần hiển thị thông tin người dùng */}
      <div className='user-info-container'>
        <div className='user-info-text'>
          <Link
            to='#'
            onClick={(e) => {
              e.preventDefault()
              openModal()
            }}
            className='user-info-link'
          >
            {user?.fullName || 'Không có'}
          </Link>
          <div>{user?.phone || 'Không có'}</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay' role='dialog' aria-modal='true'>
          <div className='modal-content'>
            {/* Nút đóng */}
            <button onClick={closeModal} className='modal-close' aria-label='Đóng Modal'>
              ✖
            </button>
            <h2 style={{ fontSize: 25 }}>Thông tin tài khoản đặt vé</h2>
            <div style={{ marginTop: 10 }}>
              <text style={{ paddingRight: 5, fontWeight: 'bold', fontSize: 15 }}>Họ và tên:</text>
              <text style={{ paddingRight: 5, fontSize: 15 }}>{user?.fullName || 'Không có'}</text>
            </div>
            <div style={{ marginTop: 5 }}>
              <text style={{ paddingRight: 5, fontWeight: 'bold', fontSize: 15 }}>Số điện thoại:</text>
              <text style={{ paddingRight: 5, fontSize: 15 }}>{user?.phone || 'Không có'}</text>
            </div>
            <div style={{ marginTop: 5 }}>
              <text style={{ paddingRight: 5, fontWeight: 'bold', fontSize: 15 }}>Email:</text>
              <text style={{ paddingRight: 5, fontSize: 15 }}>{user?.email || 'Không có'}</text>
            </div>
            <div style={{ marginTop: 5 }}>
              <text style={{ paddingRight: 5, fontWeight: 'bold', fontSize: 15 }}>Số căn cước:</text>
              <text style={{ paddingRight: 5, fontSize: 15 }}>{user?.cccd || 'Không có'}</text>
            </div>
            <div style={{ marginTop: 5 }}>
              <text style={{ paddingRight: 5, fontWeight: 'bold', fontSize: 15 }}>Trạng thái:</text>
              <text style={{ paddingRight: 5, fontSize: 15 }}> {renderStatus(user?.status)}</text>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserInfoRow
