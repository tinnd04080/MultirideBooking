export interface IVoucherDocs {
  data: {
    data: IVoucher[]
    totalPage: number // Thêm trường này để khớp với dữ liệu trả về
    currentPage?: number
    hasNextPage?: boolean
    hasPrevPage?: boolean
    limit?: number
    nextPage?: null | number
    pagingCounter?: number
    prevPage?: null | number
    page?: number
  }
}

export interface IVoucher {
  _id?: string
  code: string
  title: string
  discount: number
  sale: number
  startDate: string
  endDate: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  desc: string
}
