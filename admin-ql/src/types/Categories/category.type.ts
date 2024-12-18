export interface ICategory {
  _id: string
  name: string
  slug: string
  products?: []
  is_deleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ICategoryDocs {
  data: ICategory[]
  totalDocs: number
  totalPage: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
