import React from 'react'
import DetailFilters from './component/DetailFilter'
import DetailHeader from './component/DetailHeader'
import DetailTable from './component/DetailTable'

const BatchDetail = () => {
  return (
    <div className='space-y-6'>
        <DetailFilters/>
        <DetailHeader/>
        <DetailTable/>
      
    </div>
  )
}

export default BatchDetail
