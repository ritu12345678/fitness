import React from 'react'
import BannerFilterSection from './components/BannerFilterSection'
import BannerGrid from './components/BannerGrid'
import PaginationBar from './components/PaginationBar'
import { mockBanners } from './data/mockBanners'

const Banner = () => {
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(9)
  const [items, setItems] = React.useState(mockBanners)

  const totalResults = 124
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))

  return (
    <div className='space-y-6'>
      <BannerFilterSection/>
      <BannerGrid items={items} onToggle={(id, val)=>{}} onEdit={(id)=>{}}/>
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(p)=>setPage(p)}
        onPageSizeChange={(s)=>{ setPageSize(s); setPage(1) }}
        totalResults={totalResults}
      />
    </div>
  )
}

export default Banner
