import { Breadcrumb, PlusIcon } from '~/components'

import { Button } from 'antd'
import { useAppDispatch } from '~/store/store'
import { useAppSelector } from '~/store/hooks'
import RevenueStats from '../Dashboard/RevenueStats'
import TripStats from '../Dashboard/TripStats'
import TopRoutesLeaderboard from '../Dashboard/TopRoutesLeaderboard'
import TopUsers from '../Dashboard/TopUsers'

const FeatureDashboard = () => {
  const dispatch = useAppDispatch()
  const { openDrawer } = useAppSelector((state) => state.drawer)

  return (
    <div>
      <Breadcrumb pageName='Thống kê'></Breadcrumb>

      <div className='site-layout-content'>
        <RevenueStats title='Thống kê doanh thu' apiEndpoint={`${import.meta.env.VITE_API}/tickets/revenue-stats`} />
        {/*  <TripStats title='Thống kê chuyến xe' apiEndpoint={`${import.meta.env.VITE_API}/trips/trip-stats`} /> */}
        <TopRoutesLeaderboard />
        <TopUsers />
      </div>
    </div>
  )
}

export default FeatureDashboard
