import React from 'react'
import FeedbackFilter from './components/FeedbackFilter'
import FeedbackTable from './components/FeedbackTable'
import PaginationBar from '../banner/components/PaginationBar'

function FeedbackFeature() {
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const totalResults = 124
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))

  return (
    <div className='space-y-6'>
      <FeedbackFilter />
      <FeedbackTable />
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

export default FeedbackFeature








