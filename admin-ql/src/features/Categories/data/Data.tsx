import ListCategory from '../components/ListCategory/ListCategory'

export const items = [{ key: '1' /* , label: 'Tất cả Tuyến đường' */, children: <ListCategory /> }]

export const provinces = [
  { _id: '1', name: 'Hồ Chí Minh' },
  { _id: '2', name: 'Đà Nẵng' },
  { _id: '3', name: 'Bình Định' },
  { _id: '5', name: 'Thừa Thiên Huế' },
  { _id: '6', name: 'Quảng Ngãi' }
]
export const districtData: { [key: string]: string[] } = {
  'Hồ Chí Minh': ['Bến xe miền đông'],
  'Bình Định': ['Bến xe khách trung tâm Quy Nhơn'],
  'Quảng Ngãi': ['Bến xe TP. Quảng Ngãi'],
  'Đà Nẵng': ['Bến xe trung tâm Đà Nẵng'],
  'Thừa Thiên Huế': ['Bến xe TP.Huế']
}
